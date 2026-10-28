---
description: Bring reviewers' Word comments into the PRD, then answer each one with the team
argument-hint: "<reviewed .docx> [set directory]"
---

Import the review comments in the Word file named in `$ARGUMENTS` into a PRD set.
The set is the second argument or, when there is none, the newest set under the
plugin's `docs_dir` (`docs/prd` by default).

1. Import the comments:

   ```bash
   uv run --with python-docx --with pyyaml python3 "${CLAUDE_PLUGIN_ROOT}/scripts/prd_comments.py" <set directory> <reviewed .docx> --import
   ```

   It adds each comment whose `source` the set does not hold yet to
   `<set>/17-review-comments.md`, as `RC-nnn` at `status: open`. On the first
   import it creates that document and links it as the last section. It prints
   what it `added` and `skipped`, and the `unplaced` comments: those that start
   before any section. Do not change the reviewers' words.

2. For each unplaced comment, show its quote and comment, ask which section or
   item it is about, and add it to the register by hand with that `about`.

3. Read `skills/prd-wizard/sections/17-review-comments.md` from the plugin.

4. Run `prd-details.mjs` and `prd-validate.mjs` on the set, and fix any error.

5. Say how many comments were added and how many were skipped as already
   imported. Then go through the open comments one at a time. For each one, show
   the quote, the comment, and the item it is about, and propose an answer with a
   status, marked as your recommendation. Write only the answer the team
   accepts. A domain fact or a priority comes from the expert, never from you.
