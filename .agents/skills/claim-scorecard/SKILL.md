---
name: claim-scorecard
description: Track public advisors' (finfluencers, analysts, newsletter writers) checkable predictions to their outcomes — extract falsifiable claims from transcripts, newsletters, or pasted text into a deduped JSONL ledger, auto-expire claims past their window, resolve outcomes via web search, and render per-advisor scorecards with hit rates. Use when the user says "score this advisor", "track these predictions", "did his calls come true", "claim scorecard for <channel>", "log these calls", "how accurate is this analyst", or pastes advisor content and wants its predictions held to their windows.
---

# Claim Scorecard

Use this skill to turn an advisor's content stream into an accountability ledger. Predictions are cheap because nobody re-checks them; this skill records every checkable claim with its resolution window, expires it when the window closes, adjudicates it against independent evidence, and renders a hit rate the advisor never published.

The skill has two layers:

1. **Extraction discipline** — what enters the ledger, governed by `references/claim-extraction-rubric.md`.
2. **Ledger mechanics** — `scripts/claims_ledger.py` persists, expires, adjudicates, and renders. Claude extracts; the script persists.

## Definition Of Done

- Every checkable prediction in the source text is in the ledger with `claim`, `source`, `mechanism` (the advisor's stated reasoning, quoted), `confidence` tier, and a `window` where one exists.
- Every unfalsifiable claim encountered is in the ledger as `excluded` with an `exclusion_reason` — nothing silently dropped.
- Re-running `record` on the same claims file appends 0 rows (dedup by id).
- `check` has been run; every past-window claim is `expired`, no stale `open` rows.
- Every adjudication note names the outcome and carries a source URL **independent of the advisor**.
- `scorecard` rendered; hit rate stated with numerator/denominator, never a bare percentage.

## Core Principle

Only falsifiable claims enter the ledger; a claim with no checkable outcome or window is logged as `excluded` with the reason, not silently dropped.

The excluded list is itself a finding — an advisor whose output is 80% unfalsifiable is a different (and worse) result than one who goes 6/10 on dated calls. Dropping vague claims silently would flatter exactly the advisors who hedge most.

## Workflow

1. **Ingest.** Pasted text is the primary path — video transcripts, newsletter bodies, thread dumps, show notes. Fetching YouTube transcripts is the user's responsibility (transcript panel copy-paste, `yt-dlp`, etc.); this skill starts from text. Capture two facts before extracting: the **advisor slug** (e.g. `akshat-shrivastava`, `zerodha-varsity`) and the **publication date** — implied windows ("in the next 6 months") anchor to it.
2. **Extract claims.** Apply `references/claim-extraction-rubric.md` to the full text. For each claim, decide falsifiable vs. excluded, assign a confidence tier, quote the advisor's mechanism, and set a window. Write the result as a JSON array (schema below) to a temp file, e.g. `/tmp/claims.json`. Show the user the extraction before recording if the source is long or ambiguous.
3. **Record.** `python3 scripts/claims_ledger.py record --claims-json /tmp/claims.json --ledger <ledger.jsonl>`. The script appends only rows whose id (sha1 of claim+window, 10 hex chars) is not already present, and reports `appended N (skipped M duplicates)`. One ledger per project is fine — `source` distinguishes advisors and `scorecard --source` filters.
4. **Check.** `python3 scripts/claims_ledger.py check --ledger <ledger.jsonl>`. The only automatic transition: `open → expired` for rows whose `window.end` has passed. Undated rows never expire. Output lists every row pending adjudication.
5. **Resolve.** For each expired row, web-search the outcome. Search the claim's subject plus its window dates; prefer primary data (exchange closes, official statistics releases, company filings, court records) over commentary. Then:
   `python3 scripts/claims_ledger.py adjudicate --ledger <ledger.jsonl> --id <id> --status confirmed|refuted --note "<what actually happened> — <source URL>"`. If the evidence is genuinely ambiguous, leave the row expired and tell the user why rather than forcing a verdict.
6. **Render.** `python3 scripts/claims_ledger.py scorecard --ledger <ledger.jsonl> --source <advisor> > scorecard.md`. Emits status counts, hit rate among adjudicated, per-tier breakdown, expired-pending list, oldest open claims, and the excluded list.

## Claims JSON Schema (input to `record`)

A JSON array; one object per claim:

| Field | Required | Meaning |
|---|---|---|
| `claim` | yes | Self-contained restatement: subject + outcome + threshold + window. Readable without the source text. |
| `source` | yes | Advisor slug. Stable across sessions — it is the scorecard key. |
| `mechanism` | yes (predictions) | The advisor's stated reasoning, **quoted** from the source ("earnings upgrade cycle is intact"). Empty string only if they gave none. |
| `confidence` | yes (predictions) | `explicit-dated` \| `implied-window` \| `undated` — see rubric. |
| `window` | optional | `{"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}`. Omit to let the script parse dates from the claim text. Provide explicitly for quarters, "by end of", "next 6 months". |
| `status` + `exclusion_reason` | excluded rows only | `"status": "excluded"` with a one-line reason. No confidence/mechanism needed. |

## Ledger Row (what `record` writes)

```json
{"id": "86986736fd", "recorded": "2026-06-12", "source": "finfluencer-x",
 "claim": "Nifty 50 closes above 26000 by 2024-12-31",
 "window": {"start": "2024-12-31", "end": "2024-12-31"},
 "mechanism": "\"FII flows are reversing\"", "confidence": "explicit-dated",
 "status": "open"}
```

| Field | Set by | Notes |
|---|---|---|
| `id` | `record` | sha1 of claim+window, 10 hex — the dedup key and the `adjudicate --id` address |
| `recorded` | `record` | Date the row entered the ledger, not the publication date |
| `window` | `record` | Explicit input wins; else parsed from claim text; `null` = undated |
| `status` | machine | See status machine below |
| `adjudicated`, `note` | `adjudicate` | Verdict date + evidence ("what happened — URL") |
| `exclusion_reason` | `record` | Only on `excluded` rows |

## Worked Example

Source (newsletter, published 2026-01-05, advisor `macro-mike`):

> "The Fed will cut at the March 2026 meeting — the labor data already justifies it. I think the S&P ends the year above 7000. And honestly, crypto could do anything here."

Extraction → `/tmp/claims.json`:

```json
[
  {"claim": "Fed cuts rates at the March 2026 FOMC meeting",
   "source": "macro-mike",
   "mechanism": "\"the labor data already justifies it\"",
   "confidence": "explicit-dated",
   "window": {"start": "2026-03-17", "end": "2026-03-18"}},
  {"claim": "S&P 500 closes 2026 above 7000",
   "source": "macro-mike",
   "mechanism": "(none stated)",
   "confidence": "implied-window",
   "window": {"start": "2026-12-31", "end": "2026-12-31"}},
  {"claim": "crypto could do anything here",
   "source": "macro-mike",
   "status": "excluded",
   "exclusion_reason": "hedged — possibility claim only"}
]
```

Note the choices: the FOMC claim got the meeting dates as an explicit window (the parser only knows ISO-ish dates, not "March meeting"); "ends the year above 7000" resolves on the final close, so the window is the last trading day, and the tier is `implied-window` because the advisor said "the year", not a date; the crypto line went in as excluded, not dropped. Then:

```bash
python3 scripts/claims_ledger.py record --claims-json /tmp/claims.json --ledger macro.jsonl
python3 scripts/claims_ledger.py check --ledger macro.jsonl        # after 2026-03-18 → row 1 expires
# web-search "FOMC March 2026 decision" → federalreserve.gov statement
python3 scripts/claims_ledger.py adjudicate --ledger macro.jsonl --id <id> \
    --status confirmed --note "25bp cut announced 2026-03-18 — https://www.federalreserve.gov/..."
python3 scripts/claims_ledger.py scorecard --ledger macro.jsonl --source macro-mike > scorecard.md
```

## Status Machine

| Status | Entered by | Terminal? |
|---|---|---|
| `open` | `record` | no |
| `expired` | `check` (only when `window.end` < today) | no — awaits adjudication |
| `confirmed` | `adjudicate` | yes |
| `refuted` | `adjudicate` | yes |
| `excluded` | `record` (unfalsifiable, with reason) | yes — never expires, cannot be adjudicated |

`check` is the **only** automatic transition. Verdicts always pass through `adjudicate` with evidence in the note.

## Confidence Tiers

| Tier | The advisor said | Window source |
|---|---|---|
| `explicit-dated` | A date, quarter, month, or deadline ("by March 2026", "before the next Fed meeting on 2026-01-28") | Stated by the advisor |
| `implied-window` | A resolvable timeframe needing anchoring ("this year", "in the next 6 months", bare "2026") | Derived from publication date + convention |
| `undated` | A direction/level with no timeframe ("Nifty is going to 30k") | None — row stays open forever, scored only if it resolves |

## CLI Quick Reference

```bash
S=scripts/claims_ledger.py  L=claims-ledger.jsonl
python3 $S record --claims-json /tmp/claims.json --ledger $L   # persist (idempotent)
python3 $S check --ledger $L [--as-of 2026-06-12]              # auto-expire
python3 $S adjudicate --ledger $L --id ab12cd34ef \
    --status refuted --note "closed at 24,718 — <url>"          # verdict + evidence
python3 $S list --ledger $L [--status open] [--source advisor]  # inspect
python3 $S scorecard --ledger $L --source advisor > scorecard.md
```

All subcommands take `--ledger`; `record`/`check`/`adjudicate`/`list` take `--json` for machine output.

## Anti-Patterns

- **Counting hedged claims as predictions.** "Could", "might", "wouldn't be surprised if" are not calls — they are `excluded` (reason: hedged) unless the hedge wraps a concrete commitment. See the hedge taxonomy in the rubric.
- **Adjudicating from the advisor's own follow-up content.** "He said in the next video it played out" is not evidence — it is the advisor grading their own exam. Verdicts require an independent source URL.
- **Retro-fitting windows.** Never assign or narrow a window after looking at the outcome ("he said 2026, gold popped in March, so window = March"). Window is fixed at record time from the claim's own words; bare year stays the whole-year envelope.
- **Silently dropping unfalsifiable claims.** Vague claims go in as `excluded` with a reason. The excluded count is part of the advisor's profile.
- **Editing claim text after recording.** The id is a hash of claim+window — rewording later creates a duplicate row instead of updating. Get the claim wording right at extraction; if a row is genuinely wrong, tell the user and remove the bad line before re-recording.
- **Cherry-picking.** Record every checkable claim in the source, not just the bold or memorable ones — selective recording fabricates the hit rate in either direction.
- **Forcing verdicts on ambiguous outcomes.** "Roughly came true" is not `confirmed`. If the threshold wasn't met as stated, it's `refuted`; if the evidence can't settle it, it stays `expired` with a note to the user.

## Verification

After any record/check/adjudicate cycle:

```bash
# 1. Idempotency — re-run record with the SAME claims file; must append 0
python3 scripts/claims_ledger.py record --claims-json /tmp/claims.json --ledger $L
# expected tail: "appended 0 (skipped N duplicates)"

# 2. No stale rows — check twice; second run must report 0 newly expired
python3 scripts/claims_ledger.py check --ledger $L

# 3. Every adjudicated row carries an evidence note
python3 scripts/claims_ledger.py list --ledger $L --json | \
  python3 -c "import json,sys; rs=[r for r in json.load(sys.stdin) if r['status'] in ('confirmed','refuted') and not r.get('note')]; print(f'{len(rs)} verdicts missing notes')"

# 4. Unit tests
python3 -m pytest scripts/ -q
```

The scorecard is the judge: if its `open` count includes rows whose window visibly ended, `check` wasn't run; if the hit rate denominator differs from confirmed+refuted, the ledger is corrupt — re-read it with `list --json`.

## Final Response

When done, state: how many claims were extracted vs. excluded (and the top exclusion reasons), how many rows appended vs. skipped as duplicates, how many expired and how each was adjudicated (with the source URL), and the headline hit rate as a fraction. Keep it short — the scorecard file carries the detail.
