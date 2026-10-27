# prd-forge

- **Project ID:** 001
- **Created:** 2026-10-27
- **Source PRD:** [`docs/prd/prd-forge/`](../../prd/prd-forge/prd.md), version 0.8.0

The ArcKit architecture documents for prd-forge, the Claude Code plugin that interviews a domain expert and writes a PRD as a set of schema-checked markdown files.

The PRD says what the product must do and names no technology. These documents describe how the existing code base does it, so they name technology.

## Run ArcKit commands on this project

ArcKit finds `projects/` by walking up from the working directory. Start Claude Code from `docs/` so that its hooks detect this project:

```bash
cd docs
claude
```
