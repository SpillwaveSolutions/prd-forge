---
doc: ../08-wireframes.md
score: 91
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 91
---

# Why wireframes scored 91

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 4 | All ten screen and report requirements are illustrated. |
| Traceability | 4 | Every sketch names its requirements, persona, and stage. |
| The person's view | 2 | No ST-003 sketch lets the expert accept or refute the grade, and WF-010 resumes at the wrong section by FR-015's rule. |
| Real content | 3 | WF-008's "ST-003" means the dispatcher's stage three, and WF-001 cites Q-009 where FR-017 cites none. |
| Marks explained | 4 | Every sketch's marks match its `shows` count. |
| No design | 4 | No color, font, platform, or vendor. |
| States | 4 | Empty, exception, and return states are drawn. |
| Every control earns its place | 4 | Each control traces to a requirement. |

## Blocking defects

None.

## Weakest dimension

The person's view. The golden-thread decision at ST-003 is never drawn.

## How to raise the grade

- **The person's view (2 to 4):** Add the accept-or-refute ask to WF-003, and make WF-010 obey FR-015 and SC-002.
- **Real content (3 to 4):** In WF-008, write "stage three". In WF-001, use the ID that FR-017 cites.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The block lists each `shows` entry as a numbered line, so each line maps to its mark.
