---
doc: ../08-functional-requirements.md
score: 78
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 78
---

# Why functional requirements scored 78

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007 ends on a feeling, "they do not feel overruled". FR-018's outcome contradicts its first criterion. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-004's "would already score the section 70 or more" is hypothetical. FR-012 tests the report's format, not that the review finds the defect. FR-010 and FR-015 have no error case. |
| Test 4, priority | 4 | 10 of 18 are `must`, and every release-line stage has one. |
| Test 5, no technology | 1 | FR-008 assumes a stored second form of each section. FR-004 says "field", and FR-017 sets a layout with "named above it". |
| Atomicity | 2 | FR-001, FR-004, FR-007, FR-009, FR-013, and FR-014 each join two capabilities. |
| Traceability | 4 | Every stage and objective resolves, and every `must` sits in an in-scope item. |
| Coverage | 4 | Every release-line stage from ST-001 to ST-006 has a `must`. |

## Blocking defects

- FR-008 fails test 5. "Given a section whose readable form and machine-readable form disagree" assumes a design in which each section is stored twice, and the glossary defines "machine-readable form" as "the structured record of its items, each with its id, its fields and its links".

## How to raise the grade

- **Test 5 (1 to 4):** Restate FR-008 as the expert's need: every id, priority, and link the team builds from matches what the expert reads, and a mismatch is reported. Replace "field" in FR-004 and "named above it" in FR-017.
- **Atomicity (2 to 4):** Split the composite requirements, or give each half its own criterion.
- **Test 3 (3 to 4):** Add an error case to FR-010 and FR-015, and state FR-012's possible verdicts.
- **Test 2 (3 to 4):** Add a sample dialog for each `conversation` requirement.

## Notes

- FR-015 is traced to ST-001, and none of ST-001's steps is about resuming.
- FR-002 says "all seventeen section documents", which ties it to the current file count.
