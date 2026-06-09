---
name: technical-seo
<<<<<<< HEAD
description: "Technical website optimization: site speed, Core Web Vitals, structured data, crawlability, and indexation."
category: seo
---

# Technical SEO

Technical website optimization: site speed, Core Web Vitals, structured data, crawlability, and indexation.

## When to Use
Use this skill when working on tasks related to technical seo.

## Key Capabilities
- Expert guidance on technical seo workflows and best practices
- Step-by-step assistance for common technical seo tasks
- Recommendations for tools, techniques, and optimization strategies

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation or expert review.
=======
description: Use when diagnosing crawl/index issues, performance regressions, or structured
  data gaps.
---

# Technical SEO Playbooks

## When to Use
- Sites experiencing ranking drops despite strong content.
- Launching major site changes (CMS migrations, redesigns).
- Investigating Core Web Vitals, crawl budget, or indexing issues.

## Framework
1. **Crawl Health** – Screaming Frog/JetOctopus results, search console coverage, log file sampling.
2. **Performance** – Lighthouse field vs lab data, render-blocking assets, code splitting, image optimization.
3. **Indexation & Signals** – robots.txt, canonicals, hreflang, pagination, parameter handling.
4. **Structured Data** – schema coverage, errors, merchant/product feeds.
5. **Security & Compliance** – HTTPS, mixed content, cookie banners, accessibility.

## Playbooks
- **Migrations** – pre/post launch checklist, redirect maps, monitoring dashboards.
- **CWV Improvements** – prioritized backlog (LCP, INP, CLS fixes) with eng dependencies.
- **International SEO** – hreflang matrix, localized sitemaps, translation QA.
- **GTM Agents Audit Checklist** – five-pass review (crawl → index → performance → schema → reporting) @puerto/README.md#183-212.
- **Issue Escalation Flow** – Marketing Director ↔ DevOps ↔ Content to fast-track blocking defects.

## Templates
- Crawl issue tracker (URL, issue, severity, owner, status).
- Core Web Vitals monitoring dashboard.
- Structured data coverage sheet.
- KPI guardrail sheet (sessions, rankings, conversions) with "alert" thresholds matching GTM Agents governance cadence.

## Tips
- Pair log-file analysis with Search Console stats to confirm real-world crawl behavior.
- Automate regression alerts via Lighthouse CI or SpeedCurve.
- Document every infra change with timestamp to correlate with ranking volatility.
- Share Guardrail snapshots weekly using GTM Agents-style status packet (target vs actual vs guardrail) to keep Sales + Execs aligned.
- Trigger rollback when three guardrail breaches occur in 24h or when crawl errors spike >25% vs baseline.

## GTM Agents SEO Escalation Workflow
1. **Detection** – SEO specialist flags issue via crawl report or KPI guardrail breach.
2. **Triage** – assign severity (P0-P2) + owner across Engineering, Content, or RevOps.
3. **Action** – implement fix, document via Serena patch or CMS change log.
4. **Validation** – rerun crawl/perf audits, update structured data validator.
5. **Comms** – send 3-point summary (issue, fix, KPI impact) in status packet.

## KPI Guardrails
- Organic sessions: ±10% vs trailing 4-week baseline (alert beyond 15%).
- Priority keyword avg rank: no more than 2 position drop for Tier-1 terms.
- Conversion contribution: must stay within 5% of forecasted pipeline; otherwise notify Growth + Sales.

---
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
