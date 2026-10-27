---
doc: ../12-assumptions-risks-dependencies.md
score: 79
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why assumptions, risks, and dependencies scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 3 | The uncomfortable ones are here, but no assumption covers the sponsor or the delivery lead, and none has `category`, `evidence`, or `validate_by`. |
| if_false | 3 | A-004's "section 7's assumptions about immediacy" names nothing that would change. |
| Risk scoring | 2 | R-001 and R-002 are high and high, with no `mitigation_by` date. No risk has `trigger`, `response`, or `status`. |
| Risk ownership | 4 | One named owner per risk. |
| Dependency status | 4 | Every dependency has a status, a date, and what it blocks. |
| Timing | 3 | D-002 and D-003 fall on REL-001's own date, and the section says so: "Recorded, not resolved." |

## Blocking defects

None.

## How to raise the grade

- **Risk scoring (2 to 4):** Give R-001 and R-002 a `mitigation_by` date before 2027-03-31 and a `trigger`, and add `response` and `status` to all five risks.
- **Assumptions surfaced (3 to 4):** Add a sponsor assumption and a delivery-lead assumption, and set `evidence` and `validate_by` on A-001 to A-004.
- **if_false (3 to 4):** Name the requirement or objective ids that change.
- **Timing (3 to 4):** Date D-002 and D-003 before REL-001, or record the move-or-ship decision as an open question with a decider.
