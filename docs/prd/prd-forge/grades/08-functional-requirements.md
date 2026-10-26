---
doc: ../08-functional-requirements.md
score: 84
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why functional requirements scored 84

This grade follows the addition of FR-017 and FR-018. The score did not change.

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1 (named user) | 4 | All eighteen requirements name a persona that exists in section 4, PER-001 or PER-003. Neither "the system" nor "users" is an actor. |
| Test 2 (visible outcome) | 3 | Most outcomes can be observed. FR-007 ends "they do not feel overruled", and FR-001 ends "so they are never translating". FR-018 promises "never older than the last change written to the set", but its first criterion works only "when they ask to refresh". |
| Test 3 (acceptance) | 3 | Every criterion is Given/When/Then, but some depend on the judge: FR-004's "two ways differing in meaning", FR-008's "short tables", and FR-018's "shown without them asking" with no time limit. |
| Test 4 (priority) | 4 | Every requirement is `must`, all eighteen are in release 1, and every one maps to an in-scope item, IN-001 to IN-007. |
| Test 5 (no technology) | 3 | No vendor, protocol, or product is named. FR-008's "machine-readable form" fixes a design with two forms, and FR-004's "a field the section needs" points the same way. |
| Atomicity | 2 | FR-001 and FR-007 join two capabilities with "and". FR-004's third criterion and FR-014's third criterion each add a capability. The body admits that "FR-001, FR-009, FR-013 and FR-014 each read as more than one capability". |
| Traceability | 4 | Every requirement carries a stage and an objective, and every one exists. |
| Coverage | 4 | Every release-line stage has a `must`, and every `screen` or `report` requirement is illustrated by a wireframe. |

## Blocking defects

None. No requirement fails a test outright, no ID is reused, every stage and objective exists, every `must` is in scope, and no criterion names a screen, button, or component.

## How to raise the grade

- **Atomicity (2 to 4):** Move FR-004's early-stop criterion and FR-014's new-version criterion into requirements of their own. Split FR-001 into "state the idea" and "establish the vocabulary once". Split FR-007 into "the need is recorded" and "the preference reaches the candidate-decision list".
- **Test 2 (3 to 4):** In FR-007, replace "they do not feel overruled" with "their stated preference appears in their own words on the candidate-decision list". In FR-001, replace "so they are never translating" with the fact in its first criterion. In FR-018, make the outcome "after they refresh, what they read matches the last change written", or drop the refresh step from its first criterion.
- **Test 3 (3 to 4):** Give FR-018's second criterion a time limit. Give FR-008's "short tables" a limit, or drop it. In FR-004, replace "two ways differing in meaning" with "an answer that names two different values for the same item".
- **Test 5 (3 to 4):** In FR-008, state the need instead: "what the expert reads and approves is exactly what is graded and handed over". In FR-004, change "a field the section needs" to "something the section needs".
