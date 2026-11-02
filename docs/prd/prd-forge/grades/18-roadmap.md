---
doc: ../18-roadmap.md
score: 92
blocking: 0
graded: 2026-11-01
grader: prd-forge:prd-adversary
---

# Why the roadmap scored 92

Graded at 0.13.0, the roadmap's first grade.

| Dimension | Score | Why |
| --- | --- | --- |
| Outcome framing | 4 | Each title says what a named user can newly do. |
| Objective alignment | 4 | Every item names objectives that exist. |
| Dependency visibility | 3 | RM-002 names no wait, and RM-003 leaves out OUT-002's start condition. |
| Date honesty | 4 | Both dates are indicative, and the later item has none. |
| Prioritization rationale | 3 | The order copies the release plan and does not say why. |
| Change rationale | 4 | The one change has a date and a reason. |

## Blocking defects

None.

## Weakest dimension

Prioritization rationale. A sponsor who reads only this page cannot see why
backlog derivation comes before more than one author.

## How to raise the grade

- Say why RM-002 comes before RM-003, or point to "Why this order" in the
  release plan.
- Give RM-003's start condition, OUT-002, and RM-002's missing requirements
  an id each, and list them in `depends_on`.
