---
doc: ../09-nonfunctional-requirements.md
score: 86
blocking: 0
graded: 2026-11-25
grader: prd-forge:prd-adversary
previous_score: 89
---

# Why non-functional requirements scored 86

The independent adversarial grade was 24 of 28 points. NFR-001 now gives the
expert's evidence for a five-second p95 wait. The main uncertainty across the
section is the size of the workload a real customer needs.

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | All twelve entries give quantities. For NFR-012, the metric counts “ways to read a set” and the target is zero. |
| Percentiles | 4 | NFR-001 specifies “at most 5 seconds at p95, and under 60 seconds at p99.” NFR-002 specifies p95 for grading and NFR-011 gives both percentiles for resumption. |
| Measurement | 3 | NFR-001 defines the clock, observation point, sample and release window. NFR-003 promises that “every target in this section still holds,” but running the large set “through every function in section 7” leaves the quality checks to repeat unspecified. |
| Category coverage | 4 | All eight required categories have entries. NFR-006 covers the golden-thread path and NFR-010 covers the full period the organization keeps a set. |
| Derivation | 2 | “Rick described five seconds as tolerable” supports NFR-001's p95. The previous requirement supplies the p99 limit. NFR-003 gives “120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms” without identifying a customer set of that size. |
| No technology | 4 | “WCAG 2.2 AA” is an acceptance standard. A screen reader and a text editor are generic measurement tools. |
| Scope | 3 | NFR-001 measures “the next question or the drafted section appearing,” but its functional references cover questions and omit FR-008 for reading the draft. NFR-006 names “the golden-thread path” only in its prose and target. |

## Blocking defects

None. Every target gives a quantity, every measurement describes a procedure
someone can run, and NFR-006 and NFR-010 cover accessibility and retention.
No requirement selects a technology, platform or vendor.

## How to raise the grade

- **Derivation (2 to 4).** Ask which actual PRD represents the largest set either customer segment needs, then use its counts to justify NFR-003.
- **Measurement (3 to 4).** Name the quality checks and observations to repeat at that scale.
- **Scope (3 to 4).** Link NFR-001 to the draft-reading capability and identify the golden-thread scope in NFR-006's structured references.
