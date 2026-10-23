# Root document — the PRD index and executive summary

**Kind** `prd` · **Schema** `prd-forge/prd-root@1` · **File** `prd.md`

## What this is

The front door. It names the product, the owner, the version, and the people who
have to agree. It carries the executive summary — five sentences — and it links
to every section document. A reader who opens only this file knows what is being
built, for whom, why now, and how we will know it worked.

## Why it matters

Two readers never read the whole PRD. The executive who approves it reads this
page. The engineer who inherits the work six months later reads this page first
to decide which sections to trust. If the summary and the sections disagree, the
PRD has already failed: people will build from the summary.

## What belongs in it

- `product`, `slug`, `version`, `owner`, `stakeholders`, `created`.
- `summary`: `problem`, `users`, `why_now`, `bet`, `measure`. One sentence each.
- `golden_thread`: the id of the one journey release 1 must deliver end to end.
- `links.children`: every section document, in reading order.
- In the body: the five summary sentences as prose, then the contents table.

## What does not belong

- Any detail that lives in a section. The summary points, it does not duplicate.
- A technology, a vendor, a system name, or an architecture sketch.
- A date for anything but the release plan's own targets.

## How to interview for it

Do this section **twice**: a rough pass first, so the interview has a spine, and
again at the end, when the sections have taught you what the product really is.

1. "In one sentence a customer would recognise, what problem are we solving, and
   whose problem is it?"
2. "Who uses this day to day? Name the roles, not the people."
3. "Why now? What changed — a regulation, a cost, a competitor, a new capability?"
4. "If this works, what can those users do next year that they cannot do today?
   Say it without naming any software."
5. "What one number tells us it worked, and what is that number today?"

If they cannot answer 5, write it into section 12 as an open question with a
decider and a date. Do not invent a baseline.

## Worked example (domain: external audit)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **Problem.** Audit teams spend more time chasing and reconciling client data
> than testing it, and reviewers cannot see which version of a file a conclusion
> rests on. **Users.** Preparers, managers and partners at audit firms, plus the
> client staff who supply data. **Why now.** Regulators now require the evidence
> chain for a conclusion to be reproducible on request. **Bet.** A preparer can
> take a revenue procedure from data request to signed-off workpaper without
> leaving the product, and every conclusion names the evidence it rests on.
> **Measure.** Median days from first data request to signed-off workpaper;
> today 19 days on pilot engagements.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Problem clarity | Names a solution, not a problem | A problem, but no owner of it | A problem, a named sufferer, and what it costs them |
| Users | "Users" or a market category | Roles named | Roles named, and each appears in section 4 |
| Why now | Absent, or "the market is growing" | A plausible reason | A specific change with a date or a source |
| Bet | A feature list | An outcome, partly | One outcome, no technology, traceable to the golden thread |
| Measure | No number | A metric with no baseline | A metric, today's value, and a target |
| Linkage | Sections missing from `links.children` | All linked, order wrong | All linked, in reading order, `golden_thread` set |

## Blocking defects

- The summary names a technology, a vendor, or an existing system.
- `golden_thread` is empty once section 5 has a journey.
- A section document exists on disk but is not in `links.children`.
- `measure` has no digit in it anywhere.

## Industry-standard wording

- Say "problem statement", not "pain point narrative".
- Say "executive summary", not "TL;DR".
- Say "success measure" or "success metric", not "KPI" unless the business
  already governs it as one.
- Write the bet as "A `<role>` can `<outcome>`", never "The system will provide".
