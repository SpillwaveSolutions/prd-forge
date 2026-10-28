# What the PRD must carry for the backlog to be derivable

Each part of the PRD feeds a different level of the backlog. The user journey
gives the **structure** — features and epics. The requirements give the
**content** — stories and their acceptance criteria. Engineering design gives
tasks and subtasks, which the PRD never defines.

This file exists so the wizard writes a PRD that a story-mapping workshop can
actually use. It is also the input to the `prd-to-backlog` skill.

## Where each backlog level comes from

| Level | Comes from in the PRD | Contains |
| --- | --- | --- |
| Feature | A stage of the user journey, plus the business objectives | Name, users, outcome, success metric, acceptance from the stage's Given/When/Then, links to PRD requirement ids |
| Epic | The in-scope part of a feature for one release, set by the scope and the release line | Goal, in and out of scope, epic-level acceptance, a story list |
| User story | One step in the journey for one persona; the functional requirement gives the content | "As a `<persona>`, I want `<capability>`, so that `<outcome>`", Given/When/Then criteria, a priority |
| Task | **Not from the PRD.** Engineering design and ADRs, applied to one story | One build step, an owner, a size in hours |
| Subtask | **Not from the PRD.** The engineer doing the task | A checklist item inside a task |

## Where the other sections go

| PRD part | Where it goes |
| --- | --- |
| Personas | The "As a ..." of each story |
| Non-functional requirements | Acceptance criteria on stories, definition-of-done items, or separate platform stories |
| Constraints (residency, retention) | Definition-of-done items, applying to every story |
| Decision rights and trust rules | Acceptance criteria, plus separate stories for approval gates |
| Success metrics | Measures on each feature and epic, checked after release |
| Open questions | Spikes: time-boxed stories that end in an answer or an ADR |
| Risks and dependencies | Spikes, platform-work stories, and backlog order |
| Out of scope | Items the team does not create, or parks below the release line |
| Glossary | The words used in every story title and criterion |

## When each level is written

| When | Event | Who | Produces |
| --- | --- | --- | --- |
| After the PRD is approved for a release | Story-mapping workshop (1–2 days) | Product, engineering, practitioners | The journey as a backbone, features, the release-1 line |
| Before iteration 1 | Release planning | Product owner, team sizing | Epics for release 1, sized and ordered |
| Every iteration, 1–2 ahead | Backlog refinement | Product owner and team | Stories with acceptance criteria meeting the definition of ready |
| First day of each iteration | Iteration planning | Engineering team | Tasks for committed stories |
| During the iteration | Daily work | Each engineer | Subtasks |
| End of each iteration | Demo and review | Whole team and product | Changes to the story map, the backlog, and the PRD |

Two rules govern the timing:

- **Detail late.** Features and epics can exist months ahead. Stories exist only
  one to two iterations ahead. Tasks exist only for the iteration in progress.
  Detail written too early goes stale and gets rewritten.
- **Trace everything.** Each subtask links to a task, each task to a story, each
  story to an epic, each epic to a feature and its PRD requirement ids.

## What this means for the PRD the wizard writes

A PRD is backlog-derivable only when all of these hold. The engineering review
agent checks exactly this list:

1. At least one journey exists, and exactly one is the golden thread.
2. Every journey stage has an id, an actor, and a decision.
3. The release line names a contiguous set of stages reaching the journey's end
   state.
4. Every release-line stage has at least one `must` functional requirement.
5. Every functional requirement names a persona that exists and a stage that
   exists.
6. Every functional requirement has at least one Given/When/Then criterion.
7. Every objective has a baseline and a target, so features can carry measures.
8. Every constraint has an authority, so it can become a definition-of-done item.
9. Every decision in a journey stage appears in section 10 with an approver.
10. Every open question has a decider and a date, so it can become a spike.
11. Every domain term used in an acceptance criterion is in the glossary.

## The worked path, end to end

1. **PRD.** Golden-thread journey stage ST-003 "Pharmacy prepares the medicines".
   The requirements are FR-011 (pharmacy sees the plan and the expected transport
   slot), FR-013 (dispensed status visible to the ward), and TR-004 (a pharmacist,
   not the product, decides whether anything is unsafe to send home).
2. **Feature.** Discharge medicines readiness. Success metric: share of
   discharges where medicines were ready before the transport slot.
3. **Epic, release 1.** Ward-dispensed medicines for the medical ward pilot.
   Medicines dispensed on the ward are in scope; medicines collected from an
   outpatient pharmacy are out.
4. **Stories.**
   1. The pharmacist sees the discharge prescription with the expected transport
      slot. (FR-011)
   2. The status moves through Received, Dispensing, Ready. (FR-013)
   3. A prescription the pharmacist queries shows the reason and who to ask.
      (FR-013)
   4. Nothing is marked Ready until a pharmacist has recorded their check.
      (TR-004)
   5. Spike: how far ahead of transport do wards actually send prescriptions?
      This answers an open question.
5. **Tasks for story 1.** Create the prescription view; join the transport slot to
   the prescription; emit the status event; add the readiness badge to the ward
   view; write the acceptance test.
6. **Subtasks for "join the transport slot to the prescription".** Handle a slot
   that is rebooked after dispensing starts; handle a patient with no slot yet;
   add the timezone-safe comparison.

Technology appears for the first time at step 5. That is the correct place for
it, and it is why the PRD can stay free of technology.

## References

These terms come from established practice. Cite them as `sources.md` says, and state any place where the set's meaning departs.

- Given/When/Then: "Introducing BDD", Dan North, 20 Sep 2006, https://dannorth.net/blog/introducing-bdd/
- Story, epic, and feature: "Epics, Features and User Stories", Mountain Goat Software, last updated 28 Apr 2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
- Story map and backbone: "The New User Story Backlog is a Map", Jeff Patton & Associates, 8 Oct 2008, updated 12 Apr 2023, https://www.jpattonassociates.com/the-new-backlog/
- Spike: "Spike Solutions", in The Art of Agile Development, 1st ed., James Shore and Shane Warden, 3 Jun 2010, https://www.jamesshore.com/v2/books/aoad1/spike_solutions
