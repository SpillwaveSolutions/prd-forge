---
doc: ../08-functional-requirements.md
score: 84
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why functional requirements scored 84

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | All 20 requirements name PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007, FR-008, FR-010, and FR-013 describe a state of mind. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 3 | FR-004's "two ways differing in meaning" has no judge. FR-012 passes a review that misses an untestable requirement. FR-014 never tests a rejection. FR-020 does not say who reads which section. |
| Test 4, priority | 4 | 10 of 20 are `must`, and every release-line stage has one. |
| Test 5, no technology | 3 | FR-017's "named above it", FR-018's "ask to refresh", and FR-008's table row fix layout or interaction. |
| Atomicity | 2 | FR-007, FR-011, FR-012, FR-017, and FR-009's TR-014 criterion each join more than one capability, and the body does not defend them. |
| Traceability | 4 | Every stage, objective, rule, open question, and release resolves. |
| Coverage | 4 | Every release-line stage has a `must`, and every `must` sits in an in-scope item. |

## Blocking defects

None.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-007, FR-011, FR-012, and FR-017, or defend each in the body. Only the expert can set the priorities of the parts.
- **Test 3 (3 to 4):** Make FR-012 test that the review finds an untestable requirement, and add a rejection case to FR-014.

## Notes

- FR-004 and FR-019 conflict: neither says whether a follow-up comes before the early stop.
- The body lists no waits for FR-011 on Q-009 or FR-015 on Q-010.
