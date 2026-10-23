---
id: acme-returns-frs
kind: functional-requirements
schema: prd-forge/functional-requirements@1
title: Functional requirements
status: draft
updated: 2026-10-23
domain: retail returns
section: 7
order: 80
requirements:
  - id: FR-001
    user: PER-001
    capability: Identify the purchase from a receipt, an order number, or the payment card
    outcome: >-
      The associate sees the purchase, its date and what was paid, and can confirm
      with the customer that it is the right one before going further.
    acceptance:
      - >-
        Given a purchase made in an Acme store in the last 12 months, when the
        associate enters the order number, then they see the item, the purchase
        date and the amount paid.
      - >-
        Given a customer with no receipt and no order number, when the associate
        uses the payment card, then they see every purchase on that card in the
        last 12 months, most recent first.
      - >-
        Given a purchase that cannot be found, when the associate has tried all
        three routes, then they see that it was not found and what to do next.
    priority: must
    journey_stage: ST-001
  - id: FR-002
    user: PER-001
    capability: See whether the item may be returned, on what terms, and why
    outcome: >-
      The associate sees a decision, the reason for it, and the refund method, and
      can state all three to the customer without calling anyone.
    acceptance:
      - >-
        Given an item bought 20 days ago under a 30-day policy, when the associate
        views the decision, then they see "may be returned", the deadline date and
        the refund method.
      - >-
        Given an item outside its returns window, when the associate views the
        decision, then they see "may not be returned", the specific reason, and
        the option to request an exception.
      - >-
        Given an item whose policy depends on its condition, when the associate
        records the condition, then the decision and the reason update to match.
    priority: must
    journey_stage: ST-002
  - id: FR-003
    user: PER-002
    capability: Decide an exception request, recording the reason
    outcome: >-
      The agent sees the purchase, the associate's reason for escalating, and the
      value at stake, and their decision reaches the associate with a reason the
      customer can be told.
    acceptance:
      - >-
        Given an exception request, when the agent opens it, then they see the
        purchase, the policy that refused it, the associate's reason, and the
        refund value.
      - >-
        Given an open exception request, when the agent approves it with a reason,
        then the associate sees the approval and the reason at the counter.
      - >-
        Given a request above the agent's value limit, when the agent opens it,
        then they see that it is above their limit and who may decide it.
    priority: must
    journey_stage: ST-003
  - id: FR-004
    user: PER-001
    capability: Complete the return, recording why the item came back
    outcome: >-
      The return is completed with its reason, the customer is told what happens
      next, and the hub clerk can read the reason when the item arrives.
    acceptance:
      - >-
        Given an accepted return, when the associate selects a reason from the
        agreed list and confirms, then the return is recorded with that reason and
        the refund method.
      - >-
        Given a completed return, when the hub clerk views the incoming item, then
        they see the reason the associate recorded.
      - >-
        Given an associate who selects no reason, when they try to confirm, then
        they cannot complete the return until a reason is selected.
    priority: must
    journey_stage: ST-004
  - id: FR-005
    user: PER-003
    capability: See the reasons recorded against items arriving at the hub
    outcome: The clerk can set disposition without guessing why an item came back.
    acceptance:
      - >-
        Given items arriving today, when the clerk opens the incoming list, then
        each item shows the reason recorded at the counter.
    priority: should
    journey_stage: ST-004
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns-scope, kind: scope, path: ./07-scope.md, title: Scope }
  next: null
  related:
    - { id: acme-returns-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
---

# Functional requirements

| ID | User | Capability | Priority | Stage |
| --- | --- | --- | --- | --- |
| FR-001 | PER-001 | Identify the purchase | must | ST-001 |
| FR-002 | PER-001 | See the decision, terms and reason | must | ST-002 |
| FR-003 | PER-002 | Decide an exception | must | ST-003 |
| FR-004 | PER-001 | Complete the return with a reason | must | ST-004 |
| FR-005 | PER-003 | See reasons at the hub | should | ST-004 |

Note what is absent from every entry: no point-of-sale system, no database, no
screen, no service. Those are decisions for the architecture, not the PRD.
