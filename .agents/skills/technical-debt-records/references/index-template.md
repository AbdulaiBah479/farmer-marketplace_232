# Technical Debt Records

This directory contains the project's Technical Debt Records (TDRs), following the lean format described at https://www.workingsoftware.dev/technical-debt-records/.

A TDR makes a known technical compromise explicit, tracked, and reviewable. TDRs are the sibling of ADRs: ADRs capture *why a decision was made*; TDRs capture *what was deferred or accepted as suboptimal, and what it will cost later*.

## When to add a TDR

Add a TDR for intentional architectural compromises — shortcuts taken under pressure, missing controls, workarounds for upstream constraints, deprecated paths still live, scaling/security ceilings already hit.

Do **not** add a TDR for routine bugs, feature requests, or ordinary backlog items.

## Format

Each TDR follows the five-field structure: Status, Description, Impact, Possible Solutions, Owner. See the template under the originating skill or copy from an existing record.

## ID scheme

Global, zero-padded: `TDR-001`, `TDR-002`, ... IDs are never reused.

## Index

| ID      | Title                                       | Status | Owner    |
|---------|---------------------------------------------|--------|----------|
| TDR-001 | <example — replace or remove>               | Open   | <team>   |

## Cross-reference

A summary of these TDRs should also appear in **arc42 Section 11 — Risks and Technical Debt** of the architecture document, with a pointer back to this directory for full records.
