---
doc: ../16-change-log.md
score: 63
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 58
---

# Why change log scored 63

| Dimension | Score | Why |
| --- | --- | --- |
| Entries | 3 | Versions run 0.4.0 then 0.6.0, and the log never says why 0.5.0 has no entry. |
| Reader-facing | 3 | 0.3.0 still reports score movements. The 0.2.0 row still says only "Every defect the grading and the buildability review found". 0.8.1 and 0.9.0 open with the grading process, not with what changed. |
| Section linkage | 3 | 0.3.0 lists sections 5 and 8 "with no change to either document". 0.1.0 says sixteen sections and lists fifteen. |
| Approvals | 2 | "None sought." The log does not name PER-003 as the approver who will be asked. |
| Conditions | 2 | No approval exists, so no condition exists. |
| Versioning | 2 | The policy exists, but it does not say whether a release-line change takes the set to the next major version, as the guide requires. |

## Blocking defects

- The 0.9.0 entry and the policy name a component and a data model: "The plugin's constraints schema accepts an empty list" and "The set and the plugin share one version number."

## How to raise the grade

- **Exclusion list:** Write "The constraints section may now be empty" and "The set and the product share one version number."
- **Versioning (2 to 4):** Say whether a release-line change is a major version.
- **Entries (3 to 4):** Say that 0.5.0 changed the product and not this PRD.
- **Reader-facing and linkage (3 to 4):** Drop the 0.3.0 score sentence, fix its sections, rewrite the 0.2.0 row, and say "sixteen section documents across fifteen sections".

## Notes

- "Two findings were checked and rejected" uses the approval word for grading findings. "Dismissed" avoids the clash.
- The policy maps 0.8.1 to "0.9.0", a number that now names a different release.
