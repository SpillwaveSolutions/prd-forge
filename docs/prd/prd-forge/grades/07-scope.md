---
doc: ../07-scope.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why scope scored 79

The blocking defect is gone: the OUT-003 row names no component. The score fell because the rubric's non-goal dimension now reads the moved items.

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 3 | "a buildability review has passed" contradicts J-001's end state, and ST-006's actor is the sponsor. |
| Completeness of value | 3 | Q-011 asks how an approver records a decision at all, and no workaround is recorded. |
| In-scope traceability | 3 | IN-004's summary omits FR-016 to FR-018; IN-001's omits resumption. |
| Out of scope | 3 | OUT-002's "proven" and OUT-003's "When an approver asks" cannot be judged. |
| Non-goals | 3 | Two reasons give provenance, not a why: "A product decision by Richard Hightower, recorded at 0.1.0". The S-003 item is "in release 1", so it is out of scope, not a non-goal. |
| Honesty | 4 | It says no to things that matter. |

## Blocking defects

None.

## How to raise the grade

- **Non-goals (3 to 4):** Give the two moved non-goals a real reason, and move the "in release 1" segment item to `out_of_scope` with a `revisit`.
- **Completeness of value (3 to 4):** Decide where the sponsor approves in release 1, and record a workaround for ST-006 if it is outside the product.
- **Release line (3 to 4):** End the line in J-001's own words.
- **Traceability and out of scope (3 to 4):** Rewrite IN-001 and IN-004, and give OUT-002 and OUT-003 conditions a person can judge.
