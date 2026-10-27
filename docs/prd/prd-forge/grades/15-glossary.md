---
doc: ../15-glossary.md
score: 75
blocking: 3
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 70
---

# Why glossary scored 75

## Weakest dimension

Consistency: engagement and review are used in senses the glossary rules out.

## Blocking defects

- FR-012 and ST-005 say "the review" for the buildability review, and the Review entry excludes that meaning.
- Epic departs from its source and gives no reason.
- Indicative names a front-matter field, `date_status`, which is how the set is stored.

## How to raise the grade

- **Blocking:** Say "buildability review" in FR-012 and ST-005, give Epic's reason, and drop the field name from Indicative.
- **Consistency (2 to 4):** Use engagement in one sense across the set.
