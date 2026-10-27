---
doc: ../15-glossary.md
score: 65
blocking: 2
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 65
---

# Why glossary scored 65

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | Interview, Handover, and Dependency are now defined. Feature, epic, story, backlog, expert, sponsor, engineering lead, delivery lead, story-mapping workshop, backbone, buildability report, release, and engagement are not. |
| Author's voice | 4 | Definitions take positions, such as "A stage survives a redesign." |
| Disambiguation | 3 | 25 of 48 entries carry `not`. State, Risk, and Scope have none, although the body table pairs State with Threshold. |
| Consistency | 2 | The glossary says `pending`, and FR-002 says "untouched" and "not started". Handover says "buildability report", but the defined term is "Buildability review". State and Approver give "approval" two meanings. |
| Authority | 2 | MoSCoW, RFC 2119, and Given/When/Then are named but not cited. |

## Blocking defects

- ST-008's acceptance uses "feature", "epics", and "story", and ST-007's acceptance uses "backlog". None has an entry, and the Acceptance criteria entry itself uses "story".
- "Expert" is in almost every requirement's acceptance and has no entry. The Approver entry relies on "expert" and "sponsor", and neither is defined.

## How to raise the grade

- **Coverage (2 to 4):** Add Backlog, Feature, Epic, Story, Expert, and Sponsor, each from what the set already says. Add the other roles and terms listed above.
- **Consistency (2 to 4):** Use one name for the first state and for the buildability review. Say which approval moves a section to `final`.
- **Authority (2 to 4):** Cite MoSCoW, RFC 2119, and Given/When/Then.

## Notes

- The body refers to "The `not` column above", but the column is headed "Most often confused with".
- The 0.2.0 history paragraph belongs in section 15.
- The Unit of work entry never says what this set's own unit of work is.
