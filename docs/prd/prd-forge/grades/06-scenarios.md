---
doc: ../06-scenarios.md
score: 75
blocking: 2
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why scenarios scored 75

| Dimension | Score | Why |
| --- | --- | --- |
| Concreteness | 3 | SC-001, SC-002, SC-005, and SC-007 carry real values. SC-004's "a requirement names a component" and SC-006's "the metric they have just named" name nothing. |
| Bound to a journey | 4 | Every scenario names J-001, a real stage, and PER-001. |
| One goal | 3 | SC-004 holds two outcomes: the finding is dropped, or the dissent is recorded. |
| Variant coverage | 3 | No unhappy path has `branches_from`, and nothing covers a reject or conditions at ST-006. |
| Outcome testability | 2 | "the expert does not feel overruled" (SC-003) and "The expert knows exactly what a builder cannot build" (SC-005). |
| User's view | 3 | Some SC-004 steps describe the system: "The finding is checked against the document rather than defended". |
| First use, return, and concurrency | 3 | SC-007 is first use and SC-002 is a return. No scenario is concurrent, and none sets `situation`. |
| Lifecycle | 2 | LC-001 only moves forward, yet SC-005 changes sections that are at review. |
| Priority | 4 | Every scenario has a priority, and every `must` sits on the release line. |

## Blocking defects

- SC-003's expected outcome cannot be judged pass or fail: "and the expert does not feel overruled."
- SC-005's expected outcome cannot be judged pass or fail: "The expert knows exactly what a builder cannot build before anyone has estimated".

## How to raise the grade

- **Outcome testability (2 to 4):** Replace the two inner states with what the expert sees, such as "the report names both uncovered stages and quotes all three requirements".
- **Lifecycle (2 to 4):** Add moves back from review and final to draft, each with `rule` and `by`, and a retired state or a reason there is none. That is the expert's decision.
- **Variant coverage (3 to 4):** Add `branches_from` to the unhappy paths, and add the reject and conditions cases at ST-006.
- **One goal (3 to 4):** Split SC-004 into the finding dropped and the finding kept with the dissent recorded.
- **Concurrency (3 to 4):** Add a `concurrent` scenario, such as the set changed outside the view the expert is reading (FR-018), and set `situation` on SC-002 and SC-007.
- **Concreteness and user's view (3 to 4):** Name the requirement and the word in SC-004, the metric in SC-006, and write SC-004's steps as what the expert sees.

## Notes

- SC-002 sits at ST-004, but FR-015, the requirement it exercises, is at ST-001.
- SC-001 asks one question at a grade of 78 with no blocking defects, and FR-010 asks one only under 70 or with a blocking defect.
