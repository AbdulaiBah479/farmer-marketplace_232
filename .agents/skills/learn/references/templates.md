# File Templates

## Learning Profile (`~/.learn/profile.md`)

```markdown
# Learning Profile

> Created: {date}
> Last Updated: {date}

## About You
- **Current Focus**: {topic they want to learn}
- **Level**: {beginner / some exposure / intermediate / advanced}

## Learning Preferences
- **Style**: {examples / analogies / step-by-step / visual / connecting to existing knowledge}
- **Confusion Tolerance**: {resolve quickly / moderate / sit with uncertainty}
- **Analogy Domain**: {field they know well for metaphors}
- **Language**: {detected language}

## Observations
(Updated by the tutor as patterns emerge)
```

## Knowledge Base (`~/.learn/topics/{topic}/knowledge-base.md`)

```markdown
# {Topic} — Knowledge Base

> Profile: ~/.learn/profile.md
> Created: {date}

## Concept Map

| Concept | Area | D | S | Last Review | Next Review | Status | Ratings |
|---------|------|---|---|-------------|-------------|--------|---------|

## Area Summary

| Area | Concepts | Mastered | Good | Fair | Weak | Unmeasured |
|------|----------|----------|------|------|------|------------|

## Stats

- **Total Concepts**: 0
- **Due for Review**: 0
- **Weakest Area**: -
- **Strongest Area**: -

## Session Log

### {date}
- **Covered**: ...
- **Mastered**: ...
- **Developing**: ...
- **Next Focus**: ...
```

## Concept File (`~/.learn/topics/{topic}/concepts/{area}.md`)

```markdown
# {Area} — Concept Tracker

| Concept | D | S | Last Review | Next Review | Status | Ratings |
|---------|---|---|-------------|-------------|--------|---------|

### Error Notes

(Added when concepts are missed)

**{concept name}**
- Confusion: {what the learner mixed up}
- Key point: {the correct understanding}
- Source: {reference to source material if available}
```

## Naming Conventions

- **Topic slug**: lowercase, hyphens, no spaces (e.g., `kubernetes`, `system-design`, `mem0`)
- **Area slug**: lowercase, hyphens (e.g., `core-api`, `networking`, `data-structures`)
- **Dates**: ISO format `YYYY-MM-DD`
- **All content**: in user's detected language (except slugs which stay in English)
