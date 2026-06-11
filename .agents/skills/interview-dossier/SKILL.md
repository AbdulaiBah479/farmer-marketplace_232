---
name: interview-dossier
description: Build an adversarially-verified interview dossier on a company and one named interviewer for a specific high-stakes interview — four tiers from verified facts to a night-before decision frame, heavy web research, every claim sourced. Use when the user says "interview prep for <company>", "build a dossier", "I have a founder round", "research this company for my interview", "prep me for the CEO round", or wants serious research before a final/skip-level/founder interview rather than generic question lists.
---

# Interview Dossier

Use this skill to build a research dossier for ONE specific interview: one company, one round, ideally one named interviewer. The output is a dossier folder whose entry point is a single document — `READ-FIRST.md` — that the candidate reads the night before in twenty minutes, backed by supporting pages they can dive into if they want depth.

The dossier is built in four tiers, each consuming the one below it:

1. **T1 — Facts.** Public, auditable, re-verified. Funding, revenue, headcount, org shape, the interviewer's own public words across years.
2. **T2 — Structure.** Interpreted but defensible. The interviewer's mental models, where power actually runs in the org, the company's strategic inflection points.
3. **T3 — Questions.** Engineered answers for the five questions most likely to decide the round, questions to ask back ranked by information value, and a red-team pass on the candidate's own claims.
4. **T4 — Decision.** The honest read: asymmetric-bet frame, an if-X-then-Y offer matrix with real thresholds, validation questions, and a night-before checklist.

The tiers gate each other. T2 interpretations may only stand on T1 facts that survived the fact-check pass. T3 answers may only cite T1/T2 material the candidate could defend if challenged with "where did you hear that?". T4 thresholds come from the candidate's own intake numbers, not from vibes. If a tier is thin, the right move is to say so in READ-FIRST — never to pad it with speculation dressed as analysis.

Tone throughout: clinical, numbers-first, every claim sourced. The dossier's job is not to pump the candidate up. Its job is the sentence that anchors Tier 4: **stop selling the role to yourself — tell the truth instead.**

## Definition Of Done

- A dossier folder exists with `READ-FIRST.md` at its root plus supporting pages (one page per research area, linked from READ-FIRST).
- `READ-FIRST.md` has **at most 7 sections** and is readable the night before in **20 minutes**. If it can't be read in 20 minutes, it is not done — cut, don't compress into denser jargon.
- Every claim in `READ-FIRST.md` traces to a supporting page, and every claim in a supporting page traces to a source (URL, document, or "user-provided" — named explicitly).
- The fact-check pass has been run: every date and number in READ-FIRST was re-searched after drafting, not just trusted from the first pull.
- Zero unverified numbers presented as facts. Estimates are labeled as estimates with their derivation. Single-sourced claims carry "(single source)" inline.
- The red-team pass has been run against the dossier itself and against the candidate's own headline claims.
- The do-NOT-say list exists and is specific to this candidate's situation, not generic etiquette.
- The five must-nail questions each have all three parts: named trap, concession-first opener, re-anchor. A question with two of three is not done.

## Core Principle

**One document the candidate reads the night before. Depth pages are optional dives — never make them read 37 files.**

Research naturally sprawls. The discipline of this skill is that sprawl lives in supporting pages, and a single entry document carries everything that must survive into the room. If a finding doesn't change what the candidate says, asks, or decides, it does not belong in READ-FIRST — link it or cut it.

The second principle, inherited from the fact-check tier: **an estimate used five times is still an estimate.** When a derived number (revenue guess, runway math, growth rate) feeds five downstream conclusions, all five inherit the uncertainty band of that one input. Never let chained arithmetic launder a guess into a fact.

## Dossier Folder Layout

Create a folder named for the round (e.g. `dossier-<company>-<round>/`). Typical shape — adjust page names to what the research actually surfaced, but keep one page per research area:

```
dossier-<company>-<round>/
├── READ-FIRST.md            # the product: ≤7 sections, 20-minute read
├── funding-timeline.md      # T1: rounds, amounts, investors, disclosed metrics, all dated
├── org-and-power.md         # T1+T2: org sketch, vacancies, promotion precedents, power axis
├── founder-voice-trace.md   # T1: every interviewer quote, verbatim, dated, linked
├── site-diffs.md            # T1: archived-snapshot comparisons, rebrand trail
├── question-prep.md         # T3: full scripts for the five must-nail questions
├── questions-to-ask.md      # T3: EV-ranked asks + reserves, with deployment timing
├── red-team.md              # T3+T5: pressure test of candidate claims + do-NOT-say list
├── offer-matrix.md          # T4: if-X-then-Y table with derivations, validation questions
└── fact-check.md            # the audit trail: every number's verdict
```

READ-FIRST links into these pages; the pages link to sources. Two hops from any claim in READ-FIRST to a URL — that's the trace contract.

### Supporting page conventions

Each supporting page follows the same skeleton so the trace audit is mechanical:

```markdown
---
purpose: <one line — what question this page answers>
sources_pulled: <date>
---

# <Page title>

<Findings as prose. Every number carries (date, source). Every quote is
verbatim with date + URL. Estimates say "estimate" and show the derivation.>

## Sources
- <URL or document> — what it supplied, accessed <date>
```

Two conventions that matter more than they look:

- **Quotes are verbatim or they are paraphrases, and the page says which.** A paraphrase presented as a quote will eventually be deployed in the room as a quote, and the interviewer knows what they actually said.
- **Negative findings are findings.** "No public salary disclosure in any posting," "no podcast appearances found for the interviewer," "no senior product req live" — write them down. They shape T3/T4 (who anchors first in negotiation, how much weight the voice trace can bear) and they stop the next pass from re-searching the same dead ends.

### Effort budget

For a high-stakes final round, the work splits roughly: T1 research 40%, fact-check 10%, T2 15%, T3 20%, T4 10%, red-team + assembly 5%. If total time is short, shrink T1's breadth (fewer research areas, same rigor) — never the fact-check, and never the red-team. A thin verified dossier beats a thick unverified one; the failure mode to avoid is ten pages of unchecked facts feeding confident conclusions.

## Workflow

### Step 0 — Intake (always first, before any research)

Ask the user for:

1. **Company** (and product names / domains if it has rebranded — old names are search keys that unlock the press archive the new name hides).
2. **Role and level** they're interviewing for.
3. **Round and interviewer** — name and title if known. If unknown, research proceeds on the likely interviewer pool (founders for early-stage final rounds, hiring manager + skip-level otherwise) and READ-FIRST says which assumption it made.
4. **Their current situation** — current role, comp shape, promotion horizon, what they'd give up by moving (unvested equity, a pending promotion). This feeds the T4 thresholds; without it the offer matrix is fiction.
5. **Their 2–3 headline claims** — the CV bullets or stories they expect to be probed on, with the honest internals (was it solo or team? how was it measured?). These feed the T3 red-team and the do-NOT-say list.

Also confirm: when is the interview? The night-before checklist is calibrated to that date. If the interview is more than a few days out, say so and date the dossier — facts about a company mid-fundraise or mid-pivot go stale in weeks.

Capture intake at the top of READ-FIRST's frontmatter and in a short block you can re-check against later:

```yaml
company: <name>            # plus former names / domains
role: <role and level>
round: <round name>        # and what it is structurally, once T2 tells you
interviewer: <name, title> # or "unknown — assumed founder pool"
interview_date: <date>
current_situation: <role, comp shape, promotion horizon, what moving forfeits>
headline_claims:
  - <claim 1 + honest internals>
  - <claim 2 + honest internals>
```

Do not start searching before intake is complete. Research without the candidate's claims and thresholds produces a company report, not a dossier.

### Calibrating to the round type

The four tiers are constant; the weighting is not. Before T1, decide the round shape and let it set where the research hours go:

| Round type | Weight the research toward | Must-nail question skew |
|---|---|---|
| Founder / CEO final | Interviewer vocabulary trace (years of press), strategic inflections, T4 decision frame | why-leaving, why-us, biggest claim, what-do-we-get-wrong, roadmap approach |
| Hiring manager | Their team's org chart, promotion precedents, what the JD actually owns | biggest claim, working-style conflict story, how-you'd-ramp, why-us |
| Skip-level / exec | Power axis, the exec's public vocabulary, the strategy wedge | what-do-we-get-wrong, roadmap approach, cross-team conflict story |
| Panel / culture | Stated values vs. observed behavior, review-signal with caveats | candor test, conflict stories, why-leaving |

If the labeled round and the structural round differ (a "culture chat" with the only product voice in the company), say so in READ-FIRST's opening paragraph — that reframe is often the single highest-value line in the dossier.

### Tier 1 — Facts (public, auditable)

Run heavy web research. Targets below; the full query-pattern inventory is in `references/research-checklist.md`.

| Research area | Where to look | What you're extracting |
|---|---|---|
| Funding timeline | Press releases, funding databases (Crunchbase-style queries), investor portfolio pages, funding-news sites | Round dates, amounts, lead investors, total raised — and the investor's stated thesis in their own announcement, verbatim |
| Revenue / ARR / customers | Funding press (founders disclose at raise time), founder interviews, podcast appearances | Disclosed numbers **with their dates**; never extrapolate silently |
| Headcount + org chart | LinkedIn hiring posts, careers pages, job boards, employee-count trackers | Team size over time, who the candidate's function reports to, vacant senior seats and how long, promotion precedents (who rose from what, how fast) |
| Interviewer's public vocabulary | Their interviews, blog posts, podcasts, op-eds, conference talks — **across years, not just the latest** | Repeated phrases (verbatim), the framings they reuse, what changed between old and recent press |
| Culture signal | Review sites (with named selection-bias caveats), careers-page values, employee posts | Stated values vs. observed behavior (promotion speed, attrition signals) |
| Strategic-inflection raw material | Web-archive snapshots of homepage / pricing / comparison pages 12–24 months apart; rebrand coverage; careers page by specialty | Site diffs (what they deleted is the strategy), rebrand dates, hiring spikes in a new specialty |

Three T1 rules that prevent most downstream failures:

- **Every number gets a date and a source attached at collection time**, not at writing time. "$XM ARR (as of <date>, per <source>)" is a fact; the same number undated is not.
- **A press release and the articles rewriting it are ONE source.** Independence means independent reporting chains. Aggregators citing each other are one source.
- **The vocabulary trace is the highest-leverage T1 artifact.** A phrase the interviewer has repeated across multiple years of press is a mental model, not a slogan — consistency over time is the belief signal. Collect verbatim quotes with dates and URLs, oldest to newest, into a supporting page. If the interviewer has near-zero public trace, write that down as the finding and shift weight to the company's voice (blog, release notes, JD language) — never fabricate a psychology from one quote.

**Then run the fact-check pass** (mandatory — see Verification): re-search every date and number collected, flag every claim that exists in only one source, and correct or band anything that doesn't re-verify. Record verdicts in `fact-check.md`.

### Tier 2 — Structure (interpreted, defensible)

Built only on T1 facts that survived the fact-check. Three artifacts:

1. **The interviewer's mental models.** Cluster the repeated phrases into 3–6 models. Each model is stated in three parts: the phrase (verbatim, with its dated occurrences) → the way of thinking it reveals → the answer-framing instruction for the candidate ("route value claims through X, never through Y"). Equally important: **the vocabulary they do NOT use.** Words absent from years of press — hype terms, buzzwords, competitor names they've stopped saying — tell you what registers as off-key in the room. The absence list feeds the do-NOT-say list directly.
2. **Org maturity + power axis.** From the hiring-post org chart: who does the candidate's function report to? Are senior seats vacant, and for how long — and is there a public requisition for them or not (a vacancy with no req is a structural choice, or a stalled search; either way it's a question the candidate can ask)? What do promotion precedents say about which career paths the company actually rewards? The path to power may run through revenue, engineering, operations, or tenure — find out which and state the implication for the candidate in one plain sentence.
3. **Strategic inflection points.** Pivots visible in public artifacts: site diffs (what did they delete from comparison or positioning pages?), rebrands, the lead investor's funding thesis, hiring spikes in a new specialty. State where the company is **mid-way through** its current inflection, not just that one happened. The candidate who can name the inflection reads as an insider; the one reciting homepage copy reads as everyone else.

Every T2 interpretation must cite the T1 facts it stands on. If an interpretation has no fact under it, it's speculation — cut it or label it. And when two readings of the same fact are plausible (a vacancy is a deliberate experiment OR a hard search), present both and convert the ambiguity into a question for the room rather than picking the dramatic reading.

### Tier 3 — Questions

Full patterns and three fully-worked examples in `references/question-engineering.md`. Build four artifacts:

1. **Five must-nail questions.** Select by (probability of arriving × cost of fumbling) for this round type — founder and final rounds skew toward: why are you leaving, why us specifically, walk me through your biggest claim, what do we get wrong, how would you approach our work. Each question gets three parts, none optional:
   - **The named trap** — the specific way candidates blow this exact question, named so the candidate recognizes it mid-sentence.
   - **The concession-first opener** — concede the genuine weakness in the candidate's position *before* the interviewer probes it. A probed weakness reads as something hidden; a volunteered one reads as judgment. Pre-emptive concession converts a vulnerability into the credibility signal "this candidate doesn't oversell."
   - **The re-anchor** — the defensible ground the answer returns to: the slice of the claim that is true **without caveats**. Concession without re-anchor is just self-deprecation.
2. **Three questions to ask back, ranked by expected information value.** EV = how much the answer changes the candidate's decision or positioning × how unlikely they are to learn it any other way. A question answerable from the company blog has EV ≈ 0 however smart it sounds. Include deployment timing: the autonomy-proof question works early; the strategy-wedge question only works after the interviewer has invested in the conversation — lead with it and the wedge is spent before the room has warmed. Hold one candor question in reserve.
3. **Red-team the candidate's own claims.** Take the 2–3 headline claims from intake and attack them the way a sharp interviewer would, against external benchmarks: Is the number plausible for that company size and market? Is the attribution solo or team? How was it measured, and does the measurement survive one follow-up? Output per claim: the skeptic's first follow-up, and the honest version of the claim that survives it (this becomes the concession + re-anchor material).
4. **The do-NOT-say list.** Calibrated phrases that sound good in rehearsal and land badly in the room. Always include the three structural classes — editorializing about the current employer, false precision (quoting derived estimates as facts), overclaimed solo ownership — plus entries specific to this candidate's claims and to the interviewer's absent-vocabulary list. Format: banned phrase → what to say instead.

### Tier 4 — Decision

1. **Asymmetric-bet frame.** State the candidate's ceiling if they stay where they are — promotion timeline, comp trajectory, decision scope, all from intake — without romanticizing or trashing it. Then this company's concrete upside (funded roadmap items, grabbable scope, equity stage) and concrete downside (vacant seats, unproven bets, runway bands, power-axis mismatch), all from T1/T2. Name what is comfortable about staying and what is genuinely at risk in moving. If the honest read is "don't take this," the dossier says so.
2. **If-X-then-Y offer matrix.** Specific thresholds in the candidate's own currency and circumstances: "if they offer [title] at [comp band] with [equity/review terms], accept within 48 hours; if [lower configuration], negotiate on [one pre-chosen lever]; if [floor configuration], walk." Vague offers ("trust us, it'll be fair") and slipping paper get a named response too. Every threshold is pre-decided so nothing is decided under offer-pressure. Template in `references/question-engineering.md`.
3. **Validation questions before signing.** The due-diligence asks that come *after* an offer, *before* a signature: runway in months, written 30/60/90 scope, recent senior attrition, retention rate in the candidate's function, equity terms in writing. Refusal to answer in writing is itself the answer.
4. **Night-before checklist.** Five or six items, always including: voice-rehearse the top stories aloud at conversational pace (the page hides rhythm slips the voice catches); memorize 3 of the interviewer's verbatim phrases and one natural sentence deploying each — fluency, not parroting; write down your numbers (current comp, ask, walk-away floor) so there is no arithmetic in the room; and sleep — the marginal hour of midnight prep is worth less than the marginal hour of rest.

### Step 5 — Red-team your own dossier

After drafting READ-FIRST, attack it before shipping it. Dossier-builders drift sycophantic: they anchor on the candidate's hopes, find evidence to support them, and dress speculation as analysis. The red-team pass is the corrective:

- **Which claims are single-sourced?** Mark them "(single source)" inline or find a second source.
- **Which framings flatter the candidate?** Find the framings selected for narrative impact rather than evidence weight — severity labels chosen for drama, rank-orderings that tell a story the evidence doesn't — and re-state them at calibrated strength.
- **Where is false precision?** Point estimates that should be bands; "dealbreaker" or "red flag" labels on things that are actually unknowns (an unknown can resolve good, bad, or neutral — pre-committing it to the bear case is as dishonest as ignoring it); standard frameworks (efficiency ratios, runway heuristics, growth benchmarks) applied without their industry priors, so a number that is normal for the stage gets labeled alarming.
- **Where does chained math hide a single guess?** Find every derived number, trace it to its load-bearing input, and check the input's verification status. If five conclusions chain back to one estimate, say so in READ-FIRST and convert the estimate into a question for the room.
- Fix what's fixable; flag what isn't, in plain text, inside READ-FIRST. An unaddressed red-team finding is a shipping blocker.

### Step 6 — Assemble and verify

Write READ-FIRST last, from the supporting pages — never first with pages backfilled to match. Run the Verification checks below. Tell the user the read time and the read order.

## The READ-FIRST.md Template

Seven sections, hard cap. Each section ends with links to its supporting pages. A condensed fictional instance of the full template is in `references/worked-example.md`.

| # | Section | Contents |
|---|---|---|
| S1 | **The company arc** | The 2–3 strategic inflection points and where the company is mid-way through — not founding trivia. Funding timeline appears only as evidence for the arc. |
| S2 | **The org + where power runs** | Reporting lines for the candidate's function, vacant seats and for how long, promotion precedents, the actual path to power in one plain sentence. |
| S3 | **The interviewer's mental models** | Their 3–6 repeated phrases (verbatim, dated), the model behind each, how to frame answers in their vocabulary — and what they never say. |
| S4 | **Five must-nail questions** | Each with named trap + concession-first opener + re-anchor. Full scripts live in a supporting page; READ-FIRST carries the shape of each answer. |
| S5 | **Three questions to ask back** | EV-ranked, with deployment timing (early / mid / close) and the held reserve. |
| S6 | **The honest decision read** | Asymmetric-bet frame, the if-X-then-Y offer matrix in plain prose, validation questions before signing. Opens with "stop selling the role to yourself." |
| S7 | **Night-before checklist** | 5–6 items ending in "sleep." |

Opening paragraph before S1: the single reframe the candidate must walk in with — the thing this round actually is, versus what it's labeled (e.g., a culture round that is structurally a product round because of a vacancy). One paragraph, sourced, no throat-clearing.

## Voice Rules For The Dossier

The dossier speaks to the candidate in second person, clinically. Concretely:

| Don't write | Write instead |
|---|---|
| "The company is growing impressively" | "Headcount went ~120 → ~340 between the Series A (Jun 2022) and Series B (Oct 2025) ([[funding-timeline]])" |
| "He clearly values honesty" | "He has used the phrase '<verbatim>' in 2023 and 2025 ([[founder-voice-trace]]); answers that concede limits before being probed match that register" |
| "Revenue is probably around $XM" | "$XM ARR was disclosed at the Series B (Oct 2025); anything more recent is extrapolation — band, not point" |
| "This is a red flag" (about an unknown) | "This is the load-bearing unknown; it resolves in the room, not in this document — ask, then respond to what you hear" |
| "You'll do great" | (nothing — reassurance with no claim under it gets cut) |

Three more rules: numbers lead sentences, adjectives don't; the candidate's weaknesses get the same clinical treatment as the company's (the red-team applies to both directions); and when the dossier doesn't know something, the sentence says "unknown" and routes it to a question — never to a hedge that sounds like knowledge.

## Anti-Patterns

- **Generic "I love the mission" pulls.** Every "why us" answer must anchor in something this interviewer said or this company did — a dated quote, a site diff, a hiring spike. Three platitudes is a fail.
- **Editorializing about the current employer.** The dossier may quote the current employer's own public statements (their CEO's words, their filings); it never supplies adjectives. "Their CEO called it a transitional year" survives the room; "the company is dying" does not.
- **Unsourced interviewer-psychology claims.** "He values directness" with no quote under it is horoscope writing. Every mental-model claim cites the verbatim phrases it was derived from.
- **Review-site scores without the selection-bias caveat.** Review aggregators oversample the angry and the recently-exited, and small sample sizes amplify it. Report the score, the n, and the caveat together or not at all.
- **Dossiers that are 40 files with no entry point.** If the user must choose what to read, the dossier has failed. READ-FIRST is the product; everything else is appendix.
- **Skipping the fact-check pass because sources "looked solid".** First-pull facts from reputable-looking pages are wrong often enough that one round-trip re-search is mandatory, not optional. The pass exists precisely for the claims you weren't suspicious of.
- **Letting chained estimates masquerade as analysis.** Frameworks applied to estimated inputs produce estimated outputs. Present bands, and name the load-bearing unknown they all chain back to.
- **Pre-committing unknowns to the bear (or bull) case.** If a key number is unverifiable from outside, the dossier's job is to mark it as the question to ask in the room — not to assume the scary value and run the math.
- **Writing READ-FIRST first and backfilling pages to match.** That inverts the evidence flow and is how unsourced claims get grandfathered in.

## Verification

Run these before declaring the dossier done:

1. **Fact-check pass (mandatory).** For every date and number in READ-FIRST: re-search it fresh, with a differently-worded query, independent of the page where it was first found. Three outcomes per item: *confirmed* (2+ independent sources — keep), *single-sourced* (mark "(single source)" inline — keep with the mark), *contradicted or not found* (correct it, band it, or cut it). Record every verdict in `fact-check.md` so the audit trail survives.
2. **Trace audit.** Pick 5 random claims from READ-FIRST; each must resolve to a supporting page and then to a source in two hops. Any dead end fails the audit.
3. **Section count + read time.** Check the section count mechanically:
   ```bash
   grep -c '^### ' READ-FIRST.md   # must be ≤ 7 (adjust to the heading level used)
   wc -w READ-FIRST.md             # ≳4,500 words will not be a 20-minute careful read; cut
   ```
   Then read it once at reading pace; if it exceeds 20 minutes, cut sections' depth into supporting pages.
4. **Red-team residue.** Confirm every issue raised in Step 5 is either fixed or flagged in plain text. Unaddressed red-team findings are a fail.
5. **Do-NOT-say list exists** and references the candidate's actual claims from intake plus the interviewer's absent vocabulary, not just generic etiquette.
6. **Three-part check on S4.** Each of the five questions has trap + concession opener + re-anchor. Mechanically: five questions × three labeled parts, no blanks.

## Final Response

When done, tell the user:

- the dossier folder path and the read order (READ-FIRST first, dives optional)
- estimated read time of READ-FIRST
- the 2–3 highest-value findings (the things no other candidate will walk in knowing)
- what the fact-check pass changed (corrections made, claims marked single-source)
- what remains unverifiable from outside — framed as the questions to ask in the room
- the one-line decision read

Keep it short. The dossier is the deliverable, not the summary of it.
