---
date: 2026-11-16
slug: export-design-pass
title: Improve the PRD export: imagen diagrams and a design pass
epic: 01M7JXHGSQFKC5QB720MGAGZ44
items: [01M7JXHGSR6E7FXE6P6RN59053, 01M7JXHGSR1VSDX37A92Q0SWMB, 01M7JXHGSR48DDF41X4VC0Y2YN, 01M7JXHGSR4HJTV7ZJGX4TWK0Y, 01M7JXHGSRNVDCNB9H5RJXM65A, 01M7JXHGSRSDMKFYRD6QW8DE77, 01M7JXHGSRAF1G0JBDH4STFYA6, 01M7JXHGSRTYQM9QA8P2QSD00P]
---

# Improve the PRD export: imagen diagrams and a design pass

## Context

The Word and PDF exports of `docs/prd/prd-forge/` were last made on November 3, 2026, in commit `14c8f50`. A visual review of the PDF shows these problems:

- The diagrams use Mermaid's default colors (yellow clusters, purple nodes). These colors clash with the document's navy accent `#1f4e79`.
- Wide diagrams, such as `J-001-overview` and `LC-001`, shrink until the text is hard to read. Tall diagrams leave half a page blank.
- The cover page is sparse. The document lists the contents twice: once in the generated table, and again in the root body's own table.
- ID lists, such as the `IN-`, `OUT-`, and `Q-` items, are dense bullets with no visual anchor.
- Figures have no numbers. The Word file has no real table of contents and no page count.
- **Page breaks are the worst problem.** Pages 32 to 45 each hold one scenario diagram and almost nothing else. Page 23 is three-quarters blank because the J-002 diagram does not fit below the text and jumps to the next page. Page 24 ends with an item card whose accent bar runs down an empty page.
- **The title is all lowercase.** The cover, the footer, and the Word properties show `prd-forge`, from the `product` field in `prd.md`. The title must be in title case: **PRD Forge**.

You want two things. First, use the `imagen-diagrams` skill to make better figures. Second, use the design skills to make the PDF and Word layout look professional. You chose these options:

- Make imagen figures for about 8 overview diagrams. The other diagrams get a matching Mermaid theme.
- Build a new `prd-forge` theme from the export's existing palette.
- Make the change plugin-wide, in `scripts/prd_export.py` and `scripts/prd-diagrams.mjs`.

## Approach

### 1. Create a worktree and a branch

Do all the work in a new git worktree on a new branch. The main checkout at `/Users/richardhightower/clients/kpmg/src/prd-forge` stays on `main` and is not changed.

1. Use the `superpowers:using-git-worktrees` skill. Create the worktree with the `EnterWorktree` tool, or run this command:

   ```bash
   git worktree add ../prd-forge-export-design -b export-design-pass main
   ```

2. Run every later step, including `worklog`, from inside the worktree.
3. When the PR merges, remove the worktree with `git worktree remove`.

### 2. Create the prd-forge theme

1. Read `references/theme-schema.md` in the imagen-diagrams skill.
2. Write `.imagen-diagrams/prd-forge.yaml` at the repository root. Use the palette from the `CSS` constant in `scripts/prd_export.py`: ink `#16181d`, mute `#5c6370`, faint `#8b93a1`, rule `#d8dce3`, accent `#1f4e79`, chip `#eef2f7`, and soft `#f7f8fa`.
3. Write `.imagen-diagrams/config.yaml` to make `prd-forge` the project default theme, with `article` density.

### 3. Theme every Mermaid diagram

1. Add `scripts/mermaid-theme.json`, a Mermaid `base` theme with `themeVariables` from the same palette. Give nodes a soft fill and a navy border, give clusters a light gray fill, and use ink-colored edges.
2. Pass it to `mmdc` with `-c` in `render()` in `scripts/prd-diagrams.mjs`, at about line 179.
3. Leave the PlantUML Salt wireframes as they are.

### 4. Make the imagen figures

Make figures for these diagrams: `J-001`, `J-001-overview`, `J-002`, `J-001-satisfaction`, `LC-001`, `release-line`, `roadmap`, and `decision-rights`.

For each diagram, follow the skill's loop:

1. Run `render.py --source diagrams/<id>.mmd --theme prd-forge --density article`.
2. Run `judge.py`. Then open the PNG and check every label, every edge, and legibility.
3. On a miss, run `render.py` again with `--feedback`, at most 2 times.
4. If the labels still fail, draw the SVG by hand and gate it with `to_svg.py --strict-labels`.

The outputs are `diagrams/<id>_imagen.png` and the `_imagen.json` sidecar. The sidecar holds `hash`, which is the SHA-256 of the source text.

### 5. Make the export prefer a current imagen figure

Change `image_file()` in `scripts/prd_export.py`, at line 123. The PDF path (line 386) and the Word path (line 701) both call it, so one change covers both.

- Use `diagrams/<id>_imagen.png` when its sidecar `hash` equals the SHA-256 of the current `diagrams/<id>.mmd`.
- When the hash differs, use the Mermaid PNG and write a warning to stderr that names the stale figure. A stale figure never reaches a reader.

### 6. Fix the page breaks

Fix these causes in `CSS` and `h_blocks()` in `scripts/prd_export.py`. The page-break fixes come before the design pass because they are the main complaint.

| Cause | Fix |
| --- | --- |
| `figure.diagram img{max-height:215mm}` lets one diagram fill a page. `figure.diagram{break-inside:avoid}` then moves the figure, and the heading above it, to the next page. | Lower the cap to about 150 mm, so that a figure fits with its heading and some text. Keep `break-inside:avoid` on the figure only. |
| The scenario section puts each tall flowchart on a page of its own. | Apply the same cap. Check that two scenarios, each with its figure, can share a page. |
| `.item dl>dt,.item dl>dd{break-inside:avoid}` holds a large field together, such as a list of stages. A large field that does not fit leaves a blank gap, and the item's accent bar runs through it. | Keep `break-inside:avoid` on short fields only. Let long fields split. Use `orphans:3` and `widows:3` for the text. |
| `section.part{break-before:page}` starts each section on a new page. | Keep it. A new page per section is correct. |

Make the same check in Word:

- Look for blank pages from the page-break paragraphs that `build_docx()` adds.
- Look for chains of "keep with next" that push content forward.
- Use `page_break_before` on the section heading in place of a separate paragraph that holds only a page break.

### 7. Show the title in title case

Add a `display_name()` function to `scripts/prd_export.py`, and use it everywhere the export shows the product name: the cover in the PDF and in Word, the PDF footer title, and the Word `core_properties.title`.

- When the `product` value has an uppercase letter, keep it as it is. The author chose that casing.
- When the value is all lowercase, like a slug, replace `-` and `_` with spaces and capitalize each word. Write a small set of known acronyms (`PRD`, `AI`, `API`, `UI`, `UX`) in uppercase. The value `prd-forge` becomes **PRD Forge**.
- Use the same function on the document title in the footer, so that `prd-forge PRD` becomes **PRD Forge PRD**.
- Add a test for `prd-forge`, for a mixed-case name that stays as it is, and for a name with awkward characters.

The source files in the set do not change. The pane and the wiki keep the `product` value as written.

### 8. Do a design pass on the PDF

Load the `frontend-design` skill for the CSS work. Run `design:design-critique` on rendered pages before and after the change. Change `CSS`, `h_blocks()`, and `build_html()` in `scripts/prd_export.py`, and the footer in `scripts/prd-pdf.mjs`:

- **Cover:** add a full-height navy band, the product name, chips for the version and status, and the stakeholders as a list.
- **Contents:** link each row to its section anchor. Add a small grade bar. Drop the duplicate "Contents" subsection from the root body in the export only. The source file stays as it is.
- **ID lists:** show a leading ID, such as `IN-001:`, as an accent tag with a hanging indent.
- **Figures:** number each one ("Figure 3. J-001 journey"). Add a light frame. Size figures by width so that wide diagrams fill the page.
- **Section openers and tables:** use a larger section number, an accent rule, accent table headers, and light row bands.
- **Footer:** show the product, the version, and "Page X of Y". Try CSS `@page` margin boxes for a running section header. Keep the header only if Chromium renders it.

### 9. Do a design pass on the Word file

Change `build_docx()` in `scripts/prd_export.py` to match the PDF:

- Add a cover with a shaded navy band and no header or footer. Use a different first page.
- Add a real Word table of contents field (`TOC \o "1-2" \h`). Set `w:updateFields` so that Word fills in page numbers when you open the file. Keep the status table.
- Add a header with the product name. Add a footer with "Page X of Y" through `PAGE` and `NUMPAGES`.
- Number figure captions with the `Caption` style and a `SEQ Figure` field.
- Use accent heading colors, and repeat table header rows (`tblHeader`).
- Set the East Asian font slot as well, so that Word does not swap fonts.

### 10. Regenerate and check visually

1. Run `prd-diagrams.mjs` on `docs/prd/prd-forge` and on `examples/acme-returns`.
2. Run `prd-details.mjs` and `prd-validate.mjs` on the reference set.
3. Run the export with `uv`.
4. Read the PDF pages with diagrams (about pages 20 to 46, 70 to 75, 86, 108, and 113), the cover, and the contents.
5. Convert the Word file to PDF with `soffice` in the scratchpad and read the same pages. Then open the `.docx` in Word.
6. Fix what you find, and repeat until the critique has no major findings.

### 11. Test and open a PR

1. Add a test to `scripts/prd-diagrams.test.mjs` that is skipped when `uv` is not installed. It copies the set and adds an `_imagen.png` file with a matching sidecar and then with a stale sidecar. It checks which PNG the HTML embeds (`--keep-html`) and checks the stale warning.
2. Run every command in the "Commands" section of `CLAUDE.md`. Test the changed scripts with awkward IDs and titles that hold `(`, `[`, `"`, `;`, `#`, or `<`.
3. Commit the regenerated diagrams, the imagen figures, and both exports. Open a PR. Do not bump the version: a release is a separate step after the merge.

### 12. Capture the plan

In the worktree, run `worklog plan-capture` as the first action after you approve this plan, so that the steps become work items before the work starts. Then run `worklog roadmap-render`, and commit the log and the roadmap together on `export-design-pass`.

## Files to change

| File | Change |
| --- | --- |
| `scripts/prd_export.py` | `image_file()`, `CSS`, `h_blocks()`, `build_html()`, and `build_docx()` |
| `scripts/prd-pdf.mjs` | The footer template |
| `scripts/prd-diagrams.mjs` | Pass the Mermaid config to `mmdc` |
| `scripts/mermaid-theme.json` | New file |
| `.imagen-diagrams/prd-forge.yaml`, `.imagen-diagrams/config.yaml` | New files |
| `scripts/prd-diagrams.test.mjs` | A test for the imagen preference |
| `docs/prd/prd-forge/diagrams/*`, `examples/acme-returns/diagrams/*` | Regenerated images |
| `docs/prd/prd-forge/prd-forge-prd.{pdf,docx}` | Regenerated exports |

## Verification

- All four `node --test` files pass. `claude plugin validate .` and `claude plugin test .` pass.
- `prd-validate.mjs docs/prd/prd-forge` exits 0.
- The new test proves that a stale imagen figure is not embedded.
- Each imagen figure passes `judge.py` and the vision check. Any figure that fails is drawn as SVG.
- No page in the PDF is more than half blank, except the last page of a section. Check with `pdftotext` line counts per page, then look at each page the count flags.
- The Word file, converted with `soffice`, has no blank pages and no single-figure pages.
- The cover, the footer, and the Word properties show **PRD Forge**.
- The rendered PDF and Word pages show: a full cover, contents that link to each section, numbered framed figures with legible text, and "Page X of Y" in the footer.

## Risks

- Image calls go to the Gemini API through `imagen`, which costs money. About 8 figures, with at most 3 calls each, means at most 24 calls.
- The Mermaid theme changes every rendered diagram in both sets. The diff is large, but the change is cosmetic.

## Tasks

- [ ] (P1) Theme every Mermaid diagram with the prd-forge palette
  Add scripts/mermaid-theme.json and pass it to mmdc in prd-diagrams.mjs.
- [ ] (P1) Make imagen figures for 8 overview diagrams
  Add the prd-forge imagen theme, render, judge, and fall back to SVG on label misses.
- [ ] (P1) Make the export prefer a current imagen figure
  image_file() uses <id>_imagen.png only when its sidecar hash matches the source.
- [ ] (P0) Fix the page breaks in the PDF and Word exports
  Cap figure height, let long item fields split, and remove blank pages in Word.
- [ ] (P0) Show the product name in title case
  display_name() turns prd-forge into PRD Forge on the cover, footer, and properties.
- [ ] (P1) Do a design pass on the PDF layout
  Cover, linked contents, ID tags, numbered figures, tables, and footer.
- [ ] (P1) Do a design pass on the Word layout
  Cover, TOC field, header and footer with page count, figure captions, table headers.
- [ ] (P1) Regenerate, check visually, test, and open a PR
