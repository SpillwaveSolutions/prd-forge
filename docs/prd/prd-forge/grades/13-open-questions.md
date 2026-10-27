---
doc: ../13-open-questions.md
score: 79
blocking: 1
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why open questions scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Decider | 3 | One decider in the front matter, but the body table says "R. Hightower + 3 sponsors". Q-005 and Q-008 ask about other people's behavior, which no decider can decide. |
| Date | 3 | Q-001 to Q-003, Q-006, and Q-007 fall on REL-001's own date, not before it. |
| Blocks | 4 | Every blocked id exists. |
| Answerability | 3 | Q-009 and Q-011 each ask three things. Q-009 and Q-010 ask where things live, which is a design choice. Q-006 and Q-007 have no time box. |
| Honesty | 3 | The REL-001 schedule clash in sections 11 and 13 has no question, decider, or date. |
| Hygiene | 3 | The body says Q-010 blocks a `must` requirement on the release line, and FR-015 is now `should`. It also miscounts Q-009's requirements and stages. |

## Blocking defects

- Six `must` requirements depend on unanswered questions, and section 7 does not say so: FR-004, FR-009, FR-010, and FR-012 wait on Q-009, FR-013 on Q-005, and FR-014 on Q-011.

## How to raise the grade

- **Blocking defect:** In section 7, name the question each of the six requirements waits on.
- **Hygiene (3 to 4):** Rewrite "The three that matter most" against the 0.8.0 priorities, and make the table's decider column match the front matter.
- **Honesty (3 to 4):** Add a question on whether REL-001 moves or ships as an experiment, decided by the TR-001 approver before 2027-03-31.
- **Answerability (3 to 4):** Split the compound questions, move the "where it lives" parts to the candidate architecture list, and time-box Q-006 and Q-007.
- **Date (3 to 4):** Date the questions before the release they block.
- **Decider (3 to 4):** Reword Q-005 and Q-008 as decisions the decider owns.

## Fixed after this grade

- The body table's decider column now names one decider for Q-005 and Q-008, as the front matter does. The 0.8.0 change caused the mismatch.
