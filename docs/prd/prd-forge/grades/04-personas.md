---
doc: ../04-personas.md
score: 82
blocking: 0
graded: 2026-10-30
grader: prd-forge:prd-adversary
previous_score: 89
---

# Why users and personas scored 82

Graded at 0.12.0, after PER-001's authority began to include TR-015. The grade
fell from 89 because this pass read section 2 against PER-002's `external` flag.
The body table's PER-001 row, which left out the new right, was fixed in the
same version.

| Dimension | Score | Why |
| --- | --- | --- |
| Role naming | 3 | PER-001 is a senior product manager who does not know the word "persona", and PER-004 has no seniority. |
| Goals | 4 | Every goal is in the persona's own words. |
| Pains | 3 | PER-004's pain about untraceable stories traces to no problem in section 1. |
| Frequency | 3 | 3 sittings a week for 1 to 3 weeks gives 3 to 9 sittings, not 6 to 9, and the time away has three values. |
| Authority | 4 | Every persona states authority, and section 10 uses it, TR-015 included. |
| External users | 2 | Section 2's S-001 quote hands the PRD to the client's engineers, which makes PER-002 external. |
| Count | 4 | Four personas, each in section 5. |

## Blocking defects

None.

## Weakest dimension

External users. Section 2 says the client's engineers build from the set, and
this section says no persona is external.

## How to raise the grade

- Decide whether the engineering lead in a client contract is the consultancy's
  or the client's. If it is the client's, set PER-002 to external.
- Fix the sittings arithmetic, and use one value for the time away.
- Trace PER-004's untraceable-stories pain to a problem in section 1.
