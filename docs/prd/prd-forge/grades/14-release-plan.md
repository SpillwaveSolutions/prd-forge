---
doc: ../14-release-plan.md
score: 83
blocking: 0
graded: 2026-11-02
grader: prd-forge:prd-adversary
previous_score: 92
---

# Why the release plan scored 83

Graded at 0.13.0, after the 2026-11-02 change: Q-019 is answered yes, D-002 and D-003 are committed, and RM-001 is on track.

| Dimension | Score | Why |
| --- | --- | --- |
| Outcomes | 4 | Every release says what a named user can newly do. |
| Sequence rationale | 3 | The plan does not say whether REL-002 waits for REL-001's exit, which can come as late as 2027-09-30. |
| Traceability | 2 | REL-002 and REL-003 carry no requirements, their objective links do not match section 3, and REL-001's `depends_on` leaves out Q-001 to Q-003, Q-005, Q-009, and Q-015. |
| Release 1 | 4 | ST-001 to ST-006 match the release line in section 6. |
| No tasks | 4 | No tasks, estimates, or technology milestones. |
| Dates | 3 | The reason for the indicative dates pointed to a schedule problem that the commitment of D-002 and D-003 had reduced. |

## Blocking defects

None.

## Weakest dimension

Traceability. Two of three releases carry no requirements, and REL-001 does not list the questions that block its own `must` requirements.

## How to raise the grade

- Fix the objective links of REL-002 and REL-003, or name the objective each one moves.
- Restate REL-001's exit criteria 2 and 3 in the exact terms of O-002 and O-003.
- Complete REL-001's `depends_on`, and say whether REL-002 waits for REL-001's exit.
- Add exit criteria for REL-002's ST-009 outcome and for REL-003.

## Fixed after this grade

After this grade, the reason for the indicative dates was corrected: D-002 and D-003 have not reported yet, and Q-022 is still open.
