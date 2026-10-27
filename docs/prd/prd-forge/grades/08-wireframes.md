---
doc: ../08-wireframes.md
score: 78
blocking: 2
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why wireframes scored 78

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | FR-020 is listed on WF-001, but no mark draws it. |
| Traceability | 3 | WF-010 draws navigation and refresh but lists only FR-002 and FR-009. |
| The person's view | 3 | WF-003 mark 4 shows content no FR-009 criterion produces. WF-006 is a report that holds choices. |
| Real content | 3 | WF-008 says "ten dimensions", and the journeys rubric has twelve. WF-001 shows old scores with no version label. |
| Marks explained | 4 | Every sketch numbers its marks in order, with one `shows` line each. |
| No design | 2 | The body names a drawing tool. |
| States | 3 | WF-007, WF-009, and WF-010 are states with no `state_of`. |
| Every control earns its place | 4 | Every control traces to a requirement. |

## Blocking defects

- FR-020 is a `screen` requirement that no wireframe draws. WF-001 lists it, but no mark shows a difference between two statements of an id, priority, or link.
- The body names a technology: "Each sketch is also drawn in PlantUML Salt for the printed PRD."

## How to raise the grade

- **Coverage (3 to 4):** Draw FR-020: where the expert sees the difference, which two places, and which two values.
- **No design (2 to 4):** Drop the tool name from the body.
- **States (3 to 4):** Set `state_of` on WF-007, WF-009, and WF-010.

## Notes

- WF-004 misquotes the functional requirements rubric.
