# Section 12 — Open questions

**Kind** `open-questions` · **Schema** `prd-forge/open-questions@1` · **File** `13-open-questions.md`

## What this section is

What is not decided, who decides it, and by when. Each question names one decider
and one date, and usually becomes a time-boxed spike that ends in an answer or an
architecture decision record.

## Why it matters

A PRD with no open questions is lying. The purpose of this section is to let the
rest of the document be *decided* — anything genuinely unresolved moves here, so
section 7 does not have to hedge. It also makes the PRD approvable: a reviewer can
accept a document with known gaps when the gaps have owners and dates.

## What belongs in each entry

- `id`: `Q-nnn`.
- `question`: one question, answerable.
- `decider`: one person or role. Not "the team".
- `by`: a date.
- `blocks`: requirement, stage or release ids that cannot be settled until this is.
- `spike`: the time-boxed story that answers it, where there is one.
- `answer`: filled in when decided; the question then moves to the change log.

## What does not belong

- Questions with no decider. Those are complaints.
- Questions that are really risks (nobody can decide them) — section 11.
- Questions the expert can answer in the interview. Ask first.

## How to interview for it

Collect these as you go: every time the expert says "I'd have to check", "it
depends", or "we haven't decided", that is an entry. At the end of each section:

1. "Anything in that section you were unsure about?"
2. For each: "Who could actually settle this?"
3. "When do we need the answer — what does it hold up?"
4. "Could we answer it in a week of focused work? What would that work be?"

## Worked example (domain: municipal building permits)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **Q-003.** Which application types can be decided by a single reviewer, and
> which need building, fire and zoning together? Decider: Chief Building Official.
> By: 2027-01-15. Blocks: FR-012, IN-002, OUT-001. Spike: sample 200 decided
> applications from the last two years and count how many reviewers actually
> touched each.
>
> **Q-007.** May an applicant see a reviewer's internal notes, or only the
> published reason for a hold? Decider: City Attorney. By: 2026-12-10.
> Blocks: FR-014, TR-005.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Decider | Absent or "the team" | A role | One named role who can actually decide |
| Date | Absent | Present | Present, and before what it blocks |
| Blocks | Absent | Named loosely | Ids that exist |
| Answerability | Rhetorical | Answerable | Answerable, with a spike that would answer it |
| Honesty | Empty section | A few | Every hedge in sections 1–11 has a question here |
| Hygiene | Answered questions linger | Mostly current | Answered ones carry `answer` and appear in section 15 |

## Blocking defects

- An entry with no `decider` or no `by`.
- A `by` date after the release that the question blocks.
- A `must` requirement in section 7 that depends on an unanswered question and
  does not say so.
- An objective in section 3 with no baseline and no question here.

## Industry-standard wording

- Say "open question", "decider", "spike", "architecture decision record (ADR)".
- Write the question so a yes/no or a named value answers it.
- Say "time-boxed to `<n>` days" on each spike.
