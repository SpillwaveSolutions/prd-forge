---
doc: ../11-decision-rights.md
score: 94
blocking: 0
graded: 2026-11-24
grader: prd-forge:prd-adversary
previous_score: 84
---

# Why decision rights and trust rules scored 94

The independent adversarial pass awarded 30 of 32 points.

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | All nine decision-bearing stages in both journeys have matching rules. TR-013 and TR-014 distinguish accepting a draft from accepting its grade at ST-003. |
| Approver | 4 | All fifteen rules name one of the four personas. Section 4 gives each persona the authority the rule requires. |
| Delegation stance | 4 | TR-003, TR-006 and TR-011 delegate assessments. The other twelve rules explicitly reserve their decisions to a person. |
| Evidence | 3 | TR-001 requires the expert to record “the designation and the clearance.” It leaves open what evidence the successor must see to establish that the condition was fulfilled. |
| Escalation | 3 | TR-001 says “only the person named as their successor for that condition in the approval record may clear it.” It specifies who records the designation and leaves open who may make it. TR-006 limits its absent-lead path to “release 1.” |
| Testability | 4 | Every rule has Given/When/Then criteria. TR-001 exercises partial clearance with two conditions and an observable approval state. |
| No design | 4 | TR-001 limits succession to one condition. The section defines authority and observable outcomes without prescribing an implementation. |
| Reversal | 4 | TR-003 with TR-014, TR-006, and TR-011 show the human the assessment, allow disagreement and record it. |

## Blocking defects

None. Every journey decision has a rule, all four personas have matching
authority, and the twelve never-delegated rules have evidence and consistent
delegation flags. The grader found no model, confidence threshold or agent
design. All referenced identifiers and document links resolved.

## How to raise the grade

- **Escalation (3 to 4).** Clarify who may designate a successor and what
  evidence of their authority the expert must record. Extend TR-006's
  absent-lead guidance beyond release 1 if it still applies.
- **Evidence (3 to 4).** In TR-001, specify what the successor sees to establish
  that the underlying condition was met.
