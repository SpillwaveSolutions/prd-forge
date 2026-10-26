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
- `applies_to`: requirement, stage or journey ids; absent, or `all`, means
  everywhere. The ids must exist.
- `verification`: how compliance is shown. Required.
- `nfr`: the `NFR-nnn` requirements that make the constraint measurable, such as
  the retention requirement behind a retention rule.

Test each one: **could the team change this by agreeing among themselves?** If
yes, it is not a constraint. A product decision goes in section 6 as scope; a
rule nobody has confirmed goes in section 11 as an assumption with an owner. A
`firm` constraint is a binding rule of the organization, set outside the product
team.

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

## Worked example (domain: clinical trial site activation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **C-002** · regulatory · authority: FDA 21 CFR Part 11, Electronic Records and
> Electronic Signatures
> Statement: where a site readiness decision is recorded and signed
> electronically, the record must be attributable to its signer and must remain
> readable and unaltered for the retention period.
> (21 CFR Part 11 is real and governs electronic records and electronic
> signatures. When you write a constraint like this, read the current regulation
> and your own sponsor's interpretation of it yourself for what it requires of a
> signature, a copy and an audit trail: do not copy the specifics from here.)
> Applies to: FR-040, ST-006.
> Verification: signature attribution and change history shown in the activation
> export, tested once per release.
>
> **C-004** · contractual · authority: clinical trial agreement, schedule 3
> Statement: patient-identifying data is never transmitted to or stored by the
> sponsor; only de-identified readiness evidence leaves the site.
> Applies to: all.
> Verification: field-level review of everything the site submits, signed off at
> each release by the data protection officer.

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
