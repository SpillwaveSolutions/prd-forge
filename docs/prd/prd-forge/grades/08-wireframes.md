---
doc: ../08-wireframes.md
score: 88
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 91
---

# Why wireframes scored 88

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 4 | Every screen or report requirement has a sketch. |
| Traceability | 3 | WF-010 lists FR-002 and FR-009, but it draws FR-015's outcome and FR-017's and FR-018's controls, and it sits at ST-004 while FR-015 is at ST-001. |
| The person's view | 3 | Some marks show content no requirement produces: WF-008's "What changed in the section", WF-005's "What the reviewer would ask for first", and WF-003's per-dimension evidence. |
| Real content | 3 | WF-008 says "Same rubric, ten dimensions", and the journeys rubric has twelve. |
| Marks explained | 4 | Every sketch's marks match its `shows` list and its Salt drawing. |
| No design | 4 | No colors, fonts, platform, or component library. |
| States | 3 | WF-007, WF-009, and WF-010 draw states, and none sets `state_of`. |
| Every control earns its place | 4 | Every control traces to a requirement. |

## Blocking defects

None.

## How to raise the grade

- **Traceability (3 to 4):** List every requirement each sketch shows, and put WF-010 at the stage its requirements name.
- **The person's view (3 to 4):** Write a requirement for each extra mark, or delete the mark.
- **Real content (3 to 4):** Change "ten dimensions" to twelve, and use a sample finding that is true of the set.
- **States (3 to 4):** Set `state_of` on WF-007 (WF-002), WF-009 (WF-005), and WF-010 (WF-001).
