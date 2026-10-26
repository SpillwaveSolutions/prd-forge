# Section 1 — Problem and opportunity

**Kind** `problem-opportunity` · **Schema** `prd-forge/problem-opportunity@1` · **File** `01-problem-opportunity.md`

## What this section is

The case that there is something here worth building. Each entry is one problem:
whose it is, what it costs them, what makes you believe it is real, and why this
is the moment to act.

## Why it matters

Every later section is judged against this one. A requirement that serves no
problem here is scope that nobody asked for, and the engineering review will ask
why it exists. Teams that skip this section argue about features for months
because they never agreed what hurts.

## What belongs in it

- One entry per distinct problem, with its own `P-nnn` id.
- `who`: the role that suffers it, matching a persona in section 4.
- `persona`: that persona's `PER-nnn` id, once section 4 exists. The validator
  checks it.
- `evidence`: what makes it more than an opinion — interview counts, support
  volumes, cycle times, audit findings, lost deals, regulatory letters.
- `why_now`: the change that makes this urgent.
- `cost_of_inaction`: what it costs to leave it alone, in money, time or risk.

## What does not belong

- Solutions. "They need a dashboard" is a solution; "they cannot tell which
  files are overdue without asking three people" is a problem.
- Problems nobody in section 4 has.
- Internal problems dressed as user problems ("our data model makes this hard").

## How to interview for it

1. "Walk me through the last time this went badly. What happened, in order?"
2. "Who felt that? What is their job title?"
3. "How often does that happen, and how do you know?"
4. "What does it cost when it happens — hours, rework, a fine, a lost client?"
5. "What do they do today instead? Why does that not work?"
6. "What changed recently that makes this worth fixing now rather than last year?"

When the expert answers with a solution, ask: "If you had that, what would stop
being painful?" Record the answer, not the solution.

## Worked example (domain: freight transportation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **P-001.** Dispatchers cannot tell whether a load is at risk until the driver
> is already late, so recovery options have closed.
> **Who.** Dispatcher at a regional carrier.
> **Evidence.** 112 of 400 late loads in Q2 had a detectable delay signal more
> than two hours before the appointment; none was escalated. Pilot interviews
> with six dispatchers, all of whom check status by phone.
> **Why now.** Two of the top five shippers added on-time penalties in their
> 2026 contracts.
> **Cost of inaction.** $340k of penalties in 2025, plus the rebooking cost.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Problem, not solution | Describes a feature | Mixed | Every entry is a condition the user suffers |
| Named sufferer | "The business" | A role | A role that appears in section 4 |
| Evidence | Assertion only | Anecdote | Counted, sourced, or dated |
| Why now | Absent | Generic urgency | A specific change, with its source |
| Cost | Absent | Qualitative | Quantified in money, time or risk |
| Coverage | One problem for a broad product | Main problems | Each problem traced to by at least one requirement |

## Blocking defects

- An entry whose `statement` names a product, a feature, or a technology.
- An entry whose `who` matches no persona in section 4.
- `evidence` that is only the author's own opinion, with nothing countable.
- A problem with no requirement in section 7 that serves it, at approval time.

## Industry-standard wording

- Say "problem statement" and "evidence", not "hypothesis" unless you really are
  going to test it and say how.
- Say "cost of inaction", not "burning platform".
- Quantify as "N of M, in `<period>`", never "many" or "most".
