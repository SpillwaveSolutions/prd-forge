---
doc: ../15-glossary.md
score: 60
blocking: 7
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why the glossary scored 60

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | Words used in acceptance criteria have no entry: buildability review, finding, root document, approver, constraint, objective, and baseline. |
| Author's voice | 4 | The expert's own words: "A stage survives a redesign." |
| Disambiguation | 3 | 17 of 32 entries have `not`. State, Risk, Threshold, Verdict, Scope, and Wireframe have none. |
| Consistency | 2 | Two words for one thing: "weakest dimension" and "weakest part", "an index" and "root document". No entry has `avoid`. |
| Authority | 1 | No entry has `source`. MoSCoW and Spike have known origins, and neither is cited. |

## Blocking defects

- "buildability review" is used in FR-012's acceptance and has no entry.
- "finding" is used in FR-012 and FR-016 and has no entry.
- "root document" is used in FR-013 and has no entry.
- "approver", "approves with conditions", and "condition" are used in FR-014 and have no entry.
- "constraint" is used in FR-006 and has no entry.
- "objective" is used in FR-006 and has no entry.
- "baseline" is used in FR-006 and has no entry.

## How to raise the grade

- **Coverage (2 to 4):** Add an entry for each word above, then for backlog, lifecycle, trust rule, out of scope, and release.
- **Authority (1 to 4):** Add `source` to MoSCoW and Spike.
- **Consistency (2 to 4):** Pick one of each pair, put the other in `avoid`, and make the body table match.
- **Disambiguation (3 to 4):** Add `not` to the six entries above.

## Notes

- The paragraph on terms added at 0.2.0 is change history, which belongs in section 15.
