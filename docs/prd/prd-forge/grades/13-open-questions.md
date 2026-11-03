---
doc: ../13-open-questions.md
score: 88
blocking: 0
graded: 2026-11-03
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why open questions scored 88

Graded at 0.13.0, after the decisions of 2026-11-02: Q-019 is answered, RM-001 is on track, and the waits, exit criteria, and counted rules that follow from it are in the set.

| Dimension | Score | Why |
| --- | --- | --- |
| Decider | 3 | Q-014, Q-016, and Q-023 rely on other people's views and have no `consulted` field. |
| Date | 4 | Every `by` falls before what it blocks. |
| Blocks | 3 | Q-009's spike names ST-002 to ST-005, which its `blocks` leaves out. Q-005's rule decides only FR-013. |
| Answerability | 3 | The five counted rules are real, but Q-003, Q-014, Q-018, Q-022, and Q-023 still have gaps. |
| Honesty | 4 | The hedges in the other sections trace here. |
| Hygiene | 4 | Q-011 and Q-019 carry their answers, and the change log resolves both. |

## Blocking defects

None.

## Weakest dimension

Answerability. Q-005 blocks FR-013, TR-001, and OUT-003, but its rule decides only FR-013.

## How to raise the grade

- Give Q-005 outcomes for OUT-003 and TR-001.
- Tie Q-014 to Q-007, give Q-003 a rule that combines the three scores, map Q-018 to all four problems, and give Q-022 a tie rule.
- Add ST-002 to ST-005 to Q-009's `blocks`, and add `consulted` to Q-014, Q-016, and Q-023.
