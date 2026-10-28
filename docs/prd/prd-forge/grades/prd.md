---
doc: ../prd.md
score: 83
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why the root document scored 83

| Dimension | Score | Why |
| --- | --- | --- |
| Problem clarity | 4 | Names the problem, who has it, and its cost. |
| Users | 4 | Four roles, each a persona. |
| Why now | 3 | A level, not a change, and the source is trimmed against section 1's quotation. |
| Bet | 3 | The front matter and the prose give the bet different subjects. |
| Measure | 2 | No baseline, and no rule for fewer than 5 pilot PRDs. |
| Linkage | 4 | All 17 section files are in `links.children`, and the golden thread resolves. |

## Blocking defects

None.

## Weakest dimension

Measure. It has no baseline and no rule for fewer than 5 pilot PRDs.

## How to raise the grade

- **Measure (2 to 3, then 4 with Q-001):** Say what happens with fewer than 5 pilot PRDs by 2027-09-30, and record the baseline when Q-001 is answered.
- **Why now (3 to 4):** Quote the source exactly, and state a change with its date.
- **Bet (3 to 4):** Use one subject in `summary.bet` and the prose, and state the outcome as what the person gets.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- `summary.measure` drops "the first 5" and "by people other than the product's author" from the prose definition of a pilot PRD. The block now shows the looser version in the body.
