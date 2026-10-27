---
id: prd-forge-scope
kind: scope
schema: prd-forge/scope@1
title: Scope
status: draft
updated: 2026-10-27
domain: product management tooling
section: 6
order: 70
score: 83
blocking: 1
graded: 2026-10-26
release: REL-001, single-expert PRD authoring
release_line: >-
  ST-001 through ST-006 for one expert writing one PRD with one golden-thread
  journey. The expert reaches an approved set that a buildability review has
  passed, without leaving the conversation they started in.
in_scope:
  - id: IN-001
    summary: >-
      State the idea, establish the domain and vocabulary, and create a set with
      every section visible and honestly marked as not started
    journey_stage: ST-001
    requirements:
      - FR-001
      - FR-002
      - FR-015
  - id: IN-002
    summary: >-
      Teach a section, then interview on it one or two questions at a time, in the
      expert's own vocabulary
    journey_stage: ST-002
    requirements:
      - FR-003
      - FR-004
      - FR-005
  - id: IN-003
    summary: >-
      Never record an invented domain fact, and convert a stated technology into
      the need beneath it
    journey_stage: ST-002
    requirements:
      - FR-006
      - FR-007
  - id: IN-004
    summary: Show the draft as prose, with its grade and every blocking defect named
    journey_stage: ST-003
    requirements:
      - FR-008
      - FR-009
      - FR-016
      - FR-017
      - FR-018
  - id: IN-005
    summary: Ask one question that most improves the section, and re-grade after it
    journey_stage: ST-004
    requirements:
      - FR-010
      - FR-011
  - id: IN-006
    summary: Review the whole set as a builder would, and report what cannot be built
    journey_stage: ST-005
    requirements:
      - FR-012
  - id: IN-007
    summary: Record an approval, with conditions, against a named version
    journey_stage: ST-006
    requirements:
      - FR-013
      - FR-014
out_of_scope:
  - id: OUT-001
    summary: >-
      Deriving features, epics and stories from the approved PRD - journey J-002
    revisit: >-
      Release 2. The PRD must already carry what J-002 needs, which FR-012 checks,
      so nothing is lost by deferring the derivation itself.
  - id: OUT-002
    summary: >-
      More than one expert working on the same set at the same time
    revisit: >-
      Once a single expert's path is proven on three real engagements.
  - id: OUT-004
    summary: >-
      An engineering lead reading the set and recording their own confirmation that
      it can be built from
    revisit: >-
      Release 2, with J-002. Release 1 gives the expert the buildability report
      (FR-012) so the gaps are found before anyone estimates; a named lead's own
      confirmation is a second person's time, which R1 does not ask for.
  - id: OUT-003
    summary: >-
      Any view of the document set other than reading the documents themselves and
      stepping through them beside the conversation
    revisit: >-
      When an approver asks for one; PER-003 reads a handful of pages, which the
      documents already are.
non_goals:
  - >-
    We are not supplying domain knowledge. The expert has it; this product
    supplies product management. A user who lacks the domain is not served.
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
      A product decision by Richard Hightower, recorded at 0.1.0 as C-002 and
      moved here from section 9 at 0.8.1.
  - statement: >-
      We are not building a separate application. The expert has nothing to open,
      install, or log into beyond the session they are already working in.
    reason: >-
      A product decision by Richard Hightower, recorded at 0.1.0 as C-001 and
      moved here from section 9 at 0.8.1. The session it needs is dependency
      D-001 in section 11.
  - statement: >-
      We are not targeting product teams entering a domain they do not know in
      release 1.
    reason: >-
      They already employ the product skill and want the domain, which prd-forge
      does not supply. This was segment S-003 in section 2 until 0.8.1.
  - >-
    We are not certifying a PRD. A grade is evidence for the expert's judgement,
    never a warrant that the product will succeed.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-scenarios, kind: scenarios, path: ./06-scenarios.md, title: Scenarios }
  next: { id: prd-forge-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
---

# Scope

## Release line

ST-001 through ST-006 for one expert, one PRD, one golden-thread journey.

| ID | In scope | Stage | Requirements |
| --- | --- | --- | --- |
| IN-001 | Idea, domain, vocabulary, a visible empty set, and resumption | ST-001 | FR-001, FR-002, FR-015 |
| IN-002 | Teach then interview, in their vocabulary | ST-002 | FR-003, FR-004, FR-005 |
| IN-003 | No invented facts; convert technology talk | ST-002 | FR-006, FR-007 |
| IN-004 | Draft as prose, with grade, blocking defects, and refutable findings, reached from any section | ST-003 | FR-008, FR-009, FR-016, FR-017, FR-018 |
| IN-005 | One question, then re-grade | ST-004 | FR-010, FR-011 |
| IN-006 | Buildability review of the whole set | ST-005 | FR-012 |
| IN-007 | Approval recorded against a version | ST-006 | FR-013, FR-014 |

## Out of scope for R1

| ID | Out of scope | Revisit |
| --- | --- | --- |
| OUT-001 | Deriving the backlog (J-002) | R2; the PRD already carries what it needs |
| OUT-002 | Two experts on one set at once | After three real engagements |
| OUT-003 | Any view beyond reading the documents and stepping through them beside the conversation | When an approver asks |
| OUT-004 | An engineering lead's own recorded confirmation | R2, with J-002 |

## Non-goals

| Non-goal | Why not |
| --- | --- |
| Supplying domain knowledge | The expert has it; the product supplies product management |
| Deciding scope, priority, or whether to build | The expert decides; the product shows the consequences |
| A backlog's tasks, subtasks, estimates, or sizing | They come from engineering design, not from a PRD |
| Replacing the document store, issue tracker, or approval system, or being the system of record | Product decision, 0.1.0 (was C-002) |
| A separate application to open, install, or log into | Product decision, 0.1.0 (was C-001); the session is D-001 |
| Product teams entering a domain they do not know, in release 1 | They want the domain, which prd-forge does not supply (was S-003) |
| Certifying a PRD | A grade is evidence for the expert's judgement, never a warrant |

The first is the one that defines the product: **we do not supply domain
knowledge.** Someone without the domain is not served by this and should not buy
it. The last is the one that protects its users: **a grade is evidence, not a
warrant.** A high score on a PRD for the wrong product is still the wrong product.

Three non-goals moved here at 0.8.1. The system-of-record and separate-application
non-goals were constraints C-002 and C-001 in section 9, and the non-goal on
product teams new to a domain was segment S-003 in section 2.
