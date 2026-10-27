---
doc: ../13-open-questions.md
score: 79
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why open questions scored 79

| Dimension | Score | Why |
| --- | --- | --- |
| Decider | 3 | Every entry names one person, but Q-004, Q-005, and Q-008 ask about other people's behavior, which a research finding answers, not a decision. |
| Date | 3 | Q-007 and Q-006 are due 2027-03-31, the same day as REL-001's target date. They are not after it, but they are not before it either. |
| Blocks | 4 | Every id in `blocks` exists. |
| Answerability | 3 | Q-004, Q-007, Q-009, and Q-011 each hold two or three questions. Q-006 and Q-007 have no time box. Q-002 measures from "a product idea", but O-002 measures from "the first interview question". |
| Honesty | 3 | The release plan's "Either REL-001 moves, or it ships knowingly as an experiment" is an undecided decision with no question. |
| Hygiene | 3 | The body says Q-009 blocks "four requirements", but its `blocks` lists five. It says all of Q-009 to Q-011 block `must` requirements, but Q-010 blocks only a `should` and an NFR outside REL-001. |

## Blocking defects

None. Section 7 now says that FR-010 waits on Q-007.

## How to raise the grade

- **Answerability (3 to 4):** Split each compound question, give every spike a time box, and align Q-002's start event with O-002.
- **Honesty (3 to 4):** Add a question for the REL-001 schedule decision, with the sponsor by name and a date.
- **Hygiene (3 to 4):** Make the body's counts match the front matter.
- **Date (3 to 4):** Move Q-006 and Q-007 before REL-001's target date.

## Notes

- Q-001 to Q-003 arrive on the day REL-001's exit criteria need them, too late to compare against.
