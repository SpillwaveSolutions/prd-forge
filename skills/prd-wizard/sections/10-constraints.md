# Section 9 — Constraints

**Kind** `constraints` · **Schema** `prd-forge/constraints@1` · **File** `10-constraints.md`

## What this section is

Firm, legal and regulatory rules the product must obey, labelled as constraints.
A constraint is not negotiable and not a design choice: somebody outside the team
imposes it, and it has a name.

## Why it matters

Constraints become definition-of-done items that apply to every story, which is
why they must be separated from requirements. A constraint smuggled in as a
requirement gets prioritised, deferred, and then discovered during an audit.

## What belongs in each entry

- `id`: `C-nnn`.
- `category`: legal, regulatory, contractual, policy, firm, standard.
- `statement`: the rule.
- `authority`: who imposes it — the regulation, the contract clause, the firm
  policy, by name. "Compliance said so" is not an authority.
- `applies_to`: requirement, stage or journey ids; absent means everywhere.
- `verification`: how compliance is shown.

## What does not belong

- Preferences ("we prefer to keep data in one place").
- Technology mandates, unless a regulator genuinely names the technology.
- Non-functional targets. Residency and retention *rules* are constraints; the
  measurable target for them is an NFR in section 8. Write both and link them.

## How to interview for it

1. "What rules apply to this work that you cannot negotiate?"
2. For each: "Who imposes it? Name the regulation, the contract, or the policy."
3. "Where must the data live, and who says so?"
4. "What must be kept, for how long, and under whose rule?"
5. "Who must never be able to see what?"
6. "If an auditor asked you to prove this, what would you show them?"

## Worked example (domain: external audit)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **C-002** · regulatory · authority: PCAOB AS 1215, Audit Documentation
> Statement: audit documentation supporting a conclusion must be retained and
> retrievable for at least seven years, and must not be altered after the
> documentation completion date.
> (AS 1215 and the seven-year minimum are real — the minimum is statutory, under
> Sarbanes-Oxley s.103(a)(2)(A)(i). When you write a constraint like this, read
> the current standard yourself for the date the period runs from and for the
> completion deadline, which has changed: do not copy them from here.)
> Applies to: FR-040, ST-006.
> Verification: quarterly restore test; immutability demonstrated by the
> evidence chain export.
>
> **C-004** · contractual · authority: master services agreement, clause 11.3
> Statement: client-supplied data is processed and stored only within the
> client's stated jurisdiction.
> Applies to: all.
> Verification: residency attestation included in the engagement close pack.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Named authority | "Compliance" | A body | Named regulation, clause or policy, with a reference |
| Non-negotiable | Preferences mixed in | Mostly rules | Every entry is genuinely imposed from outside |
| Verification | Absent | Stated | A check somebody could actually run |
| Linkage | Blanket | Some `applies_to` | Scoped where scoped, with matching NFRs for measurable parts |
| Separation | Constraints written as requirements | Mixed | Cleanly separate from sections 7 and 8 |

## Blocking defects

- A constraint with no `authority`.
- A preference or design choice listed as a constraint.
- A retention or residency constraint with no corresponding NFR in section 8.
- An `applies_to` id that does not exist.

## Industry-standard wording

- Say "constraint", and name the instrument: regulation, clause, policy, standard.
- Cite as "`<body>` `<standard>` `<clause>`", for example "GDPR Art. 17".
- Say "data residency" and "data retention", not "where we keep stuff".
