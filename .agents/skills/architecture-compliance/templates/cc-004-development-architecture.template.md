# Compliance Contract: Development Architecture

**Project**: [PROJECT_NAME]
**Generation Date**: [GENERATION_DATE]
**Architecture Version**: [ARCHITECTURE_VERSION]
**Source**: ARCHITECTURE.md (Sections 3, 5, 8, 11, 12)
**Version**: 2.0

---

<!-- @include-with-config shared/sections/document-control.md config=development-architecture -->

<!-- @include-with-config shared/sections/dynamic-field-instructions.md config=development-architecture -->

---

## Compliance Summary

| Code | Requirement | Category | Status | Source Section | Responsible Role |
|------|-------------|----------|--------|----------------|------------------|
| LADES1 | Best Practices Adoption (Technology Stack Alignment) | Development Architecture | [STATUS] | Section 8 | Solution Architect |
| LADES2 | Architecture Debt Impact (Exception Handling) | Development Architecture | [STATUS] | Section 8, 12 | Technical Lead |

<!-- @include shared/fragments/compliance-summary-footer.md -->

**EOL Validation**: [VALIDATION_SUMMARY] (**MANDATORY** — Contract cannot be approved with EOL or near-EOL technologies that lack an LADES2 exception)

<!-- @include shared/fragments/compliance-score-calculation.md -->

---

## 1. Best Practices Adoption - Technology Stack Alignment (LADES1)

**Requirement**: The solution must be aligned with the defined technology stack (frameworks, versions, tools, libraries). All technology choices must comply with organizational standards and authorized catalogs.

**Status**: [Compliant/Non-Compliant/Not Applicable/Unknown]
**Responsible Role**: [Solution Architect / Technical Lead or N/A]

**External Validation Required**: ⚠️ **MANDATORY** — EOL check (via WebSearch against endoflife.date) must complete before contract approval

### 1.1 Backend Technology Stack Alignment

**Backend Language and Framework**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Backend stack documented and matches authorized catalog (Java 11/17 + Spring Boot OR .NET Core 3.1/.NET 6/7 + ASP.NET Core). Versions are current and supported. If Non-Compliant: Backend technology not in authorized stack or versions deprecated. If Not Applicable: No backend component. If Unknown: Backend mentioned but versions unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Languages, Frameworks), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document framework version, language version, and justify if deviation exists. Verify EOL status via the validator's WebSearch lookup before marking Compliant.]

**Backend Tools and Libraries**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Build tools, testing frameworks, and libraries documented and authorized (Maven/Gradle for Java, NuGet for .NET, SonarQube, JUnit/xUnit/NUnit, OpenAPI/Swagger). If Non-Compliant: Tools not specified or unapproved libraries used. If Unknown: Tools mentioned but approval status unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Frameworks & Libraries), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document all third-party libraries with version numbers. Examples of common build/test/quality tooling: Maven/Gradle (Java), NuGet (.NET), SonarQube, JUnit/xUnit/NUnit, OpenAPI/Swagger.]

### 1.2 Frontend Technology Stack Alignment (if applicable)

**Frontend Framework**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Frontend framework documented and authorized (Angular v12+, React v17+, Vue.js v3+). Version is current and supported. If Non-Compliant: Framework not in authorized list or deprecated version. If Not Applicable: No frontend component. If Unknown: Framework mentioned but version unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Frontend) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document framework version and architecture pattern (SPA/Micro-Frontends). Verify EOL status via the validator's WebSearch lookup before marking Compliant.]

**Frontend Language and Tools**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: TypeScript or JavaScript ES6+ documented with approved tooling (NPM/Yarn, Webpack, Jest, Cypress). If Non-Compliant: Language version or tools not authorized. If Not Applicable: No frontend. If Unknown: Tools mentioned but versions unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Frontend Tools) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document language version (TypeScript version or JavaScript ES6+), build tools, testing frameworks. Common tooling examples: NPM/Yarn, Webpack, Jest, Cypress.]

### 1.3 Infrastructure and Deployment Alignment

**Container Platform**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Container deployment documented and authorized (Docker + Kubernetes: AKS/EKS/GKE/OpenShift). Versions are current and supported. If Non-Compliant: Container platform not authorized or missing. If Not Applicable: Non-containerized deployment. If Unknown: Containers mentioned but platform unclear]
- Source: [ARCHITECTURE.md Section 4 (Meta Architecture → Deployment Architecture) or Section 8 (Infrastructure), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document container runtime (Docker version), orchestration platform (Kubernetes variant: AKS/EKS/GKE/OpenShift), and Helm/chart management strategy.]

**Database Platform and Version**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Database platform documented and in authorized catalog (PostgreSQL, SQL Server, Oracle, MongoDB with approved versions). Version is current and not EOL. If Non-Compliant: Database not authorized or version EOL. If Not Applicable: Stateless application. If Unknown: Database mentioned but version unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Databases), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document platform, version, and EOL status. Verify EOL via the validator's WebSearch lookup before marking Compliant.]

### 1.4 API and Integration Standards

**API Standards**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: APIs documented and comply with standards (OpenAPI 3.0, REST, gRPC). API specifications are versioned and documented. If Non-Compliant: API design does not follow standards. If Not Applicable: No APIs. If Unknown: APIs mentioned but standard unclear]
- Source: [ARCHITECTURE.md Section 7 (Integration Points) or Section 8 (Technology Stack), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document API specification format (OpenAPI/Swagger), protocol (REST/gRPC), and version. Ensure OpenAPI 3.0 compliance for REST APIs.]

### 1.5 CI/CD and Automation Tools

**CI/CD Platform**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: CI/CD tooling documented and authorized (Azure DevOps, Jenkins, GitHub Actions). Pipeline configuration follows best practices. If Non-Compliant: CI/CD platform not approved or missing. If Unknown: CI/CD mentioned but platform unclear]
- Source: [ARCHITECTURE.md Section 11 (Operational Considerations → CI/CD) or Section 8 (Technology Stack → CI/CD), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document CI/CD platform, pipeline configuration, and deployment automation. Common platforms: Azure DevOps, Jenkins, GitHub Actions.]

**Infrastructure as Code (IaC)**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: IaC tooling documented and authorized (Terraform, Ansible, Azure DevOps Pipelines). Infrastructure is version-controlled. If Non-Compliant: IaC tools not approved or infrastructure manually configured. If Not Applicable: No IaC usage. If Unknown: IaC mentioned but tools unclear]
- Source: [ARCHITECTURE.md Section 11 (Operational Considerations → Deployment) or Section 8 (Technology Stack → Infrastructure), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document IaC tool, version, and infrastructure-as-code repository. Common tools: Terraform, Ansible, Azure DevOps Pipelines.]

## External Validation Summary

| Field | Value |
|-------|-------|
| Status | [VALIDATION_STATUS_BADGE] |
| Validator | [VALIDATOR_AGENT] |
| Date | [VALIDATION_DATE] |
| Items Evaluated | [TOTAL_ITEMS] |
| Result | [PASS_COUNT] PASS, [FAIL_COUNT] FAIL, [NA_COUNT] N/A, [UNKNOWN_COUNT] UNKNOWN |

**Deviations**: [DEVIATIONS_LIST or "None detected"]

**Recommendations**: [RECOMMENDATIONS_LIST or "None"]


**Naming Convention Compliance**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Repositories and resources follow organizational naming standards. Naming conventions are documented. If Non-Compliant: Naming standards not followed or not documented. If Unknown: Naming mentioned but compliance unclear]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack) or Section 11 (Operational Considerations) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document naming conventions for repositories, containers, resources. Verify against organizational standards.]

**Approved Libraries Verification**: [Value or "Not specified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: All libraries used are approved by chapter. Library inventory is documented and verified. If Non-Compliant: Unapproved libraries in use. If Unknown: Library approval status not verified]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack → Frameworks & Libraries) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Create inventory of all third-party libraries with version numbers. Document any unapproved libraries and create exception (LADES2).]

**Source References**: [Consolidated list of all ARCHITECTURE.md sections used for LADES1, e.g., "Section 4, lines X-Y; Section 7, lines A-B; Section 8, lines M-N; Section 11, lines P-Q"]

---

## 2. Architecture Debt Impact - Exception Handling and Action Plans (LADES2)

**Requirement**: In case of deviations from the defined technology stack, document the exception and action plan for remediation. Exceptions must be formally approved and tracked with clear timelines.

**Status**: [Compliant/Non-Compliant/Not Applicable/Unknown]
**Responsible Role**: [Technical Lead / Architecture Review Board or N/A]

### 2.1 Stack Deviation Identification

**Technology Stack Deviations**: [Value or "None identified"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: No deviations from authorized stack OR all deviations documented with exceptions. Stack compliance verified via checklist. If Non-Compliant: Deviations exist without documented exceptions. If Not Applicable: Full stack compliance (no deviations). If Unknown: Stack compliance not assessed]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack), Section 12 (ADRs) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Compare technology stack against organizational standards. Identify all deviations (unapproved libraries, deprecated versions, non-standard tools). Document in Section 8 or create ADR in Section 12.]

**Deprecated Technology Usage**: [Value or "None"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: No deprecated/EOL technology in use OR documented migration plan exists for all deprecated components. If Non-Compliant: Deprecated technology used without migration plan. If Not Applicable: All technologies current. If Unknown: EOL status not verified]
- Source: [ARCHITECTURE.md Section 8 (Technology Stack) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Check each technology component against vendor EOL dates (Java, .NET, frameworks, libraries). Document deprecated items and create migration plan with timeline in Section 12 (ADRs). Include risk assessment for continued use of deprecated technologies]

### 2.2 Exception Documentation

**Exception Approval**: [Value or "Not required"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: All exceptions formally documented via ADR with approval from chapter/architecture review board. Approval date and approver documented. If Non-Compliant: Exceptions exist but not formally approved. If Not Applicable: No exceptions required. If Unknown: Approval status unclear]
- Source: [ARCHITECTURE.md Section 12 (Architecture Decision Records), lines X-Y or "Not documented"]
- Note: [If Non-Compliant or Unknown: Create ADR for each exception documenting: deviation details, business justification, technical rationale, alternatives considered, approval date, approver name. Register exception in this Adherence Contract.]

**Exception Justification**: [Value or "Not required"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Business and technical justification documented for each exception in ADR. Risk assessment and mitigation strategy included. If Non-Compliant: Exceptions lack clear justification or risk assessment. If Not Applicable: No exceptions. If Unknown: Justification partial or unclear]
- Source: [ARCHITECTURE.md Section 12 (ADRs → Context, Decision, Consequences) or "Not documented"]
- Note: [If Non-Compliant or Unknown: For each exception, document in ADR: business driver (why deviation is necessary), technical constraints (why standard cannot be used), risk assessment (security, maintainability, vendor support), mitigation strategy (compensating controls, monitoring)]

### 2.3 Remediation Action Plans

**Action Plan Definition**: [Value or "Not required"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Remediation action plan documented with timeline, steps, and success criteria. Each exception has clear path to compliance. If Non-Compliant: Exception exists without action plan or plan incomplete. If Not Applicable: No exceptions requiring remediation. If Unknown: Action plan mentioned but details unclear]
- Source: [ARCHITECTURE.md Section 12 (ADRs → Consequences, Future Work) or "Not documented"]
- Note: [If Non-Compliant or Unknown: For each exception, define action plan: remediation steps (migrate to authorized stack), timeline (target quarter/year), resource requirements, success criteria (e.g., library upgraded to approved version), risk mitigation during transition (e.g., dual-run, feature flags).]

**Action Plan Timeline**: [Value or "Not required"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Timeline documented with milestones and target completion date. Timeline is realistic and includes dependencies. If Non-Compliant: Timeline missing or unrealistic. If Not Applicable: No remediation required. If Unknown: Timeline vague or missing milestones]
- Source: [ARCHITECTURE.md Section 12 (ADRs) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Document specific timeline with phases: Phase 1 (assessment and impact analysis, Q1 2026), Phase 2 (migration and testing, Q2-Q3 2026), Phase 3 (production deployment and validation, Q4 2026). Include milestones, dependencies, and rollback plan]

### 2.4 Technical Debt Tracking

**Debt Register**: [Value or "Not maintained"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Technical debt tracked in formal register (backlog, ADR log, debt management tool). Each debt item is inventoried and tracked. If Non-Compliant: Technical debt not tracked or ad-hoc tracking without formal register. If Not Applicable: No technical debt. If Unknown: Tracking mechanism unclear]
- Source: [ARCHITECTURE.md Section 12 (ADRs) or external debt tracking system reference or "Not documented"]
- Note: [If Non-Compliant or Unknown: Implement technical debt register using: ADR log in Section 12, product backlog, or dedicated debt management tool (e.g., Jira, Azure DevOps). Track each debt item: stack deviation, deprecated technology, architecture shortcut, unapproved library. Include: priority, owner, remediation plan reference, creation date]

**Debt Prioritization**: [Value or "Not defined"]
- Status: [Compliant/Non-Compliant/Not Applicable/Unknown]
- Explanation: [If Compliant: Debt prioritization criteria documented (business impact, security risk, EOL urgency, maintainability). Debt items are prioritized and ordered by risk. If Non-Compliant: Debt not prioritized or criteria unclear. If Not Applicable: No debt to prioritize. If Unknown: Prioritization mentioned but criteria unclear]
- Source: [ARCHITECTURE.md Section 12 (ADRs) or "Not documented"]
- Note: [If Non-Compliant or Unknown: Define prioritization criteria: Critical (security vulnerability, EOL <6 months, regulatory non-compliance), High (major deviation from stack, EOL <12 months, significant business impact), Medium (minor deviation, EOL <24 months, moderate maintainability risk), Low (cosmetic, no EOL risk, minimal impact). Document priority for each debt item]

**Source References**: [Consolidated list of all ARCHITECTURE.md sections used for LADES2, e.g., "Section 8, lines X-Y; Section 12, lines A-B"]

---

## Appendix: Source Traceability and Completion Status

### A.1 Definitions and Terminology

**Development Architecture Terms**:
- **EOL Validation**: External lookup (via WebSearch against `endoflife.date` and vendor support pages) of every documented technology+version pair. Replaces the prior "Stack Validation Checklist" (removed in v3.22.0; pending re-introduction via a live mechanism such as MCP or organizational catalog API).
- **Tech Debt (Technical Debt)**: Code or architecture decisions that trade long-term maintainability for short-term delivery
- **CI/CD (Continuous Integration/Continuous Deployment)**: Automated pipelines for building, testing, and deploying code
- **Approved Library Catalog**: Organizational list of approved frameworks, libraries, and tools
- **EOL (End of Life)**: Technology version no longer supported by vendor
- **ADR (Architecture Decision Record)**: Document capturing architectural choices and their rationale
- **Stack Alignment**: Ensuring technology choices follow organizational standards
- **Exception Handling**: Documented approval process for deviating from standard technology choices

<!-- @include shared/fragments/status-codes.md -->

**Development Abbreviations**:
- **LADES**: Development Architecture compliance requirement code
- **DX**: Developer Experience
- **SCA**: Static Code Analysis
- **SAST**: Static Application Security Testing

---

<!-- @include-with-config shared/sections/validation-methodology.md config=development-architecture -->

---

### A.3 Document Completion Guide

<!-- @include shared/sections/completion-guide-intro.md -->

**Additional Development-Specific Steps**:
- **EOL Verification**: The development-validator runs WebSearch lookups against `endoflife.date` for every technology+version pair found in `docs/06-technology-stack.md`. Review the EOL Validation summary (in Compliance Summary above) and resolve any FAIL items before approval.

---

#### A.3.1 Common Gaps Quick Reference

**Common Development Architecture Gaps and Remediation**:

| Gap Description | Impact | ARCHITECTURE.md Section to Update | Recommended Action |
|-----------------|--------|----------------------------------|-------------------|
| Technology stack incomplete | LADES1 Non-Compliant | Section 8 (Technology Stack) | Document all languages, frameworks, databases, tools with versions |
| Deprecated technology versions | LADES2 Non-Compliant | Section 8 or 12 (Technology/ADRs) | Upgrade to approved versions or register exception via LADES2 |
| CI/CD pipeline undefined | LADES3 Unknown | Section 11 (Operational Considerations) | Document build, test, deployment automation, rollback procedures |
| Code quality standards missing | LADES4 Unknown | Section 8 or 11 (Technology/Operational) | Specify linting, static analysis, code coverage requirements |
| Dependency management undefined | LADES5 Unknown | Section 8 (Technology Stack) | Document dependency lock files, vulnerability scanning, update policy |
| Testing strategy incomplete | LADES6 Unknown | Section 11 (Operational Considerations) | Define unit, integration, e2e testing with coverage thresholds |
| Tech debt not documented | LADES2 Unknown | Section 12 (ADRs) | Create ADRs for approved exceptions with justification and mitigation plan |

---


#### A.3.2 Achieving Auto-Approve Status (8.0+ Score)

**Target Score Breakdown**:
- Completeness ({{completeness_percent}} weight): Fill all required development architecture fields
- Compliance ({{compliance_percent}} weight): Convert UNKNOWN/FAIL to PASS (requires EOL clearance and exception coverage for any documented deviations)
- Quality ({{quality_percent}} weight): Add source traceability for all technology decisions

**To Achieve AUTO_APPROVE Status (8.0+ score):**

1. **Complete Technology Stack Documentation** (estimated impact: +0.6 points)
   - Document complete technology stack in Section 8: languages, frameworks, databases, tools with versions
   - Ensure every technology has an explicit version (the EOL validator skips entries without versions)
   - Resolve any EOL Validation FAIL items via upgrade or LADES2 exception
   - Document dependency management: lock files, vulnerability scanning, update policy (Section 8)
   - Add approved library/framework justifications in Section 8 or Section 12 (ADRs)

2. **Establish Development Workflow and Quality** (estimated impact: +0.3 points)
   - Document CI/CD pipeline: build, test, deploy, rollback procedures (Section 11)
   - Define code quality standards: linting, static analysis, SonarQube gates (Section 11)
   - Add testing strategy: unit, integration, e2e with coverage thresholds (Section 11)
   - Specify PR requirements: approvals, checks, code review guidelines (Section 11)
   - Document branching strategy: GitFlow, trunk-based, or feature branches (Section 11)

3. **Address Tech Debt and Exceptions** (estimated impact: +0.2 points)
   - Create ADRs for deprecated technologies with migration plans (Section 12)
   - Document approved exceptions via LADES2 process with risk mitigation (Section 12)
   - Add technical debt register with prioritization and remediation timeline (Section 12)
   - Specify upgrade path for deprecated versions with timeline (Section 12)
   - Ensure all FAIL items have exceptions or upgrade plans

**Priority Order**: LADES1 (tech stack) → EOL Validation clearance → LADES2 (exceptions for any FAIL items) → CI/CD, code quality, testing, dependency management documentation

**CRITICAL**: Contract cannot achieve "Approved" status without EOL Validation showing PASS (no EOL or near-EOL technologies, OR all flagged technologies have an approved exception via LADES2).

**Estimated Final Score After Remediation**: 8.2-8.7/10 (AUTO_APPROVE)

---

### A.4 Change History

**Version 2.1 (Current — v3.22.0)**:
- Removed the 26-item Stack Validation Checklist mandate (outdated approved-tech lists; pending replacement by a live mechanism such as MCP or organizational catalog API)
- EOL Validation (WebSearch against `endoflife.date`) is now the sole external check and the blocking gate for contract approval

**Version 2.0**:
- Complete template restructuring to Version 2.0 format
- Added comprehensive Appendix with A.1-A.4 subsections
- Added Data Extracted Successfully section
- Added Missing Data Requiring Attention table
- Added Not Applicable Items section
- Added Unknown Status Items Requiring Investigation table
- Expanded Generation Metadata
- Aligned with Cloud Architecture template structure
- Total: 14 validation data points across 2 LADES requirements
- Integrated Stack Validation Checklist as mandatory requirement

**Version 1.0 (Previous)**:
- Basic source traceability section
- Generation metadata focus
- Limited structure

---

<!-- CRITICAL: The sections below use @include directives that expand to H2 headers.
     DO NOT add section numbers (A.5, A.6, etc.) to these headers.
     The resolved content will be ## Header format - preserve it exactly.
     Validation rule 'forbidden_section_numbering' will BLOCK numbered sections after A.4. -->

<!-- @include-with-config shared/sections/data-extracted-template.md config=development-architecture -->

---

<!-- @include-with-config shared/sections/questions-gaps-register-template.md config=development-architecture -->

---

<!-- @include-with-config shared/sections/generation-metadata.md config=development-architecture -->

---

**Note**: This document is auto-generated from ARCHITECTURE.md. Status labels (Compliant/Non-Compliant/Not Applicable/Unknown) and responsible roles must be populated during generation based on available data. Items marked as Non-Compliant or Unknown require stakeholder action to complete the architecture documentation.

**CRITICAL**: Contract approval requires EOL Validation to show PASS status. Resolve any EOL or near-EOL technology findings (upgrade, or document exception via LADES2) before seeking approval.