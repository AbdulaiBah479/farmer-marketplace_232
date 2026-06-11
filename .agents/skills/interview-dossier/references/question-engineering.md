# Question Engineering — traps, concessions, re-anchors, EV-ranked asks, offer matrix

## The trap / concession / re-anchor pattern

Every must-nail question in the dossier gets three parts:

1. **The named trap** — the specific way candidates blow this question. Not "be careful here"; the actual failure mode, named, so the candidate recognizes it mid-sentence.
2. **The concession-first opener** — the candidate concedes the genuine weakness in their position *before* the interviewer probes it. This works for one reason: a probed weakness reads as something you hid; a volunteered weakness reads as judgment. Pre-emptive concession converts the vulnerability into the credibility signal "this candidate doesn't oversell."
3. **The re-anchor** — the defensible ground the answer returns to after the concession: the slice of the claim that is true **without caveats**. Concession without re-anchor is just self-deprecation; the re-anchor is what makes the concession strategic.

The shape of every answer: *concede the real limit → re-anchor on the uncaveated slice → bridge to why it matters for this company.*

### Worked example 1 — "Why are you leaving?"

- **Trap:** editorializing about the current employer. "The company is stagnating," "big-co is boring," "leadership lost the plot" — every adjective you supply becomes evidence about you, not them. The interviewer hears: this person will talk about us this way in two years.
- **Concession-first opener:** concede what is genuinely good about where you are, in their own public words. *"It's been a good run — real shipping, real scale, and I want to be straight that nothing is broken. The company itself has publicly called this a consolidation year, and that's accurate."* Quote their CEO, their filings, their announcements — never your own adjectives.
- **Re-anchor:** the scope argument, which is about you and verifiable. *"The surface I want to own next — [specific kind of ownership] — structurally isn't reachable from my seat inside [X timeframe]. The decisions that are mine alone are bounded by [named process reality]. I'm not running from something; the thing I'm running toward doesn't exist there."*
- **Why it works:** the interviewer cannot fact-check your feelings, but they can fact-check the employer's own statements and the org-structure claim. You've moved the answer from opinion to evidence.

### Worked example 2 — "Walk me through your biggest claim" (the headline CV number)

- **Trap:** defending the headline number as solo-owned. The interviewer has seen a hundred inflated bullets; the moment they unravel the attribution — "so what exactly did *you* do?" — the candidate is defending a position they chose not to fortify, and everything else on the CV reprices downward with it.
- **Concession-first opener:** concede attribution and methodology before they're raised. *"Two things up front, because I know what this number looks like from your side of the table. One: that's the team's number, not mine alone — [GTM/eng/CS] all pulled. Two: the measurement has a limit — [named limit]. I'd rather you have both now than find them in five minutes."*
- **Re-anchor:** the reverse-out test. *"If you reverse my contribution out and ask what slice would be missing without me — it's [the specific mechanism: the pipeline rebuilt, the process redesigned, the decision fought for and won]. That part is mine without caveats, and it's the part that transfers to what you're building."*
- **Why it works:** the candidate has pre-empted the two strongest follow-ups, so the interviewer's probing energy lands on ground the candidate has already fortified. The re-anchor is deliberately mechanism-shaped, not outcome-shaped — mechanisms are ownable; outcomes are shared.

### Worked example 3 — "What do we get wrong?" (the candor test)

- **Trap:** the polished non-answer ("honestly, you're executing really well, maybe just hire faster?"). The question is a calibration test: the interviewer wants to know if you'll bring them real information once you're inside. A flattering dodge fails it exactly as badly as a reckless attack.
- **Concession-first opener:** concede the limits of the outside view first. *"With the caveat that I've only seen the outside — here are two specific things I noticed, and I'd genuinely like to know what I'm missing."* The framing matters: observations offered for correction, not verdicts delivered.
- **Re-anchor:** two or three **sourced, specific observations** from the dossier — a vacant senior seat and how long it's been open, a gap between the stated strategy and the hiring pattern, a positioning ambiguity visible in the site diff. Each one phrased as a question the interviewer gets to answer: *"the [X] seat has been open since [date] — I read that as either a deliberate structural choice or a hard search. Which is it?"*
- **Why it works:** specific + sourced + correctable is the only combination that passes. It proves homework, it hands the interviewer the floor (people enjoy explaining their own strategy), and it cannot be dismissed as flattery or naivety. The candidate who asks about the vacant seat learns more in ninety seconds than the review sites could ever tell them.

## Questions to ask back — EV ranking

Rank candidate questions by **expected information value**:

> EV = (how much the answer changes your decision or positioning) × (how unlikely you are to learn it any other way)

A question whose answer you could read on their blog has EV ≈ 0 regardless of how smart it sounds. The highest-EV questions force a *story, not a slogan* — they're falsifiable in real time.

| Rank | Question shape | Why high EV | Deployment |
|---|---|---|---|
| 1 | **The autonomy proof.** "Your JD says [quoted ownership promise]. Walk me through a specific decision in the last six months where someone at my level overrode leadership on what to build — what did they choose, what happened?" | A specific named example = the autonomy is real. A hedge = the ownership language is marketing. Binary, decision-relevant, unlearnable from outside. | Early — it sets the tone that you're evaluating too. |
| 2 | **The strategy wedge.** Built from your sharpest T2 finding (the site diff, the hiring spike, the thesis quote): "I noticed [specific artifact]. What does the mix look like today vs. where you want it in 12 months?" | Proves homework no other candidate did, and the answer reveals strategy you can't get elsewhere. | Mid-to-late — strategy disclosures happen after the interviewer has invested in the conversation. Lead with it and you spend the wedge before the room has warmed. |
| 3 | **The failure-bar question.** "What would make you let someone go in their first ninety days?" | A specific named failure mode = the bar is real and enforced; an HR-sanitized answer = fast exits happen without a clear bar. Either way you learn what your first quarter feels like. Almost nobody asks it, and asking signals you're buying as carefully as they're selling. | Close — it lands best as the last question. |

Hold one reserve question (a candor probe — "what would you change about how this place runs today?") for if the conversation has been heavily polished and you need to force one candid moment. Read the room.

## The if-X-then-Y offer matrix (template)

Built from intake (current comp, walk-away floor, what's forfeited by moving) plus T4 comp benchmarks. Every row is a pre-decided response so no decision is made under offer-pressure:

| If they offer | Then |
|---|---|
| Target title + base in [target band] + [equity/review terms you named] | Accept within 48 hours. Pre-decide this so you don't renegotiate against yourself out of momentum. |
| Strong package above target (band + sign-on covering what you forfeit) | Sign. Do not counter a winning hand. |
| Right title, base below band | Negotiate ONE lever (base or equity or sign-on — pick before the call), with the forfeited-value number written down as the anchor. |
| Lower title than agreed bar | Treat the title as the signal, not the money: either they don't believe your receipts (their probe answers tell you) or a rigid band will also gate your next promotion. Bargain hard or walk. |
| Below your written walk-away floor | Walk. The floor was set when you were calm; trust that version of you. |
| Vague terms ("trust us, it'll be fair"), or paper that keeps slipping | Two-week deadline, then walk. A company that won't write numbers down before you sign will not write them down after. |

Rules: set the walk-away floor **before** the final round, in writing. Every threshold in the candidate's own currency and circumstances. The matrix is private — it is a decision aid, never a negotiation script to recite.

### Validation questions (post-offer, pre-signature)

1. Current runway, in months, from the CFO-grade number — not the press release arithmetic.
2. Written 30/60/90 scope for the role.
3. Senior attrition in the last 12 months — who left, and why (their version).
4. Retention rate in your function specifically.
5. Equity terms in writing: vesting, cliff, exercise window, acceleration.

Refusal to put answers in writing is itself the answer.

## Constructing the do-NOT-say list

The do-NOT-say list is calibrated phrases that sound good in rehearsal and land badly in the room. Build it from three structural sources plus the candidate's specifics:

1. **Editorializing about the current employer.** Any sentence where the candidate supplies the adjective ("dying", "stagnant", "political"). Replacement rule: quote the employer's own public statements, full stop.
2. **False precision.** Quoting a derived estimate as a fact ("your revenue is $XM", "your runway is N months") when the dossier shows it's a band built on an inferred input. If pushed on a derived number in the room, the correct move is to concede the chain: *"that's contingent on [the load-bearing estimate], which is my outside guess — you know the real number."* Defending a point estimate that doesn't survive one follow-up burns credibility on ground that was never defensible.
3. **Overclaimed solo ownership.** "I drove", "I owned", "my number" applied to team outcomes. The red-team pass on the candidate's claims (T3.3) generates the specific phrases to ban and their honest replacements.
4. **Candidate-specific entries.** From the vocabulary trace: hype terms the interviewer never uses (saying them marks you as off-key); competitor names if the interviewer has publicly stopped naming competitors; any inside-baseball fact the candidate can't source if challenged ("where did you hear that?" must always have an answer that isn't "I inferred it and presented it as fact").

Format: two columns — *banned phrase → what to say instead*. Keep it to one page; the candidate reviews it the night before, right after the checklist.
