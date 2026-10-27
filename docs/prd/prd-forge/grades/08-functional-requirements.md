---
doc: ../08-functional-requirements.md
score: 81
blocking: 2
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 78
---

# Why functional requirements scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every requirement names PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007 ends on "they do not feel overruled". FR-018's outcome contradicts its first criterion. No `conversation` requirement has a sample dialog. |
| Test 3, acceptance | 2 | FR-018 and FR-008 have no criterion an outsider can fail. FR-004's "could be written into the section in two ways differing in meaning" has no judge. FR-014 promises rejection and never tests it. |
| Test 4, priority | 4 | 10 of 18 are `must`, and every release-line stage has one. |
| Test 5, no technology | 3 | FR-008's "what the team builds from" still implies a second form of the section. FR-017 sets a layout with "named above it", and FR-004 says "field". |
| Atomicity | 2 | FR-001, FR-004, FR-008, and FR-014 each join two capabilities. |
| Traceability | 4 | Every stage and objective resolves, and every screen or report requirement has a wireframe. |
| Coverage | 4 | Every release-line stage from ST-001 to ST-006 has a `must`. |

## Blocking defects

- FR-018 fails test 3. Its outcome is "What they read is never older than the last change written to the set", but its first criterion needs the expert to ask to refresh. Its second criterion, "the new grade is shown without them asking", has no time limit, so it can never fail. WF-005 already lists this gap.
- FR-008 fails test 3. Its first criterion, "reads as written English, in sentences and short tables, and they can judge every item in the section from it alone", has no number for "short" and makes the expert the only judge. WF-005 already lists this gap.

## How to raise the grade

- **Test 3 (2 to 4):** Give FR-018 a time limit, and make its outcome match its criteria. Give FR-008 a criterion that a person outside the room can check. Add a rejection criterion to FR-014.
- **Atomicity (2 to 4):** Split the composite requirements.
- **Test 2 (3 to 4):** Add a sample dialog for each `conversation` requirement.

## Notes

- Q-010 may answer that FR-015 holds only within a session. Its "returning after eight days" criterion could then become impossible to meet.
