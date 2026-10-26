---
id: prd-forge-wireframes
kind: wireframes
schema: prd-forge/wireframes@1
title: Wireframes
status: draft
updated: 2026-10-26
domain: product management tooling
section: 7
order: 85
score: 66
blocking: 1
graded: 2026-10-26
wireframes:
  - id: WF-001
    title: A section open, with the whole set beside it
    type: screen
    persona: PER-001
    journey_stage: ST-001
    illustrates: [FR-002, FR-008]
    shows:
      - Where they are in the set, the section's state, and its grade
      - Moving between sections, and back to the last screen
      - Each section's grade beside its name; a click opens why
      - A section not yet interviewed says so
      - The section itself, as prose
      - An ID from another section opens that section
  - id: WF-002
    title: No set yet
    type: screen
    persona: PER-001
    journey_stage: ST-001
    illustrates: [FR-002]
    shows:
      - What is missing, and where it looked
      - Look again once the set exists
  - id: WF-003
    title: Why a section got its grade
    type: screen
    persona: PER-001
    journey_stage: ST-003
    illustrates: [FR-009, FR-011]
    shows:
      - What the grade means, in words
      - When it was graded, and how many blocking defects
      - The standard the grade was given against
      - Each dimension's score, with the evidence for it
      - What would raise the grade, dimension by dimension
  - id: WF-004
    title: The standard a section is graded against
    type: screen
    persona: PER-001
    journey_stage: ST-003
    illustrates: [FR-009]
    shows:
      - How a dimension becomes a grade
      - What 0, 2 and 4 look like for each dimension
      - What stops a section at any grade
  - id: WF-005
    title: What a team could not build from this set
    type: report
    persona: PER-001
    journey_stage: ST-005
    illustrates: [FR-012]
    shows:
      - Which version of the set was reviewed
      - The verdict on backlog derivability, as a count
      - What cannot be built, worst first
      - The document's own words, quoted, for each finding
      - Each derivability check, pass or fail
      - What the reviewer would ask for first
  - id: WF-006
    title: What the approver is asked to approve
    type: report
    persona: PER-003
    journey_stage: ST-006
    illustrates: [FR-013, FR-014]
    shows:
      - The version, its state, and its owner
      - Every section with its grade and blocking count
      - What is still undecided, who decides it, and by when
      - The approval record, against a named version
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
  next: { id: prd-forge-nonfunctional-requirements, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements }
  related:
    - { id: prd-forge-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
---

# Wireframes

Every requirement in section 7 whose outcome a person meets on a screen or in a
report is drawn here, once, as a text sketch. Each sketch shows what the person
sees and what they can do there, with the set's own content. None of them
decides how anything looks or how it is built.

Three screens serve the domain expert as they write: the set with one section
open, why a section got its grade, and the rubric behind the grade. Two reports
serve the moments that decide whether the set is buildable: the buildability
review the expert reads, and the approval pack the approver reads. One more
sketch shows the first screen, before any set exists.

The numbered marks in each sketch are explained, in order, by its `shows` list.

## WF-001 The set and one section

Illustration, not a design. Illustrates FR-002 and FR-008. PER-001 sees it at ST-001.

The expert sees every section and its state at once, and reads the open section as prose. A grade beside a name is how they see at a glance what is weak.

```wireframe
┌─ prd-forge ──────────────────────────────────────────┐
│ 9/18  section 7  draft  graded 84/100 <1>            │
│ [ < Prev ] [ Next > ] [ Rescan ] [ Back ] <2>        │
├──────────────────────────────────────────────────────┤
│   Problem and opportunity                            │
│   User journeys (88) <3>                             │
│   Scenarios                                          │
│ > Functional requirements (84)                       │
│   Wireframes (pending) <4>                           │
│   …                                                  │
├──────────────────────────────────────────────────────┤
│ Functional requirements <5>                          │
│ ───────────────────────                              │
│ The expert reads each requirement as a sentence:     │
│ who can do what, what they then see, and the test    │
│ that tells pass from fail. FR-009 › <6>              │
│ …                                                    │
└──────────────────────────────────────────────────────┘
```

![WF-001 drawing](diagrams/WF-001.svg)

## WF-002 The empty state

Illustration, not a design. Illustrates FR-002. PER-001 sees it at ST-001.

Before the first interview there is nothing to show. The screen says so and says how to start, rather than showing an empty contents list.

```wireframe
┌─ No set loaded ──────────────────────────────────────┐
│ No PRD set loaded <1>                                │
│ Looked under docs/prd.                               │
│ Ask for the prd-wizard skill: it interviews you      │
│ and writes the set.                                  │
│ [ Rescan ] <2>                                       │
└──────────────────────────────────────────────────────┘
```

![WF-002 drawing](diagrams/WF-002.svg)

## WF-003 The grade, explained

Illustration, not a design. Illustrates FR-009 and FR-011. PER-001 sees it at ST-003.

The score alone tells the expert how good the section is. This screen tells them why, quoting their own document, and what one change would move it. After a re-grade it shows the new score and the new reasons.

```wireframe
┌─ Functional requirements: graded 84/100 ─────────────┐
│ Buildable with questions. <1>                        │
│ Graded 2026-10-26. 0 blocking defects. <2>           │
│ › See the rubric for functional requirements <3>     │
├──────────────────────────────────────────────────────┤
│ Dimension         Score  Why <4>                     │
│ ──────────────────────────────────────────────────   │
│ Named user        4      All sixteen name a persona  │
│ Visible outcome   3      FR-007 ends on a feeling    │
│ Atomicity         2      FR-001 joins two abilities  │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ How to raise the grade <5>                           │
│ • Atomicity 2 to 4: split FR-001 and FR-007          │
│ • Test 3 3 to 4: put a number on "short tables"      │
└──────────────────────────────────────────────────────┘
```

![WF-003 drawing](diagrams/WF-003.svg)

## WF-004 The rubric

Illustration, not a design. Illustrates FR-009. PER-001 sees it at ST-003.

A grade against a stated standard is only fair if the expert can read the standard. This is the same rubric the graders used.

```wireframe
┌─ Rubric for functional requirements ─────────────────┐
│ Each dimension scores 0, 2 or 4. <1>                 │
├──────────────────────────────────────────────────────┤
│ Dimension     0           2            4 <2>         │
│ ──────────────────────────────────────────────────   │
│ Atomicity     Several in  Mostly       One           │
│               one         single       capability    │
│ Coverage      Stages      Most         Every stage   │
│               with none   covered      has a must    │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ Blocking defects <3>                                 │
│ • A requirement that names a technology              │
│ …                                                    │
└──────────────────────────────────────────────────────┘
```

![WF-004 drawing](diagrams/WF-004.svg)

## WF-005 The buildability review

Illustration, not a design. Illustrates FR-012. PER-001 sees it at ST-005.

The expert reads this before anyone has estimated anything, while a fix is still a sentence. Every finding quotes the set, so the expert can check it rather than trust it.

```wireframe
┌─ What a team could not build from this set ──────────┐
│ prd-forge PRD, version 0.2.0 <1>                     │
│ 9 of 11 derivability checks pass <2>                 │
├──────────────────────────────────────────────────────┤
│ CANNOT BUILD <3>                                     │
│ 1. O-001 to O-003 have no baseline, so no feature    │
│    can carry a measure. "unknown - not measured;     │
│    see Q-001." <4>                                   │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ BACKLOG DERIVABILITY <5>                             │
│ ✓ 1  One journey is the golden thread: J-001         │
│ ✗ 7  Objectives have a baseline and a target         │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ WHAT I WOULD ASK FOR FIRST <6>                       │
│ 1. Answer Q-001 before setting O-001's target        │
└──────────────────────────────────────────────────────┘
```

![WF-005 drawing](diagrams/WF-005.svg)

## WF-006 The approval pack

Illustration, not a design. Illustrates FR-013 and FR-014. PER-003 sees it at ST-006.

The approver reads a few pages, not eighteen files. They see what they are committing to, what is still open and who owns it, and where their decision will be recorded.

```wireframe
┌─ prd-forge PRD ──────────────────────────────────────┐
│ Version 0.3.0 · draft · Richard Hightower <1>        │
├──────────────────────────────────────────────────────┤
│ Sec  Document                     Grade  Blocking <2>│
│ ──────────────────────────────────────────────────   │
│ 5    User journeys                88     0           │
│ 7    Functional requirements      84     0           │
│ 8    Non-functional requirements  82     0           │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ Still undecided <3>                                  │
│ Q-001  Baseline pass rate   Richard Hightower        │
│                             by 2027-03-31            │
│ …                                                    │
├──────────────────────────────────────────────────────┤
│ Approvals <4>                                        │
│ Version  Date  Approver  Decision  Conditions        │
│ None sought. The set is at draft.                    │
└──────────────────────────────────────────────────────┘
```

![WF-006 drawing](diagrams/WF-006.svg)
