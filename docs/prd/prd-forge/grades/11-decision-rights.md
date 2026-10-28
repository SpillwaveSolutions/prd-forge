---
doc: ../11-decision-rights.md
score: 91
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why decision rights scored 91

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | All nine stage decisions map to a rule. |
| Approver | 4 | Each approver's authority in section 4 matches the decision. |
| Delegation stance | 4 | Every rule sets both flags. |
| Evidence | 3 | The three delegable rules give the agent's reasons but not its known limits. TR-001's evidence omits the buildability gaps that TR-010 promises the approver. |
| Escalation | 3 | TR-006 does not cover an unavailable engineering lead after release 1. TR-008 does not say what happens while the expert is away. |
| Testability | 3 | TR-009's second branch leaves nothing to check. TR-001's "presented as fit to approve" is not defined for an exported copy. TR-014 tests only the accept path. |
| No design | 4 | No model, threshold, or agent design named. |
| Reversal | 4 | All three delegable rules say how a person overrides, and the override is recorded. |

## Weakest dimension

Evidence: none of the three delegable assessments says what it cannot judge.

## Blocking defects

None.

## How to raise the grade

- **Evidence (3 to 4):** State each delegable assessment's known limits, and add the buildability gaps to TR-001's evidence.
- **Escalation (3 to 4):** Cover an absent engineering lead after release 1, and an absent expert under TR-008.
- **Testability (3 to 4):** Add a refute-path statement to TR-014, and make TR-001 and TR-009 checkable.

## Notes

- The body still says J-002 has two stages, and does not explain TR-014.
