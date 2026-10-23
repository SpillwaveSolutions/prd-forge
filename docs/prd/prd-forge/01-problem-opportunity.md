---
id: prd-forge-problem-opportunity
kind: problem-opportunity
schema: prd-forge/problem-opportunity@1
title: Problem and opportunity
status: draft
updated: 2026-10-23
domain: product management tooling
section: 1
order: 10
problems:
  - id: P-001
    statement: >-
      A domain expert can describe what their product must do out loud, but what
      they write down is a feature list: no named user, no outcome anyone could
      check, and a technology already chosen for reasons they cannot defend.
    who: Domain expert specifying software for their own field
    evidence:
      - >-
        Specifications arriving at delivery teams are commonly feature lists;
        teams report re-deriving the user and the acceptance criteria themselves
        before they can estimate. Quantify this from your own intake before you
        rely on it.
      - >-
        Experts asked to write requirements reach for the words of the software
        they have used, because that is the only requirements language they have
        been exposed to.
    why_now: >-
      Specifications are now commonly drafted with an assistant, which makes them
      fluent. Fluent and unbuildable is a worse failure than rough and
      unbuildable, because nobody queries it.
    cost_of_inaction: >-
      The gap is closed by an engineer guessing, during build, at what the expert
      meant, and the guess is discovered at review or in production.
  - id: P-002
    statement: >-
      Requirements are written one at a time, so the steps between them are never
      written at all, and nobody notices until the team tries to assemble a
      working path through the product.
    who: Engineering lead building from the specification
    evidence:
      - >-
        A specification with no user journey gives a story-mapping workshop no
        backbone, so features and epics cannot be derived from it at all.
      - >-
        Gaps surface as mid-iteration questions about what happens between two
        requirements that both looked complete.
    why_now: >-
      Teams are committing to outcomes per release, which needs a complete path
      through the product, not a complete list of features.
    cost_of_inaction: >-
      The release line is drawn across a feature list rather than a journey, so a
      release ships features and no user can complete anything with them.
  - id: P-003
    statement: >-
      Nobody can tell a buildable specification from a readable one until the team
      has already started building from it.
    who: Sponsor or approver signing the specification off
    evidence:
      - >-
        Approval is given on readability and completeness of headings, because
        those are the only properties an approver can assess unaided.
      - >-
        The first real assessment of buildability happens when an engineer
        estimates, which is after approval and after the plan was made.
    why_now: >-
      Where the document was drafted with an assistant, readability is no longer
      any evidence at all of buildability.
    cost_of_inaction: >-
      Plans and commitments are made on an approved document whose defects are
      found by the people asked to deliver against them.
  - id: P-004
    statement: >-
      An expert has nowhere to learn what a section of a PRD is for at the moment
      they are being asked to fill it in.
    who: Domain expert specifying software for their own field
    evidence:
      - >-
        Templates name the sections and not their purpose, so a heading like
        "non-functional requirements" is filled with adjectives.
      - >-
        The craft exists in books and in experienced product managers, neither of
        which is available at the moment the expert is typing.
    why_now: >-
      Organisations are asking domain experts to specify directly, without routing
      the work through a product manager first.
    cost_of_inaction: >-
      Each expert reinvents the form badly, and the organisation's specifications
      cannot be compared to one another or improved as a body of work.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  next: { id: prd-forge-customer-market, kind: customer-market, path: ./02-customer-market.md, title: Target customer and market }
---

# Problem and opportunity

| ID | Problem | Who |
| --- | --- | --- |
| P-001 | What the expert writes is a feature list with no user and no testable outcome | Domain expert |
| P-002 | The steps between requirements are never written, so paths have gaps | Engineering lead |
| P-003 | Buildability is invisible until the team starts building | Sponsor or approver |
| P-004 | No source of PRD craft at the moment the expert needs it | Domain expert |

The four compound. P-004 means the expert does not know what good looks like;
P-001 is what they produce as a result; P-002 is the specific gap that costs the
most; and P-003 is why none of it is caught before it is expensive.

**Evidence note.** The evidence above describes a pattern, not a measurement. No
figure here is sourced, and three of the objectives in section 3 have no baseline
for the same reason — see Q-001, Q-002 and Q-003. Measure your own intake before
relying on any of it.
