---
id: prd-forge
kind: prd
schema: prd-forge/prd-root@1
title: prd-forge PRD
status: draft
updated: 2026-10-27
domain: product management tooling
product: prd-forge
slug: prd-forge
version: 0.8.1
owner: Richard Hightower
stakeholders:
  - Domain experts who must specify software for their own field
  - Engineering leads who build from the resulting PRD
  - Delivery leads who run story-mapping workshops
created: 2026-10-23
golden_thread: J-001
score: 75
blocking: 0
graded: 2026-10-27
primary_persona: PER-001
approvers: [PER-003]
summary:
  problem: >-
    A domain expert knows exactly what their product must do, but what they can
    write down is a feature list with no named users, no pass-or-fail criteria and
    the technology already chosen, so the team that has to build it cannot.
  users: >-
    Domain experts specifying software for their own field, the engineering leads
    who build from what they write, and the sponsors who approve it.
  why_now: >-
    Teams now expect to work from a written specification an assistant helped
    produce, and a specification that reads well but cannot be built from costs
    more than no specification at all, because it is believed.
  bet: >-
    A domain expert, with no product management training, can reach a PRD that an
    engineering lead confirms is buildable, and can see for themselves where it is
    still weak before anyone starts work.
  objective: O-001
  measure: >-
    Share of PRDs that pass an engineering buildability review on the first
    submission: 80% by 2027-09-30, from a baseline Q-001 will establish.
links:
  parent: null
  children:
    - { id: prd-forge-problem-opportunity, kind: problem-opportunity, path: ./01-problem-opportunity.md, title: Problem and opportunity, section: 1, order: 10, status: draft }
    - { id: prd-forge-customer-market, kind: customer-market, path: ./02-customer-market.md, title: Target customer and market, section: 2, order: 20, status: draft }
    - { id: prd-forge-objectives-metrics, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics, section: 3, order: 30, status: draft }
    - { id: prd-forge-personas, kind: personas, path: ./04-personas.md, title: Users and personas, section: 4, order: 40, status: draft }
    - { id: prd-forge-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys, section: 5, order: 50, status: draft }
    - { id: prd-forge-scenarios, kind: scenarios, path: ./06-scenarios.md, title: Scenarios, section: 5, order: 60, status: draft }
    - { id: prd-forge-scope, kind: scope, path: ./07-scope.md, title: Scope, section: 6, order: 70, status: draft }
    - { id: prd-forge-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements, section: 7, order: 80, status: draft }
    - { id: prd-forge-wireframes, kind: wireframes, path: ./08-wireframes.md, title: Wireframes, section: 7, order: 85, status: draft }
    - { id: prd-forge-nonfunctional-requirements, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements, section: 8, order: 90, status: draft }
    - { id: prd-forge-constraints, kind: constraints, path: ./10-constraints.md, title: Constraints, section: 9, order: 100, status: draft }
    - { id: prd-forge-decision-rights, kind: decision-rights, path: ./11-decision-rights.md, title: Decision rights and trust rules, section: 10, order: 110, status: draft }
    - { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: "Assumptions, risks and dependencies", section: 11, order: 120, status: draft }
    - { id: prd-forge-open-questions, kind: open-questions, path: ./13-open-questions.md, title: Open questions, section: 12, order: 130, status: draft }
    - { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan, section: 13, order: 140, status: draft }
    - { id: prd-forge-glossary, kind: glossary, path: ./15-glossary.md, title: Glossary, section: 14, order: 150, status: draft }
    - { id: prd-forge-change-log, kind: change-log, path: ./16-change-log.md, title: Change log and approvals, section: 15, order: 160, status: draft }
---

# prd-forge PRD

A domain expert knows exactly what their product must do, but what they can write
down is a feature list with no named users, no pass-or-fail criteria and the
technology already chosen, so the team that has to build it cannot. The users are
domain experts specifying software for their own field, the engineering leads who
build from what they write, and the sponsors who approve it. Teams now expect to
work from a written specification an assistant helped produce, and one that reads
well but cannot be built from costs more than no specification at all, because it
is believed. The bet is that a domain expert with no product management training
can reach a PRD an engineering lead confirms is buildable, and can see for
themselves where it is still weak before anyone starts work. We will know it
worked from the share of PRDs that pass an engineering buildability review on the
first submission.

## Contents

| Section | Document |
| --- | --- |
| 1 | [Problem and opportunity](./01-problem-opportunity.md) |
| 2 | [Target customer and market](./02-customer-market.md) |
| 3 | [Business objectives and success metrics](./03-objectives-metrics.md) |
| 4 | [Users and personas](./04-personas.md) |
| 5 | [User journeys](./05-user-journeys.md) |
| 5 | [Scenarios](./06-scenarios.md) |
| 6 | [Scope](./07-scope.md) |
| 7 | [Functional requirements](./08-functional-requirements.md) |
| 7 | [Wireframes](./08-wireframes.md) |
| 8 | [Non-functional requirements](./09-nonfunctional-requirements.md) |
| 9 | [Constraints](./10-constraints.md) |
| 10 | [Decision rights and trust rules](./11-decision-rights.md) |
| 11 | [Assumptions, risks and dependencies](./12-assumptions-risks-dependencies.md) |
| 12 | [Open questions](./13-open-questions.md) |
| 13 | [Release plan](./14-release-plan.md) |
| 14 | [Glossary](./15-glossary.md) |
| 15 | [Change log and approvals](./16-change-log.md) |

## How this document set is numbered

A PRD has **fifteen numbered sections** and this set has **seventeen section
documents**, because section 5 holds two of them, journeys and scenarios, and
section 7 holds two, functional requirements and wireframes. The two section 7
files share the prefix `08`. So from
section 5 onward the file prefix and the section number differ — `07-scope.md` is
section 6, `16-change-log.md` is section 15. **Every cross-reference in this set
is by section number, never by file number.** Three independent reviewers misread
this, so it is stated here rather than left to be inferred.

## A note on this PRD

This is prd-forge's PRD, written with prd-forge's own conventions. Writing it
surfaced one real tension: the product is delivered inside an assistant the
expert already uses, and naming that delivery mechanism in a requirement would
fail test 5. It was recorded as constraint C-001 until 0.8.1. It is now the
separate-application non-goal in section 6 and dependency D-001 in section 11,
and the requirements in section 7 describe only what a person does and sees.

Grading it with its own adversarial reviewers found twelve blocking defects
across four sections, and a buildability review found four failed derivability
checks. Version 0.2.0 fixes them: every graded section is now at zero blocking
defects, and nine of the eleven derivability checks pass. What that grading
found, and what it changed, is in section 15.

**On the scores in this set.** Each graded section carries the score from its last
grading pass, with the date. Sections 5, 7 and 8 were graded before the second
round of corrections, and section 10 before its last two, so each score is the
last one measured and not a reading of the words as they now stand. Treat them as
a floor. A score never rises without a change to the document, and never rises
without a grading pass; the two gaps here are in the other direction.
