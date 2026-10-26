# Grading: rubrics, scores, and the adversarial pass

The point of grading is a PRD a development team can actually build from. A
section that reads well and cannot be built from has failed.

## Two levels of grading

**Self-grade**, you, after drafting a section. Score each rubric dimension in
`sections/<n>-<kind>.md`, check the blocking-defect list, and report. Do this
every time. It is cheap and catches most of it.

**Adversarial pass**, subagents whose job is to find fault. They do not see your
reasoning, only the document, so they cannot be talked round by it. Run the
adversarial pass:

- always for sections 5 (journeys), 7 (functional requirements), 8 (non-functional
  requirements) and 10 (decision rights);
- for any section the self-grade puts below 70;
- for the whole set before `status: final` or before the expert circulates it;
- whenever the expert asks for a review.

For the other sections a self-grade is enough unless the expert asks.

## Scoring

Each rubric dimension scores 0, 2 or 4 against its anchors. Interpolate 1 and 3
where the evidence sits between anchors.

```
score = round(100 * sum(dimension scores) / (4 * number of dimensions))
```

Write `score`, `blocking` and `graded` into the document's front matter. They are
the grading pass's fields: never set them by hand, and never raise a score
without a change to the document.

Write the reasons beside the document too, in `grades/<the document's file name>`
in the set's directory. The PRD pane opens this file when the expert clicks a
grade, and it replaces the previous grade's file. Use this shape:

```markdown
---
doc: ../08-functional-requirements.md
score: 74
blocking: 1
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why functional requirements scored 74

| Dimension | Score | Why |
| --- | --- | --- |
| Atomicity | 2 | FR-001 and FR-007 each join two capabilities with "and". |

## Blocking defects

- FR-009 names the warehouse management system, so it fails test 5.

## How to raise the grade

- **Atomicity (2 to 4):** Split FR-001 into "state the idea" and "establish
  vocabulary once".
```

One row per rubric dimension, in rubric order, each reason citing the document.
Each "how to raise" bullet names the dimension, the place, and the change.

| Score | Meaning | What to do |
| --- | --- | --- |
| 85, 100 | Buildable | Offer `review` status |
| 70, 84 | Buildable with questions | Name the weakest dimension and ask one question |
| 50, 69 | Not yet buildable | Return to the interview for this section |
| under 50 | Not started in earnest | Re-teach the section and interview again |

**Blocking defects are not points.** A section with a 92 and one blocking defect
does not reach `review`. Report the count separately and always name each one.

## The three agents

All three are read-only: they report, they never edit the document.

| Agent | What it does | When |
| --- | --- | --- |
| `prd-forge:prd-adversary` | Grades one section against its rubric, hunting for defects | Per section |
| `prd-forge:prd-engineer-review` | Reads the whole set as the engineering lead who has to build it, and reports what cannot be built | Before `final`, and after sections 5, 8 exist |
| `prd-forge:prd-domain-voice` | Checks terminology and standard references against the stated domain | Per section for 1, 2, 9, 14; once over the set before `final` |

Dispatch them in parallel when more than one applies, they are independent.

### Briefing them

Give each agent the **document and the rubric file paths**, the domain, and
nothing else. Do not tell it your own score, your own findings, or what you think
is weak: an agent handed your hypothesis returns it confirmed, and the pass is
then worth nothing.

A good brief:

> Grade `docs/prd/acme-returns/08-functional-requirements.md` against the rubric
> and blocking-defect list in
> `${CLAUDE_PLUGIN_ROOT}/skills/prd-wizard/sections/08-functional-requirements.md`.
> Domain: retail returns. The set's other sections are in the same directory;
> read what you need for cross-references.

A bad brief: "I think the acceptance criteria are weak, check whether you agree."

### Reading what comes back

Agents are confident when they are wrong. Before you pass a finding to the
expert, verify it against the document yourself. Drop findings that are not
there. Where two agents disagree, say so to the expert rather than picking one.

When the expert has already decided something an agent objects to, say the
objection once and record their decision. Do not re-litigate it every pass.

## Reporting to the expert

Report in plain language, in this shape, and keep it under about fifteen lines:

> **Functional requirements, 74/100, 1 blocking.**
> Strong: every requirement names a persona and carries a priority, and the
> `must` set matches the release line.
> Blocking: FR-009 names the warehouse management system, that is a component,
> so it fails test 5.
> Weakest dimension: acceptance criteria. Six of nineteen requirements have one
> criterion each, all happy-path.
> **One question:** for FR-012, what should the associate see when the customer
> has no receipt and no account? That is the case your criteria do not cover.

One question, not twelve. Fix it, re-grade, move on.

## Gates

| Transition | Requires |
| --- | --- |
| `pending` → `draft` | The section has been interviewed and written |
| `draft` → `review` | Self-grade ≥ 70 **and** zero blocking defects **and** `prd-validate.mjs` passes for the file |
| `review` → `final` | Adversarial pass run, zero blocking defects, and an approval recorded in section 15 |
| Set → circulated | Every section at `review` or better, `prd-engineer-review` run, validator clean |

The expert can override any gate. Write the status they ask for, and record the
override in section 15's change log with the score at the time.
