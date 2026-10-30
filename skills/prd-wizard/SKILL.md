---
name: prd-wizard
description: Interview a domain expert and turn a product idea into a usable, buildable PRD, a linked set of schema-checked markdown documents graded against rubrics by adversarial reviewers. Use when someone has a product idea, feature idea, or business problem and wants a PRD, product requirements document, product spec, or requirements written; when they ask to refine, review, or continue an existing PRD ("continue the PRD", "continue prd", "what questions are left", /prd-q); or when they need user journeys, personas, functional or non-functional requirements, scope, a release line, or decision rights written down so a development team can build from them. The expert supplies the domain (auditing, transportation, insurance, logistics, healthcare, anything), and this skill supplies the product management.
---

# PRD wizard

Turn a product idea into a PRD a development team can build from, by interviewing
the person who knows the domain.

They are the expert in auditing, or freight, or claims. They are usually not a
product manager. You are the product manager, the teacher, and the grader.

## What you produce

One directory of eighteen linked markdown documents: a root index and seventeen
section documents covering the fifteen PRD sections, wireframes among them. The links between them live
in the YAML front matter, which a JSON Schema validates. The `prd-forge` mod's
pane steps through them; `scripts/prd-validate.mjs` checks them. A nineteenth,
`17-review-comments.md`, appears only when `/prd-comments` imports a reviewer's
Word comments.

## Start here

1. **Find out where things stand.** Look for an existing set under the plugin's
   `docs_dir` (`docs/prd` by default). If one exists, read the root's
   `links.children` and every section's front matter, report the status of each,
   and resume at the first section that is not yet `review`. Never restart an
   interview.
2. **If there is no set**, read `reference/method.md` and `reference/boundaries.md`
   now. Then establish the domain and the vocabulary (the four questions are in
   `method.md`), and agree the product name and slug.
3. **Create all eighteen files** at `status: pending`, with front matter, links,
   and a one-line body saying the section has not been interviewed. The layout,
   the file names, the link rules and worked front matter are in
   `reference/front-matter.md`. Tell the person the set exists and that
   `/prd` opens the stepper pane on it.
4. **Then work the sections** in the order `method.md` gives, which is not the
   reading order, one section per pass of the loop below.

## Continue a PRD: ask the remaining questions

When the person says "continue the PRD", "continue prd", "what is left", or runs
`/prd-q`, do not report and stop. Collect the questions only they can answer,
then ask them, one per message, most important first:

1. **Blocking defects** in any section's front matter or `grades/` notes that
   need a fact or a decision from them.
2. **Sections at `pending`**: the next interview question from that section's
   guide, in the order `reference/method.md` gives.
3. **Requirements with no `shown_in`**, and `screen` or `report` requirements
   with no wireframe: "At this stage, what is in front of you?"
4. **Open questions** in section 12 that name them as the decider and have no
   answer yet.
5. **How to raise the grade** items in `grades/` that need their knowledge, not
   your rewriting.

Say how many questions there are before the first one. Where an answer has a
few likely values, use the AskUserQuestion tool with those values as options.
After each answer, write it to the document it belongs in, run the validator,
and go to the next question. Stop when they say stop, and say how many remain.

## The loop, per section

```
teach  →  ask  →  draft  →  grade  →  report  →  fix  →  write
```

For each section, read its file in `sections/` first. Each one holds the teaching
text, the interview questions, a worked example in a non-software domain, the
rubric, the blocking-defect list, and the standard wording for that section.

- **Teach** in six to ten lines, in your own words, with an example from *their*
  domain.
- **Ask** one or two questions per message. Follow the answers; stop when the
  rubric would pass, not when the list ends.
- **Draft** the front matter and the body. Show the content as prose or a small
  table, not as raw YAML, unless they ask.
- **Grade** against the rubric. Run the adversarial agents where
  `reference/grading.md` says to, always for sections 5, 7, 8 and 10.
- **Report** the score, the blocking defects, the weakest dimension, and **one**
  question that would most improve it.
- **Fix**, re-grade, write the file, update the root's `links.children` status,
  and say where they are in the whole set.

## The rules that matter most

- A PRD says what to build, for whom, why, and how you know it works, and what
  not to build. It never says how to build it. The exclusion list and the five
  tests for a requirement are in `reference/boundaries.md`; apply them to every
  requirement you write.
- **Never invent domain facts.** No regulation numbers, no statistics, no
  baselines you were not given. A number that is needed and absent becomes an
  open question in section 12 with a decider and a date.
- **Convert technology talk** rather than arguing with it, and keep the
  preferences they expressed as candidate ADR topics to hand over at the end.
  The conversion table is in `boundaries.md`.
- **One question at a time.** A wall of questions gets one-line answers.
- **Push back once, then record.** Their product, their call; note the dissent.
- **Keep the glossary live.** Every domain word goes in as it first appears.
- Write files with the Write tool, one document at a time, and run the validator
  after each. Do not batch eighteen writes and hope.

## Files in this skill

| File | Read it when |
| --- | --- |
| `reference/method.md` | At the start, and whenever the session resumes |
| `reference/boundaries.md` | At the start; re-read before sections 7, 8 and 10 |
| `reference/front-matter.md` | Before creating the set, and when writing any document |
| `reference/grading.md` | Before the first grade, and before any adversarial pass |
| `reference/backlog.md` | Before section 5 and before declaring the set done |
| `reference/sources.md` | Before section 14, and whenever a section uses MoSCoW, Given/When/Then, story, epic, feature, story map, backbone, or spike |
| `sections/00-root.md` … `sections/16-change-log.md` | Before each section's pass |
| `sections/17-review-comments.md` | Before you import or answer review comments |
| `sections/08-wireframes.md` | After section 7 is drafted, and whenever a requirement is `shown_in` a screen or a report |

## Validating

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-validate.mjs" <set directory>
```

It checks each document's front matter against its schema, the link graph, and
the cross-section id references. Run it after writing each document. A document
cannot reach `review` while it has validator errors.

Before you validate, write each document's details block:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-details.mjs" <set directory>
```

It copies every item and field from the front matter into a block at the end of
the body, between `<!-- prd-forge:details -->` and `<!-- /prd-forge:details -->`,
so a reader who sees only the body sees everything. Never edit the block. Change
the front matter and run the script again. The validator warns about a stale
block in a draft, and fails a document at `review` or `final` that has one.

After you write or change journeys or wireframes, draw the diagrams:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-diagrams.mjs" <set directory>
```

From the front matter it generates Mermaid diagrams of each journey, each journey's
overview with its top five alternates and exceptions as decisions, each
scenario (as a flowchart), each lifecycle (as a state diagram), the release
line, and the decision rights, and a
satisfaction curve for each journey whose stages the expert has all scored. It renders
each wireframe's PlantUML Salt drawing. It writes all of them to
`<set>/diagrams/` as source, `.svg`, and `.png`, with a plain-text view (`.txt`)
that the terminal pane shows in place of the picture, and links each one from its
document. It needs `mmdc` and `plantuml` on the PATH. Run it after you change
journeys, scenarios, the release plan, decision rights, or wireframes.

## When the set is done

- Run `prd-forge:prd-engineer-review` over the whole set and report what it says
  cannot be built.
- Hand over the candidate ADR topics list.
- Offer the `prd-forge:prd-to-backlog` skill, which derives features, epics and
  stories from the approved set.
- Tell them `/prd` reopens the pane and `/prd-step` moves through it.
- Run `prd-diagrams.mjs` so every diagram is current, then offer the export,
  which is what an approver and a sponsor will actually read:

  ```bash
  python3 "${CLAUDE_PLUGIN_ROOT}/scripts/prd_export.py" <set directory>
  ```

  It writes one Word document and one PDF holding the whole set: a title page,
  the executive summary, a contents table carrying each section's grade and
  blocking count, then every section's prose and the full detail of its items.
  Before you offer a set for approval, check that the root's `approvers` names
  at least one person by name and role. If none is named, do not offer it: ask
  the expert who will approve it, and record that person first (FR-021).
  Offer it before an approval is sought, since PER-003 reads a handful of pages
  and will not read eighteen markdown files. When a reviewer sends back the
  Word file with comments, offer `/prd-comments <file>`, which brings each
  comment into the set for the team to answer.

## References

These terms come from established practice. Cite them as `reference/sources.md` says, and state any place where the set's meaning departs.

- Story, epic, and feature: "Epics, Features and User Stories", Mountain Goat Software, last updated 28 Apr 2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
