---
doc: ../11-decision-rights.md
score: 84
blocking: 0
graded: 2026-10-30
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why decision rights and trust rules scored 84

Graded at 0.12.0, after TR-015 was added. A first pass found one blocking
defect: PER-001's authority in section 4 did not grant TR-015. Section 4 now
grants it, and this pass found none.

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | Every stage decision in section 5 has a rule. |
| Approver | 4 | Every approver's authority in section 4 matches the rule. |
| Delegation stance | 4 | Both flags on every rule, and the never-delegated set is explicit. |
| Evidence | 3 | TR-004 and TR-005 name evidence that cannot be laid out as a view. |
| Escalation | 3 | TR-003 gives a trigger, not a path, and TR-001 and TR-006 do not say who acts when that approver is gone. |
| Testability | 3 | TR-015's second criterion says "may", and TR-013 uses "ready", which is not a state. |
| No design | 3 | "The domain check" is not defined in the set and reads as a component. |
| Reversal | 3 | TR-006 records no reason for an override, and TR-003 tests no reversal. |

## Blocking defects

None.

## Weakest dimension

Escalation. Nothing says who clears a condition when the sponsor who set it is
no longer available.

## How to raise the grade

- Decide who clears a condition when its sponsor is gone, or say that the set
  stays approved with conditions.
- Make TR-015's second criterion testable: each outbound query holds only the
  names of standards, terms of art, and the domain.
- Define the domain check in the glossary, as what the expert sees.
