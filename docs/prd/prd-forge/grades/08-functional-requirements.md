---
doc: ../08-functional-requirements.md
score: 84
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why functional requirements scored 84

| Dimension | Score | Why |
| --- | --- | --- |
| Test 1, named user | 4 | Every FR names PER-001 or PER-003. |
| Test 2, visible outcome | 3 | FR-007 "do not feel overruled" and FR-012 "still cheap to fix" are feelings or judgements. |
| Test 3, acceptance | 3 | FR-008 has no error or empty case, FR-012 criterion 4 cannot be observed, and FR-020 has no actor. |
| Test 4, priority | 4 | 11 of 21 are `must`, and every release-line stage has one. |
| Test 5, no technology | 3 | FR-019 leans on the question list, which the user never sees. |
| Atomicity | 2 | FR-007 and FR-012 each bundle several capabilities, and the body defends neither. |
| Traceability | 4 | Every FR has a stage and an objective. |
| Coverage | 4 | Every release-line stage has a `must`. |

## Blocking defects

None.

## Weakest dimension

Atomicity. FR-007 and FR-012 are each several requirements under one ID.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-007 and FR-012, or defend them with the same one-act argument as FR-001. Do the same for FR-017.
- **Tests 2 and 3 (3 to 4):** Replace the feelings with observable states, rewrite FR-012 criterion 4, give FR-008 an error case, and give FR-020 an actor.
- **Consistency:** Resolve FR-005 against FR-015, count three waiting `should` requirements, fix FR-021's `shown_in`, and add sample dialogs for the conversation FRs.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The summary table's rows for FR-005, FR-013, and FR-014 are shorter than the capability in the front matter, and the block shows both.
