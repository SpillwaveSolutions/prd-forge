---
id: prd-forge-objectives-metrics
kind: objectives-metrics
schema: prd-forge/objectives-metrics@1
title: Business objectives and success metrics
status: draft
updated: 2026-10-23
domain: product management tooling
section: 3
order: 30
objectives:
  - id: O-001
    objective: >-
      A specification handed to a development team can be built from without the
      team re-deriving it first.
    problems: [P-001, P-002, P-003]
    metric: >-
      Share of PRDs that pass an engineering buildability review on first
      submission, where the review is the eleven derivability checks.
    baseline: >-
      unknown - not measured; see Q-001. Do not set a target against this until
      Q-001 is answered.
    baseline_question: Q-001
    target: >-
      80% of PRDs pass on first submission.
    by: 2027-09-30
    owner: Richard Hightower
  - id: O-002
    objective: >-
      A domain expert reaches an approved specification in days rather than the
      weeks a product manager's discovery cycle takes.
    problems: [P-004]
    metric: >-
      Median elapsed working days from the first interview question to an approval
      recorded in section 15.
    baseline: >-
      unknown - not measured; see Q-002.
    baseline_question: Q-002
    target: >-
      Under 5 working days for a single-journey product.
    by: 2027-09-30
    owner: Richard Hightower
  - id: O-003
    objective: >-
      Requirements are testable as written, so a team can close them without
      asking the author what they meant.
    problems: [P-001]
    metric: >-
      Share of functional requirements whose acceptance criteria an engineer who
      was not in the interview judges sufficient to write a test.
    baseline: >-
      unknown - not measured; see Q-003.
    baseline_question: Q-003
    target: >-
      95% of `must` requirements.
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
| O-001 | Buildable without re-derivation | Pass rate on first buildability review | unknown (Q-001) | 80% |
| O-002 | Days, not weeks, to an approved spec | Median working days, first question to approval | unknown (Q-002) | under 5 |
| O-003 | Requirements testable as written | Share of `must` requirements an outside engineer can test | unknown (Q-003) | 95% |

## Why there are no baselines

All three baselines are unknown, and each has a matching open question with a
decider and a date. That is deliberate and it is the honest state: this product
has not run against a real engagement yet. The targets above are therefore
intentions, not commitments, and section 15 should record the moment each
baseline arrives and each target is either confirmed or changed.

A reviewer should push on this. An objective with an invented baseline is worse
than one with an admitted gap, because the invented one gets planned against.

## What would move these without this product

Worth asking, and recorded here because the answer is not nothing: a single
experienced product manager embedded with the expert would move all three. The
bet is on availability and cost, not on beating that person — see section 2.
