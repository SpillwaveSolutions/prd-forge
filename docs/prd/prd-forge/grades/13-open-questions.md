---
doc: ../13-open-questions.md
score: 83
blocking: 0
graded: 2026-11-02
grader: prd-forge:prd-adversary
previous_score: 88
---

# Why open questions scored 83

Graded at 0.13.0, after the 2026-11-02 change: Q-019 is answered yes, D-002 and D-003 are committed, and RM-001 is on track.

| Dimension | Score | Why |
| --- | --- | --- |
| Decider | 3 | One person decides all questions, including Q-008 and Q-023, which other people's behavior settles. |
| Date | 4 | Every `by` falls before what it blocks. |
| Blocks | 3 | The table dropped PER-003 from Q-005. |
| Answerability | 3 | Q-005, Q-008, Q-014, Q-016, and Q-023 collect opinions with no counted rule. |
| Honesty | 4 | The hedges in the other sections trace here. |
| Hygiene | 3 | Q-019 is answered, but one paragraph still treated it as open. |

## Blocking defects

None.

## Weakest dimension

Answerability. Q-005, which could invalidate FR-013, has no rule for what result keeps FR-013 a `must`.

## How to raise the grade

- Give Q-005, Q-008, Q-014, Q-016, and Q-023 a counted rule, as Q-007 has.
- Recast Q-008 and Q-023 as decisions the decider makes from evidence.

## Fixed after this grade

After this grade, the stale paragraph was rewritten for the answered Q-019, and PER-003 was added to Q-005's row. These fixes address the Hygiene and Blocks findings.
