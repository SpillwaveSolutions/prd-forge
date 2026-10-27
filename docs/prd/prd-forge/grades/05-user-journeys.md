---
doc: ../05-user-journeys.md
score: 77
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 75
---

# Why user journeys scored 77

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 3 | J-001's goal asks for "an owner and a date" and ST-005 asks only for "a decider". ST-009's decision serves the engineering lead, not J-002's backlog goal. |
| Ordered stages | 2 | J-002 has three stages. Nothing covers clearing a condition, a rejection, or resuming after a break. |
| Person per stage | 4 | Every actor is a person. |
| Decision per stage | 4 | Every stage names a decision. |
| Stage acceptance | 3 | ST-002's "then the section has enough material to be drafted" is not observable; ST-009 covers only a verdict that differs from the report. |
| Inputs and outputs | 3 | ST-008 takes "the team's sizing of the stories" while the end state says no estimate exists. |
| Handoffs | 3 | ST-006 hands off to the delivery lead, but J-002 now opens with the engineering lead. |
| No technology | 4 | None named. |
| End state | 4 | Observable. |
| Satisfaction | 0 | No stage has a `satisfaction` score. |
| Golden thread | 4 | Only J-001, matching the release line. |
| Steps outside the product | 3 | The workshop and the deciders answering open questions have no stage. |

## Blocking defects

None.

## How to raise the grade

- **Satisfaction (0 to 4):** The expert scores every stage from 1 to 5. Never estimate them.
- **Ordered stages (2 to 4):** Bring J-002 to five stages or give ST-009 its own journey, and add the condition, rejection, and resume paths to J-001.
- **Handoffs (3 to 4):** Point ST-006's handoff at the engineering lead, or reorder J-002.
- **One goal, acceptance, inputs (3 to 4):** Use one wording for owners and dates, make ST-002's outcome observable, and remove sizing from ST-008.
