# Architecture diagram: prd-forge system context

> **Template Origin**: Official | **ArcKit Version**: 6.18.3 | **Command**: `/arckit:diagram`

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | ARC-001-DIAG-001-v1.0 |
| **Document Type** | Architecture Diagram |
| **Project** | prd-forge (Project 001) |
| **Classification** | PUBLIC |
| **Status** | DRAFT |
| **Version** | 1.0 |
| **Created Date** | 2026-10-27 |
| **Last Modified** | 2026-10-27 |
| **Review Cycle** | Monthly |
| **Next Review Date** | 2026-11-26 |
| **Owner** | Richard Hightower, product owner |
| **Reviewed By** | [PENDING] |
| **Approved By** | [PENDING] |
| **Distribution** | Project Team, Architecture Team |

## Revision History

| Version | Date | Author | Changes | Approved By | Approval Date |
|---------|------|--------|---------|-------------|---------------|
| 1.0 | 2026-10-27 | ArcKit AI | Initial creation from `/arckit:diagram` command | [PENDING] | [PENDING] |

---

## Diagram

**Type**: C4 Context (Level 1)

**Purpose**: Show prd-forge with the four PRD personas who use it and the external systems it depends on.

**Notation**: A Mermaid flowchart in C4 notation and C4 colors. Mermaid's native `C4Context` renderer stacked every element in one column with overlapping labels, which failed the quality gate, so the command's remediation applies: a flowchart with the C4 palette.

### Mermaid Format

```mermaid
flowchart LR
    subgraph people["People"]
        direction TB
        expert["<b>Domain expert</b><br/>PER-001<br/>Answers the interview, owns the PRD"]
        sponsor["<b>Sponsor or approver</b><br/>PER-003<br/>Approves the PRD for a release"]
        englead["<b>Engineering lead</b><br/>PER-002<br/>Builds from the PRD"]
        delivery["<b>Delivery lead</b><br/>PER-004<br/>Maps the backlog, release 2"]
    end

    prdforge["<b>prd-forge</b><br/>Claude Code plugin<br/>Interviews the expert, writes and grades<br/>a PRD as schema-checked markdown"]

    subgraph external["External systems"]
        direction TB
        host["<b>Claude Code session</b><br/>Model turns, tools, pane surface"]
        store[("<b>Customer file store</b><br/>The set under docs_dir")]
        render["<b>Diagram renderers</b><br/>Mermaid CLI, PlantUML<br/>optional"]
        export["<b>Export runtime</b><br/>Python, python-docx,<br/>Playwright or Chromium, optional"]
        web["<b>Web search</b><br/>prd-domain-voice only<br/>see CF-3"]
    end

    expert -->|answers, reads grades| prdforge
    sponsor -->|reads the root, approves| prdforge
    englead -->|reads the set and report| prdforge
    delivery -->|derives the backlog| prdforge
    prdforge -->|runs inside| host
    prdforge -->|reads and writes the set| store
    prdforge -->|renders diagrams| render
    prdforge -->|exports Word and PDF| export
    prdforge -.->|checks domain terms| web

    classDef person fill:#08427B,stroke:#052E56,color:#fff
    classDef system fill:#1168BD,stroke:#0B4884,color:#fff
    classDef ext fill:#999999,stroke:#6B6B6B,color:#fff
    classDef risk fill:#999999,stroke:#C0392B,stroke-width:3px,color:#fff
    class expert,sponsor,englead,delivery person
    class prdforge system
    class host,store,render,export ext
    class web risk
    style people fill:none,stroke:#08427B,stroke-dasharray:5 5
    style external fill:none,stroke:#6B6B6B,stroke-dasharray:5 5
```

**Legend**:

- Dark blue: a person
- Mid blue: prd-forge, or one of its containers
- Light blue: a component
- Gray: an external system
- Red border: an open conflict (CF-3 in the requirements)
- Cylinder: a store of files
- Dashed box: a boundary
- Dotted arrow: an optional or disputed flow
- Thick arrow: the main write path

---

## Component Inventory

| Component | Type | Technology | Responsibility | Source |
|-----------|------|------------|----------------|--------|
| Domain expert | Person | None | Answers the interview, owns the PRD | PER-001 |
| Sponsor or approver | Person | None | Approves the PRD for a release | PER-003 |
| Engineering lead | Person | None | Builds from the PRD | PER-002 |
| Delivery lead | Person | None | Derives the backlog, release 2 | PER-004 |
| prd-forge | System | Claude Code plugin | Interviews, writes, grades, validates, draws, exports | `.claude-plugin/plugin.json` |
| Claude Code session | External system | Assistant host | Runs every skill, agent, and the pane | INT-001, INT-002 |
| Customer file store | External store | Files under `docs_dir` | Holds every set | INT-008 |
| Diagram renderers | External tools | Mermaid CLI, PlantUML | Render diagrams | INT-003, INT-004 |
| Export runtime | External tools | Python, python-docx, Playwright or Chromium | Word and PDF | INT-005, INT-006 |
| Web search | External service | Host web tools | Term checks for one reviewer | INT-007 |

---

## Architecture Decisions

### Key Design Decisions

1. prd-forge runs inside the user's existing session and has no application of its own (PRD C-001).
2. The customer's file store is the system of record, not prd-forge (PRD C-002).
3. Renderers and the export runtime are optional; without them the text forms still read (principle 11).

### Technology Choices

| Technology | Where | Why |
|------------|-------|-----|
| Claude Code plugin | The whole system | Required by C-001 |
| Plain files | The store | Required by C-002 |

---

## Requirements Traceability

| Requirement | Component | Coverage |
|-------------|-----------|----------|
| BR-001 to BR-005 | prd-forge | Covered by the system as a whole |
| INT-001 to INT-008 | External systems | All eight shown |
| CF-3 | Web search | Shown with a red border |

---

## Integration Points

### External Systems

| System | Requirement | Interface | Direction |
|--------|-------------|-----------|-----------|
| Claude Code session | INT-001, INT-002 | Plugin contract | Both ways |
| Customer file store | INT-008 | Files | Both ways |
| Mermaid CLI, PlantUML | INT-003, INT-004 | Child process | Out, then files back |
| Python, Playwright or Chromium | INT-005, INT-006 | Child process | Out, then files back |
| Web search | INT-007 | Host tool | Out, results back |

### APIs and Endpoints

prd-forge exposes no network API. Its interfaces are the host's plugin contract (INT-001, INT-002), command-line scripts, and files.

---

## Data Flow

### Data Sources

- The expert's answers, through the host session.

### Data Sinks

- The document set in the customer's store; the Word and PDF export beside it.

### PII Handling (UK GDPR / GDPR Compliance)

- The only personal data is names typed into `owner`, `decider`, `consulted`, `author`, and approval `name` fields (`ARC-001-DATA-v1.0`).
- It stays in the customer's set. The product keeps no copy (DR-003).

---

## Security Architecture

### Security Zones

| Zone | Contents | Trust |
|------|----------|-------|
| Host session | The model turn, the skills, the agents, the pane | The user's own session (C-001) |
| Customer store | The document set | The folder's own permissions (NFR-SEC-001) |
| Local tools | Validator, generator, exporter, renderers | Run by the user, on the user's machine |
| Outside | Web search, used only by `prd-domain-voice` | Untrusted; content leaves the session (CF-3) |

### Security Controls

- Reviewers are read-only: `prd-adversary` and `prd-engineer-review` have Read, Grep, and Glob (NFR-SEC-002).
- No credential or key in the plugin or a set (NFR-SEC-003).
- No outbound destination for domain content, except the open CF-3 (NFR-C-001).

### Authentication & Authorization

- prd-forge has no accounts and no login of its own (C-001).
- Who can read a set is decided by the customer's file permissions.
- Decision authority follows the PRD's decision rules TR-001 to TR-013, not a technical control.

---

## Deployment Architecture

### Cloud Provider

None. prd-forge is a plugin installed into the user's Claude Code from its GitHub repository. It runs on the user's machine and in the host session.

### Infrastructure Components

- The user's machine: Node.js for the scripts; optionally Python through `uv`, the Mermaid CLI, PlantUML, and Playwright or Chromium.

### Network Architecture

- No network calls by the plugin's own code. The host session makes its own calls, and `prd-domain-voice` may search the web (CF-3).

---

## Non-Functional Requirements

### Performance

- Next question under 20 seconds at p95 (NFR-P-001); grading under 90 seconds at p95 (NFR-P-002). Neither is measured yet.
- The validator checks the reference set in 0.05 seconds.

### Scalability

- Set size up to 120 FRs, 10 journeys of 10 stages, and 200 terms (NFR-S-001). Not measured at that size yet.

### Availability & Resilience

- A set is plain files and survives the product (NFR-A-001).
- Gap: answers before a section is drafted live only in the conversation (NFR-A-002, Q-010).

### Security & Compliance

- See Security Architecture above.

---

## UK Government Compliance (if applicable)

Not applicable. prd-forge is not a UK Government service.

---

## Wardley Map Integration

No Wardley map exists for this project yet. Run `/arckit:wardley` to position the interview method (custom-built) against the host session and the renderers (commodity, used as they are).

---

## Diagram Quality Gate

| # | Criterion | Target | Result | Status |
|---|-----------|--------|--------|--------|
| 1 | Edge crossings | 0 for 10 elements | 0 | PASS |
| 2 | Visual hierarchy | System boundary prominent | prd-forge is central and darkest blue | PASS |
| 3 | Grouping | Related elements proximate | People left, externals right | PASS |
| 4 | Flow direction | Consistent | Left to right | PASS |
| 5 | Relationship traceability | Lines followable | Each line distinct | PASS |
| 6 | Abstraction level | One C4 level | Context | PASS |
| 7 | Edge label readability | No overlaps | No overlaps | PASS |
| 8 | Node placement | No long edges | Short, radial edges | PASS |
| 9 | Element count | 10 or fewer | 10 | PASS |

**Accepted trade-offs**:

- The renderers and the export runtime are grouped as two boxes, not five, to stay within 10 elements.

---

## Linked Artifacts

- Requirements: `../ARC-001-REQ-v1.0.md`
- Data model: `../ARC-001-DATA-v1.0.md`
- Stakeholders: `../ARC-001-STKE-v1.0.md`
- Principles: `../../000-global/ARC-000-PRIN-v1.0.md`
- Source PRD: `../../../prd/prd-forge/prd.md`

---

## Change Log

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-10-27 | First version, from the code at the v0.8.0 tag |

## External References

### Document Register

| Doc ID | Filename | Type | Source Location | Description |
|--------|----------|------|-----------------|-------------|
| REQ | ARC-001-REQ-v1.0.md | Requirements | `docs/projects/001-prd-forge/` | INT, FR, and NFR ids cited above |
| CODE | Repository | Source code | Repository root | Files named in the component inventory |

### Citations

| Citation ID | Doc ID | Page/Section | Category | Quoted Passage |
|-------------|--------|--------------|----------|----------------|
| REQ-C1 | REQ | Integration Requirements | Integration | INT-001 to INT-008 |

### Unreferenced Documents

| Filename | Source Location | Reason |
|----------|-----------------|--------|
| None | None | None |

---

**Generated by**: ArcKit `/arckit:diagram` command
**Generated on**: 2026-10-27
**ArcKit Version**: 6.18.3
**Project**: prd-forge (Project 001)
**AI Model**: Claude Opus 5.5 (claude-opus-5-5)
**Generation Context**: ARC-001-REQ-v1.0, ARC-001-DATA-v1.0, ARC-000-PRIN-v1.0, and the code at the v0.8.0 tag. Rendered with `mmdc` and checked by eye before writing.
