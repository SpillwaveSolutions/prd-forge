# Section 3 — Business objectives and success metrics

**Kind** `objectives-metrics` · **Schema** `prd-forge/objectives-metrics@1` · **File** `03-objectives-metrics.md`

## What this section is

The business results expected, each with a metric, today's value, a target, and
an owner. This is the contract: if the product ships and these do not move, the
product did not work.

## Why it matters

Without a baseline, a target is a wish, and nobody can declare success or
failure. These metrics become the measures on each feature and epic, and they
are what gets checked after release. They also settle priority arguments: the
requirement that moves O-001 beats the one that moves nothing.

## What belongs in it

- One `O-nnn` per business result. Three to five is usually right.
- `metric`: what is measured, precisely enough that two people would compute it
  the same way.
- `baseline`: the value today. If it is unknown, that is an open question in
  section 12 with a decider and a date — not a blank.
- `target` and `by`: the value we expect and when.
- `owner`: the one person accountable for the number, not a committee.

## What does not belong

- Output counts dressed as outcomes ("ship 14 features", "80% of screens built").
- Vanity metrics with no decision attached to them.
- Engineering metrics (build time, test coverage). Those belong to engineering.

## How to interview for it

1. "If this works, what business number moves?"
2. "How is that number computed today? Who computes it?"
3. "What is it right now? Give me the actual figure and the period."
4. "What value would make this clearly worth having done?"
5. "By when, and who is on the hook for it?"
6. "What would move that number *without* this product? Could we just do that?"

Question 6 is the one people skip. Ask it; it occasionally kills a product and
saves a year.

## Worked example (domain: insurance claims)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **O-001.** Cut the time a claimant waits for a first decision.
> Metric: median hours from claim submitted to first decision communicated,
> auto and home personal lines. Baseline: 52 hours (Jan–Jun 2026, claims
> warehouse). Target: 8 hours by 2027-06-30. Owner: VP Claims Operations.
> **O-002.** Reduce reopened claims caused by missing documentation.
> Metric: reopen rate within 30 days attributed to documentation. Baseline:
> 11.4%. Target: under 6% by 2027-06-30. Owner: Director, Claims Quality.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Outcome, not output | Counts deliverables | Mixed | Every objective is a business result |
| Metric precision | "Improve efficiency" | A named metric | A metric two people would compute identically |
| Baseline | Absent | "To be measured" | A figure, with its period and source |
| Target | Absent or vague | A number | A number with a date |
| Owner | A team or committee | A role | One named role accountable |
| Count | More than 8, or 0 | 6–8 | 3–5, each traceable from section 1 |

## Blocking defects

- An objective with no baseline and no matching open question in section 12.
- A `target` or `baseline` with no digit in it.
- An objective that no requirement in section 7 references.
- More than eight objectives: that is a strategy document, not a release.

## Industry-standard wording

- Say "baseline" and "target", not "current state" and "goal state".
- Say "leading indicator" / "lagging indicator" where the distinction matters.
- Write metrics as "median/95th percentile `<unit>` from `<event>` to `<event>`".
