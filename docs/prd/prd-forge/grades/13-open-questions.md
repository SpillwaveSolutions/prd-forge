---
doc: ../13-open-questions.md
score: 79
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why open questions scored 79

The earlier blocking defect is fixed: section 7 now names the questions FR-004, FR-009, FR-010, FR-012, FR-013, and FR-014 wait on. The grader found one more.

| Dimension | Score | Why |
| --- | --- | --- |
| Decider | 3 | Q-005 and Q-008 ask about other people's behavior, which the decider cannot decide. |
| Date | 3 | Q-006 and Q-007 fall on REL-001's own date. |
| Blocks | 4 | Every blocked id exists. |
| Answerability | 3 | Q-009, Q-011, Q-004, and Q-007 each ask more than one thing; Q-009 and Q-010 ask where things live. Q-002 measures from a different start than O-002. |
| Honesty | 3 | The move-or-ship decision for REL-001 has no question. |
| Hygiene | 3 | The body still says Q-010 blocks a `must` on the release line, and that Q-009 touches two stages; it touches four. |

## Blocking defects

- Q-007 blocks ST-004, where FR-010 is `must`, and section 7 does not say FR-010 waits on Q-007.

## How to raise the grade

- **Blocking defect:** Add Q-007 to section 7's list of waits, or correct Q-007's `blocks`.
- **Answerability (3 to 4):** Split the compound questions, rephrase Q-009 and Q-010 as product decisions, time-box Q-006 and Q-007, and align Q-002 with O-002.
- **Honesty (3 to 4):** Add a question on whether REL-001 moves or ships as an experiment, decided by the TR-001 approver before 2027-03-31.
- **Date, decider, hygiene (3 to 4):** Date questions before the release they inform, reword Q-005 and Q-008 as decisions, and correct the stale body claims.
