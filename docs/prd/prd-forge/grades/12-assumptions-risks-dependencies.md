---
doc: ../12-assumptions-risks-dependencies.md
score: 75
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why assumptions, risks, and dependencies scored 75

| Dimension | Score | Why |
| --- | --- | --- |
| Assumptions surfaced | 3 | A-005 has `evidence` and `validate_by`, and A-001 to A-004 have neither. A-005 does not say how it will be tested. |
| if_false | 3 | A-004's "section 7's assumptions about immediacy" names no requirement. |
| Risk scoring | 2 | R-001 and R-002 are high and high with no `mitigation_by`. No risk has `trigger`, `response`, or `status`. |
| Risk ownership | 4 | One named owner per risk. |
| Dependency status | 3 | D-001 is "committed" by a platform, which is not a party that can commit. No dependency has an `owner`. |
| Timing | 3 | D-002 and D-003 fall on REL-001's own date: "Recorded, not resolved." |

## Blocking defects

None. D-002 and D-003 are one day from a blocking defect.

## How to raise the grade

- **Risk scoring (2 to 4):** Give R-001 and R-002 a `mitigation_by` before 2027-03-31, and every risk a `trigger`, `response`, and `status`.
- **Assumptions (3 to 4):** Add `category`, `evidence`, and `validate_by` to A-001 to A-004, and `validated_by` to A-005.
- **Dependencies and timing (3 to 4):** Name who commits each dependency, add an `owner`, and date D-002 and D-003 so REL-001 can use them.
- **if_false (3 to 4):** Name the requirement and objective ids in A-002 and A-004.

## Notes

- The body says "R1" twice. The release id is REL-001.
