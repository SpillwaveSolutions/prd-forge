---
doc: ../11-decision-rights.md
score: 86
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why decision rights scored 86

| Dimension | Score | Why |
| --- | --- | --- |
| Decision coverage | 4 | Every section 5 stage decision has a rule: ST-001 maps to TR-004 and TR-007, ST-002 to TR-008, ST-003 to TR-013 and TR-003, ST-004 to TR-009 and TR-002, ST-005 to TR-010, ST-006 to TR-001, ST-007 to TR-011, and ST-008 to TR-012. |
| Approver | 4 | Every approver is a persona ID, and section 4 gives each one a matching `authority`. For example, PER-003 "Approves the PRD for a release", and PER-002 "may reject a PRD as not buildable" (TR-006). |
| Delegation stance | 3 | The stance is stated for all 13 rules, and the never-delegated set is explicit. TR-003 contradicts itself: its decision is "Accept or refute a section's score" with `delegable_to_agent: true`, but its escalation says "a grade stands unaccepted" while the expert is away. |
| Evidence | 3 | Most rules name evidence concrete enough to build a review view from, such as TR-001's "every blocking defect, and every open question with its decider and date". TR-004's "What the consequence of the choice is" and TR-002's "the result of validating it" are too loose. |
| Escalation | 3 | Most rules state the case where the approver is unavailable. TR-008 and TR-010 say only that nobody acts for the expert, not what happens to the work while the expert is away. |
| Testability | 3 | Every rule has Given/When/Then. TR-003's criteria test the grader's output, not the accept or refute decision. TR-001 has no criterion for "reject". TR-002, TR-008, TR-010, and TR-012 have no criterion proving that nobody else can make the call. |
| No design | 4 | No rule names a model, a confidence threshold, an agent design, or a component. The "below 70" in TR-009 is a product gate, not a model threshold. |

## Blocking defects

None. Every stage decision has an entry, every approver persona has a matching `authority`, no rule is both never-delegated and delegable, and every never-delegated rule has `evidence_required`.

## How to raise the grade

- **Delegation stance (3 to 4):** Fix TR-003's `decision`. Restate it as "Score a section against its rubric", or split it into delegable scoring and a never-delegated "Accept or refute a score" owned by PER-001.
- **Evidence (3 to 4):** In TR-004, list what the expert sees, such as the release-line stages and requirement IDs the choice leaves uncovered. In TR-002, replace "the result of validating it" with each validation failure by field.
- **Escalation (3 to 4):** In TR-008, say the section stays at its stage and the interview resumes where it stopped. In TR-010, say the set is not offered and stays where it is.
- **Testability (3 to 4):** Add a rejection criterion to TR-001. Add one criterion each to TR-002 and TR-010 proving the never-delegated rule holds. Rewrite TR-003's criteria to test the rule's own decision.
