---
doc: ../05-user-journeys.md
score: 88
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why user journeys scored 88

| Dimension | Score | Why |
| --- | --- | --- |
| One goal | 4 | Each journey reaches its goal. |
| Ordered stages | 3 | J-002 has three stages, and nobody puts the set in front of the sponsor between ST-005 and ST-006. |
| Person per stage | 4 | Every actor is a person. |
| Decision per stage | 4 | Every stage has a decision. |
| Stage acceptance | 3 | ST-002 hinges on a hypothetical score. ST-007 has no no-go case, and ST-004's resume and premise endings are untested. |
| Inputs and outputs | 3 | ST-006 lists the sponsor's output as its input. |
| Handoffs | 3 | ST-005's handoff names no deliverable, and ST-006 hands to a stage deferred to REL-002. |
| No technology | 2 | ST-006 names a file format: "the exported PDF". |
| End state | 4 | Both end states are observable. |
| Satisfaction | 4 | Every stage is scored, and every low stage has a pain point. |
| Golden thread | 4 | Only J-001, matching the release line. |
| Steps outside the product | 4 | ST-006 and the other people's work are included. |

## Blocking defects

- ST-006 names a file format, "the exported PDF". Say "an exported copy" instead.

## How to raise the grade

- **No technology (2 to 4):** Remove the file format.
- **Stage acceptance (3 to 4):** Test ST-007's no-go and ST-004's other endings.
