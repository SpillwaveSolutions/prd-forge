---
doc: ../09-nonfunctional-requirements.md
score: 86
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why nonfunctional requirements scored 86

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | All 12 targets have a quantity. |
| Percentiles | 4 | Latency targets use percentiles. |
| Measurement | 3 | NFR-008, NFR-010, and NFR-005 do not say who measures, over what period, or how often. |
| Category coverage | 4 | All eight categories, with the missing concurrency target explained. |
| Derivation | 1 | No entry has `source`, and the NFR-001 prose argues against its own number. |
| No technology | 4 | None named. |
| Scope | 4 | `applies_to` where an entry is not universal. |

## Blocking defects

None.

## Weakest dimension

Derivation. No number says where it comes from.

## How to raise the grade

- **Derivation (1 to 4):** Add `source` to all 12 entries. Only the expert can supply these.
- Rewrite the NFR-001 and NFR-002 paragraph so that its reasoning supports the target, or change the target.
- **Measurement (3 to 4):** Say how NFR-008's destinations are listed and who signs off, widen NFR-010's check, and say whether NFR-005 repeats every release.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- NFR-008 and NFR-009's table rows are narrower than the front matter.
- The prose says people measure NFR-006, and its measurement also names an automated check.
