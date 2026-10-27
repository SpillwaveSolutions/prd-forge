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
score: 70
blocking: 0
graded: 2026-10-27
segments:
  - id: S-001
    name: Consultancies and advisory firms turning client domain knowledge into PRDs
    buyer: Principal or practice lead, as the sponsor
    buyer_persona: PER-003
    user: The consultant with the domain knowledge, as the product manager
    user_personas:
      - PER-001
    size: >-
      Not yet measured; see Q-004.
    size_unit: organizations
    willingness_to_pay: >-
      Already pays for the consultant's time; the comparison is billable hours
      saved, not a software budget.
    adoption_barriers:
      - A sponsor may trust a machine-produced grade less, not more (Q-005).
      - The product runs only inside an assistant session the expert already uses (D-001).
  - id: S-002
    name: Regulated-industry organizations where practitioners specify their own internal software
    buyer: Head of product or head of transformation, as the sponsor
    buyer_persona: PER-003
    user: The practitioner, as the product manager or domain expert
    user_personas:
      - PER-001
    size: >-
      Not yet measured; see Q-004.
    size_unit: organizations
    willingness_to_pay: >-
      Compared against contracting a product manager for the engagement. The day
      rate is Q-013.
    adoption_barriers:
      - A sponsor may trust a machine-produced grade less, not more (Q-005).
      - An engineering lead may read a PRD that names no technology as incomplete (A-003).
competitors:
  - name: ChatPRD, an AI tool that drafts PRDs from a chat
    kind: direct
    offer: >-
      A structured PRD drafted fast from little input, from a chat. Source:
      ChatPRD docs, https://www.chatprd.ai/docs/writing-your-first-prd, accessed
      2026-10-27.
    our_edge: >-
      Each section is graded against a published rubric, and before anyone
      estimates, the buyer holds a report that names each release-line stage no
      requirement covers and quotes each requirement an engineer could not write
      a test from.
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
  - name: Contracting a product manager without the domain for the engagement
    kind: indirect
    offer: >-
      Genuine product judgement, and someone accountable for the outcome.
    our_edge: >-
      The PRD is written by the person who holds the domain knowledge, so no
      domain fact passes through a second person, and the buyer sees each
      section's grade and blocking defects before approving.
  - name: The status quo - a smart practitioner, a document, and a willing engineer
    kind: status-quo
    offer: >-
      No tool, no cost, no adoption, and it does sometimes work.
    our_edge: >-
      At handover, an engineer who was not in the room receives a set that names
      each release-line stage no requirement covers and holds each fact the
      expert could not supply as an open question with a named decider and a
      date, so they can estimate without first interviewing the author.
why_we_win: >-
  Against the cost of contracting a product manager for the engagement, the buyer
  gets a PRD written by the person who holds the domain knowledge, with every gap
  an engineer could not build from named before anyone estimates. The day rate
  that comparison rests on is Q-013.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-problem-opportunity, kind: problem-opportunity, path: ./01-problem-opportunity.md, title: Problem and opportunity }
  next: { id: prd-forge-objectives-metrics, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics }
---

# Target customer and market

| ID | Segment | Buyer | User |
| --- | --- | --- | --- |
| S-001 | Consultancies and advisory firms turning client domain knowledge into PRDs | Principal or practice lead, as the sponsor | The consultant with the domain knowledge, as the product manager |
| S-002 | Regulated-industry organizations where practitioners specify their own internal software | Head of product or head of transformation, as the sponsor | The practitioner, as the product manager or domain expert |

Neither segment is sized yet. Both count organizations, and Q-004 asks for the
count and its source.

| Competitor | Kind |
| --- | --- |
| ChatPRD | Direct |
| A blank PRD template | Indirect |
| A general-purpose assistant conversation | Indirect |
| A product manager contracted without the domain | Indirect |
| The status quo | Status quo |

Product teams entering a domain they do not know were segment S-003 until 0.8.1.
They already employ the product skill and want the domain, which this product
does not supply, so section 6 now records them as out of scope for REL-001.
The id S-003 is not reused.

## Why we win

Against the cost of contracting a product manager for the engagement, the buyer
gets a PRD written by the person who holds the domain knowledge, with every gap
an engineer could not build from named before anyone estimates. The day rate
the comparison rests on is Q-013.

**Honest weakness.** Against a product manager who already holds the domain, we
have no quality edge, only availability and cost. A skeptical buyer is right to
test that.
