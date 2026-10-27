---
doc: ../05-user-journeys.md
score: 94
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 85
---

# Why user journeys scored 94

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 4 | Each journey has one goal, and its last stage reaches it. |
| Ordered stages | 3 | J-002 has 3 stages. FR-021, naming the approvers, has no step in any stage. |
| Person per stage | 4 | Every stage has a person as its actor. |
| Decision per stage | 4 | Every stage has a decision. |
| Stage acceptance | 3 | ST-004's refutation statement passes either way. ST-002 has three endings in one "then". ST-005 gives no test of the gap list. |
| Inputs and outputs | 4 | Every stage has both. |
| Handoffs | 3 | In ST-006 the work goes back to the expert with no handoff. |
| No technology | 4 | None named. |
| End state | 4 | Observable by the user. |
| Satisfaction | 4 | All 9 stages scored by the expert, each low score with a pain and a need. |
| Golden thread | 4 | Only J-001, and it matches the release line. |
| Steps outside the product | 4 | ST-006 and other people's work are included. |

## Weakest dimension

Stage acceptance: three statements cannot be judged pass or fail.

## Blocking defects

None.

## How to raise the grade

- **Ordered stages (3 to 4):** Add the FR-021 step, in which the expert names the approvers, to ST-005.
- **Stage acceptance (3 to 4):** Make ST-004's refutation statement observable, split ST-002's endings, and say how the expert judges ST-005's gap list.
- **Handoffs (3 to 4):** Add ST-006's handoff back to the expert.

## Notes

- Many steps are passive and do not start with the actor.
- ST-003's "correct it" path has no acceptance statement.
