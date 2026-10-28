---
description: Bring reviewers' Word comments into the PRD, then answer each one with the team
argument-hint: "<reviewed .docx> [set directory]"
---

Import the review comments in the Word file named in `$ARGUMENTS` into a PRD set.
The set is the second argument or, when there is none, the newest set under the
plugin's `docs_dir` (`docs/prd` by default).

1. Read the comments:

   ```bash
   uv run --with python-docx --with pyyaml python3 "${CLAUDE_PLUGIN_ROOT}/scripts/prd_comments.py" <set directory> <reviewed .docx>
   ```

   It prints one JSON entry per comment: `source`, `about`, `quote`, `reviewer`,
   `date`, `comment`, and `replies`. An entry whose `about` is `null` starts before
   any section. Ask which section or item it is about.

2. Read `skills/prd-wizard/sections/17-review-comments.md` from the plugin.

3. Open `<set>/17-review-comments.md`. If it does not exist, create it with
   `kind: review-comments`, `schema: prd-forge/review-comments@1`, `section: 15`,
   `order: 170`, `status: draft`, and `comments: []`. Link it as the last
   section: `prev` is the change log, `next` is null, the change log's `next`
   points at it, and the root's `links.children` lists it.

4. For each entry whose `source` is not already in `comments`, add an item with
   the next `RC-nnn` id, the fields as the reader gave them, and `status: open`.
   Do not change the reviewer's words.

5. Run `prd-details.mjs` and `prd-validate.mjs` on the set, and fix any error.

6. Say how many comments you added and how many you skipped as already imported.
   Then go through the open comments one at a time. For each one, show the
   quote, the comment, and the item it is on, and propose an answer with a
   status, marked as your recommendation. Write only the answer the team
   accepts. A domain fact or a priority comes from the expert, never from you.
