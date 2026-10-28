---
doc: ../07-scope.md
score: 92
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 92
---

# Why scope scored 92

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 3 | IN-006 does not show that an unclosed gap at ST-005 is recorded as an open question, so the set does not prove that the line reaches the end state. |
| Completeness of value | 4 | The expert reaches J-001's end state, and ST-006 has a workaround. |
| In-scope traceability | 4 | Every FR appears, and each matches its item's stage. |
| Out of scope | 3 | OUT-001 and OUT-004 name a release, not a condition. OUT-003 depends on an answer Q-005's spike does not ask for. |
| Non-goals | 4 | Six, each with a reason. |
| Honesty | 4 | It says no to things that matter. |

## Blocking defects

None.

## Weakest dimension

Out of scope. Two revisits name a release, and the third depends on an answer no spike produces.

## How to raise the grade

- **Release line (3 to 4):** Make IN-006, or a new item, include recording an unclosed gap as an open question, and cite the requirement that delivers it.
- **Out of scope (3 to 4):** Turn OUT-001 and OUT-004's revisits into conditions, and make Q-005 ask whether the root document is enough.
- Make the body table's revisit conditions match the front matter word for word.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- OUT-001 and OUT-002's revisit conditions read differently in the prose table and in the block. The prose drops OUT-002's approval condition.
