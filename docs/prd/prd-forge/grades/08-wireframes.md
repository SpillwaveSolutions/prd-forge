---
doc: ../08-wireframes.md
score: 84
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 88
---

# Why wireframes scored 84

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 4 | All nine `screen` and `report` requirements appear in an `illustrates` list, and every scenario shown on a screen names a wireframe that exists. |
| Traceability | 3 | WF-010 draws Prev, Next, Refresh, and Back, and the next question, but lists only FR-002 and FR-009. WF-002's mark 3 is FR-001's content, and FR-001 is not listed. |
| The person's view | 3 | WF-008 mark 3, "Changed: ST-003 now names its decision", WF-005 mark 5, "Ask for first", and WF-003 mark 4, "Each dimension's score, with the evidence for it", show content that no criterion produces. |
| Real content | 3 | WF-008 says the journeys rubric has "ten dimensions", and it has twelve. WF-003's sample finding about WF-002 is not true of the WF-002 in this document. |
| Marks explained | 4 | Every sketch numbers its marks in order, with one `shows` line each. |
| No design | 3 | The body names a drawing tool: "Each sketch is also drawn in PlantUML Salt for the printed PRD." |
| States | 3 | The body calls WF-007, WF-009, and WF-010 states, and none has `state_of`. |
| Every control earns its place | 4 | Every button, choice, and field traces to a requirement. |

## Blocking defects

None.

## How to raise the grade

- **The person's view (3 to 4):** For each of the three marks, add the criterion to FR-011 or FR-012, or delete the mark.
- **Traceability (3 to 4):** Add FR-015, FR-017, and FR-018 to WF-010, and FR-001 to WF-002.
- **Real content (3 to 4):** Correct the dimension count, and label WF-003's sample as historical.
- **States (3 to 4):** Set `state_of` on WF-007, WF-009, and WF-010.
- **No design (3 to 4):** Drop the tool name from the body.

## Notes

- WF-006 is a report, yet it holds choices and a text field.
- WF-001 shows scores with no version label, and they no longer match the set.
