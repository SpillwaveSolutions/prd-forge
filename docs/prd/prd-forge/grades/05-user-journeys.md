---
doc: ../05-user-journeys.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why user journeys scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 3 | J-001's goal promises gaps owned "with an owner and a date", but ST-005 records only "a decider". |
| Ordered stages | 3 | J-002 has three stages. J-001's need "Let me stop and resume without starting over" has no stage. |
| Person per stage | 4 | Every stage has a human actor. |
| Decision per stage | 4 | Every stage has a decision. |
| Stage acceptance | 3 | ST-002's "enough material to be drafted" needs a judge. ST-009's second criterion is passive. ST-005 does not test "Fixes the holes". |
| Inputs and outputs | 3 | ST-003's input is "Nothing", yet its acceptance starts from a drafted and graded section. |
| Handoffs | 3 | ST-006 hands off to the delivery lead, but J-002 opens with the engineering lead at ST-009. |
| No technology | 4 | No system, vendor, component, or screen is named. |
| End state | 3 | J-002's end state says no estimate exists, and ST-008 takes the team's sizing as input. ST-006 allows approval with conditions, which J-001's end state does not cover. |
| Satisfaction | 0 | No stage has a `satisfaction` score. |
| Golden thread | 4 | Only J-001 is the golden thread, and it matches REL-001. |
| Steps outside the product | 4 | The approver, the engineering lead, and the team's planning are all included. |

## Blocking defects

None.

## How to raise the grade

- **Satisfaction (0 to 4):** Score each stage from 1 to 5 for how it feels today, and tie each pain point to its stage. Only the expert gives these scores.
- **Handoffs (3 to 4):** Hand ST-006 to the engineering lead.
- **One goal (3 to 4):** Ask for a date in ST-005, or drop it from the goal.

## Notes

- Two needs have no stage: stop and resume (J-001), and constraints as definition-of-done items (J-002).
- One body sentence starts with "That".
