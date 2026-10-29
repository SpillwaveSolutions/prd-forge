---
doc: ../11-decision-rights.md
score: 84
blocking: 0
graded: 2026-10-29
grader: prd-forge:prd-adversary
previous_score: 88
---

# Why decision rights scored 84

Graded at 0.11.0, after FR-023 was split out of FR-022, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | All nine stage decisions have a rule. |
| Approver | 4 | Every approver's authority in section 4 matches its rule. |
| Delegation stance | 3 | 11 of 14 rules have no agent_role, including TR-005 and TR-013, where software drafts the text. |
| Evidence | 3 | TR-003, TR-006, and TR-011 give the agent's reasons but no known limits. |
| Escalation | 3 | TR-003's escalation describes how the score runs, not who escalates. |
| Testability | 3 | TR-008's criterion cannot be judged from outside, and TR-012 and TR-009 do not test their own rules. |
| No design | 4 | No model, threshold, or agent design. |
| Reversal | 3 | In release 1, nothing records the expert's disagreement with a reported gap. |

## Blocking defects

None.

## Weakest dimension

Evidence. No rule tells the person what the agent cannot judge.

## How to raise the grade

- **Evidence (3 to 4):** Add the known limits to TR-003, TR-006, and TR-011.
- **Escalation and reversal (3 to 4):** Rewrite TR-003's escalation, and record the expert's disagreement with a gap under TR-006 or TR-010.
- **Delegation stance and testability (3 to 4):** Set agent_role on every rule, and make TR-008, TR-009, and TR-012 testable.
