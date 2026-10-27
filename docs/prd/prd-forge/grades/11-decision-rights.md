---
doc: ../11-decision-rights.md
score: 88
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 81
---

# Why decision rights scored 88

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | All nine stage decisions are covered, including the new ST-009 by TR-006. |
| Approver | 4 | Each approver's authority in section 4 matches the decision. |
| Delegation stance | 3 | TR-003 delegates "Accept or refute a section's score", which section 4 gives to PER-001. No rule sets `agent_role`. |
| Evidence | 3 | The delegable rules do not name the assessment's known limits. TR-011 carries no quotation duty. TR-005 does not say who checked a source. |
| Escalation | 4 | Every rule covers an unavailable approver, such as "No substitute approver, and approval waits". |
| Testability | 3 | TR-011 does not test the delivery lead overriding the verdict. TR-001 has no reject criterion. TR-007's "not a synonym" needs a judgement call. |
| No design | 4 | No model, threshold, or agent design. |
| Reversal | 3 | TR-006 records an override. TR-011 and TR-003 do not say the override or refutation is recorded. |

## Blocking defects

None.

## How to raise the grade

- **Delegation stance (3 to 4):** Split TR-003 into producing the score (`agent_role: proposes`) and accepting it (PER-001, never delegated). Set `agent_role` on all 13 rules.
- **Evidence (3 to 4):** Name what each assessment cannot judge, add a quotation duty to TR-011, and say who checks a source in TR-005.
- **Testability (3 to 4):** Add an override criterion to TR-011, a reject criterion to TR-001, and an observable test to TR-007.
- **Reversal (3 to 4):** Say in TR-003 and TR-011 that the person's override is recorded beside the reported verdict.

## Notes

- Two em dashes remain, in TR-001 and in the body.
