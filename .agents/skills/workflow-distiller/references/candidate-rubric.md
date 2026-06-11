# Candidate Scoring Rubric

Score every candidate workflow on three dimensions, 1-5 each. The total is the product, not the sum — a candidate weak on any one dimension is weak overall.

```
score = frequency × pain × generalizability        (range 1–125)
```

## Frequency (1-5) — how many distinct sessions show the pattern

Count **distinct sessions**, not raw occurrences. Ten repeats inside one session is one session of evidence.

| Score | Distinct sessions in the scan window |
|---|---|
| 1 | 1-2 sessions (below the 3+ bar — normally disqualifying on its own) |
| 2 | 3-4 sessions |
| 3 | 5-9 sessions |
| 4 | 10-19 sessions |
| 5 | 20+ sessions, or near-daily |

Boost by one (max 5) if the pattern spans 3+ different projects — cross-project repetition is the strongest frequency signal the scanner produces.

## Pain (1-5) — manual steps and corrections involved

How much friction does each occurrence cost? Read this from the *shape* of the evidence: long tool 3-gram chains, repeated correction-style prompts, multi-binary shell sequences.

| Score | What one occurrence looks like |
|---|---|
| 1 | One prompt, one tool call, done. Barely friction. |
| 2 | 2-3 manual steps, rarely goes wrong |
| 3 | 4-6 steps, or one step that routinely needs a retry/correction |
| 4 | Long multi-tool sequence, environment setup involved, frequent re-explanation of the same constraints |
| 5 | Multi-stage ritual (VPN, auth, build, verify) where a missed step silently produces the wrong result |

## Generalizability (1-5) — would anyone else hit this

Skills for a public repo need this high; private skills can run lower, but score honestly either way.

| Score | Who else hits this |
|---|---|
| 1 | Only this exact machine/account/project (hardcoded paths, one-off data) |
| 2 | Only this user, but across their projects |
| 3 | Anyone in the same niche stack or team |
| 4 | Anyone using the same common tool (gh, ffmpeg, docker, a major API) |
| 5 | Nearly any Claude Code user (universal workflow shapes: verify-before-done, release rituals, doc mining) |

## Score bands

| Band | Score | Action |
|---|---|---|
| **Build now** | ≥ 48 | Draft it in this session |
| **Maybe** | 24-47 | List it; draft only if the user pulls it up |
| **Skip** | < 24 | Mention in one collapsed line, don't draft |

Reference points: 48 = (4,4,3) or (4,3,4) — a frequent, genuinely painful workflow with decent reach. A perfect-pain one-off (1,5,5)=25 still lands in Maybe at best: repetition is the entry ticket.

## Friction-pattern taxonomy

What to look for when clustering scanner aggregates into candidates:

| Pattern | Scanner evidence | Typical skill shape |
|---|---|---|
| **Repeated multi-step shell sequences** | Same bash binaries co-occurring across sessions; long `Bash > Bash > Bash` 3-grams | Numbered command workflow with verification between steps |
| **Repeated prompt preambles** | Same 8-word prefix at high count | The preamble's content becomes the skill body; the prefix becomes a trigger phrase |
| **Repeated correction patterns** | Prefixes like "no, actually...", "that's wrong, the...", "remember to..." recurring | An Anti-patterns section codifying what keeps going wrong |
| **Recurring lookups** | Prefixes like "what is the...", "where does...", same docs-fetch tool sequences | A reference table or cached corpus + fetch skill |
| **Environment rituals** | VPN/auth/login binaries (openvpn, gh auth, aws sso) preceding the real work | A prerequisites + setup-verify skill that front-loads the dance |

A real candidate usually combines two or more rows — e.g. an environment ritual (VPN up) followed by a repeated shell sequence (form-filling script) is one skill, not two.
