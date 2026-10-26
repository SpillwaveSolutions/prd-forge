---
description: Continue the PRD by asking the questions that are still open, one at a time
argument-hint: "[set directory]"
---

Continue the PRD set at `$ARGUMENTS`, or, when that is empty, the newest set
under the plugin's `docs_dir` (`docs/prd` by default).

Use the `prd-forge:prd-wizard` skill, and follow its section "Continue a PRD: ask
the remaining questions". Read the set's front matter and its `grades/` notes,
collect the questions only the person can answer, say how many there are, then
ask the first one. Ask one question per message. Write each answer into its
document and run the validator before you ask the next one.
