---
doc: ../07-scope.md
score: 96
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 92
---

# Why scope scored 96

Graded at 0.10.0, after FR-022 was added, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 4 | A contiguous ST-001 to ST-006 path that repeats J-001's end state. |
| Completeness of value | 4 | Every clause of the end state has a requirement behind it, and ST-006 has a workaround. |
| In-scope traceability | 4 | IN-001 to IN-007 cover FR-001 to FR-022 once each, at matching stages. |
| Out of scope | 3 | OUT-001 and OUT-004 give REL-002 as their revisit, not a condition, and the body table states OUT-002 more weakly than the front matter. |
| Non-goals | 4 | Six, each with a reason. |
| Honesty | 4 | It says no to multi-expert work, backlog derivation, and the engineering lead's own confirmation. |

## Blocking defects

None.

## Weakest dimension

Out of scope. Two revisits name a release, not a condition.

## How to raise the grade

- **Out of scope (3 to 4):** Give OUT-001 and OUT-004 a condition, such as REL-001's exit criteria being met, and make the body table match the front matter.
- Move the version-history paragraph about C-001 and C-002 to the change log.
