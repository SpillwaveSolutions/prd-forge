---
id: prd-forge-decision-rights
kind: decision-rights
schema: prd-forge/decision-rights@1
title: Decision rights and trust rules
status: draft
updated: 2026-10-23
domain: product management tooling
score: 75
blocking: 7
graded: 2026-10-23
section: 10
order: 110
decisions:
  - id: TR-001
    decision: Approve a PRD for a release
    approver: PER-003
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The summary, the scope, every section's state and grade, every blocking
      defect, and every open question with its decider and date.
    escalation: >-
      No substitute approver. Approval waits. A set is never treated as approved
      because its score is high.
    acceptance:
      - >-
        Given a set with any blocking defect, when approval is sought, then the
        approver is shown the defects and the set is not presented as ready.
      - >-
        Given a set with no recorded approval, when anyone reads its state, then it
        reads as not approved, whatever its scores are.
  - id: TR-002
    decision: Set a section's state to final
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      The section's grade, its blocking defect count, and the result of validating
      it.
    escalation: >-
      The expert may override the gate; the override and the score at the time are
      recorded in the change log.
    acceptance:
      - >-
        Given a section with one or more blocking defects, when final is requested,
        then it is not set without an explicit override from the expert.
      - >-
        Given an override, when it is applied, then the change log records that it
        was an override and the score at the time.
  - id: TR-003
    decision: Score a section against its rubric
    approver: PER-001
    delegable_to_agent: true
    never_delegated: false
    evidence_required: >-
      The rubric's dimensions and a quotation from the document for every score
      below full marks.
    escalation: >-
      The expert may refute any finding by pointing at the document; a finding the
      document does not support is dropped.
    acceptance:
      - >-
        Given a score below full marks on a dimension, when it is reported, then a
        quotation from the document is given for it.
      - >-
        Given a finding the expert refutes and the document does not support, when
        it is checked, then it is dropped and the expert is told it was dropped.
  - id: TR-004
    decision: Decide what the product is for and what is out of scope
    approver: PER-001
    delegable_to_agent: false
    never_delegated: true
    evidence_required: >-
      What the consequence of the choice is, including any release-line stage it
      would leave uncovered.
    escalation: >-
      None. The expert decides. Where the choice weakens the PRD, the objection is
      stated once and the decision is recorded with the dissent noted.
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
      question with a decider and a date.
    acceptance:
      - >-
        Given a figure or citation the expert did not supply and that has not been
        verified, when a section is drafted, then it does not appear in the
        document.
      - >-
        Given a citation that was checked and could not be confirmed, when it is
        reported, then it is marked unverified rather than stated as fact.
  - id: TR-006
    decision: Judge whether a PRD can be built from
    approver: PER-002
    delegable_to_agent: true
    never_delegated: false
    evidence_required: >-
      The release line, the requirements covering each stage, and a quotation for
      every gap claimed.
    escalation: >-
      The engineering lead's own judgement overrides any reported verdict; the
      report is evidence for them, not a substitute for them.
    acceptance:
      - >-
        Given a reported verdict, when the engineering lead disagrees, then their
        judgement is recorded as the verdict and the report is kept alongside it.
      - >-
        Given a reported gap, when it is stated, then the document is quoted for it.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-constraints, kind: constraints, path: ./10-constraints.md, title: Constraints }
  next: { id: prd-forge-assumptions-risks-dependencies, kind: assumptions-risks-dependencies, path: ./12-assumptions-risks-dependencies.md, title: Assumptions, risks and dependencies }
---

# Decision rights and trust rules

| ID | Decision | Approver | Agent may decide | Never delegated |
| --- | --- | --- | --- | --- |
| TR-001 | Approve a PRD for a release | PER-003 | no | yes |
| TR-002 | Set a section to final | PER-001 | no | yes |
| TR-003 | Score a section against its rubric | PER-001 | **yes** | no |
| TR-004 | Decide scope | PER-001 | no | yes |
| TR-005 | State a domain fact as true | PER-001 | no | yes |
| TR-006 | Judge buildability | PER-002 | **yes** | no |

## The shape of the trust boundary

Only two of six are delegable, and both are **assessments**, not decisions:
TR-003 scores a document and TR-006 judges whether it can be built from. Both
produce evidence for a person. Neither changes the document, and neither can set
a state.

Everything that commits anyone to anything — approving, finalising, choosing
scope, asserting a fact — is never delegated. TR-005 is the strictest: a fact
nobody can stand behind is not written at all, by anyone.

The two delegable assessments both carry the same two obligations: **quote the
document for every claim**, and **drop any finding the document does not
support**. An assessment that cannot be refuted by pointing at the text is not
evidence, it is an assertion, and the expert will correctly stop believing it —
see R-002 in section 11.
