---
doc: ../14-release-plan.md
score: 83
blocking: 0
graded: 2026-11-03
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why the release plan scored 83

Graded at 0.13.0, after the decisions of 2026-11-02: Q-019 is answered, RM-001 is on track, and the waits, exit criteria, and counted rules that follow from it are in the set.

| Dimension | Score | Why |
| --- | --- | --- |
| Outcomes | 4 | Each release names what a named user can newly do. |
| Sequence rationale | 3 | REL-003's place relative to REL-002 is not stated, and REL-002 starts on one approved pilot but exits on three. |
| Traceability | 2 | REL-002 and REL-003 carry no requirements, their objective links stay, and REL-001's `depends_on` leaves out Q-001 to Q-003, Q-005, Q-007, Q-009, Q-010, Q-014, and Q-015. |
| Release 1 | 4 | ST-001 to ST-006 match the release line in section 6. |
| No tasks | 4 | No tasks, estimates, or technology milestones. |
| Dates | 3 | The reason for the indicative dates fits REL-001 only, and REL-002 can reach 2027-06-30 before three pilots are approved. |

## Blocking defects

None.

## Weakest dimension

Traceability. Two of three releases have no requirements, and REL-001 leaves out the questions that block its own `must` requirements.

## How to raise the grade

- Add the blocking questions to REL-001's `depends_on`.
- Restate REL-001's exit criteria 2 and 3 in the exact terms of O-002 and O-003.
- Say where REL-003 sits relative to REL-002, and give REL-002's date its own reason.
- Define "accepts" in REL-002's backlog criterion, and give REL-003 a criterion for each outcome.

## Fixed after this grade

After this grade, the text in "How you know each release worked" lists all four REL-002 criteria and the REL-003 criterion, and REL-002 waits on Q-023.
