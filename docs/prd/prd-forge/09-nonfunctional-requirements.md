---
id: prd-forge-nonfunctional-requirements
kind: nonfunctional-requirements
schema: prd-forge/nonfunctional-requirements@1
title: Non-functional requirements
status: draft
updated: 2026-10-23
domain: product management tooling
score: 75
blocking: 2
graded: 2026-10-23
section: 8
order: 90
requirements:
  - id: NFR-001
    category: performance
    statement: >-
      An expert answering a question does not lose their train of thought waiting
      for the next one.
    metric: >-
      95th percentile elapsed time from the expert submitting an answer to the next
      question or the drafted section appearing.
    target: under 20 seconds at p95, and under 60 seconds at p99
    measurement: >-
      Timed across a scripted run of all sixteen sections, repeated per release, in
      the same conditions a user has.
    priority: must
    applies_to:
      - FR-004
      - FR-010
  - id: NFR-002
    category: performance
    statement: >-
      A grading pass does not make the expert wait so long that they stop asking
      for one.
    metric: 95th percentile elapsed time for a section's grade to be reported
    target: under 90 seconds at p95 for a single section
    measurement: Timed per release across all sixteen sections.
    priority: must
    applies_to:
      - FR-009
      - FR-011
  - id: NFR-003
    category: scale
    statement: >-
      A set stays workable at the size real products reach.
    metric: >-
      Number of requirements, journey stages and glossary terms in one set at which
      every function in section 7 still meets its targets.
    target: >-
      120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms
    measurement: >-
      A generated set at those sizes, run through every function in section 7, per
      release.
    priority: must
  - id: NFR-004
    category: durability
    statement: >-
      Work survives the expert stopping, and survives the tool they were using
      going away.
    metric: >-
      Share of a set's content recoverable after the authoring session ends, with
      no part of the product running.
    target: 100%, readable without this product
    measurement: >-
      End a session mid-section, then read the whole set with nothing but a text
      editor, once per release.
    priority: must
    applies_to:
      - FR-002
  - id: NFR-005
    category: usability
    statement: >-
      An expert with no product management training can complete a section without
      asking anyone what a word means.
    metric: >-
      Share of sections a first-time expert completes without asking for the
      meaning of a product management term.
    target: >-
      90% of sections, measured over 10 first-time experts
    measurement: >-
      Observed sessions with 10 first-time experts before release, questions to the
      observer counted and categorised.
    priority: must
  - id: NFR-006
    category: accessibility
    statement: >-
      Everything the expert and the approver read is usable with a screen reader
      and without a mouse.
    metric: >-
      Conformance of the output documents and the stepping view to WCAG 2.2 AA on
      the golden-thread journey.
    target: zero level-A or level-AA violations on the golden-thread path
    measurement: >-
      One manual screen-reader pass of the golden-thread journey per release, plus
      an automated check of the stepping view in the release pipeline.
    priority: must
  - id: NFR-007
    category: observability
    statement: >-
      An expert can tell why a section received the score it did, after the fact.
    metric: >-
      Share of grades for which the score per rubric dimension and the quotation
      behind each can be recovered after the session.
    target: 100% for any section at review or better
    measurement: >-
      Re-read a graded set a week later and reconstruct every score, once per
      release.
    priority: should
    applies_to:
      - FR-009
  - id: NFR-008
    category: privacy
    statement: >-
      What the expert says about their domain stays within whatever boundary their
      organisation already works in; this product adds no new place for it to go.
    metric: >-
      Number of destinations the product sends set content to beyond the assistant
      session the expert is already using.
    target: zero
    measurement: >-
      Review of every outbound destination per release, recorded against C-003.
    priority: must
  - id: NFR-009
    category: supportability
    statement: >-
      A set written by an earlier version is still readable and still gradable by a
      later one.
    metric: >-
      Share of sets written by version N that version N+1 reads and grades without
      the expert rewriting anything.
    target: 100% within a major version
    measurement: >-
      Keep one set per released version and run the current version against all of
      them, per release.
    priority: should
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
  next: { id: prd-forge-constraints, kind: constraints, path: ./10-constraints.md, title: Constraints }
---

# Non-functional requirements

| ID | Category | Target |
| --- | --- | --- |
| NFR-001 | performance | Next question under 20s at p95 |
| NFR-002 | performance | Section grade under 90s at p95 |
| NFR-003 | scale | 120 requirements, 10 journeys x 10 stages, 200 terms |
| NFR-004 | durability | 100% of a set readable with no part of the product running |
| NFR-005 | usability | 90% of sections completed without asking what a term means |
| NFR-006 | accessibility | Zero WCAG 2.2 AA violations on the golden-thread path |
| NFR-007 | observability | 100% of grades reconstructable after the session |
| NFR-008 | privacy | Zero destinations beyond the session the expert already uses |
| NFR-009 | supportability | 100% of older sets readable within a major version |

## Where these came from

NFR-001 and NFR-002 come from PER-001's frequency: a burst of intense use. A
20-second wait is tolerable once; across 60 questions it is 20 minutes of dead
time and the expert stops.

NFR-004 is the one that matters most and is cheapest to get wrong. PER-001 works
in bursts weeks apart. If the set is only readable through this product, then a
version change, a tool change or an expired session destroys weeks of an expert's
thinking. The target is deliberately absolute.

NFR-005 is the only requirement here that needs people rather than instruments to
measure, and it is the one most likely to be skipped. It is the direct test of
whether P-004 was solved.

NFR-006 covers the approver too, not only the expert: PER-003 reads this once and
must not need a mouse to do it.
