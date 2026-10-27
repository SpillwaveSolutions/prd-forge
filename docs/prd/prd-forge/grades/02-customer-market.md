---
doc: ../02-customer-market.md
score: 55
blocking: 3
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why target customer and market scored 55

| Dimension | Score | Why |
| --- | --- | --- |
| Buyer vs user | 2 | Buyers and users are kept apart, but no segment links to section 4 with `user_personas` or `buyer_persona`, and no buyer is a persona. |
| Sizing | 1 | No segment has an estimate. S-001 still holds the worked example's placeholder, "`<count>` firms, per `<a named register, with its year>`". Q-004 owns the gap. |
| Substitutes | 3 | The status quo is named with `kind: status-quo`, and a contracted product manager is named. No direct competitor and no build-in-house option is named. |
| Honest edge | 2 | The contracted-PM edge is checkable. The template and assistant edges are features: "this teaches the section first", "The difference here is the grading". |
| Why we win | 3 | One sentence, in the user's voice, not the buyer's. The body says "No competitor above tells them that", which the PM row contradicts. |

## Blocking defects

- S-003's user, "Product manager, interviewing practitioners", matches no persona in section 4.
- The blank-template competitor's `our_edge` is a feature, "this teaches the section first and then asks the questions", not an outcome the buyer can check.
- The general-assistant competitor's `our_edge` is a feature, "The difference here is the grading", and it describes the grading mechanism.

## How to raise the grade

- **Sizing (1 to 4):** Delete the placeholder. Give a bottom-up estimate per segment with `size_unit` and `size_method`, and add `size_source` and `size_as_of` when Q-004 is answered.
- **Buyer vs user (2 to 4):** Add `user_personas` and `buyer_persona` to every segment, and say which persona buys.
- **Honest edge (2 to 4):** Write each `our_edge` as an outcome a buyer can check after one engagement, such as "the engineering lead estimates without a clarification meeting".
- **Substitutes (3 to 4):** Name the direct alternatives a buyer would shortlist, and consider build-in-house.
- **Why we win (3 to 4):** Say it in the buyer's terms, and remove the claim that the PM row contradicts.

## Notes

- The section itself calls S-003 "a weak fit". Dropping S-003 clears the first blocking defect. That is the expert's decision.
- `adoption_barriers` is absent, and interview question 6 is unanswered.
- The body uses em dashes.
