---
doc: ../08-wireframes.md
score: 91
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why wireframes scored 91

This grade follows the fixes the previous grade asked for. It replaces an 84.

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 4 | Every `screen` and `report` requirement has a sketch, from FR-002 (WF-001, WF-002, WF-010) to FR-018 (WF-001, WF-002, WF-007). |
| Traceability | 3 | Every sketch names its requirements, persona, and stage. WF-010 lists only FR-002 and FR-009, but its next question comes from FR-015 and FR-010, and its navigation row from FR-017 and FR-018. |
| The person's view | 3 | WF-006 shows a decision already chosen, "(•) With conditions", on a set it calls "draft", where FR-013 applies to "a set offered for approval". WF-001 and WF-010 go from "Problem and opportunity" to "User journeys" with no "…", so three sections seem to disappear. |
| Real content | 4 | The content is the set's own: FR-018's "shown without them asking", Q-009 with its decider and date, SC-001's "78 → 88", and the journeys rubric's ten dimensions. |
| Marks explained | 4 | Every wireframe has as many marks as `shows` lines, in order, and the Salt drawings carry the same marks. |
| No design | 4 | No colors, fonts, platform, component library, or vendor. |
| States | 4 | No section started (WF-002), no set at all (WF-007), SC-005's gaps (WF-009), and SC-002's return after eight days (WF-010) are all drawn. |
| Every control earns its place | 3 | Every control maps to a requirement, but two conflict with scope. WF-006 draws approval as on-screen input and WF-008 draws a "Mark as review" button, while OUT-003 excludes "any view of the document set other than reading the documents themselves and stepping through them", and Q-011 still asks how an approver records a decision. |

## Blocking defects

None.

## How to raise the grade

- **Traceability (3 to 4):** In WF-010, add FR-010, FR-015, FR-017, and FR-018 to `illustrates`, and to the line above the sketch.
- **The person's view (3 to 4):** In WF-006, show the set at `review` with no decision chosen. In WF-001 and WF-010, add a "…" row after "Problem and opportunity".
- **Every control earns its place (3 to 4):** Draw the approval and the offer of `review` as what the person says beside the document, with no buttons or field, and note in WF-006 that Q-011 is open. Or narrow OUT-003 so a decision control is in scope, and record that in section 6.
- **Coverage (criterion gaps):** Draw FR-017's "the ID is named above it" as a small sketch of the section that opens from "See FR-009 ›". Show one non-zero blocking count in WF-006 for FR-013's second criterion.
