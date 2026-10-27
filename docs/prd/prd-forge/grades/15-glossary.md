---
doc: ../15-glossary.md
score: 65
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 60
---

# Why glossary scored 65

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | Most terms are covered. Engagement, lifecycle, handoff, and approval have no entry, and ST-009 says "buildability report". |
| Author's voice | 4 | The meanings are in the expert's own words, such as "Out of scope means not yet, with a point at which it is revisited." |
| Disambiguation | 3 | Epic, Acceptance criteria, and Exit criteria have no `not`. Verdict does not say whether the engineering lead's verdict uses the same three values. |
| Consistency | 2 | Section 9 says "decision rule", ST-009 says "buildability report", and other sections say "specification" for the set. Gate and Threshold draw the score line differently, and Ready ignores the override. Only one entry carries `avoid`. |
| Authority | 1 | No entry has a `source`. MoSCoW, spike, epic, story, story mapping, and Given/When/Then are not cited. |

## Blocking defects

- FR-013 and FR-014 use "approval" in their acceptance, and the glossary defines only the approver. A tester cannot tell whether a recorded rejection or a conditional decision counts as an approval.

## How to raise the grade

- **Coverage (3 to 4):** Define Approval, Engagement, Lifecycle, and Handoff.
- **Consistency (2 to 4):** Align Gate, Threshold, and Ready, and add `avoid` entries for the synonyms other sections use.
- **Authority (1 to 4):** Cite the sources of MoSCoW, spike, epic, story, story mapping, and Given/When/Then, and say where the set departs from them.

## Notes

- The body table leaves out Journey, Step, Override, Release, and Non-functional requirement, which all carry a `not`.
