---
id: prd-forge-constraints
kind: constraints
schema: prd-forge/constraints@1
title: Constraints
status: draft
updated: 2026-10-27
domain: product management tooling
section: 9
order: 100
score: 35
blocking: 4
graded: 2026-10-26
constraints:
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
| C-004 | legal | No unverified citation stated as fact | Professional liability |

## C-001 to C-003 have moved

At version 0.8.1, C-001 to C-003 left this section, because each was a decision of
our own or a belief about customers, not a rule imposed from outside. Their ids
are not reused.

- C-001, no separate application for the expert to open, install, or log into,
  is a non-goal in section 6. The session it needs is dependency D-001 in
  section 11.
- C-002, the output is plain documents and the product is not the system of
  record, is a non-goal in section 6.
- C-003, domain content stays in the expert's session and in the documents, is
  assumption A-005 in section 11.

## C-004 is the one with teeth

C-004 is imposed from outside, and it is the reason FR-006 exists. A fluent PRD
with an invented clause number is the failure this product must not have, because
the expert signs it, circulates it, and carries the consequence personally.
