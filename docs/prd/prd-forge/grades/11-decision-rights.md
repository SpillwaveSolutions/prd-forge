---
doc: ../11-decision-rights.md
score: 88
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 91
---

# Why decision rights scored 88

Graded at 0.10.0, after FR-022 was added, on the document's own merits.

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | Every stage decision ST-001 to ST-009 has a rule. |
| Approver | 4 | Every approver's authority in section 4 matches its rule. |
| Delegation stance | 4 | Every rule states it, and the never-delegated set is explicit. |
| Evidence | 3 | TR-003, TR-006, and TR-011 give the agent's reasons but no known limits. |
| Escalation | 3 | TR-003's escalation is a trigger, and TR-001 does not say who clears a condition when the approver is away. |
| Testability | 3 | TR-013's "shown as ready" names no state, and TR-012's "nobody re-orders" has no criterion. |
| No design | 4 | No model, threshold, or agent design. |
| Reversal | 3 | TR-006's release-1 path does not record the expert's disagreement with a reported gap. |

## Blocking defects

None.

## Weakest dimension

Evidence. No delegable rule tells the person what the agent cannot judge.

## How to raise the grade

- **Evidence (3 to 4):** Add the known limits to TR-003, TR-006, and TR-011, and a quotation requirement to TR-011.
- **Escalation (3 to 4):** Give TR-003 an escalation path, and say who clears a TR-001 condition when the approver is away.
- **Testability and reversal (3 to 4):** Name the state in TR-013, test TR-012's rule, and record the expert's disagreement under TR-006.
