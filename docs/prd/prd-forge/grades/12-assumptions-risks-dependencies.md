---
doc: ../12-assumptions-risks-dependencies.md
score: 96
blocking: 0
graded: 2026-11-03
grader: prd-forge:prd-adversary
previous_score: 96
---

# Why assumptions, risks and dependencies scored 96

Graded at 0.13.0, after the decisions of 2026-11-02: Q-019 is answered, RM-001 is on track, and the waits, exit criteria, and counted rules that follow from it are in the set.

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 4 | Includes the uncomfortable ones, such as A-002. |
| if_false | 4 | Each names the ids it invalidates. |
| Risk scoring | 4 | All five risks have likelihood and impact, and both high-high risks have a mitigation date. |
| Risk ownership | 4 | Each risk has one named owner. |
| Dependency status | 3 | D-002 and D-003 name a category, not a role, and the record is a person, not a place. Their `blocks` leave out REL-001. |
| Timing | 4 | Every dependency is due two months before REL-001. |

## Blocking defects

None.

## Weakest dimension

Dependency status. A reader cannot tell who made the commitments for D-002 and D-003, or where the record is kept.

## How to raise the grade

- Name a role or kind of organization in `from` for D-002 and D-003, and the place the commitments are kept.
- Give A-004 a `validate_by` date.

## Fixed after this grade

After this grade, D-002 and D-003 block REL-001, and the text says only that the set does not name the parties.
