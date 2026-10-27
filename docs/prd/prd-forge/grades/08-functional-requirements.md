---
doc: ../08-functional-requirements.md
score: 81
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why functional requirements scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. Two criteria have no actor: FR-014 "when the change is written" and FR-012 "then it has been checked against the document". |
| Test 2, visible outcome | 3 | FR-013, FR-008, and FR-007 end on what the user thinks or feels. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-010 has no error case. FR-014 never tests a rejection. FR-004 and FR-012 each have a criterion that needs a judge, and FR-005 gives two ways to pass. |
| Test 4, priority | 4 | 10 of 18 are `must`, and every release-line stage has one. |
| Test 5, no technology | 2 | No technology is named, but FR-008's "table row under named column headings" and FR-017's "the view does not change" and "named above it" set the layout. |
| Atomicity | 2 | FR-004's early stop, FR-008's check across the set, and FR-007's three parts are not in their capability lines, and the body does not defend them. |
| Traceability | 4 | Every stage, objective, and open question resolves, and every screen or report requirement has a wireframe. |
| Coverage | 4 | Every release-line stage from ST-001 to ST-006 has a `must`. |

## Blocking defects

None. FR-008 no longer assumes two forms of an item.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-004's early stop and FR-008's check across the set into their own requirements, each with its own priority. Only the expert can set those priorities.
- **Test 5 (2 to 4):** Restate the layout phrases in FR-008 and FR-017 as what the expert needs.
- **Test 3 (3 to 4):** Add a rejection criterion to FR-014 and an error case to FR-010.
- **Test 2 (3 to 4):** Add a sample dialog for each `conversation` requirement.

## Notes

- FR-015 is traced to ST-001, and resuming is not part of stating the idea.
- WF-007 places FR-018 at ST-001, and WF-010 places FR-002 and FR-009 at ST-004. The requirements place them elsewhere.
- FR-007's third criterion does not say where the expert's recorded decision lives.
