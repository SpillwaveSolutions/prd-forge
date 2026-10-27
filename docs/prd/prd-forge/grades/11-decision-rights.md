---
doc: ../11-decision-rights.md
score: 88
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why decision rights scored 88

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | Every stage has a rule. |
| Approver | 4 | Every decider's authority covers the decision. |
| Delegation stance | 3 | TR-006 and TR-011 are delegable yet are the only rules for decisions a person makes, and no rule has `agent_role`. |
| Evidence | 3 | The delegable rules name no limits. |
| Escalation | 3 | TR-001 does not cover rejection. |
| Testability | 4 | Every rule is pass or fail. |
| No design | 4 | Nothing named. |
| Reversal | 3 | TR-011's override is not recorded. |

## Blocking defects

None.

## How to raise the grade

- **Delegation stance (3 to 4):** Set `agent_role: proposes` on TR-003, TR-006, and TR-011.
