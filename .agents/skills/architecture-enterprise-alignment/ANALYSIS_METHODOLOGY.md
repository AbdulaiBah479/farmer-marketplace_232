# Enterprise Alignment — Analysis Methodology

This guide defines **how** to extract business capabilities from a PO Spec and classify each enterprise domain. It is consumed by `SKILL.md` Step 4 (Per-Domain Classification) and Step 5 (Cross-Cutting Checks).

---

## 1. Extraction Filter — "What vs. How"

The PO Spec defines **what** the business needs. The "how" belongs to the architecture team. When extracting capabilities:

- ✅ Record the business capability (e.g., "issue a debit card to a verified customer")
- ❌ Do NOT record implementation paths (e.g., "call the interbank settlement gateway via SOAP")
- ❌ Do NOT record technology choices (e.g., "use Kafka for event streaming")

Implementation details surface again later — during architecture design — and are then validated against the IT-domain governance rules. At alignment time, they are noise.

> **Rationale**: a "how" mention biases the classification. If the PO Spec says "integrate with the interbank settlement network", that should not auto-mark the Operations domain as 🟢 — it marks Operations 🟢 only if the underlying capability is "move money between accounts at different institutions". The capability is what triggers the governance rule, not the chosen integration.

---

## 2. Capability Schema

Each extracted capability has these fields:

```yaml
capability:
  text: <≤ 15 words, business-capability statement>
  source: "§ <section number> — <heading>"
  evidence_quote: <verbatim excerpt, ≤ 200 chars>
  actors:        [<actor>, ...]      # e.g., ["customer", "advisor"]
  channels:      [<channel>, ...]    # e.g., ["mobile app", "branch"]
  money_flow:    true | false        # does it move money?
  data_touched:  [<entity>, ...]     # e.g., ["customer", "transaction"]
  is_employee_facing: true | false   # internal user vs. external
```

This shape is the unit of analysis. One PO Spec use case typically yields 2–6 capabilities.

---

## 3. Domain Classification Heuristics

For each of the 8 domains, apply this decision sequence:

### 🟢 Impacted — when ANY of these is true:

| Domain | Trigger condition |
|--------|-------------------|
| 3.1 Enterprise Management | A capability proposes a new policy, modifies corporate-entity arrangements, registers a new strategic initiative, touches investor-facing commitments, requires legal-support intervention, or creates new IP. **Always 🟢 as a cross-cutting check — see § 5.** |
| 3.2 Resource Management | A capability creates, modifies, or terminates an employee record; triggers recruitment/competency/training flows; engages a supplier or contractor; or proposes facility/location changes. |
| 3.3 Finance & Risks | A capability creates, modifies, or consumes risk decisions (credit, market, fraud, regulatory compliance); records an accounting entry; requires budget allocation or treasury impact; logs an incident; or formalises a partner-of-record (correspondent bank, payment network, regulator). **Always 🟢 as a cross-cutting check — see § 5.** |
| 3.4 Operations | `money_flow == true` for any capability — money movement, payments, transfers, settlement. Also 🟢 when the capability creates, modifies, or releases collateral/appraisal records. |
| 3.5 Products | A capability creates a new product or financial instrument, modifies an existing product's conditions/fees, proposes a trade-financing or investment-portfolio arrangement, manages issued enablers (e.g., cards, certificates, authorisations), or alters customer agreements/contracts. Channel-only consumption of an existing product is 🟡 not 🟢. |
| 3.6 Customers | A capability declares or targets a segment, creates/modifies a customer or prospect record, builds offers/campaigns/loyalty programs, manages points of sale, organises customer events, evolves the brand, or handles claims/inquiries. |
| 3.7 Channels | A capability is delivered through a channel (Branch, Contact Center, ATM, agent-banking POS, digital wallet, Mobile, Web, Portal, AI Bot, Voice Bot), captures an interaction, or proposes a new channel. |
| 3.8 Business Enabler | A capability creates a new authoritative dataset; declares a new data product; builds an AI/ML model; provisions IT infrastructure or APIs; introduces a new security control; orchestrates a long-running business process or task across multiple domains; or manages corporate content, messages, or assets. **Always 🟢 for any technology-bearing initiative — see § 5.** |

### 🟡 Partial — when:

The initiative **consumes** capabilities from this domain as a service but does NOT own anything inside the domain. Examples:

- A mobile banking feature that displays existing products → Channels 🟢, Products 🟡 (consumes the catalog, doesn't change it)
- A payment-execution use case that calls the existing fraud service → Transactions 🟢, Risks 🟡 (consumes the service)
- A campaign feature that pulls customer data → Marketing & Sales 🟢, Data 🟡 (consumes the customer authoritative source)

🟡 status still triggers governance rules — typically "integration by contract" and "consume as service" rules — but does NOT require full domain co-design.

### ⚪ Not Applicable — when:

No capability touches the domain in any form. Be explicit: do not mark ⚪ as a default — verify by scanning the full capability list.

---

## 3.5 Per-Capability Classification

Domain-level status is necessary but not sufficient — a 🟢 Customers domain may impact only `Customer Management` and `Prospect Management`, not all 10 Customers capabilities. After Step 4 assigns a domain status, immediately classify **each of that domain's canonical capabilities** (listed under `**Capabilities**` in `ENTERPRISE_MODEL.md` § 3.X) using the same 🟢 / 🟡 / ⚪ taxonomy:

1. **🟢 Impacted** — at least one extracted PO Spec capability (from § 2 above) falls inside this capability's scope. Test: would the canonical owner of this capability (per § 6 below — Owner Counterpart Derivation) need to be consulted to deliver the PO Spec capability? If yes → 🟢.
2. **🟡 Partial** — the initiative **consumes** outputs from this capability as a service but does not own or modify anything inside it. Example: a payment flow that calls the existing fraud-detection service → `Fraud Management` 🟡 (consumed), not 🟢 (no fraud logic owned).
3. **⚪ Not Applicable** — no PO Spec capability touches this canonical capability. Do NOT list ⚪ capabilities as bullets; enumerate them in the per-domain `(not impacted: <comma-separated names>)` footer so the reader can verify the classifier scanned the full list.

**Naming**: cite capability names **verbatim** from `ENTERPRISE_MODEL.md` § 3.X (e.g., `Customer Agreement & Contract Management`, not `Customer Contracts`; `Money Movement Management`, not `Money Movement`). The Component Naming Fidelity rule in `SKILL.md` applies — no abbreviation, no aliasing.

**Counts**: the Summary table `Capabilities Impacted` column shows `N/total`, where N counts 🟢 + 🟡 and total is the domain's full capability count (7 / 5 / 5 / 3 / 8 / 10 / 2 / 7 for domains 3.1 → 3.8). Domain `⚪ Not Applicable` rows show `0/total`.

**Consistency rule**: a domain marked 🟢 MUST have at least one capability marked 🟢. A domain marked 🟡 MUST have at least one capability marked 🟡 (and no 🟢). A domain marked ⚪ MUST have all capabilities ⚪. Inconsistency = classifier bug, re-run Step 4 + this section.

---

## 4. Multi-Domain Capabilities

A single capability often touches multiple domains. Example:

> **Capability**: "Customer initiates a personal loan via mobile app, which evaluates credit risk in real time and provisions the loan account."

This single capability touches:

- **Channels (3.7)** 🟢 — mobile app delivery (Channel Management + Interaction Management)
- **Customers (3.6)** 🟢 — customer identity required (Customer Management)
- **Products (3.5)** 🟢 — loan product (Product & Service Management + Customer Agreement & Contract Management)
- **Finance & Risks (3.3)** 🟢 — credit risk evaluation (Risk & Compliance Management) plus accounting entry on disbursement (Financial Management)
- **Operations (3.4)** 🟢 — loan disbursement is a money movement (Money Movement Management) and may require collateral records (Collateral & Appraisal Management)
- **Business Enabler (3.8)** 🟢 — cross-cutting (IT, Security, governed APIs via Message Management, authoritative customer source)
- **Enterprise Management (3.1)** 🟡 — Initiative Management registration if this is a new strategic initiative

When mapping, **list the same evidence under every triggered domain** (do not try to be parsimonious — the reader of one domain section should see the full evidence even if it appears under other sections too).

### Per-capability fan-out (same example)

Applying § 3.5 to the same "personal loan via mobile app" capability, the impacted **canonical capabilities** under each domain are:

| Domain | Impacted Capabilities (🟢/🟡) | Not impacted (⚪) under same domain |
|--------|-------------------------------|-------------------------------------|
| 3.5 Products | `Product & Service Management` 🟢, `Customer Agreement & Contract Management` 🟢, `Financial Instrument Management` 🟢 | Financial Plan Management, Order Management, Trade Financing Management, Issued Enabler Management, Investment Portfolio Management |
| 3.4 Operations | `Money Movement Management` 🟢, `Collateral & Appraisal Management` 🟢 *(if secured)* | Payment Management |
| 3.3 Finance & Risks | `Risk & Compliance Management` 🟢, `Financial Management` 🟢 | Incident Management, Partner Management, Fraud Management *(unless PO Spec mentions fraud)* |
| 3.6 Customers | `Customer Management` 🟢 | Loyalty, Offer, Marketing, Campaign, Point-of-Sale, Event, Prospect, Brand, Claims & Inquiry |
| 3.7 Channels | `Channel Management` 🟢, `Interaction Management` 🟢 | — |
| 3.8 Business Enabler | `IT Management` 🟢, `Message Management` 🟢, `Security Management` 🟢 | Asset, Business Process *(unless orchestrated)*, Content, Task Management |
| 3.1 Enterprise Management | `Initiative Management` 🟡 *(registration only)* | Enterprise Direction, Policy, Entity, Investor, Legal Support, Intellectual Property |

This is the level of granularity the per-domain `**Impacted Capabilities**` bullet list must reach in the generated `ENTERPRISE_ALIGNMENT.md`.

---

## 5. Cross-Cutting Mandatory Domains (Enterprise Management, Finance & Risks, Business Enabler)

These three domains are evaluated **regardless** of the per-domain classification, per `ENTERPRISE_MODEL.md` § 4 (Cross-cutting Governance Principles).

### 3.1 Enterprise Management — mandatory check

Trigger questions:
- Is the initiative registered against an Initiative Management entry tracing back to an Enterprise Direction objective? (per § 3.1 rule 1)
- Does the PO Spec invent or override corporate policy, entity rules, or legal/IP positions outside the Enterprise Management domain? (per § 3.1 rule 2) → flag **🔴 Cross-Cutting Gap**.
- Does the initiative imply investor-facing commitments (regulatory filings, ESG disclosures, capital-markets communications) without Entity / Investor Management coordination? (per § 3.1 rule 3) → flag **🔴 Cross-Cutting Gap**.

### 3.3 Finance & Risks — mandatory check

Trigger questions:
- Does this initiative touch any Product, Channel, or Operations capability? (per § 3.3 rule 1: "Every Product, Channel, or Operations initiative must undergo prior assessment by Risk & Compliance Management.")
- If YES and the PO Spec does not mention a planned risk engagement → flag **🔴 Cross-Cutting Gap**.
- Does the PO Spec mention implementing risk logic in a non-Finance & Risks component? (e.g., channel-side fraud rules) → flag **🔴 Cross-Cutting Gap** per § 3.3 rule 1.
- Does the initiative imply monetary movement without an accounting entry trail? (per § 3.3 rule 3) → flag **🔴 Cross-Cutting Gap**.

### 3.8 Business Enabler — mandatory check

Verify alignment against the seven Business Enabler rules:

1. **Architecture standards (IT Management)** — does the PO Spec mention a technology constrained to specific vendors/stacks? If outside the authorized stack, flag.
2. **Governed APIs (Message Management)** — does the PO Spec imply any point-to-point integration outside an authorized gateway? Flag if yes.
3. **Security by design (Security Management)** — encryption in transit/at rest, identity management, secrets management, observability. Flag any explicit waiver request.
4. **FinOps cost model (IT Management)** — does the PO Spec declare a cost model? Flag if absent and the initiative is cloud-bound.
5. **Single authoritative source per business entity** — for each entity in `data_touched`:

   | Entity | Authoritative source check |
   |--------|----------------------------|
   | customer | Single golden record per § 3.6 Customers + § 3.8 rule 5 |
   | product | Corporate product catalog (Product & Service Management) per § 3.5 + § 3.8 rule 5 |
   | transaction | Operations domain per § 3.4 + § 3.8 rule 5 |
   | employee | Resource Management golden record per § 3.2 + § 3.8 rule 5 |
   | accounting record | Financial Management per § 3.3 + § 3.8 rule 5 |

   If the PO Spec proposes creating a new copy of one of these entities (rather than consuming the authoritative source), flag **🔴 Cross-Cutting Gap**.

6. **AI / Intelligent Systems** — § 3.8 rule 6 requires declaration of data origin, governance model, bias controls, and explainability. Flag if absent.
7. **Cross-domain orchestration** — long-running workflows that cross multiple domains MUST be modelled in Business Process Management / Task Management (§ 3.8 rule 7), not duplicated locally. Flag local-orchestration designs.

---

## 6. Owner Counterpart Derivation

Owner role names are not hardcoded — derive them from the domain header in `ENTERPRISE_MODEL.md`:

| Domain section | Default counterpart role label |
|----------------|-------------------------------|
| 3.1 Enterprise Management | "Architecture Governance, Corporate Strategy, Legal lead, Investor Relations (if applicable), IP Office (if applicable)" |
| 3.2 Resource Management | "HR — Human Capital / Competency / Training lead; Administration — Locations / Facilities lead; Procurement — Supplier & Contractor lead" |
| 3.3 Finance & Risks | "Risk lead (Credit / Fraud / Regulatory Compliance — pick by capability); Finance lead — Treasury / Accounting Close / Budget; Incident Management lead; Partner Management lead (for correspondent/network relationships)" |
| 3.4 Operations | "Operations lead — Money Movement / Payments / Settlement; Collateral & Appraisal lead (if secured product involved)" |
| 3.5 Products | "Products domain owner — by product line (Plans / Orders / Trade Financing / Issued Enablers / Investment Portfolio / Product & Service / Instruments / Customer Agreements)" |
| 3.6 Customers | "Customer Experience lead; Marketing lead; Segments lead; Loyalty lead; Brand lead; Claims & Inquiry lead (pick by capability)" |
| 3.7 Channels | "Channel owner — [specific channel from capability]; Interaction Management lead" |
| 3.8 Business Enabler | "Architecture Governance, Engineering, Infrastructure, CyberSecurity, FinOps, Data Governance (authoritative-source owners), Business Process / Task Orchestration lead" |

The skill output may refine these labels using context from the PO Spec (e.g., if Stakeholders & Users names specific people, use them).

---

## 7. Engagement Timing Derivation

Map rule wording to engagement timing:

| Rule wording contains | Engagement timing |
|-----------------------|-------------------|
| "before launch", "before being offered", "before kickoff", "prior assessment" | **Before kickoff** |
| "must be approved", "joint validation", "subject to validation", "must align with" | **Before architecture sign-off** |
| "no flows without record", "may not go to production", "no solution may go to production" | **Before production** |
| "must be monitored continuously" | **Operational — ongoing** |

When in doubt, default to "Before architecture sign-off" — it's the safe middle.

---

## 8. Anti-Patterns to Avoid

- ❌ **Paraphrasing rules** — always quote verbatim from `ENTERPRISE_MODEL.md`. Paraphrasing is how governance erosion starts.
- ❌ **Inventing domains or rules not in the model** — if the model is silent on something, the report is silent on it. Do not add "Customer Experience" or "Innovation" as ghost domains.
- ❌ **Marking everything 🟢** — if the report says 8/8 impacted, the classifier is broken. A typical retail-banking initiative impacts 3–6 of the 8 domains; the remaining domains stay 🟡 or ⚪. (Note: Enterprise Management, Finance & Risks, and Business Enabler are *evaluated* for every initiative as cross-cutting checks, but their per-domain status can still legitimately be ⚪ if no capability falls inside them — the cross-cutting block in § Cross-Cutting Findings captures the engagement need separately.)
- ❌ **Omitting cross-cutting checks** — Enterprise Management, Finance & Risks, and Business Enabler sections appear even when their per-domain status is ⚪. They live in their own § Cross-Cutting Findings.
- ❌ **Skipping evidence quotes** — every 🟢 / 🟡 classification needs at least one verbatim PO Spec excerpt with section reference. Without evidence, the classification is unverifiable.
- ❌ **Marking a domain 🟢 without naming any capability** — if the domain is impacted, the per-domain `**Impacted Capabilities**` block MUST list at least one 🟢 capability with rationale. An empty bullet list under a 🟢 domain is a classifier bug; re-run § 3.5 against the domain's full canonical capability list.
- ❌ **Capability invention** — only the 47 capabilities listed in `ENTERPRISE_MODEL.md` § 3 may appear in the `**Impacted Capabilities**` blocks. Do not coin new ones. Examples of forbidden inventions: `Customer Onboarding Management` (canonical is `Customer Management`), `Settlement Management` (canonical is `Money Movement Management`), `KYC Management` (canonical is `Risk & Compliance Management`). When in doubt, quote the heading from `ENTERPRISE_MODEL.md` exactly.
