---
doc: ../16-change-log.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why change log scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Entries | 3 | The table jumps from 0.6.0 to 0.4.0, and nothing says why 0.5.0 has no entry. |
| Reader-facing | 3 | 0.9.0 opens with the process. 0.3.0 reports score movements. The 0.2.0 row says only "Every defect the grading and the buildability review found". |
| Section linkage | 3 | 0.1.0 says sixteen sections and lists fifteen. 0.3.0 lists sections 5 and 8 "with no change to either document". |
| Approvals | 4 | None sought, and the rule is stated. Nothing exists to judge. |
| Conditions | 4 | No approvals, so no conditions. Nothing exists to judge. |
| Versioning | 2 | The policy now covers the release line and the golden thread. The history breaks it at 0.2.0 and 0.8.1, and 0.9.0 takes in content added after its own grading. The patch rule differs from the guide's. |

## Blocking defects

None. "Plugin" no longer appears.

## How to raise the grade

- **Versioning (2 to 4):** Match the patch rule to the guide's, and say that a change that does not change what a reader understands gets no version.
- **Entries (3 to 4):** Say that 0.5.0 changed the product and not this PRD.
- **Reader-facing and linkage (3 to 4):** Open 0.9.0 with what changed, rewrite the 0.2.0 row, drop the 0.3.0 score sentence, and fix the 0.1.0 and 0.3.0 section lists.

## Notes

- If C-004's move answered an open question, that question's id belongs in `resolves`.
