---
doc: ../04-personas.md
score: 68
blocking: 1
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why users and personas scored 68

| Dimension | Score | Why |
| --- | --- | --- |
| Role naming | 2 | Job titles with no organization or seniority, and one name joins two roles: "Sponsor or approver". |
| Goals | 4 | Goals in the persona's own voice, such as "Walk into the workshop with a backbone already agreed". |
| Pains | 3 | Specific pains, but no persona has `problems`, and PER-004's pains trace to no problem in section 1. |
| Frequency | 2 | Adjectives, not counts: "Reads a given PRD a handful of times, intensively". No persona has `population`. |
| Authority | 4 | Every persona states it, and section 10 uses all four. |
| External users | 1 | No persona has `external`, and the section never says whether the sponsor sits inside or outside the buyer's organization. |
| Count | 3 | Four personas, but PER-002 appears in no journey. |

## Blocking defects

- PER-002, the engineering lead, appears in no journey in section 5. It is no stage's actor and no journey's persona, and J-002 belongs to the delivery lead.

## How to raise the grade

- **External users (1 to 4):** Set `external` on every persona. If a role is external, give it a journey or say why it needs none.
- **Role naming (2 to 4):** Add the organization and seniority to each name, and split "Sponsor or approver" or say they are one person.
- **Frequency (2 to 4):** Replace "intensively" and "a handful" with counts, and add `population`.
- **Pains (3 to 4):** Add `problems` to every persona, and trace PER-004's pains to a problem.
- **Count (3 to 4):** Give PER-002 a stage in a journey, or remove the persona. That is the expert's decision.

## Notes

- The body's "Who is deliberately not a persona" list belongs in `non_personas`.
- The body uses an em dash.
