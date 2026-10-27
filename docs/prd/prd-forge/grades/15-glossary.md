---
doc: ../15-glossary.md
score: 55
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 65
---

# Why glossary scored 55

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | 54 entries. Persona, Scenario, Decision rule, Release, Story-mapping workshop, Backbone, and ID have no entry, and the glossary itself uses "persona". |
| Author's voice | 3 | Most entries argue their point. Epic and Risk read like a dictionary. |
| Disambiguation | 3 | 33 of 54 entries carry `not`. Epic, Requirement, Acceptance criteria, Risk, Wireframe, and Scope have none. |
| Consistency | 2 | State names the first state `pending`, and FR-002, ST-001, and three other sections say "not started" or "untouched". State says `final` needs an approval, but TR-002 lets the expert set a section final with no approval. |
| Authority | 1 | No entry has `source` or `unverified`. MoSCoW, spike, epic, story, and Given/When/Then come from recognized practice, and none is cited. |

## Blocking defects

- FR-002's acceptance says "thirteen are untouched" and "shown as not started". The State entry defines `pending`, `draft`, `review`, and `final`, and no state is "not started". A tester cannot tell whether a display that shows `pending` passes FR-002.

## How to raise the grade

- **Consistency (2 to 4):** Use one name for the first state in every section. Say which act moves a section to `final`: the expert under TR-002, or the approver under TR-001.
- **Authority (1 to 4):** Cite the source of MoSCoW, Given/When/Then, epic, story, and spike, and say what `wont` means.
- **Coverage (2 to 4):** Add Persona, Scenario, Decision rule, Release, and ID.
- **Disambiguation (3 to 4):** Add `not` to Epic, Requirement, Acceptance criteria, Risk, Wireframe, and Scope.

## Notes

- FR-017 uses "ID" with no entry. A stricter grader can count it as a second blocking defect.
- In common MoSCoW use, "won't" means "not this time". That is close to this set's "out of scope", not to "non-goal".
