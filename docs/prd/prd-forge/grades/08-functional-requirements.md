---
doc: ../08-functional-requirements.md
score: 84
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why functional requirements scored 84

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1 (named user) | 4 | All sixteen requirements name a persona, PER-001 or PER-003, and both exist in section 4. Neither "the system" nor "users" is an actor. |
| Test 2 (visible outcome) | 3 | Most outcomes can be observed, such as FR-002 "see at a glance what is done, what is weak and what has not been started". FR-007 ends on a feeling, "they do not feel overruled", and FR-001's "so they are never translating" is an inner state. |
| Test 3 (acceptance) | 3 | Every requirement has Given/When/Then criteria, many with numbers. Some leave pass or fail to judgment: FR-008 "short tables", FR-005 "named plainly to them", and FR-012 "it has been checked against the document". |
| Test 4 (priority) | 4 | Every requirement is `must`, and section 7's IN-001 to IN-007 cover exactly the release line ST-001 to ST-006 and all sixteen FR IDs. |
| Test 5 (no technology) | 3 | No vendor, protocol, screen, or component is named. FR-008's "the section's machine-readable form" and FR-013's "the set's own root document" fix the artifact's structure. |
| Atomicity | 2 | Several capabilities are joined with "and": FR-001, FR-007, FR-009, and FR-014. Some criteria add a separate capability, such as FR-004's early-stop rule and FR-008's disagreement report. |
| Traceability | 4 | Every requirement carries `journey_stage` and `objective`, and every ST and O ID it names exists. |
| Coverage | 4 | Each release-line stage has at least one `must` requirement. |

## Blocking defects

None. No requirement fails a test outright, no ID is reused, every stage and objective ID exists, and no acceptance criterion names a screen, button, or component.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-001 into "state the idea" and "establish vocabulary once". Split FR-007 into "the need is recorded" and "the preference reaches the engineering lead". Move FR-004's early-stop criterion and FR-008's disagreement criterion into requirements of their own, from FR-017 up.
- **Test 2 (3 to 4):** In FR-007, replace "they do not feel overruled" with "they are told once where their preference was recorded". In FR-001, replace "so they are never translating" with the observable fact in its first criterion.
- **Test 3 (3 to 4):** In FR-008, replace "short tables" with a number. In FR-005, choose one outcome. In FR-012, state the result as something an observer sees.
- **Test 5 (3 to 4):** In FR-008, describe what the expert sees instead of "the section's machine-readable form". In FR-013, replace "the set's own root document" with "one document".
