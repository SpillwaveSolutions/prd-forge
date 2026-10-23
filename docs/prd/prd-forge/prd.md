---
id: prd-forge
kind: prd
schema: prd-forge/prd-root@1
title: prd-forge PRD
status: draft
updated: 2026-10-23
domain: product management tooling
product: prd-forge
slug: prd-forge
version: 0.1.0
owner: Richard Hightower
stakeholders:
  - Domain experts who must specify software for their own field
  - Engineering leads who build from the resulting PRD
  - Delivery leads who run story-mapping workshops
created: 2026-10-23
golden_thread: J-001
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
  measure: >-
    Share of PRDs that pass an engineering buildability review on the first
    submission.
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
    - { id: prd-forge-nonfunctional-requirements, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements, section: 8, order: 90, status: draft }
    - { id: prd-forge-constraints, kind: constraints, path: ./10-constraints.md, title: Constraints, section: 9, order: 100, status: draft }
    - { id: prd-forge-decision-rights, kind: decision-rights, path: ./11-decision-rights.md, title: Decision rights and trust rules, section: 10, order: 110, status: draft }
    - { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: Assumptions, risks and dependencies, section: 11, order: 120, status: draft }
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
| 8 | [Non-functional requirements](./09-nonfunctional-requirements.md) |
| 9 | [Constraints](./10-constraints.md) |
| 10 | [Decision rights and trust rules](./11-decision-rights.md) |
| 11 | [Assumptions, risks and dependencies](./12-assumptions-risks-dependencies.md) |
| 12 | [Open questions](./13-open-questions.md) |
| 13 | [Release plan](./14-release-plan.md) |
| 14 | [Glossary](./15-glossary.md) |
| 15 | [Change log and approvals](./16-change-log.md) |

## A note on this PRD

This is prd-forge's PRD, written with prd-forge's own conventions. Writing it
surfaced one real tension, recorded as C-001: the product is delivered inside an
assistant the expert already uses, and naming that delivery mechanism in a
requirement would fail test 5. The platform is therefore a constraint, and the
requirements in section 7 describe only what a person does and sees.
