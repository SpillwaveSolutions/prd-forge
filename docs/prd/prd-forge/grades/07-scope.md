---
doc: ../07-scope.md
score: 83
blocking: 1
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why scope scored 83

| Dimension | Score | Why |
| --- | --- | --- |
| Release line | 3 | It ends at "an approved set that a buildability review has passed", and J-001's end state needs only that every gap is closed or owned. "Passed" is not defined. |
| Completeness of value | 3 | The line ends with the sponsor's approval, and Q-011 asks how an approver records a decision at all. No workaround is recorded. |
| In-scope traceability | 3 | IN-001's summary leaves out resumption (FR-015), and IN-004's leaves out FR-016, FR-017, and FR-018. |
| Out of scope | 3 | OUT-001's "Release 2." is a schedule label, not a condition, and OUT-002's "proven" is not defined. |
| Non-goals | 4 | Five non-goals, each with its reason. |
| Honesty | 4 | It says no to things that matter, such as backlog derivation and several experts at once. |

## Blocking defects

- The body's OUT-003 row names a component: "a stepper beside the conversation". The front matter says the same thing without it.

## How to raise the grade

- **Completeness of value (3 to 4):** Decide where the sponsor approves in release 1. Then add an `outside_product` workaround for ST-006, or narrow OUT-003, and tie the answer to Q-011.
- **Release line (3 to 4):** End the line in J-001's own terms, or define "passed".
- **In-scope traceability (3 to 4):** Make each summary cover every requirement it lists.
- **Out of scope (3 to 4):** Write each `revisit` as a condition, such as "once REL-001's exit criteria are met".
