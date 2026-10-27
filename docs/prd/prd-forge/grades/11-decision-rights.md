---
doc: ../11-decision-rights.md
score: 84
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why decision rights scored 84

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 3 | LC-001's draft-to-review move has no rule, and its review-to-final rule needs an approval that TR-002 does not ask for. |
| Approver | 4 | Every decider is a persona whose authority names the decision. |
| Delegation stance | 3 | Both flags are set on all 14 rules, and no rule declares `agent_role`. |
| Evidence | 3 | The delegable rules name no limits, TR-011 names no reasons, TR-004's evidence is loose, and TR-014's evidence field holds a behavior. |
| Escalation | 4 | Every rule covers the absent decider. |
| Testability | 3 | TR-001's "not presented as ready" is vague and has no rejection case. TR-011 has one criterion. |
| No design | 4 | No model, confidence threshold, agent design, or technology. |
| Reversal | 3 | TR-011's override is not recorded. |

## Blocking defects

None.

## How to raise the grade

- **Decision coverage (3 to 4):** Make LC-001 say that the expert sets `final` under TR-002.
- **Evidence (3 to 4):** Name the limits of each delegable assessment, and move TR-014's behavior out of its evidence field.

## Notes

- TR-006 lists only ST-009, but its gap report comes from ST-005.
