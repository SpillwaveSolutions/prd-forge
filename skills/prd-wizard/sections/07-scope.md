# Section 6 — Scope

**Kind** `scope` · **Schema** `prd-forge/scope@1` · **File** `07-scope.md`

## What this section is

What is in this release, what is out, and what we are deliberately not doing at
all. Plus the release line: the smallest set of journey stages that completes the
golden thread.

## Why it matters

Scope is the only section that can say no, and a PRD that cannot say no is a
wish list. The in-scope list becomes the epics for release 1; the release line is
what the story-mapping workshop draws across the story map. Out-of-scope items
save the team from re-litigating the same argument every sprint.

## What belongs in it

- `release`: which release this scope describes, starting with its `REL-nnn` id
  from section 13.
- `outside_product`: a release-line stage a person does outside the product for
  now, with the `workaround`. It counts as part of the release line.
- `release_line`: the smallest set of journey stages that completes the golden
  thread, stated plainly.
- `in_scope`: one `IN-nnn` per item, each tied to a journey stage and the
  requirement ids it covers.
- `out_of_scope`: one `OUT-nnn` per item, with `revisit` where there is a plan.
- `non_goals`: things a reasonable reader would expect and we are not doing, with
  no plan to. These differ from out-of-scope: out-of-scope is "not yet",
  a non-goal is "not ever, and here is why".

## What does not belong

- Estimates, sprint counts, team assignments.
- Technology decisions dressed as scope ("in scope: the event bus").

## How to interview for it

1. "Walk the golden thread. For each stage: must release 1 complete this stage,
   or can a person do it outside the product for now?"
2. "If we shipped only the stages you just said yes to, would a real user get to
   their end state?" If no, the line is wrong.
3. "What will people ask for that we are not doing this time?"
4. "Of those, which are 'not yet' and which are 'not ever'?"
5. "For each 'not yet' — what would have to be true to revisit it?"
6. "What is the thing you are most tempted to add? Why is it not in the line?"

## Worked example (domain: hospital discharge planning)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **Release.** R1, medical ward pilot.
> **Release line.** ST-001 through ST-006 for patients discharged to their own
> home from one medical ward. A coordinator reaches a completed discharge, with
> medicines and follow-up in place, without ringing round.
> **In scope.** IN-001 one plan visible to everyone named in it (ST-002;
> FR-004, FR-006). IN-002 pharmacy sees the plan and the expected transport slot
> (ST-003; FR-011). IN-003 community team notified when the plan is made, with
> accept or query (ST-004; FR-018, TR-002). IN-004 transport and family confirmed
> on the plan (ST-005; FR-023). IN-005 discharge completed only when the plan is
> satisfied (ST-006; FR-030, TR-001).
> **Out of scope.** OUT-001 discharge to a care home or intermediate care —
> revisit once the medical ward pilot closes, since the hand-off differs.
> OUT-002 patients leaving against clinical advice — revisit after R1.
> **Non-goals.** Replacing the electronic patient record. Becoming the system of
> record for the patient's medicines. Deciding on anyone's behalf that a patient
> is fit to leave.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Release line | Absent | Named loosely | A stage list that provably completes the golden thread |
| Completeness of value | Line delivers nothing usable | Partial value | A real user reaches the end state |
| In-scope traceability | Prose only | Items listed | Each item names a stage and requirement ids |
| Out of scope | Absent | A list | Each item has a revisit condition |
| Non-goals | Absent | One or two | The things readers will actually assume, each with a reason |
| Honesty | Everything is in scope | Mostly | The list says no to something that matters |

## Blocking defects

- `release_line` does not cover a contiguous path to the golden thread's
  `end_state`.
- An in-scope item naming a `journey_stage` that does not exist in section 5.
- `non_goals` empty.
- A requirement marked `must` in section 7 that is not covered by any in-scope item.

## Industry-standard wording

- Say "in scope", "out of scope", "non-goal", "release line".
- Say "deferred" with a revisit condition, never "phase 2" with no definition.
- Write non-goals as "We are not building X" followed by the reason.
