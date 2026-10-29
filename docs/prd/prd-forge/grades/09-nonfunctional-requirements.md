---
doc: ../09-nonfunctional-requirements.md
score: 86
blocking: 0
graded: 2026-10-29
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why non-functional requirements scored 86

Graded at 0.11.0, after FR-023 was split out of FR-022, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | Every target has a quantity and a unit. |
| Percentiles | 4 | Latency targets use p95 and p99. |
| Measurement | 3 | NFR-011's resume clock has no stop event, and NFR-004's 100% has nothing to compare against. |
| Category coverage | 4 | Every required category has an entry. |
| Derivation | 2 | No entry has a source, and NFR-001's rationale argues against its own target. |
| No technology | 4 | None named. |
| Scope | 3 | NFR-004 and NFR-010 use applies_to: all, which is not an id. |

## Blocking defects

None.

## Weakest dimension

Derivation. No number says where it came from.

## How to raise the grade

- **Derivation (2 to 4):** Add a source to every entry, and record NFR-003's sizes as an open question if nobody knows them.
- **Measurement (3 to 4):** Give NFR-011's clock a stop event, and NFR-004 something to compare against.
- **Scope (3 to 4):** Delete applies_to: all, and make the summary table match the front matter.
