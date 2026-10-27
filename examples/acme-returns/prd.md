---
id: acme-returns
kind: prd
schema: prd-forge/prd-root@1
title: Acme Returns PRD
status: draft
updated: 2026-10-23
domain: retail returns
product: Acme Returns
slug: acme-returns
version: 0.1.0
owner: Dana Whitfield, Director of Product
stakeholders:
  - Head of Customer Operations
  - VP Supply Chain
created: 2026-10-23
golden_thread: J-001
score: 78
blocking: 0
graded: 2026-10-23
summary:
  objective: O-001
  problem: >-
    Store associates cannot tell whether an item may be returned without calling
    the contact centre, so queues build and customers leave with the item.
  users: >-
    Store associates, contact-centre agents, and returns-processing staff at the
    regional hub.
  why_now: >-
    Two of the three largest wholesale partners added returns-handling service
    levels to their 2026 agreements.
  bet: >-
    An associate can resolve any return at the counter in one conversation, and
    the customer leaves knowing the outcome and the reason for it.
  measure: >-
    Share of returns resolved at the counter without escalation; 41% today.
links:
  parent: null
  children:
    - { id: acme-returns-objectives, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics, section: 3, order: 30, status: draft }
    - { id: acme-returns-personas, kind: personas, path: ./04-personas.md, title: Users and personas, section: 4, order: 40, status: draft }
    - { id: acme-returns-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys, section: 5, order: 50, status: draft }
    - { id: acme-returns-scope, kind: scope, path: ./07-scope.md, title: Scope, section: 6, order: 70, status: draft }
    - { id: acme-returns-frs, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements, section: 7, order: 80, status: draft }
    - { id: acme-returns-wireframes, kind: wireframes, path: ./08-wireframes.md, title: Wireframes, section: 7, order: 85, status: draft }
---

# Acme Returns PRD

This is a cut-down example set: six of the sixteen section documents, enough to
show the front matter, the link graph and the cross-section id references that
`scripts/prd-validate.mjs` checks. A real set has all sixteen.

Store associates cannot tell whether an item may be returned without calling the
contact centre, so queues build and customers leave with the item. The users are
store associates, contact-centre agents and returns-processing staff at the
regional hub. Two of the three largest wholesale partners added returns-handling
service levels to their 2026 agreements, which is what makes this urgent now. The
bet is that an associate can resolve any return at the counter in one
conversation, and the customer leaves knowing the outcome and the reason for it.
We will know it worked when the share of returns resolved at the counter without
escalation rises from today's 41%.

## Contents

| Section | Document |
| --- | --- |
| 3 | [Business objectives and success metrics](./03-objectives-metrics.md) |
| 4 | [Users and personas](./04-personas.md) |
| 5 | [User journeys](./05-user-journeys.md) |
| 6 | [Scope](./07-scope.md) |
| 7 | [Functional requirements](./08-functional-requirements.md) |
| 7 | [Wireframes](./08-wireframes.md) |
