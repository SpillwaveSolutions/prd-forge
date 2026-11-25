---
doc: ../04-personas.md
score: 86
blocking: 0
graded: 2026-11-25
grader: prd-forge:prd-adversary
previous_score: 82
---

# Why users and personas scored 86

The independent grader awarded 24 of 28 points.

| Dimension | Score | Why |
| --- | --- | --- |
| Role naming | 3 | “Engineering lead (staff or principal engineer)” specifies seniority. “Delivery lead (delivery manager or product owner) on the development team” specifies the role and team but leaves seniority open. |
| Goals | 3 | “Stop being asked the same question by four different engineers” reads like a goal in the expert's own words. The recorded basis is “Assumed, not researched.” Interviews have yet to confirm that wording. |
| Pains | 4 | “Gaps between two requirements that both looked complete” traces to P-002. Testability and technology choices trace to P-001, and the sponsor's uncertainty about readability traces to P-003. |
| Frequency | 3 | “Three working sittings a week of 1 to 2 hours each, for one to three weeks per PRD” permits three sittings. The same field gives “about 6 to 9 sittings per PRD.” The delivery lead's “plus refinement” has no count. |
| Authority | 4 | PER-002 “judges whether a set can be built from and reports the gaps, under TR-006.” The sponsor, expert and delivery lead also have matching decision rights in section 10. |
| External users | 3 | “A client lead who reads the set cold and records the buildability verdict is an external user.” That lead owns ST-009. The containing journey, J-002, belongs to the delivery lead. |
| Count | 4 | Section 4 names four personas. Section 5 gives all four a stage in J-001 or J-002. |

## Blocking defects

None. Every persona appears in a journey. Both journeys and all 23 functional
requirements identify a user among the four personas. The segments and journeys
identify no external user missing from section 4. Every section 10 decision
holder has an authority field. The grader found no excluded implementation detail.

## How to raise the grade

- In PER-001's frequency, confirm the number of sittings for a one-week PRD and reconcile the range with the weekly rate. D-002 counts experts while the persona basis counts sittings.
- Confirm the wording of the personas' goals in the planned interviews.
- Establish the delivery lead's seniority and refinement frequency.
- Check with a client lead whether they perform any other journey stages beyond ST-009.

## Question for the expert

For a PRD the expert finishes in one week, how many working sittings should the team plan for?
