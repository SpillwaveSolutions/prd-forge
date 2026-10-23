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
| Feature | A stage of the user journey, plus the business objectives | Name, users, outcome, success metric, links to PRD requirement ids |
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

1. **PRD.** Golden-thread stage "The client provides data". Requirements FR-006
   (upload status), FR-014 (shared client requests), TR-005 (no internal content
   shown to the client).
2. **Feature.** Client data intake. Success metric: time from client request to
   usable data.
3. **Epic, release 1.** GL extract intake for the golden thread. CSV and XLSX in
   scope; PDF out.
4. **Stories.** (a) The client uploads a GL extract and the preparer sees
   "Received" (FR-006). (b) The status moves through Parsing, Validating,
   Available (FR-006). (c) A failed file shows the reason and the row (FR-006).
   (d) The client sees only their own requests (TR-005). (e) Spike: which GL
   formats do pilot clients send? (answers an open question)
5. **Tasks for story (a).** Create the upload endpoint; store the original file;
   emit the status event; add the status badge to the preparer view; write the
   acceptance test.
6. **Subtasks for "store the original file".** Add a checksum; make the file
   read-only after upload; add the retention tag.

Technology appears for the first time at step 5. That is the correct place for
it, and it is why the PRD can stay free of technology.
