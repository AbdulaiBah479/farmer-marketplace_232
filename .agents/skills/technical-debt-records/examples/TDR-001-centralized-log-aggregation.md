---
date: 2026-05-13
related-adrs:
  - ADR-204
affected-components:
  - order-service
tags:
  - observability
  - compliance
  - audit
---

# TDR-001: order-service writes audit events only to local disk

## Status

`Open`

## Description

`order-service` writes its audit-event stream (order lifecycle transitions, refund authorizations, manual interventions) to a per-instance file at `/var/log/order-service/audit.log`. No log forwarder is configured on the instance and the file is never shipped off-host. The other services in the platform (`payment-service`, `inventory-service`, `notification-service`) already ship structured logs to the central aggregator via the standard sidecar pattern documented in ADR-204.

This was deferred during the initial cut-over because the order-service container image predates the sidecar standardization and the team prioritized shipping the customer-facing checkout flow.

## Impact

- **Operational risk**: cross-instance incident forensics is impossible — engineers must SSH into each pod to grep local files, and pod terminations destroy the only copy of the audit trail for that instance.
- **Compliance**: SOC-2 CC7.2 requires evidence that security-relevant events are retained and reviewable. The current setup has no central retention and no review surface — likely audit finding at the next assessment (Q3 2026).
- **Scalability ceiling**: at current volumes (~12 instances, ~3 GB/day per instance), local disk fills in ~9 days under the existing 30 GB ephemeral allocation. Already triggered one OOM-style page in April when log rotation lagged.
- **Inconsistency cost**: every new engineer asks "why is order-service different?" — onboarding friction and a standing source of one-off documentation patches.

## Possible Solutions

- **Option A — Adopt the existing sidecar pattern**: add the standard log-shipper sidecar (per ADR-204) to the order-service deployment manifest. Lowest risk; reuses platform-team-supported tooling; estimated 1–2 days plus a bake period in staging.
- **Option B — Switch order-service to a managed log service** (e.g. cloud-native log group): bypass the sidecar and write directly via SDK. Removes the sidecar dependency but introduces a second logging path for the platform to support — and supersedes ADR-204 for this one service.
- **Option C — Accept and isolate**: keep local-only logging but move the ephemeral volume to a persistent volume claim with managed snapshotting, and document the carve-out. Cheapest now, leaves the SOC-2 finding unresolved — only suitable if Option A is blocked for a specific compatibility reason.

## Owner

Platform team (lead: TBD via team triage). Compliance counterpart: Security Engineering.

---

## History

- 2026-05-13: Created. Status: `Open`. Surfaced during the Q2 observability review.
