---
doc: ../07-scope.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why scope scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 3 | "a buildability review has passed" is undefined and leaves out parts of J-001's end state. |
| Completeness of value | 3 | ST-006 belongs to the approver, and Q-011, how an approver records a decision, is still open and blocks FR-014. |
| In-scope traceability | 3 | IN-001 and IN-004 list requirements that their summaries do not mention, such as FR-015, FR-018, and FR-020. |
| Out of scope | 3 | OUT-002's "proven" is undefined, and OUT-003's revisit condition is met by one request. |
| Non-goals | 3 | One non-goal is limited to release 1, and two give history in place of a reason. |
| Honesty | 4 | The section turns down things that matter. |

## Blocking defects

None.

## How to raise the grade

- **Completeness of value (3 to 4):** Say where the approver records approval in release 1, or mark ST-006 as outside the product with its workaround.
- **In-scope traceability (3 to 4):** Make each in-scope summary name what its requirements deliver.

## Notes

- The body says "R1" and "R2", and section 13 says REL-001 and REL-002.
