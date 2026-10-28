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
score: 75
blocking: 0
graded: 2026-10-27
segments:
  - id: S-001
    name: Consultancies and advisory firms turning client domain knowledge into PRDs
    buyer: Partner or director of the consultancy, the budget holder, as the sponsor
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
      - We may trust a machine's grade less than our own partner review (Q-005).
      - We must approve client knowledge going into the assistant session our consultants already use before anyone works that way (A-004).
  - id: S-002
    name: Regulated-industry organizations where practitioners specify their own internal software
    buyer: Director of product or transformation, the budget holder, as the sponsor
    buyer_persona: PER-003
    user: The practitioner, as the product manager or domain expert
    user_personas:
      - PER-001
    size: >-
      Not yet measured; see Q-004.
    size_unit: organizations
    willingness_to_pay: >-
      Compared against contracting a product manager for the project. The day
      rate is Q-013.
    adoption_barriers:
      - We may trust a machine's grade less than our own review (Q-005).
      - Our engineering leads may send back a PRD that names no technology (A-003).
      - We cannot circulate a PRD that cites a regulation our own expert did not supply (FR-006).
competitors:
  - name: ChatPRD, an AI tool that drafts PRDs from a chat
    kind: direct
    offer: >-
      A structured PRD drafted fast from little input, from a chat. Source:
      ChatPRD docs, https://www.chatprd.ai/docs/writing-your-first-prd, accessed
      2026-10-27.
    our_edge: >-
      Before the budget is committed, the sponsor sees in one document each
      section's grade and every blocking defect, with the section it is in
      (FR-013). The sponsor can open any set written with this product and look
      for the same list in a ChatPRD draft.
  - name: A blank PRD template in the team's document tool
    kind: indirect
    offer: >-
      The section headings, immediately, free, in a tool everyone already has.
    our_edge: >-
      When the PRD is done, each fact the expert could not supply is listed with
      a named person and a date to settle it, and the PRD states no figure or
      citation that nobody can stand behind.
  - name: A general-purpose assistant conversation with no structure
    kind: indirect
    offer: >-
      Fluent prose on any section, instantly, with no setup at all.
    our_edge: >-
      Before buying, the buyer can open any set written with this product, such
      as this one, and see which sections are not ready, with the quoted reason
      for each. A general-purpose conversation
      shows no such list. Writing that reads well is the failure P-003 names.
  - name: Contracting a product manager without the domain for the project
    kind: indirect
    offer: >-
      Genuine product judgement, and someone accountable for the outcome.
    our_edge: >-
      The buyer gets a PRD whose domain facts come from the person who holds
      them, rather than facts filled in by someone without the domain. Any cost
      advantage is unproven until Q-013 gives the day rate. The buyer can check
      the PRD for each fact the expert could not supply: each one has a named
      decider and a date.
  - name: Contracting a product manager who already holds the domain
    kind: indirect
    offer: >-
      Product judgement and the domain in one person, accountable for the
      outcome.
    our_edge: >-
      No quality edge. The buyer gets availability only: the work starts when
      their own domain expert can start, with no search for a person who holds
      both. Any cost advantage is unproven until Q-013 gives the day rate.
  - name: "The status quo: a smart practitioner, a document, and a willing engineer"
    kind: status-quo
    offer: >-
      No tool, no cost, no adoption, and it does sometimes work.
    our_edge: >-
      At handover, an engineer who was not in the room gets each fact the PRD
      does not yet know, with a named person and a date to settle it, so they
      can estimate without first interviewing the author.
why_we_win: >-
  S-001, the consultancy partner: "Before we hand the PRD to the client's
  engineers, I can see which parts they could not build from, and my senior
  people bill fewer hours fixing it later." S-002, the director: "Before I
  approve the budget, I can see which parts of the PRD my team could not build
  from." The expert confirmed both as the sponsors' words on 2026-10-27.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-problem-opportunity, kind: problem-opportunity, path: ./01-problem-opportunity.md, title: Problem and opportunity }
  next: { id: prd-forge-objectives-metrics, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics }
---

# Target customer and market

| ID | Segment | Buyer | User |
| --- | --- | --- | --- |
| S-001 | Consultancies and advisory firms turning client domain knowledge into PRDs | Partner or director of the consultancy, the budget holder, as the sponsor | The consultant with the domain knowledge, as the product manager |
| S-002 | Regulated-industry organizations where practitioners specify their own internal software | Director of product or transformation, the budget holder, as the sponsor | The practitioner, as the product manager or domain expert |

Neither segment is sized yet. Both count organizations, and Q-004 asks for the
count and its source.

| Competitor | Kind |
| --- | --- |
| ChatPRD | Direct |
| A blank PRD template | Indirect |
| A general-purpose assistant conversation | Indirect |
| A product manager contracted without the domain | Indirect |
| A product manager who already holds the domain | Indirect |
| The status quo | Status quo |

Product teams entering a domain they do not know are a non-goal in section 6.
They already employ the product skill and want the domain, which this product
does not supply.

## Why we win

The expert confirmed each sponsor's words on 2026-10-27.

- **S-001, the consultancy partner:** "Before we hand the PRD to the client's
  engineers, I can see which parts they could not build from, and my senior
  people bill fewer hours fixing it later." The partner weighs it against the
  consultant's billable hours.
- **S-002, the director:** "Before I approve the budget, I can see which parts
  of the PRD my team could not build from." The director weighs it against
  contracting a product manager without the domain, whose day rate is Q-013.

In S-002 the organization works under regulation, so its PRDs may cite
regulations. The set states no regulation the expert did not supply (FR-006,
TR-005), which is what lets such a PRD be circulated.

**Honest weakness.** Against a product manager who already holds the domain, we
have no quality edge, only availability. Any cost edge is unproven until Q-013.
A skeptical buyer is right to test that.

<!-- prd-forge:details -->

## Details

Generated from the front matter. Do not edit this block.

**Why we win:** S-001, the consultancy partner: "Before we hand the PRD to the client's engineers, I can see which parts they could not build from, and my senior people bill fewer hours fixing it later." S-002, the director: "Before I approve the budget, I can see which parts of the PRD my team could not build from." The expert confirmed both as the sponsors' words on 2026-10-27.

### Segments

#### S-001 Consultancies and advisory firms turning client domain knowledge into PRDs

**Buyer:** Partner or director of the consultancy, the budget holder, as the sponsor

**Buyer persona:** PER-003

**User:** The consultant with the domain knowledge, as the product manager

**User personas:** PER-001

**Size:** Not yet measured; see Q-004.

**Size unit:** organizations

**Willingness to pay:** Already pays for the consultant's time; the comparison is billable hours saved, not a software budget.

**Adoption barriers:**

- We may trust a machine's grade less than our own partner review (Q-005).
- We must approve client knowledge going into the assistant session our consultants already use before anyone works that way (A-004).

#### S-002 Regulated-industry organizations where practitioners specify their own internal software

**Buyer:** Director of product or transformation, the budget holder, as the sponsor

**Buyer persona:** PER-003

**User:** The practitioner, as the product manager or domain expert

**User personas:** PER-001

**Size:** Not yet measured; see Q-004.

**Size unit:** organizations

**Willingness to pay:** Compared against contracting a product manager for the project. The day rate is Q-013.

**Adoption barriers:**

- We may trust a machine's grade less than our own review (Q-005).
- Our engineering leads may send back a PRD that names no technology (A-003).
- We cannot circulate a PRD that cites a regulation our own expert did not supply (FR-006).

### Competitors

#### ChatPRD, an AI tool that drafts PRDs from a chat

**Kind:** direct

**Offer:** A structured PRD drafted fast from little input, from a chat. Source: ChatPRD docs, https://www.chatprd.ai/docs/writing-your-first-prd, accessed 2026-10-27.

**Our edge:** Before the budget is committed, the sponsor sees in one document each section's grade and every blocking defect, with the section it is in (FR-013). The sponsor can open any set written with this product and look for the same list in a ChatPRD draft.

#### A blank PRD template in the team's document tool

**Kind:** indirect

**Offer:** The section headings, immediately, free, in a tool everyone already has.

**Our edge:** When the PRD is done, each fact the expert could not supply is listed with a named person and a date to settle it, and the PRD states no figure or citation that nobody can stand behind.

#### A general-purpose assistant conversation with no structure

**Kind:** indirect

**Offer:** Fluent prose on any section, instantly, with no setup at all.

**Our edge:** Before buying, the buyer can open any set written with this product, such as this one, and see which sections are not ready, with the quoted reason for each. A general-purpose conversation shows no such list. Writing that reads well is the failure P-003 names.

#### Contracting a product manager without the domain for the project

**Kind:** indirect

**Offer:** Genuine product judgement, and someone accountable for the outcome.

**Our edge:** The buyer gets a PRD whose domain facts come from the person who holds them, rather than facts filled in by someone without the domain. Any cost advantage is unproven until Q-013 gives the day rate. The buyer can check the PRD for each fact the expert could not supply: each one has a named decider and a date.

#### Contracting a product manager who already holds the domain

**Kind:** indirect

**Offer:** Product judgement and the domain in one person, accountable for the outcome.

**Our edge:** No quality edge. The buyer gets availability only: the work starts when their own domain expert can start, with no search for a person who holds both. Any cost advantage is unproven until Q-013 gives the day rate.

#### The status quo: a smart practitioner, a document, and a willing engineer

**Kind:** status-quo

**Offer:** No tool, no cost, no adoption, and it does sometimes work.

**Our edge:** At handover, an engineer who was not in the room gets each fact the PRD does not yet know, with a named person and a date to settle it, so they can estimate without first interviewing the author.

<!-- /prd-forge:details -->
