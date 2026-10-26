# Section 5 (continued) — Scenarios

**Kind** `scenarios` · **Schema** `prd-forge/scenarios@1` · **File** `06-scenarios.md`

## What this section is

Concrete runs through a journey with real values and real circumstances: the
happy path, the alternates, and the exceptions. A journey is the shape; a
scenario is one trip through it with the details filled in.

## Why it matters

Journeys hide the hard cases. Scenarios surface them, and each exception
scenario usually produces a requirement nobody had thought of. The happy-path
scenario for the golden thread becomes the end-to-end acceptance test for
release 1.

## What belongs in it

- One `SC-nnn` per scenario, each bound to a `journey` and usually a `stage`.
- `variant`: `happy`, `alternate` or `exception`.
- `priority`: `must`, `should`, `could` or `wont`, as for a requirement. A `must`
  scenario sits on a release-line stage; the validator fails the set when it
  does not.
- `context`: the **Given**. What is true before the scenario starts, with
  concrete values.
- `trigger` and `course`: the **When**. What the user does, and what they see,
  in order.
- `expected_outcome`: the **Then**. What the user sees at the end, as a
  pass-or-fail statement with a number wherever a number decides it.
- `shown_in`: where the user meets this scenario: `screen`, `report`,
  `conversation`, or `none`. A `screen` or `report` scenario must link at least
  one wireframe.
- `wireframes`: the `WF-nnn` sketches that show what the user sees. Link them; do
  not describe the screen in prose. Wireframes stay one shared set in section 7,
  traced to the requirements they show, and each scenario links the ones it
  passes through.
- `stages`: for a scenario that runs across several stages, the stages it spans,
  in order. The golden thread's happy path should span the whole release line;
  the validator warns when none does.

`prd-diagrams.mjs` draws each scenario's views together: its flowchart, the
lifecycles it moves through, and the wireframes it links.

Keep each scenario to one user goal. A scenario that does two things is two
scenarios.

Cover, across the set:

- **The happy path** of each journey, the golden thread first.
- **At least two unhappy paths per happy path**: errors, refusals, timeouts,
  missing permissions, empty states. Take them from what the expert has seen.
  When the expert cannot name a second one, record that as an open question in
  section 12, not as an invented scenario.
- **First use and return**: the first time through, with nothing set up, and a
  return after a break.
- **The lifecycle** of what the user works on: creating it, changing it, and
  retiring it.

Where what the user works on passes through states (a claim, an order, a
section), write its lifecycle once in `lifecycles` and name it from each
scenario that moves through it:

- `subject`: the thing, in the domain's words.
- `states`: each `name` with its `meaning`, as the user can tell it.
- `initial` and `final`: where it starts, and where it can end.
- `transitions`: each move, with `from`, `to`, `when` (what happens, as the user
  sees it), `rule` (the business rule that must hold), and `by` (who makes the
  move).

`prd-diagrams.mjs` draws each lifecycle as a state diagram. The validator fails
the set when a transition names a state the lifecycle does not declare, and
warns about a state that is not final and has no way out. A lifecycle states
business rules, not a data model: no fields, no tables, no status codes.

## What does not belong

- Error codes, retry policies, system states.
- Vague words where a number decides it: "fast", "easy", "soon". Write the
  threshold instead, or move it to section 8 as a non-functional requirement.
- Scenarios invented for symmetry. If the expert has never seen it, park it in
  section 12 as a question.

## How to interview for it

Write each `course` step from the user's side, starting with "They" and a verb:
"They see …", "They are asked …", "They say …". The scenario's flowchart draws a
step that starts "They see", "They read", or "They are" as what the product shows
(a slanted box), and every other step as what the user does (a plain box).

1. "Give me a normal run of this journey last month. Actual numbers."
2. "Now the most common way it goes wrong. What does the user see?"
3. "What does the user do about it? Who do they have to involve?"
4. "What happens when two people do this at the same time?"
5. "What happens when someone leaves halfway through and comes back next week?"
6. "What is the worst case you have actually seen?"
7. "Must release 1 handle this, or could it wait?" Record the answer as
   `priority`.
8. "What does the very first time look like, before anything is set up?"
9. "How is the thing they work on changed later, and how is it closed or
   retired?"
10. "What states does it go through? What moves it from one to the next, who
    makes the move, and what must be true first?" Write the answers as a
    lifecycle.

Questions 4 and 5 find the requirements teams discover late and expensively.

## Worked example (domain: freight transportation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **SC-003** · journey J-001 · stage ST-004 · variant: exception · priority: must
> **Context.** Load 48213 is two hours from a 14:00 appointment at a receiver
> that closes at 15:00. The driver has not moved for 40 minutes.
> **Course.** 1. The dispatcher sees the load flagged as at risk, with the reason
> and how long it has been stalled. 2. They see the receiver's cut-off and the
> two alternative appointment slots available tomorrow. 3. They call the driver,
> confirm a breakdown, and reschedule to the 09:00 slot. 4. The shipper is
> notified of the new appointment and the reason.
> **Expected outcome.** The load shows the new appointment, the shipper has been
> notified once, and the delay reason is recorded against the load.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Concreteness | Abstract | Some values | Real values throughout |
| Bound to a journey | Unlinked | Journey named | Journey and stage named, both exist |
| One goal | Several goals in one scenario | Mostly one | Every scenario reaches exactly one user goal |
| Variant coverage | Happy path only | Happy + one exception | Each happy path has at least two unhappy paths the expert has seen, or an open question for the gap |
| Outcome testability | Narrative ending | An outcome | A pass-or-fail statement |
| User's view | Describes the system | Mixed | Everything is what the user sees or does |
| First use, return and concurrency | Not considered | Mentioned | Covered by a scenario each |
| Lifecycle | Creation only | Creation and one change | Creating, changing, and retiring what the user works on, with a lifecycle whose every transition states its rule and who makes it |
| Priority | None | Some scenarios | Every scenario has a priority, and every `must` sits on the release line |

## Blocking defects

- The golden-thread journey has no `happy` scenario.
- A scenario referencing a `journey` or `stage` id that does not exist.
- An `expected_outcome` that cannot be judged pass or fail.
- No exception scenario anywhere in the document.

## Industry-standard wording

- Say "happy path", "alternate flow", "exception flow".
- Write `expected_outcome` as an observable state, not as "the system handles it".
- Keep Given/When/Then for acceptance criteria in section 7; scenarios are prose.
