---
doc: ../10-constraints.md
score: 100
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 30
---

# Why constraints scored 100

The section holds no constraints. The guide allows this: "Write `constraints: []` and say so in the body." Three dimensions have nothing to score.

| Dimension | Score | Why |
| --- | --- | --- |
| Named authority | 4 | No entries. The body says "No rule imposed from outside the team binds prd-forge itself." |
| Non-negotiable | 4 | Each former entry is named for what it is: "a decision of our own, a belief about customers, or the product's chosen response to a risk". |
| Verification | 4 | No entries. |
| Linkage | 4 | Every forwarding reference resolves: the non-goals in section 6, D-001 and A-005 in section 11, TR-005 in section 10, and FR-006 in section 7. |
| Separation | 4 | The rule that C-004 held is now only TR-005 and FR-006, so nothing is repeated. |

## Blocking defects

None.

## How to raise the grade

The score rests on one claim: no outside rule binds the product. Record who confirmed it, and when. Check whether the plugin marketplace's terms for published plugins, a license obligation, or a policy of the first customer firm binds what the product may do or ship. If one does, name it and its clause.

## Notes

- The body is mostly migration history, which repeats section 15. One sentence and a pointer would do the same job.
- The 0.9.0 change-log entry does not say that the expert decided this move.
