#!/usr/bin/env python3
"""Manage the explain-my-app doc-set manifest at <docs-dir>/.manifest.json.

Subcommands:
  init        --docs <dir>                       create the manifest (pages + current git SHA)
  diff        --docs <dir>                       changed files since manifest SHA -> affected pages (JSON)
  update      --docs <dir>                       refresh page list + SHA, preserve quiz history
  record-quiz --docs <dir> --page <f> --score N  append a quiz result (0-100)

Python 3.9+, stdlib only.
"""
import argparse
import datetime
import json
import os
import subprocess
import sys

MANIFEST_NAME = ".manifest.json"


def fail(msg):
    print("error: " + msg, file=sys.stderr)
    sys.exit(1)


def run_git(args, cwd):
    """Run a git command; return (stdout, None) or (None, stderr)."""
    try:
        proc = subprocess.run(["git"] + args, cwd=cwd,
                              capture_output=True, text=True)
    except FileNotFoundError:
        fail("git not found on PATH")
    if proc.returncode != 0:
        return None, proc.stderr.strip()
    return proc.stdout.strip(), None


def current_sha(docs_dir):
    sha, err = run_git(["rev-parse", "HEAD"], docs_dir)
    if sha is None:
        if "not a git repository" in (err or "").lower():
            fail("'%s' is not inside a git repository — explain-my-app needs "
                 "git history to track what changed. Run 'git init' and make "
                 "a first commit, then retry." % docs_dir)
        fail("could not resolve git HEAD (no commits yet?): %s" % err)
    return sha


def parse_frontmatter(path):
    """Return (title, source_files) from a page's YAML frontmatter.

    Supports inline lists (source_files: [a, b]) and block lists (- a).
    """
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    title, sources, in_block = None, [], False
    if not lines or lines[0].strip() != "---":
        return title, sources
    for line in lines[1:]:
        stripped = line.strip()
        if stripped == "---":
            break
        if in_block:
            if stripped.startswith("- "):
                sources.append(stripped[2:].strip().strip("'\""))
                continue
            in_block = False
        if stripped.startswith("title:"):
            title = stripped[len("title:"):].strip().strip("'\"")
        elif stripped.startswith("source_files:"):
            value = stripped[len("source_files:"):].strip()
            if value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                if inner:
                    sources = [p.strip().strip("'\"") for p in inner.split(",")]
            elif not value:
                in_block = True
    return title, sources


def scan_pages(docs_dir):
    pages = []
    for name in sorted(os.listdir(docs_dir)):
        if not name.endswith(".md"):
            continue
        title, sources = parse_frontmatter(os.path.join(docs_dir, name))
        pages.append({"file": name, "title": title or name,
                      "source_files": sources})
    return pages


def manifest_path(docs_dir):
    return os.path.join(docs_dir, MANIFEST_NAME)


def load_manifest(docs_dir):
    path = manifest_path(docs_dir)
    if not os.path.exists(path):
        fail("no manifest at %s — run: manifest.py init --docs %s"
             % (path, docs_dir))
    with open(path, encoding="utf-8") as f:
        try:
            return json.load(f)
        except ValueError:
            fail("manifest at %s is not valid JSON — fix or re-init" % path)


def save_manifest(docs_dir, data):
    data["generated_at"] = datetime.datetime.now(
        datetime.timezone.utc).isoformat(timespec="seconds")
    with open(manifest_path(docs_dir), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def source_matches(source, changed):
    """A folder source (trailing /) prefix-matches; a file source matches
    exactly or as a directory prefix."""
    if source.endswith("/"):
        return changed.startswith(source)
    return changed == source or changed.startswith(source + "/")


def cmd_init(args):
    if not os.path.isdir(args.docs):
        fail("docs directory not found: %s" % args.docs)
    data = {"generated_at": None, "git_sha": current_sha(args.docs),
            "pages": scan_pages(args.docs), "quizzes": []}
    save_manifest(args.docs, data)
    print("manifest written: %d pages at sha %s"
          % (len(data["pages"]), data["git_sha"][:8]))


def cmd_diff(args):
    manifest = load_manifest(args.docs)
    sha = manifest.get("git_sha") or fail("manifest has no git_sha — re-init")
    out, err = run_git(["diff", "--name-only", sha + "..HEAD"], args.docs)
    if out is None:
        fail("git diff failed (sha %s no longer in history?): %s" % (sha, err))
    # exclude the doc-set itself — pages/manifest changing is not code changing
    docs_prefix, _ = run_git(["rev-parse", "--show-prefix"], args.docs)
    changed = [line for line in out.splitlines() if line.strip()
               and not (docs_prefix and line.startswith(docs_prefix))]
    affected, claimed = [], set()
    for page in manifest.get("pages", []):
        hits = sorted({c for c in changed
                       for s in page.get("source_files", [])
                       if source_matches(s, c)})
        if hits:
            affected.append({"file": page["file"], "title": page.get("title"),
                             "changed_sources": hits})
            claimed.update(hits)
    print(json.dumps({"from_sha": sha, "changed_files": changed,
                      "affected_pages": affected,
                      "unmapped_files": [c for c in changed
                                         if c not in claimed]}, indent=2))


def cmd_update(args):
    manifest = load_manifest(args.docs)
    manifest["git_sha"] = current_sha(args.docs)
    manifest["pages"] = scan_pages(args.docs)
    manifest.setdefault("quizzes", [])
    save_manifest(args.docs, manifest)
    print("manifest updated: %d pages at sha %s"
          % (len(manifest["pages"]), manifest["git_sha"][:8]))


def cmd_record_quiz(args):
    if not 0 <= args.score <= 100:
        fail("--score must be between 0 and 100")
    manifest = load_manifest(args.docs)
    known = {p["file"] for p in manifest.get("pages", [])}
    if args.page not in known:
        fail("page '%s' not in manifest — run: manifest.py update --docs %s"
             % (args.page, args.docs))
    manifest.setdefault("quizzes", []).append(
        {"date": datetime.date.today().isoformat(),
         "page": args.page, "score": args.score})
    save_manifest(args.docs, manifest)
    print("recorded: %s -> %d" % (args.page, args.score))


def main():
    parser = argparse.ArgumentParser(
        prog="manifest.py", description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    handlers = {"init": cmd_init, "diff": cmd_diff, "update": cmd_update,
                "record-quiz": cmd_record_quiz}
    for name in handlers:
        p = sub.add_parser(name)
        p.add_argument("--docs", required=True,
                       help="doc-set directory, e.g. docs/explained")
        if name == "record-quiz":
            p.add_argument("--page", required=True,
                           help="page filename, e.g. the-database.md")
            p.add_argument("--score", required=True, type=int,
                           help="comprehension score 0-100")
    args = parser.parse_args()
    handlers[args.command](args)


if __name__ == "__main__":
    main()
