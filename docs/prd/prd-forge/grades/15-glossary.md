---
doc: ../15-glossary.md
score: 60
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 55
---

# Why glossary scored 60

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | About 70 entries. Session, non-functional requirement, target, exit criteria, change log, and objection have no entry. |
| Author's voice | 3 | Most entries argue their point. Epic, Link, and Decider read like a dictionary. |
| Disambiguation | 3 | Gate and Threshold, Release and Release line, Out of scope, and Override have no `not`. |
| Consistency | 2 | Section 9 says "decision rule", ST-009 says "buildability report", and FR-009 says "ready". "Engagement" and "session" each have two meanings. |
| Authority | 1 | No entry has `source` or `unverified`, and `wont` is never defined. |

## Blocking defects

- FR-016's acceptance uses "objection", and the glossary does not define it. A tester cannot tell what an objection is, what "reaffirmed" requires, or when a later finding is the same objection.

## How to raise the grade

- **Coverage (3 to 4):** Define Objection, Session, Non-functional requirement, Target, Exit criteria, and Change log.
- **Consistency (2 to 4):** Add `avoid` entries for "decision rule", "buildability report", and "ready", and replace them in the other sections.
- **Authority (1 to 4):** Cite MoSCoW, Given/When/Then, spike, epic, story, and story mapping, and say what `wont` means.

## Notes

- The body's history paragraph and its count of "test 5" citations are out of date.
