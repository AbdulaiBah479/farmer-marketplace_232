# Page templates

Skeletons for every page type in the doc-set. Replace everything in `<angle brackets>`; keep the structure. Every page starts with the frontmatter convention — it is what lets `manifest.py diff` map code changes back to pages.

## The frontmatter convention (every page, no exceptions)

```markdown
---
title: <Plain-language page title>
source_files: [<repo-root-relative paths; folders end with />]
---
```

Rules:
- Paths are relative to the **repo root**, exactly as `git diff --name-only` prints them.
- A folder entry ends with `/` and claims everything under it: `src/routes/`.
- Every file the page quotes a snippet from must be covered by `source_files` (directly or via a folder entry).
- Keep the list tight — a page claiming `src/` matches every diff and defeats targeted re-explain.

---

## Hub page — `00-start-here.md`

```markdown
---
title: Start here — what <app name> actually is
source_files: [<entry point>, <main config/manifest>]
---

# Start Here — what this app is

You built <app name> with <how: "Claude writing most of the code">. It <what it
does for you, one sentence>. This doc-set walks through what's actually
happening, from the ground up. No assumed knowledge.

By the end you should be able to point at any file in the repo and say roughly
what it does and why it exists.

## The whole thing in one picture

1. <Step one in plain words — who asks whom for what> → [[<depth-page>]]
2. <Step two> → [[<depth-page>]]
3. <Step three> → [[<depth-page>]]
4. <Step four — where things are stored / how they come back> → [[<depth-page>]]

## Where to go next

- Never written code before? Start with the basics → [[<foundations-page>]]
- Want to follow one click through the whole system? → [[<walkthrough-page>]]
- Want to change something today? → [[where-to-change]]
- Who are all the moving parts? → [[the-cast]]
- Confused by a word? → [[glossary]]

## What changed since you last understood this

<!-- re-explain mode appends dated entries here, newest first -->
```

The changelog section is created empty (or omitted) on first run; re-explain owns it afterward. Entry format:

```markdown
### <YYYY-MM-DD>
- <Plain-language change> — see [[<patched-page>]]
```

---

## Depth page — `<slug>.md`

```markdown
---
title: <What this page explains, in their words>
source_files: [<the files this page quotes>]
---

# <Title>

<HOOK: 1-2 sentences addressed to the reader about THEIR app. "You built X
and it does Y — this page explains the part that makes Y happen.">

## What is <the primitive>?

<ZERO-KNOWLEDGE DEFINITION: "X is a Y. You do Z with it." Flat sentences,
no jargon defined in terms of other jargon.>

The catch: <THE PROBLEM IT SOLVES — why this thing has to exist at all.>

## Your <primitive>

<Within ~10 lines of the definition. Exact location:>

`<path/to/file.ext>:<line>`:

```<lang>
<verbatim snippet from the repo — do not clean it up>
```

Translated: "<one plain sentence saying what the snippet does>."

<1-3 paragraphs walking the rest of THEIR usage: the design choice they made,
why it's shaped this way, any honest gap or oddity worth knowing.>

## Go deeper

- [[<adjacent-page>]] — <why you'd go there>
- [[<adjacent-page>]] — <why you'd go there>
```

---

## Walkthrough page — `<one-action-end-to-end>.md` (exactly one per doc-set)

```markdown
---
title: One <action> from click to <result>, end to end
source_files: [<every file on the trace>]
---

# One <Action>, End to End

You <do the real thing: "type a todo and click Add">. Here is everything that
happens, through every layer, with the exact file and line at each hop.

```
[YOU <DO THE THING>]
   │  <file>:<line> — <what fires>
   ▼
<next hop — function/request/message>            <file>:<line>
   │
   ▼
[CROSSES <THE BOUNDARY: network / process / disk>]
   │
   ▼
<hop>                                            <file>:<line>
   ▼
<hop>                                            <file>:<line>
   │
   ▼
[YOU SEE <THE RESULT>]
```

<N> hops, but only <M> kinds of thing happen: <pattern 1>, <pattern 2>,
<pattern 3>. Every feature in this app is some arrangement of those.

## The hops, one by one

### Hop 1 — <name> (`<file>:<line>`)
<2-4 sentences: what this hop receives, what it does, what it passes on.>

### Hop 2 — <name> (`<file>:<line>`)
<...one subsection per hop, each citing its file...>
```

Boundary crossings get bracketed callouts in the diagram — that's where the reader's mental model usually breaks, so make them impossible to miss.

---

## Cast table page — `the-cast.md`

```markdown
---
title: The cast — every moving part in one table
source_files: [<dependency manifest>, <entry point>]
---

# The Cast, In One Table

Every load-bearing component in <app name>, what it actually is, and why it's
here. This is the table to reread before explaining your app to anyone.

| Component | What it actually is | Its job in <app name> | Why this design | Files to open |
|---|---|---|---|---|
| **<Component>** | <zero-knowledge definition> | <what it does in THIS app> | <the honest answer to "why did you use this?"> | `<path>`<br>`<path>` |
| **<Component>** | ... | ... | ... | ... |
```

Row order: outermost first (runtime, framework), then their own modules, then storage, then dev tooling. "Why this design" is written so the reader can repeat it out loud — including honest trade-offs and known gaps.

---

## Where-to-change page — `where-to-change.md`

```markdown
---
title: Where to look first if you want to change something
source_files: [<the files named in the table>]
---

# Where to Look First If You Want to Change Something

| You want to… | Look at… |
|---|---|
| <Change how it looks> | `<path>` |
| <Add a new <thing>> | <the 2-3 file recipe: "add X in `a.js`, expose it in `b.js`, call it from `c.js`"> |
| <Change what gets stored> | `<path>` |
| <Common config change> | <"don't change code — set `<ENV_VAR>`"> |
```

Rows are real intentions this reader will actually have, not a file inventory. Recipes over locations: when a change spans files, give the ordered file list.

---

## Glossary page — `glossary.md` (optional, medium/large repos)

```markdown
---
title: Glossary — every term in these notes, in plain words
source_files: []
---

# Glossary

- **<Term>** — <one-sentence zero-knowledge definition, ideally pointing at
  where it shows up in their app>.
```

One line per term, alphabetical, no term defined using an undefined term. The glossary may have empty `source_files` — it's the only page allowed to.
