---
name: explain-my-app
description: Generate a personalized, plain-English explanation of the user's own codebase as a linked doc-set living in their repo, then track comprehension over time — re-explain only what changed since the last run, and quiz them from their own docs. Use when the user says "explain my app", "explain this codebase to me", "I vibe-coded this and don't understand it", "re-explain what changed", or "quiz me on my codebase".
---

# Explain My App

Use this skill for people who vibe-coded an app and don't understand it. The output is not a chat answer — it is a **doc-set committed into their repo** (`docs/explained/` by default, configurable), written about THEIR code, linked together with `[[wikilinks]]`, and tracked by a git-SHA manifest so later runs can re-explain only what changed and quiz them on what they should know by now.

Three modes share one doc-set: **explain** builds it, **re-explain** patches it, **quiz** tests it.

## Definition of Done

- The doc-set exists in `docs/explained/` (or the directory the user chose).
- A hub page `00-start-here.md` plus **8–20 depth pages**, sized to the repo (see sizing table).
- **Every page passes the pedagogy checklist** (the table below). One failing row on one page = not done.
- Exactly **one end-to-end walkthrough page** traces a single real user action through every layer with `path:line` at each hop.
- Every generated page carries the frontmatter convention (`title:` + `source_files:`) so re-explain can map diffs to pages.
- The manifest exists at `<docs-dir>/.manifest.json`, written with the repo's **current git SHA** via `manifest.py init` (or `update`).
- All `[[wikilinks]]` resolve to existing pages in the doc-set. Zero dead links.
- Every code snippet's `path:line` re-checked against the working tree before finishing.

## Core Principle

**Explain THEIR code, not the technology.** Every primitive definition must be followed within ~10 lines by a snippet from THIS repo with its `path:line`.

The reader doesn't want a Node tutorial — they have one app, the one they built, and they want to finally understand *that*. Generic knowledge is only ever scaffolding for a jump into their own files. If a paragraph could be pasted into a different repo's docs unchanged, it fails.

## Modes

| Mode | Trigger | What happens | Precondition |
|---|---|---|---|
| **explain** | "explain my app", "I vibe-coded this and don't understand it" | Full doc-set generated from scratch, then `manifest.py init` | No manifest yet (or user explicitly wants a rebuild) |
| **re-explain** | "re-explain what changed", "what changed since last time" | `manifest.py diff` → patch ONLY affected pages → dated changelog in hub → `manifest.py update` | Manifest exists |
| **quiz** | "quiz me on my codebase" | One-question-at-a-time comprehension quiz from their own docs; scores recorded via `manifest.py record-quiz` | Doc-set + manifest exist |

Mode selection: if the user asks for "explain" but a manifest already exists, say so and offer re-explain — a rebuild throws away their quiz history and the dated changelog. If they ask to re-explain or quiz with no manifest, fall back to explain first.

All `manifest.py` invocations below use the script shipped with this plugin:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" <subcommand> --docs docs/explained
```

## Choosing the docs directory

Default is `docs/explained/` at the repo root. Override only if the user asks or the repo already has a docs convention (`documentation/`, `notes/`, a docs site). Whatever is chosen:

- it must live **inside the git repo** (the manifest's SHA tracking depends on it), and
- use the same `--docs` path in every later `manifest.py` call — the manifest lives at `<docs-dir>/.manifest.json`.

If a manifest exists somewhere, that's where the doc-set lives; find it with `git ls-files --others --cached '*.manifest.json'` before assuming the default.

## Bundled files

| File | What it's for |
|---|---|
| `references/pedagogy.md` | The teaching method in full, with worked example passages — read before writing any page |
| `references/page-templates.md` | Skeletons for hub, depth, walkthrough, cast, where-to-change, and glossary pages |
| `scripts/manifest.py` | The manifest tool: `init` / `diff` / `update` / `record-quiz` |

## Explain workflow (first run)

### 1. Scan the repo

Read, in order: the README, the dependency manifests (`package.json`, `pyproject.toml`, `requirements.txt`, `go.mod`, …), the entry points they declare (`main`, `scripts.start`, `if __name__ == "__main__"`), and the directory tree. Then open the largest and most-imported source files. You are answering two questions: *what does this app do for its user* and *what are the moving parts*.

Useful sweeps:

```bash
git ls-files | head -100                                  # what's actually tracked
git ls-files | xargs wc -l 2>/dev/null | sort -rn | head  # where the weight is
grep -rl "listen\|app.run\|if __name__\|func main" --include='*.js' --include='*.ts' --include='*.py' --include='*.go' .   # entry points
```

Also ask the user one question if the README doesn't answer it: *"what does this app do, in your words?"* — their answer gives you the hook vocabulary for every page (their feature names, not the code's).

### 2. Build the cast table

Before writing any page, build the cast — every load-bearing component in one table:

| Component | What it actually is | Its job in this app | Why this design |
|---|---|---|---|

"What it actually is" is the zero-knowledge definition ("a database that lives in a single file on your disk — no server"). "Why this design" is the answer the reader gives when someone asks them *why did you use X* — make it honest, including known gaps. This table becomes a page of its own (`the-cast.md`) and is your outline for the depth pages.

### 3. Choose 8–20 page topics, sized to the repo

| Repo size | Pages | Composition |
|---|---|---|
| Tiny (< ~1k LOC, one process) | 8–10 | hub, 2–3 foundations, 2–3 subsystems, cast, walkthrough, where-to-change |
| Medium (~1–10k LOC, few processes/services) | 11–15 | hub, 3–4 foundations, 4–6 subsystems, cast, walkthrough, where-to-change, glossary |
| Large (> ~10k LOC, multiple services) | 16–20 | as above + one page per service/boundary crossing |

Always present: the hub, the cast table page, ONE walkthrough page, a where-to-change page. Foundations pages cover the primitives this reader is missing (what is a server, what is a process, what is an ORM) — scoped to what *their* stack actually uses, nothing speculative.

### 4. Write the hub page (`00-start-here.md`)

Three parts, in order:

1. **Hook addressed to the reader**: "You built X with Claude generating most of the code. This walks through what's actually happening, from the ground up. No assumed knowledge."
2. **The whole thing in one picture**: a numbered 3–5 step plain-language summary of how the app works, each step ending in a `[[wikilink]]` to the depth page that expands it.
3. **Where to go next**: a short list of entry questions ("Confused by a word? → `[[glossary]]`", "Want to change something? → `[[where-to-change]]`").

### 5. Write the depth pages

Each page follows the pedagogy checklist below, row by row. Page shape: hook → primitive defined at zero knowledge → the catch (the problem it solves) → THEIR code with `path:line` and a real snippet → translation of the snippet into one plain sentence → `[[wikilinks]]` to adjacent depth pages. See `references/pedagogy.md` for the method with worked examples and `references/page-templates.md` for skeletons.

Page naming: lowercase slugs that read like answers to the reader's questions — `the-database.md`, `how-login-works.md`, `the-cast.md` — because wikilinks display the slug (`[[how-login-works]]` should be self-explanatory in running text). Only the hub gets a number (`00-start-here.md`) so it sorts first in any file listing.

### 6. Write the walkthrough page

ONE page that traces a single **real** user action ("you click Add", "you type a message and hit enter") through every layer of the system — UI event, transport, handler, storage, response, render — with a `path:line` at every hop. Use a vertical arrow diagram (text, not images). Boundary crossings (process, network, disk) get called out explicitly in brackets. End with the count of hops and the small number of patterns they reduce to.

### 7. Write the manifest

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" init --docs docs/explained
```

This scans every page's `source_files:` frontmatter and records the current git SHA. If the repo has uncommitted changes, tell the user to commit first — the manifest SHA should describe the code the docs describe.

### 8. Verify (see Verification section), then hand over

Final message to the user: where the doc-set lives, which page to open first (`00-start-here.md`), and that they can come back later with "re-explain what changed" or "quiz me".

## Re-explain workflow

### 1. Diff since the manifest SHA

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" diff --docs docs/explained
```

Prints JSON: `changed_files` (git diff --name-only since the manifest's `git_sha`), `affected_pages` (pages whose `source_files` prefix-match a changed file), and `unmapped_files` (changed files no page covers).

### 2. Patch ONLY the affected pages

For each affected page: re-read the current code at its `source_files`, then edit the stale parts of the page — snippets, line numbers, explanations that no longer hold. Keep the voice and the pedagogy intact; this is a patch, not a rewrite. Do not touch pages the diff didn't implicate.

### 3. Triage unmapped files

For each entry in `unmapped_files`: if it's a new subsystem, write a new depth page for it (full pedagogy checklist) and link it from the hub; if it extends an existing concept, fold it into that page and add the path to that page's `source_files:`; if it's noise (lockfiles, generated output), ignore it.

### 4. Write the dated changelog section in the hub

Add or update a section in `00-start-here.md`:

```markdown
## What changed since you last understood this

### 2026-06-12
- The login flow now goes through middleware — see [[auth-middleware]]
- `src/db.js` switched from callbacks to prepared statements — [[the-database]] updated
```

Newest date on top. Each bullet is plain language + a wikilink to the patched page. This section is the reader's re-entry point — they read it instead of re-reading everything.

### 5. Update the manifest, verify

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" update --docs docs/explained
```

Then confirm `diff` now returns empty (see Verification).

## Quiz workflow

### 1. Pick pages by need, not randomly

Read the manifest's `quizzes` history. Weight selection toward pages **never quizzed**, then pages with the **lowest average score**. Skip the hub and glossary — quiz on substance. A session covers 3–5 pages, 4–7 questions total.

### 2. Ask ONE question at a time

Never dump a question list. Ask, wait for their answer, respond, then ask the next. Questions test **comprehension, not trivia**:

| Good (comprehension) | Bad (trivia) |
|---|---|
| "What happens if you delete `src/middleware/auth.js`?" | "What is the auth middleware file called?" |
| "Why does the request go through the validator before the handler?" | "How many fields does the schema have?" |
| "Where would you look first if saved todos stopped persisting?" | "What's the variable name for the DB connection?" |
| "Your friend says 'just call the database from the frontend' — why doesn't that work here?" | "What port does the server listen on?" |

### 3. Score honestly, record per page

After the answers, evaluate against the docs and the code — not against generosity. Partial understanding gets partial credit; a confident wrong answer scores lower than an honest "I don't know, but I'd check X". Calibrate on this rubric:

| Band | Means |
|---|---|
| 90–100 | Correct mechanism AND correct consequence — could fix a bug here unaided |
| 70–89 | Right mechanism, fuzzy on a detail or a consequence |
| 50–69 | Knows what the part is for, can't trace how it does it |
| 25–49 | Recognizes the name, wrong or missing mental model |
| 0–24 | Blank, or a confident wrong answer |

Convert to one 0–100 score per page (average if a page got multiple questions) and record each:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" record-quiz --docs docs/explained --page the-database.md --score 65
```

Tell them the score and why — the rubric line you placed them on, in one sentence. Silent scoring teaches nothing.

### 4. Report weak areas mapped to pages

End the session with: per-page scores, what specifically they got wrong (in one line each), and which pages to reread — as wikilinks/paths, so the remediation is one click away. If a page scores under ~50 twice, suggest re-reading it together rather than quizzing it again.

## Pedagogy checklist (every depth page must pass every row)

| # | Check | Pass looks like | Fail looks like |
|---|---|---|---|
| 1 | **Hook addressed to the reader** | Opens with "You built…" / "When you click…" — tied to their app | "In this chapter we will cover…" |
| 2 | **Primitive at zero knowledge** | "JavaScript is a programming language. You write instructions in a `.js` file, and something runs those instructions." | Assumes they know what a server, process, or schema is |
| 3 | **The catch** | States the problem the primitive solves: "The catch: JavaScript can't run on its own…" | A feature list with no tension, no *why* |
| 4 | **THEIR code, path:line** | A real snippet from this repo within ~10 lines of the definition, cited as `src/app.js:14` | Snippets from official docs or invented examples |
| 5 | **Wikilink depth** | `[[wikilinks]]` to deeper pages that exist | Dead links, or a page that's a cul-de-sac |
| 6 | **No generic tutorial prose** | Every paragraph names their files, their data, their design choices | Paragraphs that could describe any codebase |

Apply this table as a literal per-page gate before writing the manifest. Row 4 is the Core Principle in checklist form — it's the one vibe-explainers fail most.

## Doc page frontmatter convention

Every generated page starts with:

```markdown
---
title: How your routes work
source_files: [src/routes/, src/app.js]
---
```

Rules:
- Paths are **relative to the repo root**, matching what `git diff --name-only` prints.
- Folder entries end with `/` and match everything under them.
- Every file a page shows a snippet from MUST appear in its `source_files` (directly or via a folder entry) — this is the only thing that lets re-explain find the page when that file changes.
- The hub lists the top-level entry files; the walkthrough lists every file on its trace.

Wikilinks resolve within the doc-set: `[[the-database]]` → `<docs-dir>/the-database.md`. Optional display text: `[[the-database|how saving works]]`.

## Anti-patterns

- **Generic tutorial prose** that could describe any codebase. The test: paste the paragraph into another repo's docs — if it still reads fine, delete it.
- **Explaining the library instead of THEIR usage of it.** Three paragraphs on Express's history is a fail; "Express gives you `app.post(...)` — here's the one in your `src/app.js:31` and what it does when you click Add" is the job.
- **Pages with zero code snippets from the repo.** Even foundations pages must land in their code within ~10 lines (Core Principle).
- **HTML/course/site output.** This skill writes markdown into their repo. Slides, web pages, interactive courses are a different tool.
- **Wikilinks that don't resolve.** Every `[[target]]` must have a `<docs-dir>/target.md`. Check mechanically (Verification), not by memory.
- **Quizzing on trivia** — variable names, ports, field counts. Quiz on consequences and causality: delete-X, why-through-Y, where-would-you-look.
- **Rewriting unaffected pages during re-explain.** The diff defines the work. Untouched code = untouched page; that's the whole point of the manifest.
- **Inflating page count to hit a number.** 8 pages that each carry weight beat 20 thin ones. The range is a budget, not a quota.
- **Snippets edited "for clarity."** Show the real code, then translate it in prose. If the real code is confusing, that's worth a sentence — not a silent cleanup.

## Verification

Run all of these before declaring any mode done; fix and re-run until green.

**1. Every snippet's path re-checked against the working tree.** For each page, take each cited `path:line` and confirm the file exists and the quoted code is really there:

```bash
# for each snippet: does the file exist and contain the quoted line?
grep -nF "<first line of the snippet>" <cited-path>
```

The grep's reported line number should match (or sit within a couple lines of) the cited line number. A miss means the citation is stale or invented — fix the page.

**2. All wikilinks resolve.**

```bash
cd <repo-root>
grep -rhoE '\[\[[^]|]+' docs/explained --include='*.md' | sed 's/\[\[//' | sort -u | \
  while read -r slug; do [ -f "docs/explained/$slug.md" ] || echo "DEAD LINK: $slug"; done
```

Zero `DEAD LINK` lines, or it's not done.

**3. Manifest validates as JSON and carries the right SHA.**

```bash
python3 -c "import json; m=json.load(open('docs/explained/.manifest.json')); print(m['git_sha'], len(m['pages']), 'pages')"
git rev-parse HEAD   # must match the printed SHA
```

**4. `diff` returns empty right after init/update.**

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/manifest.py" diff --docs docs/explained
```

`changed_files`, `affected_pages`, and `unmapped_files` must all be `[]`. Anything else means the manifest SHA and the working tree disagree — usually uncommitted changes; resolve before handing over.

**5. Pedagogy gate.** Re-read each depth page against the six-row checklist. Any page failing any row gets fixed before the manifest is written.

## Final response

When done, state:

- which mode ran and where the doc-set lives
- page count (hub + N depth pages) and which page to open first
- explain: one-line tour of the page topics; re-explain: which pages were patched and what the changelog says; quiz: per-page scores + pages to reread
- verification results: snippet checks, wikilink check, manifest JSON valid, diff empty
- the two comeback phrases: "re-explain what changed" and "quiz me on my codebase"

Keep it short. The docs are the deliverable, not the summary.
