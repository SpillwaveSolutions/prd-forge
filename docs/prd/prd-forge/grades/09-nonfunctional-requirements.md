---
doc: ../09-nonfunctional-requirements.md
score: 89
blocking: 0
graded: 2026-10-30
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why non-functional requirements scored 89

Graded at 0.12.0, after NFR-008 began to name the domain check's research. The
grade's two NFR-008 findings, a metric that the default would fail and a
switch credited to TR-015 that TR-015 leaves outside the product, were fixed
in the same version.

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | Every target has a quantity and a unit. |
| Percentiles | 4 | Latency is given at p95 and p99. |
| Measurement | 3 | NFR-008's query review had no pass rule. |
| Category coverage | 4 | All eight core categories, and no concurrency target by decision. |
| Derivation | 2 | No entry has a `source`, and NFR-001's rationale argues against its own target. |
| No technology | 4 | No platform, vendor, or technology. |
| Scope | 4 | `applies_to` where a requirement is narrower than the set. |

## Blocking defects

None.

## Weakest dimension

Derivation. A team cannot tell which numbers are firm and which are guesses.

## How to raise the grade

- Give each entry a `source`, and trace NFR-003, NFR-009, and NFR-011 to a
  persona's frequency or a segment's size.
- Reconcile NFR-001's 20 seconds with the note that 20 seconds across 60
  questions makes the expert stop.
- Name WCAG2ICT in NFR-006, since the product is not a web page.
