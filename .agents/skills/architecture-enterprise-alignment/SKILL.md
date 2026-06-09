---
name: architecture-enterprise-alignment
description: Map a Product Owner Specification onto the organization's 8-domain BIAN v14 capability map (Enterprise Management, Resource Management, Finance & Risks, Operations, Products, Customers, Channels, Business Enabler — 47 capabilities total). Produces ENTERPRISE_ALIGNMENT.md identifying which corporate domains are impacted, which governance rules apply, and which owner counterparts to engage. Mandatory gate before architecture-docs Workflow 1 (new ARCHITECTURE.md creation). Bundled enterprise model is overridable via project-local ENTERPRISE_MODEL.md.
triggers:
  - enterprise alignment
  - enterprise architecture alignment
  - align with enterprise
  - align with enterprise architecture
  - enterprise domain mapping
  - load enterprise context
  - map to enterprise domains
  - enterprise architecture context
  - enterprise governance alignment
  - check enterprise alignment
---

# Architecture Enterprise Alignment Skill

## Purpose

This skill maps a **Product Owner Specification** (Phase 1 artifact) onto the **organization's BIAN v14 capability map** (8 top-level domains, 47 capabilities) to produce `ENTERPRISE_ALIGNMENT.md` at the project root.

The report identifies — **before** the architecture team begins design — which corporate domains are impacted, which governance rules apply, which owner counterparts must be engaged, and where cross-cutting concerns (Finance & Risks, Business Enabler, Enterprise Management) require mandatory checks.

It answers: *"Which enterprise domains does this initiative touch, what governance rules will constrain it, and who do we need to talk to before designing?"*

**Output**: `ENTERPRISE_ALIGNMENT.md` at the project root — single markdown file designed for tickets, emails, Architecture Review Boards, and stakeholder kickoffs.

**Mandatory gate**: `architecture-docs` Workflow 1 (Step 0.3) BLOCKS new ARCHITECTURE.md creation until this file exists.

---

## When to Invoke This Skill

- User asks to "align with enterprise architecture", "map to enterprise domains", or "load enterprise context"
- User asks to "check enterprise alignment" or "run enterprise domain mapping"
- User has just accepted the PO Spec and needs to proceed to architecture design
- `architecture-docs` Workflow 1 Step 0.3 directs the user here because `ENTERPRISE_ALIGNMENT.md` is missing
- User uses `/skill architecture-enterprise-alignment`

**Do NOT invoke for:**
- Creating or editing the PO Spec → use `architecture-readiness` skill
- Creating or editing ARCHITECTURE.md → use `architecture-docs` skill
- PO Spec coverage analysis → use `architecture-traceability` skill
- Compliance contracts → use `architecture-compliance` skill
- Architecture quality/peer review → use `architecture-peer-review` skill

---

## Files in This Skill

| File | Purpose |
|------|---------|
| `SKILL.md` | This file — entry point and workflow |
| `ENTERPRISE_MODEL.md` | Bundled 8-domain default model (BIAN v14, 47 capabilities). Used unless overridden by a project-local `ENTERPRISE_MODEL.md` at the project root. |
| `ENTERPRISE_ALIGNMENT_TEMPLATE.md` | Output template — Summary table, per-domain analysis (8 sub-sections), Cross-Cutting Findings, Owner Engagement Plan, Next Steps |
| `ANALYSIS_METHODOLOGY.md` | How to extract business capabilities from the PO Spec and classify each domain — "What vs. How" rule, evidence citation, cross-cutting checks |

---

## Workflow

### Step 1 — Locate PO Spec File

Search for the Product Owner Specification:

```
Search order:
1. PRODUCT_OWNER_SPEC.md at project root
2. PO_SPEC.md at project root
3. Glob **/PRODUCT_OWNER_SPEC.md, **/PO_SPEC.md
4. Glob **/po-spec*, **/product-owner*
5. Ask user for path
```

If no PO Spec found, abort with: *"No Product Owner Specification found. Use `/sa-skills:architecture-readiness` to create one first — enterprise alignment requires accepted business context."*

If multiple matches, list them and ask the user to select one.

---

### Step 2 — Locate Enterprise Model

Resolve which enterprise model to use:

```
Resolution order:
1. ENTERPRISE_MODEL.md at project root  → project-local override
2. Bundled default at <plugin>/skills/architecture-enterprise-alignment/ENTERPRISE_MODEL.md
```

Record the source so it can be cited in the report header:
- `Enterprise Model: project-local override (ENTERPRISE_MODEL.md)` if (1) found
- `Enterprise Model: bundled default (sa-skills v{plugin-version})` if (2) used

If neither exists (plugin install corrupted), abort with: *"Bundled ENTERPRISE_MODEL.md missing from plugin. Reinstall sa-skills or provide a project-local ENTERPRISE_MODEL.md."*

Read the resolved model fully. The bundled default defines 8 top-level domains (Enterprise Management, Resource Management, Finance & Risks, Operations, Products, Customers, Channels, Business Enabler) covering 47 capabilities, plus 8 cross-cutting governance principles.

---

### Step 3 — Extract Business Capabilities from PO Spec

Read the PO Spec and extract business-capability evidence from these sections (matching the structure in `skills/architecture-readiness/templates/PO_SPEC_TEMPLATE.md`):

| PO Spec Section | What to extract | Feeds which domains |
|-----------------|-----------------|---------------------|
| § 1 Business Context | Problem statement, target market, strategic alignment, timing | Customers, Enterprise Management |
| § 2 Stakeholders & Users | User personas (employees vs customers vs prospects), stakeholder roles | Customers, Resource Management (if employees are users) |
| § 3 Business Objectives | Goals, KPIs, monetary impact, customer impact | Products, Customers, Finance & Risks |
| § 4 Use Cases | Actors, primary/alternative flows, edge cases | All 8 (most evidence-rich section) |
| § 5 User Stories | Acceptance criteria, role-based capabilities | Customers, Channels |
| § 6 UX Requirements | Channels mentioned, performance, accessibility | Channels |
| § 7 Business Constraints | Regulatory, integration, budget, operational | Finance & Risks, Business Enabler, Resource Management, Enterprise Management |
| § 8 Success Metrics | Adoption, KPIs, leading/lagging indicators | All cross-cutting (Enterprise Management, Finance & Risks, Business Enabler) |

**Extraction filter — "What vs. How"**: When the PO Spec mentions specific technologies, vendors, or implementation paths (e.g., "integrate with the interbank settlement network via SOAP"), record the **business capability** ("inter-bank transfer settlement") not the implementation. The "how" belongs to the architecture team; the alignment maps "what" against enterprise domains.

Produce a structured capability list:

```yaml
capabilities:
  - text: "<short business-capability statement>"
    source: "§ <section number> — <heading>"
    evidence_quote: "<verbatim excerpt, max 200 chars>"
    actors: ["<actor>", ...]      # if mentioned
    channels: ["<channel>", ...]  # if mentioned
    money_flow: true|false        # does it move money?
    data_touched: ["<entity>", ...] # customer, product, transaction, etc.
```

Capabilities are the unit of analysis for Step 4.

---

### Step 4 — Per-Domain Classification

For each of the 8 domains in the Enterprise Model, perform classification:

**Status taxonomy**:

- **🟢 Impacted** — At least one PO Spec capability falls squarely inside this domain's purpose. Governance rules WILL apply. Owner counterparts MUST be engaged.
- **🟡 Partial** — The initiative touches the edges of this domain (e.g., consumes a service from this domain) but does not own capabilities inside it. Selected governance rules apply (typically "integration by contract" / "consume as service" rules).
- **⚪ Not Applicable** — No PO Spec capability touches this domain. No owner engagement needed.

For each domain, capture:

1. **Status** — 🟢 / 🟡 / ⚪
2. **Rationale** — one sentence explaining the classification
3. **Rules Triggered** — verbatim citations from `ENTERPRISE_MODEL.md` § "Governance rules" for that domain (quote literally — do not paraphrase)
4. **Impacted Capabilities** — for every 🟢 / 🟡 domain, classify each of the domain's canonical capabilities (listed under `**Capabilities**` in `ENTERPRISE_MODEL.md` § 3.X) using the same 🟢 / 🟡 / ⚪ taxonomy. Output a bullet list of every 🟢 / 🟡 capability with per-capability status, one-line rationale, and PO Spec § citation, followed by a parenthesized `(not impacted: <comma-separated remaining capability names>)` footer. ⚪ domains use the single line `_None._` (or `_None — see § Cross-Cutting Findings._` for mandatory-check domains). Capability names cited **verbatim** — no abbreviation, no aliasing.
5. **Evidence** — bulleted excerpts from the PO Spec capability list with source section reference
6. **Owner Counterparts** — roles to engage, derived from the domain's stated owner (per the model) and the rule wording (e.g., "must be validated by Architecture and Business")

See `ANALYSIS_METHODOLOGY.md` for the detailed classification heuristics, including:

- How to handle multi-domain capabilities (e.g., a "credit decision via mobile app" capability touches Products + Finance & Risks + Channels + Business Enabler simultaneously)
- How to interpret the bundled model's per-domain capability lists (e.g., Products → 8 capabilities including Trade Financing, Investment Portfolio, Customer Agreements)
- How to map PO Spec channel mentions to the Channels domain taxonomy (Human Touch / Digital Second / Digital First)
- How to extract capability-level evidence and apply the per-capability 🟢 / 🟡 / ⚪ taxonomy (`ANALYSIS_METHODOLOGY.md` § 3.5 Per-Capability Classification)

---

### Step 5 — Cross-Cutting Mandatory Checks

Three domains are **always evaluated** regardless of the Step 4 classification, because the bundled model's "Cross-cutting Governance Principles" (§ 4) impose org-wide requirements:

| Domain | Mandatory check |
|--------|-----------------|
| **3.1 Enterprise Management** | Policy compliance, initiative registration, entity/legal/IP impact. Every initiative must trace to an Enterprise Direction objective (per § 3.1 rule 1) and respect institutional policy ownership. Flag a **🔴 Cross-Cutting Gap** if the PO Spec implies policy invention outside this domain or has no Initiative Management anchor. |
| **3.3 Finance & Risks** | Every Product, Channel, or Operations initiative must undergo prior assessment by Risk & Compliance Management (per § 3.3 rule 1). If the PO Spec touches any of these and no risk engagement is planned, flag a **🔴 Cross-Cutting Gap**. Also covers the Financial Management ledger and audit-trail requirements for any monetary impact. |
| **3.8 Business Enabler** | Architecture standards (IT Management), governed APIs (Message Management), security-by-design (Security Management), FinOps (IT Management), and the data-governance authoritative-source / data-as-a-product / AI explainability rules. Any solution must align with these regardless of per-domain status. Identify the business entities the PO Spec touches (customer, product, transaction, employee, accounting record) and confirm authoritative ownership is implied or escalate as a gap. |

These cross-cutting findings go in a separate section of the report (not duplicated inside the per-domain analysis).

---

### Step 6 — Owner Engagement Plan

Synthesize a kickoff engagement plan from the classification:

- Take every domain with status 🟢 Impacted plus the three mandatory cross-cutting domains (Enterprise Management, Finance & Risks, Business Enabler)
- For each, list:
  - **Counterpart role** (e.g., "Products domain owner — Cards product lead")
  - **Reason** (the governance rule that requires their involvement, cited verbatim)
  - **When** — `Before kickoff`, `Before architecture sign-off`, or `Before production`, mapped from the rule's wording:
    - Rules with "must be validated **before**" / "require **prior** assessment" → Before kickoff
    - Rules with "must be approved" / "subject to validation" → Before architecture sign-off
    - Rules with "no flows without record" / "may not go to production without" → Before production

This is the actionable output the architect uses to set up stakeholder meetings.

---

### Step 7 — Generate `ENTERPRISE_ALIGNMENT.md`

Load `ENTERPRISE_ALIGNMENT_TEMPLATE.md`. Fill in:

- Header: PO Spec filename, Enterprise Model source line, generation date, plugin version
- Summary table: 8 rows (one per domain), columns `# | Domain | Status | Capabilities Impacted | Rules Triggered | Owners to Engage` — the `Capabilities Impacted` column shows `N/total` where total is the domain's canonical capability count (7 / 5 / 5 / 3 / 8 / 10 / 2 / 7 for domains 3.1 → 3.8). Footer reads `**Total domains**: 8 · **Impacted (🟢)**: N · **Partial (🟡)**: N · **Not Applicable (⚪)**: N · **Capabilities impacted**: M of 47`.
- Per-Domain Analysis: 8 sub-sections with `Status / Rationale / Rules Triggered (verbatim) / Impacted Capabilities (verbatim bullet list with per-capability 🟢/🟡 status, rationale, PO Spec § citation, and a (not impacted: …) parenthetical) / Evidence / Owner Counterparts`
- Cross-Cutting Findings: 3 paragraphs (Enterprise Management, Finance & Risks, Business Enabler) with mandatory-check results
- Owner Engagement Plan: table of counterpart roles, reason, when
- Next Steps: standard footer pointing to `/sa-skills:architecture-docs` and listing the gate-passed comment that will be embedded in `docs/01-system-overview.md`

Write to `ENTERPRISE_ALIGNMENT.md` at the project root. Overwrite policy: regenerated fresh on each run (not date-stamped). If the user wants history, they archive previous versions in `archive/` themselves.

Also embed the standard architecture-gate comment at the top of the file:

```markdown
<!-- ENTERPRISE_ALIGNMENT_VERSION: 2.1 -->
<!-- ENTERPRISE_MODEL_SOURCE: [bundled default | project-local override] -->
<!-- PO_SPEC_SOURCE: [filename] -->
<!-- GENERATED: YYYY-MM-DD -->
```

---

### Step 8 — Report to User

Print summary:

```
✅ Enterprise Alignment generated.

PO Spec:               [filename]
Enterprise Model:      [bundled default | project-local override]
Domains impacted:      N of 8 (🟢 N · 🟡 N · ⚪ N)
Capabilities impacted: M of 47
Cross-cutting gaps:    N (Enterprise Management: ✅/🔴 · Finance & Risks: ✅/🔴 · Business Enabler: ✅/🔴)
Owners to engage before kickoff: N

Report: ENTERPRISE_ALIGNMENT.md

Next step:
  Run /sa-skills:architecture-docs to begin architecture design.
  Workflow 1 Step 0.3 (Enterprise Alignment Gate) will now pass.
```

---

## Integration with Other Skills

| Skill | Relationship |
|-------|-------------|
| `architecture-readiness` | **Prerequisite**: PO Spec must exist. If missing, redirect to that skill. |
| `architecture-docs` | **Consumer**: Workflow 1 Step 0.3 BLOCKS until `ENTERPRISE_ALIGNMENT.md` exists. Embeds `<!-- ENTERPRISE_ALIGNMENT_GATE: PASSED -->` in `docs/01-system-overview.md` and lifts the Owner Engagement table into Section 1.5 "Enterprise Domain Alignment". |
| `architecture-traceability` | **Complementary**: traceability measures architecture coverage of PO Spec requirements; enterprise-alignment measures organizational scope of the initiative. Different lenses on the same PO Spec. |
| `architecture-compliance` | **Downstream consumer**: Compliance contracts can reference the impacted domains as scope. |

---

## Example Invocations

```
/skill architecture-enterprise-alignment
→ Maps the PO Spec onto the 8 enterprise domains (BIAN v14 capability map), writes ENTERPRISE_ALIGNMENT.md

"align with enterprise architecture"
→ Same as above

"enterprise domain mapping"
→ Same as above

"check enterprise alignment"
→ Same as above (also detects if ENTERPRISE_ALIGNMENT.md is stale relative to the PO Spec)
```

---

## Component Naming Fidelity

When this skill references a documented component (e.g., when the PO Spec mentions a specific system that already exists in `docs/components/README.md`), use the **canonical full name** exactly as it appears in the component index. Do not abbreviate or alias.

For enterprise domain names, use the **verbatim domain name** from `ENTERPRISE_MODEL.md` (e.g., write `Finance & Risks` — not `Risks`, `Risk`, or `Risk Mgmt`; write `Business Enabler` — not `Enabler`, `Tech`, or `IT/Data`). Capability names follow the same rule: cite the canonical English name exactly as it appears under the domain's `**Capabilities**` list in `ENTERPRISE_MODEL.md` (e.g., `Customer Agreement & Contract Management`, not `Customer Contracts`). Where the user-facing summary header benefits from brevity, the short label may be used in summary tables but the full name MUST appear in the per-domain section headings.

---

## Success Criteria

A successful alignment report produces:

- [ ] All 8 domains classified with a status (🟢 / 🟡 / ⚪)
- [ ] Every 🟢 / 🟡 domain has at least one verbatim rule citation and at least one evidence excerpt
- [ ] Every 🟢 / 🟡 domain enumerates its impacted capabilities verbatim from `ENTERPRISE_MODEL.md` § 3, each bullet carrying per-capability status (🟢 / 🟡), one-line rationale, and PO Spec § citation
- [ ] Each per-domain `**Impacted Capabilities**` block closes with the `(not impacted: <comma-separated remaining canonical capability names>)` parenthetical so the reader can verify the classifier scanned the full domain
- [ ] Summary table includes the `Capabilities Impacted` column with `N/total` counts (totals: 7 / 5 / 5 / 3 / 8 / 10 / 2 / 7) that match the per-domain `**Impacted Capabilities**` lists
- [ ] Three cross-cutting findings (Enterprise Management, Finance & Risks, Business Enabler) are present regardless of per-domain status
- [ ] Owner Engagement Plan table is non-empty (cross-cutting domains guarantee at least 3 rows)
- [ ] Header comments (`<!-- ENTERPRISE_ALIGNMENT_VERSION: 2.1 -->`, `<!-- PO_SPEC_SOURCE -->`, `<!-- GENERATED -->`) are present and parseable by `architecture-docs` Step 0.3
- [ ] `ENTERPRISE_ALIGNMENT.md` renders correctly in GitHub / external markdown viewers
- [ ] `architecture-docs` Workflow 1 Step 0.3 passes when re-run after this skill completes
