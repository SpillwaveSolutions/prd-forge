# Section 5 — User journeys

**Kind** `journeys` · **Schema** `prd-forge/journeys@1` · **File** `05-user-journeys.md`

## What this section is

A user journey is the steps a user takes to reach **one goal** with the product,
from start to end, in order. It says what the user does, sees and decides at each
step, and why. It does not say how the system works inside.

This is the most valuable section in the PRD and the one most often missing.

## Why it matters

- **It shows gaps.** Requirements written one at a time miss the steps between
  them. A journey makes the missing steps visible.
- **It sets priority.** The release line is the smallest set of steps that
  completes the journey.
- **It is the backbone of the story map.** Stages become features. Steps become
  stories.
- **It gives tests.** The whole journey becomes the end-to-end acceptance test
  for the release.

Without a journey there is no backbone for a story-mapping workshop, so features,
epics and stories cannot be derived from the PRD at all.

## What belongs in each journey

| Part | What it says |
| --- | --- |
| `persona` | Who the user is |
| `goal` | What the user wants at the end |
| `trigger` | What starts the journey |
| `stages` | The large steps, in order |
| steps in each stage | What the user does, sees and decides |
| `acceptance` on each stage | When the stage is done: one or more "Given …, when …, then …" statements the actor can observe. Required |
| `inputs` / `outputs` | What the user gives, and gets back |
| `handoff` | Where another person takes over |
| `pain_points` / `needs` | What is hard today, and what the product must fix. A pain point may be `{pain, stage, need}`, naming its stage and the need that answers it |
| `objectives` | The `O-nnn` objectives that show this journey works |
| `satisfaction` on each stage | How the stage feels to the user today, 1 (worst) to 5 (best), as the expert scores it |
| `end_state` | How the user knows they are done |

Every stage names **a person, an input, an output, a decision, and its
acceptance, and no technology**. The schema requires the `decision`.

A stage's acceptance says when the stage is done, from the actor's side. It is
not a requirement's acceptance: a requirement tests one capability, and a stage
tests the whole step of the journey. Each stage's acceptance becomes the
acceptance of the feature `prd-to-backlog` derives from that stage.

Exactly one journey carries `golden_thread: true`: the one journey release 1 must
deliver end to end.

## What does not belong

- System responses, internal steps, services, queues, or data flow.
- Screens. A journey survives a redesign; a screen flow does not.
- Steps that only a developer would recognise as a step.

## How it differs from related terms

| Term | Difference |
| --- | --- |
| User story | One small slice of one step. A journey holds many stories. |
| Use case | Often one interaction with the system, with the system's responses. A journey covers the whole path to a goal, including steps outside the product. |
| Process map | Shows how work flows through the organisation, often with system steps. A journey stays with what the user experiences. |
| Golden thread | The one journey version 1 must deliver end to end. It is a journey chosen for release 1. |

## How to interview for it

Interview one journey at a time. Do the golden thread first.

1. "Pick one person and one thing they are trying to finish. Who, and what?"
2. "What has to be true before they start? What kicks it off?"
3. "Name the big steps, five to eight of them, in order. Just the names."
4. Then per stage: "Who is acting here? What do they do? What do they see? What
   do they decide?"
5. "What do they have to provide at this stage, and what do they get back?"
6. "Does anyone else take over here? Who, and what do they receive?"
7. "How would you know this stage is done? Given what is true when it starts,
   when the actor does what, then what can they see?" Write the answer as
   "Given …, when …, then …". Add a second statement for a different way the
   stage can end, such as a refusal.
8. "What is hard about this stage today?"
9. "From 1 to 5, how does this stage feel to the user today? 1 is the worst it
   gets, 5 is fine as it is." Record the answer as the stage's `satisfaction`.
   Never estimate it: a stage the expert does not score stays without one. A 1
   or a 2 almost always has a pain point behind it; ask for it.
10. "At the very end — how does the user know they are finished?"
11. "If we built only steps 1 through N, would anyone get value? Where is the
   smallest complete path?" — that answer is the release line for section 6.

If the expert gives you a system step ("the file is validated"), convert it:
"Who sees that it was validated, and what do they do next?"

## Worked example (domain: hospital discharge planning)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **J-001** · persona: PER-002 Discharge coordinator · golden thread
> goal: a patient discharged with their medicines, transport and follow-up in
> place ·
> trigger: the treating clinician records that the patient is medically fit for
> discharge
>
> - **ST-001 Clinician records the patient as fit.** Actor: treating clinician.
>   Reviews the patient, records that they are medically fit, and notes any
>   condition on leaving. Inputs: the clinical review. Outputs: a patient ready
>   for discharge planning. Decision: is the patient medically fit today.
>   Handoff: discharge coordinator.
> - **ST-002 Coordinator builds the plan.** Actor: discharge coordinator. Opens
>   the patient, sees what is outstanding — medicines, equipment, transport,
>   follow-up, social care — and sees who has to act on each. Decision: which
>   needs apply to this patient. Outputs: one plan, visible to everyone named
>   in it.
> - **ST-003 Pharmacy prepares the medicines.** Actor: ward pharmacist. Sees the
>   discharge prescription and when transport is expected, dispenses, and records
>   the counselling the patient needs. Inputs: the prescription. Outputs:
>   dispensed medicines and a counselling note. Decision: is anything unsafe to
>   send home. Handoff: ward nurse.
> - **ST-004 Community team accepts the handover.** Actor: community nurse. Sees
>   the plan and what is expected of them, and accepts it or raises a query.
>   Decision: accept or query. Handoff: discharge coordinator.
> - **ST-005 Coordinator confirms transport and the family.** Actor: discharge
>   coordinator. Confirms the transport slot and that someone will be at home.
>   Decision: is the patient safe to travel today. Handoff: ward nurse.
> - **ST-006 Nurse completes the discharge.** Actor: ward nurse. Gives the
>   patient their medicines and documents, confirms they know what happens next,
>   and records that they have left. Outputs: a completed discharge and a
>   released bed. Decision: is everything in the plan actually in the patient's
>   hands.
>
> pain points: the plan lives in three places and a phone; medicines arrive after
> the transport slot has passed; the community team first hears of the patient on
> the day; nobody can say what is still outstanding without ringing round.
> needs: one plan everyone named in it can see; medicines ready before transport;
> the community team notified when the plan is made, not when the patient leaves.
> end state: the patient has left with their medicines, their documents and a
> booked follow-up, and the community team has accepted the handover.
> acceptance, ST-003: given a discharge prescription and an expected transport
> time, when the pharmacist dispenses, then the ward sees the medicines ready
> and the counselling note recorded before the transport slot.
> satisfaction today, ST-001 to ST-006: 4, 2, 1, 2, 3, 3. The coordinator's
> stages score low because the plan lives in three places.

Do not draw the journey by hand: `prd-diagrams.mjs` generates its diagram from the front matter. Do not draw screens here. Sketches of screens and reports go in `08-wireframes.md`, after section 7.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| One goal | Several goals tangled | One goal, drifting | One goal, named, reached at the end |
| Ordered stages | Unordered list | Ordered, gaps | 5–8 ordered stages with no missing step |
| Person per stage | No actor | Actor on some | Every stage names its actor |
| Decision per stage | None | Some | Every stage names what the user decides |
| Stage acceptance | None, or prose | Given/When/Then on some stages, or outcomes the actor cannot observe | Every stage has Given/When/Then, each pass-or-fail and observable by the actor |
| Inputs and outputs | Absent | Partial | Each stage says what is given and what comes back |
| Handoffs | Implicit | Mentioned | Every change of actor is explicit |
| No technology | Names systems | Occasional leak | No system, vendor or component anywhere |
| End state | Absent | Vague | A condition the user can observe |
| Satisfaction | No stage scored | Some stages scored, or scores the expert did not give | Every stage scored by the expert, and every stage at 1 or 2 has a pain point and a need that answers it |
| Golden thread | None marked | Marked arbitrarily | Exactly one, and it is the smallest complete path to value |
| Steps outside the product | Omitted | Mentioned | Included, including other people's work |

## Blocking defects

- No journey carries `golden_thread: true`, or more than one does.
- A stage with no actor, or with a system as its actor.
- A stage with no acceptance, or with acceptance not written as Given/When/Then.
- A stage that names a technology, vendor, component or screen.
- A journey whose `persona` matches no `PER-nnn` in section 4.
- Fewer than two stages, or a journey that never reaches its stated goal.
- A `pain_points` entry that no `needs` entry answers.

## Industry-standard wording

- Say "journey", "stage", "step", "hand-off", "end state".
- Say "golden thread" for the release-1 journey; say it once and define it in
  the glossary.
- Write steps in the active voice with the actor first: "The coordinator opens
  the plan and sees two medicines not yet dispensed."
- Never "the system validates"; write what the person sees instead.
