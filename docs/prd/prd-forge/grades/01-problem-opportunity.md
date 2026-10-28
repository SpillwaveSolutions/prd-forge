---
doc: ../01-problem-opportunity.md
score: 83
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why problem and opportunity scored 83

| Dimension | Score | Why |
| --- | --- | --- |
| Problem, not solution | 4 | Every statement describes what the user suffers, and no desired outcome holds a solution. |
| Named sufferer | 4 | Each `who` maps to a persona that exists, and section 4 lists the problems back. |
| Evidence | 3 | Each problem has one counted, sourced, dated claim, but the counts come from this product's own PRD, and other items are unmeasured claims. |
| Why now | 3 | A one-time survey level, not a change. P-003's why-now is about product managers, but the sufferer is the sponsor. |
| Cost | 2 | Every cost is qualitative and defers to Q-018. |
| Coverage | 4 | O-001 to O-003 cover P-001 to P-004, and requirements cite each objective. |

## Blocking defects

None.

## Weakest dimension

Cost. No problem states a cost in money, time, or risk.

## How to raise the grade

- **Cost (2 to 4):** Answer Q-018 with its spike, and put the result in each `cost_of_inaction`.
- **Why now (3 to 4):** Cite a change, not a single reading. Rewrite P-003's why-now around the sponsor, and drop the inference that 61% judge AI drafts without training.
- **Evidence (3 to 4):** Add one count from a specification written without prd-forge, and count or remove the unmeasured pattern claims.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The summary table's Who column, "Product manager or domain expert", reads as two roles. The front matter says one role: "Product manager who is, or speaks for, the domain expert".
