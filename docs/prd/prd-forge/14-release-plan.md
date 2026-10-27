---
id: prd-forge-release-plan
kind: release-plan
schema: prd-forge/release-plan@1
title: Release plan
status: draft
updated: 2026-10-27
domain: product management tooling
section: 13
order: 140
score: 83
blocking: 0
graded: 2026-10-27
roadmap_link: none yet
releases:
  - id: REL-001
    name: Single-expert PRD authoring
    outcomes:
      - >-
        An expert with no product training, a domain expert or a product manager
        who speaks for one, can take one product idea to an approved PRD. Only the
        sponsor's decision at ST-006 happens outside the product.
      - >-
        The expert can see, before anyone estimates, which parts of their own
        PRD a development team could not build from.
      - >-
        A sponsor can see what they are approving, what is still open, and who
        decides each open question, in one document.
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
      - FR-015
      - FR-016
      - FR-017
      - FR-018
      - FR-019
      - FR-020
    objectives:
      - O-001
      - O-002
      - O-003
    depends_on:
      - D-002
      - D-003
    exit_criteria:
      - >-
        At least 4 of the 5 pilot PRDs, 80%, pass the buildability review on first
        submission, where a pass is the verdict `buildable`, or `buildable with
        gaps` with every gap closed or owned (O-001). The pilot PRDs are as O-001
        defines them: the first 5 PRDs written with release 1 by people other than
        the product's author, between 2027-03-31 and 2027-09-30.
      - >-
        The median pilot PRD reaches a recorded approval in under 5 working days
        from the first interview question (O-002).
      - >-
        An engineer who was not in the interview judges 95% of the pilot PRDs'
        `must` requirements testable as written (O-003).
    target_date: 2027-03-31
    date_status: indicative
  - id: REL-002
    name: Backlog derivation
    outcomes:
      - >-
        A delivery lead can walk into a story-mapping workshop with features and a
        release line already derived from the approved PRD.
      - >-
        Every story names the requirement id it came from, so nobody has to ask why
        it exists.
      - >-
        An engineering lead can record their own verdict on whether an approved set
        can be built from, with the report of its buildability review kept beside
        it.
    journey_stages:
      - ST-009
      - ST-007
      - ST-008
    objectives:
      - O-001
    exit_criteria:
      - >-
        Every story derived from a pilot PRD names the requirement id it came
        from.
      - >-
        A delivery lead runs a story-mapping workshop from a derived backlog
        without re-deriving any feature from the PRD.
    target_date: 2027-06-30
    date_status: indicative
  - id: REL-003
    name: More than one author
    outcomes:
      - >-
        Two experts can work on different sections of the same set
        without overwriting each other.
      - >-
        A second reader, such as the engineering lead (PER-002), can comment on a
        section without being able to change it.
    objectives:
      - O-002
    depends_on:
      - A-001
      - A-002
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-open-questions, kind: open-questions, path: ./13-open-questions.md, title: Open questions }
  next: { id: prd-forge-glossary, kind: glossary, path: ./15-glossary.md, title: Glossary }
---

# Release plan

![The release line](diagrams/release-line.svg)

| ID | Release | Stages | Target |
| --- | --- | --- | --- |
| REL-001 | Single-expert PRD authoring | ST-001..ST-006 | 2027-03-31 |
| REL-002 | Backlog derivation | ST-009, ST-007, ST-008 | 2027-06-30 |
| REL-003 | More than one author | none | none |

## Why this order

REL-001 is exactly the release line in section 6. It is the smallest release in
which anyone gets anything: an expert reaching an approved, reviewed PRD.

REL-002 is deferred rather than cut because the PRD REL-001 produces already has
to carry everything a backlog needs, and FR-012 checks precisely that. Deferring the
derivation costs nothing; deferring what it needs would have cost a rewrite.

REL-003 waits for evidence that one author's path works at all. Building for two
authors before one is proven would be building on A-001 and A-002 before either is
tested.

## How you know each release worked

REL-001 exits when the pilot PRDs meet the three objective targets in section 3:
at least 4 of the 5 pilot PRDs, 80%, pass the buildability review on first
submission, the median reaches
approval in under 5 working days, and 95% of `must` requirements are testable as
written. REL-002 exits when every derived story names its requirement and a
delivery lead runs a workshop from the backlog without re-deriving it.

Both target dates are indicative, not committed. The schedule problem below is
the reason.

## The schedule problem, stated plainly

REL-001 targets 2027-03-31. D-002 and D-003 in section 11, the ten observed
experts and the three engineering leads, are also dated 2027-03-31 and are only
*requested*. As a result, REL-001 ships at the same moment the assumptions
beneath it are first tested, not after. Either REL-001 moves, or it ships
knowingly as an experiment. Q-019 asks which, and Richard Hightower decides it
by 2027-01-31.

REL-002 carries no requirements yet. Section 7 holds none for ST-007, ST-008, or
ST-009, and they are written when REL-002 is planned.

## Not in this section, deliberately

No tasks, no estimates, no sizing, no team assignments, and no technology
milestone. Those come from engineering design and iteration planning.
