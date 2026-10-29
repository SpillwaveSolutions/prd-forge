---
id: prd-forge
kind: prd
schema: prd-forge/prd-root@1
title: prd-forge PRD
status: draft
updated: 2026-10-29
domain: product management tooling
product: prd-forge
slug: prd-forge
version: 0.11.0
owner: Richard Hightower
stakeholders:
  - Product managers who are, or speak for, the domain expert
  - Engineering leads who build from the resulting PRD
  - Sponsors who approve the PRD for a release. For this PRD the approver is
    Richard Hightower, the owner of the place where it is kept, named under
    FR-021.
  - Delivery leads who run story-mapping workshops
created: 2026-10-23
golden_thread: J-001
score: 83
blocking: 0
graded: 2026-10-28
primary_persona: PER-001
approvers: [PER-003]
summary:
  problem: >-
    A domain expert knows exactly what their product must do, but what they can
    write down is a feature list with no named users, no pass-or-fail criteria and
    the technology already chosen. The team cannot build from it, and the expert
    is asked the same questions again by each engineer who tries.
  users: >-
    Product managers who are, or speak for, the domain expert, the engineering
    leads who build from what they write, the sponsors who approve it, and the
    delivery leads who derive a backlog from it.
  why_now: >-
    In October 2025, 98% of 117 product managers surveyed said they use AI at
    work, and only 39% had received job-specific AI training (General Assembly, 6 Nov 2025). A PRD that
    reads well but cannot be built from costs more than no PRD at all, because it
    is believed.
  bet: >-
    A domain expert, or a product manager who speaks for one, with no product
    management training, reaches an approved PRD in which every section is graded
    with no blocking defect and every buildability gap is closed or owned before
    anyone estimates.
  objective: O-001
  measure: >-
    Share of the 5 pilot PRDs that pass the buildability review on first
    submission, where a pass is the verdict `buildable`, or `buildable with gaps`
    with every gap closed or owned. The pilot PRDs are written between REL-001,
    on 2027-03-31, and 2027-09-30. Target: 80%, at least 4 of 5, by 2027-09-30,
    provisional until Q-001 sets the baseline, by 2027-02-28.
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
technology already chosen. The team cannot build from it, and the expert is asked
the same questions again by each engineer who tries. The users are product
managers who are, or speak for, the domain expert, the engineering leads who
build from what they write, the sponsors who approve it, and the delivery leads
who derive a backlog from it. In October 2025, 98%
of 117 product managers surveyed said they use AI at work, and only 39% had
received job-specific AI training (General Assembly, 6 Nov 2025). A PRD that reads well but cannot be
built from costs more than no PRD at all, because it is believed.

The bet is one outcome: the expert, with no product management training, reaches
an approved PRD in which every section is graded with no blocking defect and
every buildability gap is closed or owned before anyone estimates. We will know it
worked when at least 4 of the 5 pilot PRDs, 80%, pass the buildability review on
first submission by 2027-09-30. The pilot PRDs are the first 5 written with
release 1, between REL-001 on 2027-03-31 and 2027-09-30, by people other than the
product's author. The target is provisional until Q-001 sets the baseline, by
2027-02-28.

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
files share the prefix `08`. From section 5 onward, the file prefix and the
section number differ: `07-scope.md` is section 6, and `16-change-log.md` is
section 15. **Every cross-reference in this set
is by section number, never by file number.** Three independent reviewers misread
this, so it is stated here rather than left to be inferred.

## A note on this PRD

This is prd-forge's PRD, written with prd-forge's own conventions. The
requirements in section 7 describe only what a person does and sees, and section
15 records what each version changed.

<!-- prd-forge:details -->

## Details

Every item in this document, with each of its fields.

**Version:** 0.11.0

**Owner:** Richard Hightower

**Stakeholders:**

- Product managers who are, or speak for, the domain expert
- Engineering leads who build from the resulting PRD
- Sponsors who approve the PRD for a release. For this PRD the approver is Richard Hightower, the owner of the place where it is kept, named under FR-021.
- Delivery leads who run story-mapping workshops

**Created:** 2026-10-23

**Golden thread:** J-001

**Primary persona:** PER-001

**Approvers:** PER-003

**Summary:**

- **Problem:** A domain expert knows exactly what their product must do, but what they can write down is a feature list with no named users, no pass-or-fail criteria and the technology already chosen. The team cannot build from it, and the expert is asked the same questions again by each engineer who tries.
- **Users:** Product managers who are, or speak for, the domain expert, the engineering leads who build from what they write, the sponsors who approve it, and the delivery leads who derive a backlog from it.
- **Why now:** In October 2025, 98% of 117 product managers surveyed said they use AI at work, and only 39% had received job-specific AI training (General Assembly, 6 Nov 2025). A PRD that reads well but cannot be built from costs more than no PRD at all, because it is believed.
- **Bet:** A domain expert, or a product manager who speaks for one, with no product management training, reaches an approved PRD in which every section is graded with no blocking defect and every buildability gap is closed or owned before anyone estimates.
- **Objective:** O-001
- **Measure:** Share of the 5 pilot PRDs that pass the buildability review on first submission, where a pass is the verdict `buildable`, or `buildable with gaps` with every gap closed or owned. The pilot PRDs are written between REL-001, on 2027-03-31, and 2027-09-30. Target: 80%, at least 4 of 5, by 2027-09-30, provisional until Q-001 sets the baseline, by 2027-02-28.

<!-- /prd-forge:details -->
