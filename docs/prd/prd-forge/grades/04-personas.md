---
doc: ../04-personas.md
score: 68
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 68
---

# Why users and personas scored 68

The blocking defect is gone: PER-002 is now the actor of ST-009 in J-002.

| Dimension | Score | Why |
| --- | --- | --- |
| Role naming | 2 | Job titles with no organization or seniority, and one joins two roles: "Sponsor or approver". |
| Goals | 4 | In the persona's voice: "Stop being asked the same question by four different engineers". |
| Pains | 3 | Specific, but no persona has `problems`, so the link to section 1 is never recorded. |
| Frequency | 2 | "Reads a given PRD a handful of times, intensively"; no `population`. |
| Authority | 3 | Stated for all four, but the body table contradicts the front matter on PER-001. |
| External users | 1 | No persona has `external`, although segment S-001 works from "client domain knowledge". |
| Count | 4 | Four personas, each in a journey. |

## Blocking defects

None.

## How to raise the grade

- **External users (1 to 4):** Set `external` on every persona, and say which roles sit with the client in a consultancy engagement.
- **Role naming and frequency (2 to 4):** Add organization and seniority, split "Sponsor or approver", and give counts and `population`.
- **Pains (3 to 4):** Add `problems` and `basis` to each persona.
- **Authority (3 to 4):** Make the body table match the front matter and TR-001.
