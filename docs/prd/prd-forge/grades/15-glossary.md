---
doc: ../15-glossary.md
score: 55
blocking: 2
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 55
---

# Why glossary scored 55

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | Persona, Release, and Id are new. Scenario, decision rule, story-mapping workshop, backbone, vocabulary, engineer, and question list have no entry. |
| Author's voice | 3 | Most entries argue their point. Epic, Link, and Decider read like a dictionary. |
| Disambiguation | 3 | 33 of 64 entries carry `not`. Epic, Risk, Release, Gap, and Scope have none, and State has none although the body table pairs it with Threshold. |
| Consistency | 2 | State says a section reaches `review` at 70, and FR-011 says it is offered. The table calls Score "A verdict", which is a defined term. Non-goal uses "condition", which only an approver states. Persona says "decision rule", and section 10 says "trust rules". |
| Authority | 1 | No entry has `source` or `unverified`, and `wont` is never defined. |

## Blocking defects

- FR-015's acceptance uses "vocabulary", and the glossary does not define it. A tester cannot judge "the vocabulary in use is unchanged".
- FR-012's acceptance uses "an engineer who was not in the interview", and the glossary does not say who that is. ST-005 says "a builder" for the same person.

## How to raise the grade

- **Coverage (2 to 4):** Define Vocabulary and Engineer, and use one word for the person who builds. Add the other missing terms.
- **Consistency (2 to 4):** Align State with FR-011, and use defined terms only in their defined sense.
- **Authority (1 to 4):** Cite MoSCoW, Given/When/Then, epic, story, and spike, and define `wont`.

## Notes

- The body's count of "test 5" citations is out of date.
