---
doc: ../08-functional-requirements.md
score: 78
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why functional requirements scored 78

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. |
| Test 2, visible outcome | 3 | Some clauses are feelings: FR-007's "they do not feel overruled", FR-005's "They are never trapped in an interview". |
| Test 3, acceptance | 3 | FR-018's "shown without them asking" has no time limit; FR-008's "short tables" has no number; FR-010 has no rejected-premise case. |
| Test 4, priority | 4 | 10 of 18 are `must`, and every release-line stage has one. |
| Test 5, no technology | 1 | FR-017 names three views and how Back moves through them. FR-008 assumes a "machine-readable form". |
| Atomicity | 2 | FR-004's third criterion adds ending the interview early, and FR-011's adds the offer of review. |
| Traceability | 4 | Every stage and objective exists. |
| Coverage | 4 | Every release-line stage has a `must`. |

## Blocking defects

- FR-017's third criterion names screens: "Given they have moved through three views, a section, its grade, and its rubric, when they ask to go back three times, then they see the grade, then the section, then the view they started from."

## How to raise the grade

- **Test 5 (1 to 4):** Rewrite FR-017's criterion around the need: after following a link, the expert can return, step by step, to each thing they read before. Remove "named above it", and rewrite FR-008 without "machine-readable form".
- **Atomicity (2 to 4):** Split ending the interview early out of FR-004, and the offer of review out of FR-011.
- **Test 2 and test 3 (3 to 4):** Replace the feelings with what the expert sees, give FR-018 a time limit, and add a rejected-premise case to FR-010.

## Notes

- Nine requirements are shown in conversation, and none has the sample dialog the guide asks for.
