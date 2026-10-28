---
doc: ../12-assumptions-risks-dependencies.md
score: 96
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 92
---

# Why assumptions, risks, and dependencies scored 96

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 4 | It includes the uncomfortable ones. |
| `if_false` | 4 | Each names IDs or sections. |
| Risk scoring | 4 | Every risk has likelihood and impact, and both high/high risks have a mitigation date. |
| Risk ownership | 4 | One named owner per risk. |
| Dependency status | 3 | D-001's `from` names no party, and the information security reviews that validate A-004 and A-005 are not tracked as a dependency. |
| Timing | 4 | Every dependency falls before REL-001. |

## Blocking defects

None.

## Weakest dimension

Dependency status. Nobody tracks the information security reviews.

## How to raise the grade

- **Dependency status (3 to 4):** Add a dependency for the information security reviews, with a named party and a date before 2027-03-15, and reconcile it with section 8.
- Give A-004 a `validate_by` that matches A-005's.
- Name a party for D-001's `from`.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The block is the only place in the body where the dependencies' `blocks` show.
