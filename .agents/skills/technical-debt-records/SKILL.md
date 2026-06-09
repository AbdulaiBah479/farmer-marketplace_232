---
name: technical-debt-records
description: Use this skill whenever the user mentions deferred work, known compromises, shortcuts taken, "we'll fix this later," temporary workarounds, missing controls, or any architectural trade-off that should be made visible and tracked. Also trigger when arc42 Section 11 (Risks and Technical Debt) is being authored or updated, when a TDR / Technical Debt Record is requested by name, or when an ADR documents a decision that intentionally accepts debt. Do NOT use for general bug reports, feature requests, or backlog items — TDRs are for architectural or systemic compromises, not ordinary defects.
---

# Technical Debt Records (TDRs)

## Purpose

A Technical Debt Record (TDR) makes a known technical compromise **explicit, tracked, and reviewable**. TDRs are the sibling of ADRs (Architecture Decision Records): where ADRs capture *why a decision was made*, TDRs capture *what was deferred or accepted as suboptimal, and what it will cost later*.

This skill creates and maintains TDRs in the target project following the lean format introduced by Patrick Roos (workingsoftware.dev), based on the original concept by Michael Stal.

## When to create a TDR

Create a TDR when the user describes any of:

- A known shortcut taken under time pressure ("we'll fix this in v2")
- A control or quality attribute that is missing or partially implemented (e.g. plain HTTP where TLS should be, missing auth, no rate limiting, no observability)
- A workaround that depends on an external constraint (vendor limitation, legacy system, upstream API)
- An architectural compromise accepted to ship — duplication, tight coupling, missing abstraction
- A deprecation that has not been completed (old API still live, two paths to the same data)
- A platform/version that is past end-of-life or approaching it
- A scaling, security, or reliability ceiling the team has already hit or will hit

**Do NOT create a TDR for**: routine bugs, feature requests, performance tuning of working code, or backlog items that are simply "not done yet." TDRs are for *intentional compromises with architectural impact*.

## Storage convention

- **Location**: `tdr/` directory at the **repo root** of the target project.
- **Cross-reference**: when the target project uses arc42, add or update `docs/architecture/11-risks-and-technical-debt.md` (or equivalent) to link to the TDR index. Section 11 should contain a short table summarizing open TDRs and pointing to the full records under `tdr/`.
- **Filename**: `TDR-NNN-short-kebab-title.md` (e.g. `TDR-001-iis-plain-http-transmission.md`).
- **Index**: maintain `tdr/README.md` as the index — a table of all TDRs with ID, title, status, and owner.

## ID scheme

- **Global, zero-padded**: `TDR-001`, `TDR-002`, `TDR-003`, ...
- Always check `tdr/` for the highest existing ID before assigning a new one.
- IDs are **never reused**, even if a TDR is later marked `Won't Fix` or `Resolved`.

## Workflow

When creating a TDR:

1. **Scan first**: `ls tdr/` (or equivalent) to find the next available ID. If `tdr/` does not exist, create it and seed `tdr/README.md` from `references/index-template.md`.
2. **Draft from template**: copy `templates/tdr-template.md` and fill all five fields. Do not leave placeholder text; if a field cannot be filled, ask the user.
3. **Title rules**: short, descriptive, present-tense, identifies the *compromise* not the *fix*. Good: "IIS gateway transmits credentials in plain HTTP." Bad: "Add TLS to IIS."
4. **Status default**: new TDRs start as `Open` unless the user explicitly says otherwise. Valid values: `Open`, `Planned`, `In Progress`, `Resolved`, `Won't Fix`.
5. **Link bidirectionally**: if a related ADR exists, link to it from the TDR and add a back-link in the ADR. Same for affected C4 components.
6. **Update the index**: append the new TDR to `tdr/README.md` and to the arc42 Section 11 summary table if present.

When updating an existing TDR:

- Status transitions are the most common change. Append a brief dated note under a `## History` section at the bottom of the TDR rather than rewriting fields silently.
- If a TDR is marked `Resolved`, link to the commit / PR / ADR that resolved it.
- If a TDR is marked `Won't Fix`, the `Description` and `Impact` fields must justify why the debt is being accepted permanently.

## TDR format (lean, 5 fields)

Every TDR contains exactly these sections, in this order:

1. **Status** — `Open` | `Planned` | `In Progress` | `Resolved` | `Won't Fix`
2. **Description** — what was done, what's missing, what needs improvement
3. **Impact** — consequences and risks of leaving it unresolved
4. **Possible Solutions** — directional, not final
5. **Owner** — person or team responsible

Optional fields permitted at the top (frontmatter): `date`, `related-adrs`, `affected-components`, `tags`.

See `templates/tdr-template.md` for the exact structure and `examples/` for filled-in references.

## Placement in arc42

TDRs belong conceptually in **arc42 Section 11: Risks and Technical Debt**. In this skill's convention:

- The full TDR records live at `tdr/` (repo root) for tooling-friendliness and discoverability.
- Section 11 of the architecture document contains a **summary table** and a pointer to `tdr/`, not the full records. This keeps the architecture document readable while preserving traceability.

See `references/arc42-section-11-snippet.md` for a drop-in summary table.

## Quality checklist

Before finalizing any TDR, verify:

- [ ] ID is globally unique and zero-padded (`TDR-NNN`)
- [ ] Title names the compromise, not the fix
- [ ] All five mandatory fields are filled with concrete content (no placeholders)
- [ ] Impact describes *consequences*, not just "this is bad"
- [ ] Owner is a named person or team, not "TBD"
- [ ] Index (`tdr/README.md`) is updated
- [ ] Cross-references to ADRs / components are bidirectional

## References

- Patrick Roos, *Technical Debt Records: The Missing Piece in your Software Architecture Documentation* — https://www.workingsoftware.dev/technical-debt-records/
- Michael Stal, original Heise article (German) — https://www.heise.de/blog/Technical-Debt-Records-Dokumentation-technischer-Schulden-9876115.html
- arc42 Section 11 — https://docs.arc42.org/section-11/
