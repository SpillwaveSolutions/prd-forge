---
doc: ../05-user-journeys.md
score: 88
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 90
---

# Why user journeys scored 88

This grade replaces an earlier 90 that had no recorded reasons. The document did not change between the two grades.

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 4 | J-001 has one goal, and its end state reaches it. J-002 has one goal, a traceable backlog, and ST-008 reaches it. |
| Ordered stages | 3 | J-001 has six ordered stages, ST-001 to ST-006. J-002 has only two, ST-007 and ST-008, below the 5 to 8 anchor. ST-008 also skips the step where the team sizes the stories. |
| Person per stage | 4 | Every stage has a person as its actor. None is a system. |
| Decision per stage | 4 | Every stage has a `decision`, such as ST-003 "Accept the draft, correct it, or dispute the grade". |
| Inputs and outputs | 3 | ST-003's input is "Nothing", but its decision lets the expert correct the draft or dispute the grade, which are inputs. ST-005's input is a precondition, not something the user gives. |
| Handoffs | 3 | Most changes of actor are explicit. ST-006 allows "approve with conditions" and "reject", but nothing says who takes over in those cases. |
| No technology | 4 | No system, vendor, component, or screen is named. |
| End state | 3 | J-001's end state can be observed. J-002's end state says "no task or estimate has been invented yet", but ST-008's inputs include "the team's sizing of the stories". |
| Golden thread | 4 | Exactly one journey, J-001, carries `golden_thread: true`, and it matches the root and the release plan. |
| Steps outside the product | 3 | The approver's and the delivery lead's work are included. The people who accept ownership of an open question never appear as actors. |

## Blocking defects

None. Near miss: J-002's pain point about non-functional requirements is only half answered by its needs.

## How to raise the grade

- **End state, and inputs and outputs (ST-008):** Remove "and the team's sizing of the stories", or change J-002's end state to allow sizing.
- **Ordered stages (J-002):** Add the workshop stage and the sizing stage between ST-007 and ST-008. Add a need that covers non-functional requirements.
- **Handoffs (ST-006):** Add the return path for "reject" and "approve with conditions", back to the domain expert at ST-005.
- **Inputs and outputs (ST-003, ST-005):** Change ST-003's input to "Any correction to the draft, or the reason a grade is unfair". Change ST-005's input to the expert's fixes and each open question's decider.
- **Steps outside the product (ST-005):** Add a handoff where the named decider accepts the open question and its date.
