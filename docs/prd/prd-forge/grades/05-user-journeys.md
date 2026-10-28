---
doc: ../05-user-journeys.md
score: 94
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 94
---

# Why user journeys scored 94

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 4 | Each journey has one goal, and its last stage reaches it. |
| Ordered stages | 3 | J-002 has three stages. FR-021, naming each approver, has no step in ST-005. |
| Person per stage | 4 | Every stage names a person. |
| Decision per stage | 4 | All nine stages have a decision. |
| Stage acceptance | 3 | ST-004 and ST-007 end in "whether", which cannot fail, and ST-005 does not say how complete the list must be. |
| Inputs and outputs | 4 | Every stage has both. |
| Handoffs | 3 | ST-006 goes back to the expert with no handoff, and the stated handoff points into deferred J-002. |
| No technology | 4 | No system, vendor, or component. |
| End state | 4 | Observable. |
| Satisfaction | 4 | All nine stages are scored by the expert, and each low score has a pain with a need. |
| Golden thread | 4 | Only J-001, and it matches the release line. |
| Steps outside the product | 4 | ST-006 is included. |

## Blocking defects

None.

## Weakest dimension

Stage acceptance. The "then ... whether" wording passes whatever happens.

## How to raise the grade

- **Stage acceptance (3 to 4):** Split ST-004's refutation and ST-007's first statement into two outcomes each, and give ST-005 a criterion the expert can check.
- **Ordered stages (3 to 4):** Add an ST-005 step that names each approver, with an acceptance statement for FR-021's refusal.
- **Handoffs (3 to 4):** Add the handoff from the sponsor back to the expert in ST-006, and say that the handoff to ST-009 applies from release 2.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The prose trigger and the table's stage names are shorter than the front matter's, and the block shows both forms.
