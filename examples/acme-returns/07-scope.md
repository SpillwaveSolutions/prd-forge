---
id: acme-returns-scope
kind: scope
schema: prd-forge/scope@1
title: Scope
status: draft
updated: 2026-10-23
domain: retail returns
section: 6
order: 70
release: R1, counter returns pilot
release_line: >-
  ST-001 through ST-004 for purchases made in an Acme store in the last 12
  months. An associate reaches a completed return, with a reason recorded, without
  calling the contact centre.
in_scope:
  - id: IN-001
    summary: Identify a purchase from a receipt, an order number, or the payment card
    journey_stage: ST-001
    requirements:
      - FR-001
  - id: IN-002
    summary: Show the returns decision, its reason, and the refund method at the counter
    journey_stage: ST-002
    requirements:
      - FR-002
  - id: IN-003
    summary: Request and decide an exception without a phone call
    journey_stage: ST-003
    requirements:
      - FR-003
  - id: IN-004
    summary: Complete the return with the reason recorded for the hub
    journey_stage: ST-004
    requirements:
      - FR-004
out_of_scope:
  - id: OUT-001
    summary: Returns of items bought from Acme wholesale partners rather than in an Acme store
    revisit: Once the partner agreements name a returns service level, expected Q2 2027
  - id: OUT-002
    summary: Returns initiated online and completed in store
    revisit: After the R1 pilot closes
non_goals:
  - We are not replacing the point-of-sale system.
  - We are not becoming the system of record for inventory disposition; the hub keeps that.
  - We are not automating the exception decision. A person decides every exception.
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
  next: { id: acme-returns-frs, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
---

# Scope

## Release line

ST-001 through ST-004, for purchases made in an Acme store in the last 12 months.

## In scope

| ID | Summary | Stage | Requirements |
| --- | --- | --- | --- |
| IN-001 | Identify a purchase | ST-001 | FR-001 |
| IN-002 | Show the decision and its reason | ST-002 | FR-002 |
| IN-003 | Exception without a phone call | ST-003 | FR-003 |
| IN-004 | Complete with a reason recorded | ST-004 | FR-004 |

## Non-goals

We are not replacing the point-of-sale system, we are not becoming the system of
record for inventory disposition, and we are not automating the exception
decision.
