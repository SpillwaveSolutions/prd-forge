# Section 7 — Functional requirements

**Kind** `functional-requirements` · **Schema** `prd-forge/functional-requirements@1` · **File** `08-functional-requirements.md`

## What this section is

What the product must do. Each requirement names a user, states an outcome that
person can see, has a pass-or-fail acceptance test, and carries a priority.

## The five tests

A statement is a product requirement only when it passes all five:

1. It names a user or a stakeholder.
2. It states an outcome that a person can see.
3. It has a pass-or-fail acceptance test.
4. It has a priority.
5. It does not name the component or the technology that delivers it.

Test 5 is the one domain experts and engineers both break. If a requirement needs
a technology name to make sense, find the user need behind it and write that need.

## Why it matters

Requirements become the content of user stories, and their acceptance criteria
become the story's Given/When/Then. A requirement that fails test 3 cannot be
closed — the team will argue at review about whether it is done. A requirement
that fails test 5 freezes an architecture decision before anyone has made it.

## What belongs in each requirement

- `id`: `FR-nnn`. Never renumber; ids are referenced from scope, releases, and
  the backlog forever.
- `user`: a persona id or role (test 1).
- `capability`: what they can do.
- `outcome`: what they can then see or have (test 2).
- `acceptance`: one or more Given/When/Then statements (test 3).
- `priority`: `must`, `should`, `could`, `wont` (test 4).
- `journey_stage`: the `ST-nnn` it serves. This is what puts it in a feature.
- `objective`: the `O-nnn` it moves.

## What does not belong

- Component names, service names, vendor names, protocol names, screen names.
- Data models, field lists, API shapes.
- "The system shall" with no user in sight.
- Two requirements welded together with "and".

## How to interview for it

Work stage by stage through the golden thread. For each stage:

1. "At this stage, what must the user be able to do? One thing at a time."
2. "Who exactly — which persona?"
3. "When they have done it, what can they see that proves it?"
4. "How would you test that? Give me 'given this, when they do that, then they
   see this'."
5. "Must release 1 have this, or should it, or could it?"
6. "Which business objective does this move?"

Then challenge: "Could a reviewer tell pass from fail without asking you?" If
not, the acceptance criteria are not finished.

When the expert says "it should use `<technology>`", ask: "What does the user get
from that?" Write the answer. Put the technology preference in a note for the
architecture decision record, not in the PRD.

## Worked example (domain: insurance claims)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **FR-012** · user: PER-003 claims adjuster · priority: must · stage ST-004 ·
> objective O-001
> **Capability.** Request a specific missing document from the claimant without
> leaving the claim.
> **Outcome.** The adjuster sees the request and its status on the claim, and the
> claimant receives one request listing everything outstanding.
> **Acceptance.**
> - Given a claim with two missing documents, when the adjuster requests both,
>   then the claimant receives one message listing both, and the claim shows two
>   outstanding requests.
> - Given an outstanding request, when the claimant supplies the document, then
>   the request shows as satisfied within the adjuster's next view of the claim,
>   and the adjuster is not asked to request it again.
> - Given a request older than its due date, when the adjuster opens the claim,
>   then the request is shown as overdue with the number of days.

Note what is absent: no notification channel, no storage, no file format, no
service name.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Test 1 — named user | "The system" / "users" | A role | A persona id that exists in section 4 |
| Test 2 — visible outcome | Internal behaviour | An outcome, vague | A state the user can observe |
| Test 3 — acceptance | None | Prose criteria | Given/When/Then, each pass-or-fail |
| Test 4 — priority | Absent | Present | Present, and the `must` set matches the release line |
| Test 5 — no technology | Names a component | One leak | No technology, vendor, component or screen |
| Atomicity | Several requirements in one | Mostly single | One capability per requirement |
| Traceability | No links | Stage or objective | Both, and both exist |
| Coverage | Stages with no requirements | Most covered | Every release-line stage has at least one `must` |

## Blocking defects

- Any requirement failing any of the five tests.
- An `id` reused or renumbered from a previous version.
- A requirement whose `journey_stage` or `objective` does not exist.
- A release-line stage in section 6 with no `must` requirement.
- A `must` requirement not covered by any in-scope item in section 6.
- Acceptance criteria that reference a screen, a button, or a component.

## Industry-standard wording

- Write the requirement as "A `<persona>` can `<capability>`, so that `<outcome>`".
  Keep "The system shall" out: it hides the user and invites test-5 failures.
- Write acceptance as "Given `<state>`, when `<action>`, then `<observable>`".
- Say `must` / `should` / `could` / `won't` (MoSCoW), or RFC 2119 MUST/SHOULD if
  your organisation already uses it — pick one and say which in the glossary.
- One requirement, one sentence, one verb.
