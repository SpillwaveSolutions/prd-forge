---
doc: ../16-change-log.md
score: 79
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 63
---

# Why change log scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Entries | 3 | The table jumps from 0.6.0 to 0.4.0, and nothing says why 0.5.0 has no entry. |
| Reader-facing | 3 | The 0.2.0 row still says only "Every defect the grading and the buildability review found". 0.3.0 reports score movements. 0.9.0 opens with the process, not the change. |
| Section linkage | 3 | 0.2.0 omits section 12. 0.3.0 lists sections 5 and 8 "with no change to either document". 0.1.0 says sixteen sections and lists fifteen. |
| Approvals | 4 | None sought, and the rule is stated. Nothing exists to judge. |
| Conditions | 4 | No approvals, so no conditions. Nothing exists to judge. |
| Versioning | 2 | The policy omits the release-line trigger the guide requires, and the history breaks it at 0.2.0 and 0.8.1. |

## Blocking defects

- The policy names the delivery mechanism: "A minor version, such as 0.8 to 0.9, is for new content in the set or in the plugin." No other document in the set says "plugin".

## How to raise the grade

- **Exclusion list:** Write "product" in place of "plugin".
- **Versioning (2 to 4):** Say whether a release-line change is a major version, and say that a change that does not change what a reader understands gets no version.
- **Entries (3 to 4):** Say that 0.5.0 changed the product and not this PRD.
- **Reader-facing and linkage (3 to 4):** Rewrite the 0.2.0 row, drop the 0.3.0 score sentence, add section 12 to 0.2.0, and say "sixteen section documents across fifteen sections".

## Notes

- The 0.9.0 entry does not say who decided that C-004 leaves section 9.
