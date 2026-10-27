---
doc: ../06-scenarios.md
score: 78
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 75
---

# Why scenarios scored 78

The two blocking defects are gone: SC-003 and SC-005 now have outcomes a person can observe.

| Dimension | Score | Why |
| --- | --- | --- |
| Concreteness | 3 | SC-004 never names the disputed word, SC-006 the metric, or SC-005 the stages and requirements. |
| Bound to a journey | 4 | Every id resolves. |
| One goal | 3 | SC-004 holds two outcomes. |
| Variant coverage | 3 | No `branches_from`, and no scenario covers a rejection or conditions at ST-006. |
| Outcome testability | 3 | SC-004's "the expert is told so plainly" uses an adjective as a criterion. |
| User's view | 3 | SC-004's course is written from the system's side. |
| First use, return, and concurrency | 2 | No concurrent scenario, and no `situation` on any scenario. |
| Lifecycle | 3 | LC-001 only moves forward, and nothing retires. |
| Priority | 4 | Every `must` sits on the release line. |

## Blocking defects

None.

## How to raise the grade

- **Concurrency (2 to 4):** Add a scenario where the set changes while the expert reads it (FR-018), and set `situation` on SC-002 and SC-007.
- **Lifecycle (3 to 4):** Add moves back from review and final to draft. That is the expert's decision.
- **Variant coverage (3 to 4):** Add `branches_from`, and the reject and conditions cases at ST-006.
- **SC-004 (3 to 4):** Split it in two, name the word, and write it as what the expert sees.

## Notes

- SC-002 sits at ST-004, while FR-015 and IN-001 place resumption at ST-001.
