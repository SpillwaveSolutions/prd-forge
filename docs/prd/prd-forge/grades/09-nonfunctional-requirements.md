---
doc: ../09-nonfunctional-requirements.md
score: 82
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why non-functional requirements scored 82

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | Every target has a quantity and a unit. |
| Percentiles | 4 | Every latency target uses p95 or p99. |
| Measurement | 3 | NFR-002 does not say where the clock starts. NFR-005's ten experts are due on the release date. NFR-010 tests only one release back. |
| Category coverage | 4 | All eight categories, with concurrency left out as a stated decision. |
| Derivation | 2 | No entry has `source`. NFR-001's own reasoning argues against its 20-second target. |
| No technology | 3 | "read the whole set with nothing but a text editor" and "in the release pipeline". |
| Scope | 3 | NFR-010 covers the whole set but applies only to FR-014. |

## Blocking defects

None.

## How to raise the grade

- **Derivation (2 to 4):** Add `source` to every entry, and fix NFR-001's reasoning. Only the expert knows where the numbers came from.
- **Measurement (3 to 4):** Say where NFR-002's clock starts and stops, date NFR-005's sessions before the release, and consider WCAG2ICT for NFR-006.
- **No technology and scope (3 to 4):** State readability as an outcome, write "on every release", and widen NFR-010's `applies_to`.
