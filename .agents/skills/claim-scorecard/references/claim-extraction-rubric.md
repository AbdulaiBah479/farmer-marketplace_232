# Claim Extraction Rubric

What enters the ledger, in which tier, with which window. Apply this to the full source text — every sentence that asserts something about the future gets classified, either as a recordable claim or as an explicit exclusion.

## What counts as falsifiable

A claim is recordable when **both** hold:

1. **Checkable outcome.** A third party with public data could mark it true or false — a price level, an event happening or not, a number crossing a threshold, a release/launch/ruling occurring. If two reasonable people could disagree about whether it "came true", tighten the restatement until they couldn't; if you can't, exclude it.
2. **Explicit or implied window.** A date, period, deadline, or a timeframe that can be anchored to the publication date. A claim with a checkable outcome but genuinely no timeframe is still recordable as `undated` — it just never auto-expires and only scores if the outcome resolves it.

The recorded `claim` field is a **self-contained restatement**: subject + outcome + threshold + window, readable without the source text. "Nifty closes above 30000 in 2026" — not "the index will do well".

| Source sentence | Verdict |
|---|---|
| "Nifty will cross 30,000 by December 2026" | Record — `explicit-dated` |
| "I expect two rate cuts this year" (published 2026-02) | Record — `implied-window`, window 2026-02-XX..2026-12-31 |
| "Bitcoin is going to $250k" | Record — `undated` |
| "Small caps are where the smart money is going" | Exclude — no checkable outcome |
| "This could be the year gold surprises everyone" | Exclude — hedged, no committed outcome |
| "Markets will be volatile" | Exclude — always true at some scale; no threshold |

## Confidence tiers

| Tier | Definition | Examples |
|---|---|---|
| `explicit-dated` | The advisor stated the date/period themselves | "by March 2026", "before the June FOMC", "in Q3 2026", "within 90 days" (anchor stated) |
| `implied-window` | The timeframe must be anchored to the publication date or to convention | "this year", "in the next 6 months", "by next Diwali", bare "2026" inside the claim |
| `undated` | Checkable outcome, no timeframe at all | "Nifty is headed to 30k", "this company will be a 10-bagger" |

Tier describes the **window's grounding**, not the advisor's conviction. A pounding-the-table undated call is still `undated`.

## Hedge taxonomy

| Pattern | Handling |
|---|---|
| "could", "might", "may", "potentially" | **Exclude** (reason: hedged) — possibility claims are unfalsifiable; "X could happen" is true whether or not X happens. Exception: a hedge wrapping a concrete commitment elsewhere in the same breath ("could even hit 35k, but I'm confident about 30k by Dec") → record the committed part only. |
| "I think", "I believe", "in my view" | **Record.** These mark opinion, not optionality — the content is still a committed prediction. |
| "wouldn't be surprised if", "don't rule out" | **Exclude** (reason: hedged) — explicitly engineered to be unfalsifiable. |
| "If X, then Y" | Record **only if X is itself checkable**; restate as the conditional and adjudicate in two steps (did X happen? then did Y?). If X never happens inside the window, the row is `refuted` only when the advisor asserted X too; otherwise note "antecedent unmet" and leave expired. Vague antecedents ("if the macro cooperates") → exclude. |
| "Target 30,000" / price targets with no date | Record as `undated` unless the format implies one (a "2026 target" → bare-year envelope). |
| "Should" ("Nifty should test 30k") | Treat as a prediction — record, with the tier the timeframe earns. |

## Window conventions

The script (`scripts/claims_ledger.py`) auto-parses from claim text: `YYYY-MM-DD` (that day), `YYYY-MM` (that month), `20XX–20YY` ranges, and bare years. Everything else needs an explicit `window` object at extraction time.

| Advisor phrasing | Window | How |
|---|---|---|
| Bare year ("in 2026") | `2026-01-01 .. 2026-12-31` — the **whole-year envelope** | Auto-parsed; never narrow it later |
| "by end of 2026" | publication date `.. 2026-12-31` | Explicit window (auto-parse would set start to Jan 1 — fine if publication date is unknown, but anchor when you have it) |
| Quarter ("Q3 2026") | `2026-07-01 .. 2026-09-30` | Explicit window — the parser does not know quarters |
| Month ("in March 2026") | `2026-03-01 .. 2026-03-31` | Explicit window, or phrase the claim with `2026-03` |
| "this year" / "next year" | publication year envelope / following-year envelope | Explicit window anchored to publication date |
| "in the next N months/weeks" | publication date `.. publication date + N` | Explicit window |
| "soon", "eventually", "in the coming period" | none | `undated` if the outcome is checkable; exclude if not |
| Multiple dates in one claim | earliest start `.. ` latest end | Auto-parsed envelope |

Beware year-lookalike numbers: a price like "2026 on the S&P" parses as a year. When the claim text contains such numbers, pass the window explicitly.

## Exclusion logging

Excluded claims are **recorded, not dropped** — the proportion of unfalsifiable content is part of the advisor's profile. Entry shape:

```json
{"claim": "small caps are where the smart money is going",
 "source": "advisor-a", "status": "excluded",
 "exclusion_reason": "no checkable outcome — no threshold, no metric"}
```

Standard reasons (pick the most specific):

- `no checkable outcome` — no threshold/metric/event a third party could verify
- `hedged — possibility claim only` — "could/might/wouldn't be surprised"
- `unresolvable antecedent` — conditional on something unfalsifiable
- `tautological / always true at some scale` — "volatility ahead", "stock-picker's market"
- `value judgment, not prediction` — "X is overrated", "this is a great business"

Do not exclude merely because adjudication will be **hard** (an obscure data series, a private metric the company sometimes discloses). Exclude only when adjudication is **impossible in principle**. Hard-to-check claims go in as predictions; if the evidence never materializes, they simply stay expired with a note.
