# Section 15, review comments

**Kind** `review-comments` · **Schema** `prd-forge/review-comments@1` · **File** `17-review-comments.md`

## What this section is

The comments that reviewers left in an exported Word copy of the set, and the
team's answer to each one. It is a register, not a graded section. It sits in
section 15 beside the change log, after it in reading order.

## Why it matters

Most people who review a PRD do not run prd-forge. A sponsor, a client, or an
engineering lead reads the Word export and comments in the margin. Without this
register, those comments live in one person's inbox, and nobody can show which
ones changed the set and which ones were declined, and why.

## How a comment gets here

1. Export the set to Word with `prd_export.py`. The export marks each section
   and each item with a bookmark named by its id.
2. A reviewer comments on the Word file and sends it back.
3. Run `/prd-comments <the reviewed .docx>`. It reads each comment, finds the
   item or section it is on, and adds it here with `status: open`. A comment
   already imported, by its `source`, is skipped.
4. The team answers each comment, as below.
5. The next export prints each comment with its response and the ids it
   changed, so the reviewer sees what happened.

The first import creates this document. A set with no review comments has no
`17-review-comments.md`.

## What belongs in each comment

- `id`: `RC-001`, in import order. Never reuse an id.
- `about`: the item or document the comment is anchored to, such as `FR-003`, or a
  document's id when the comment is on its prose.
- `reviewer`, `date`, `quote` (the text the reviewer marked), `comment`, and any
  `replies`, as the Word file holds them. Do not edit them.
- `status` and `response`, which the team writes:
  - `accepted`: the set changed. List the ids that changed in `changes`, and
    record the change in the change log.
  - `declined`: the set did not change. The `response` gives the reason in a
    sentence the reviewer can accept or argue with.
  - `answered`: the comment was a question. The `response` is the answer, and
    the set did not need to change.
- `source`: the Word file and the comment's number in it. The import writes it.

## How to answer a comment

- Answer what the reviewer asked, not what is easy to answer.
- A domain fact, figure, or priority comes from the expert, never from you.
  When the answer needs one, ask the expert, then write their answer.
- A comment that asks for technology, a vendor, or a design is answered
  `declined` with the boundary rule: a PRD says what to build, not how. Record
  the need underneath it, if there is one, as `accepted` instead.
- A comment that raises a question nobody can answer yet becomes an open
  question in section 12. Answer the comment `answered`, and name the `Q-nnn`
  in `changes`.

## Worked example (domain: freight dispatch)

_The names and dates in this example are invented, to show the form._

> **RC-004** about FR-012 · Dana Ruiz · 2026-11-03
> Quote: "every gap is either closed or owned by a named decider with a date"
> Comment: Who owns a gap when the decider leaves the company?
> Status: answered · Changes: Q-024
> Response: The sponsor reassigns it. Q-024 asks how the reassignment is
> recorded, due 2026-12-01.

## Rubric

Not graded. The validator holds the register to the rules below.

## Blocking defects

- A comment whose `about` names an id that does not exist in the set.
- Two comments with the same `source`.
An open comment, one with no `response`, is a warning, never a blocking defect.
When the sponsor approves while a comment is open, record each open comment as a
condition on the approval in the change log, "conditional on RC-nnn by
<date>", as FR-022 says.

## Industry-standard wording

- Say "accepted", "declined", and "answered". Not "won't fix" or "resolved".
