---
doc: ../16-change-log.md
score: 63
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why the change log scored 63

| Dimension | Score | Why |
| --- | --- | --- |
| Entries | 3 | The list jumps from 0.4.0 to 0.6.0 with no word on 0.5.0, and three entries are dated after the section's `updated`. |
| Reader-facing | 3 | The 0.2.0 row says "Every defect the grading and the buildability review found", which tells a reader nothing that moved. |
| Section linkage | 3 | 0.3.0 lists sections 5 and 8 "with no change to either document". 0.1.0 says "sixteen sections" and lists fifteen. |
| Approvals | 2 | "None sought." It does not say who will approve or when. |
| Conditions | 2 | No conditions, because no approval yet. |
| Versioning | 2 | 0.2.0 changed J-001's goal with a minor bump, and the guide asks for a major bump when the golden thread changes. |

## Blocking defects

None.

## How to raise the grade

- **Versioning (2 to 4):** Bump the major version for a golden-thread change, or record that the rule starts at 1.0. That is the expert's decision.
- **Approvals (2 to 4):** Name PER-003 as the approver who will be asked, and the version and date. It reaches 4 only with a recorded approval.
- **Entries (3 to 4):** Say why 0.5.0 has no entry. The 0.5.x releases changed the plugin and not this PRD.
- **Reader-facing and linkage (3 to 4):** Rewrite the 0.2.0 row, fix 0.3.0's sections, and say fifteen sections.

## Notes

- Approvals and conditions are capped because the set is a draft. Without them, the score is 69.
