---
doc: ../08-wireframes.md
score: 81
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 78
---

# Why wireframes scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 4 | All ten `screen` and `report` requirements are drawn. FR-020 is mark 6 on WF-001. |
| Traceability | 3 | WF-010 draws navigation and refresh but lists only FR-002 and FR-009. WF-001 mark 3 shows FR-009, which WF-001 does not list. |
| The person's view | 3 | WF-003 mark 4 shows content no FR-009 criterion produces. WF-006 is a report that holds a choice. |
| Real content | 2 | WF-008 says "ten dimensions", and the journeys rubric has twelve. WF-001 mark 6 is an example that cannot occur, because section 6 states no priorities. WF-005 and WF-006 show 0.4.0 with no snapshot label. |
| Marks explained | 3 | WF-004's first `shows` line promises more than its mark shows. WF-001 mark 5 links to an id defined in the open section. |
| No design | 4 | No tool, color, font, platform, or component library is named. |
| States | 3 | WF-007, WF-009, and WF-010 are states with no `state_of`. |
| Every control earns its place | 4 | Every control traces to a requirement. |

## Blocking defects

None.

## How to raise the grade

- **Real content (2 to 4):** Draw a difference the set could hold, label old snapshots with their version, and correct the dimension count.
- **Traceability and states (3 to 4):** Add the missing requirements to WF-010 and WF-001, and set `state_of` on WF-007, WF-009, and WF-010.

## Notes

- WF-001 skips sections 2 to 4 with no ellipsis.
