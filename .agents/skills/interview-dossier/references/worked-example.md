# Worked Example — condensed READ-FIRST.md

> **Entirely fictional — structure demonstration.** "Meridian Build AI", "Diego Varga", "Cordant", every person, company, investor, number, and quote below is invented. Use this to see the shape of a finished READ-FIRST.md, not as research. A real dossier would run deeper per section, with live URLs in the supporting pages; this one shows where everything goes.

---

```yaml
purpose: the single document you read the night before the Meridian Build AI CEO round
interviewer: Diego Varga (Co-founder & CEO, Meridian Build AI)
date_of_interview: 2026-03-19
prep_date: 2026-03-18
read_order: 1 — read this first; dive into supporting pages only where you want depth
```

# READ THIS FIRST

Tomorrow is labeled a culture round. Structurally it is a product round: the VP Product seat has been vacant since November 2025 with no public requisition ([[org-and-power]]), and Varga is the only product voice in every piece of press since. He is not screening for someone to hand to a VP — he is screening for someone he can trust *without* one for several quarters. Bring craft, not just fit signals, and land that distinction in the first ten minutes.

### S1 — The company arc

Meridian was founded in 2019 as SiteLedger, a field-data capture app for mid-size general contractors — daily logs, photos, timesheets ([[funding-timeline]]). The arc, not the trivia: a $4M seed in 2020 (Foundry North), a $15M Series A in June 2022 (Crestline Ventures) at roughly 120 employees, then the pivot you must walk in knowing about — the September 2024 rebrand to Meridian Build AI, followed by the October 2025 $52M Series B led by Halcyon Growth Partners at $14M disclosed ARR, ~900 customers, ~340 employees ([[funding-timeline]]; all four numbers re-verified in [[fact-check]], the ARR figure confirmed in two independent outlets).

Two artifacts date the pivot, and both are checkable on your phone tonight. First, the site diff: the old `/compare` page benchmarking SiteLedger against the other field-logging apps is gone from the sitemap as of mid-2025; the new top-level nav item is `/scheduling` ([[site-diffs]]). A company deletes its comparison set when it stops wanting that fight — the deletion is the strategy. Second, the hiring spike: five scheduling-optimization engineering reqs posted within eight weeks of the Series B, against zero new reqs on the logging side ([[org-and-power]]).

Halcyon's own announcement called Meridian "the system of record for the construction schedule" — investor language for "we underwrote the scheduling bet, not the logging tool that got them here" ([[funding-timeline]]). The logging product still pays the bills; the scheduling product is hiring-real but not yet revenue-proven ([[red-team]]). You are interviewing mid-pivot. Most candidates will prep for the field-logging company they read about on the homepage; the offer goes to the one who preps for the scheduling company visible in the sitemap and the reqs.

### S2 — The org + where power runs

Six PMs across ~340 people, which is thin even for vertical software. No VP Product since November 2025 — known from one departure post, so treat it as "(single source)": say "I read that the seat is open," not "the seat is open." There is no public req for the seat, which means either a deliberate structural experiment or a quiet search; that ambiguity is a question for the room, not a conclusion for this page ([[org-and-power]]).

PMs report to the two business-line general managers. Both GMs came up through customer operations — implementation and accounts — not through product. The one visible promotion precedent on the product side is an implementation lead who converted to PM in 18 months; the faster risers in the company's history are all on the revenue side ([[org-and-power]]). Plain read: **the path to power at Meridian runs through customer operations and revenue, not through product craft.** If you want scope here, expect to earn it on retention and expansion numbers, not on roadmap documents. Decide tonight whether that trade suits you — it is the kind of thing better known before the offer than after.

### S3 — Varga's mental models (his words, dated)

Three phrases recur across three years of his press, podcasts, and one signed op-ed ([[founder-voice-trace]]). Memorize them tonight; each is a window into a model, not a slogan.

**"The job site is the source of truth."** (2023 trade-podcast appearance; repeated verbatim in the 2025 Series B post.) The model: data entered by office staff is already stale; product value = capturing reality where it happens, then making the office trust it. Frame any answer about quality, metrics, or AI accuracy as field-capture-first — never as "better dashboards for the office."

**"Minutes back to the foreman."** (2024 conference keynote; 2026 trade-press interview.) The model: ROI is denominated in field-supervisor time, not in feature counts or adoption curves. Route every value claim through time-returned-to-the-field. "DAU" and "engagement" are off-key words in this room.

**"Boring reliability."** (2023 company blog, his byline; 2025 Series B post.) The model: he sells trust to a risk-averse buyer who has been burned by flashy software before. He respects unglamorous infrastructure as a moat. Praise the boring parts — sync that never drops, offline mode, audit trails — and he will hear fluency.

What he never says, anywhere in the trace: "AI agents," "disruption," "10x," and — notably — competitor names after 2024, the same year the `/compare` page disappeared ([[founder-voice-trace]], [[site-diffs]]). He grounds claims in industry-association statistics rather than vision language. To sound aligned: sourced numbers, customer pain, no hype vocabulary. The do-NOT-say list in [[red-team]] carries the full absent-vocabulary set.

### S4 — Five must-nail questions

Full 90-second scripts live in [[question-prep]]; what follows is the shape of each. The five were selected on (probability of arriving × cost of fumbling) for a founder-led final round.

1. **"Why are you leaving Cordant?"** Arrives in the first five minutes. *Trap:* editorializing about a slow incumbent — every adjective you supply becomes evidence about you. *Concession:* quote Cordant's own public "efficiency year" earnings language, concede it's a stable, well-run seat and that nothing is broken. *Re-anchor:* the scheduling-shaped surface you want to own is structurally unreachable from your seat inside two years — a scope argument, not an escape story.
2. **"Walk me through the 40% RFI-turnaround claim."** Your headline number, and the red-team found its two soft spots: it is team-attributed and it was measured on pilot accounts only ([[red-team]]). *Concession:* volunteer both before he probes — "that's the team's number, and it's pilot-scoped; I'd rather you have that now." *Re-anchor:* the routing redesign was yours without caveats; if you reverse your contribution out, that's the slice that goes missing. Bridge: routing work is the same shape as schedule-dependency work.
3. **"Why us specifically?"** *Trap:* "I love construction tech" — you have never been on a job site, and he will detect the cosplay instantly. *The bar:* three pulls anchored in things he said or did — the `/compare`-to-`/scheduling` site diff, the five scheduling reqs, the Halcyon thesis line. The site diff is the pull no other candidate will have; it is the strategy in one sitemap.
4. **"What do we get wrong?"** The candor test. *Trap:* the polished non-answer, which fails it exactly as badly as a reckless attack. *Shape:* concede the outside view, then offer two sourced observations as questions he gets to answer — the VP-Product vacancy with no req, and the gap between the homepage (still logging-first) and the hiring (scheduling-first). Observations for correction, not verdicts.
5. **"How would you approach our roadmap?"** *Trap:* arriving with a rebuilt roadmap, which claims you know his customers better than he does. *Shape:* here is what I observed from outside → here are the questions I'd answer in my first sixty days → here is what I will not do in week one. Domain humility is mandatory; transferable craft is the bet you're asking him to make.

### S5 — Three questions to ask back (EV-ranked)

1. **Autonomy proof — ask early.** "The PM posting says PMs own schedule-health outcomes end to end. Walk me through a decision in the last six months where a PM overrode you or a GM on what to build — what did they choose, what happened?" A specific named example means the ownership language is real; a hedge means it's marketing. Either answer changes how you negotiate scope.
2. **Strategy wedge — ask mid, after the room warms.** "Your `/compare` page is gone and `/scheduling` replaced it in the nav. What's the revenue mix between logging and scheduling today, and where do you want it in twelve months?" This proves homework no other candidate did. Deploy it in the second half — strategy disclosures happen after the interviewer has decided to invest in the conversation; lead with it and the wedge is spent cold.
3. **Failure bar — ask last.** "What would make you part ways with someone in their first ninety days?" A specific named failure mode means the bar is real and enforced at speed. A sanitized "we give people time to ramp" means fast exits happen anyway, just without a stated bar. Both are knowable; you want to know which before you sign.

**Reserve** (deploy only if the conversation has been heavily polished and you need one candid moment): "What would you change about how Meridian runs today, if you could change one thing by Friday?" ([[questions-to-ask]] carries the full reserve list.)

### S6 — The honest decision read

Stop selling the role to yourself tonight. Tell the truth instead.

Cordant is a stable, liquid, slow seat: promotion to Senior PM in a published 18–24-month window, predictable comp, RSUs that vest against a real market price, decisions bounded by a three-review process. None of that is collapse — it is comfort, and comfort is the actual thing to price, not a strawman of decline. Meridian's upside is concrete: the funded scheduling bet with five engineers landing now, a vacant-VP window in which scope is grabbable rather than granted, Series-B-stage equity. The downside is equally concrete: the scheduling product is a hiring signal, not yet a revenue line ([[red-team]]); the power axis runs through ops GMs, not product; and $14M ARR against $71M total raised is a ratio that says Halcyon underwrote a bet, not a sure thing. The runway figure in [[offer-matrix]] is a derived band built on an estimated burn rate — treat it as the first validation question post-offer, not as a fact you know.

The matrix, pre-decided so none of this is negotiated under pressure ([[offer-matrix]] §2 carries derivations):

- Senior PM title at ≥$165K base, ≥0.08% equity, and a written six-month review → **accept within 48 hours.**
- Package above that band plus a sign-on covering your unvested Cordant RSUs (your written number: have it on paper) → **sign; don't counter a winning hand.**
- Right title, base $150–165K → **negotiate the one lever you pre-chose (equity), anchored on the forfeited-RSU number.**
- PM title, no Senior → **the title is the signal, not the money** — either the round went worse than you think or a rigid band will also gate your next promotion. Bargain hard or walk.
- Below $140K, or vague terms ("trust us, it'll be fair"), or paper that keeps slipping → **two weeks, then walk.** The floor was set when you were calm; trust that version of you.

Post-offer, pre-signature, all five in writing: runway in months, written 30/60/90 scope, senior attrition in the last twelve months, PM retention, full equity terms (vesting, cliff, exercise window, acceleration). Refusal to write answers down is itself the answer.

### S7 — Night-before checklist

1. Voice-rehearse your top three stories aloud at conversational pace, ~90 seconds each — the page hides rhythm slips the voice catches.
2. Memorize the three Varga phrases — "the job site is the source of truth," "minutes back to the foreman," "boring reliability" — and one natural sentence deploying each. Fluency, not parroting.
3. Write your three numbers on paper — current comp, ask, walk-away floor. No arithmetic in the room.
4. Pull up the live `/scheduling` page for ninety seconds so the site-diff observation sits in visual memory, not just on this page.
5. Re-read the do-NOT-say list ([[red-team]]): no Cordant adjectives, no derived numbers stated as facts, no "I drove" on the RFI claim, none of his absent vocabulary.
6. Sleep. The marginal hour of midnight prep is worth less than the marginal hour of rest before a ninety-minute founder conversation.

### Closing

If you forget everything else: he is not screening for construction experience — he is screening for someone he can trust without a VP between you and him. Concede the soft spots in your own numbers before he finds them. Speak his vocabulary because it has been consistent for three years and your fluency tells him you read carefully. Ask the sitemap question in the second half. Then tell the truth out loud; it is the only prep that cannot be out-prepped.

## Related

- [[funding-timeline]] — rounds, amounts, investors, disclosed metrics with dates
- [[founder-voice-trace]] — every Varga quote, dated and linked
- [[org-and-power]] — org sketch, vacancy timeline, promotion precedents
- [[site-diffs]] — archived-snapshot comparison behind the S1/S5 wedge
- [[question-prep]] — full 90-second scripts for the five must-nail questions
- [[questions-to-ask]] — EV-ranked asks, deployment timing, reserve list
- [[red-team]] — pressure test of your own claims + the do-NOT-say list
- [[offer-matrix]] — the if-X-then-Y table with derivations + validation questions
- [[fact-check]] — the audit trail: what re-verified, what's single-sourced

---

## Appendix — excerpts from two supporting pages (demonstration of format)

A real READ-FIRST would not embed these; they live in their own files. They are shown here so the example demonstrates the artifacts the skill requires.

### Excerpt: `fact-check.md` (the audit trail)

| Claim in draft | Re-search verdict | Action taken |
|---|---|---|
| Series B $52M, Oct 2025, Halcyon lead | Confirmed — funding press + Halcyon's own portfolio post (independent chains) | Kept as fact |
| $14M ARR at Series B | Confirmed — two outlets, one quoting Varga directly | Kept as fact, dated |
| ~340 employees | Confirmed — stated in Series B press; tracker agrees within 10% | Kept with "~" |
| VP Product vacant since Nov 2025 | Single-sourced — one departure post; no second confirmation | Kept, marked "(single source)"; phrased as "I read that…" in S2 |
| Headcount ~120 at Series A | Not found on re-search — first source was an undated profile page | Cut from READ-FIRST; lives here with "unverified" |
| "5 scheduling reqs in 8 weeks" | Confirmed by direct count on the careers page, screenshots saved | Kept as fact, dated |
| Runway "24–30 months" | Derived (raise ÷ estimated burn) — both inputs estimates | Re-labeled as band + moved to post-offer validation question |

### Excerpt: `red-team.md` (the do-NOT-say list)

| Banned phrase | Why it lands badly | Say instead |
|---|---|---|
| "Cordant has gotten slow / bureaucratic" | You supplied the adjective; he hears how you'll describe Meridian in two years | "Cordant's own earnings call named this an efficiency year — that's their framing, and it's accurate" |
| "I cut RFI turnaround 40%" | Solo claim on a team-attributed, pilot-scoped number — unravels on the first follow-up | "The team's pilot number was 40%; the slice that was mine without caveats is the routing redesign" |
| "Your runway is about two years" | Derived band stated as fact; he knows the real number and now doubts your other numbers | "From the outside I can only band it — that's one of the things I'd want to understand post-offer" |
| "You're disrupting construction software" | "Disruption" is absent from his entire public trace; hype register reads off-key | Route through "minutes back to the foreman" — time and trust, not disruption |
| "Your competitor X does this better" | He stopped naming competitors publicly in 2024; importing them re-frames the conversation on the fight he chose to stop having | "The fragmentation the foreman feels is…" — pain framing, his register |
