---
doc: ../15-glossary.md
score: 85
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 80
---

# Why glossary scored 85

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | "Product manager" has no entry, but sections 1 and 13 rely on it. The states are defined only inside State. |
| Author's voice | 4 | Entries take positions. |
| Disambiguation | 3 | Buildable has no `not` against "buildable with gaps". Gap's `not` conflicts with Finding. |
| Consistency | 3 | Agent says it "takes a decision" and then that it only proposes. Delegated says "Given to an agent to decide". Section 10 says the agent proposes. |
| Authority | 4 | All sources in `reference/sources.md` are cited, and each departure is stated. |

## Weakest dimension

Consistency: three entries give three accounts of what an agent does.

## Blocking defects

None.

## How to raise the grade

- **Consistency (3 to 4):** Make Agent, Delegated, and Trust rule agree with section 10: an agent proposes, and the named person decides.
- **Coverage (3 to 4):** Add Product manager.
- **Disambiguation (3 to 4):** Add Buildable's `not`, and make Gap and Finding agree.

## Notes

- Threshold's second sentence takes back the first.
- Gate does not say if `final` needs the threshold.
- "pending" has no code formatting, unlike the other states.
