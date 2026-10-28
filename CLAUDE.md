# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

prd-forge is a Claude Code plugin that interviews a domain expert and writes a product requirements document (PRD) as a linked set of schema-checked markdown files. The plugin has five parts:

- skills, `prd-wizard` and `prd-to-backlog`
- three read-only grading agents, in `agents/`
- a mod, which is a TypeScript hooks module that draws a stepper pane
- JSON Schemas for the front matter
- Node and Python scripts that validate, draw, and export a set

`docs/prd/prd-forge/` is prd-forge's own PRD, written with the plugin. Treat it as the reference set and as test data.

## Commands

```bash
claude plugin validate .                     # manifest and hooks module
claude plugin test .                         # the pane tests, hooks/register.test.tsx
node --test scripts/prd-validate.test.mjs scripts/prd-diagrams.test.mjs scripts/prd-wiki.test.mjs
node --test --test-name-pattern="the 0.4.1 bug" scripts/prd-diagrams.test.mjs   # one test

node scripts/prd-details.mjs docs/prd/prd-forge             # write each body's details block from its front matter
node scripts/prd-validate.mjs docs/prd/prd-forge            # validate a set; exit 1 on error
node scripts/prd-diagrams.mjs docs/prd/prd-forge            # draw, render, and link diagrams
node scripts/prd-diagrams.mjs docs/prd/prd-forge --check    # report gaps, write nothing

# Export to Word and PDF. python-docx is not installed globally, so run it through uv.
uv run --with python-docx --with pyyaml python3 scripts/prd_export.py docs/prd/prd-forge

# Write the set as GitHub Wiki pages into a local clone of the wiki. It never pushes.
node scripts/prd-wiki.mjs docs/prd/prd-forge <wiki clone directory>
```

The script tests need `python3` with PyYAML, `mmdc` (Mermaid CLI), and `plantuml` on the PATH. Without `mmdc`, the diagram tests skip, and a skip passes.

To type-check the mod, the root `tsconfig.json` extends `.claude-plugin/types/tsconfig.json`. Claude Code writes that file only when it loads the mod from a folder you own. In a fresh clone, use a `tsconfig.json` outside the repository whose `include` names the plugin-authoring skill's `claude-code.d.ts` file, `hooks/`, and `types/`. Run `tsc -p` on that file. Never run `tsc -p .` without `noEmit`, because it writes `.js` files beside the sources.

### Run your local changes in a session

An install from the GitHub marketplace runs a cached copy. To run the working copy, install the plugin from this folder as a marketplace, then run `/reload-plugins` after each change:

```bash
claude plugin marketplace add "$PWD"
claude plugin install prd-forge@prd-forge --scope project
```

## Architecture

### The document set is the data model

A PRD is one directory, `<docs_dir>/<slug>/`, of markdown files. Each file has YAML front matter with a `kind`. The links between documents (`parent`, `prev`, `next`, `children`, and `related`) live in the front matter, not in the body. The pane, the validator, and the export read only the front matter to navigate.

- File prefixes and section numbers differ. Section 5 holds `05-user-journeys.md` and `06-scenarios.md`. Section 7 holds `08-functional-requirements.md` and `08-wireframes.md`. Cross-references in a set use section numbers.
- Two folders sit inside a set and hold no documents:
  - `grades/<file>` holds the reasons for each grade.
  - `diagrams/` holds each diagram's source with its rendered `.svg` and `.png`.

  The validator and the export read only the top-level `.md` files.
- `score`, `blocking`, and `graded` belong to the grading pass. Never set them by hand. A new grade also writes `grades/<file>`, in the shape that `skills/prd-wizard/reference/grading.md` gives.

### To add a document kind, change all of these

1. Add a schema in `schemas/<kind>.json`.
2. Add the kind to both `kind` enums in `schemas/common.json`, under `docLink` and under `base`.
3. Add the kind to `SCHEMA_FILE` in `scripts/prd-validate.mjs`. Add any cross-reference checks in `structural()`.
4. Add the kind to `SECTION_OF_KIND` and `ITEM_LISTS` in `scripts/prd_export.py`.
5. Write the section guide in `skills/prd-wizard/sections/`.
6. Update the table in `reference/front-matter.md`, the order in `reference/method.md`, the document counts in `skills/prd-wizard/SKILL.md`, and the README.
7. In the reference set, update the root's `links.children` and the `prev` and `next` chain.

### The YAML reader is a subset, and two scripts share it

`parseYaml()` in `scripts/prd-validate.mjs` has no dependencies. `scripts/prd-diagrams.mjs` imports it. `prd-validate.test.mjs` compares its output with PyYAML for every shipped document. Keep that test green after any parser change. Inside `{ … }` link mappings, quote a `title` that holds a comma, a colon, or a `#`.

### Diagrams

`prd-diagrams.mjs` generates Mermaid sources from the front matter for journeys (`J-nnn.mmd`), each journey's satisfaction curve (`J-nnn-satisfaction.mmd`, only when every stage has a `satisfaction` score), each journey's overview with its top five alternates and exceptions as decisions (`J-nnn-overview.mmd`, only when one branches off it), scenarios as flowcharts (`SC-nnn.mmd`), lifecycles as state diagrams (`LC-nnn.mmd`), `release-line.mmd`, and `decision-rights.mmd`. Never edit a generated `.mmd` file. Wireframes are different:

- The text sketch in a `wireframe` fence in `08-wireframes.md` is what the pane shows.
- The hand-written PlantUML Salt drawing, `diagrams/WF-nnn.puml`, replaces the sketch in the export.

The script renders every source to `.svg` and `.png` and writes the image links into the documents. Beside each generated source it writes a text view, `<id>.txt`, from `scripts/prd-ascii.mjs`: strict ASCII, at most 60 columns. The terminal pane draws that text in place of the image. It is idempotent. The export embeds each `.png`. Diagrams name a persona by its `short_name` (required, such as `DomainExpert`), never by its `PER-nnn` id. All Mermaid label text goes through `label()`, which escapes `#`, `;`, `"`, `<`, and `>` in one pass. Use it for any new label.

### The mod: the PRD pane

- `hooks/register.tsx` registers `/prd` and `/prd-step`, scans for a set, and rescans after a Write or Edit tool call under `docs_dir`. It draws the pane, which has three pages per document: `doc`, `grade`, and `rubric`. A `history` stack drives **Back**. The rubric page reads `skills/prd-wizard/sections/*.md` from `$.plugin.root`.
- `hooks/markdown.tsx` is the terminal's own Markdown renderer. The terminal's `Markdown` element shows links as `text (url)` where the terminal has no OSC 8 hyperlinks, and it sizes tables to the window, not the pane. This renderer draws IDs as clickable blue text, tables as grids that fit the pane, and wireframe fences unwrapped. Other surfaces use the built-in `Markdown` element with `file:` links.
- `types/index.d.ts` is the `$.state` contract. Bump the `shape` tag on the `set` atom whenever `PrdSet` changes.
- A mod command cannot start a model turn. `/prd-q`, which continues an interview, is a prompt command in `commands/prd-q.md`.

### Validator rules follow the guides

Each section guide's blocking defects are checked by `structural()` in `scripts/prd-validate.mjs` wherever a script can check them. When you add a blocking defect to a guide, add its check and a test in `scripts/prd-validate.test.mjs` (the `failsWith` helper edits a copy of the reference set). A field a guide requires at review uses `gate()`: a warning while the section is a draft, an error at `review` or `final`. A number check ignores IDs, so "see Q-001" is not a number.

### PRD content rules

These rules are in `skills/prd-wizard/reference/boundaries.md`. A PRD never says how to build: it names no technology, vendor, component, screen, data model, or estimate. Every functional requirement passes five tests and has `shown_in`. Every journey stage has required Given/When/Then `acceptance`, which becomes the acceptance of the feature derived from that stage. A stage's `satisfaction` (1 to 5) and a scenario's `priority` come only from the expert; never estimate them. A `must` scenario must sit on a release-line stage. When a person meets a requirement's outcome on a screen or in a report, the requirement needs a wireframe, and the validator enforces it.

## Working conventions

- Work on a branch and open a PR. Cut releases from `main` after the merge. Bump `version` in `.claude-plugin/plugin.json`, then run `gh release create vX.Y.Z`.
- prd-forge's own PRD carries the plugin's version. When you bump `plugin.json`, set the same `version` in `docs/prd/prd-forge/prd.md` and add a matching entry to its change log. A test fails when they differ.
- Before you open a PR, run every command in the commands section above. Test any changed script with awkward input, such as names that hold `(`, `[`, `"`, `;`, `#`, or `<`.
- Look at rendered diagrams and PDF pages. A diagram can parse and still drop steps, print escape codes, or shrink below a readable size, and the visual check has found faults like these that no test caught.
- After you change any front matter in a set, run `prd-details.mjs`. The block between `<!-- prd-forge:details -->` and `<!-- /prd-forge:details -->` is generated, so never edit it. The export drops it, because `render_items()` prints the same fields.
- After you change journeys, scenarios, the release plan, decision rights, or wireframes in the reference set, run `prd-diagrams.mjs`, then the export, and commit the regenerated files.
