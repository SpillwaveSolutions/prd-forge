# Section 13 — Release plan

**Kind** `release-plan` · **Schema** `prd-forge/release-plan@1` · **File** `14-release-plan.md`

## What this section is

Which outcomes come first. Releases in order, each naming what a user can do
afterwards that they could not before, which journey stages it completes, which
requirements it carries, and which objectives it moves.

## Why it matters

This is the ordering the backlog inherits. It turns scope into a sequence without
turning into a project plan: outcomes and stages, never tasks, never estimates.
A release whose outcomes a user would not notice is a release that should be
merged into the next one.

## What belongs in each release

- `id`: `REL-nnn`, `name`.
- `outcomes`: what a user can do after it that they could not before. Written
  from the user's side.
- `journey_stages`: the stage ids it completes.
- `requirements`: the requirement ids it carries.
- `objectives`: the objective ids it is expected to move.
- `target_date`: where one is committed, with `date_status`: `committed` or
  `indicative`.
- `exit_criteria`: pass-or-fail conditions that show the release did what it
  promised, ideally an objective's threshold. The validator warns about a
  release without them.
- `depends_on`: the assumptions, dependencies, risks, and questions it waits on.
- `readiness`: what must be true outside the build team at launch, such as
  support, training, communications, and legal sign-off.

The first release's stages must be exactly the release line in section 6.

## What does not belong

- Tasks, estimates, team assignments, sprint numbers.
- Technology milestones ("migrate the data store").
- Releases that deliver no user-visible outcome.

## How to interview for it

1. "Release 1 is the release line from section 6. Confirm: after it, what can a
   user do end to end?"
2. "What is the next thing they would ask for, and why that before the others?"
3. "Which objective does each release move? By how much?"
4. "Is any release date actually committed to someone outside the team?"
5. "Which release closes the open questions from section 12?"

## Worked example (domain: hospital discharge planning)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **REL-001 Medical ward pilot.** Outcomes: a discharge coordinator takes a
> patient from medically fit to left-the-building with medicines and follow-up in
> place, without ringing round; the community team knows about the patient the
> day the plan is made. Stages: ST-001…ST-006. Requirements: all `must` in
> section 7. Objectives: O-001. Target: 2027-04-30, committed to the trust's
> winter planning group.
>
> **REL-002 Care-home discharges.** Outcomes: the same journey for patients going
> to a care home, with the home accepting the handover. Stages: ST-004 extended.
> Requirements: FR-050…FR-058. Objectives: O-001, O-002. Target: none committed.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Outcomes | Feature names | Outcomes, loosely | What a user can newly do, in their terms |
| Sequence rationale | Arbitrary | Implied | Each release's position justified by value or dependency |
| Traceability | None | Partial | Stages, requirements and objectives, all existing ids |
| Release 1 | Does not match the release line | Close | Identical to section 6's release line |
| No tasks | Tasks and estimates present | Some | None |
| Dates | Dates everywhere | Some | Dates only where committed, and marked as such |

## Blocking defects

- Release 1's stages differ from the release line in section 6.
- A release with no user-visible outcome.
- A requirement id or stage id that does not exist.
- Tasks, estimates or team assignments anywhere in the section.

## Industry-standard wording

- Say "release", "outcome", "now / next / later" if you use horizon language.
- Say "target date" and mark whether it is committed or indicative.
- Avoid "phase 2" with no definition; name the release and its outcomes.
