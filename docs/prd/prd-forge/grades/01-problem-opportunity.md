---
doc: ../01-problem-opportunity.md
score: 71
blocking: 0
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 58
---

# Why problem and opportunity scored 71

| Dimension | Score | Why |
| --- | --- | --- |
| Problem, not solution | 3 | P-001 to P-003 are conditions a user suffers. P-004 is the reverse image of FR-003: "An expert has nowhere to learn what a section of a PRD is for". |
| Named sufferer | 4 | Every problem names a persona that resolves in section 4, and each `who` matches its role. |
| Evidence | 3 | Each problem has one counted, sourced, and dated item. The counts for P-001 to P-003 measure this product's own PRD, and the section says so: "One engagement shows that each problem occurs. It does not show how often." No item counts P-001's "a technology already chosen for reasons they cannot defend". |
| Why now | 2 | Four general trends with no source or date, such as "Specifications are now commonly drafted with an assistant". |
| Cost | 2 | Every cost is qualitative, such as "the guess is discovered at review or in production". |
| Coverage | 3 | Each problem reaches section 7 only through section 3. P-004 maps to O-002, but FR-003, which answers it, serves O-003. No requirement has PER-002 as its user. |

## Blocking defects

None. Each problem now has a counted item with `{claim, source, as_of}`.

## How to raise the grade

- **Evidence (3 to 4):** Add one count from a specification not written with prd-forge. A count independent of the author does more than any other change.
- **Why now (2 to 4):** Give each change a source and a date.
- **Cost (2 to 4):** Put a number on one cost per problem, such as engineer days spent re-deriving a specification.
- **Problem, not solution (3 to 4):** Restate P-004 as the condition the expert suffers.
- **Coverage (3 to 4):** Map P-004 to O-003, or move FR-003 to O-002.

## Notes

- P-001's evidence says "Both were fixed at version 0.2.0" with `as_of: 2026-10-23`, but 0.2.0 is dated 2026-10-26.
- The guide lists `status_quo` and `desired_outcome` for each problem, and no entry has them.
- "Three of the objectives in section 3 still have no baseline" implies more than three. Section 3 has exactly three.
- The evidence uses "commonly" twice. The wording standard bans "many" and "most".
