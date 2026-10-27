---
doc: ../10-constraints.md
score: 30
blocking: 2
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 35
---

# Why constraints scored 30

The section now holds only C-004. C-001 to C-003 moved out at 0.8.1, and the same test now applies to C-004.

| Dimension | Score | Why |
| --- | --- | --- |
| Named authority | 0 | "Professional liability. An expert circulating a PRD that cites a regulation incorrectly is exposed personally and professionally" names no regulation, clause, policy, or body. |
| Non-negotiable | 1 | The statement is product behavior the team could change: "otherwise it is marked unverified or becomes an open question". TR-005 already records it as a decision. |
| Verification | 2 | "Every citation in a set checked against its source before any section reaches final" says neither who checks nor what record proves it. |
| Linkage | 2 | `applies_to` lists FR-009, which shows a grade and states no fact. No `nfr`, and section 8 has no citation requirement. |
| Separation | 1 | The body says "it is the reason FR-006 exists": the constraint restates FR-006 and TR-005. |

## Blocking defects

- C-004 has no real authority. "Professional liability" names no instrument and no body.
- C-004 is a design choice listed as a constraint: it is the product's chosen response to a risk, and the set already holds it as TR-005 and FR-006.

## How to raise the grade

- **Named authority (0 to 4):** Name the instrument the expert is bound by, such as a professional code clause, a client engagement-letter clause, or a firm policy by name. If none exists, C-004 is not a constraint: move it out as C-001 to C-003 were, and let TR-005 and FR-006 hold the rule. Section 9 may then be honestly empty. That is the expert's decision.
- **Non-negotiable and separation (1 to 4):** State the outside rule itself, and leave the product's behavior in FR-006.
- **Verification (2 to 4):** Name who checks the citations and what they produce.
- **Linkage (2 to 4):** Scope `applies_to` to where facts are written, and add an accuracy requirement in section 8 linked by `nfr`.
