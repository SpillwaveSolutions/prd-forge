---
doc: ../11-decision-rights.md
score: 81
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 88
---

# Why decision rights scored 81

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 3 | Every stage has a rule, but TR-001 does not cover ST-006's rejection. |
| Approver | 4 | Every decider is a persona whose authority names the decision. |
| Delegation stance | 3 | TR-003's decision, "Accept or refute a section's score", is delegable, so software could accept a score without the expert. No delegable rule has `agent_role`. |
| Evidence | 3 | TR-004's evidence is vague, and the delegable rules name no limits of their assessment. |
| Escalation | 3 | TR-001 has no rejection path, TR-006 covers only release 1, and TR-008 leaves the expert-absent case unstated. |
| Testability | 3 | TR-011 tests only the failure path, and TR-012's never-delegated claim has no criterion. |
| No design | 4 | No model, confidence threshold, agent design, or technology. |
| Reversal | 3 | TR-003 does not record a refutation, and TR-011's override has no criterion or record. |

## Blocking defects

None.

## How to raise the grade

- **Delegation stance (3 to 4):** Split TR-003 into producing the score, which software may do, and accepting or refuting it, which only the expert does. Only the expert can decide this.
- **Decision coverage and escalation (3 to 4):** Add rejection to TR-001.

## Notes

- The paragraph about rules added at 0.2.0 is change history.
