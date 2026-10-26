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
- `context`: the state of the world when it starts, with concrete values.
- `course`: what happens, in order, as the user experiences it.
- `expected_outcome`: what the user sees at the end — a pass-or-fail statement.

Aim for one happy path per journey, plus the two or three exceptions the domain
expert says actually happen.

## What does not belong

- Error codes, retry policies, system states.
- Scenarios invented for symmetry. If the expert has never seen it, park it in
  section 12 as a question.

## How to interview for it

Write each `course` step from the user's side, starting with "They" and a verb:
"They see …", "They are asked …", "They say …". The scenario's diagram draws a
step that starts "They see", "They read", or "They are" as the product speaking
to the user, and every other step as the user acting.

1. "Give me a normal run of this journey last month. Actual numbers."
2. "Now the most common way it goes wrong. What does the user see?"
3. "What does the user do about it? Who do they have to involve?"
4. "What happens when two people do this at the same time?"
5. "What happens when someone leaves halfway through and comes back next week?"
6. "What is the worst case you have actually seen?"

Questions 4 and 5 find the requirements teams discover late and expensively.

## Worked example (domain: freight transportation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **SC-003** · journey J-001 · stage ST-004 · variant: exception
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
| Variant coverage | Happy path only | Happy + one exception | Happy, the alternates, and the exceptions the expert has seen |
| Outcome testability | Narrative ending | An outcome | A pass-or-fail statement |
| User's view | Describes the system | Mixed | Everything is what the user sees or does |
| Concurrency and resumption | Not considered | Mentioned | Covered by a scenario each |

## Blocking defects

- The golden-thread journey has no `happy` scenario.
- A scenario referencing a `journey` or `stage` id that does not exist.
- An `expected_outcome` that cannot be judged pass or fail.
- No exception scenario anywhere in the document.

## Industry-standard wording

- Say "happy path", "alternate flow", "exception flow".
- Write `expected_outcome` as an observable state, not as "the system handles it".
- Keep Given/When/Then for acceptance criteria in section 7; scenarios are prose.
