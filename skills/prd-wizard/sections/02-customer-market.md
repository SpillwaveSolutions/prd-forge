# Section 2 — Target customer and market

**Kind** `customer-market` · **Schema** `prd-forge/customer-market@1` · **File** `02-customer-market.md`

## What this section is

Who buys it, who uses it, what they can buy instead, and why they would choose
this. Buyer and user are often different people; say both.

## Why it matters

It decides what "good enough" means. A product for a 12-person firm and a
product for a global one have the same journeys and completely different
non-functional requirements. It also keeps the team honest about substitutes:
the real competitor is usually a spreadsheet and a person who knows the job.

## What belongs in it

- One segment per `S-nnn`: name, `buyer`, `user`, size if known, willingness to pay.
- `competitors`: each with what they offer and `our_edge` — one sentence, honest.
- `why_we_win`: the single reason a buyer picks this, in the buyer's language.

## What does not belong

- A total-addressable-market figure with no source.
- Feature comparison matrices. Those belong in sales collateral.
- "We have no competitors." The status quo is a competitor; name it.

## How to interview for it

1. "Who signs the cheque? Who uses it every day? Same person?"
2. "How many of these organisations are there, and how do you know?"
3. "What do they use today to get this job done? Include spreadsheets and people."
4. "If they do nothing, what happens? Is doing nothing acceptable to them?"
5. "Of the alternatives, which would a buyer most likely pick instead of us, and
   what would make them pick us?"
6. "What would make a buyer reject this outright?"

## Worked example (domain: public accounting)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **S-001.** Mid-market audit firms, 50–400 staff. Buyer: managing partner or
> head of audit quality. User: preparers and managers. Size: `<count>` such firms
> in the US, per `<the named census or register, with its year>` — cite the real
> source you have, or make it an open question in section 12. Willingness to pay:
> already paying per-seat for working-paper software.
> **Competitors.** Incumbent working-paper suites — offer the file structure and
> sign-off trail; our edge: the evidence chain is reproducible per conclusion,
> not per file. Excel plus shared drives — offer total flexibility; our edge:
> the review trail survives staff turnover.
> **Why we win.** A reviewer can reproduce any conclusion without asking the
> preparer what they did.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Buyer vs user | Conflated | Both named | Both named, and both appear in section 4 |
| Sizing | Absent or unsourced | Estimated | Sourced and dated |
| Substitutes | "No competitors" | Named vendors only | Vendors *and* the status quo (spreadsheet, person, process) |
| Honest edge | Marketing claim | One differentiator | A differentiator a buyer could verify |
| Why we win | Feature list | An advantage | One sentence in the buyer's own words |

## Blocking defects

- The status quo is not named among the alternatives.
- A segment whose `user` matches no persona in section 4.
- `our_edge` that is a feature rather than an outcome the buyer can check.

## Industry-standard wording

- Say "segment", "buyer", "user", "substitute".
- Say "status quo" or "incumbent process", not "doing nothing".
- Avoid "disrupt", "best-in-class", "seamless". A reviewer will cut them.
