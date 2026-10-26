---
doc: ../09-nonfunctional-requirements.md
score: 82
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
previous_score: 79
---

# Why non-functional requirements scored 82

This grade replaces an earlier 79 that had no recorded reasons. The document did not change between the two grades.

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | Every target has a quantity and a unit, from "under 20 seconds at p95" (NFR-001) to "zero" (NFR-008, NFR-012). |
| Percentiles | 4 | Every latency target uses percentiles. NFR-001's metric names only the 95th percentile, but its target also sets a p99. |
| Measurement | 3 | Most measurements give a method, a sample size, and a cadence. NFR-002 does not say where the timing is taken. NFR-005 runs only "before release". NFR-008 names no reviewer. NFR-004 gives nothing to compare the recovered share against. |
| Category coverage | 4 | All eight required categories have an entry, and the missing concurrency target is declared a decision. |
| Derivation | 2 | The only derivation works against its own target: it argues a 20-second wait makes the expert stop, and NFR-001's target is 20 seconds. Nothing traces NFR-002, NFR-003, NFR-005, or NFR-011 to a source. |
| No technology | 3 | No vendor or platform is named. "With nothing but a text editor" (NFR-004, NFR-010) fixes the storage format, and "the release pipeline" (NFR-006) assumes delivery infrastructure. |
| Scope | 3 | Some `applies_to` lists do not match their statements: NFR-010 covers only FR-014, NFR-007 leaves out FR-011 and FR-016, NFR-001 leaves out FR-008, and NFR-006 has none. |

## Blocking defects

None. Every target names a quantity, accessibility and retention entries exist, no vendor is named, and every cross-reference resolves.

## How to raise the grade

- **Derivation (2 to 4):** Rewrite the first paragraph under "Where these came from". State the wait PER-001 tolerates and its source. Add one sentence each tracing NFR-002, NFR-003, NFR-005, and NFR-011 to a persona fact, an expert answer, or an open question.
- **Measurement (3 to 4):** Name the reviewer in NFR-008 and NFR-012. Add "from the expert's own side of the conversation" to NFR-002. Change NFR-005 to "before each release". Say what NFR-004 compares against.
- **Scope (3 to 4):** Set NFR-010 to the whole set, add FR-011 and FR-016 to NFR-007, add FR-008 to NFR-001, and give NFR-006 an `applies_to`.
- **No technology (3 to 4):** Replace "with nothing but a text editor" with "by a person with no copy of this product". Replace "in the release pipeline" with "before each release".
- **Not scored:** Q-010 blocks NFR-011, but NFR-011 does not mention Q-010. Note the dependency.
