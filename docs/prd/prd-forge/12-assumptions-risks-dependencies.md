---
id: prd-forge-assumptions-risks-dependencies
kind: assumptions-risks-dependencies
schema: prd-forge/assumptions-risks-dependencies@1
title: Assumptions, risks and dependencies
status: draft
updated: 2026-10-27
domain: product management tooling
section: 11
order: 120
score: 88
blocking: 0
graded: 2026-10-27
assumptions:
  - id: A-001
    assumption: >-
      A domain expert will answer fifty to a hundred questions about their own
      field across a few sittings, if each one is clearly worth answering.
    if_false: >-
      The whole method fails. The product would have to produce a usable partial
      PRD from perhaps fifteen answers, which changes sections 5, 6 and 7
      completely and makes the grading thresholds meaningless.
    validated_by: >-
      Observed sittings with 10 first-time experts, counting where they stop, the
      same sittings NFR-005 uses (D-002).
    owner: Richard Hightower
    category: usability
    evidence: none
    validate_by: 2027-02-28
  - id: A-002
    assumption: >-
      An expert will act on a grade they did not produce, rather than dismissing it.
    if_false: >-
      The grading is decoration, and O-001 to O-003 and FR-009 to FR-011 measure
      something nobody uses. The product reduces to a structured interview.
    validated_by: >-
      In the same observed sittings, whether the expert answers the one question or
      moves on regardless (D-002).
    owner: Richard Hightower
    category: value
    evidence: some
    validate_by: 2027-02-28
  - id: A-003
    assumption: >-
      An engineering lead will accept a PRD that names no technology, rather than
      reading the absence as incompleteness.
    if_false: >-
      Test 5 becomes a liability rather than a discipline, and the candidate
      architecture decisions list in FR-007 has to become a first-class output
      rather than a hand-over note.
    validated_by: >-
      Three engineering leads reading a completed set cold and saying what they
      would ask for first (D-003).
    owner: Richard Hightower
    category: usability
    evidence: none
    validate_by: 2027-02-28
  - id: A-004
    assumption: >-
      Organizations will let a PRD for their product be drafted inside an
      assistant session.
    if_false: >-
      The separate-application non-goal in section 6 and A-005 are unacceptable
      as written and the delivery model has to change, which invalidates FR-002,
      FR-015, and FR-018, because each assumes the expert's own session.
    validated_by: >-
      The information security review of the first three client contracts.
    owner: Richard Hightower
    category: viability
    evidence: none
  - id: A-005
    assumption: >-
      Organizations accept that the domain content an expert enters stays in the
      expert's own session and in the documents. This product sends it nowhere
      else and keeps it nowhere else.
    if_false: >-
      An organization whose information policy needs more than this cannot adopt
      the product as written, and NFR-008, NFR-010, and NFR-012, which are
      measured against this boundary, have to change.
    validated_by: >-
      The information security review of the first three client contracts,
      the same review that tests A-004.
    owner: Richard Hightower
    category: viability
    evidence: none
    validate_by: 2027-03-15
risks:
  - id: R-001
    risk: >-
      The expert accepts a weak PRD because the score was high. The grade becomes
      false assurance, which is worse than no grade.
    likelihood: high
    impact: high
    mitigation: >-
      Blocking defects are counted and reported separately from the score and no
      score clears them (FR-009); the non-goal in section 6 says explicitly that a
      grade is evidence, not a warrant; FR-012 puts a buildability verdict in front
      of the expert before approval.
    owner: Richard Hightower
    trigger: >-
      An expert approves a set with a high score while its buildability review
      still reports a gap that is neither closed nor owned.
    response: reduce
    mitigation_by: 2027-01-31
    status: open
  - id: R-002
    risk: >-
      The grading reports findings that are not in the document. The expert catches
      one, stops trusting all of them, and the grading becomes noise they skip.
    likelihood: high
    impact: high
    mitigation: >-
      Every finding must quote the document, and anything unsupported is dropped
      before the expert sees it (FR-016, TR-003, TR-006); a refuted finding the
      document does not support is acknowledged as dropped rather than defended (SC-004).
    owner: Richard Hightower
    trigger: >-
      An expert refutes a finding and the document does not support it.
    response: reduce
    mitigation_by: 2027-01-31
    status: open
  - id: R-003
    risk: >-
      A fluent, well-structured, well-graded PRD is produced for the wrong product,
      and the structure makes the error harder to see rather than easier.
    likelihood: medium
    impact: high
    mitigation: >-
      Section 3 asks what would move the objectives without this product at all;
      section 1 requires evidence per problem and names what is unmeasured. Neither
      is sufficient, and this risk is not closed. A reader should say so.
    owner: Richard Hightower
    trigger: >-
      A sponsor or an engineering lead says that an approved set specifies the
      wrong product.
    response: reduce
    status: open
  - id: R-004
    risk: >-
      The interview is too long to finish, so sets are abandoned half-written and
      the product is remembered as the thing that asked a hundred questions.
    likelihood: medium
    impact: medium
    mitigation: >-
      FR-005 lets the expert end any section and records what was left; FR-015
      makes resumption cheap; the working order in the method, which Q-007 tests,
      puts the sections that unlock the others first, and an abandoned set is still useful.
    owner: Richard Hightower
    trigger: >-
      An expert stops a set with sections still pending and does not resume it
      (Q-006 and Q-020 count this).
    response: reduce
    status: open
  - id: R-005
    risk: >-
      A set written by one version cannot be read or graded by a later one, and an
      expert loses weeks of thinking to an upgrade.
    likelihood: low
    impact: high
    mitigation: >-
      NFR-004 makes every set readable with no part of the product running;
      NFR-009 requires older sets to stay gradable within a major version.
    owner: Richard Hightower
    trigger: >-
      A set written by one version fails to read or grade in a later version
      with the same major number.
    response: avoid
    status: open
dependencies:
  - id: D-001
    need: >-
      An assistant session the expert is already working in, able to carry a long
      interview and read and write the documents.
    from: The assistant platform the customer already uses
    by: 2027-01-31
    status: delivered
    owner: Richard Hightower
    blocks:
      - ST-001
      - ST-002
  - id: D-002
    need: >-
      Ten first-time domain experts willing to be observed completing a PRD.
    from: Early customers and the professional network
    by: 2027-01-31
    status: requested
    owner: Richard Hightower
    blocks:
      - A-001
      - A-002
      - NFR-005
  - id: D-003
    need: >-
      Three engineering leads willing to read a completed set cold and report what
      they would ask for first.
    from: Early customers
    by: 2027-01-31
    status: requested
    owner: Richard Hightower
    blocks:
      - A-003
      - O-001
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-decision-rights, kind: decision-rights, path: ./11-decision-rights.md, title: Decision rights and trust rules }
  next: { id: prd-forge-open-questions, kind: open-questions, path: ./13-open-questions.md, title: Open questions }
---

# Assumptions, risks and dependencies

## Assumptions

| ID | Assumption | If false |
| --- | --- | --- |
| A-001 | An expert will answer 50-100 questions across a few sittings | The method fails; sections 5-7 change completely |
| A-002 | An expert will act on a grade they did not produce | The grading is decoration |
| A-003 | An engineering lead accepts a PRD naming no technology | Test 5 becomes a liability |
| A-004 | Organizations permit drafting inside an assistant session | Section 6's separate-application non-goal and A-005 have to change, and FR-002, FR-015, and FR-018 with them |
| A-005 | Organizations accept that domain content stays in the session and the documents | NFR-008, NFR-010, and NFR-012 have to change |

A-001 and A-002 are the two the product stands on, and neither has been tested.
Both are validated by the same ten observed sittings (D-002), which makes D-002
the single most load-bearing dependency in this PRD.

A-005 was constraint C-003 in section 9 until 0.8.1. It moved here because it is
a belief about what customers accept, which a customer can falsify, and not a
rule imposed from outside.

## Risks

| ID | Risk | L | I | Response | Mitigated by | Status | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | High score becomes false assurance | high | high | reduce | 2027-01-31 | open | Richard Hightower |
| R-002 | Unsupported findings destroy trust in all findings | high | high | reduce | 2027-01-31 | open | Richard Hightower |
| R-003 | A beautifully graded PRD for the wrong product | medium | high | reduce | none | open | Richard Hightower |
| R-004 | Interview too long, and sets abandoned | medium | medium | reduce | none | open | Richard Hightower |
| R-005 | A version change strands an expert's set | low | high | avoid | none | open | Richard Hightower |

R-001 and R-002 are high and high, and both mitigations must be in place by
2027-01-31, two months before REL-001.

**R-003 is not closed.** The mitigations listed reduce it and do not solve it.
Nothing in this product checks whether the product being specified should exist.
This section states it rather than hide it behind a mitigation that sounds adequate.

## Dependencies

| ID | Need | From | By | Status | Owner |
| --- | --- | --- | --- | --- | --- |
| D-001 | An assistant session able to carry the interview | The assistant platform the customer already uses | 2027-01-31 | delivered | Richard Hightower |
| D-002 | 10 observed first-time experts | Early customers and the professional network | 2027-01-31 | requested | Richard Hightower |
| D-003 | 3 engineering leads to read a set cold | Early customers | 2027-01-31 | requested | Richard Hightower |

D-001 is delivered: this PRD was written and graded with prd-forge inside an
assistant session, which carried the interview and read and wrote the documents.

D-002 and D-003 are both requested and both due by 2027-01-31, two months
before REL-001's target in section 13. The questions they answer are due by
2027-02-28, so REL-001 can use the results. Q-019 and Q-022 decide, by
2027-01-31, whether REL-001 keeps its date and what happens to it if either
slips.
