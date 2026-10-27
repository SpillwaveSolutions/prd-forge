---
doc: ../05-user-journeys.md
score: 75
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 88
---

# Why user journeys scored 75

This grade replaces the earlier 88. The rubric now scores satisfaction, and no stage has a score.

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 3 | J-002's ST-008 takes "the team's sizing of the stories" as input, while its end state says "no task or estimate has been invented yet". |
| Ordered stages | 2 | J-002 has two stages, and nothing follows a reject or a condition at ST-006. |
| Person per stage | 4 | Every stage names a person. |
| Decision per stage | 4 | Every stage has a `decision`. |
| Stage acceptance | 3 | Given/When/Then everywhere, but some outcomes an outsider cannot judge: "then they read it as prose". |
| Inputs and outputs | 3 | ST-003's output, "A judgement on whether the draft says what they meant", is something the user gives, not gets. |
| Handoffs | 3 | No handoff back to the expert after a reject or a condition at ST-006. |
| No technology | 4 | No system, vendor, component, or screen. |
| End state | 3 | The end state needs every open question dated, and ST-005 records only "open questions with a decider". |
| Satisfaction | 0 | No stage in either journey has a `satisfaction` score. |
| Golden thread | 4 | Only J-001 is the golden thread, and section 13 confirms it. |
| Steps outside the product | 3 | The workshop, the team's sizing, and a decider accepting a question never appear as steps. |

## Blocking defects

None.

## How to raise the grade

- **Satisfaction (0 to 4):** Have the expert score every stage from 1 to 5. Never estimate the scores.
- **Ordered stages (2 to 4):** Add the return path after a reject or a condition at ST-006, and bring J-002 to more stages or say why two are enough.
- **One goal and inputs (3 to 4):** Remove "the team's sizing of the stories" from ST-008, and give ST-003 an output the expert receives.
- **Stage acceptance (3 to 4):** Rewrite ST-002's and ST-003's outcomes as something the expert sees.
- **Handoffs and end state (3 to 4):** Name who takes over after a reject, and add the question's date to ST-005.

## Notes

- Pain points are strings with no stage. Two needs have no stage that delivers them.
- Section 14 defines the golden thread as "The most important journey", which does not match this section's meaning.
