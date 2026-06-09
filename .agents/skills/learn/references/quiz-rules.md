# Quiz Design Rules

> Adapted from [tutor-skills](https://github.com/RoundTable02/tutor-skills) quiz methodology

## Zero-Hint Policy (CRITICAL)

Every question must be answerable ONLY by someone who actually knows the material. This is the difference between testing knowledge and giving it away.

1. **Option descriptions**: NEVER reveal correctness
   - BAD: `label: "stderr"`, `description: "Error output stream used by Cloud Run for error classification"`
   - GOOD: `label: "stderr"`, `description: "Standard error stream"`

2. **No "(Recommended)" tag** on any option

3. **Randomize** correct answer position — never always first or last

4. **Question phrasing**: Ask about behavior/purpose/output, don't hint at the answer
   - BAD: "Which error stream does error() use?"
   - GOOD: "Where does error() method output go?"

5. **Plausible distractors**: Wrong options must be real concepts from the domain, representing common misconceptions. If only an expert can eliminate a distractor, it's a good distractor.

## Question Types

Mix these across every quiz round:

1. **Factual recall**: "What happens when...?"
2. **Conceptual understanding**: "Why does the system use X pattern?"
3. **Behavioral prediction**: "What happens when X fails?"
4. **Comparison/distinction**: "What is the difference between X and Y?"
5. **Debugging scenario**: "Given this error, what is the most likely cause?"

## Difficulty Balancing

| Session Type | Easy | Medium | Hard |
|-------------|------|--------|------|
| Diagnostic (first time) | 40% | 40% | 20% |
| Weak-area drill | 0% | 30% | 70% |
| General review | 33% | 33% | 33% |

## Drilling Weak Concepts

When targeting low-stability concepts from the knowledge base:

- Do NOT repeat the exact same question — rephrase in a new context
- Test the same underlying knowledge from a different angle
- Example: If user confused "400 vs 422", ask a scenario where they must choose the correct status code for a NEW situation they haven't seen before
- This tests whether they actually learned the distinction, not just memorized one answer

## AskUserQuestion Format

- 4 questions per round, 4 options each, single-select
- Header: max 12 chars, format "Q1. Topic"
- Option labels: concise (1-4 words)
- Option descriptions: neutral context only, NO hints about correctness
- NEVER use markdown formatting in options (no bold, no links)

## Grading & Feedback

After the user answers all 4 questions:

1. Show results table:

| # | Question | Correct Answer | Your Answer | Result |
|---|----------|---------------|-------------|--------|
| 1 | ... | ... | ... | ✅/❌ |

2. For wrong answers: concise explanation (2-3 lines max)
   - Name the misconception
   - Explain why the correct answer is correct
   - Don't just restate — explain the reasoning

3. Map each question to its concept and area for FSRS tracking

## FSRS Rating After Quiz

| Result | Rating | When |
|--------|--------|------|
| ✅ Correct, answered instantly | Easy (4) | No hesitation, full confidence |
| ✅ Correct | Good (3) | Normal successful recall |
| ❌ Wrong but close | Hard (2) | Had the right idea, confused details |
| ❌ Wrong, fundamental gap | Again (1) | Completely missed the concept |
