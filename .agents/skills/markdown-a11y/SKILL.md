---
name: markdown-a11y
description: >
  Markdown documentation accessibility audit and fix skill. Use this skill
  whenever the user asks to audit, review, scan, fix, or check markdown files
  for accessibility. Also trigger when the user asks about accessible markdown,
  emoji in documentation, heading hierarchy in .md files, alt text in markdown
  images, link text quality in README files, Mermaid diagram accessibility,
  ASCII art alternatives, or em-dash normalization. Covers 9 accessibility
  domains: descriptive links, alt text, heading hierarchy, tables, emoji,
  Mermaid/ASCII diagrams, em-dashes, anchor links, and plain language. Scans
  individual files, multiple files, or entire directories.
---

# Markdown Accessibility

Markdown is the lingua franca of developer documentation — READMEs, wikis,
changelogs, contributing guides, blog posts. When markdown is inaccessible,
screen reader users encounter ambiguous "click here" links, missing image
descriptions, broken heading hierarchies, emoji-as-meaning that conveys
nothing, and diagrams with no text alternative.

This skill audits markdown files across 9 accessibility domains and provides
auto-fixable remediation for most issues.

## How This Skill Works

1. **Read the scanning rules** from `references/scanning-rules.md`
2. **Scan each file** across all 9 domains
3. **Present findings** with severity, line numbers, and suggested fixes
4. **Apply fixes** using patterns from `references/fix-patterns.md`
5. **Report before/after scores**

Before scanning or fixing, always load both reference files.

## The 9 Accessibility Domains

| # | Domain | WCAG | What It Catches |
|---|--------|------|-----------------|
| 1 | Descriptive Links | 2.4.4 | "click here", "read more", bare URLs, repeated text |
| 2 | Image Alt Text | 1.1.1 | Missing alt, filename-as-alt, generic alt |
| 3 | Heading Hierarchy | 1.3.1 / 2.4.6 | Skipped levels, multiple H1s, bold-as-heading |
| 4 | Table Accessibility | 1.3.1 | Missing descriptions, empty headers, layout tables |
| 5 | Emoji | 1.3.3 / Cognitive | Emoji in headings, emoji-as-bullets, consecutive sequences |
| 6 | Diagrams | 1.1.1 / 1.3.1 | Mermaid without text alt, ASCII art without description |
| 7 | Em-Dashes | Cognitive | Em-dash, en-dash, `--` inconsistency in prose |
| 8 | Anchor Links | 2.4.4 | Broken internal anchors, heading-emoji anchor instability |
| 9 | Plain Language | Cognitive | Long paragraphs, long sentences, passive voice |

## Quick Audit Workflow

For a single file:

```
1. Read the file
2. Run markdownlint if available: npx --yes markdownlint-cli2 "<filepath>" 2>&1 || true
3. Scan all 9 domains per references/scanning-rules.md
4. Present findings table with severity and auto-fix classification
5. Ask user which fixes to apply
6. Apply approved fixes per references/fix-patterns.md
7. Report before/after score
```

For a directory:

```
1. Find all .md files (excluding node_modules, .git, vendor)
2. Scan each file
3. Present per-file scores and aggregate summary
4. Offer batch fixes for auto-fixable issues
```

## Emoji Preferences

Ask the user before scanning which emoji mode to use:

| Mode | Behavior |
|------|----------|
| **remove-decorative** (default) | Remove emoji from headings, bullets, consecutive sequences. Flag inline emoji for review. |
| **remove-all** | Remove every emoji. Preserve meaning in adjacent text. |
| **translate** | Replace known emoji with English text in parentheses: 🚀 → (Launch) |
| **leave-unchanged** | Skip emoji domain entirely |

## Scoring

Each file gets a 0–100 score with letter grade:

| Deduction | Per Issue |
|-----------|----------|
| Critical | −15 points |
| Serious | −7 points |
| Moderate | −3 points |
| Minor | −1 point |

| Score | Grade |
|-------|-------|
| 90–100 | A — Excellent |
| 75–89 | B — Good |
| 50–74 | C — Needs Work |
| 25–49 | D — Poor |
| 0–24 | F — Failing |

## Report Format

```
## Markdown Accessibility Audit: [filename]

**Lines scanned:** N
**Issues found:** N  |  **Auto-fixable:** N  |  **Needs review:** N
**Score:** [score]/100 ([grade])

### Findings by Domain

#### Domain 1: Descriptive Links
| # | Line | Severity | Current | Suggested Fix | Auto-fix? |
|---|------|----------|---------|---------------|-----------|

[repeat for each domain with findings]

### What's Done Well
- [positive patterns found]
```
