---
doc: ../15-glossary.md
score: 65
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 65
---

# Why glossary scored 65

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | About 90 terms cover every word the requirements' acceptance uses. ST-009's "buildability report", section 2's segment, buyer, and status quo, section 10's "delegated", and J-002's "definition-of-done items" have no entry. |
| Author's voice | 4 | The meanings are in the expert's own words. |
| Disambiguation | 3 | Vocabulary and Glossary, Exit criteria and Acceptance criteria, Epic, and Persona have no `not`. |
| Consistency | 2 | Section 10 uses "Approver" for each rule's decider, which contradicts the Approver entry. Section 9 says "decision rule", ST-009 says "buildability report", and several sections say "specification" for the set. Only Engineer carries `avoid`. |
| Authority | 1 | No entry has a `source`. MoSCoW, spike, epic, feature, story, story mapping, and Given/When/Then are not cited, and feature and epic depart from common use without saying so. |

## Blocking defects

None. Every term in the acceptance of FR-001 to FR-018 has an entry.

## How to raise the grade

- **Authority (1 to 4):** Say whose definition of MoSCoW, spike, epic, feature, story, story mapping, and Given/When/Then the set follows, and where it departs. Only the expert can decide this.
- **Consistency (2 to 4):** Add `avoid` entries for "specification", "decision rule", and "buildability report", and replace them in the other sections. Say in the Approver entry, or in section 10, that section 10's "Approver" column names each rule's decider.
- **Coverage and disambiguation (3 to 4):** Define the section 2 and section 10 words listed above, and add the missing `not` fields.

## Notes

- The body table leaves out Journey, Step, Override, Release, and Non-functional requirement.
- The history paragraph about version 0.2.0 belongs in the change log.
