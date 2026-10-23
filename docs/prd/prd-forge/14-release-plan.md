---
id: prd-forge-release-plan
kind: release-plan
schema: prd-forge/release-plan@1
title: Release plan
status: draft
updated: 2026-10-23
domain: product management tooling
section: 13
order: 140
roadmap_link: none yet
releases:
  - id: REL-001
    name: Single-expert PRD authoring
    outcomes:
      - >-
        A domain expert with no product training can take one product idea to an
        approved PRD without leaving the session they started in.
      - >-
        The expert can see, before anyone estimates, which parts of their own
        specification a development team could not build from.
      - >-
        A sponsor can see what they are approving, what is still open and who owns
        each open thing, on one page.
    journey_stages:
      - ST-001
      - ST-002
      - ST-003
      - ST-004
      - ST-005
      - ST-006
    requirements:
      - FR-001
      - FR-002
      - FR-003
      - FR-004
      - FR-005
      - FR-006
      - FR-007
      - FR-008
      - FR-009
      - FR-010
      - FR-011
      - FR-012
      - FR-013
      - FR-014
    objectives:
      - O-001
      - O-002
      - O-003
    target_date: 2027-03-31
  - id: REL-002
    name: Backlog derivation
    outcomes:
      - >-
        A delivery lead can walk into a story-mapping workshop with features and a
        release line already derived from the approved PRD.
      - >-
        Every story names the requirement id it came from, so nobody has to ask why
        it exists.
    journey_stages:
      - ST-007
      - ST-008
    objectives:
      - O-001
    target_date: 2027-06-30
  - id: REL-003
    name: More than one author
    outcomes:
      - >-
        Two experts can work on different sections of the same specification
        without overwriting each other.
      - >-
        A reviewer can comment on a section without being able to change it.
    objectives:
      - O-002
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-open-questions, kind: open-questions, path: ./13-open-questions.md, title: Open questions }
  next: { id: prd-forge-glossary, kind: glossary, path: ./15-glossary.md, title: Glossary }
---

# Release plan

| ID | Release | Stages | Target |
| --- | --- | --- | --- |
| REL-001 | Single-expert PRD authoring | ST-001..ST-006 | 2027-03-31 |
| REL-002 | Backlog derivation | ST-007, ST-008 | 2027-06-30 |
| REL-003 | More than one author | — | none |

## Why this order

REL-001 is exactly the release line in section 6. It is the smallest release in
which anyone gets anything: an expert reaching an approved, reviewed PRD.

REL-002 is deferred rather than cut because the PRD REL-001 produces already has
to carry everything a backlog needs — FR-012 checks precisely that. Deferring the
derivation costs nothing; deferring what it needs would have cost a rewrite.

REL-003 waits for evidence that one author's path works at all. Building for two
authors before one is proven would be building on A-001 and A-002 before either is
tested.

## The schedule problem, stated plainly

REL-001 targets 2027-03-31. D-002 and D-003 in section 11 — the ten observed
experts and the three engineering leads — are also dated 2027-03-31 and are only
*requested*. So REL-001 ships at the same moment the assumptions beneath it are
first tested, not after. Either REL-001 moves, or it ships knowingly as an
experiment. That is a decision for the sponsor at TR-001 and it is not made here.

## Not in this section, deliberately

No tasks, no estimates, no sizing, no team assignments, and no technology
milestone. Those come from engineering design and iteration planning.
