---
id: acme-returns-personas
kind: personas
schema: prd-forge/personas@1
title: Users and personas
status: draft
updated: 2026-10-23
domain: retail returns
section: 4
order: 40
personas:
  - id: PER-001
    name: Store associate, Acme retail store
    short_name: StoreAssociate
    goals:
      - Resolve the return in front of me without leaving the counter
      - Tell the customer the outcome and the reason, confidently
    pains:
      - Has to call the contact centre and wait, with the customer watching
      - Cannot see what the policy is for this item and this purchase date
    frequency: several times per shift
    authority: may accept a return within policy; may not approve an exception
    proficiency: knows the shop floor; high turnover, so assume no training
  - id: PER-002
    name: Contact-centre agent, returns queue
    short_name: ContactAgent
    goals:
      - Answer the associate's question once and correctly
      - Approve or refuse exceptions with a reason the customer can be told
    pains:
      - Same question asked repeatedly for the same item
      - No record of what was told to whom
    frequency: continuous during opening hours
    authority: may approve an exception up to the stated value limit
    proficiency: expert in policy, trained
  - id: PER-003
    name: Returns-processing clerk, regional hub
    short_name: ReturnsClerk
    goals:
      - Know what is arriving and why it was returned
    pains:
      - Items arrive with no reason recorded, so disposition is guesswork
    frequency: daily
    authority: may set disposition
    proficiency: expert in the hub's process
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  next: { id: acme-returns-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
---

# Users and personas

| ID | Role | Frequency | May approve |
| --- | --- | --- | --- |
| PER-001 | Store associate | Several times per shift | Returns within policy |
| PER-002 | Contact-centre agent | Continuous | Exceptions up to the value limit |
| PER-003 | Returns-processing clerk | Daily | Disposition |
