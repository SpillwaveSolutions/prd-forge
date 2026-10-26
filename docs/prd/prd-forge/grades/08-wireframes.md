---
doc: ../08-wireframes.md
score: 66
blocking: 1
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why wireframes scored 66

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 3 | Every `screen` and `report` requirement appears in an `illustrates` list. WF-003 claims FR-011 but shows one score, where FR-011 says "both scores are visible". WF-006 claims FR-013 but draws neither the summary nor the scope. |
| Traceability | 3 | Every sketch names its requirements, persona, and stage. WF-001 sits at ST-001 but illustrates FR-008, which is at ST-003. WF-003 sits at ST-003 but illustrates FR-011, which is at ST-004. Four headings differ from their front-matter titles. |
| The person's view | 3 | Each sketch shows what a person reads. WF-006 has nothing for the ST-006 decision "Approve, approve with conditions, or reject", and its approvals table leaves out the approver's role. WF-001 shows a set in progress at ST-001, where every section is "not yet started". |
| Real content | 4 | The content is the set's own: version 0.2.0, Q-001 due 2027-03-31, the grades 88, 84, and 82, and the quoted baseline text. |
| Marks explained | 4 | Every sketch has exactly as many marks as `shows` lines, in order. |
| No design | 1 | WF-002 names a component and a storage location: "Ask for the prd-wizard skill" and "Looked under docs/prd." Section 7 says these are "deliberately absent everywhere". WF-001's "a click opens why" assumes a pointer. |
| States | 2 | WF-002 draws "No PRD set loaded", a state no scenario names. The empty state FR-002 names, every section listed as not started, is not drawn. SC-002's "two blocking defects, both named" and SC-005's "two stages that have no requirement behind them" are not drawn. |
| Every control earns its place | 1 | WF-001's Prev, Next, Rescan, and Back buttons and its "FR-009 ›" link trace to no requirement. WF-002's Rescan button traces to none either. |

## Blocking defects

- WF-002 names a component of the product and its storage location: "Ask for the prd-wizard skill: it interviews you" and "Looked under docs/prd."

## How to raise the grade

- **No design (1 to 4), which also clears the blocking defect:** In WF-002, replace both lines with what the person does, such as "Nothing written yet. Say what you want built to begin." In WF-001's `shows` <3>, replace "a click opens why" with "and the reasons behind it".
- **Every control earns its place (1 to 4):** Remove the buttons and the "FR-009 ›" link from WF-001, and Rescan from WF-002. If the expert needs them, first write the requirement in section 7 that asks for them.
- **States (2 to 4):** Redraw WF-002 as FR-002's empty state: every section listed, each marked not started. Add a sketch of SC-002's "two blocking defects, both named". Add SC-005's two stages with no requirement to WF-005.
- **Coverage and traceability (3 to 4):** Show the before and after scores and the offer of `review` in WF-003, or give FR-011 its own wireframe at ST-004. Move WF-001 to ST-003, or drop FR-008 from it. Make each heading match its title.
- **The person's view (3 to 4):** In WF-006, add the summary and scope lines FR-013 asks for, a role column for FR-014, and where the approver makes the ST-006 choice.
