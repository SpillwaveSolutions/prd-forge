---
id: prd-forge-scope
kind: scope
schema: prd-forge/scope@1
title: Scope
status: draft
updated: 2026-10-29
domain: product management tooling
section: 6
order: 70
score: 88
blocking: 0
graded: 2026-10-29
release: REL-001, single-expert PRD authoring
release_line: >-
  ST-001 through ST-006 for one expert writing one PRD with one golden-thread
  journey. The expert reaches J-001's end state: the set approved at a named
  version, every section graded with no blocking defects, every open question
  with a decider and a date, and no buildability gap that is neither closed nor
  owned. ST-006 happens outside the product.
in_scope:
  - id: IN-001
    summary: >-
      State the idea and the domain's vocabulary once, and see every section of
      the set and its state
    journey_stage: ST-001
    requirements:
      - FR-001
      - FR-002
  - id: IN-002
    summary: >-
      Be taught each section before its interview, be asked one or two questions
      at a time with follow-ups, end a section early with its gaps recorded, and
      stop being asked once the section would meet the gate
    journey_stage: ST-002
    requirements:
      - FR-003
      - FR-004
      - FR-005
      - FR-019
  - id: IN-003
    summary: >-
      Record no invented domain fact, and convert a stated technology into the
      need beneath it, kept for the engineering lead
    journey_stage: ST-002
    requirements:
      - FR-006
      - FR-007
  - id: IN-004
    summary: >-
      Read the draft as prose with its grade and every blocking defect, refute a
      finding, move to any section, refresh to see a change, and be told when the
      set states one item two ways
    journey_stage: ST-003
    requirements:
      - FR-008
      - FR-009
      - FR-016
      - FR-017
      - FR-018
      - FR-020
  - id: IN-005
    summary: >-
      Answer one question about the weakest part, see the section re-graded
      against the same rubric, and resume after a break without repeating an
      answer
    journey_stage: ST-004
    requirements:
      - FR-010
      - FR-011
      - FR-015
  - id: IN-006
    summary: >-
      Get a buildability review of the whole set, read as an engineer would, and
      see which release-line stages no requirement covers and which requirements
      cannot be tested
    journey_stage: ST-005
    requirements:
      - FR-012
  - id: IN-007
    summary: >-
      Let the expert name each approver, give the sponsor one document with the
      summary, the scope, the grades, and the open questions, bring the
      sponsor's comments on an exported copy back into the set with a response to
      each, and let the expert record the sponsor's decision, given outside the
      product, with any conditions, against a named version
    journey_stage: ST-006
    requirements:
      - FR-013
      - FR-014
      - FR-021
      - FR-022
      - FR-023
out_of_scope:
  - id: OUT-001
    summary: >-
      Deriving features, epics and stories from the approved PRD - journey J-002
    revisit: >-
      REL-002. The PRD must already carry what J-002 needs, which FR-012 checks,
      and nothing is lost by deferring the derivation itself.
  - id: OUT-002
    summary: >-
      More than one expert working on the same set at the same time
    revisit: >-
      Once the single-expert path is proven: three real engagements have each
      reached an approved set that passed the buildability review on first
      submission.
  - id: OUT-004
    summary: >-
      An engineering lead reading the set and recording their own confirmation that
      it can be built from
    revisit: >-
      REL-002, with J-002. REL-001 gives the expert the buildability review
      (FR-012), and the gaps are found before anyone estimates. A named lead's own
      confirmation is a second person's time, which REL-001 does not ask for.
  - id: OUT-003
    summary: >-
      Any view of the document set other than reading the documents themselves and
      stepping through them beside the conversation
    revisit: >-
      When at least two of the three sponsors in Q-005's spike say the root
      document is not enough to decide. Until then the sponsor reads one
      document, the root document, which FR-013 says carries everything they
      need.
  - id: OUT-005
    summary: >-
      A reviewer commenting on a section inside the set, not on an exported copy
    revisit: >-
      REL-003, when OUT-002's condition holds: three real engagements have each
      reached an approved set that passed the buildability review on first
      submission. Until then, the sponsor comments on an exported copy, and the
      comments come back under FR-022 and FR-023.
non_goals:
  - >-
    We are not supplying domain knowledge. The expert has it; this product
    supplies product management. A user who lacks the domain is not served,
    including a product team entering a domain it does not know.
  - >-
    We are not deciding scope, priority, or whether the product should be built.
    The expert decides; the product makes the consequences visible.
  - >-
    We are not generating a backlog's tasks, subtasks, estimates or sizing at any
    release. Those come from engineering design, not from a PRD.
  - statement: >-
      We are not replacing the organization's document store, issue tracker, or
      approval system, and we are not the system of record for a PRD. The output
      is plain text documents the organization stores wherever it already stores
      documents.
    reason: >-
      The organization already stores and approves documents, and a PRD in plain
      text stays readable with no part of this product running (NFR-004).
  - statement: >-
      We are not building a separate application. The expert has nothing to open,
      install, or log into beyond the session they are already working in.
    reason: >-
      The expert works in short bursts weeks apart (section 4), and a second place
      to open would split that work in two. The session they already use is
      dependency D-001 in section 11.
  - >-
    We are not certifying a PRD. A grade is evidence for the expert's judgement,
    never a warrant that the product will succeed.
outside_product:
  - stage: ST-006
    workaround: >-
      The sponsor reads the root document or an exported copy and gives a
      decision. Comments the sponsor leaves in an exported copy come back under
      FR-023. The expert records the decision in section 15 under FR-014, with
      the sponsor's name, role, and date.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-scenarios, kind: scenarios, path: ./06-scenarios.md, title: Scenarios }
  next: { id: prd-forge-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
---

# Scope

## Release line

ST-001 through ST-006 for one expert, one PRD, one golden-thread journey. The
expert reaches J-001's end state: the set approved at a named version, every
section graded with no blocking defects, every open question with a decider and
a date, and no buildability gap that is neither closed nor owned.

ST-006 happens outside the product in REL-001. The sponsor reads the root
document or an exported copy and gives a decision. Comments the sponsor leaves
in an exported copy come back under FR-023. The expert records the decision in
section 15 under FR-014, with the sponsor's name, role, and date.

| ID | In scope | Stage | Requirements |
| --- | --- | --- | --- |
| IN-001 | State the idea and vocabulary once, and see every section and its state | ST-001 | FR-001, FR-002 |
| IN-002 | Be taught each section, be asked one or two questions at a time, end early with gaps recorded, and stop once it would meet the gate | ST-002 | FR-003, FR-004, FR-005, FR-019 |
| IN-003 | Record no invented fact, and convert a stated technology into the need beneath it | ST-002 | FR-006, FR-007 |
| IN-004 | Read the draft with its grade, refute a finding, move to any section, refresh, and see one item stated two ways | ST-003 | FR-008, FR-009, FR-016, FR-017, FR-018, FR-020 |
| IN-005 | Answer one question, see the section re-graded, and resume without repeating an answer | ST-004 | FR-010, FR-011, FR-015 |
| IN-006 | See which release-line stages no requirement covers and which requirements cannot be tested | ST-005 | FR-012 |
| IN-007 | Name each approver, give the sponsor one document, bring back the sponsor's comments on it, and let the expert record their decision against a named version | ST-006 | FR-013, FR-014, FR-021, FR-022, FR-023 |

## Out of scope for REL-001

| ID | Out of scope | Revisit |
| --- | --- | --- |
| OUT-001 | Deriving the backlog (J-002) | REL-002; the PRD already carries what it needs |
| OUT-002 | Two experts on one set at once | When three real engagements have each reached an approved set that passed the buildability review on first submission |
| OUT-003 | Any view beyond reading the documents and stepping through them beside the conversation | When two of the three sponsors in Q-005's spike say the root document is not enough |
| OUT-004 | An engineering lead's own recorded confirmation | REL-002, with J-002 |
| OUT-005 | A reviewer's comments inside the set, not on an exported copy | REL-003, when OUT-002's condition holds; until then, comments come back from an exported copy under FR-022 and FR-023 |

## Non-goals

| Non-goal | Why not |
| --- | --- |
| Supplying domain knowledge | The expert has it; the product supplies product management |
| Deciding scope, priority, or whether to build | The expert decides; the product shows the consequences |
| A backlog's tasks, subtasks, estimates, or sizing | They come from engineering design, not from a PRD |
| Replacing the document store, issue tracker, or approval system, or being the system of record | The organization already stores and approves documents, and the PRD stays readable with no part of this product running (NFR-004) |
| A separate application to open, install, or log into | The expert works in short bursts, and a second place to open would split the work (D-001) |
| Certifying a PRD | A grade is evidence for the expert's judgement, never a warrant |

The first is the one that defines the product: **we do not supply domain
knowledge.** Someone without the domain is not served by this and should not buy
it. The last is the one that protects its users: **a grade is evidence, not a
warrant.** A high score on a PRD for the wrong product is still the wrong product.

Two non-goals were constraints C-002 and C-001 in section 9 until 0.8.1. Product
teams new to a domain, once segment S-003 in section 2, fall under the first
non-goal: the product never supplies the domain.

<!-- prd-forge:details -->

## Details

Every item in this document, with each of its fields.

**Release:** REL-001, single-expert PRD authoring

**Release line:** ST-001 through ST-006 for one expert writing one PRD with one golden-thread journey. The expert reaches J-001's end state: the set approved at a named version, every section graded with no blocking defects, every open question with a decider and a date, and no buildability gap that is neither closed nor owned. ST-006 happens outside the product.

**Non-goals:**

- We are not supplying domain knowledge. The expert has it; this product supplies product management. A user who lacks the domain is not served, including a product team entering a domain it does not know.
- We are not deciding scope, priority, or whether the product should be built. The expert decides; the product makes the consequences visible.
- We are not generating a backlog's tasks, subtasks, estimates or sizing at any release. Those come from engineering design, not from a PRD.
- **Statement:** We are not replacing the organization's document store, issue tracker, or approval system, and we are not the system of record for a PRD. The output is plain text documents the organization stores wherever it already stores documents.
  - **Reason:** The organization already stores and approves documents, and a PRD in plain text stays readable with no part of this product running (NFR-004).
- **Statement:** We are not building a separate application. The expert has nothing to open, install, or log into beyond the session they are already working in.
  - **Reason:** The expert works in short bursts weeks apart (section 4), and a second place to open would split that work in two. The session they already use is dependency D-001 in section 11.
- We are not certifying a PRD. A grade is evidence for the expert's judgement, never a warrant that the product will succeed.

**Outside product:**

- **Stage:** ST-006
  - **Workaround:** The sponsor reads the root document or an exported copy and gives a decision. Comments the sponsor leaves in an exported copy come back under FR-023. The expert records the decision in section 15 under FR-014, with the sponsor's name, role, and date.

### In scope in detail

#### IN-001

**Summary:** State the idea and the domain's vocabulary once, and see every section of the set and its state

**Journey stage:** ST-001

**Requirements:** FR-001, FR-002

#### IN-002

**Summary:** Be taught each section before its interview, be asked one or two questions at a time with follow-ups, end a section early with its gaps recorded, and stop being asked once the section would meet the gate

**Journey stage:** ST-002

**Requirements:** FR-003, FR-004, FR-005, FR-019

#### IN-003

**Summary:** Record no invented domain fact, and convert a stated technology into the need beneath it, kept for the engineering lead

**Journey stage:** ST-002

**Requirements:** FR-006, FR-007

#### IN-004

**Summary:** Read the draft as prose with its grade and every blocking defect, refute a finding, move to any section, refresh to see a change, and be told when the set states one item two ways

**Journey stage:** ST-003

**Requirements:** FR-008, FR-009, FR-016, FR-017, FR-018, FR-020

#### IN-005

**Summary:** Answer one question about the weakest part, see the section re-graded against the same rubric, and resume after a break without repeating an answer

**Journey stage:** ST-004

**Requirements:** FR-010, FR-011, FR-015

#### IN-006

**Summary:** Get a buildability review of the whole set, read as an engineer would, and see which release-line stages no requirement covers and which requirements cannot be tested

**Journey stage:** ST-005

**Requirements:** FR-012

#### IN-007

**Summary:** Let the expert name each approver, give the sponsor one document with the summary, the scope, the grades, and the open questions, bring the sponsor's comments on an exported copy back into the set with a response to each, and let the expert record the sponsor's decision, given outside the product, with any conditions, against a named version

**Journey stage:** ST-006

**Requirements:** FR-013, FR-014, FR-021, FR-022, FR-023

### Out of scope in detail

#### OUT-001

**Summary:** Deriving features, epics and stories from the approved PRD - journey J-002

**Revisit:** REL-002. The PRD must already carry what J-002 needs, which FR-012 checks, and nothing is lost by deferring the derivation itself.

#### OUT-002

**Summary:** More than one expert working on the same set at the same time

**Revisit:** Once the single-expert path is proven: three real engagements have each reached an approved set that passed the buildability review on first submission.

#### OUT-004

**Summary:** An engineering lead reading the set and recording their own confirmation that it can be built from

**Revisit:** REL-002, with J-002. REL-001 gives the expert the buildability review (FR-012), and the gaps are found before anyone estimates. A named lead's own confirmation is a second person's time, which REL-001 does not ask for.

#### OUT-003

**Summary:** Any view of the document set other than reading the documents themselves and stepping through them beside the conversation

**Revisit:** When at least two of the three sponsors in Q-005's spike say the root document is not enough to decide. Until then the sponsor reads one document, the root document, which FR-013 says carries everything they need.

#### OUT-005

**Summary:** A reviewer commenting on a section inside the set, not on an exported copy

**Revisit:** REL-003, when OUT-002's condition holds: three real engagements have each reached an approved set that passed the buildability review on first submission. Until then, the sponsor comments on an exported copy, and the comments come back under FR-022 and FR-023.

<!-- /prd-forge:details -->
