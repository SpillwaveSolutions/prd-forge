---
doc: ../09-nonfunctional-requirements.md
score: 86
blocking: 0
graded: 2026-11-25
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why non-functional requirements scored 86

The independent grading pass awarded 24 of 28 points. The requirement
separates question latency from draft latency. The largest uncertainty is
the workload either customer segment actually needs.

| Dimension | Score | Why |
| --- | --- | --- |
| Numbers | 4 | All twelve targets have a quantity. NFR-012 counts read paths outside the organization’s access rules and sets a target of zero. |
| Percentiles | 4 | NFR-001 requires “Next question at most 5 seconds at p95” and “Section draft at most 20 seconds at p95.” Each outcome has its own p99 check. Grading and recovery also have percentile targets. |
| Measurement | 3 | NFR-001 defines both clocks and reporting groups. NFR-005 calls for “Observed sittings with 10 first-time experts” but leaves open whether an abandoned section counts in the denominator. |
| Category coverage | 4 | All eight core categories have entries. The scale rationale assigns concurrent use to the session. |
| Derivation | 2 | NFR-001 traces the question ceiling to the expert and records why the draft ceiling is provisional. NFR-003 gives “120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms” without an observed set or expert source for those quantities. |
| No technology | 4 | NFR-006 sets an accessibility conformance target. The requirements prescribe no platform or vendor. |
| Scope | 3 | NFR-007 applies to “FR-009” and promises reconstruction of grades for “any section at review or better.” FR-011 also produces grades when the expert requests re-grading. |

## Blocking defects

None. All targets have a quantity and a runnable measurement. NFR-006
covers accessibility and NFR-010 covers retention. The requirements
prescribe no implementation technology.

## How to raise the grade

- **Derivation (2 to 4).** Compare NFR-003 with the largest PRD either customer segment has actually produced. Record its requirements, journeys, stages per journey and glossary terms.
- **Measurement (3 to 4).** Specify how abandoned sections contribute to NFR-005’s completion rate.
- **Scope (3 to 4).** Account for grades produced by FR-011 in NFR-007.
