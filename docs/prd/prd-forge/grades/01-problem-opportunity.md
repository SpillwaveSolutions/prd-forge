---
doc: ../01-problem-opportunity.md
score: 58
blocking: 4
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why problem and opportunity scored 58

| Dimension | Score | Why |
| --- | --- | --- |
| Problem, not solution | 3 | P-001 to P-003 are conditions a user suffers. P-004 is the product's absence written as a problem: "An expert has nowhere to learn what a section of a PRD is for". |
| Named sufferer | 4 | Every problem names a persona, and all four resolve in section 4. |
| Evidence | 0 | Assertion only. The section says so itself: "The evidence above describes a pattern, not a measurement. No figure here is sourced." |
| Why now | 2 | Generic urgency with no source or date, such as "Specifications are now commonly drafted with an assistant". |
| Cost | 2 | Every cost is qualitative, such as "the guess is discovered at review or in production". None is in money, time, or risk. |
| Coverage | 3 | Each problem reaches section 7 only through section 3. P-002's sufferer, PER-002, is the user of no requirement. |

## Blocking defects

- P-001's evidence is opinion with nothing countable: "Specifications arriving at delivery teams are commonly feature lists".
- P-002's evidence is reasoning with nothing countable: "A specification with no user journey gives a story-mapping workshop no backbone".
- P-003's evidence is reasoning with nothing countable: "Approval is given on readability and completeness of headings".
- P-004's evidence is reasoning with nothing countable: "Templates name the sections and not their purpose".

## How to raise the grade

- **Evidence (0 to 4):** Give each problem at least one counted item, as `{claim, source, as_of}`, such as "N of M specifications, in a named period". One counted case from a real engagement clears the blocking defect.
- **Problem, not solution (3 to 4):** Restate P-004 as the condition the expert suffers, not as the absence of a place to learn.
- **Why now (2 to 4):** Give each change a source and a date.
- **Cost (2 to 4):** Put a number on one cost per problem, such as engineer hours spent re-deriving a specification, or route it to an open question.
- **Coverage (3 to 4):** Trace a requirement to P-002 with PER-002 as its user, for example through the buildability review in FR-012.

## Notes

- P-001's evidence holds an instruction to the reader, "Quantify this from your own intake before you rely on it". That belongs in an open question.
- The body uses an em dash.
