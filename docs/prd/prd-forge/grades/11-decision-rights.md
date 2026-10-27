---
doc: ../11-decision-rights.md
score: 81
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why decision rights scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | Every stage decision from ST-001 to ST-008 maps to a rule. |
| Approver | 4 | Every approver's authority in section 4 matches the decision. |
| Delegation stance | 3 | TR-003 is delegable, yet "While the expert is away a grade stands unaccepted". No rule has `agent_role`. |
| Evidence | 3 | The delegable rules never name the agent's known limits, and TR-004's evidence is "What the consequence of the choice is". |
| Escalation | 3 | TR-006 states the unavailable approver only for release 1. |
| Testability | 3 | TR-011's only criterion tests the no-journey case, not the delegation. |
| No design | 4 | No model, threshold, or agent design. |
| Reversal | 2 | Only TR-006 records an override. TR-003 and TR-011 do not. |

## Blocking defects

None.

## How to raise the grade

- **Reversal (2 to 4):** For TR-003, TR-006, and TR-011, say how the person sees the agent's call, overrides it, and where the override is recorded, each with a criterion.
- **Delegation stance (3 to 4):** Split TR-003 into producing the score (the agent proposes) and accepting it (never delegated), and add `agent_role` to every rule.
- **Evidence (3 to 4):** Name what each assessment cannot judge, and name TR-004's consequences as stage and requirement ids.
- **Escalation and testability (3 to 4):** Cover TR-006 after release 1, and add criteria for the person overriding TR-011 and accepting TR-003.
