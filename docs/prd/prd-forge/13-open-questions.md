---
id: prd-forge-open-questions
kind: open-questions
schema: prd-forge/open-questions@1
title: Open questions
status: draft
updated: 2026-10-23
domain: product management tooling
section: 12
order: 130
questions:
  - id: Q-001
    question: >-
      What share of specifications reaching a development team today pass a
      buildability review on first submission?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - O-001
    spike: >-
      Run the eleven derivability checks against ten specifications collected from
      real engagements, and count. Time-boxed to 3 days.
  - id: Q-002
    question: >-
      How long does it take today, in working days, from a product idea to an
      approved specification?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - O-002
    spike: >-
      Reconstruct the timeline from first discussion to approval for five recent
      engagements. Time-boxed to 2 days.
  - id: Q-003
    question: >-
      What share of functional requirements in today's specifications can an
      engineer who was not in the interview write a test from?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - O-003
    spike: >-
      Three engineering leads score the requirements of the same ten specifications
      from Q-001, independently. Time-boxed to 3 days.
  - id: Q-004
    question: >-
      How many organisations are in each segment in section 2, and which segment
      actually converts?
    decider: Richard Hightower
    by: 2027-06-30
    blocks:
      - S-001
      - S-002
      - S-003
    spike: >-
      Name the register or source per segment and count; then compare against the
      first ten conversations. Time-boxed to 5 days.
  - id: Q-005
    question: >-
      Will a sponsor accept a specification that carries a machine-produced grade,
      or does the grade reduce their confidence rather than raise it?
    decider: Richard Hightower, with the first three sponsors
    by: 2027-05-31
    blocks:
      - FR-013
      - TR-001
    spike: >-
      Show three sponsors the same set with and without grades and ask which they
      would approve. Time-boxed to 2 days.
  - id: Q-006
    question: >-
      How many sections will an expert complete in one sitting before stopping, and
      which section do they stop at?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - R-004
      - NFR-005
    spike: Count in the ten observed sessions from D-002. No extra work.
  - id: Q-007
    question: >-
      Is the working order in the method right - does writing the requirements
      really send an expert back to the journeys, and does that feel like progress
      or like failure to them?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - ST-004
    spike: >-
      Count loop-backs and ask the expert how it felt, in the ten observed sessions.
      No extra work.
  - id: Q-008
    question: >-
      Does an engineering lead read a PRD that names no technology as disciplined
      or as incomplete?
    decider: Richard Hightower, with the three leads from D-003
    by: 2027-03-31
    blocks:
      - A-003
    spike: >-
      Ask each lead, after reading a set cold, whether anything was missing and
      whether they wanted a technology named. Time-boxed to 1 day.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: Assumptions, risks and dependencies }
  next: { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan }
---

# Open questions

| ID | Question | Decider | By | Blocks |
| --- | --- | --- | --- | --- |
| Q-001 | Today's first-pass buildability rate | R. Hightower | 2027-03-31 | O-001 |
| Q-002 | Today's idea-to-approval elapsed time | R. Hightower | 2027-03-31 | O-002 |
| Q-003 | Today's share of testable requirements | R. Hightower | 2027-03-31 | O-003 |
| Q-004 | Segment sizes, and which converts | R. Hightower | 2027-06-30 | S-001..S-003 |
| Q-005 | Will a sponsor accept a graded specification | R. Hightower + 3 sponsors | 2027-05-31 | FR-013, TR-001 |
| Q-006 | Sections completed per sitting, and where they stop | R. Hightower | 2027-03-31 | R-004, NFR-005 |
| Q-007 | Is the working order right, and how does looping back feel | R. Hightower | 2027-03-31 | ST-004 |
| Q-008 | Disciplined or incomplete, to an engineering lead | R. Hightower + 3 leads | 2027-03-31 | A-003 |

## The three that matter most

**Q-001 to Q-003 are the baselines for all three objectives.** Until they are
answered, section 3's targets are intentions. Nothing should be committed to a
plan on the strength of them.

**Q-005 is the one that could invalidate the product's central idea.** If showing
a sponsor a grade reduces their confidence rather than raising it, then FR-013 is
wrong and the grading becomes an author's private tool rather than part of the
approval. That is a cheap two-day question and it should be asked early.

**Q-008 tests test 5.** If engineering leads read the absence of technology as
incompleteness, the discipline this whole product enforces is a liability, and
A-003 fails.

## Honest note

Every decider here is the same person. For a one-person product that is accurate;
for anything larger it is a defect, and the first thing to fix when there is a
second person.
