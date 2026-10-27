---
doc: ../09-nonfunctional-requirements.md
score: 79
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 82
---

# Why non-functional requirements scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 3 | NFR-010's target has no period: "for as long as the organisation retains the set". |
| Percentiles | 4 | "under 20 seconds at p95, and under 60 seconds at p99". |
| Measurement | 3 | NFR-002 names no place for the timing, NFR-010 tests only "a set written one release ago", and NFR-012 needs "the organisation's own access rules". |
| Category coverage | 4 | All eight categories are present, and the missing concurrency target is a stated decision. |
| Derivation | 2 | No entry has `source`. Nothing traces "under 90 seconds", the set size, "90% of sections", or the resume time. NFR-001's own reasoning argues against its 20-second target. |
| No technology | 3 | NFR-006 names "the release pipeline", and the body says "the host". |
| Scope | 3 | NFR-001's metric includes the drafted section appearing, and its `applies_to` leaves out FR-008. NFR-004 covers the whole set and applies only to FR-015. |

## Blocking defects

None. NFR-012's measurement is close to one that nobody could run.

## How to raise the grade

- **Derivation (2 to 4):** Add `source` to every entry, naming a persona, an expert answer, or a question. Fix the NFR-001 reasoning so it supports its number. Only the expert can say where the numbers came from.
- **Numbers and measurement (3 to 4):** Give NFR-010 a period, give NFR-002 a place, and make NFR-012 runnable against the product's own read paths.
- **No technology (3 to 4):** Write "an automated accessibility check of every release" and "the assistant session".
- **Scope (3 to 4):** Add FR-008 to NFR-001, and widen or drop NFR-004's `applies_to`.

## Notes

- C-004 calls invented citations "the failure this product must not have", and no `accuracy` requirement measures it.
