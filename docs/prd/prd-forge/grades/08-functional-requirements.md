---
doc: ../08-functional-requirements.md
score: 81
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why functional requirements scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | All 20 name a persona. |
| Test 2, visible outcome | 3 | FR-007, FR-008, FR-010, and FR-013 end on states of mind, and no conversation requirement has a dialog. |
| Test 3, acceptance | 3 | FR-012 passes a review that finds nothing, FR-014 never tests a rejection, and FR-020 names no reader. |
| Test 4, priority | 3 | ST-001's and ST-004's acceptance rest on `should` requirements. |
| Test 5, no technology | 3 | FR-017, FR-008, and FR-019 fix layout or name an internal list. |
| Atomicity | 2 | FR-007, FR-011, FR-012, and FR-017 hold several capabilities each. |
| Traceability | 4 | Every id resolves. |
| Coverage | 4 | Every release-line stage has a `must`. |

## Blocking defects

None.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-007, FR-011, FR-012, and FR-017, with the expert's priorities.
- **Test 3 (3 to 4):** Make FR-012 test that the review finds an untestable requirement.
