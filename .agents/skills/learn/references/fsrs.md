# FSRS Spaced Repetition Algorithm

> Based on the Free Spaced Repetition Scheduler by [open-spaced-repetition](https://github.com/open-spaced-repetition)

FSRS adapts review intervals to each concept based on how well you remember it. Harder concepts get reviewed more often; easy ones get longer breaks. Unlike fixed-interval systems (3→7→14→30→90 days), FSRS personalizes intervals per concept.

## Core Parameters (Per Concept)

| Parameter | What It Means | Range |
|-----------|--------------|-------|
| **Difficulty (D)** | How hard this concept is for this learner | 1-10 (1=easiest) |
| **Stability (S)** | Days you can go before recall drops below 90% | 0.4+ days |
| **Last Review** | Date of most recent review | ISO date |
| **Next Review** | Last Review + round(S) | ISO date |
| **Ratings** | History of past ratings | Array like [3, 2, 4] |

## Rating Scale

After each review, rate the learner's performance:

| Rating | Label | When to Assign |
|--------|-------|---------------|
| 1 | **Again** | Forgot completely — couldn't recall at all |
| 2 | **Hard** | Recalled with significant difficulty or partially |
| 3 | **Good** | Normal successful recall |
| 4 | **Easy** | Recalled instantly, effortlessly, with full confidence |

## Initial Parameters (First Time a Concept Is Reviewed)

| First Rating | Initial D | Initial S (days) | First Review In |
|-------------|-----------|-------------------|-----------------|
| Again (1) | 7.0 | 0.4 | ~10 hours |
| Hard (2) | 6.0 | 0.9 | ~1 day |
| Good (3) | 5.0 | 2.4 | ~2 days |
| Easy (4) | 3.0 | 5.8 | ~6 days |

## Updating After Reviews

### Step 1: Calculate Current Retrievability

How much the learner likely remembers right now:

```
elapsed = (today - last_review) in days
R = (1 + elapsed / (9 * S)) ^ (-1)
```

R ranges from 0 to 1. When elapsed = S, R ≈ 0.9 (90% recall probability).

### Step 2: Update Difficulty

```
D' = D - 0.28 * (rating - 3)
D' = clamp(D', 1, 10)
```

- Easy (4): D decreases by 0.28 → concept is getting easier
- Good (3): D unchanged
- Hard (2): D increases by 0.28
- Again (1): D increases by 0.56

### Step 3: Update Stability

Use the **practical growth multipliers** based on rating and current difficulty:

| Rating | Multiplier (approx) | What Happens |
|--------|---------------------|-------------|
| Easy (4) | S × 3.0 | Interval roughly triples |
| Good (3) | S × 2.5 | Interval roughly doubles+ |
| Hard (2) | S × 1.2 | Interval grows slightly |
| Again (1) | S × 0.3 (min 0.4) | Interval drops to ~30% |

These multipliers are adjusted by difficulty: easier concepts (lower D) get slightly larger multipliers, harder concepts get slightly smaller ones.

**Difficulty adjustment**: Multiply the base multiplier by `(11 - D) / 10`:
- D=3 (easy concept): multiplier × 0.8... wait, this should boost easy concepts
- Actually: `final_multiplier = base_multiplier * (0.7 + 0.06 * (11 - D))`
  - D=1: × 1.30 of base (easiest concepts grow fastest)
  - D=5: × 1.06 of base
  - D=10: × 0.76 of base (hardest concepts grow slowest)

### Step 4: Calculate Next Review Date

```
S' = S * final_multiplier
next_review = today + round(S')
```

## Practical Interval Progression

For a concept consistently rated Good (3), starting at D=5:

| Review # | Stability (days) | Interval |
|----------|-----------------|----------|
| 1st | 2.4 | 2 days |
| 2nd | 6 | 6 days |
| 3rd | 15 | 15 days |
| 4th | 38 | ~5 weeks |
| 5th | 95 | ~3 months |
| 6th+ | 238+ | consolidated |

For a concept rated Again (1) then Good (3) afterwards:

| Review # | Rating | Stability | Interval |
|----------|--------|-----------|----------|
| 1st | Again | 0.4 | 10 hours |
| 2nd | Good | 1.0 | 1 day |
| 3rd | Good | 2.5 | 3 days |
| 4th | Good | 6.3 | 6 days |
| 5th | Good | 16 | 16 days |

Notice how failure early on means more reviews, but consistent success catches up.

## Consolidation

When stability exceeds **90 days** after a successful recall, mark the concept as **consolidated** (🟦 Mastered). It won't be actively scheduled for review unless the learner encounters it again and struggles.

## Status Badges

Derived from current stability, not from percentage correct:

| Badge | Stability Range | Meaning |
|-------|----------------|---------|
| 🟥 Weak | S < 3 days | Needs frequent review |
| 🟨 Fair | S = 3-13 days | Learning, building stability |
| 🟩 Good | S = 14-89 days | Solid understanding, widening intervals |
| 🟦 Mastered | S ≥ 90 days | Consolidated in long-term memory |
| ⬜ Unmeasured | No data | Haven't been tested on this yet |

## Concept File Format

```markdown
| Concept | D | S | Last Review | Next Review | Status | Ratings |
|---------|---|---|-------------|-------------|--------|---------|
| HTTP status codes | 5.0 | 15.2 | 2026-03-01 | 2026-03-16 | 🟩 | [3,3,3] |
| REST vs GraphQL | 7.2 | 0.9 | 2026-03-01 | 2026-03-02 | 🟥 | [1,2] |
```

## When Multiple Concepts Are Due

Prioritize by retrievability (lowest R first) — review the concepts most likely to be forgotten first. If more than 5 are due, batch into groups of 4-5 and take breaks between batches.
