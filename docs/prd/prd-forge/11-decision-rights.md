---
id: prd-forge-decision-rights
kind: decision-rights
schema: prd-forge/decision-rights@1
title: Decision rights and trust rules
status: draft
updated: 2026-10-27
domain: product management tooling
section: 10
order: 110
score: 88
blocking: 0
graded: 2026-10-27
decisions:
  - id: TR-001
    decision: Approve a PRD for a release
    stages: [ST-006]
    approver: PER-003
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The summary, the scope, every section's state and grade, every blocking
      defect, and every open question with its decider and date.
    escalation: >-
      No substitute approver, and approval waits. Where no sponsor exists at all,
      such as a solo expert or an internal tool with no PER-003, the expert approves
      their own set under this rule, shown the same evidence, and the change log
      records that no separate approver existed. A set is never treated as approved
      because its score is high. A rejection goes back to the expert with its
      reason, and the set reads as not approved until a later version is
      approved.
    acceptance:
      - >-
        Given a set with any blocking defect, when approval is sought, then the
        approver is shown the defects and the set is not presented as ready.
      - >-
        Given a set with no recorded approval, when anyone reads its state, then it
        reads as not approved, whatever its scores are.
      - >-
        Given an engagement with no sponsor, when the expert approves their own
        set, then the approval records that no separate approver existed.
      - >-
        Given an approver who rejects the set, when the decision is recorded, then
        the rejection carries its reason, and the set reads as not approved.
      - >-
        Given an approver who approves with conditions, when the approval is
        recorded, then each condition names the open question or requirement it
        depends on and a date, and the set reads as approved-with-conditions until
        every condition is cleared by that same approver.
  - id: TR-002
    decision: Set a section's state to final
    stages: [ST-004]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The section's grade, its blocking defect count, and the result of validating
      it.
    escalation: >-
      The expert may override the gate; the override and the score at the time are
      recorded in the change log. Nobody may set a section final on the expert's
      behalf while they are away: it waits.
    acceptance:
      - >-
        Given a section with one or more blocking defects, when final is requested,
        then it is not set without an explicit override from the expert.
      - >-
        Given an override, when it is applied, then the change log records that it
        was an override and the score at the time.
  - id: TR-003
    decision: Produce a section's score and findings against its rubric
    stages: [ST-003]
    approver: PER-001
    delegable_to_agent: true
    never_delegated: false
    agent_role: proposes
    evidence_required: >-
      The rubric's dimensions and a quotation from the document for every score
      below full marks.
    escalation: >-
      The score runs by itself after each draft, and nobody has to start it. The
      score does not count until the expert accepts it under TR-014, and a finding
      the document does not support is dropped (FR-016).
    acceptance:
      - >-
        Given a section that has just been drafted, when the draft is written,
        then its score and findings are produced without anyone asking for them.
      - >-
        Given a score below full marks on a dimension, when it is reported, then a
        quotation from the document is given for it.
  - id: TR-004
    decision: Decide what the product is for and what is out of scope
    stages: [ST-001]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      What the consequence of the choice is, including any release-line stage it
      would leave uncovered.
    escalation: >-
      None, and no substitute. The expert decides; while they are away, scope does
      not change. Where the choice weakens the PRD the objection is stated once and
      the decision is recorded with the dissent noted.
    acceptance:
      - >-
        Given an expert decision that leaves a release-line stage uncovered, when
        it is recorded, then the consequence is stated to the expert once and the
        decision stands.
      - >-
        Given a decision the expert reaffirmed after an objection, when later
        grading passes run, then the objection is not raised again as a new finding.
  - id: TR-005
    decision: State a domain fact, figure, regulation or citation as true
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The expert's own statement of it, or a source that has been checked.
    escalation: >-
      Where neither exists the fact is not written at all; it becomes an open
      question with a decider and a date. Nobody may supply the fact on the
      expert's behalf while they are away.
    acceptance:
      - >-
        Given a figure or citation the expert did not supply and that has not been
        verified, when a section is drafted, then it does not appear in the
        document.
      - >-
        Given a citation that was checked and could not be confirmed, when it is
        reported, then it is marked unverified rather than stated as fact.
  - id: TR-006
    decision: Judge whether a set can be built from, and report the gaps
    stages: [ST-009]
    approver: PER-002
    delegable_to_agent: true
    never_delegated: false
    agent_role: proposes
    evidence_required: >-
      The release line, the requirements covering each stage, and a quotation for
      every gap claimed.
    escalation: >-
      The engineering lead's own judgement overrides any reported verdict; the
      report is evidence for them, not a substitute for them. In release 1 no
      engineering lead is in the loop, so the report goes to the expert, who
      decides what to do with it under TR-010.
    acceptance:
      - >-
        Given a reported verdict, when the engineering lead disagrees, then their
        judgement is recorded as the verdict and the report is kept alongside it.
      - >-
        Given a reported gap, when it is stated, then the document is quoted for it.
  - id: TR-007
    decision: Decide the domain's own terms, and what each one means
    stages: [ST-001]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      Where the term is already used in the set, and any standard-setter's
      definition that differs from the expert's.
    escalation: >-
      None, and no substitute. Terms are the expert's; while they are away the
      vocabulary does not change.
    acceptance:
      - >-
        Given a term the expert has defined, when any later question or document
        uses that idea, then it uses the expert's word and not a synonym.
      - >-
        Given a standard-setter's definition that differs, when the term is
        recorded, then both are stated and the expert says which the set uses.
  - id: TR-008
    decision: Decide the interview on a section is finished
    stages: [ST-002]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      What the section would score as it stands, and what is still missing from it.
    escalation: >-
      None. The expert ends the interview; nobody ends it for them, and no question
      list runs past the point they call it done.
    acceptance:
      - >-
        Given an expert who says they have nothing more to add, when they say it,
        then no further question is put to them in that section.
      - >-
        Given an interview ended early, when the section is written, then what is
        missing is named to the expert, not hidden behind a score.
  - id: TR-009
    decision: Decide a section may be left at draft and moved on from
    stages: [ST-004]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The section's score, its blocking defects, and which later sections depend
      on what is missing.
    escalation: >-
      None, and no substitute. While the expert is away the section stays where it
      is.
    acceptance:
      - >-
        Given a section below 70 or carrying a blocking defect, when the expert
        chooses to move on, then it is written at `draft` and what was left behind
        is recorded as an open question or named plainly to them.
  - id: TR-010
    decision: Decide the set is ready to be offered for approval
    stages: [ST-005]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      Every section's state and grade, every blocking defect, and the buildability
      report's gaps with, for each, whether it is closed or owned.
    escalation: >-
      None, and no substitute. The expert offers the set; nobody offers it for
      them.
    acceptance:
      - >-
        Given a buildability gap that is neither closed nor given a decider and a
        date, when the expert offers the set for approval, then that gap is stated
        to them first.
      - >-
        Given a set offered for approval, when the approver opens it, then what
        the expert was shown under this rule is what the approver sees.
  - id: TR-011
    decision: Decide a backlog can be mapped from the set
    stages: [ST-007]
    approver: PER-004
    delegable_to_agent: true
    never_delegated: false
    agent_role: proposes
    evidence_required: >-
      Whether a golden thread exists, and which release-line stages have
      requirements behind them.
    escalation: >-
      The delivery lead's own judgement stands over any reported verdict, and an
      override is recorded with its reason. Where they are unavailable the
      workshop waits rather than proceeding without a backbone.
    acceptance:
      - >-
        Given a set with no journey, when the check runs, then it reports that a
        backlog cannot be derived, and names that as the reason.
      - >-
        Given a reported verdict the delivery lead disagrees with, when they
        record their own, then their verdict stands and the override and its
        reason are recorded beside the report.
  - id: TR-012
    decision: Decide which epics come first
    stages: [ST-008]
    approver: PER-004
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The release line, the dependencies in section 11, and the objective each
      epic moves.
    escalation: >-
      The delivery lead may re-order within the release line at any time; order
      never changes scope, which stays with TR-004. While they are away the order
      stands as last recorded, and nobody re-orders on their behalf.
    acceptance:
      - >-
        Given an ordering, when it is recorded, then each decision names whether
        value, dependency or the release line drove it.
  - id: TR-013
    decision: Accept a drafted section as saying what the expert meant, or correct it
    stages: [ST-003]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The drafted section in readable form, and its grade, so the expert judges
      the words and not the score.
    escalation: >-
      None, and no substitute. An unaccepted draft stays at `draft`; nobody
      accepts a section's wording on the expert's behalf while they are away.
    acceptance:
      - >-
        Given a drafted section the expert has not accepted, when the set's state
        is read, then that section is not shown as ready for anyone else to read.
      - >-
        Given an expert who corrects a drafted section, when the correction is
        applied, then it is their words that are kept, and the section is graded
        again before it advances.
  - id: TR-014
    decision: Accept or refute a section's score
    stages: [ST-003]
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The score, each finding with the quotation behind it, and the section's
      weakest part. The product asks as soon as the score is produced, so the
      expert's only action is to accept or to refute.
    escalation: >-
      None, and no substitute. While the expert is away the score waits,
      unaccepted, and the section does not advance. Nobody accepts a score on the
      expert's behalf.
    acceptance:
      - >-
        Given a score that has just been produced, when the expert sees it, then
        they are asked whether they accept it or refute it, and need take no
        other action.
      - >-
        Given an expert who accepts a score, when they accept it, then the
        acceptance is recorded and the section may advance on that score.
      - >-
        Given an expert who refutes a finding, when they give their reason, then
        the refutation and the reason are recorded, and the finding is checked
        against the document under FR-016.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-constraints, kind: constraints, path: ./10-constraints.md, title: Constraints }
  next: { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: "Assumptions, risks and dependencies" }
---

# Decision rights and trust rules

![Who decides what](diagrams/decision-rights.svg)

| ID | Decision | Decider | Agent may decide | Never delegated |
| --- | --- | --- | --- | --- |
| TR-001 | Approve a PRD for a release | PER-003 | no | yes |
| TR-002 | Set a section to final | PER-001 | no | yes |
| TR-003 | Produce a section's score and findings | PER-001 | **yes** | no |
| TR-004 | Decide scope | PER-001 | no | yes |
| TR-005 | State a domain fact as true | PER-001 | no | yes |
| TR-006 | Judge buildability, and report the gaps | PER-002 | **yes** | no |
| TR-007 | Decide the domain's own terms | PER-001 | no | yes |
| TR-008 | Decide a section's interview is finished | PER-001 | no | yes |
| TR-009 | Decide a section may be left at draft | PER-001 | no | yes |
| TR-010 | Decide the set is ready to offer for approval | PER-001 | no | yes |
| TR-011 | Decide a backlog can be mapped | PER-004 | **yes** | no |
| TR-012 | Decide which epics come first | PER-004 | no | yes |
| TR-013 | Accept or correct a drafted section | PER-001 | no | yes |
| TR-014 | Accept or refute a section's score | PER-001 | no | yes |

Every decision named in a stage of section 5 appears here. TR-007 to TR-013 were
added at version 0.2.0 to close that: five release-line stage decisions and both
of J-002's had no rule, which meant gates an engineering team would have had to
invent. TR-013 covers the one in the middle of the loop, the expert accepting
that a draft says what they meant, which is distinct from scoring it (TR-003),
from accepting or refuting the score (TR-014),
from leaving it at draft (TR-009) and from setting it final (TR-002).

## The shape of the trust boundary

Only three of fourteen are delegable, and all three are **assessments**, not
decisions:
TR-003 produces a document's score, which the expert then accepts or refutes
under TR-014, TR-006 judges whether it can be built from, and TR-011
judges whether a backlog can be mapped from it. All three produce evidence for a
person. None changes a document, and none can set a state.

Everything that commits anyone to anything, such as approving, finalising,
choosing scope, or asserting a fact, is never delegated. TR-005 is the strictest: a fact
nobody can stand behind is not written at all, by anyone.

The delegable assessments all carry the same two obligations: **quote the
document for every claim**, and **drop any finding the document does not
support**. An assessment that cannot be refuted by pointing at the text is not
evidence, it is an assertion, and the expert will correctly stop believing it.
See R-002 in section 11.
