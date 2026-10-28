---
id: prd-forge-problem-opportunity
kind: problem-opportunity
schema: prd-forge/problem-opportunity@1
title: Problem and opportunity
status: draft
updated: 2026-10-27
domain: product management tooling
section: 1
order: 10
score: 83
blocking: 0
graded: 2026-10-27
problems:
  - id: P-001
    statement: >-
      A domain expert can describe what their product must do out loud, but what
      they write down is a feature list: no named user, no outcome anyone could
      check, and a technology already chosen for reasons they cannot defend.
    who: Product manager who is, or speaks for, the domain expert
    persona: PER-001
    evidence:
      - claim: >-
          In this PRD at version 0.1.0, the grading pass found 2 of 14
          functional requirements, FR-003 and FR-004, with no outcome a person
          could see. Both were fixed at version 0.2.0.
        source: >-
          prd-forge repository, commits 5ba59cb (version 0.1.0) and 5d4d936
          (version 0.2.0)
        as_of: 2026-10-26
      - >-
        A team that receives a feature list re-derives the user and the
        acceptance criteria itself before it can estimate.
      - >-
        Experts asked to write requirements reach for the words of the software
        they have used, because that is the only requirements language they have
        been exposed to.
    why_now: >-
      In October 2025, 98% of 117 product managers surveyed said they use AI at
      work (General Assembly, "AI is everywhere in product management, but skills gaps and 'shadow AI' are holding teams back", 6 Nov 2025), which means drafts written with AI help arrive fluent. Fluent and
      unbuildable is a worse failure than rough and unbuildable, because nobody
      queries it.
    cost_of_inaction: >-
      The gap is closed by an engineer guessing, during build, at what the expert
      meant, and the guess is discovered at review or in production. Q-018 asks
      for one counted cost.
    status_quo: >-
      The expert writes a feature list from a template, and an engineer
      re-derives the user and the criteria before estimating.
    desired_outcome: >-
      Every requirement names a user and an outcome that someone else can check.
  - id: P-002
    statement: >-
      Requirements are written one at a time, so the steps between them are never
      written at all, and nobody notices until the team tries to assemble a
      working path through the product.
    who: Engineering lead building from the PRD
    persona: PER-002
    evidence:
      - claim: >-
          At version 0.1.0, the buildability review of this PRD failed 4 of 11
          derivability checks and named 4 gates an engineer would have to invent.
        source: >-
          prd-forge repository, the commit messages of 5ba59cb (version 0.1.0)
          and 5d4d936 (version 0.2.0)
        as_of: 2026-10-26
      - >-
        A specification with no user journey gives a story-mapping workshop no
        backbone, so features and epics cannot be derived from it at all.
      - >-
        Gaps surface as mid-iteration questions about what happens between two
        requirements that both looked complete.
    why_now: >-
      In the same survey, 44% of product managers use AI for backlog grooming and
      QA support (General Assembly, "AI is everywhere in product management, but skills gaps and 'shadow AI' are holding teams back", 6 Nov 2025), which means more backlog items are written with AI
      help, and each one needs the path through the product that it serves.
    cost_of_inaction: >-
      The release line is drawn across a feature list rather than a journey, and a
      release ships features that no user can complete anything with. Q-018 asks
      for one counted cost.
    status_quo: >-
      Gaps between requirements surface as questions in the middle of an
      iteration.
    desired_outcome: >-
      Every step a user must take to reach the goal is written down, and every
      gap is closed or owned before build.
  - id: P-003
    statement: >-
      Nobody can tell a buildable specification from a readable one until the team
      has already started building from it.
    who: Sponsor approving the PRD
    persona: PER-003
    evidence:
      - claim: >-
          At version 0.8.0, this PRD passed every schema and cross-reference
          check with 0 errors and 0 warnings. The grading pass found 23
          blocking defects in 8 of 18 documents.
        source: prd-forge repository, commit 6f77bc0 (version 0.8.0)
        as_of: 2026-10-27
      - >-
        Approval is given on readability and completeness of headings, because
        those are the only properties an approver can assess unaided.
      - >-
        The first real assessment of buildability happens when an engineer
        estimates, which is after approval and after the plan was made.
    why_now: >-
      In the same survey, only 39% of product managers had received
      comprehensive, job-specific AI training (General Assembly, "AI is everywhere in product management, but skills gaps and 'shadow AI' are holding teams back", 6 Nov 2025), which means 61% of product
      managers judge AI drafts without that training, and a fluent draft is no
      evidence that it can be built.
    cost_of_inaction: >-
      Plans and commitments are made on an approved document whose defects are
      found by the people asked to deliver against them. Q-018 asks for one
      counted cost.
    status_quo: >-
      The sponsor approves on readability, and buildability is first assessed
      when an engineer estimates.
    desired_outcome: >-
      The sponsor knows, before deciding, which parts of the PRD a team could not
      build from and what is still undecided.
  - id: P-004
    statement: >-
      An expert filling in a section of a PRD does not know what the section is
      for, so they fill it with what they have seen elsewhere: adjectives,
      feature names, and headings copied from a template.
    who: Product manager who is, or speaks for, the domain expert
    persona: PER-001
    evidence:
      - claim: >-
          Of 20 sections in two public PRD templates, all 20 say what to write,
          and 0 say what makes an entry good or how a reader checks it. The Aha!
          Agile PRD template has 6 sections, and the Product School PRD template
          has 14.
        source: >-
          Aha! Agile PRD template,
          https://www.aha.io/roadmapping/guide/requirements-management/what-is-a-good-product-requirements-document-template,
          and Product School PRD template,
          https://productschool.com/blog/product-strategy/product-template-requirements-document-prd
        as_of: 2026-10-26
      - >-
        The craft exists in books and in experienced product managers, and
        neither is at hand at the moment the expert is typing.
    why_now: >-
      In the same survey, 47% of product managers want to prototype and validate
      products without engineering, and 38% can (General Assembly, "AI is everywhere in product management, but skills gaps and 'shadow AI' are holding teams back", 6 Nov 2025), which means more of
      the specifying falls on the person with the domain knowledge, with no
      specialist between them and the page.
    cost_of_inaction: >-
      Each expert reinvents the form badly, and the organization's PRDs cannot be
      compared to one another or improved as a body of work. Q-018 asks for one
      counted cost.
    status_quo: >-
      The expert fills a template whose headings say what to write but not what
      makes an entry good.
    desired_outcome: >-
      The expert knows what each section is for when they write it.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  next: { id: prd-forge-customer-market, kind: customer-market, path: ./02-customer-market.md, title: Target customer and market }
---

# Problem and opportunity

| ID | Problem | Who |
| --- | --- | --- |
| P-001 | What the expert writes is a feature list with no user and no testable outcome | Product manager or domain expert |
| P-002 | The steps between requirements are never written, so paths have gaps | Engineering lead |
| P-003 | Buildability is invisible until the team starts building | Sponsor |
| P-004 | The expert does not know what a section is for, so they fill it badly | Product manager or domain expert |

The four compound. P-004 means the expert does not know what good looks like;
P-001 is what they produce as a result; P-002 is the specific gap a build trips
over; and P-003 is why none of it is caught before it is expensive. P-002 is the
engineering lead's problem, and the delivery lead, PER-004, meets it too, at the
story-mapping workshop.

**Evidence note.** Each problem now has one counted case, with its source and
date. The counts for P-001 to P-003 come from one engagement, this product's own
PRD, written and graded with prd-forge. The count for P-004 comes from two
public templates. One engagement shows that each problem occurs. It does not
show how often. The other evidence items describe a pattern and are not
measured. Each why-now claim cites the General Assembly survey of 117 product
managers, run in October 2025. No cost has a number yet, and Q-018 asks for
one per problem. All three objectives in section 3 still have no baseline. See
Q-001, Q-002, and Q-003.
