# Section 11 — Assumptions, risks and dependencies

**Kind** `assumptions-risks-dependencies` · **Schema** `prd-forge/assumptions-risks-dependencies@1` · **File** `12-assumptions-risks-dependencies.md`

## What this section is

Three lists. What we are taking on faith, what could go wrong, and what we need
from people outside the team.

## Why it matters

Assumptions that turn out false are the usual cause of a rewrite, and the ones
that hurt are the ones nobody wrote down. Risks and dependencies become spikes,
platform-work stories, and the ordering of the backlog — a dependency due after
the release line is a schedule risk the team can see early.

## What belongs in it

**Assumptions** (`A-nnn`): the assumption, `if_false` — what breaks — plus how it
will be validated and who owns that.

**Risks** (`R-nnn`): the risk, `likelihood` and `impact` (low/medium/high),
`mitigation`, and one named `owner`. Add the `trigger` that shows it is
happening, the `response` (avoid, reduce, transfer, share, or accept), the date
the mitigation is due (`mitigation_by`), and its `status` (open, occurred, or
closed).

Each assumption can carry its `category` (value, usability, feasibility, or
viability), the `evidence` behind it today (none, some, or strong), and the date
to validate it by (`validate_by`). Rank assumptions by importance against
evidence: an important assumption with no evidence is tested first.

**Dependencies** (`D-nnn`): what we need, `from` whom, `by` when, `status`
(requested, committed, at-risk, delivered), and what it `blocks`.

## What does not belong

- Risks with no owner. An unowned risk is a wish that it goes away.
- Engineering implementation risks ("the framework might not scale"). Those live
  in architecture documents.
- Assumptions that are actually open questions. If somebody could decide it,
  it belongs in section 12.

## How to interview for it

1. "What has to be true about your users for this to work?"
2. "What has to be true about the data they will give us?"
3. For each: "If that turned out false, what would we have to change?"
4. "What is the most likely way this project fails?"
5. "Who owns that risk? Not the team — which person?"
6. "What do you need from someone outside this team, and when?"
7. "Have they agreed to it? Requested, committed, or at risk?"

## Worked example (domain: freight transportation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **A-002.** Carriers will share live position data for loads under contract.
> If false: the at-risk signal in ST-003 must be derived from check calls, which
> changes the journey and most of section 7. Validated by: signed data-sharing
> terms with three pilot carriers. Owner: VP Partnerships.
>
> **R-003.** Dispatchers ignore at-risk alerts because the false-positive rate is
> too high. Likelihood: high. Impact: high. Mitigation: NFR-009 sets a precision
> floor measured against dispatcher dismissals; pilot gate at 2 weeks. Owner:
> Director of Product.
>
> **D-001.** Appointment slot availability from the two largest receivers.
> From: receiver integrations team. By: 2027-02-01. Status: requested.
> Blocks: ST-004, FR-018.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Assumptions surfaced | None | Obvious ones | Including the uncomfortable ones |
| `if_false` | Absent | Vague | Names what would change, by section or id |
| Risk scoring | Unscored | Scored | Scored, and the high/high ones have dated mitigations |
| Risk ownership | Team-owned | A role | One named role per risk |
| Dependency status | Absent | Listed | Status and date per dependency, with what it blocks |
| Timing | Dates absent | Some dates | Every dependency dated against the release line |

## Blocking defects

- A risk with no owner, or a high/high risk with no mitigation.
- A dependency with no `by` date, or dated after the release it blocks.
- An assumption with no `if_false`.
- An entry that is really an open question and has no decider.

## Industry-standard wording

- Say "assumption", "risk", "dependency", "mitigation", "owner".
- Score as "likelihood × impact", each low/medium/high; do not invent a 1–25 score
  unless your organisation governs one.
- Say "blocked by" / "blocks", and name ids.
