#!/usr/bin/env python3
"""scan_transcripts.py — privacy-preserving aggregate scanner for Claude Code transcripts.

Reads ~/.claude/projects/*/*.jsonl session transcripts (read-only, local-only)
and emits AGGREGATES ONLY: counts, recurring bash binaries, repeated prompt
prefixes (first 8 words), and tool-name 3-grams. It never stores or emits full
message bodies or full commands. Tokens matching common secret patterns are
dropped before anything is counted.

Output: a single JSON object on stdout; a 3-line human summary on stderr.
Python 3.9+, stdlib only.
"""

import argparse
import json
import sys
import re
import time
from collections import Counter, defaultdict
from pathlib import Path

PREFIX_WORDS = 8
TRIGRAM = 3

# Any whitespace token containing one of these substrings is dropped pre-count.
SECRET_PATTERN = re.compile(r"sk-|ghp_|gho_|AKIA|xox|password=|token=|Bearer")


def redacted_words(text):
    """Split text into whitespace tokens, dropping any token that looks like a secret."""
    return [tok for tok in text.split() if not SECRET_PATTERN.search(tok)]


def prompt_prefix(text):
    """First PREFIX_WORDS surviving words, lowercased — never the full body."""
    words = redacted_words(text)
    if not words:
        return None
    return " ".join(w.lower() for w in words[:PREFIX_WORDS])


def bash_binary(command):
    """First whitespace token of a Bash command (the binary) — never the args."""
    if not isinstance(command, str):
        return None
    tokens = command.split()
    if not tokens:
        return None
    binary = tokens[0]
    if SECRET_PATTERN.search(binary):
        return None
    return binary


def extract_user_text(entry):
    """Typed user prompt text for a 'user' entry, or None.

    Skips meta entries, tool_result payloads, and XML-ish wrappers
    (<command-name>, <system-reminder>, ...). The returned text is used only
    to derive an 8-word prefix; it is never emitted.
    """
    if entry.get("isMeta"):
        return None
    content = (entry.get("message") or {}).get("content")
    if isinstance(content, str):
        text = content
    elif isinstance(content, list):
        parts = [
            block.get("text", "")
            for block in content
            if isinstance(block, dict) and block.get("type") == "text"
        ]
        text = " ".join(p for p in parts if p)
    else:
        return None
    text = text.strip()
    if not text or text.startswith("<"):
        return None
    return text


def iter_tool_uses(entry):
    """Yield tool_use blocks from an 'assistant' entry."""
    content = (entry.get("message") or {}).get("content")
    if not isinstance(content, list):
        return
    for block in content:
        if isinstance(block, dict) and block.get("type") == "tool_use":
            yield block


def scan(projects_dir, days, top):
    cutoff = time.time() - days * 86400
    prefix_counts = Counter()
    prefix_projects = defaultdict(set)
    binary_counts = Counter()
    trigram_counts = Counter()
    project_sessions = Counter()
    project_messages = Counter()
    projects_seen = set()
    scanned_sessions = 0
    skipped_lines = 0

    root = Path(projects_dir).expanduser()
    if root.is_dir():
        for proj_dir in sorted(root.iterdir()):
            if not proj_dir.is_dir():
                continue
            project = proj_dir.name
            for session_file in sorted(proj_dir.glob("*.jsonl")):
                try:
                    if session_file.stat().st_mtime < cutoff:
                        continue
                except OSError:
                    continue
                scanned_sessions += 1
                projects_seen.add(project)
                project_sessions[project] += 1
                tool_names = []
                try:
                    handle = open(session_file, encoding="utf-8", errors="replace")
                except OSError:
                    continue
                with handle:
                    for line in handle:
                        line = line.strip()
                        if not line:
                            continue
                        try:
                            entry = json.loads(line)
                        except ValueError:
                            skipped_lines += 1
                            continue
                        if not isinstance(entry, dict):
                            skipped_lines += 1
                            continue
                        etype = entry.get("type")
                        if etype == "user":
                            text = extract_user_text(entry)
                            if text:
                                project_messages[project] += 1
                                prefix = prompt_prefix(text)
                                if prefix:
                                    prefix_counts[prefix] += 1
                                    prefix_projects[prefix].add(project)
                        elif etype == "assistant":
                            for block in iter_tool_uses(entry):
                                name = block.get("name")
                                if not name:
                                    continue
                                tool_names.append(name)
                                if name == "Bash":
                                    binary = bash_binary(
                                        (block.get("input") or {}).get("command", "")
                                    )
                                    if binary:
                                        binary_counts[binary] += 1
                for i in range(len(tool_names) - TRIGRAM + 1):
                    trigram_counts[" > ".join(tool_names[i : i + TRIGRAM])] += 1

    return {
        "scanned_projects": len(projects_seen),
        "scanned_sessions": scanned_sessions,
        "window_days": days,
        "skipped_lines": skipped_lines,
        "prompt_prefixes": [
            {"prefix": p, "count": c, "projects": len(prefix_projects[p])}
            for p, c in prefix_counts.most_common(top)
        ],
        "bash_binaries": [
            {"binary": b, "count": c} for b, c in binary_counts.most_common(top)
        ],
        "tool_sequences": [
            {"seq": s, "count": c} for s, c in trigram_counts.most_common(top)
        ],
        "sessions_per_project": [
            {"project": p, "sessions": s, "messages": project_messages.get(p, 0)}
            for p, s in project_sessions.most_common(top)
        ],
    }


def summarize(result, projects_dir):
    lines = []
    if not Path(projects_dir).expanduser().is_dir():
        lines.append("warning: projects dir not found: %s" % projects_dir)
    lines.append(
        "Scanned %d projects / %d sessions in the last %d days (%d malformed lines skipped)."
        % (
            result["scanned_projects"],
            result["scanned_sessions"],
            result["window_days"],
            result["skipped_lines"],
        )
    )
    if result["prompt_prefixes"]:
        top_p = result["prompt_prefixes"][0]
        top_b = result["bash_binaries"][0] if result["bash_binaries"] else None
        line = 'Top prompt prefix: "%s" (%dx, %d projects)' % (
            top_p["prefix"],
            top_p["count"],
            top_p["projects"],
        )
        if top_b:
            line += "; top bash binary: %s (%dx)" % (top_b["binary"], top_b["count"])
        lines.append(line + ".")
    else:
        lines.append("No prompt activity found in the window.")
    lines.append(
        "Aggregates only: no message bodies, no command arguments, no secrets in this output."
    )
    return "\n".join(lines[:3] if len(lines) <= 3 else lines[:4])


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Aggregate-only scanner for Claude Code session transcripts."
    )
    parser.add_argument(
        "--projects-dir",
        default="~/.claude/projects",
        help="Transcript root (default: ~/.claude/projects)",
    )
    parser.add_argument(
        "--days", type=int, default=90, help="Only scan sessions modified within N days"
    )
    parser.add_argument(
        "--top", type=int, default=30, help="Keep top-N entries per aggregate list"
    )
    args = parser.parse_args(argv)

    result = scan(args.projects_dir, args.days, args.top)
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write("\n")
    sys.stderr.write(summarize(result, args.projects_dir) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
