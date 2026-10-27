---
doc: ../08-functional-requirements.md
score: 81
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why functional requirements scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007's "they do not feel overruled" and FR-001's "so they are never translating" are feelings. FR-018's outcome contradicts its own refresh criterion. |
| Test 3, acceptance | 3 | FR-008's "short tables" and FR-018's "shown without them asking" have no number. FR-012's oracle is an engineer, and no engineering lead is in release 1. FR-010 has no case for a rejected premise. |
| Test 4, priority | 3 | 10 of 18 are `must`. ST-001, ST-003, and ST-004 cannot meet their own acceptance without FR-002, FR-008, and FR-011, which are `should`. |
| Test 5, no technology | 3 | No technology is named, but FR-008's "machine-readable form" and FR-018's "ask to refresh" presume a mechanism. |
| Atomicity | 2 | FR-001, FR-007, FR-009, and FR-013 each join two or three capabilities, and the body says so. |
| Traceability | 4 | Every requirement has a real stage and objective. |
| Coverage | 4 | Every release-line stage has a `must` requirement. |

## Blocking defects

None.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-001 and FR-007. FR-007's three criteria already test three separate behaviors.
- **Test 4, priority (3 to 4):** Make the `must` set deliver every stage's acceptance, or change the stage acceptance and the body's claim. That is the expert's decision.
- **Test 2, visible outcome (3 to 4):** Rewrite the feelings as something on the page, and make FR-018's outcome agree with its criteria.
- **Test 3, acceptance (3 to 4):** Give FR-008 and FR-018 a limit, state FR-004's trigger as something an observer can check, and add a rejected-premise case to FR-010.
- **Test 5, no technology (3 to 4):** Write FR-008 and FR-018 as the user's need, without the mechanism.
