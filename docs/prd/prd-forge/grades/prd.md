---
doc: ../prd.md
score: 75
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why the root scored 75

| Dimension | Score | Why |
| --- | --- | --- |
| Problem clarity | 3 | It names the sufferer, "A domain expert knows exactly what their product must do", but the cost falls on another party: "so the team that has to build it cannot." |
| Users | 4 | Domain experts, engineering leads, and sponsors all resolve to PER-001, PER-002, and PER-003 in section 4. |
| Why now | 2 | "Teams now expect to work from a written specification an assistant helped produce" is plausible, with no date and no source. |
| Bet | 3 | Two outcomes joined by "and". No stage of J-001 has an engineering lead confirming buildability: ST-005's actor is the domain expert and ST-006's is the sponsor. |
| Measure | 2 | "80% by 2027-09-30, from a baseline Q-001 will establish" has a target and no value for today, and O-001 says not to set a target until Q-001 is answered. |
| Linkage | 4 | All 17 section documents are in `links.children` in order, and `golden_thread: J-001` resolves. |

## Blocking defects

None. The grader checked each one by name: no technology in the summary, the golden thread is set, every section document is a child, and the measure has a digit.

## How to raise the grade

- **Problem clarity (3 to 4):** State what the gap costs the domain expert, in time, rework, or delay, or route that cost to an open question.
- **Why now (2 to 4):** Name the specific change, with a date or a source, that makes this urgent now. If none exists, record it as an open question.
- **Bet (3 to 4):** Reduce the bet to the one outcome J-001 delivers, such as an approved PRD whose buildability gaps are closed or owned.
- **Measure (2 to 4):** Answer Q-001 for today's value. Until then, make the summary and O-001 agree on whether the 80% target stands.

## Notes

- The body still says "Version 0.2.0 fixes them". That history belongs in section 15 and is out of date at 0.8.0.
- `stakeholders` does not list the sponsor, although `approvers: [PER-003]` does.
- The body uses an em dash.
