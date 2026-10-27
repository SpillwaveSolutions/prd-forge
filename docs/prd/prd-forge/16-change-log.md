---
id: prd-forge-change-log
kind: change-log
schema: prd-forge/change-log@1
title: Change log and approvals
status: draft
updated: 2026-10-27
domain: product management tooling
section: 15
order: 160
score: 79
blocking: 0
graded: 2026-10-27
changes:
  - version: 0.9.0
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Fixes the blocking defects the 0.8.1 grading found that do not wait on
      the expert. The glossary defines requirement, acceptance criteria, gap,
      version, domain, and reading order. FR-017's third criterion states what
      the expert sees when they go back, and names no view. Section 7 says that
      FR-010 waits on Q-007, which blocks ST-004. The status-quo competitor's
      edge states what an engineer who was not in the room receives at
      handover. Each problem in section 1 has one counted case, with its
      source and date. On the expert's decision, C-004 leaves section 9, which now
      holds no constraints.
      Its rule lives in TR-005 and FR-006, and its id is not reused. The
      constraints section may now be empty. After the 0.9.0 regrade, FR-008
      states the expert's need, FR-012 reports
      a requirement's wait on an open question, and the glossary defines
      interview, handover, and dependency and names no storage or drawing
      format. After the second regrade, FR-018 shows a changed section and a new
      grade within 10 seconds of a request to refresh, FR-008 tests that every
      item is shown in a sentence or a table row, and the glossary defines
      backlog, feature, epic, story, expert, and sponsor. After the third
      regrade, FR-008 reports an id, priority or link that two places in the
      set state differently, FR-002 calls the first state pending, and the
      glossary says that the expert sets a section final under TR-002. The
      glossary also defines engineering lead, delivery lead, persona, item, id,
      link, priority, teaching, decider, release, vocabulary, engineer,
      scenario, trust rule, story-mapping workshop, backbone, question list,
      gate, out of scope, objection, session, change log, target, exit
      criteria, non-functional requirement, summary, glossary, view, topic,
      ready, capability, outcome, problem, approval, engagement, lifecycle, and
      handoff, and FR-004 names no field. Journeys and the scope
      say "an engineer" for the person who builds from the set. FR-019 and FR-020
      split the early stop out of FR-004 and the check across the set out of
      FR-008, both `should` on the expert's decision. The glossary cites a source
      for MoSCoW, Given/When/Then, story, epic, feature, story map, backbone, and
      spike, says `wont` means won't have this time, and defines segment, buyer,
      status quo, delegated, and definition of done. The set states its
      versioning policy before 1.0. This is a minor version because the policy
      and the evidence are new content.
    sections:
      - 1
      - 2
      - 5
      - 6
      - 7
      - 9
      - 12
      - 13
      - 14
      - 15
  - version: 0.8.1
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Fixes the blocking defects that do not wait on evidence. The glossary
      defines buildability review, finding, root document, approver, condition,
      constraint, objective, and baseline. SC-003 and SC-005 state outcomes a
      person can observe. The scope's OUT-003 row no longer names a component.
      Section 7 names the open question each waiting `must` requirement depends
      on. The template and assistant competitors state an edge a buyer can check
      after one engagement. On the expert's decision, C-001 and C-002 move from
      section 9 to section 6 as non-goals, C-003 moves to section 11 as
      assumption A-005, and section 9 keeps only C-004; the ids C-001 to C-003
      are not reused. Segment S-003 leaves section 2 and becomes a non-goal in
      section 6. J-002 gains ST-009, in which the engineering lead records their
      own verdict on the buildability report under TR-006, and REL-002 includes
      it. References to the moved items are updated across the set.
    sections:
      - 2
      - 4
      - 5
      - 6
      - 7
      - 8
      - 9
      - 10
      - 11
      - 12
      - 13
      - 14
  - version: 0.8.0
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Sets the expert's priorities. Ten requirements stay must and eight become
      should; SC-002 and SC-004 become should with the requirements they exercise,
      and the other scenarios are must. Adds SC-007, the golden thread from the
      first sentence to an approved set. Gives REL-001 and REL-002 exit criteria
      from the objective targets, with indicative dates. Names one decider for
      Q-005 and Q-008, with the people they consult.
    sections:
      - 5
      - 7
      - 12
      - 13
  - version: 0.7.0
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Names the root's objective, primary persona, and approver, from section 3,
      the personas document, and TR-001. Marks PER-001 as the primary persona.
      Names release 1 by its id in the scope, and gives LC-001's first transition
      the rule TR-008 already states.
    sections:
      - 4
      - 5
      - 6
  - version: 0.6.0
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Adds the links the specification review asked for. Each problem names its
      persona, and each objective names the problems it addresses and the open
      question that will establish its baseline. Competitors have a kind, with the
      status quo named. Each decision rule names the stages it governs. Scenarios
      say where the user meets them, SC-001 names the stages it spans, and each
      screen or report scenario links its wireframes. The root's measure states
      its target. Section 11 now says D-002 and D-003 fall on R1's target day, not
      after it.
    sections:
      - 1
      - 2
      - 3
      - 5
      - 10
      - 11
  - version: 0.4.0
    date: 2026-10-26
    author: Richard Hightower
    summary: >-
      Adds FR-017, moving between sections without losing one's place, and FR-018,
      seeing the set as it now stands, the requirements behind the navigation and
      refresh controls the wireframes drew. Rewrites the wireframes from the
      grading findings: no sketch names a part of the product, every stage matches
      what its sketch shows, and new sketches draw a new set, no set at all, a
      re-grade, a review with gaps, and the return after a week away. Corrects the
      count of section documents to seventeen wherever it appeared.
    sections:
      - 6
      - 7
      - 8
      - 13
      - 14
  - version: 0.3.0
    date: 2026-10-26
    author: Richard Hightower
    summary: >-
      Adds wireframes to section 7. Each functional requirement now says where its
      user meets the outcome, and the seven shown on a screen or in a report are
      illustrated by six text sketches: the set with a section open, the empty
      state, a grade explained, the rubric, the buildability review, and the
      approval pack. Re-grades user journeys and non-functional requirements with
      recorded reasons; their scores moved from 90 to 88 and from 79 to 82 with no
      change to either document. Adds the term "wireframe" to the glossary.
    sections:
      - 5
      - 7
      - 8
      - 14
  - version: 0.2.0
    date: 2026-10-26
    author: Richard Hightower
    summary: >-
      Fixes every defect the adversarial grading and the buildability review found
      in 0.1.0. J-001's goal no longer claims an engineering lead's confirmation,
      which no stage of the release line produced; that confirmation becomes
      OUT-004, deferred to release 2. FR-003 and FR-004 now state outcomes a person
      can see rather than internal mental states. FR-015 and FR-016 are split out
      of FR-002 and FR-009, each having a failure mode of its own. The threshold is
      stated as a number, 70, everywhere it is used. FR-013's approver page is the
      set's own root document, which resolves its contradiction with OUT-003.
      NFR-006 and NFR-008 no longer name a component or the delivery mechanism, and
      NFR-010, NFR-011 and NFR-012 add the retention, availability and security
      targets that were simply absent, with NFR-010 answering the half of C-003
      that no measurable requirement stood behind. TR-007 to TR-012 close the six
      stage decisions that had no rule, and every rule now says what happens when
      its approver is away, not only when they disagree. PER-001's authority is
      widened to cover the decisions section 10 gives them. Seventeen glossary
      terms are added, five of which existed only as pointers to nothing, and the
      five tests are numbered because the set cites test 5 by number. The root
      document now states how the set is numbered, which three reviewers misread.
    sections:
      - 4
      - 5
      - 6
      - 7
      - 8
      - 10
      - 13
      - 14
  - version: 0.1.0
    date: 2026-10-23
    author: Richard Hightower
    summary: >-
      First draft of the whole set, written with prd-forge's own conventions as the
      product's first real exercise. Sixteen sections drafted, the golden thread
      J-001 set to the expert's path from idea to approved PRD, and the release line
      set to ST-001 through ST-006. All three objectives recorded with unknown
      baselines and matching open questions rather than invented figures. C-001
      records the one tension found while writing: the product is delivered inside
      an assistant, which would fail test 5 if named in a requirement, so it is a
      constraint instead.
    sections:
      - 1
      - 2
      - 3
      - 4
      - 5
      - 6
      - 7
      - 8
      - 9
      - 10
      - 11
      - 12
      - 13
      - 14
      - 15
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-glossary, kind: glossary, path: ./15-glossary.md, title: Glossary }
  next: null
---

# Change log and approvals

| Version | Date | Author | What changed |
| --- | --- | --- | --- |
| 0.9.0 | 2026-10-27 | Richard Hightower | Six glossary terms, FR-017 without view names, FR-010's wait on Q-007, the status-quo edge; counted evidence for P-001 to P-004; C-004 moved out of section 9; FR-008 and FR-012 restated; interview, handover, and dependency defined; FR-018 on request within 10 seconds; backlog terms, expert, and sponsor defined; FR-008 checks the set for one item stated two ways; final set by the expert; ten more glossary terms; FR-019 and FR-020 split out; sources cited for standard terms; the versioning policy |
| 0.8.1 | 2026-10-27 | Richard Hightower | Glossary terms, observable scenario outcomes, open questions named in section 7, competitor edges; C-001 to C-003 and S-003 moved; ST-009 for the engineering lead |
| 0.8.0 | 2026-10-27 | Richard Hightower | Requirement and scenario priorities, SC-007, release exit criteria, single deciders |
| 0.7.0 | 2026-10-27 | Richard Hightower | Root objective, primary persona and approver; release id in scope; LC-001 rule |
| 0.6.0 | 2026-10-27 | Richard Hightower | Links from the specification review: problems, objectives, competitors, decision stages, and scenario views |
| 0.4.0 | 2026-10-26 | Richard Hightower | Navigation and refresh requirements; wireframes rewritten from their grading |
| 0.3.0 | 2026-10-26 | Richard Hightower | Wireframes for every screen and report, and recorded reasons for the grades |
| 0.2.0 | 2026-10-26 | Richard Hightower | Every defect the grading and the buildability review found, over two rounds |
| 0.1.0 | 2026-10-23 | Richard Hightower | First draft of all sixteen sections |

## Versioning policy before 1.0

The set and the product share one version number. The number changes by these
rules:

- A patch, such as 0.9.0 to 0.9.1, is for fixes that add no content.
- A minor version, such as 0.8 to 0.9, is for new content in the set or in the
  product.
- A change to the release line or to the golden thread takes the set to the
  next major version. From 0.x, the next major version is 1.0.

The expert set this policy at 0.9.0. Two earlier versions do not follow it, and
neither is reissued:

- 0.8.1 added stage ST-009 and moved items between sections. Under this
  policy it would have been the next minor version.
- 0.2.0 changed the golden thread. Under this policy it takes the set to 1.0.

## 0.2.0, what the grading changed

The reviewers that graded 0.1.0 were the product's own, run against its own PRD.
They found twelve blocking defects and four failed derivability checks. The
largest single finding was that FR-009, FR-010 and FR-011 were written against
"its rubric" and "its threshold" with neither defined anywhere in the set: the
threshold is now stated as 70 in the requirements themselves, and the rubric, the
section states and the derivability checks are defined in section 14 as the
product content they are.

Two findings were checked and **rejected**: the claim that "see section 6" pointed
at the wrong document, and the claim that the section count was contradicted. Both
came from reading file numbers as section numbers. The references were right; the
numbering was unexplained, which is now fixed in the root document.

## 0.1.0, what to know

Written as prd-forge's own first exercise. Three things a reader should carry
forward:

1. **No baselines.** All three objectives carry an explicit unknown with a matching
   open question (Q-001 to Q-003). The targets are intentions, not commitments.
2. **C-001 is the tension.** The product is delivered inside an assistant session.
   Naming that in a requirement would fail test 5, so it is recorded as a
   constraint. A reviewer may fairly call it architecture. At 0.8.1 it moved to
   section 6 as a non-goal, and the session it needs is dependency D-001 in
   section 11.
3. **R-003 is not closed.** Nothing in this product checks whether the product
   being specified should exist at all.

## Approvals

None sought. This set is at `draft` and has not been offered for approval. It
cannot reach `final` without an approval recorded here, per TR-001.
