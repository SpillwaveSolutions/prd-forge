---
name: prd-to-backlog
description: Derive a traceable backlog from an approved PRD — features from journey stages, epics from the release line, stories from functional requirements, and spikes from open questions and risks. Use when someone has a PRD and wants a backlog, a story map, epics, user stories, or a story-mapping workshop prepared; when they ask what to build first from a PRD; or when they want to check that a PRD is actually buildable. It never writes tasks or subtasks — those come from engineering design, not from the PRD.
---

# PRD to backlog

Turn an approved PRD document set into features, epics, stories and spikes, with
every level tracing back to a PRD requirement id.

Read `../prd-wizard/reference/backlog.md` first. It holds the mapping table, the
timing rules, and the eleven derivability checks. This file is the procedure.

## What you never produce

**Tasks and subtasks.** They come from engineering design and ADRs applied to one
story, written during iteration planning by the team that will build them. If
asked for them, say where they come from and stop at stories.

Technology appears for the first time at the task level. Nothing you write here
names a technology, a vendor, a component, or a service.

## Before you start: is the PRD ready?

Run the eleven derivability checks from `backlog.md`. If any fail, say which, and
offer to run `prd-forge:prd-engineer-review` for a full report. Do not derive a
backlog from a PRD with no journey — without the golden thread there is no
backbone, and features cannot be derived at all. Say so plainly and offer the
`prd-forge:prd-wizard` skill to fill the gap.

Also check the PRD's `status`. Deriving from a `draft` PRD is fine if they ask,
but record the version you derived from and tell them the backlog will need
re-deriving when the PRD changes.

## The derivation, in order

**1. Features — one per journey stage.** Take the golden thread's stages in
order. Each becomes one feature. Its `users` are the stage's actor plus anyone
receiving a hand-off; its `outcome` is what the stage achieves for the user; its
`success_metric` comes from the PRD objective its requirements serve; its
`acceptance` is the stage's Given/When/Then, copied as written; its
`requirements` are every PRD requirement whose `journey_stage` is this stage.

A stage with no requirements is a hole in the PRD, not a feature with no stories.
Report it.

**2. Epics — the in-scope part of each feature for one release.** Use the PRD's
scope section: the release line says which stages release 1 completes, and the
in-scope and out-of-scope items say how much of each. One epic per feature per
release. Epic acceptance is what proves the stage works end to end — usually the
PRD scenario for that stage.

**3. Stories — one journey step for one persona.** For each PRD functional
requirement in the epic, write a story: `As a <persona>, I want <capability>, so
that <outcome>`, with the requirement's acceptance criteria as the story's
Given/When/Then. The persona comes from the requirement's `user`; use the persona
name from section 4, not the id, in the story text. Attach the wireframes that
illustrate the requirement (`illustrates` in the wireframes document), so the team
sees the screen beside the story.

Where one requirement covers several steps, split it into several stories and say
you did. Where several requirements are really one story, keep them separate —
the trace matters more than tidiness.

**4. Definition of done, per story.** From the PRD: each constraint (section 9)
becomes a definition-of-done item on the stories it `applies_to`, and on every
story when `applies_to` is absent or `all`. Non-functional
requirements (section 8) become either acceptance criteria on the stories they
`applies_to`, definition-of-done items where they are universal, or separate
platform stories where they need building. Decision rights (section 10) become
acceptance criteria, plus their own stories for the approval gates themselves.

**5. Spikes.** One per PRD open question that blocks a release-line requirement,
and one per high/high risk whose mitigation is not already a story. Each is
time-boxed and ends in an answer, an ADR, a prototype, or a decision. Take the
decider from the PRD.

**6. Order.** Order epics by the release line, then by dependency (PRD section
11), then by the objective they move. Say what drove each ordering decision in
one line — the team will ask.

## What you write

A document set in `<docs_dir>/<slug>-backlog/`, same front matter and link
conventions as a PRD set (`../prd-wizard/reference/front-matter.md`):

| File | `kind` | `order` |
| --- | --- | --- |
| `backlog.md` | `backlog` | 0 |
| `01-features.md` | `features` | 10 |
| `02-epics.md` | `epics` | 20 |
| `03-stories.md` | `stories` | 30 |
| `04-spikes.md` | `spikes` | 40 |

The root carries `prd` (the relative path to the PRD root) and `prd_version`.
Every feature names its `journey_stage` and its PRD `requirements`; every epic
names its feature; every story names its epic and its PRD `requirements`. That
chain is the trace, and the validator checks it:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" <backlog set directory>
```

`/prd <backlog set directory>` steps the pane through it.

## Report back

- The release-1 story map: stages across, stories down, with the release line
  drawn.
- Any journey stage with no requirements, and any `must` requirement with no story.
- The spikes, with what each blocks.
- What you deliberately did not write: tasks, subtasks, estimates, and sizing.
  Say that the story-mapping workshop and iteration planning produce those, and
  who attends each — the table is in `backlog.md`.
