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
score: 71
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
    spike: >-
      Name the register or source per segment and count; then compare against the
      first ten conversations. Time-boxed to 5 days.
  - id: Q-005
    question: >-
      Will a sponsor accept a specification that carries a machine-produced grade,
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
  - id: Q-009
    question: >-
      Where do the rubric and the eleven derivability checks live, who owns them,
      and how is a set told which version it was graded against?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - FR-004
      - FR-009
      - FR-010
      - FR-011
      - FR-012
      - FR-019
      - NFR-007
    spike: >-
      Decide whether they ship as documents of the product, name their owner, and
      decide whether a grade records the version it was made against. Time-boxed
      to 2 days. Until it is answered, ST-003 and ST-004 can be scaffolded and not
      finished.
  - id: Q-010
    question: >-
      Where does an answer live between the moment the expert gives it and the
      moment the section is drafted, given A-005, that content is retained
      nowhere outside the documents, and given that NFR-004 requires the set readable with no part of
      the product running?
    decider: Richard Hightower
    by: 2027-01-31
    blocks:
      - FR-015
      - NFR-011
    spike: >-
      Decide whether an in-progress interview is itself a document of the set, or
      whether answers before a draft are not retained at all and FR-015 holds only
      within a session. Time-boxed to 2 days. Guessing this one breaks assumption
      A-005, which customers rely on, rather than merely costing rework.
  - id: Q-011
    question: >-
      How does an approver record a decision, given that D-001 puts the product
      inside the expert's session and OUT-003 excludes any view of our own, and who
      owns NFR-006's accessibility and NFR-012's access control, which describe
      things the non-goals in section 6 say we do not own?
    decider: Richard Hightower
    by: 2027-02-28
    blocks:
      - FR-014
      - NFR-006
      - NFR-012
    spike: >-
      Walk one approval end to end with a real sponsor and record every step they
      take that the product does not provide. Time-boxed to 3 days.
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
    decider: Richard Hightower
    consulted: the three engineering leads from D-003
    by: 2027-03-31
    blocks:
      - A-003
    spike: >-
      Ask each lead, after reading a set cold, whether anything was missing and
      whether they wanted a technology named. Time-boxed to 1 day.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: "Assumptions, risks and dependencies" }
  next: { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan }
---

# Open questions

| ID | Question | Decider | By | Blocks |
| --- | --- | --- | --- | --- |
| Q-001 | Today's first-pass buildability rate | R. Hightower | 2027-03-31 | O-001 |
| Q-002 | Today's idea-to-approval elapsed time | R. Hightower | 2027-03-31 | O-002 |
| Q-003 | Today's share of testable requirements | R. Hightower | 2027-03-31 | O-003 |
| Q-004 | Segment sizes, and which converts | R. Hightower | 2027-06-30 | S-001, S-002 |
| Q-005 | Will a sponsor accept a graded specification | R. Hightower | 2027-01-31 | FR-013, TR-001 |
| Q-006 | Sections completed per sitting, and where they stop | R. Hightower | 2027-03-31 | R-004, NFR-005 |
| Q-007 | Is the working order right, and how does looping back feel | R. Hightower | 2027-03-31 | ST-004 |
| Q-008 | Disciplined or incomplete, to an engineering lead | R. Hightower | 2027-03-31 | A-003 |
| Q-009 | Where the rubric and the checks live, and who owns them | R. Hightower | 2027-01-31 | FR-004, FR-009..FR-012, FR-019, NFR-007 |
| Q-010 | Where an answer lives before its section is drafted | R. Hightower | 2027-01-31 | FR-015, NFR-011 |
| Q-011 | How an approver records a decision, and who owns NFR-006/012 | R. Hightower | 2027-02-28 | FR-014, NFR-006, NFR-012 |

## The three that matter most

**Q-001 to Q-003 are the baselines for all three objectives.** Until they are
answered, section 3's targets are intentions. Nothing should be committed to a
plan on the strength of them.

**Q-009, Q-010 and Q-011 came from the buildability review at 0.2.0**, and all
three block `must` requirements on the release line. Q-009 is the largest: six
requirements are written against a rubric whose shape the set defines but whose
content it does not contain, so two of the six release-line stages can be
scaffolded and not finished until it is answered. Q-010 is the one where guessing
breaks assumption A-005 rather than costing rework.

**Q-005 is the one that could invalidate the product's central idea.** It was
dated after the release it blocks until 0.2.0 moved it to 2027-01-31; it is a
two-day question and there was no defence for asking it late. If showing
a sponsor a grade reduces their confidence rather than raising it, then FR-013 is
wrong and the grading becomes an author's private tool rather than part of the
approval. Q-005 is a cheap two-day question, and it should be asked early.

**Q-008 tests test 5.** If engineering leads read the absence of technology as
incompleteness, the discipline this whole product enforces is a liability, and
A-003 fails.

## Honest note

Every decider here is the same person. For a one-person product that is accurate;
for anything larger it is a defect, and the first thing to fix when there is a
second person.
