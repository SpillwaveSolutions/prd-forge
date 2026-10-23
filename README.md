# prd-forge

An expert system for writing product requirements documents, for Claude Code.

A domain expert — in auditing, freight, claims, clinical trials, whatever it is —
talks to it, and it teaches, interviews, drafts, grades and writes. What comes out
is a linked set of schema-checked markdown documents that a development team can
derive a backlog from and build.

## What is in it

| Component | What it does |
| --- | --- |
| `prd-wizard` skill | Teaches each PRD section, interviews the expert, drafts it, grades it against a rubric, and writes the document set |
| `prd-to-backlog` skill | Derives features, epics, stories and spikes from an approved PRD, with every level traced to a requirement id. Never tasks |
| `prd-adversary` agent | Grades one section against its rubric, adversarially, read-only |
| `prd-engineer-review` agent | Reads the whole set as the engineering lead who has to build it, and reports what cannot be built |
| `prd-domain-voice` agent | Checks terminology and standard references against the stated domain, and flags invented citations |
| The mod (a pane) | `/prd` opens a pane beside the chat that steps through the set, showing each section's text, status and grade |
| `schemas/` | A JSON Schema per document kind, validating the YAML front matter |
| `scripts/prd-validate.mjs` | Checks front matter, the link graph, and cross-section id references. No dependencies |

## The document set

One directory, seventeen markdown files, the links between them in the YAML front
matter:

```
docs/prd/<slug>/
  prd.md                                 kind: prd       — index and executive summary
  01-problem-opportunity.md              section 1
  02-customer-market.md                  section 2
  03-objectives-metrics.md               section 3
  04-personas.md                         section 4
  05-user-journeys.md                    section 5
  06-scenarios.md                        section 5
  07-scope.md                            section 6
  08-functional-requirements.md          section 7
  09-nonfunctional-requirements.md       section 8
  10-constraints.md                      section 9
  11-decision-rights.md                  section 10
  12-assumptions-risks-dependencies.md   section 11
  13-open-questions.md                   section 12
  14-release-plan.md                     section 13
  15-glossary.md                         section 14
  16-change-log.md                       section 15
```

Two worked sets ship with the plugin:

- `docs/prd/prd-forge/` — prd-forge's own PRD, all seventeen documents, written
  with these conventions and graded by the adversarial agents. The scores and
  blocking counts in its front matter are real. Read this one to see what a full
  set looks like, including what a graded set looks like when it has not yet
  passed.
- `examples/acme-returns/` — a five-document subset, small enough to read in one
  sitting. Read this one for the front matter, the link chain and the id
  references.

## Using it

Say what you want to build. The wizard takes it from there:

> I want to build something that helps store associates handle returns at the
> counter.

Or ask for it by name: "use the prd-wizard skill". It will establish your domain
and vocabulary, create the set, and work the sections in the order that makes each
one answerable — journeys before requirements, personas before journeys.

Commands the mod adds:

| Command | What it does |
| --- | --- |
| `/prd [directory]` | Opens the stepper pane on a set, scanning for one if no directory is given |
| `/prd-step [next\|prev\|first\|last\|<n>]` | Moves the pane to another section |

In the pane: `p` previous, `n` next, `r` rescan, and a button per section.

Validate a set at any time:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" docs/prd/<slug>
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" docs/prd/<slug> --json
```

Exit code 1 on any error. It checks each document against its schema, the
parent/prev/next/children graph, and every cross-section id — persona, stage,
objective, requirement — plus the mechanically checkable parts of the five tests.

## Configuration

| Option | Default | What it is |
| --- | --- | --- |
| `docs_dir` | `docs/prd` | Where document sets are written and read, relative to the working directory |

## What a PRD is here

It says what to build, for whom, why, and how you know it works — and what not to
build. It never says how to build it. No technology or vendor choices, no names of
existing systems or components, no module or service splits, no agent designs, no
data models or API contracts, no tasks or estimates. Those belong in architecture
decision records, the architecture document, and the backlog.

Every requirement passes five tests: it names a user, states an outcome a person
can see, has a pass-or-fail acceptance test, carries a priority, and does not name
the component or technology that delivers it.

## Grading

Each section has a rubric of five to ten dimensions scored 0–4, a blocking-defect
list, and a list of industry-standard wording. The skill self-grades every
section; the adversarial agents grade sections 5, 7, 8 and 10 always, anything
below 70, and the whole set before it is circulated. Scores and blocking counts
are written into the front matter and shown in the pane.

A section reaches `review` at a score of 70 or more with zero blocking defects and
a clean validator run. It reaches `final` only with an adversarial pass and a
recorded approval.

## Installing

```
/plugin install prd-forge --marketplace SpillwaveSolutions/prd-forge
```

## Development

```bash
claude plugin validate <this directory>
claude plugin test <this directory>
node scripts/prd-validate.mjs examples/acme-returns
tsc -p <this directory>
```

The top-level `tsconfig.json` extends `.claude-plugin/types/tsconfig.json`, which
Claude Code writes the first time it loads the mod — so in a fresh clone, run the
mod once (`claude --plugin-dir <this directory>`) before `tsc`. That folder is
generated and is not in the repository.
