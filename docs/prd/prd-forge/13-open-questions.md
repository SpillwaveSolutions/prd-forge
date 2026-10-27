---
id: prd-forge-open-questions
kind: open-questions
schema: prd-forge/open-questions@1
title: Open questions
status: draft
updated: 2026-10-27
domain: product management tooling
section: 12
order: 130
score: 75
blocking: 0
graded: 2026-10-27
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
      real engagements, and count. Time-boxed to 3 days. It depends on Q-009,
      because the version of the checks must be fixed first.
  - id: Q-002
    question: >-
      How many working days does it take today from the first question put to the
      domain expert about a product to an approved specification?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - O-002
    spike: >-
      Reconstruct the timeline from the first question put to the expert to the
      approval, for five recent engagements. Time-boxed to 2 days.
  - id: Q-003
    question: >-
      What share of `must` functional requirements in today's specifications can an
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
      How many organizations are in each segment in section 2?
    decider: Richard Hightower
    by: 2027-06-30
    blocks:
      - S-001
      - S-002
    spike: >-
      Name the register or source per segment, and count. Time-boxed to 3 days.
  - id: Q-005
    question: >-
      Will a sponsor accept a PRD that carries a machine-produced grade,
      or does the grade reduce their confidence rather than raise it?
    decider: Richard Hightower
    consulted: the first three sponsors
    by: 2027-01-31
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
    spike: >-
      Count in the ten observed sessions from D-002. Time-boxed to 0 extra days,
      because the sessions already exist.
  - id: Q-007
    question: >-
      Does writing the requirements send an expert back to the journeys?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - ST-004
      - FR-010
    spike: >-
      Count loop-backs in the ten observed sessions from D-002. Time-boxed to 0
      extra days, because the sessions already exist.
  - id: Q-008
    question: >-
      Does an engineering lead read a PRD that names no technology as disciplined
      or as incomplete?
    decider: Richard Hightower
    consulted: the three engineering leads from D-003
    by: 2027-03-31
    blocks:
      - A-003
    spike: >-
      Ask each lead, after reading a set cold, whether anything was missing and
      whether they wanted a technology named. Time-boxed to 1 day.
  - id: Q-009
    question: >-
      Which version of the rubric and the eleven derivability checks does release
      1 grade against?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - FR-004
      - FR-009
      - FR-010
      - FR-011
      - FR-012
      - FR-019
    spike: >-
      List the rubric dimensions of each section and the eleven checks as they
      stand, and have the decider approve that list as release 1's version.
      Time-boxed to 1 day. Until it is answered, ST-003 and ST-004 can be
      scaffolded and not finished.
  - id: Q-010
    question: >-
      Must an answer the expert gave survive the end of the session before its
      section is drafted, given A-005, that domain content stays in the expert's
      own session and in the documents?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - FR-015
      - NFR-011
    spike: >-
      Trace one recorded interview from the first answer to the drafted section,
      and mark each place an answer sits before the draft, checked against A-005
      and NFR-004. Time-boxed to 2 days. Guessing this one breaks assumption A-005,
      which customers rely on, rather than merely costing rework.
  - id: Q-011
    question: >-
      How does an approver record a decision, given that D-001 puts the product
      inside the expert's session and OUT-003 excludes any view of our own?
    decider: Richard Hightower
    by: 2027-02-28
    blocks:
      - FR-014
    answer: >-
      Outside the product, in release 1. The sponsor reads the root document or
      the exported PDF and gives a decision. The expert records it in section 15
      under FR-014, with the sponsor's name, role, and date. Section 6 records
      ST-006 as outside the product.
    answered: 2026-10-27
  - id: Q-012
    question: >-
      Which segment in section 2 converts first?
    decider: Richard Hightower
    by: 2027-06-30
    blocks:
      - S-001
      - S-002
    spike: >-
      Compare the segments against the first ten conversations with buyers.
      Time-boxed to 2 days.
  - id: Q-013
    question: >-
      What day rate does a buyer pay to contract a product manager for an
      engagement?
    decider: Richard Hightower
    by: 2027-06-30
    blocks:
      - S-002
    spike: >-
      Ask the buyers in the first ten conversations what they paid the last time.
      Time-boxed to 1 day.
  - id: Q-014
    question: >-
      Does looping back to the journeys feel like progress or like failure to the
      expert?
    decider: Richard Hightower
    by: 2027-03-31
    blocks:
      - ST-004
    spike: >-
      Ask each expert after a loop-back, in the ten observed sessions from D-002.
      Time-boxed to 0 extra days, because the sessions already exist.
  - id: Q-015
    question: >-
      Who owns the rubric and the eleven derivability checks?
    decider: Richard Hightower
    by: 2027-01-31
    spike: >-
      List each change the rubric and the checks have had in this set's change log,
      and name who made each one. Time-boxed to 1 day.
  - id: Q-016
    question: >-
      Must a grade show which version of the rubric it was made against?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - NFR-007
    spike: >-
      Regrade one section of this set against an earlier rubric, and ask three
      readers whether they need to tell the two grades apart. Time-boxed to 1 day.
  - id: Q-017
    question: >-
      Who owns NFR-006's accessibility and NFR-012's access control, which describe
      things the non-goals in section 6 say we do not own?
    decider: Richard Hightower
    by: 2027-02-28
    blocks:
      - NFR-006
      - NFR-012
    spike: >-
      Walk one approval end to end with a real sponsor and record every step they
      take that the product does not provide. Time-boxed to 3 days.
  - id: Q-018
    question: >-
      What does each problem in section 1 cost, as one counted case per problem?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - P-001
      - P-002
      - P-003
      - P-004
    spike: >-
      For one recent engagement, count the engineer days spent re-deriving the
      specification, the gaps found during build, and the plans changed after
      approval. Time-boxed to 2 days.
  - id: Q-019
    question: >-
      Does REL-001 move to after D-002 and D-003 report, or does it ship on
      2027-03-31 as an experiment?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - REL-001
    spike: >-
      Check the dates D-002 and D-003 commit to, and compare them with REL-001's
      target date. Time-boxed to 1 day.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: "Assumptions, risks and dependencies" }
  next: { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan }
---

# Open questions

| ID | Question | Decider | By | Blocks |
| --- | --- | --- | --- | --- |
| Q-001 | Today's first-pass buildability rate | R. Hightower | 2027-03-31 | O-001 |
| Q-002 | Today's days from the first question to an approval | R. Hightower | 2027-03-31 | O-002 |
| Q-003 | Today's share of testable `must` requirements | R. Hightower | 2027-03-31 | O-003 |
| Q-004 | How many organizations are in each segment | R. Hightower | 2027-06-30 | S-001, S-002 |
| Q-005 | Will a sponsor accept a graded PRD | R. Hightower | 2027-01-31 | FR-013, TR-001 |
| Q-006 | Sections completed per sitting, and where they stop | R. Hightower | 2027-03-31 | R-004, NFR-005 |
| Q-007 | Does writing the requirements send an expert back to the journeys | R. Hightower | 2027-03-31 | ST-004, FR-010 |
| Q-008 | Disciplined or incomplete, to an engineering lead | R. Hightower | 2027-03-31 | A-003 |
| Q-009 | Which version of the rubric and the checks release 1 grades against | R. Hightower | 2027-01-31 | FR-004, FR-009, FR-010, FR-011, FR-012, FR-019 |
| Q-010 | Must an answer survive the session before its section is drafted | R. Hightower | 2027-01-31 | FR-015, NFR-011 |
| Q-011 | How an approver records a decision (answered) | R. Hightower | 2027-02-28 | FR-014 |
| Q-012 | Which segment converts first | R. Hightower | 2027-06-30 | S-001, S-002 |
| Q-013 | The day rate a buyer pays for a contracted product manager | R. Hightower | 2027-06-30 | S-002 |
| Q-014 | Does looping back feel like progress or failure | R. Hightower | 2027-03-31 | ST-004 |
| Q-015 | Who owns the rubric and the checks | R. Hightower | 2027-01-31 | none |
| Q-016 | Must a grade show the rubric version it was made against | R. Hightower | 2027-01-31 | NFR-007 |
| Q-017 | Who owns NFR-006's accessibility and NFR-012's access control | R. Hightower | 2027-02-28 | NFR-006, NFR-012 |
| Q-018 | One counted cost per problem in section 1 | R. Hightower | 2027-01-31 | P-001 to P-004 |
| Q-019 | Does REL-001 move, or ship as an experiment | R. Hightower | 2027-01-31 | REL-001 |

## The ones that matter most

**Q-001 to Q-003 are the baselines for all three objectives.** Until they are
answered, section 3's targets are provisional. Nothing should be committed to a
plan on the strength of them.

**Q-009 and Q-010 block the most.** Q-009 blocks four `must` requirements, FR-004, FR-009, FR-010, and FR-012, and two `should`
requirements, FR-011 and FR-019. Those six requirements sit on four release-line
stages, ST-002 to ST-005, which can be scaffolded and not finished until Q-009
is answered. Q-010 blocks FR-015, a `should`, and NFR-011. It is the one where
guessing breaks assumption A-005 rather than costing rework.

**Q-011 is answered.** In release 1 the sponsor records approval outside the
product, through the expert, under FR-014. Q-017 asks who owns NFR-006 and
NFR-012.

**Q-005 is the one that could invalidate the product's central idea.** If showing
a sponsor a grade reduces their confidence rather than raising it, then FR-013 is
wrong and the grading becomes an author's private tool rather than part of the
approval. It takes two days, and it should be asked early.

**Q-019 is the schedule.** D-002 and D-003 are due on REL-001's own date, and
REL-001 cannot use what they find. The decision is whether REL-001 moves or
ships as an experiment.

**Q-008 tests test 5.** If engineering leads read the absence of technology as
incompleteness, the discipline this whole product enforces is a liability, and
A-003 fails.

## Candidate architecture decisions, not questions

Three things the set needs are design choices, not product questions. They go to
the engineering lead as candidate architecture decisions, as FR-007 hands over a
technology the expert names:

- Where the rubric and the eleven derivability checks live. Q-009 decides only
  which version release 1 grades against.
- How a grade records the rubric version it was made against. Q-016 decides only
  whether it must.
- Whether an interview in progress is a document of the set, and where an answer
  sits before its section is drafted. Q-010 decides only whether the answer must
  survive the end of the session.

## Honest note

Every decider here is the same person. For a one-person product that is accurate.
For anything larger it is a defect, and the first thing to fix when there is a
second person.
