---
doc: ../08-functional-requirements.md
score: 84
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why functional requirements scored 84

Graded at 0.10.0, after FR-022 was added, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 3 | FR-022 and FR-014 name PER-003, while half their criteria are things the expert does. |
| Test 2, visible outcome | 3 | FR-007's "do not feel overruled" is a feeling, and no conversation requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-022 criterion 4 does not say who sets the due date, FR-012 criterion 2 tests only how a finding shows, and FR-008 has no error case. |
| Test 4, priority | 4 | 11 of 22 are must, and every release-line stage has one. |
| Test 5, no technology | 4 | None named. "Exported copy" names no format. |
| Atomicity | 2 | FR-007, FR-012, FR-014, and FR-022 each bundle several capabilities. |
| Traceability | 4 | Every stage and objective exists, and all 22 are in scope and in REL-001. |
| Coverage | 4 | Every release-line stage has a must. |

## Blocking defects

None.

## Weakest dimension

Atomicity. FR-022 holds the sponsor's comment, the expert's import, and an approval rule.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-022 into the sponsor's requirement and an expert requirement for recording a response, and move its approval criterion into FR-014. Split or defend FR-007 and FR-012.
- **Test 3 (3 to 4):** Say who sets a condition's due date, add a criterion for clearing a condition, and give FR-008 an error case.
- **Test 2 (3 to 4):** Replace the feeling in FR-007, and add sample dialogs for the conversation requirements.
