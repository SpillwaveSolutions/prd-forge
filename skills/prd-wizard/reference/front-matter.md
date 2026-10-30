# The document set: files, YAML front matter, and links

A PRD is one directory of markdown files. Each file carries YAML front matter
that is validated by a JSON Schema, and the **links between documents live in the
front matter**, not in the body. The whole set is navigable from the front matter
alone, which is what lets the stepper pane and the validator work.

## Where the set lives

```
<docs_dir>/<slug>/
```

`docs_dir` is the plugin's `docs_dir` option, `docs/prd` by default. `slug` is
the product's slug. One directory, one PRD. Two folders sit inside it and hold no
documents: `grades/`, the reasons for each grade, and `diagrams/`, each diagram's
source (`.mmd` or `.puml`) with its rendered `.svg` and `.png`.

## The files

| File | `kind` | `section` | `order` |
| --- | --- | --- | --- |
| `prd.md` | `prd` | — | 0 |
| `01-problem-opportunity.md` | `problem-opportunity` | 1 | 10 |
| `02-customer-market.md` | `customer-market` | 2 | 20 |
| `03-objectives-metrics.md` | `objectives-metrics` | 3 | 30 |
| `04-personas.md` | `personas` | 4 | 40 |
| `05-user-journeys.md` | `journeys` | 5 | 50 |
| `06-scenarios.md` | `scenarios` | 5 | 60 |
| `07-scope.md` | `scope` | 6 | 70 |
| `08-functional-requirements.md` | `functional-requirements` | 7 | 80 |
| `08-wireframes.md` | `wireframes` | 7 | 85 |
| `09-nonfunctional-requirements.md` | `nonfunctional-requirements` | 8 | 90 |
| `10-constraints.md` | `constraints` | 9 | 100 |
| `11-decision-rights.md` | `decision-rights` | 10 | 110 |
| `12-assumptions-risks-dependencies.md` | `assumptions-risks-dependencies` | 11 | 120 |
| `13-open-questions.md` | `open-questions` | 12 | 130 |
| `14-release-plan.md` | `release-plan` | 13 | 140 |
| `15-glossary.md` | `glossary` | 14 | 150 |
| `16-change-log.md` | `change-log` | 15 | 160 |
| `17-review-comments.md` | `review-comments` | 15 | 170 |

`17-review-comments.md` is optional. `/prd-comments` creates it the first time
it imports reviewers' Word comments, and it is not one of the eighteen.

Create all eighteen at the start, each at `status: pending` with an empty body
and a one-line note saying it has not been interviewed yet. The set is then
navigable from the first minute, and the pane shows progress honestly.

## Fields every document carries

```yaml
id: acme-returns-journeys        # lowercase, hyphens; unique in the set
kind: journeys                   # from the table above
schema: prd-forge/journeys@1     # which schema validates this front matter
title: User journeys
status: draft                    # pending | draft | review | final
updated: 2026-10-23
domain: retail returns           # the expert's domain; same across the set
score: 72                        # written by the grading pass only
blocking: 1                      # written by the grading pass only
graded: 2026-10-23
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns-personas, kind: personas, path: ./04-personas.md, title: Users and personas }
  next: { id: acme-returns-scenarios, kind: scenarios, path: ./06-scenarios.md, title: Scenarios }
  related:
    - { id: acme-returns-functional-requirements, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
```

Rules for `links`:

- Every section document has `parent` pointing at `prd.md`.
- `prev` and `next` form one chain in `order` sequence; the first section's
  `prev` is `prd.md`, the last section's `next` is `null`.
- The root has `children`: every section document, in `order` sequence, and
  `parent: null`.
- `path` is relative to the document itself, and always begins `./` or `../`.
- `related` is for cross-section dependencies worth following — requirements
  from journeys, decision rights from journeys, NFRs from personas.

Keep all four of `id`, `kind`, `path` and `title` on every link. The pane and the
validator both read links without opening the target.

Quote a `title` that holds a comma, a colon, or a `#`. Inside `{ … }` a comma
ends the value, so `title: Assumptions, risks and dependencies` is read as the
title `Assumptions` and a stray key. Write `title: "Assumptions, risks and
dependencies"`.

## The root document

```yaml
---
id: acme-returns
kind: prd
schema: prd-forge/prd-root@1
title: Acme Returns PRD
status: draft
updated: 2026-10-23
domain: retail returns
product: Acme Returns
slug: acme-returns
version: 0.1.0
owner: Dana Whitfield, Director of Product
stakeholders:
  - Head of Customer Operations
  - VP Supply Chain
  - General Counsel
created: 2026-10-23
golden_thread: J-001
summary:
  problem: >-
    Store associates cannot tell whether an item may be returned without calling
    the contact centre, so queues build and customers leave with the item.
  users: >-
    Store associates, contact-centre agents, and returns-processing staff at the
    regional hub.
  why_now: >-
    The 2026 consumer-rights amendment requires a stated reason for every refusal
    within one business day.
  bet: >-
    An associate can resolve any return at the counter in one conversation, and
    the customer leaves knowing the outcome and the reason.
  measure: >-
    Share of returns resolved at the counter without escalation; today 41%.
approvers:
  - { name: Dana Whitfield, role: Director of Product }
web_research: true               # optional; false keeps the domain check in the session
links:
  parent: null
  children:
    - { id: acme-returns-problem, kind: problem-opportunity, path: ./01-problem-opportunity.md, title: Problem and opportunity, section: 1, order: 10, status: draft }
    # ... one entry per section document, in order
---

# Acme Returns PRD

Five-sentence summary in prose, then the contents table.
```

`approvers` names each person whose decision counts as an approval, by `name`
and `role`, with the `persona` whose role they hold (FR-021). The older form, a
bare `PER-nnn`, still validates but draws a warning, and a set at `review` or
`final` needs at least one named approver. A decision in the change log counts
only when its `name` and `role` match a named approver.

`web_research` is optional and `true` when absent. Set it to `false` to keep the
domain voice reviewer's checks inside the session (TR-015).

The details block of the root is generated from the whole set: the scope, each
section's status and grade, every open question with no answer, with its decider
and date, and the sections that hold a blocking defect (FR-013). Run
`prd-details.mjs` after any section changes, or the root block goes stale.

## A section document

```yaml
---
id: acme-returns-functional-requirements
kind: functional-requirements
schema: prd-forge/functional-requirements@1
title: Functional requirements
status: draft
updated: 2026-10-23
domain: retail returns
section: 7
order: 80
requirements:
  - id: FR-001
    user: PER-001
    capability: See whether an item may be returned, and on what terms
    outcome: >-
      The associate sees a decision, the reason for it, and the terms, and can
      state them to the customer without calling anyone.
    acceptance:
      - >-
        Given an item bought 20 days ago under a 30-day policy, when the
        associate looks it up, then they see "returnable", the deadline date, and
        the refund method.
      - >-
        Given an item outside its window, when the associate looks it up, then
        they see "not returnable" and the specific reason, and the reason is
        recorded against the attempt.
    priority: must
    journey_stage: ST-002
    objective: O-001
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns-scope, kind: scope, path: ./07-scope.md, title: Scope }
  next: { id: acme-returns-nfr, kind: nonfunctional-requirements, path: ./09-nonfunctional-requirements.md, title: Non-functional requirements }
  related:
    - { id: acme-returns-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
---

# Functional requirements

| ID | User | Capability | Priority | Stage |
| --- | --- | --- | --- | --- |
| FR-001 | PER-001 Store associate | See whether an item may be returned | must | ST-002 |

## FR-001 — See whether an item may be returned

Prose, acceptance criteria as a list, and anything a reader needs that does not
fit the structured front matter.
```

## Body conventions

The front matter is the machine-readable record; the body is what a person
reads. Keep them consistent — the body says the same things in prose and tables.
Where they disagree, the front matter is authoritative and the grader will say so.

- One `##` heading per item (`## FR-001 — ...`), so the body is linkable.
- `prd-details.mjs` writes a generated details block at the end of each body,
  with a heading per item and every field. Do not edit it, and do not copy its
  fields by hand into the prose above it.
- A summary table at the top of list-bearing sections.
- No technology, in either place.

## YAML that survives

- Quote nothing that does not need it; use `>-` for any value with a colon, a
  newline, or more than about 80 characters.
- Dates as `YYYY-MM-DD`, unquoted.
- Ids as bare words: `FR-001`, not `"FR-001"`.
- Never a tab character.
- Keep every top-level scalar on one line: the stepper pane reads top-level
  scalars without a YAML parser, so `status: draft` must not be folded.

## Schemas

Every `schema:` value maps to a file in the plugin's `schemas/` directory:
`prd-forge/journeys@1` → `schemas/journeys.json`, and `prd-forge/prd-root@1` →
`schemas/prd-root.json`. Shared definitions are in `schemas/common.json`.

Validate the set with:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" docs/prd/<slug>
```

It checks the front matter against the schemas, the link graph for breaks, and
the cross-section id references (personas, stages, objectives, requirements). Run
it after writing each section and before declaring any section `final`.
