"""Tests for scan_transcripts.py — synthetic projects dir, privacy assertions."""

import json
import os
import subprocess
import sys
import time
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "scan_transcripts.py"

# Sentinel sits at word 9+ so the 8-word prefix can never include it.
LONG_BODY = (
    "this is a very long unique message body SENTINEL_BODY_DO_NOT_LEAK about "
    "refactoring the billing reconciliation pipeline end to end with retries"
)
SECRET_LINE = "here is my key sk-FAKEKEY123 please use it for the auth calls"
SHARED_OPENING = "please fix the failing build error in api"


def user_entry(text):
    return {"type": "user", "message": {"role": "user", "content": text}}


def tool_entry(name, command=None):
    block = {"type": "tool_use", "name": name, "input": {}}
    if command is not None:
        block["input"]["command"] = command
    return {"type": "assistant", "message": {"role": "assistant", "content": [block]}}


def write_session(path, entries):
    path.write_text(
        "\n".join(e if isinstance(e, str) else json.dumps(e) for e in entries) + "\n",
        encoding="utf-8",
    )


def build_projects(tmp_path):
    root = tmp_path / "projects"
    proj_a = root / "-Users-test-projA"
    proj_b = root / "-Users-test-projB"
    proj_a.mkdir(parents=True)
    proj_b.mkdir(parents=True)

    write_session(
        proj_a / "session1.jsonl",
        [
            user_entry(SHARED_OPENING + " gateway now thanks"),
            tool_entry("Read"),
            tool_entry("Edit"),
            tool_entry("Bash", "npm test --silent"),
            "{this is not valid json",  # malformed line — must be skipped + counted
            user_entry(SECRET_LINE),
            user_entry(LONG_BODY),
        ],
    )
    write_session(
        proj_a / "session2.jsonl",
        [
            user_entry(SHARED_OPENING + " gateway again please"),
            tool_entry("Read"),
            tool_entry("Edit"),
            tool_entry("Bash", "git status"),
        ],
    )
    write_session(
        proj_b / "session3.jsonl",
        [
            user_entry(SHARED_OPENING + " gateway one more"),
            tool_entry("Bash", "npm run lint"),
        ],
    )

    # Session older than the window — must be excluded.
    old = proj_b / "old.jsonl"
    write_session(old, [user_entry("ancient prompt that should never be scanned at all")])
    stamp = time.time() - 365 * 86400
    os.utime(old, (stamp, stamp))
    return root


def run_scan(root):
    proc = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--projects-dir",
            str(root),
            "--days",
            "90",
            "--top",
            "10",
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(proc.stdout), proc.stderr


def test_counts(tmp_path):
    out, err = run_scan(build_projects(tmp_path))
    assert out["scanned_projects"] == 2
    assert out["scanned_sessions"] == 3  # old.jsonl excluded by mtime window
    assert out["window_days"] == 90
    assert out["skipped_lines"] == 1
    per_project = {p["project"]: p for p in out["sessions_per_project"]}
    assert per_project["-Users-test-projA"]["sessions"] == 2
    assert per_project["-Users-test-projA"]["messages"] == 4
    assert per_project["-Users-test-projB"]["sessions"] == 1
    assert "Scanned 2 projects / 3 sessions" in err


def test_prefix_extraction(tmp_path):
    out, _ = run_scan(build_projects(tmp_path))
    prefixes = {p["prefix"]: p for p in out["prompt_prefixes"]}
    assert SHARED_OPENING in prefixes
    assert prefixes[SHARED_OPENING]["count"] == 3
    assert prefixes[SHARED_OPENING]["projects"] == 2
    assert "ancient prompt that should never be scanned at" not in prefixes


def test_bash_binaries_never_args(tmp_path):
    out, _ = run_scan(build_projects(tmp_path))
    bins = {b["binary"]: b["count"] for b in out["bash_binaries"]}
    assert bins["npm"] == 2
    assert bins["git"] == 1
    dump = json.dumps(out)
    assert "npm test" not in dump
    assert "--silent" not in dump
    assert "git status" not in dump


def test_tool_sequence_trigrams(tmp_path):
    out, _ = run_scan(build_projects(tmp_path))
    seqs = {s["seq"]: s["count"] for s in out["tool_sequences"]}
    assert seqs["Read > Edit > Bash"] == 2


def test_secret_token_never_in_output(tmp_path):
    out, err = run_scan(build_projects(tmp_path))
    dump = json.dumps(out)
    assert "sk-FAKEKEY123" not in dump
    assert "FAKEKEY" not in dump
    assert "sk-FAKEKEY123" not in err


def test_full_bodies_never_in_output(tmp_path):
    out, err = run_scan(build_projects(tmp_path))
    dump = json.dumps(out)
    assert "SENTINEL_BODY_DO_NOT_LEAK" not in dump
    assert "billing reconciliation pipeline" not in dump
    assert LONG_BODY not in dump
    assert "SENTINEL_BODY_DO_NOT_LEAK" not in err


def test_missing_dir_is_graceful(tmp_path):
    proc = subprocess.run(
        [sys.executable, str(SCRIPT), "--projects-dir", str(tmp_path / "nope")],
        capture_output=True,
        text=True,
    )
    assert proc.returncode == 0
    out = json.loads(proc.stdout)
    assert out["scanned_projects"] == 0
    assert out["scanned_sessions"] == 0
    assert "not found" in proc.stderr


def test_empty_project_dir(tmp_path):
    root = tmp_path / "projects"
    (root / "-Users-test-empty").mkdir(parents=True)
    out, _ = run_scan(root)
    assert out["scanned_projects"] == 0
    assert out["scanned_sessions"] == 0
    assert out["prompt_prefixes"] == []
