---
doc: ../12-assumptions-risks-dependencies.md
score: 96
blocking: 0
graded: 2026-11-02
grader: prd-forge:prd-adversary
previous_score: 96
---

# Why assumptions, risks and dependencies scored 96

Graded at 0.13.0, after the 2026-11-02 change: Q-019 is answered yes, D-002 and D-003 are committed, and RM-001 is on track.

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 4 | Includes the uncomfortable ones, such as A-002. |
| if_false | 4 | Each names the ids it invalidates. |
| Risk scoring | 4 | All five risks have likelihood and impact, and both high-high risks have a mitigation date. |
| Risk ownership | 4 | Each risk has one named owner. |
| Dependency status | 3 | D-002 and D-003 are committed by parties the set does not name, and their `blocks` lists leave out REL-001. |
| Timing | 4 | Each dependency is due two months before REL-001. |

## Blocking defects

None.

## Weakest dimension

Dependency status. A reader cannot tell who committed to D-002 and D-003, or where the written commitment is kept.

## How to raise the grade

- Name, by organization or role, who committed to D-002 and D-003, and where the record is kept.
- Add REL-001 to the `blocks` of D-002 and D-003, and Q-006, Q-007, Q-014, and Q-020 to D-002's.
- Give A-004 a `validate_by` date, and confirm D-001 with a party other than the author.
