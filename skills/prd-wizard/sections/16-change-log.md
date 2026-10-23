# Section 15 — Change log and approvals

**Kind** `change-log` · **Schema** `prd-forge/change-log@1` · **File** `16-change-log.md`

## What this section is

What changed, when, who changed it, and who approved it.

## Why it matters

A PRD is a living document that people build from. An engineer who read version
3 needs to know what moved in version 4 without re-reading everything — and an
approval that nobody can find is an approval that did not happen. In regulated
domains this section is also evidence.

## What belongs in each entry

- `version`, `date`, `author`, `summary`.
- `sections`: which section numbers changed.
- `approvals`: name, role, date, and decision (approved,
  approved-with-conditions, rejected).

## What does not belong

- Editorial changes. Typos do not get a version.
- A change log generated from commit messages. Say what changed for a *reader*.

## How to maintain it

Add an entry whenever a section's `status` reaches `review` or `final`, or
whenever an approved document changes. Bump the minor version for new content,
the patch version for corrections, and the major version when the release line
or the golden thread changes.

When an open question in section 12 is answered, record the answer there and the
change here.

## Worked example (domain: external audit)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **0.4.0** · 2026-10-20 · R. Hightower · Sections 5, 6, 7
> Added the golden-thread journey (J-001) from the practitioner workshops;
> set the release line to ST-001…ST-006; rewrote 14 functional requirements
> against the stages and dropped 3 that served no stage.
> Approvals: A. Okafor, Head of Audit Innovation, 2026-10-22, approved with
> conditions — conditional on Q-003 answered by 2027-01-15.
>
> **0.3.0** · 2026-09-02 · R. Hightower · Sections 3, 10
> Added baselines to O-001 and O-002 from the claims warehouse; added TR-001
> through TR-006 after the independence review. Approvals: none sought.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Entries | Absent | Some versions | Every version since first circulation |
| Reader-facing | Commit noise | Mixed | Says what changed for someone who read the last version |
| Section linkage | Absent | Mentioned | Section numbers per entry |
| Approvals | Absent | Names only | Name, role, date and decision |
| Conditions | Unrecorded | Mentioned | Conditions recorded, with the ids they depend on |
| Versioning | Ad hoc | Consistent | Major bumps on release-line or golden-thread changes |

## Blocking defects

- The document is at `status: final` with no approval recorded.
- An approval with no date or no decision.
- A version in the root document that has no entry here.
- An approved-with-conditions entry whose conditions name no id or date.

## Industry-standard wording

- Say "approved", "approved with conditions", "rejected". Not "signed off" unless
  that is the domain's own term — and if it is, define it in the glossary.
- Record conditions as "conditional on `<id>` by `<date>`".
