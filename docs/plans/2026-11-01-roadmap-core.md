---
date: 2026-11-01
slug: roadmap-core
title: Roadmap core (issue #24, PR 1)
epic: 01M6CD1SVG9SVGV9RWD8FQHSS2
items: [01M6CD1SVWJWBGY9Y5BY9GWPT6, 01M6CD1SVWJWBGY9Y5BY9GWPT8, 01M6CD1SVWJWBGY9Y5BY9GWPTA, 01M6CD1SVWJWBGY9Y5BY9GWPTC, 01M6CD1SVXKPV6B38GY4BW6YF5, 01M6CD1SVXKPV6B38GY4BW6YF7]
git_hash: "de1e754efc4bb5f4b1ee6d2d1063fa897c0e0014"
---

# Roadmap core (issue #24, PR 1)

Add a roadmap as an optional document in a PRD set, `18-roadmap.md`, kind
`roadmap`. One roadmap per set. Tracker input stays read-only. The
`/prd-roadmap` command and tracker input come in PR 2.

Decisions, from the user on 2026-10-30: file `18-roadmap.md`; one roadmap
per PRD set; read-only tracker input in the first release; core first.

## Tasks

- [ ] (P2) Add the roadmap schema and register the kind
  Write schemas/roadmap.json: format, horizon, items with RM ids, horizon, releases, objectives, theme, status, owner, depends_on, blocker, mitigation, priority with a scoring method, and a changes log. Add the kind to both enums in common.json, to SCHEMA_FILE in the validator, and to SECTION_OF_KIND and ITEM_LISTS in the export and the details script.
- [ ] (P2) Add the roadmap's validator rules
  Unique RM ids; releases, objectives, and depends_on ids exist; a now item maps to a release with exit criteria; a later item has no committed date; at-risk and blocked items have a blocker and a mitigation; warn when now holds more than one release; warn when a stored score differs from its recomputed value; the release plan's roadmap_link points to the roadmap file when one exists.
- [ ] (P2) Write the roadmap section guide and rubric
  skills/prd-wizard/sections/18-roadmap.md: what belongs, the scoring methods, the rubric dimensions, and the blocking defects from the issue. Effort and capacity live only in the roadmap.
- [ ] (P2) Draw the roadmap diagram
  Generate diagrams/roadmap.mmd with Now, Next, and Later lanes, and its ASCII text view for the pane.
- [ ] (P2) Add a roadmap to the reference set
  Write docs/prd/prd-forge/18-roadmap.md from the release plan and the open issues, link it into the root's children and the prev and next chain, and point roadmap_link at it.
- [ ] (P2) Update the guides, the README, and the version
  front-matter.md table, method.md order, SKILL.md counts, README, version 0.13.0, and the change log.
