---
id: acme-returns-wireframes
kind: wireframes
schema: prd-forge/wireframes@1
title: Wireframes
status: draft
updated: 2026-10-26
domain: retail returns
section: 7
order: 85
wireframes:
  - id: WF-001
    title: Finding the purchase
    type: screen
    persona: PER-001
    journey_stage: ST-001
    illustrates: [FR-001]
    shows:
      - The three ways to find a purchase
      - The purchase found, with its date and the amount paid
  - id: WF-002
    title: The returns decision
    type: screen
    persona: PER-001
    journey_stage: ST-002
    illustrates: [FR-002, FR-004]
    shows:
      - The decision, the reason for it, and the deadline
      - The refund method to tell the customer
      - The reason the item came back, from the agreed list
  - id: WF-003
    title: An exception request
    type: screen
    persona: PER-002
    journey_stage: ST-003
    illustrates: [FR-003]
    shows:
      - The purchase and the policy that refused it
      - The associate's reason for asking
      - The decision and the reason the customer is told
  - id: WF-004
    title: Items arriving at the hub today
    type: report
    persona: PER-003
    journey_stage: ST-004
    illustrates: [FR-005]
    shows:
      - Each item with the reason recorded at the counter
links:
  parent: { id: acme-returns, kind: prd, path: ./prd.md, title: Acme Returns PRD }
  prev: { id: acme-returns-frs, kind: functional-requirements, path: ./08-functional-requirements.md, title: Functional requirements }
  next: null
---

# Wireframes

Each sketch shows what a person sees and what they can do, with the example's
own content. None of them decides how anything looks or how it is built.

## WF-001 Finding the purchase

Illustration, not a design. Illustrates FR-001. PER-001 sees it at ST-001.

```wireframe
┌─ Return an item ─────────────────────────────────┐
│ Find the purchase by: <1>                        │
│   ( ) Receipt   (•) Order number   ( ) Card      │
│   Order number: [ 4471-0932        ] [ Find ]    │
├──────────────────────────────────────────────────┤
│ Trail running shoe, size 9 <2>                   │
│ Bought 2026-10-04 · Paid $129.00 · Card          │
│ [ This is the purchase ]  [ Not this one ]       │
└──────────────────────────────────────────────────┘
```

![WF-001 drawing](diagrams/WF-001.svg)

## WF-002 The returns decision

Illustration, not a design. Illustrates FR-002 and FR-004. PER-001 sees it at ST-002.

```wireframe
┌─ Return an item ─────────────────────────────────┐
│ May be returned until 2026-11-03 <1>             │
│ Reason: within the 30-day returns window         │
│ Refund: to the original card, $129.00 <2>        │
├──────────────────────────────────────────────────┤
│ Why did it come back? <3>                        │
│ [ Wrong size                              ▾ ]    │
│ [ Complete the return ]                          │
└──────────────────────────────────────────────────┘
```

![WF-002 drawing](diagrams/WF-002.svg)

## WF-003 An exception request

Illustration, not a design. Illustrates FR-003. PER-002 sees it at ST-003.

```wireframe
┌─ Exception request ──────────────────────────────┐
│ Trail running shoe · bought 2026-08-21 · $129.00 │
│ Refused: outside the 30-day window by 12 days <1>│
├──────────────────────────────────────────────────┤
│ Associate: "Customer was abroad; has the <2>     │
│ unworn shoe and the box."                        │
├──────────────────────────────────────────────────┤
│ ( ) Approve   ( ) Decline <3>                    │
│ Reason for the customer: [                   ]   │
│ [ Send to the counter ]                          │
└──────────────────────────────────────────────────┘
```

![WF-003 drawing](diagrams/WF-003.svg)

## WF-004 Items arriving at the hub today

Illustration, not a design. Illustrates FR-005. PER-003 reads it at ST-004.

```wireframe
┌─ Arriving today ─────────────────────────────────┐
│ Item                  From store   Reason <1>    │
│ Trail running shoe    Store 112    Wrong size    │
│ Rain jacket, M        Store 087    Faulty zip    │
│ Water bottle          Store 112    Changed mind  │
└──────────────────────────────────────────────────┘
```

![WF-004 drawing](diagrams/WF-004.svg)
