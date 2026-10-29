---
doc: ../07-scope.md
score: 88
blocking: 0
graded: 2026-10-29
grader: prd-forge:prd-adversary
previous_score: 96
---

# Why scope scored 88

Graded at 0.11.0, after FR-023 was split out of FR-022, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 3 | ST-001 to ST-006 repeats J-001's end state, but "ST-006 happens outside the product" overstates it: IN-007 puts five requirements in the product at ST-006. |
| Completeness of value | 3 | ST-005's criterion that an unclosed gap becomes an owned open question has no requirement behind it in IN-006. |
| In-scope traceability | 4 | IN-001 to IN-007 cover FR-001 to FR-023 once each, at matching stages. |
| Out of scope | 3 | OUT-001 and OUT-004 give REL-002 as their revisit, not a condition. |
| Non-goals | 4 | Six, each with a reason. |
| Honesty | 4 | It says no to multi-expert work, backlog derivation, and the engineering lead's own confirmation. |

## Blocking defects

None.

## Weakest dimension

Out of scope. Two revisits name a release, not a condition.

## How to raise the grade

- **Out of scope (3 to 4):** Give OUT-001 and OUT-004 a condition, such as REL-001's exit criteria being met, and name REL-003 in OUT-002's revisit.
- **Release line (3 to 4):** Say that at ST-006 only the sponsor's reading, comments, and decision happen outside the product, as the release plan says.
- **Completeness of value (3 to 4):** Name the requirement that records an unclosed gap as an owned open question, or ask the expert whether one is needed.
