---
id: prd-forge-glossary
kind: glossary
schema: prd-forge/glossary@1
title: Glossary
status: draft
updated: 2026-10-23
domain: product management tooling
section: 14
order: 150
terms:
  - term: PRD
    meaning: >-
      A written statement of what to build, for whom, why, and how you know it
      works, plus what not to build. It does not say how to build it.
    see_also:
      - section
      - document set
    not: >-
      A design document. A PRD that names components or technologies has stopped
      being a PRD and has started being an architecture sketch.
  - term: Document set
    meaning: >-
      One directory of documents that together are one PRD: an index and one
      document per section, each linking to the others.
    see_also:
      - PRD
  - term: Golden thread
    meaning: >-
      The one user journey that release 1 must deliver from end to end.
    see_also:
      - journey
      - release line
    not: >-
      The most important journey in general. It is the journey chosen for release 1,
      which is often the simplest rather than the most valuable.
  - term: Release line
    meaning: >-
      The smallest set of journey stages that completes the golden thread, and so
      the boundary of what release 1 contains.
    see_also:
      - golden thread
      - scope
    not: >-
      A date or a deadline. It is a line across the journey, not across a calendar.
  - term: Stage
    meaning: One large step of a journey, naming a person, an input, an output and a decision.
    see_also:
      - journey
      - step
    not: >-
      A screen or a system step. A stage survives a redesign.
  - term: The five tests
    meaning: >-
      The five properties a statement must have to be a product requirement: it
      names a user, states an outcome a person can see, has a pass-or-fail
      acceptance test, carries a priority, and does not name the component or
      technology that delivers it.
    see_also:
      - blocking defect
  - term: Rubric
    meaning: >-
      The stated standard a section is scored against: a set of dimensions, each
      with written anchors for what a score of 0, 2 and 4 look like.
    see_also:
      - score
      - blocking defect
    not: >-
      A checklist. A checklist asks whether something is present; a rubric asks how
      good it is, against written anchors.
  - term: Blocking defect
    meaning: >-
      A named fault that stops a section advancing however high its score is, such
      as a requirement that names a technology or an id that refers to nothing.
    see_also:
      - rubric
      - score
    not: >-
      A low score. Score and blocking defects are counted separately and a high
      score never clears a blocking defect.
  - term: Score
    meaning: >-
      A section's total against its rubric, 0 to 100, written by a grading pass and
      never by hand.
    see_also:
      - rubric
      - blocking defect
    not: >-
      A measure of whether the product is a good idea. It measures how well the
      section is written, nothing else.
  - term: Spike
    meaning: >-
      A time-boxed piece of work whose only output is an answer to an open question,
      or a recorded decision.
    see_also:
      - open question
    not: >-
      A piece of the product. A spike produces knowledge, not a feature.
  - term: Open question
    meaning: >-
      Something not yet decided, recorded with the one person who decides it and
      the date by which they must.
    see_also:
      - spike
      - assumption
    not: >-
      A risk. A risk is something that might happen and nobody can simply decide; an
      open question has a decider.
  - term: Non-goal
    meaning: >-
      Something a reasonable reader would expect the product to do, that it will not
      do, with no plan to.
    see_also:
      - scope
    not: >-
      Out of scope. Out of scope means not yet, with a condition for revisiting; a
      non-goal means not ever, with a reason.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan }
  next: { id: prd-forge-change-log, kind: change-log, path: ./16-change-log.md, title: Change log and approvals }
---

# Glossary

| Term | Most often confused with |
| --- | --- |
| PRD | A design document |
| Golden thread | The most important journey |
| Release line | A date |
| Stage | A screen |
| Rubric | A checklist |
| Blocking defect | A low score |
| Score | A verdict on the product idea |
| Spike | A piece of the product |
| Open question | A risk |
| Non-goal | Out of scope |

The `not` column above is the one that earns its keep. Every one of these has
been confused in practice, and three of them — golden thread, blocking defect and
score — carry a cost when confused: a team picks the wrong journey for release 1,
ships a section with a known fault because the number looked good, or believes a
well-written specification means a sound product.
