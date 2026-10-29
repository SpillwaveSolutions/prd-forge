---
doc: ../08-functional-requirements.md
score: 88
blocking: 0
graded: 2026-10-29
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why functional requirements scored 88

Graded at 0.11.0, after FR-023 was split out of FR-022, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | All 23 name PER-001 or PER-003. FR-014 has two criteria where the expert acts. |
| Test 2, visible outcome | 3 | FR-007 ends on a feeling and FR-001 on a perception, and no conversation requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-008 has no error case, FR-012 criterion 4 cannot be observed, and FR-007 criterion 2 triggers on handover, which is in REL-002. |
| Test 4, priority | 4 | 11 of 23 are must, and every release-line stage has one. |
| Test 5, no technology | 4 | None named. |
| Atomicity | 2 | FR-023 joins importing and responding, and FR-007, FR-009, FR-014, and FR-022 still bundle capabilities. |
| Traceability | 4 | Every stage and objective exists, and all 23 are in scope and in REL-001. |
| Coverage | 4 | Every release-line stage has a must. |

## Blocking defects

None.

## Weakest dimension

Atomicity. FR-023 still joins two acts.

## How to raise the grade

- **Atomicity (2 to 4):** Ask the expert whether importing comments is useful before a response can be recorded. If so, split FR-023. Drop FR-009 criterion 4, which TR-014 and FR-016 cover.
- **Test 3 (3 to 4):** Give FR-008 an error case, make FR-012 criterion 4 observable, and move FR-007 criterion 2's trigger into REL-001.
- **Test 2 (3 to 4):** Replace the feelings in FR-001 and FR-007, and add sample dialogs for the conversation requirements.
