---
doc: ../08-functional-requirements.md
score: 81
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why functional requirements scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. FR-014's third criterion has no actor. |
| Test 2, visible outcome | 3 | FR-007, FR-001, and FR-013 end on feelings. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-018 and FR-008's first criterion are now testable. FR-004, FR-012, FR-016, and FR-005 still need a judge. FR-014 never tests a rejection, and FR-010 has no error case. |
| Test 4, priority | 4 | 10 of 18 are `must`, and every release-line stage has one. |
| Test 5, no technology | 2 | FR-008 assumes two forms of each item. FR-004 says "field", FR-017 says "the view does not change" and "named above it", and FR-008 sets "a table row under named column headings". |
| Atomicity | 2 | FR-001, FR-004, FR-007, and FR-014 each join more than one capability. |
| Traceability | 4 | Every stage, objective, and open question resolves, and every screen or report requirement has a wireframe. |
| Coverage | 4 | Every release-line stage from ST-001 to ST-006 has a `must`. |

## Blocking defects

- FR-008 fails test 5. Its outcome, "every id, priority and link the team builds from is the one they read", and its second criterion, "differs between what the team builds from and what the expert reads in the prose", hold only if the product stores each item twice. The 0.9.0 change log says FR-008 has "no second form of a section", and the document does not match that claim.

## How to raise the grade

- **Test 5 (2 to 4):** State FR-008's second need without a second form of each item. Replace "field", "the view", and "named above it".
- **Atomicity (2 to 4):** Split FR-004 and FR-007, which the body does not defend.
- **Test 3 (3 to 4):** Add a rejection criterion to FR-014 and an error case to FR-010.
- **Test 2 (3 to 4):** Add a sample dialog for each `conversation` requirement.

## Notes

- FR-015 is traced to ST-001, and resuming is not part of stating the idea.
