---
doc: ../11-decision-rights.md
score: 91
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 91
---

# Why decision rights scored 91

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | All nine stage decisions map to a rule. |
| Approver | 4 | Every approver's authority matches its rule. |
| Delegation stance | 4 | Both flags on every rule. |
| Evidence | 3 | None of the three delegable rules states its known limits, and TR-001 omits the buildability gaps that TR-010 promises. |
| Escalation | 3 | TR-006 does not cover an unavailable engineering lead after release 1, and TR-003's escalation describes what starts the score. |
| Testability | 3 | Several outcomes are undefined, and TR-008 contradicts ST-002. |
| No design | 4 | No model, threshold, or agent design. |
| Reversal | 4 | Each delegable rule can be reversed. |

## Blocking defects

None.

## Weakest dimension

Evidence. The delegable rules do not tell the person what the assessment cannot judge.

## How to raise the grade

- **Evidence (3 to 4):** Add a known-limits clause to TR-003, TR-006, and TR-011, and add the buildability gaps to TR-001's evidence.
- **Escalation (3 to 4):** Say what happens to TR-006 when the engineering lead is unavailable, and rewrite TR-003's escalation.
- **Testability (3 to 4):** Settle TR-008 against ST-002, define "presented as fit to approve", and split TR-009's "or".

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The summary table says "Decider" and the block says "Approver", which are two words for one field.
