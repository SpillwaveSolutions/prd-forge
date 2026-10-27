---
doc: ../10-constraints.md
score: 35
blocking: 4
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why constraints scored 35

| Dimension | Score | Why |
| --- | --- | --- |
| Named authority | 1 | No entry names a regulation, clause, or policy. C-001 and C-002 are "Product decision, Richard Hightower", and C-003 is "whichever it is". |
| Non-negotiable | 0 | The section says so itself: "Three of these four are our own decisions, not rules imposed from outside". |
| Verification | 2 | C-001's check tests the PRD, not the product. C-003's check covers only its first half. C-004 names nobody who runs its check. |
| Linkage | 2 | No constraint has `nfr`. C-003 matches NFR-008 and NFR-010 only in prose. |
| Separation | 2 | C-004 states product behavior that is FR-006's job: "otherwise it is marked unverified or becomes an open question". |

## Blocking defects

- C-001 is a product decision listed as a constraint: "Not externally imposed".
- C-002 is a product decision listed as a constraint: "The output is plain text documents".
- C-003 is a product decision listed as a constraint, by the body's own count: "C-004 is the only constraint here imposed from outside."
- C-001 names a delivery mechanism, "inside an assistant session they are already working in". The entry admits a requirement that said it "would fail test 5".

## How to raise the grade

- **Non-negotiable (0 to 4):** Move C-001 and C-002 to section 6 as scope decisions, and the assistant-session dependency to section 11, where D-001 already records it. Name the outside policy behind C-003, or move it to section 11 as an assumption. This is the expert's decision.
- **Named authority (1 to 4):** Name the actual instrument for each entry that stays.
- **Verification (2 to 4):** Give each check a subject the product can fail, check C-003's retention half, and name who runs C-004's check.
- **Linkage (2 to 4):** Add `nfr: [NFR-008, NFR-010]` to C-003, and add an accuracy requirement for C-004.
- **Separation (2 to 4):** State C-004 as the outside rule only.

## Notes

- The case for C-001 and C-002 is sound on the domain's terms. The disagreement is about where they belong, not whether they are right.
