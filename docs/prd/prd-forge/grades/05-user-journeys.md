---
doc: ../05-user-journeys.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 77
---

# Why user journeys scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 3 | J-001's goal promises gaps owned "with an owner and a date", but ST-005 records only "a decider". J-002's goal leaves out the spikes ST-008 yields. |
| Ordered stages | 3 | J-002 has three stages. ST-003's dispute and ST-006's rejection have no next step. |
| Person per stage | 4 | Every stage has an actor that matches a section 4 persona. |
| Decision per stage | 4 | Every stage has a decision. |
| Stage acceptance | 3 | ST-002's "enough material to be drafted" needs a judge. ST-009's criteria are passive and leave the agreeing case untested. ST-005 does not test "Fixes the holes". |
| Inputs and outputs | 3 | ST-003's inputs say "Nothing" while its decision includes correcting. ST-008's inputs name the team's sizing, and J-002's end state says no estimate exists yet. |
| Handoffs | 3 | ST-006 hands off to the delivery lead, but J-002 opens with the engineering lead at ST-009. No stage says when the ST-004 loop exits to ST-005. |
| No technology | 4 | No system, vendor, component, or screen is named. |
| End state | 3 | J-001's end state is observable. J-002's contradicts ST-008's input. |
| Satisfaction | 0 | No stage has a `satisfaction` score, and pain points name no stage. |
| Golden thread | 4 | Only J-001 is the golden thread, and its stages match the release line. |
| Steps outside the product | 4 | Approval, the engineering lead's verdict, and the workshop decision are all included. |

## Blocking defects

None.

## How to raise the grade

- **Satisfaction (0 to 4):** Score each stage from 1 to 5 for how it feels today, and tie each pain point to its stage. Only the expert gives these scores.
- **Handoffs (3 to 4):** Hand ST-006 to the engineering lead, and say when the ST-004 loop exits.
- **One goal (3 to 4):** Ask for a date in ST-005, or drop it from the goal.
- **Stage acceptance (3 to 4):** Give ST-002 a checkable end, and rewrite ST-009's criteria with the actor first.

## Notes

- J-002's need "Constraints arriving as definition-of-done items" is delivered by no stage.
- Neither journey lists `objectives`.
- One body sentence starts with "That", which the house style bans.
