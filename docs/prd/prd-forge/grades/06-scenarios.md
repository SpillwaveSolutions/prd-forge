---
doc: ../06-scenarios.md
score: 81
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 78
---

# Why scenarios scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Concreteness | 3 | SC-007 summarizes every section in one step, and SC-001's context skips sections 2 and 3. |
| Bound to a journey | 4 | Every id resolves. |
| One goal | 4 | One goal each. |
| Variant coverage | 3 | No scenario for ST-006 rejection or a gate override, and J-002 has no happy path. |
| Outcome testability | 3 | SC-006 depends on this set's own ids. |
| User's view | 3 | Some steps describe the product's work or show internal ids. |
| First use, return, and concurrency | 2 | No concurrency scenario, and OUT-002 is not cited. |
| Lifecycle | 3 | No scenario exercises the new moves back to draft. |
| Priority | 4 | Every scenario has a priority on the release line. |

## Blocking defects

None.

## How to raise the grade

- **Concurrency (2 to 4):** Add the sponsor reading while the expert edits, or cite OUT-002. A new scenario needs the expert's priority.
- **Variant coverage (3 to 4):** Add rejection and override scenarios.
