---
id: prd-forge-constraints
kind: constraints
schema: prd-forge/constraints@1
title: Constraints
status: draft
updated: 2026-10-23
domain: product management tooling
section: 9
order: 100
score: 35
blocking: 4
graded: 2026-10-26
constraints:
  - id: C-001
    category: firm
    statement: >-
      The product reaches the expert inside an assistant session they are already
      working in. There is no separate application for them to open, install or
      log into.
    authority: >-
      Product decision, Richard Hightower, recorded at version 0.1.0. Not externally
      imposed; recorded here because every requirement in section 7 depends on it
      and naming it in a requirement would fail test 5.
    applies_to:
      - all
    verification: >-
      No requirement in section 7 names the delivery mechanism, checked at each
      grading pass.
  - id: C-002
    category: firm
    statement: >-
      The output is plain text documents the organisation stores wherever it
      already stores documents. The product is not the system of record for a PRD.
    authority: Product decision, Richard Hightower, recorded at version 0.1.0.
    applies_to:
      - all
    verification: >-
      NFR-004's test - read a complete set with nothing but a text editor.
  - id: C-003
    category: policy
    statement: >-
      Content an expert enters about their domain is not sent anywhere beyond the
      assistant session they are already using, and is not retained by this product
      outside the documents themselves.
    authority: >-
      The expert's own organisation's information policy, whichever it is; this
      constraint holds for every customer and is not configurable.
    applies_to:
      - all
    verification: NFR-008's measurement - zero additional destinations.
  - id: C-004
    category: legal
    statement: >-
      No regulation, standard, clause or statistic is stated as fact unless the
      expert supplied it or it has been verified against the source; otherwise it is
      marked unverified or becomes an open question.
    authority: >-
      Professional liability. An expert circulating a PRD that cites a regulation
      incorrectly is exposed personally and professionally, whatever this product's
      terms say.
    applies_to:
      - FR-006
      - FR-009
      - FR-012
    verification: >-
      Every citation in a set checked against its source before any section reaches
      final, and anything unverifiable reported as unverified.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-nonfunctional-requirements, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements }
  next: { id: prd-forge-decision-rights, kind: decision-rights, path: ./11-decision-rights.md, title: Decision rights and trust rules }
---

# Constraints

| ID | Category | Constraint | Authority |
| --- | --- | --- | --- |
| C-001 | firm | Runs inside an assistant session the expert already uses | Product decision, v0.1.0 |
| C-002 | firm | Output is plain documents; not the system of record | Product decision, v0.1.0 |
| C-003 | policy | Domain content goes nowhere beyond that session | The customer's own information policy |
| C-004 | legal | No unverified citation stated as fact | Professional liability |

## C-001 is the honest one

Three of these four are our own decisions, not rules imposed from outside, and
listing a product decision as a constraint is normally wrong. They are here
because C-001 in particular is the tension this PRD ran into: the product is
delivered inside an assistant, naming that in a requirement fails test 5, and
pretending the dependency does not exist would be worse. Recording it as a
constraint keeps section 7 clean and keeps the dependency visible.

A reviewer is entitled to call C-001 and C-002 architecture rather than
constraints. The counter-argument is that both are commitments to the customer
about what they will have to adopt and what they will own afterwards, which is
scope, not design. Decide for yourself; the argument is recorded either way.

## C-004 is the one with teeth

C-004 is the only constraint here imposed from outside, and it is the reason
FR-006 exists. A fluent PRD with an invented clause number is the failure this
product must not have, because the expert signs it, circulates it, and carries the
consequence personally.
