---
doc: ../15-glossary.md
score: 65
blocking: 4
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 55
---

# Why glossary scored 65

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | "Interview", "dependency", "handed over", "backlog", "story", "epic", "story-mapping workshop", "out of scope", "sponsor", "expert", and "persona" have no entry. |
| Author's voice | 4 | Definitions take positions, such as "A stage survives a redesign." |
| Disambiguation | 3 | 27 of 46 entries carry `not`. Risk, State, and Requirement have none, although the body table lists "State \| Threshold". |
| Consistency | 2 | The glossary says `pending`, and other sections say "not started" or "untouched". The weakest-part entry allows a synonym. No entry uses `avoid`. |
| Authority | 2 | MoSCoW, RFC 2119, and Given/When/Then are named but not cited. No entry has a `source`. |

## Blocking defects

- "Interview" is in FR-004's and FR-012's acceptance and has no entry. FR-012 cannot be judged without knowing who counts as "in the interview".
- "Dependency" is in FR-012's acceptance ("then that dependency is reported") and has no entry. Section 11 uses the word for something outside the product, so the set gives it two meanings.
- "Handed over" is in FR-007's acceptance and has no entry. Nothing says what event handover is, or to whom.
- Definitions record storage and drawing format: "One directory of documents", "prefixed 01 to 16", "File prefixes and section numbers differ", and "drawn in characters".

## How to raise the grade

- **Coverage (2 to 4):** Add Interview, Handover, and Dependency, and settle the one meaning of dependency. Add the backlog terms and the roles that definitions rely on.
- **Exclusion list:** Restate Document set, Section, Reading order, and Wireframe without directories, file prefixes, or drawing format.
- **Consistency (2 to 4):** Use one name for the first state everywhere, and add `avoid` entries.
- **Authority (2 to 4):** Cite MoSCoW, RFC 2119, and Given/When/Then.

## Notes

- State says `final` needs an approval, and Approver says the expert decides each section's state. The two definitions do not say who moves one section to `final`.
- The body refers to "The `not` column above", but the column is headed "Most often confused with".
