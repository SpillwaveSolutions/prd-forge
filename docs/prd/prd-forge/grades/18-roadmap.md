---
doc: ../18-roadmap.md
score: 88
blocking: 0
graded: 2026-11-02
grader: prd-forge:prd-adversary
previous_score: 92
---

# Why the roadmap scored 88

Graded at 0.13.0, after the 2026-11-02 change: Q-019 is answered yes, D-002 and D-003 are committed, and RM-001 is on track.

| Dimension | Score | Why |
| --- | --- | --- |
| Outcome framing | 4 | Each title says what a named user can newly do. |
| Objective alignment | 4 | Every item names objectives that exist. |
| Dependency visibility | 3 | RM-001 leaves out R-001 and R-002, RM-002 names no wait (Q-023), and RM-003 leaves out OUT-002's start condition. |
| Date honesty | 4 | Both dates are indicative, and the later item has none. |
| Prioritization rationale | 3 | MoSCoW repeats the horizon order. No sentence says why RM-002 comes before RM-003. |
| Change rationale | 4 | Both changes have a date and a reason that names D-002, D-003, and Q-019. |

## Blocking defects

None.

## Weakest dimension

Dependency visibility. A sponsor can read RM-001 as on track while R-001 and R-002, two open high-impact risks, share its 2027-01-31 date.

## How to raise the grade

- Say whether RM-001 also waits on R-001 and R-002, and list them in `depends_on` if it does.
- Give RM-002 `depends_on: [Q-023]`, and say that REL-002 carries no requirements yet.
- State RM-003's start condition, OUT-002, and say why RM-002 comes before RM-003.

## Fixed after this grade

After this grade, the body and the 2026-11-02 reason were corrected: Q-022 is the only open decision, and D-002 and D-003 are still to arrive. The grader had found that the text called Q-022 the only wait.
