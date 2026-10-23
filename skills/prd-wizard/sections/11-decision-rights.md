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
- `approver`: the role that may approve it, from section 4.
- `delegable_to_agent`: may software make this call unaided?
- `never_delegated`: must a person decide, always, whatever the confidence?
- `evidence_required`: what the approver must be shown before deciding.
- `escalation`: what happens when the approver is unavailable or disagrees.
- `acceptance`: Given/When/Then statements proving the rule holds.

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

Question 3 is the heart of the section. Push on it: experts under-claim here when
they are enthusiastic about automation, and over-claim when they are nervous.

## Worked example (domain: external audit)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **TR-001** · decision: sign off an audit conclusion ·
> approver: PER-005 engagement partner ·
> delegable_to_agent: false · never_delegated: true
> Evidence required: the conclusion, the evidence it rests on, every unresolved
> exception, and the reviewer's notes.
> Escalation: no substitute signer; sign-off waits.
> Acceptance: Given a workpaper with an unresolved exception, when the partner
> opens sign-off, then sign-off is unavailable and the exception is named.
>
> **TR-004** · decision: select the sample for a test of detail ·
> approver: PER-002 preparer · delegable_to_agent: true · never_delegated: false
> Evidence required: the population, the method, and the resulting selection.
> Escalation: the manager may re-select, and the change is recorded.
> Acceptance: Given a prepared selection, when the preparer accepts it, then the
> population, method and selection are recorded against the procedure.

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
