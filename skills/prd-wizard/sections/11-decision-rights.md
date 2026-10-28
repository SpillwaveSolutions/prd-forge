# Section 10 — Decision rights and trust rules

**Kind** `decision-rights` · **Schema** `prd-forge/decision-rights@1` · **File** `11-decision-rights.md`

## What this section is

Who can approve what, and what is never delegated to an agent. For any product
where software proposes and a person disposes — and for every agentic product —
this section is where the trust boundary is written down.

## Why it matters

These rules become acceptance criteria on stories, plus separate stories for the
approval gates themselves. Without them, the team decides the trust boundary by
accident, in code, and the first regulator or incident finds it. They also
protect the product: a clear "never delegated" list is what lets everything else
be automated confidently.

## What belongs in each entry

- `id`: `TR-nnn`.
- `decision`: the decision being made, stated as a decision.
- `stages`: the `ST-nnn` journey stages whose decision this rule governs. Once
  any rule names its stages, the validator warns about a stage with a decision
  and no rule.
- `approver`: the role that may approve it, as a `PER-nnn` id from section 4.
- `second_approver`: optional. A second role that must also agree, for a
  four-eyes decision (the Agree role in Bain's RAPID). The validator fails the
  set when it is the same as `approver`, or names a persona that does not exist.
- `delegable_to_agent`: may software make this call unaided?
- `never_delegated`: must a person decide, always, whatever the confidence?
- `evidence_required`: what the approver must be shown before deciding. When an
  agent proposes, the evidence names the agent's reasons and its known limits,
  so the person can see why it proposed and when not to trust it (Microsoft HAX
  guideline G11).
- `escalation`: what happens when the approver is unavailable or disagrees.
  Required when an agent may decide; `evidence_required` is required when the
  decision is never delegated.
- `acceptance`: Given/When/Then statements proving the rule holds.
- `agent_role`: what an agent does: `none`, `proposes`,
  `acts-person-may-reverse`, or `acts`. The validator fails a never-delegated rule
  whose agent acts, and an agent-delegable rule whose agent does nothing.

## What does not belong

- Agent designs, model choices, confidence thresholds, prompt strategies. Those
  are architecture. Here you say *who decides* and *what they must see*.
- Role-based access control tables. Those are a design artifact derived from this.

## How to interview for it

1. "List every decision in the journeys. Who makes each one today?"
2. "Which of those would you let software make on its own? Be honest."
3. "Which must a person always make, even if software is right 99% of the time?"
4. "For each of those: what must the person be shown before they decide?"
5. "What happens when that person is on leave?"
6. "If software proposes and the person disagrees, what happens to the proposal?
   Is the disagreement recorded?"
7. "Who is accountable if the decision turns out wrong?"
8. "Who may withdraw this delegation, and what happens to work already done?"
   Record the answer as a decision right, not as a mechanism.

Question 3 is the heart of the section. Push on it: experts under-claim here when
they are enthusiastic about automation, and over-claim when they are nervous.

## Worked example (domain: consumer credit underwriting)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **TR-001** · decision: decline a credit application ·
> approver: PER-005 underwriter ·
> delegable_to_agent: false · never_delegated: true
> Evidence required: the application, the specific factors that drove the
> assessment, and the applicant's own stated circumstances.
> Escalation: no substitute approver below the credit committee; the decision waits.
> Acceptance: Given an assessment that recommends decline, when the underwriter
> opens it, then they see each factor that drove it and may override with a
> recorded reason; and no decline reaches the applicant without a named approver.
>
> **TR-003** · decision: approve an application inside policy ·
> approver: PER-005 underwriter · delegable_to_agent: true ·
> never_delegated: false
> Evidence required: the policy rules applied and the values they were applied to.
> Escalation: the underwriter may re-open any approval within the cooling period,
> and the change is recorded.
> Acceptance: Given an application inside every policy rule, when it is approved
> without an underwriter, then the rules applied and their inputs are recorded
> against the decision and are visible to the underwriter.
>
> **TR-006** · decision: tell the applicant why ·
> approver: PER-005 underwriter · delegable_to_agent: false ·
> never_delegated: true
> Evidence required: the reasons as they will be sent, in the applicant's language.
> Escalation: the reasons wait for an approver; a decline is never communicated
> without them.
> Acceptance: Given a declined application, when the notice is prepared, then the
> reasons name the factors that actually drove the decision, and an underwriter
> has approved the wording.
> (Many jurisdictions require a declined applicant to be told why. Find the rule
> that binds you, write it as a constraint in section 9, and cite it there.)

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Decision coverage | Few decisions listed | Most journey decisions | Every decision named in section 5 appears here |
| Approver | "Management" | A role | A persona id with matching `authority` in section 4 |
| Delegation stance | Unstated | Stated | Stated for every decision, with the never-delegated set explicit |
| Evidence | Absent | Mentioned | Named precisely enough to build a review view from |
| Escalation | Absent | Partial | Stated, including the unavailable-approver case |
| Testability | Prose | Some criteria | Given/When/Then per rule |
| No design | Names models or thresholds | One leak | None |
| Reversal | Not addressed | Override mentioned | Every rule an agent may decide says how a person sees the decision, overrides or reverses it, and that the override is recorded |

## Blocking defects

- A decision in a section 5 stage that appears in no entry here.
- An `approver` whose persona has no matching `authority` in section 4.
- `never_delegated: true` with `delegable_to_agent: true`.
- A never-delegated decision with no `evidence_required`.
- An entry naming a model, a confidence threshold, or an agent design.

## Industry-standard wording

- Say "decision rights", "approver", "delegation", "escalation path".
- Say "human in the loop" only if you then say which decision and what they see;
  otherwise it means nothing.
- Say "four-eyes" or "segregation of duties" where the domain uses those terms.
- Write rules as "`<role>` approves `<decision>`; `<role>` may not".

## References

These terms come from established practice. Cite them as `../reference/sources.md` says, and state any place where the set's meaning departs.

- Given/When/Then: "Introducing BDD", Dan North, 20 Sep 2006, https://dannorth.net/blog/introducing-bdd/
- Story, epic, and feature: "Epics, Features and User Stories", Mountain Goat Software, last updated 28 Apr 2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
