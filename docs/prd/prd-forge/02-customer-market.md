---
id: prd-forge-customer-market
kind: customer-market
schema: prd-forge/customer-market@1
title: Target customer and market
status: draft
updated: 2026-10-27
domain: product management tooling
section: 2
order: 20
score: 55
blocking: 3
graded: 2026-10-26
segments:
  - id: S-001
    name: Consultancies and advisory firms turning client domain knowledge into specifications
    buyer: Principal or practice lead
    user: The consultant with the domain knowledge
    size: >-
      `<count>` firms, per `<a named register, with its year>` — not yet measured;
      see Q-004.
    willingness_to_pay: >-
      Already pays for the consultant's time; the comparison is billable hours
      saved, not a software budget.
  - id: S-002
    name: Regulated-industry organisations where practitioners specify their own internal software
    buyer: Head of product, delivery lead, or head of transformation
    user: The practitioner, plus the delivery lead who reviews what they write
    size: >-
      Not yet measured; see Q-004.
    willingness_to_pay: >-
      Compared against contracting a product manager for the engagement.
competitors:
  - name: A blank PRD template in the team's document tool
    kind: indirect
    offer: >-
      The section headings, immediately, free, in a tool everyone already has.
    our_edge: >-
      After one engagement, each fact the expert could not supply is an open
      question with a named decider and a date, and the set holds no figure or
      citation that nobody can stand behind.
  - name: A general-purpose assistant conversation with no structure
    kind: indirect
    offer: >-
      Fluent prose on any section, instantly, with no setup at all.
    our_edge: >-
      Fluency is the failure mode in P-003. After one engagement, the buyer holds a
      report, made before anyone has estimated, that names each release-line stage
      no requirement covers and quotes each requirement an engineer could not write
      a test from.
  - name: Contracting a product manager for the engagement
    kind: indirect
    offer: >-
      Genuine product judgement, and someone accountable for the outcome.
    our_edge: >-
      None on quality. The edge is availability and cost at the moment the expert
      is typing, and that the expert keeps the understanding afterwards rather
      than renting it.
  - name: The status quo - a smart practitioner, a document, and a willing engineer
    kind: status-quo
    offer: >-
      No tool, no cost, no adoption, and it does sometimes work.
    our_edge: >-
      It works when the engineer is willing to re-derive the specification and is
      in the room. It fails on handover, on scale, and on anything the engineer
      cannot ask about.
why_we_win: >-
  The expert can see, before anyone starts building, which parts of their own
  specification a development team will not be able to build from, and what to
  answer to fix it.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-problem-opportunity, kind: problem-opportunity, path: ./01-problem-opportunity.md, title: Problem and opportunity }
  next: { id: prd-forge-objectives-metrics, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics }
---

# Target customer and market

| ID | Segment | Buyer | User |
| --- | --- | --- | --- |
| S-001 | Consultancies specifying from client domain knowledge | Principal or practice lead | The consultant |
| S-002 | Regulated-industry organisations where practitioners specify | Head of product or delivery | The practitioner |

Product teams entering a domain they do not know were segment S-003 until 0.8.1.
They already employ the product skill and want the domain, which this product
does not supply, so section 6 now records them as a non-goal for release 1. The
id S-003 is not reused.

## Why we win

The expert can see, before anyone starts building, which parts of their own
specification a development team will not be able to build from, and what to
answer to fix it. No competitor above tells them that.

**Honest weakness.** Against a contracted product manager we have no quality edge,
only availability and cost. A sceptical buyer is right to test that.
