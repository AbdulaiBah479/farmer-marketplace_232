"""Tests for manifest.py — run with: python3 -m pytest scripts/ -q"""
import json
import os
import pathlib
import subprocess
import sys

import pytest

SCRIPT = str(pathlib.Path(__file__).resolve().parent / "manifest.py")


def run_manifest(args, cwd):
    return subprocess.run([sys.executable, SCRIPT] + args, cwd=str(cwd),
                          capture_output=True, text=True)


def git(args, cwd, env):
    subprocess.run(["git"] + args, cwd=str(cwd), env=env,
                   capture_output=True, text=True, check=True)


def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


PAGE_HUB = """---
title: Start here
source_files: [src/app.js]
---
# Start Here
One picture. [[the-database]]
"""

PAGE_DB = """---
title: The database
source_files:
  - src/db.js
  - data/
---
# The Database
Your todos live in one file.
"""

PAGE_ROUTES = """---
title: Routes
source_files: [src/routes/]
---
# Routes
"""


@pytest.fixture
def repo(tmp_path):
    """A temp git repo with src files, a docs/explained doc-set, one commit."""
    env = dict(os.environ, HOME=str(tmp_path), GIT_CONFIG_NOSYSTEM="1")
    git(["init", "-q"], tmp_path, env)
    git(["config", "user.email", "t@example.com"], tmp_path, env)
    git(["config", "user.name", "Test"], tmp_path, env)
    git(["config", "commit.gpgsign", "false"], tmp_path, env)
    write(tmp_path / "src" / "app.js", "const app = 1;\n")
    write(tmp_path / "src" / "db.js", "const db = 2;\n")
    write(tmp_path / "src" / "routes" / "todos.js", "const r = 3;\n")
    docs = tmp_path / "docs" / "explained"
    write(docs / "00-start-here.md", PAGE_HUB)
    write(docs / "the-database.md", PAGE_DB)
    write(docs / "routes.md", PAGE_ROUTES)
    git(["add", "-A"], tmp_path, env)
    git(["commit", "-q", "-m", "initial"], tmp_path, env)
    return {"root": tmp_path, "docs": "docs/explained", "env": env}


def commit_change(repo_info, relpath, content, msg="change"):
    write(repo_info["root"] / relpath, content)
    git(["add", "-A"], repo_info["root"], repo_info["env"])
    git(["commit", "-q", "-m", msg], repo_info["root"], repo_info["env"])


def head_sha(repo_info):
    out = subprocess.run(["git", "rev-parse", "HEAD"],
                         cwd=str(repo_info["root"]), env=repo_info["env"],
                         capture_output=True, text=True, check=True)
    return out.stdout.strip()


def load(repo_info):
    path = repo_info["root"] / repo_info["docs"] / ".manifest.json"
    return json.loads(path.read_text(encoding="utf-8"))


def test_init_creates_valid_manifest(repo):
    result = run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    assert result.returncode == 0, result.stderr
    manifest = load(repo)  # raises if not valid JSON
    assert manifest["git_sha"] == head_sha(repo)
    assert manifest["quizzes"] == []
    assert manifest["generated_at"]
    by_file = {p["file"]: p for p in manifest["pages"]}
    assert set(by_file) == {"00-start-here.md", "the-database.md", "routes.md"}
    assert by_file["00-start-here.md"]["source_files"] == ["src/app.js"]
    assert by_file["00-start-here.md"]["title"] == "Start here"
    # block-style frontmatter list parsed too
    assert by_file["the-database.md"]["source_files"] == ["src/db.js", "data/"]


def test_diff_empty_right_after_init(repo):
    run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    result = run_manifest(["diff", "--docs", repo["docs"]], repo["root"])
    assert result.returncode == 0, result.stderr
    out = json.loads(result.stdout)
    assert out["changed_files"] == []
    assert out["affected_pages"] == []
    assert out["unmapped_files"] == []


def test_diff_maps_changed_file_to_page(repo):
    run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    commit_change(repo, "src/db.js", "const db = 99;\n")           # exact match
    commit_change(repo, "src/routes/todos.js", "const r = 99;\n")  # folder prefix
    commit_change(repo, "orphan.txt", "no page covers me\n")       # unmapped
    result = run_manifest(["diff", "--docs", repo["docs"]], repo["root"])
    assert result.returncode == 0, result.stderr
    out = json.loads(result.stdout)
    affected = {p["file"]: p["changed_sources"] for p in out["affected_pages"]}
    assert affected == {"the-database.md": ["src/db.js"],
                        "routes.md": ["src/routes/todos.js"]}
    assert out["unmapped_files"] == ["orphan.txt"]


def test_update_refreshes_sha_and_pages_keeps_quizzes(repo):
    run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    run_manifest(["record-quiz", "--docs", repo["docs"],
                  "--page", "routes.md", "--score", "70"], repo["root"])
    old_sha = load(repo)["git_sha"]
    commit_change(repo, "docs/explained/new-page.md",
                  "---\ntitle: New\nsource_files: [src/app.js]\n---\nBody\n")
    result = run_manifest(["update", "--docs", repo["docs"]], repo["root"])
    assert result.returncode == 0, result.stderr
    manifest = load(repo)
    assert manifest["git_sha"] == head_sha(repo) != old_sha
    assert "new-page.md" in {p["file"] for p in manifest["pages"]}
    assert manifest["quizzes"] == [{"date": manifest["quizzes"][0]["date"],
                                    "page": "routes.md", "score": 70}]
    # diff is empty right after update
    out = json.loads(run_manifest(["diff", "--docs", repo["docs"]],
                                  repo["root"]).stdout)
    assert out["changed_files"] == []


def test_record_quiz_appends(repo):
    run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    for page, score in [("the-database.md", 40), ("the-database.md", 85)]:
        result = run_manifest(["record-quiz", "--docs", repo["docs"],
                               "--page", page, "--score", str(score)],
                              repo["root"])
        assert result.returncode == 0, result.stderr
    quizzes = load(repo)["quizzes"]
    assert [(q["page"], q["score"]) for q in quizzes] == \
        [("the-database.md", 40), ("the-database.md", 85)]
    assert all(q["date"] for q in quizzes)


def test_record_quiz_rejects_unknown_page_and_bad_score(repo):
    run_manifest(["init", "--docs", repo["docs"]], repo["root"])
    result = run_manifest(["record-quiz", "--docs", repo["docs"],
                           "--page", "nope.md", "--score", "50"], repo["root"])
    assert result.returncode != 0 and "not in manifest" in result.stderr
    result = run_manifest(["record-quiz", "--docs", repo["docs"],
                           "--page", "routes.md", "--score", "101"],
                          repo["root"])
    assert result.returncode != 0 and "between 0 and 100" in result.stderr


def test_non_git_repo_errors_cleanly(tmp_path):
    docs = tmp_path / "docs" / "explained"
    write(docs / "00-start-here.md", PAGE_HUB)
    result = run_manifest(["init", "--docs", "docs/explained"], tmp_path)
    assert result.returncode != 0
    assert "git" in result.stderr.lower()


def test_diff_without_manifest_says_run_init(repo):
    result = run_manifest(["diff", "--docs", repo["docs"]], repo["root"])
    assert result.returncode != 0 and "init" in result.stderr
