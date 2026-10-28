---
id: prd-forge-objectives-metrics
kind: objectives-metrics
schema: prd-forge/objectives-metrics@1
title: Business objectives and success metrics
status: draft
updated: 2026-10-27
domain: product management tooling
section: 3
order: 30
score: 83
blocking: 0
graded: 2026-10-27
objectives:
  - id: O-001
    objective: >-
      A PRD handed to a development team can be built from without the
      team re-deriving it first.
    problems: [P-001, P-002, P-003]
    metric: >-
      Share of the pilot PRDs that pass the buildability review, the eleven
      derivability checks, on first submission. The pilot PRDs are the first 5
      PRDs written with release 1 by people other than the product's author,
      between REL-001, on 2027-03-31, and 2027-09-30. A
      PRD passes when the verdict is `buildable`, or `buildable with gaps` with
      every gap closed or owned.
    measurement: >-
      The verdict of the buildability review on each pilot PRD at its first
      submission.
    indicator: lagging
    baseline: >-
      unknown - not measured; see Q-001.
    baseline_question: Q-001
    target: >-
      80% of the pilot PRDs, at least 4 of 5, pass on first submission.
      Provisional until Q-001 is answered, by 2027-02-28.
    by: 2027-09-30
    owner: Richard Hightower
  - id: O-002
    objective: >-
      A domain expert, or a product manager who speaks for one, reaches an
      approved PRD in days.
    problems: [P-004]
    metric: >-
      Median elapsed working days, across the pilot PRDs that have one journey,
      from the first interview question to an approval recorded in section 15.
    measurement: >-
      The date of the first interview question and the date of the approval
      recorded in section 15, for each pilot PRD that has one journey.
    indicator: lagging
    baseline: >-
      unknown - not measured; see Q-002.
    baseline_question: Q-002
    target: >-
      Under 5 working days for a single-journey product. Provisional until Q-002
      is answered, by 2027-02-28.
    by: 2027-09-30
    owner: Richard Hightower
  - id: O-003
    objective: >-
      Requirements are testable as written, so a team can close them without
      asking the author what they meant.
    problems: [P-001, P-004]
    metric: >-
      Share of `must` functional requirements whose acceptance criteria an
      engineer who was not in the interview judges sufficient to write a test
      from.
    measurement: >-
      Three engineering leads who were not in the interview score each `must`
      requirement of each pilot PRD independently, as Q-003 does. A requirement
      counts as testable when at least two of the three say a test can be written
      from its acceptance criteria.
    indicator: leading
    baseline: >-
      unknown - not measured; see Q-003.
    baseline_question: Q-003
    target: >-
      95% of `must` requirements. Provisional until Q-003 is answered, by
      2027-02-28.
    by: 2027-09-30
    owner: Richard Hightower
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-customer-market, kind: customer-market, path: ./02-customer-market.md, title: Target customer and market }
  next: { id: prd-forge-personas, kind: personas, path: ./04-personas.md, title: Users and personas }
---

# Business objectives and success metrics

| ID | Objective | Metric | Baseline | Target |
| --- | --- | --- | --- | --- |
| O-001 | Buildable without re-derivation | Share of the 5 pilot PRDs that pass the buildability review first time | unknown (Q-001) | 80%, at least 4 of 5 |
| O-002 | Days to an approved PRD | Median working days, first interview question to approval, for pilot PRDs with one journey | unknown (Q-002) | under 5 |
| O-003 | Requirements testable as written | Share of `must` requirements an outside engineer can test | unknown (Q-003) | 95% |

## Why there are no baselines

All three baselines are unknown, and each has a matching open question with a
decider and a date. This is deliberate and it is the honest state: this product
has not run against a real engagement yet. Each target is provisional until its
question is answered, by 2027-02-28, and section 15 records the moment each
baseline arrives and each target is either confirmed or changed.

The pilot PRDs are the first 5 PRDs written with release 1 by people other than
the product's author, between REL-001 on 2027-03-31 and 2027-09-30. A PRD passes
the buildability review when the verdict is `buildable`, or `buildable with gaps`
with every gap closed or owned. For O-003, a `must` requirement counts as
testable when at least two of three engineering leads, scoring independently,
say a test can be written from it.

A reader should push on this. An objective with an invented baseline is worse
than one with an admitted gap, because the invented one gets planned against.

## What would move these without this product

Worth asking, and recorded here because the answer is not nothing: a single
experienced product manager embedded with the expert would move all three. The
bet is on availability and cost, not on beating that person. See section 2.
