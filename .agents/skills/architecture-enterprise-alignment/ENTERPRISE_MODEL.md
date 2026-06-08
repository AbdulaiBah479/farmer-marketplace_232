<!-- ENTERPRISE_MODEL_VERSION: 2.0 -->
<!-- BIAN_VERSION: v14 -->
<!-- SOURCE: BIAN v14 capability model (institution-neutral, 47 capabilities, 8 domains) -->
<!-- ROLE: bundled-default -->

> **Override semantics**: This file is the bundled default consumed by `sa-skills:architecture-enterprise-alignment`. To use a different model for your project, create a file named exactly `ENTERPRISE_MODEL.md` at the **project root**. The skill resolves the project-local copy first; if present, it is used instead of this bundled default. The project-local copy MUST preserve the same structure: a `## 3. Domains` section with 8 numbered sub-sections (3.1 … 3.8) and a `## 4. Cross-cutting Governance Principles` section.

> **Migration note (v2.0)**: This bundled model was restructured in v2.0 from the prior 13-domain English Architecture Governance shape into the **BIAN v14-aligned 8-domain capability map** (47 capabilities). Capability names are in English. Projects that need to keep the v1.0 shape can drop their copy of v1.0 at the project root — the override path is unchanged.

---

# Enterprise Architecture Governance

> **The Arbiter**: defines the standards and rules that every domain must follow.

## 1. Purpose

This document describes the **enterprise architecture domain model** of the organization, expressed as the BIAN v14 capability map adopted for the bank. Its goal is to establish a common language across Business, Technology, and Operations, to delineate the responsibilities of each domain, and to serve as the mandatory reference for:

- The design of new solutions and initiatives.
- The evaluation of vendor and external partner proposals.
- The prioritization of investments and capability planning.
- End-to-end process traceability, from the customer through the supporting systems.

**Architecture Governance** acts as a cross-cutting arbiter: it does not execute business operations, but it defines the standards, principles, patterns, and exceptions that govern every domain listed below.

---

## 2. Model Structure

The model groups **47 business capabilities** into **8 top-level domains**, arranged on the canvas around the customer:

| Position | Domain | Function |
|---|---|---|
| **Top** | Enterprise Management | The "Why" — corporate direction, policies, entities, initiatives, investor and IP stewardship |
| **Left** | Resource Management | The "With whom and where" — people, competencies, locations, facilities, suppliers |
| **Center-top** | Finance & Risks | The "Shield and ledger" — risk, compliance, finance, fraud, incidents, partners |
| **Center** | Operations · Products · Customers | The "What we sell" and "For whom" — money movement, the product catalog, customer experience |
| **Right** | Channels | The "How we reach the customer" |
| **Bottom** | Business Enabler | The "With what" — IT, security, content, assets, processes, tasks, messages |

A capability defines **what the bank does or can do**; maturity is evaluated by *how*, *with what*, and *who* delivers it. Maturity assessment is performed against the institution's strategy and is out of scope for this model — this document describes the capability boundaries, not their maturity scores.

---

## 3. Domains

### 3.1 Enterprise Management

**Purpose**: The *"Why"* of the organization. Anchors corporate direction, the policies and entities that define how the bank operates as an institution, the portfolio of strategic initiatives, and the stewardship of investor relations and intellectual property.

**Capabilities** (7):

- Enterprise Direction Management
- Policy Management
- Entity Management
- Initiative Management
- Investor Management
- Legal Support Management
- Intellectual Property Management

**Governance rules**:

- Every business initiative must register against an Initiative Management entry and trace back to an Enterprise Direction objective before resources are committed.

  > *Carried from v1.0 Cross-cutting Principle 8 — Governed Evolution.*

- Changes to corporate policies, legal positions, or IP arrangements are governed from this domain only; no project, channel, or product domain may invent or override policy locally.

  > *Carried from v1.0 § 3.9 Administration (Legal Services) and Cross-cutting Principle 1 — Separation of Responsibilities.*

- Investor-facing commitments (regulatory filings, ESG disclosures, capital-markets communications) require Entity Management and Investor Management coordination before any external publication.

  > *New in v2.0 — capability has no v1.0 analogue.*

---

### 3.2 Resource Management

**Purpose**: The *"Talent, place, and partner engine"* that supplies the institution with the human capital, competencies, physical footprint, and third-party suppliers that make operations possible.

**Capabilities** (5):

- Human Capital Management
- Competency Management
- Location Management
- Facilities, Furniture & Equipment Management
- Supplier & Contractor Management

**Governance rules**:

- The employee lifecycle (onboarding, modification, offboarding) is the single source for downstream access management in the Business Enabler domain (IT, Security).

  > *Carried from v1.0 § 3.7 Human Resources.*

- Technology procurement and supplier engagements must pass Business Enabler (IT/Architecture) validation before contract award.

  > *Carried from v1.0 § 3.9 Administration.*

- Physical location, facility, and equipment changes that affect customer-facing operations require Channels-domain coordination so that the omnichannel experience remains consistent.

  > *Carried from v1.0 Cross-cutting Principle 1 — Separation of Responsibilities.*

---

### 3.3 Finance & Risks

**Purpose**: The *"Shield and ledger."* Concentrates the institution's risk-and-compliance stance, financial control, partner-of-record relationships, and the loss-prevention machinery (fraud, incidents) that keeps the business sustainable.

**Capabilities** (5):

- Risk & Compliance Management
- Financial Management
- Incident Management
- Partner Management
- Fraud Management

**Governance rules**:

- Every Product, Channel, or Operations initiative must undergo prior assessment by Risk & Compliance Management. Risk models and fraud rules are consumed as services; no domain may implement risk logic locally without approval.

  > *Carried from v1.0 § 3.6 Risks.*

- Regulatory compliance is a hard constraint: no solution may go to production without the corresponding Risk & Compliance validation.

  > *Carried from v1.0 § 3.6 Risks rule 3.*

- Every monetary transaction must be reflected in Financial Management through auditable entries; no flows without an accounting record are admitted. The budget is the reference for validating the viability of IT and business initiatives.

  > *Carried from v1.0 § 3.8 Accounting & Finance.*

- Incidents (operational, security, or fraud) follow the institution's incident lifecycle and feed back into Risk & Compliance and Business Enabler controls — post-incident learning is mandatory, not optional.

  > *Carried from v1.0 § 3.6 Risks rule 2 (operational compliance).*

- Partner-of-record relationships (correspondent banks, payment networks, regulators) are owned in Partner Management; channels and products consume the integration via governed APIs, not direct counterparty contact.

  > *Carried from v1.0 § 3.5 Transactions rule 3 (external network governance).*

---

### 3.4 Operations

**Purpose**: *"Movement of Money."* Concentrates the monetary flows between accounts, institutions, and services, plus the collateral and appraisal mechanics that secure them.

**Capabilities** (3):

- Money Movement Management
- Payment Management
- Collateral & Appraisal Management

**Governance rules**:

- Every monetary transaction must pass through a recognized component of the Operations domain; no shortcuts from channels or products are allowed.

  > *Carried from v1.0 § 3.5 Transactions rule 1.*

- Flows must have end-to-end traceability with correlatable identifiers (e.g., correlation by customer, by session, by instrument).

  > *Carried from v1.0 § 3.5 Transactions rule 2.*

- Integrations with external networks (e.g., interbank settlement networks, card networks, clearing houses) require encryption in transit via mTLS or equivalent, with explicit certificate governance.

  > *Carried from v1.0 § 3.5 Transactions rule 3.*

- Collateral and appraisal records are the authoritative input to credit decisions made by Finance & Risks; a Products credit instrument cannot be issued without a valid Collateral & Appraisal record where the product type requires one.

  > *New in v2.0 — capability has no v1.0 standalone analogue (was implicit in v1.0 § 3.3 Products → Assets).*

---

### 3.5 Products

**Purpose**: *"What"* we sell and manage. The catalog of financial instruments and arrangements the organization offers its customers, from plans and orders through portfolios and customer contracts.

**Capabilities** (8):

- Financial Plan Management
- Order Management
- Trade Financing Management
- Issued Enabler Management

  <!-- TODO: confirm canonical English name for the issued-enabler product capability — provisionally "Issued Enabler Management". The capability covers issued enabling instruments tied to a product (cards, certificates, authorisations, tokens). Replace with the institutional English label when adopted. -->

- Investment Portfolio Management
- Product & Service Management
- Financial Instrument Management
- Customer Agreement & Contract Management

**Governance rules**:

- Every product must be registered in Product & Service Management before being offered by any channel. Changes to a product's conditions, fees, or rules are managed from this domain — never from the channel.

  > *Carried from v1.0 § 3.3 Products rules 1–2.*

- The design of a new product must validate its impact on Finance & Risks, Operations, and Business Enabler before launch.

  > *Carried from v1.0 § 3.3 Products rule 3 (adapted: "Risks, Transactions, and Accounting" → "Finance & Risks, Operations, and Business Enabler").*

- Customer agreements and contracts (Customer Agreement & Contract Management) are the legal binding layer between the Products catalog and the customer; channel offers cannot create contractual conditions outside what this capability codifies.

  > *Carried from v1.0 § 3.4 Marketing & Sales rule 1 (adapted to contractual layer).*

- Trade financing and investment portfolio capabilities consume the same risk-assessment service as any other product; specialized treatment in risk modelling is allowed only when explicitly approved by Finance & Risks.

  > *Carried from v1.0 § 3.6 Risks rule 2.*

---

### 3.6 Customers

**Purpose**: The *"Who and how we engage them"* layer. Aggregates customer identity, segments, prospects, marketing, offers, campaigns, brand, points of sale, events, and post-sale claims into a single customer-experience domain.

**Capabilities** (10):

- Loyalty Management
- Offer Management
- Marketing Management
- Customer Management
- Campaign Management
- Point-of-Sale Management
- Event Management
- Prospect Management
- Brand Management
- Claims & Inquiry Management

**Governance rules**:

- The identity model and lifecycle of every customer and prospect must be unified in a single authoritative source (golden record) inside Customer Management.

  > *Carried from v1.0 § 3.2 People rule 1.*

- Offers and campaigns must be built from the Products catalog; they cannot invent conditions outside Product & Service Management.

  > *Carried from v1.0 § 3.4 Marketing & Sales rule 1.*

- Campaigns and marketing initiatives that use customer data must comply with the policies of the Business Enabler domain (data governance) and applicable privacy frameworks.

  > *Carried from v1.0 § 3.4 Marketing & Sales rule 2 (adapted: "Data domain" → "Business Enabler domain (data governance)").*

- Every business initiative must explicitly declare its target segment (Individuals / Micro-enterprises / Enterprises) inside its Customer Management plan; changes to segment definitions require joint validation by Business and Architecture.

  > *Carried from v1.0 § 3.1 Segments.*

- Claims and inquiries are mandatory input for the improvement cycles of Products, Channels, and Operations. Response SLAs are subject to regulatory frameworks and must be monitored continuously.

  > *Carried from v1.0 § 3.13 Operations (Post-sale).*

---

### 3.7 Channels

**Purpose**: The *"How"* we connect with the customer. Aggregates every point of contact and every interaction across the customer journey, regardless of digitalization level.

**Capabilities** (2):

- Channel Management
- Interaction Management

**Channel taxonomy** (informational — not separate capabilities):

| Group | Components |
|---|---|
| **Human Touch** | Branch, Contact Center with advisor |
| **Digital Second** | ATMs, agent-banking POS terminals, digital wallets, Contact Center with Voice Bot |
| **Digital First** | Mobile banking, Web banking, Informational portal, Contact Center with AI |

**Governance rules**:

- Channels do not implement Product, Finance & Risks, or Operations rules; they consume them as services.

  > *Carried from v1.0 § 3.12 Channels rule 1 (adapted: "Risks, Transactions" → "Finance & Risks, Operations").*

- The experience must be consistent across channels (omnichannel): the same operation must behave equivalently regardless of the point of contact.

  > *Carried from v1.0 § 3.12 Channels rule 2.*

- Every new channel or major channel evolution must be evaluated under "Digital First" principles before opting for a "Human Touch" solution.

  > *Carried from v1.0 § 3.12 Channels rule 3.*

- All channel interactions must be captured through Interaction Management with correlatable identifiers to allow Customers and Operations domains to reconstruct the end-to-end journey.

  > *Carried from v1.0 § 3.5 Transactions rule 2 (traceability) — generalized to all interactions.*

---

### 3.8 Business Enabler

**Purpose**: The *"With what"* of the institution. Aggregates the technology, data, security, and process-and-task plumbing that every other domain depends on. IT, security, and data governance live here as cross-cutting enablers, not as separate top-level domains.

**Capabilities** (7):

- Asset Management
- Business Process Management
- Content Management
- IT Management
- Message Management
- Task Management
- Security Management

**IT sub-structure** (informational — under IT Management):

| Sub-domain | Responsibilities |
|---|---|
| **Engineering** | API and Integration Management; Software / DevOps / QA |
| **Infrastructure** | Cloud and Servers; Networks and Communications |
| **IT Finance** | Cloud Management (FinOps); CAPEX / OPEX |
| **CyberSecurity** | Operation and Monitoring; Detection and Prevention (executed through Security Management) |

**Governance rules**:

- Every solution must align with Architecture standards (approved patterns, authorized stack, integration principles) governed by IT Management.

  > *Carried from v1.0 § 3.10 IT rule 1.*

- Inter-domain and inter-organization integrations are performed through governed APIs (Message Management); point-to-point integrations outside the authorized gateways are not allowed.

  > *Carried from v1.0 § 3.10 IT rule 2 (adapted: "governed APIs" → "Message Management").*

- Security is a cross-cutting property: encryption in transit and at rest, identity management, secrets management, and observability are non-negotiable requirements — owned by Security Management.

  > *Carried from v1.0 § 3.10 IT rule 3.*

- FinOps governs cloud consumption (under IT Management); every new workload declares its cost model before being deployed.

  > *Carried from v1.0 § 3.10 IT rule 4.*

- There is a single authoritative source per business entity (customer, product, transaction, employee). Data products follow the "data as a product" pattern: explicit owner, contract, quality, and SLA — governed via Content Management and Asset Management collaborating with the owning business domain.

  > *Carried from v1.0 § 3.11 Data rules 1–2.*

- AI / Intelligent Systems solutions must declare their data origin, their governance model, and their bias and explainability controls before deployment.

  > *Carried from v1.0 § 3.11 Data rule 3.*

- Business Process Management and Task Management coordinate the orchestration layer across domains; long-running workflows that cross multiple domains MUST be modelled here (not duplicated in channels or products).

  > *New in v2.0 — capabilities have no v1.0 standalone analogue.*

---

## 4. Cross-cutting Governance Principles

The following principles apply to **all** domains and are the direct responsibility of Architecture Governance:

1. **Separation of responsibilities**: each domain owns its rules; no other domain may replicate them locally.
2. **Integration by contract**: interactions between domains are performed through governed APIs and events, not by direct access to others' databases.
3. **Single authoritative source**: for every critical business entity (customer, product, transaction, employee, accounting record) there is a single owner and a single authoritative repository.
4. **Security by design**: every flow is secure by default. Encryption in transit (TLS / mTLS), encryption at rest, strong identities, and least privilege.
5. **End-to-end observability**: every operation must be traceable across the domains it crosses, with correlatable identifiers.
6. **Compliance as a hard constraint**: financial regulation is not negotiable; solutions are designed to comply with it, not to circumvent it.
7. **Cost-aware (FinOps)**: technical decisions consider their economic impact across the lifecycle.
8. **Governed evolution**: structural changes (new domains, mergers, deprecations) are a decision of Architecture Governance, not of a specific project.

---

## 5. Using the Model

This model must be consulted at least at the following moments:

- **Start of every initiative**: to identify impacted domains and owner counterparts.
- **Solution design**: to validate that responsibilities are assigned to the correct domain.
- **Architecture review**: as the mandatory reference for Architecture Review Boards.
- **Vendor proposal evaluation**: to map their offering against the 8 domains and detect overlaps or gaps.
- **Capability planning**: to prioritize investments by domain and by time horizon, against the 47-capability map.

---

## 6. Maintenance

| Aspect | Responsible |
|---|---|
| Model custodianship | Architecture Governance |
| Approval of structural changes | Enterprise Architecture Committee |
| Periodic review | Annual, or upon disruptive events (mergers, new regulations, new BIAN revisions) |
| Dissemination | Mandatory for every new employee in IT, Business, and Operations |
| Reference framework | BIAN v14 capability model — 47 capabilities organised into 8 domains (institution-neutral) |
