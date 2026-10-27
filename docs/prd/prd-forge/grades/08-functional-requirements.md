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
| Test 1, named user | 4 | All 20 requirements name PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007, FR-008, FR-010, and FR-013 describe a state of mind. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-012's second criterion tests only the report's form. FR-010 has no case for a rejected premise, and FR-014 never tests a rejection. FR-020 does not say who reads which section. |
| Test 4, priority | 4 | 10 of 20 are `must`, and every release-line stage has one. |
| Test 5, no technology | 2 | FR-008, FR-017, and FR-018 fix layout or refresh behavior, and FR-011 uses a state value in code format. |
| Atomicity | 2 | FR-007, FR-011, FR-012, and FR-017 hold more than one capability, and the body does not defend them. |
| Traceability | 4 | Every stage, objective, open question, and wireframe resolves. |
| Coverage | 4 | Every release-line stage from ST-001 to ST-006 has a `must`. |

## Blocking defects

None.

## How to raise the grade

- **Test 3 (3 to 4):** Make FR-012 test that the review finds an untestable requirement. Add a rejection case to FR-014 and FR-010.
- **Test 5 and atomicity (2 to 4):** State FR-008, FR-017, and FR-018 as needs, and split or defend FR-007, FR-011, FR-012, and FR-017.

## Notes

- FR-004 and FR-019 do not say which wins when a follow-up is due and the section would already pass.
