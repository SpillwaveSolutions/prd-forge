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
| Release line | 3 | ST-001 to ST-006 match REL-001, but "an approved set that a buildability review has passed" promises more than J-001's end state, and "passed" is undefined. |
| Completeness of value | 3 | ST-006's actor is the approver, and Q-011, which asks how an approver records a decision, is still open and blocks FR-014. Scope gives no `outside_product` workaround for ST-006. |
| In-scope traceability | 3 | IN-004 and IN-001 list requirements that their front-matter summaries do not mention. |
| Out of scope | 3 | OUT-002's "proven" is undefined. OUT-003's reason contradicts FR-013. |
| Non-goals | 3 | Two non-goals give history in place of a reason, and one is limited to release 1, which makes it out of scope. |
| Honesty | 4 | The section turns down things that matter, such as backlog derivation and the engineering lead's confirmation. |

## Blocking defects

None.

## How to raise the grade

- **Completeness of value (3 to 4):** Say where the approver records approval in release 1. If it is outside the product, record ST-006 as an outside stage with its workaround.
- **Release line (3 to 4):** Use J-001's end-state wording in place of "passed".
- **Out of scope and non-goals (3 to 4):** Define "proven" in OUT-002, align OUT-003 with FR-013, and move the release-1 non-goal to out of scope.

## Notes

- The body says "R1" and "R2", and the front matter says "Release 2". Section 13 uses REL-002.
