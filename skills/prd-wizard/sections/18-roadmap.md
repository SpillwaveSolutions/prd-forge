# Section 13: Roadmap

**Kind** `roadmap` · **Schema** `prd-forge/roadmap@1` · **File** `18-roadmap.md`

## What this section is

What the product will do now, next, and later. Each roadmap item names the
objectives it moves and the releases that deliver it. The roadmap is optional,
one per set, and it sits beside the release plan in section 13.

## Why it matters

The release plan says what each release delivers. The roadmap says why the
items come in this order and how sure the team is of each one. It is the page a
sponsor reads to see what changed since last month, and why. A roadmap kept in
chat is gone after the meeting. A roadmap kept in the set has ids, links, and a
change history that the validator checks.

## What belongs in the roadmap

- `format`: `now-next-later` (the default), `quarterly-themes`, `okr`, or
  `timeline`.
- `period`: the span the roadmap covers, such as `2027-H1`.
- `capacity`: optional. The percent of capacity for `planned` work,
  `technical_health`, and `unplanned` work. The defaults are 70, 20, and 10.
- `items`, each with:
  - `id`: `RM-nnn`, `title`.
  - `horizon`: `now`, `next`, `later`, or a quarter such as `2027-Q1`.
  - `status`: `not-started`, `on-track`, `at-risk`, `blocked`, `done`, or `cut`.
  - `objectives`: the `O-nnn` ids the item moves. At least one.
  - `releases`: the `REL-nnn` ids that deliver it.
  - `theme`, `owner`: one person or one persona id.
  - `depends_on`: the `A-`, `D-`, `R-`, and `Q-` ids the item waits on.
  - `target_date` and `date_status`: `committed` or `indicative`.
  - `blocker` and `mitigation`: required when the status is `at-risk` or
    `blocked`.
  - `source`: where the item came from, such as pasted notes or a tracker key.
    Tracker input is read-only.
  - `priority`: the scoring `method` and its inputs. See the next section.
- `changes`: each change to the roadmap, with its `date`, the `change`, and
  the `reason`. Add an entry to the change log in section 15 too.

## How to score an item

| `method` | Inputs | Score |
| --- | --- | --- |
| `rice` | `reach`, `impact` (0.25 to 3), `confidence` (0 to 1), `effort` (person-months) | reach × impact × confidence ÷ effort |
| `ice` | `impact`, `confidence`, `ease`, each 1 to 10 | impact × confidence × ease |
| `moscow` | `moscow`: `must`, `should`, `could`, or `wont` | none |
| `value-effort` | `quadrant`: `quick-win`, `big-bet`, `fill-in`, or `money-pit` | none |

Store the computed `score` for `rice` and `ice`. The validator computes it
again and warns when the stored value differs.

Effort and capacity are the only estimates in the set, and they live here only.
Every other section keeps its rule of no estimates.

## What does not belong

- Tasks, sprint numbers, or team assignments.
- A committed date on a `later` item. Later means not yet planned.
- An item that moves no objective.
- Technology milestones with no user outcome, such as "migrate the data store".

## How to interview for it

1. "What are you building now? Which release delivers it, and which objective
   does it move?"
2. "What comes next, and why before the rest?"
3. "What is later? Is any of it promised to someone outside the team?"
4. "Which item is at risk or blocked? What blocks it, and what are you doing
   about it?"
5. "How do you rank items: reach and effort, a quick gut score, must and
   should, or value against effort?"

## Worked example (domain: hospital discharge planning)

_The figures and organizations in this example are invented, to show the form.
Never copy a number from it into a real PRD._

> **RM-001 Medical ward pilot.** Now, on track. Delivered by REL-001, moves
> O-001. RICE: reach 500 discharges a quarter, impact 2, confidence 0.8, effort
> 3, score 266.67.
>
> **RM-002 Care-home discharges.** Next, not started. Delivered by REL-002,
> moves O-001 and O-002. Waits on D-003, the care homes' agreement to accept a
> handover.
>
> **RM-003 Mental-health wards.** Later. Moves O-002. No release yet, and no
> committed date.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Outcome framing | Feature names | Outcomes, loosely | Each item says what a user can newly do |
| Objective alignment | No objectives | Some items | Every item moves a named objective |
| Dependency visibility | None | Named, no owner | Every wait names its `A-`, `D-`, `R-`, or `Q-` id |
| Date honesty | Dates everywhere, unmarked | Some marked | Every date marked committed or indicative, and none on `later` |
| Prioritization rationale | No order given | Order without a reason | A scoring method, or a reason for each position |
| Change rationale | No history | Changes without reasons | Every change has a date and a reason |

## Blocking defects

- An item with no objective.
- A release or objective id that does not exist.
- A committed date on a `later` item.
- An `at-risk` or `blocked` item with no blocker or no mitigation.
- A `now` item whose release has no exit criteria.

## Industry-standard wording

- Say "now, next, later" for horizons, and "committed" or "indicative" for
  dates.
- Say RICE (reach, impact, confidence, effort) and ICE (impact, confidence,
  ease) by name.
- Avoid "phase 2" with no definition. Name the item and its horizon.
