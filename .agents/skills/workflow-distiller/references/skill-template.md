# House SKILL.md Template

The skeleton every drafted skill follows. Sections in this order, nothing skipped without a reason. One-line guidance per section; delete the guidance, keep the bones.

## Frontmatter rules

```yaml
---
name: my-skill-name
description: <What the skill does in one dense sentence> — <key capabilities, comma-packed>. Use when the user asks "trigger phrase one", "trigger phrase two", "trigger phrase three", or <behavioral trigger: complains about X / pastes a Y / wants Z>.
---
```

- `name`: kebab-case, matches the skill's directory name exactly. Nothing else.
- `description`: this is the **only** text the model sees when deciding whether to fire the skill — it must carry both *what* (capabilities, dense, front-loaded) and *when* (3-5 quoted trigger phrases plus behavioral triggers like "when a user complains about whitespace"). A description without trigger phrases never triggers.
- No other frontmatter keys unless the platform requires them.

## Skeleton

```markdown
---
name: skill-name
description: What + dense quoted trigger phrases (see frontmatter rules above).
---

# Skill Title

One short paragraph: what this skill takes the user from and to. If the skill has
layers or modes, name them here in a numbered list.

## Definition of Done

The user's standard, stated measurably. Bullet list of pass/fail criteria —
numbers, thresholds, and "never do X" constraints. If you can't check it, it
doesn't belong here.

## Core Principle

One bolded sentence the whole skill hangs on, plus 1-2 sentences of why.
This is the tiebreaker the model falls back on when steps are ambiguous.

## Workflow

1. **Named step.** Concrete action with the exact command:
   ```bash
   exact-command --with flags
   ```
2. **Next step.** What to look at, what decides the branch.
3. ...numbered all the way to done. Every step either runs something, checks
   something, or asks the user something — no "think about" steps.

## Reference Tables

Whatever lookup material the workflow consults: conventions, field templates,
mappings, score bands. Tables for structured comparison; fenced blocks for
copy-paste templates. Cut anything the workflow never reads.

## Anti-patterns

Bulleted list of the mistakes this skill exists to prevent — each one a thing
a competent agent would plausibly do anyway. Bold the act, then one line on why
it fails. ("**Trusting the script without the screenshot** — DOM metrics
over-credit lines.")

## Verification

Commands and checks that prove the work is done, runnable as written. Pair
every claim in Definition of Done with at least one check here. End with what
the final report to the user must state.
```

## Section guidance, one line each

- **Title + intro** — name the transformation ("from fresher-shaped to operator-shaped"), not the topic.
- **Definition of Done** — measurable or it's decoration; thresholds beat adjectives.
- **Core Principle** — one sentence, bolded, opinionated; it resolves every ambiguity downstream.
- **Workflow** — numbered, each step has a verb and most have a command; prerequisites go in step 1 or a Prerequisites block above it.
- **Reference tables** — only material the workflow actually consults mid-run; orphan tables get cut.
- **Anti-patterns** — write the failure you've actually seen, not hypothetical sins.
- **Verification** — copy-paste runnable; "eyeball it" is allowed only alongside a mechanical check, never instead of one.

## Drafting rules for workflow-distiller specifically

- Draft from the **pattern** (the workflow's shape, its tools, its failure modes) — never paste transcript text, prompts, or commands-with-arguments from history into a draft.
- Trigger phrases in the description should be the phrases the user *would* say — informed by the fact that a prefix recurred, not by quoting it.
- If the mined workflow involved secrets, hosts, or account IDs, the draft gets placeholders (`<advertiser-id>`, `$TOKEN`) — never real values, even if you could infer them.
- Keep the first draft under ~120 lines; a skill grows from use, not from speculation.
