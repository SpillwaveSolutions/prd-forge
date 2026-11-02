---
description: Create or change the PRD set's roadmap, saved as 18-roadmap.md, from your notes or a project tracker
argument-hint: "<create|add|status|reprioritize|move> [details] [set directory]"
---

Change the roadmap of a PRD set. The first word of `$ARGUMENTS` is the
operation. The rest is what the user said about it, and may end with a set
directory. With no directory, use the newest set under the plugin's `docs_dir`
(`docs/prd` by default). With no operation, use `create` when the set has no
`18-roadmap.md`, and otherwise ask which operation the user wants.

Read `skills/prd-wizard/sections/18-roadmap.md` from the plugin before you
write. The roadmap's ids, fields, scoring methods, and blocking defects are
there. Read the set's release plan, objectives, and assumptions, risks, and
dependencies, because every item links to them.

## The operations

- `create`: ask for the period (a quarter, a half, or a year), the format
  (`now-next-later` is the default), and the initiatives. Write
  `18-roadmap.md` with `section: 13` and `order: 145`. Link it into the root's
  `links.children` and into the `prev` and `next` chain after the release
  plan. Set the release plan's `roadmap_link` to `./18-roadmap.md`.
- `add`: ask for the title, the horizon, the objectives it moves, and the
  releases that deliver it. Give it the next free `RM-nnn`. When the new item
  is `now`, ask what comes off `now` to make room, and show the `capacity`
  split when the roadmap has one.
- `status`: set an item's `status`. For `at-risk` or `blocked`, ask what
  blocks it and what the team does about it, and write `blocker` and `mitigation`.
- `reprioritize`: ask what changed. Show a before and after table of the
  items, their horizons, and their priorities. Write only the order the user
  accepts.
- `move`: change an item's `horizon` or `target_date`. Moving an item to
  `later` removes a committed date. List the other items that share a
  `depends_on` id with it, and any item whose date the move passes.

A priority, a score input, a date, and a status come from the user, never from
you. Propose a value only when the user asks, and mark it as your
recommendation.

## Inputs

Take the items from what the user pastes: notes, a list, a table, or rows from
a spreadsheet. When the session has a project tracker connector, such as
Linear, Jira, or Asana, you may read issues from it. Tracker input is
read-only: never create, change, or close a tracker issue, unless the user
explicitly asks for that one change. When you add an item, write where it came
from in its `source`, such as `pasted notes` or the tracker key. Never change
`source` later: the reason for a change goes in `changes`.

## After each change

1. Add an entry to the roadmap's `changes`, with the `date`, the `change`,
   and the `reason` the user gave.
2. Record the change in the change log, `16-change-log.md`, and name section
   13. Read `skills/prd-wizard/sections/16-change-log.md` first. When no
   approval covers the root's current `version`, add the change to the summary
   of that version's entry. When an approval covers it, bump the root's
   `version` as that guide says, and add an entry for the new version.
3. Run these scripts on the set:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-details.mjs" <set directory>
   node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-diagrams.mjs" <set directory>
   node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" <set directory>
   ```

   Fix each error before you report. A RICE or ICE score warning means the
   stored `score` does not match its inputs: compute it again and store it.

4. Report in a few lines: each horizon with its items and status, the items
   at risk or blocked with their blockers, and the changes in this update.
   Offer a summary for one audience: executives, engineering, or customers.
