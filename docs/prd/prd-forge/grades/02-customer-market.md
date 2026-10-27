---
doc: ../02-customer-market.md
score: 50
blocking: 1
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 55
---

# Why target customer and market scored 50

The template and assistant edges that 0.8.1 rewrote now pass, and S-003 is gone. The grader found a new defect in the status-quo edge.

| Dimension | Score | Why |
| --- | --- | --- |
| Buyer vs user | 2 | No segment has `user_personas` or `buyer_persona`, and no buyer is a section 4 persona. S-002 lists the delivery lead as both buyer and user. |
| Sizing | 1 | No segment has a size. S-001 still holds the template placeholder "`<count>` firms, per `<a named register, with its year>`". Q-004 owns the gap. |
| Substitutes | 3 | The status quo and three substitutes are named, but none is direct or build-in-house. |
| Honest edge | 2 | The template and assistant edges are checkable outcomes. The PM edge has no cost figure, and the status-quo edge states no outcome of this product. |
| Why we win | 2 | It describes what the user sees, not what the buyer gets, and "No competitor above tells them that" conflicts with the PM row. |

## Blocking defects

- The status-quo competitor's `our_edge` states no outcome of prd-forge: "It works when the engineer is willing to re-derive the specification and is in the room. It fails on handover, on scale, and on anything the engineer cannot ask about."

## How to raise the grade

- **Honest edge (2 to 4):** Rewrite the status-quo edge as what the engineer receives at handover without being in the room, and give the PM edge a cost or time comparison.
- **Sizing (1 to 4):** Remove the placeholder, and give a count with its source, date, method, and unit, or say "unknown, see Q-004".
- **Buyer vs user (2 to 4):** Add `user_personas` and `buyer_persona` to each segment, and say which persona buys.
- **Why we win (2 to 4):** Say it in the buyer's terms.
- **Substitutes (3 to 4):** Name a direct alternative, or say there is none, and consider build-in-house.

## Notes

- S-001's size has an em dash, and the body table's S-002 row drops the delivery lead.
