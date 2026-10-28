---
id: acme-returns-objectives
kind: objectives-metrics
schema: prd-forge/objectives-metrics@1
title: Business objectives and success metrics
status: draft
updated: 2026-10-26
domain: retail returns
section: 3
order: 30
objectives:
  - id: O-001
    objective: >-
      A store associate resolves a return at the counter without calling the
      contact centre.
    metric: >-
      Share of store returns completed at the counter with no call to the contact
      centre, counted per calendar month across the pilot stores.
    baseline: >-
      41% of store returns, from the Q3 2026 store returns audit.
    baseline_as_of: 2026-09-30
    baseline_source: Q3 2026 store returns audit
    target: >-
      75% of store returns in the pilot stores.
    by: 2027-06-30
    owner: Head of Customer Operations
guardrails:
  - metric: Share of completed returns later reversed by the hub as not eligible
    threshold: No higher than the Q3 2026 rate of 3%.
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  next: { id: acme-returns-personas, kind: personas, path: ./04-personas.md, title: Users and personas }
---

# Business objectives and success metrics

| ID | Objective | Baseline | Target | By |
| --- | --- | --- | --- | --- |
| O-001 | Resolve a return at the counter, with no call | 41% | 75% | 2027-06-30 |

The guardrail keeps the pilot honest. A counter that accepts every return would
raise O-001 and send ineligible items to the hub, so the hub's reversal rate must
not rise above today's 3%.

<!-- prd-forge:details -->

## Details

Generated from the front matter. Do not edit this block.

### Objectives

#### O-001 A store associate resolves a return at the counter without calling the contact centre.

**Metric:** Share of store returns completed at the counter with no call to the contact centre, counted per calendar month across the pilot stores.

**Baseline:** 41% of store returns, from the Q3 2026 store returns audit.

**Baseline as of:** 2026-09-30

**Baseline source:** Q3 2026 store returns audit

**Target:** 75% of store returns in the pilot stores.

**By:** 2027-06-30

**Owner:** Head of Customer Operations

### Guardrails

#### Share of completed returns later reversed by the hub as not eligible

**Threshold:** No higher than the Q3 2026 rate of 3%.

<!-- /prd-forge:details -->
