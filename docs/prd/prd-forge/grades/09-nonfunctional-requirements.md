---
doc: ../09-nonfunctional-requirements.md
score: 82
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 82
---

# Why nonfunctional requirements scored 82

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | Every target has a quantity. |
| Percentiles | 4 | Latency targets are percentiles. |
| Measurement | 3 | NFR-010 never tests its horizon, NFR-006 names no WCAG2ICT, and NFR-004 rests on one trial. |
| Category coverage | 4 | All eight categories. |
| Derivation | 2 | No entry has a `source`, and the body's reasoning argues against NFR-001's target. |
| No technology | 3 | NFR-006 assumes a release pipeline. |
| Scope | 3 | NFR-001's metric reaches past its `applies_to`. |

## Blocking defects

None.

## How to raise the grade

- **Derivation (2 to 4):** Give each number its source, and settle NFR-001's 20 seconds. Only the expert can.
