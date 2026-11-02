---
date: 2026-11-02
slug: roadmap-command
title: Roadmap command (issue #24, PR 2)
epic: 01M6CS2Q1R05GS1XZWR50CZEAQ
items: [01M6CS2Q24DTH6GN65XMT2HHTQ, 01M6CS2Q24DTH6GN65XMT2HHTS, 01M6CS2Q24DTH6GN65XMT2HHTV, 01M6CS2Q252XDYNY78C9EQWEBG]
git_hash: "dd90e2fbe06ec2de95072ce4dccf201cc1b1d19d"
---

# Roadmap command (issue #24, PR 2)

Add the `/prd-roadmap` command and read-only tracker input. Show, on each
release and objective, the roadmap items that name it.

## Tasks

- [ ] (P2) Add the /prd-roadmap command
  commands/prd-roadmap.md: the operations create, add, status, reprioritize, and move. Each change appends to the roadmap's changes and writes a change-log entry. The command prints a short summary and runs prd-details, prd-diagrams, and the validator.
- [ ] (P2) Read tracker input read-only
  The command takes pasted text or a Linear, Jira, or Asana connector when one is installed. It records each item's source and never writes to the tracker without explicit approval.
- [ ] (P2) Link releases and objectives back to the roadmap
  prd-details lists, in the release plan and in objectives-metrics, the roadmap items that name each release or objective, so the pane can open each RM id.
- [ ] (P2) Update the docs
  README command list, SKILL.md, and the section guide.
