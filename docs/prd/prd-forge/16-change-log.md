---
id: prd-forge-change-log
kind: change-log
schema: prd-forge/change-log@1
title: Change log and approvals
status: draft
updated: 2026-10-28
domain: product management tooling
section: 15
order: 160
score: 71
blocking: 0
graded: 2026-10-28
changes:
  - version: 0.10.0
    date: 2026-10-28
    author: Richard Hightower
    summary: >-
      FR-022 added as a should in REL-001: a sponsor comments on an exported copy
      without using the product, and the next copy shows each comment's response
      and what it changed. A comment with no response at approval becomes a
      condition under FR-014. WF-011 shows that copy. IN-007 and REL-001 include
      FR-022, REL-003 keeps comments inside the set, and the glossary defines a
      review comment. A minor version: new content, nothing structural, as
      Richard Hightower decided on 2026-10-28.
    sections:
      - 6
      - 7
      - 13
      - 14
      - 15
  - version: 0.9.0
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      Problems carry counted, sourced evidence. Personas have named roles and
      frequencies, and every journey stage has the expert's satisfaction score.
      ST-006 happens outside the product. New requirements FR-019 to FR-021, the
      last naming each approver. The expert accepts or refutes each score, and a
      section can go back to draft. Section 9 is empty, and the set states a
      versioning policy. A minor version: new content, nothing structural, as
      Richard Hightower decided on 2026-10-27.
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
    resolves:
      - Q-011
  - version: 0.8.1
    date: 2026-10-27
    author: Richard Hightower
    summary: >-
      The glossary defines buildability review, finding, root document, approver, condition,
      constraint, objective, and baseline. SC-003 and SC-005 state outcomes a
      person can observe. The scope's OUT-003 row no longer names a component.
      Section 7 names the open question each waiting `must` requirement depends
      on. The template and assistant competitors state an edge a buyer can check
      after one engagement. On the expert's decision, C-001 and C-002 move from
      section 9 to section 6 as non-goals, C-003 moves to section 11 as
      assumption A-005, and section 9 keeps only C-004; the ids C-001 to C-003
      are not reused. Segment S-003 leaves section 2 and becomes a non-goal in
      section 6. J-002 gains ST-009, in which the engineering lead records their
      own verdict on the buildability review under TR-006, and REL-002 includes
      it. References to the moved items are updated across the set. Together
      these fix the blocking defects that did not wait on evidence.
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
      Each problem names its persona, and each objective names the problems it
      addresses and the open question that will establish its baseline.
      Competitors have a kind, with the status quo named. Each trust rule names
      the stages it governs. Scenarios
      say where the user meets them, SC-001 names the stages it spans, and each
      screen or report scenario links its wireframes. The root's measure states
      its target. Section 11 now says D-002 and D-003 fall on REL-001's target
      day, not after it.
    sections:
      - 1
      - 2
      - 3
      - 5
      - 10
      - 11
  - version: 0.5.0
    date: 2026-10-26
    author: Richard Hightower
    summary: >-
      Every journey stage gains Given/When/Then acceptance. The scenarios
      document gains LC-001, the lifecycle of a section, and scenarios can link
      their wireframes. Each persona gains a short name, which the diagrams show
      in place of its id.
    sections:
      - 4
      - 5
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
      approval pack. Adds the term "wireframe" to the glossary.
    sections:
      - 7
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
      targets that were simply absent, with NFR-010 answering the half of C-003 (now A-005, since 0.8.1)
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
      product's first real exercise. Sixteen section documents across fifteen sections drafted, the golden thread
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
| 0.10.0 | 2026-10-28 | Richard Hightower | FR-022 added as a should: a sponsor's comments on an exported copy come back, each with a response, and an open one at approval becomes a condition; WF-011 shows the answered copy; IN-007, REL-001, and the glossary include it; REL-003 keeps comments inside the set |
| 0.9.0 | 2026-10-27 | Richard Hightower | Counted evidence and sourced why-now claims; persona roles and frequencies; satisfaction scores; ST-006 outside the product; FR-019 to FR-021 added; FR-014 rejection; TR-014 for accepting a score; LC-001 back to draft; C-004 out of section 9; single questions due before REL-001; sourced glossary terms with one meaning each; the versioning policy |
| 0.8.1 | 2026-10-27 | Richard Hightower | Glossary terms, observable scenario outcomes, open questions named in section 7, competitor edges; C-001 to C-003 and S-003 moved; ST-009 for the engineering lead |
| 0.8.0 | 2026-10-27 | Richard Hightower | Requirement and scenario priorities, SC-007, release exit criteria, single deciders |
| 0.7.0 | 2026-10-27 | Richard Hightower | Root objective, primary persona and approver; release id in scope; LC-001 rule |
| 0.6.0 | 2026-10-27 | Richard Hightower | Links between problems, personas, objectives, competitors, trust-rule stages, and scenario views |
| 0.5.0 | 2026-10-26 | Richard Hightower | Given/When/Then acceptance on every stage; LC-001; scenario wireframe links; persona short names |
| 0.4.0 | 2026-10-26 | Richard Hightower | Navigation and refresh requirements; wireframes rewritten from their grading |
| 0.3.0 | 2026-10-26 | Richard Hightower | Wireframes for the requirements shown on a screen or in a report, and the term wireframe |
| 0.2.0 | 2026-10-26 | Richard Hightower | J-001's goal without the engineering lead's confirmation; FR-003 and FR-004 outcomes; FR-015 and FR-016 split out; the threshold stated as 70; NFR-010 to NFR-012; TR-007 to TR-012 |
| 0.1.0 | 2026-10-23 | Richard Hightower | First draft of sixteen section documents across fifteen sections |

## 0.9.0, what changed

- **Section 1:** each problem has one counted case with its source and date, and
  each why-now claim cites the General Assembly survey of product managers.
  Desired outcomes name no mechanism, and Q-018 asks for one counted cost per
  problem.
- **Section 2:** ChatPRD is the direct competitor. Why-we-win is one sentence we
  expect the sponsor to say, each buyer is PER-003, and "client contract" names the
  contract where "engagement" did.
- **Section 3:** O-001 counts the 5 pilot PRDs and defines a pass, O-002 counts
  the pilot PRDs with one journey, and O-003 counts a requirement testable when
  two of three engineering leads agree.
- **Section 4:** on the expert's decision, PER-001 is a senior product manager
  in a consultancy or an in-house product team who is, or speaks for, the
  domain expert. Each persona has a population, a frequency per organization, a
  basis, a context, and its problems, and no persona is external.
- **Section 5:** each stage carries the expert's satisfaction score, and each
  pain point names its stage. ST-006 happens outside the product. LC-001 makes
  final the expert's decision under TR-002, and lets a section at review or
  final go back to draft. SC-004 splits into SC-004 and SC-008.
- **Section 6:** ST-006 is outside the product, and teams new to a domain are
  covered by the first non-goal.
- **Section 7:** FR-019 and FR-020, both `should`, split out of FR-004 and
  FR-008. FR-014 records a rejection. FR-015 moves to ST-004. WF-001 draws
  FR-020, and the wireframes name no tool.
- **Section 8:** the NFRs name what they time, and NFR-010 and NFR-012 are
  measured in a test organization.
- **Section 9:** on the expert's decision, C-004 leaves, and the section may be
  empty. Its rule now lives in TR-005 in section 10 and FR-006 in section 7.
- **Section 10:** TR-003 only produces a score, and TR-014 has the expert accept
  or refute it. TR-001 covers a rejection. The three delegable rules propose and
  never decide.
- **Section 11:** R-001 and R-002 are mitigated by 2027-01-31, and D-002 and
  D-003 report by 2027-01-31.
- **Section 12:** each question is single, and those that block REL-001,
  including the baselines Q-001 to Q-003, are due by 2027-02-28. Q-011 is
  answered. Q-019 splits into Q-019 and Q-022, and Q-023 tests PER-004.
- **Section 13:** REL-001 depends on D-002, D-003, Q-019, and Q-022.
- **Section 14:** eight terms cite a verified source, and review, pass, refute,
  approval, and engagement each have one meaning. Session, buildable,
  development team, and the general sense of specification are defined. Ready
  describes one section, and offered for approval describes the set. Sitting,
  loop-back, experiment, agent, and exported copy are defined.
- **Section 15:** the versioning policy, a 0.5.0 entry, and the date the set is
  offered for approval, 2027-03-15.
- **Section 7 and section 10:** on the expert's decision, FR-021, a `must`,
  lets the expert name each approver by name and role before offering the set.
  TR-001's decider stays the sponsor's role.

None of this is structural under the policy. Richard Hightower decided this on
2026-10-27. ST-006 stays on the release line with the same goal and end state,
and no stage is added, removed, or reordered. PER-001's new wording changes no
stage. The release line's text now quotes the existing end state, and ST-006 is
done outside the product.

## Versioning policy before 1.0

The set and the product share one version number. The number changes by these
rules:

- A patch, such as 0.9.0 to 0.9.1, is for a correction that changes what a
  sentence means. A typo fix gets no version.
- A minor version, such as 0.8 to 0.9, is for new content in the set or in the
  product.
- A change to the release line or to the golden thread takes the set to the
  next major version. From 0.x, the next major version is 1.0.

A change to the golden thread or to the release line is structural: adding,
removing, or reordering a stage, or changing the journey's goal or end state.
Rewording a stage's text or its acceptance is not such a change, and it takes
a minor version at most.

The expert set this policy at 0.9.0, and it applies from 0.9.0 onward. From
0.9.0, a reader can rely on the version number to follow it. Earlier version
numbers stay as recorded. Two earlier versions do not follow it, and
neither is reissued:

- 0.8.1 added stage ST-009 and moved items between sections. Under this
  policy it would have been the next minor version.
- 0.2.0 changed the golden thread. Under this policy it takes the set to 1.0.

Product 0.5.1 changed only the product, so the log has no entry for it.

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
cannot be approved for a release without an approval recorded here, under
TR-001. A section reaches `final` when the expert sets it final, under TR-002.

The set is offered for approval by 2027-03-15. Under FR-021 its one named
approver is Richard Hightower, the owner of the place where this PRD is kept,
in the sponsor's role, PER-003. Richard Hightower is also its author and
owner, so this is a self-approval, and the entry will say so. When an outside reader reviews the
set, their review is recorded beside the approval.

Each approval is recorded with the version, the approver's name and role, the
date, and the decision. An approval with conditions records each condition as
"conditional on <id> by <date>", where the id is the open question,
requirement, or review comment the condition depends on, as FR-014 and FR-022
require. Only the approver who stated a condition clears it. A rejection records
its reason.

At 0.9.0 the expert holds every other section to a score over 80, and accepts
this section below 80 until the set is offered for approval on 2027-03-15, because its
rubric cannot score approvals and conditions higher before an approval exists.

<!-- prd-forge:details -->

## Details

Every item in this document, with each of its fields.

### 0.10.0

**Summary:** FR-022 added as a should in REL-001: a sponsor comments on an exported copy without using the product, and the next copy shows each comment's response and what it changed. A comment with no response at approval becomes a condition under FR-014. WF-011 shows that copy. IN-007 and REL-001 include FR-022, REL-003 keeps comments inside the set, and the glossary defines a review comment. A minor version: new content, nothing structural, as Richard Hightower decided on 2026-10-28.

**Date:** 2026-10-28

**Author:** Richard Hightower

**Sections:** 6, 7, 13, 14, 15

### 0.9.0

**Summary:** Problems carry counted, sourced evidence. Personas have named roles and frequencies, and every journey stage has the expert's satisfaction score. ST-006 happens outside the product. New requirements FR-019 to FR-021, the last naming each approver. The expert accepts or refutes each score, and a section can go back to draft. Section 9 is empty, and the set states a versioning policy. A minor version: new content, nothing structural, as Richard Hightower decided on 2026-10-27.

**Date:** 2026-10-27

**Author:** Richard Hightower

**Sections:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

**Resolves:** Q-011

### 0.8.1

**Summary:** The glossary defines buildability review, finding, root document, approver, condition, constraint, objective, and baseline. SC-003 and SC-005 state outcomes a person can observe. The scope's OUT-003 row no longer names a component. Section 7 names the open question each waiting `must` requirement depends on. The template and assistant competitors state an edge a buyer can check after one engagement. On the expert's decision, C-001 and C-002 move from section 9 to section 6 as non-goals, C-003 moves to section 11 as assumption A-005, and section 9 keeps only C-004; the ids C-001 to C-003 are not reused. Segment S-003 leaves section 2 and becomes a non-goal in section 6. J-002 gains ST-009, in which the engineering lead records their own verdict on the buildability review under TR-006, and REL-002 includes it. References to the moved items are updated across the set. Together these fix the blocking defects that did not wait on evidence.

**Date:** 2026-10-27

**Author:** Richard Hightower

**Sections:** 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14

### 0.8.0

**Summary:** Sets the expert's priorities. Ten requirements stay must and eight become should; SC-002 and SC-004 become should with the requirements they exercise, and the other scenarios are must. Adds SC-007, the golden thread from the first sentence to an approved set. Gives REL-001 and REL-002 exit criteria from the objective targets, with indicative dates. Names one decider for Q-005 and Q-008, with the people they consult.

**Date:** 2026-10-27

**Author:** Richard Hightower

**Sections:** 5, 7, 12, 13

### 0.7.0

**Summary:** Names the root's objective, primary persona, and approver, from section 3, the personas document, and TR-001. Marks PER-001 as the primary persona. Names release 1 by its id in the scope, and gives LC-001's first transition the rule TR-008 already states.

**Date:** 2026-10-27

**Author:** Richard Hightower

**Sections:** 4, 5, 6

### 0.6.0

**Summary:** Each problem names its persona, and each objective names the problems it addresses and the open question that will establish its baseline. Competitors have a kind, with the status quo named. Each trust rule names the stages it governs. Scenarios say where the user meets them, SC-001 names the stages it spans, and each screen or report scenario links its wireframes. The root's measure states its target. Section 11 now says D-002 and D-003 fall on REL-001's target day, not after it.

**Date:** 2026-10-27

**Author:** Richard Hightower

**Sections:** 1, 2, 3, 5, 10, 11

### 0.5.0

**Summary:** Every journey stage gains Given/When/Then acceptance. The scenarios document gains LC-001, the lifecycle of a section, and scenarios can link their wireframes. Each persona gains a short name, which the diagrams show in place of its id.

**Date:** 2026-10-26

**Author:** Richard Hightower

**Sections:** 4, 5

### 0.4.0

**Summary:** Adds FR-017, moving between sections without losing one's place, and FR-018, seeing the set as it now stands, the requirements behind the navigation and refresh controls the wireframes drew. Rewrites the wireframes from the grading findings: no sketch names a part of the product, every stage matches what its sketch shows, and new sketches draw a new set, no set at all, a re-grade, a review with gaps, and the return after a week away. Corrects the count of section documents to seventeen wherever it appeared.

**Date:** 2026-10-26

**Author:** Richard Hightower

**Sections:** 6, 7, 8, 13, 14

### 0.3.0

**Summary:** Adds wireframes to section 7. Each functional requirement now says where its user meets the outcome, and the seven shown on a screen or in a report are illustrated by six text sketches: the set with a section open, the empty state, a grade explained, the rubric, the buildability review, and the approval pack. Adds the term "wireframe" to the glossary.

**Date:** 2026-10-26

**Author:** Richard Hightower

**Sections:** 7, 14

### 0.2.0

**Summary:** Fixes every defect the adversarial grading and the buildability review found in 0.1.0. J-001's goal no longer claims an engineering lead's confirmation, which no stage of the release line produced; that confirmation becomes OUT-004, deferred to release 2. FR-003 and FR-004 now state outcomes a person can see rather than internal mental states. FR-015 and FR-016 are split out of FR-002 and FR-009, each having a failure mode of its own. The threshold is stated as a number, 70, everywhere it is used. FR-013's approver page is the set's own root document, which resolves its contradiction with OUT-003. NFR-006 and NFR-008 no longer name a component or the delivery mechanism, and NFR-010, NFR-011 and NFR-012 add the retention, availability and security targets that were simply absent, with NFR-010 answering the half of C-003 (now A-005, since 0.8.1) that no measurable requirement stood behind. TR-007 to TR-012 close the six stage decisions that had no rule, and every rule now says what happens when its approver is away, not only when they disagree. PER-001's authority is widened to cover the decisions section 10 gives them. Seventeen glossary terms are added, five of which existed only as pointers to nothing, and the five tests are numbered because the set cites test 5 by number. The root document now states how the set is numbered, which three reviewers misread.

**Date:** 2026-10-26

**Author:** Richard Hightower

**Sections:** 4, 5, 6, 7, 8, 10, 13, 14

### 0.1.0

**Summary:** First draft of the whole set, written with prd-forge's own conventions as the product's first real exercise. Sixteen section documents across fifteen sections drafted, the golden thread J-001 set to the expert's path from idea to approved PRD, and the release line set to ST-001 through ST-006. All three objectives recorded with unknown baselines and matching open questions rather than invented figures. C-001 records the one tension found while writing: the product is delivered inside an assistant, which would fail test 5 if named in a requirement, so it is a constraint instead.

**Date:** 2026-10-23

**Author:** Richard Hightower

**Sections:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

<!-- /prd-forge:details -->
