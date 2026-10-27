---
doc: ../15-glossary.md
score: 60
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 60
---

# Why glossary scored 60

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | About 75 entries, and Objection, Session, and the others are now defined. Summary, glossary, view, outcome, capability, and problem have no entry. |
| Author's voice | 3 | Most entries argue their point. Epic, Link, and Decider read like a dictionary. |
| Disambiguation | 3 | Gate and Threshold, Release and Release line, Out of scope, and Override have no `not`. |
| Consistency | 2 | Section 9 says "decision rule", ST-009 says "buildability report", and FR-009 says "ready". "Engagement" and "session" each have two meanings. |
| Authority | 1 | No entry has `source` or `unverified`, and `wont` is never defined. |

## Blocking defects

- FR-013's acceptance uses "summary", and the glossary does not define it. The Root document entry uses the same word. An engineer cannot tell what the summary must contain, so FR-013 cannot be judged.

## How to raise the grade

- **Coverage (3 to 4):** Define Summary, and the borderline words glossary, view, topic, and ready.
- **Consistency (2 to 4):** Add `avoid` entries for "decision rule", "buildability report", and "ready", and replace them in the other sections.
- **Authority (1 to 4):** Cite MoSCoW, Given/When/Then, spike, epic, story, and story mapping, and say what `wont` means.

## Notes

- The body's history paragraph and its count of "test 5" citations are out of date.
