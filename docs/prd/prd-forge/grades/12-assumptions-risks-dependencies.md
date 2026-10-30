---
doc: ../12-assumptions-risks-dependencies.md
score: 96
blocking: 0
graded: 2026-10-30
grader: prd-forge:prd-adversary
previous_score: 96
---

# Why assumptions, risks and dependencies scored 96

Graded at 0.12.0, after A-005 began to name the domain check's research and
TR-015.

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 4 | The uncomfortable assumptions are stated, A-002 and A-003 among them. |
| if_false | 4 | Every assumption names what changes if it is false. |
| Risk scoring | 4 | Every risk is scored, and both high/high risks have a dated mitigation. |
| Risk ownership | 4 | One named owner per risk. |
| Dependency status | 3 | D-001 is marked delivered on the author's own use, not a customer's platform. |
| Timing | 4 | Every dependency is due two months before REL-001. |

## Blocking defects

None.

## Weakest dimension

Dependency status. D-001's provider is a category, not a party that can commit.

## How to raise the grade

- Name who on the customer side confirms that their assistant platform carries
  a full interview, and by when, or set D-001 to `requested`.
- Give A-004 a `validate_by` date.
