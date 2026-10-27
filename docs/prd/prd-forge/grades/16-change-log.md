---
doc: ../16-change-log.md
score: 58
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 63
---

# Why the change log scored 58

| Dimension | Score | Why |
| --- | --- | --- |
| Entries | 3 | Every version from 0.1.0 to 0.8.1 has an entry except 0.5.0, and nothing says why. |
| Reader-facing | 3 | 0.3.0 records score movements "with no change to either document". The 0.2.0 table row says only "Every defect the grading and the buildability review found". |
| Section linkage | 3 | 0.2.0 omits section 12, which it changed. 0.3.0 lists sections 5 and 8 with no change. 0.1.0 says "Sixteen sections" and lists fifteen. |
| Approvals | 2 | "None sought." No approver is named, although the root names PER-003. |
| Conditions | 2 | No approval with conditions exists, so none is recorded. |
| Versioning | 1 | 0.8.1 is a patch that adds stage ST-009 and moves four items between sections; the guide asks for a minor bump for new content. 0.2.0 changed the golden thread with a minor bump; the guide asks for a major one. |

## Blocking defects

None.

## How to raise the grade

- **Versioning (1 to 4):** Reissue 0.8.1 as 0.9.0, or state the versioning policy before 1.0 in the log, including whether a golden-thread change takes the set to 1.0. That is the expert's decision.
- **Approvals (2 to 4):** Name PER-003 as the approver who will be asked. A 4 needs a recorded approval.
- **Entries (3 to 4):** Say that 0.5.0 changed the plugin and not this PRD.
- **Reader-facing (3 to 4):** Drop the 0.3.0 score sentence, open 0.8.1 with what changed, and rewrite the 0.2.0 row.
- **Section linkage (3 to 4):** Add 12 to 0.2.0, fix 0.3.0's sections, and say "sixteen section documents across fifteen sections".

## Notes

- "Two findings were checked and rejected" uses the approval word "rejected" for grading findings. "Dismissed" avoids the clash.
- Two body headings use an em dash.
