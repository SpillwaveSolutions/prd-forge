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
score: 30
blocking: 2
graded: 2026-10-27
constraints: []
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-nonfunctional-requirements, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements }
  next: { id: prd-forge-decision-rights, kind: decision-rights, path: ./11-decision-rights.md, title: Decision rights and trust rules }
---

# Constraints

This section holds no constraints. No rule imposed from outside the team binds
prd-forge itself. Each rule that this section once held was a decision of our
own, a belief about customers, or the product's chosen response to a risk. The
team could change each one by agreeing among themselves, so each one now lives
where that kind of item belongs. The ids C-001 to C-004 are not reused.

An expert who uses prd-forge can still be bound by a professional code, a
contract, or a firm policy. Those constraints belong in that expert's own PRD,
not in this one.

## Where the rules live now

At version 0.8.1, C-001 to C-003 left this section.

- C-001, no separate application for the expert to open, install, or log into,
  is a non-goal in section 6. The session it needs is dependency D-001 in
  section 11.
- C-002, the output is plain documents and the product is not the system of
  record, is a non-goal in section 6.
- C-003, domain content stays in the expert's session and in the documents, is
  assumption A-005 in section 11.

At version 0.9.0, C-004 left this section.

- C-004, no regulation, standard, clause, or statistic is stated as fact unless
  the expert supplied it or it was checked against its source, is decision rule
  TR-005 in section 10 and requirement FR-006 in section 7. TR-005 makes the
  expert the only one who can state such a fact as true, and it is never
  delegated. FR-006 records a fact the expert does not know as an open question
  with a decider and a date.
