# Research Checklist — per-tier source inventory and query patterns

All query patterns are generic. Substitute `<company>`, `<old-name>`, `<interviewer>`, `<role>`, `<city>` from intake. If the company has rebranded, run every T1 query twice — once per name. Old names unlock the press archive that the new name hides.

## Tier 1 — Facts

### 1.1 Funding timeline

| Query pattern | What it surfaces |
|---|---|
| `"<company>" series A OR B OR seed funding announcement` | Round press releases with amounts, dates, lead investors |
| `"<company>" raises site:techcrunch.com OR site:businesswire.com OR site:prnewswire.com` | Primary announcements (most reliable for amount + date) |
| `"<company>" crunchbase` / `"<company>" total funding` | Aggregator view — treat as index, verify each round against primary press |
| `<lead-investor> "<company>" portfolio` | The investor's own announcement post — this carries the **funding thesis** in the investor's words (T2 input) |
| `"<company>" valuation` | Usually leaks only at later stages; mark single-source unless 2+ outlets agree |

Capture per round: date, amount, lead + participants, the investor's stated reason. The thesis sentence in the lead investor's announcement is institutional language for what they think they bought — quote it verbatim.

### 1.2 Revenue / ARR / customers

| Query pattern | What it surfaces |
|---|---|
| `"<company>" ARR OR revenue OR customers` | Founders disclose at raise time; numbers are dated — record the date with the number |
| `"<company>" "<founder>" interview revenue` | Podcast/interview disclosures, often more candid than press releases |
| `"<company>" customers case study` | Named customer outcomes (useful for mirroring their economics vocabulary in T3 answers) |

Rule: a revenue number is only as current as its disclosure date. "$XM ARR (as of <date>, per <source>)" is a fact; "$XM ARR" with no date is not. If you must extrapolate growth, present a band and show the derivation.

### 1.3 Headcount + org chart

| Query pattern | What it surfaces |
|---|---|
| `site:linkedin.com "<company>" "product manager" OR "<role>"` | Who holds which seats; hiring posts often name the reporting line ("reporting to our Head of X") |
| `"<company>" careers` + the careers page itself | Open reqs = where money is going; the *absence* of a req for a vacant senior seat is a finding |
| `"<company>" jobs <job-board>` (regional boards too) | JD language — what the role actually owns, in the company's own words |
| `site:linkedin.com "<company>" "promoted to"` | Promotion precedents: who rose, from what, how fast |
| `"<company>" employees number OR headcount` | Headcount over time (funding press usually states it per round) |

Build the org sketch for the candidate's function: names, titles, tenure, who reports to whom, vacant seats and how long they've been vacant, and 1–2 promotion stories. Note which prior backgrounds the leadership bench shares — that is the path the company rewards.

### 1.4 Interviewer's public vocabulary (highest-leverage T1 artifact)

| Query pattern | What it surfaces |
|---|---|
| `"<interviewer>" interview OR podcast OR keynote` | Long-form voice artifacts — transcripts beat summaries |
| `"<interviewer>" site:youtube.com` | Talks and demos; auto-transcripts are quotable with timestamps |
| `"<interviewer>" "<company>" quote` + each funding announcement | The canned quote per round — compare them across rounds for drift |
| `"<interviewer>" op-ed OR blog OR "written by"` | Their actual writing (densest signal of how they think) |
| `"<interviewer>" twitter OR X OR linkedin posts` | Check activity level first — a dormant account is a stale signal, note it and move on |

Method: collect quotes **across years**, oldest to newest, each with date + URL. Then:

- **Repeated phrases** (verbatim, 2+ years apart) → mental models. List them with every occurrence.
- **Drift** — what they said in old press and stopped saying (e.g., they once named competitors and no longer do) → strategic inflection evidence for T2.
- **Absent vocabulary** — hype terms and buzzwords that never appear across the whole trace → the do-NOT-say input.
- If the interviewer has near-zero public trace, say so explicitly and shift weight to the company voice (blog, release notes, JD language). Do not fabricate a psychology from one quote.

### 1.5 Culture signal

| Query pattern | What it surfaces |
|---|---|
| `"<company>" reviews <review-site>` | Score + n. **Always report with the caveat**: review sites oversample the angry and the recently-departed; small n amplifies it |
| `"<company>" values OR culture careers` | Stated values — useful mainly to test against observed behavior (promotion speed, attrition, JD tone) |
| `site:linkedin.com "<company>" "left" OR "joined"` | Senior arrivals/departures in the last 12 months |

### 1.6 Strategic-inflection raw material (feeds T2)

| Query pattern | What it surfaces |
|---|---|
| `web.archive.org` snapshots of the company homepage, /pricing, /compare or /vs pages, 12–24 months apart | **Site diffs.** What they deleted is the strategy: dropped competitor comparisons, renamed products, repositioned headlines |
| `"<company>" rebrand OR "formerly known as"` | Rebrand dates and the framing they chose |
| Careers page filtered by specialty | Hiring spikes in a new specialty = a bet visible before it's announced |

## Tier 1.5 — The fact-check pass (mandatory, after T1)

For every date and number collected:

1. Re-search it **fresh**, with a differently-worded query, not by re-opening the page you got it from.
2. Classify: confirmed (2+ independent sources) / single-sourced (mark it) / contradicted (correct or band it) / not found (cut it).
3. Write the results into a `fact-check.md` supporting page: item, sources, verdict, correction if any. This page is the audit trail READ-FIRST leans on.

Aggregators citing each other are ONE source. A press release and an article rewriting that press release are ONE source. Independence means independent reporting chains.

## Tier 2 — Structure (no new searching; interpretation of T1)

Checklist per artifact:

- **Mental models:** each model cites ≥2 dated quotes. State the model, then the answer-framing instruction ("route value claims through X, never through Y").
- **Power axis:** reporting lines, vacant seats + duration, promotion precedents, the shared background of the leadership bench. End with one plain sentence: "the path to power here runs through ___."
- **Inflection points:** each inflection cites its artifact (site diff, thesis quote, hiring spike, rebrand). State where the company is *mid-way through*, not just that the inflection happened.

## Tier 3 — Questions (sources already in hand)

- Five must-nail questions: pick by (probability of arriving × cost of fumbling) for this round type. Founder/final rounds skew toward "why leave / why us / biggest claim / what do we get wrong / how would you approach our work."
- For the red-team on the candidate's claims, the only new searching needed is **external benchmarks**: `<metric> benchmark <industry> <stage>` — is the candidate's number plausible at that company size? What would a skeptic's first follow-up be?

## Tier 4 — Decision (sources already in hand + intake)

- Comp benchmarks if needed: `<role> salary <city> <stage> <year>` and levels-style aggregators — bands only, marked as bands.
- Runway math: total raised − estimated burn (headcount × loaded cost) = band, not point. Name it as derived.
- Everything else comes from intake (current situation) + T1/T2 (upside/downside evidence).
