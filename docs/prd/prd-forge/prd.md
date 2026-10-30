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
version: 0.12.0
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
score: 92
blocking: 0
graded: 2026-10-30
primary_persona: PER-001
approvers:
  - { name: Richard Hightower, role: Sponsor, persona: PER-003 }
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

What an approver needs from every section, then each field of this document.

### Scope

**In scope:**

- IN-001: State the idea and the domain's vocabulary once, and see every section of the set and its state
- IN-002: Be taught each section before its interview, be asked one or two questions at a time with follow-ups, end a section early with its gaps recorded, and stop being asked once the section would meet the gate
- IN-003: Record no invented domain fact, and convert a stated technology into the need beneath it, kept for the engineering lead
- IN-004: Read the draft as prose with its grade and every blocking defect, refute a finding, move to any section, refresh to see a change, and be told when the set states one item two ways
- IN-005: Answer one question about the weakest part, see the section re-graded against the same rubric, and resume after a break without repeating an answer
- IN-006: Get a buildability review of the whole set, read as an engineer would, and see which release-line stages no requirement covers and which requirements cannot be tested
- IN-007: Let the expert name each approver, give the sponsor one document with the summary, the scope, the grades, and the open questions, bring the sponsor's comments on an exported copy back into the set with a response to each, and let the expert record the sponsor's decision, given outside the product, with any conditions, against a named version

**Out of scope:**

- OUT-001: Deriving features, epics and stories from the approved PRD - journey J-002
- OUT-002: More than one expert working on the same set at the same time
- OUT-004: An engineering lead reading the set and recording their own confirmation that it can be built from
- OUT-003: Any view of the document set other than reading the documents themselves and stepping through them beside the conversation
- OUT-005: A reviewer commenting on a section inside the set, not on an exported copy

### Sections

| Section | Title | Status | Grade | Blocking |
| --- | --- | --- | --- | --- |
| 1 | Problem and opportunity | draft | 83/100 | — |
| 2 | Target customer and market | draft | 75/100 | — |
| 3 | Business objectives and success metrics | draft | 88/100 | — |
| 4 | Users and personas | draft | 82/100 | — |
| 5 | User journeys | draft | 94/100 | — |
| 5 | Scenarios | draft | 89/100 | — |
| 6 | Scope | draft | 88/100 | — |
| 7 | Functional requirements | draft | 88/100 | — |
| 7 | Wireframes | draft | 91/100 | — |
| 8 | Non-functional requirements | draft | 89/100 | — |
| 9 | Constraints | draft | 95/100 | — |
| 10 | Decision rights and trust rules | draft | 84/100 | — |
| 11 | Assumptions, risks and dependencies | draft | 96/100 | — |
| 12 | Open questions | draft | 88/100 | — |
| 13 | Release plan | draft | 88/100 | — |
| 14 | Glossary | draft | 85/100 | — |
| 15 | Change log and approvals | draft | 75/100 | — |

### Undecided

- Q-001: What share of specifications reaching a development team today pass a buildability review on first submission? Decider: Richard Hightower. By: 2027-02-28.
- Q-002: How many working days does it take today from the first question put to the domain expert about a product to an approved specification? Decider: Richard Hightower. By: 2027-02-28.
- Q-003: What share of `must` functional requirements in today's specifications can an engineer who was not in the interview write a test from? Decider: Richard Hightower. By: 2027-02-28.
- Q-004: How many organizations are in each segment in section 2? Decider: Richard Hightower. By: 2027-06-30.
- Q-005: Given what three sponsors say about a set shown with and without grades, does FR-013 stay `must`, with each section's grade shown to the sponsor? Decider: Richard Hightower. By: 2027-01-31.
- Q-006: How many sections does an expert complete in one sitting before stopping? Decider: Richard Hightower. By: 2027-02-28.
- Q-007: Does writing the requirements send an expert back to the journeys? Decider: Richard Hightower. By: 2027-02-28.
- Q-008: Does an engineering lead read a PRD that names no technology as disciplined or as incomplete? Decider: Richard Hightower. By: 2027-02-28.
- Q-009: Which version of the rubric and the eleven derivability checks does release 1 grade against? Decider: Richard Hightower. By: 2027-01-31.
- Q-010: Must an answer the expert gave survive the end of the session before its section is drafted, given A-005, that domain content stays in the expert's own session and in the documents? Decider: Richard Hightower. By: 2027-01-31.
- Q-012: Which segment in section 2 converts first? Decider: Richard Hightower. By: 2027-06-30.
- Q-013: What day rate does a buyer pay to contract a product manager for the writing of one set? Decider: Richard Hightower. By: 2027-06-30.
- Q-014: Given how experts describe a loop-back in D-002's sittings, does ST-004 keep its step that sends the expert back to an earlier section? Decider: Richard Hightower. By: 2027-02-28.
- Q-015: Who owns the rubric and the eleven derivability checks? Decider: Richard Hightower. By: 2027-01-15.
- Q-016: Must a grade show which version of the rubric it was made against? Decider: Richard Hightower. By: 2027-01-31.
- Q-017: Whom does the decider record as owner of NFR-006's accessibility, given that the product's output is read in places the non-goals in section 6 say we do not own? Decider: Richard Hightower. By: 2027-02-28.
- Q-018: What does each problem in section 1 cost, as one counted case per problem? Decider: Richard Hightower. By: 2027-01-31.
- Q-019: Will both parties behind D-002 and D-003 commit in writing to report by 2027-01-31, so that REL-001 keeps 2027-03-31? Decider: Richard Hightower. By: 2027-01-31.
- Q-020: Which section do experts stop at most often? Decider: Richard Hightower. By: 2027-02-28.
- Q-021: Whom does the decider record as owner of NFR-012's access control, given that a set is stored where the organization already stores documents? Decider: Richard Hightower. By: 2027-02-28.
- Q-022: If D-002 or D-003 reports after 2027-01-31, does REL-001 move or ship as an experiment? Decider: Richard Hightower. By: 2027-01-31.
- Q-023: Do delivery leads run a story-mapping workshop about once per release and want a backbone agreed before it, as PER-004 assumes? Decider: Richard Hightower. By: 2027-05-31.

### Blocking defects

None.

**Version:** 0.12.0

**Owner:** Richard Hightower

**Stakeholders:**

- Product managers who are, or speak for, the domain expert
- Engineering leads who build from the resulting PRD
- Sponsors who approve the PRD for a release. For this PRD the approver is Richard Hightower, the owner of the place where it is kept, named under FR-021.
- Delivery leads who run story-mapping workshops

**Created:** 2026-10-23

**Golden thread:** J-001

**Primary persona:** PER-001

**Approvers:**

- **Name:** Richard Hightower
  - **Role:** Sponsor
  - **Persona:** PER-003

**Summary:**

- **Problem:** A domain expert knows exactly what their product must do, but what they can write down is a feature list with no named users, no pass-or-fail criteria and the technology already chosen. The team cannot build from it, and the expert is asked the same questions again by each engineer who tries.
- **Users:** Product managers who are, or speak for, the domain expert, the engineering leads who build from what they write, the sponsors who approve it, and the delivery leads who derive a backlog from it.
- **Why now:** In October 2025, 98% of 117 product managers surveyed said they use AI at work, and only 39% had received job-specific AI training (General Assembly, 6 Nov 2025). A PRD that reads well but cannot be built from costs more than no PRD at all, because it is believed.
- **Bet:** A domain expert, or a product manager who speaks for one, with no product management training, reaches an approved PRD in which every section is graded with no blocking defect and every buildability gap is closed or owned before anyone estimates.
- **Objective:** O-001
- **Measure:** Share of the 5 pilot PRDs that pass the buildability review on first submission, where a pass is the verdict `buildable`, or `buildable with gaps` with every gap closed or owned. The pilot PRDs are written between REL-001, on 2027-03-31, and 2027-09-30. Target: 80%, at least 4 of 5, by 2027-09-30, provisional until Q-001 sets the baseline, by 2027-02-28.

<!-- /prd-forge:details -->
