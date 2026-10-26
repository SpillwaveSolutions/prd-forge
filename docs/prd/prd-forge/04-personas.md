---
id: prd-forge-personas
kind: personas
schema: prd-forge/personas@1
title: Users and personas
status: draft
updated: 2026-10-26
domain: product management tooling
section: 4
order: 40
personas:
  - id: PER-001
    name: Domain expert specifying software for their own field
    short_name: DomainExpert
    primary: true
    goals:
      - Get what is in my head into a form the development team can build from
      - Stop being asked the same question by four different engineers
      - Not be the reason the project is late
    pains:
      - I know what it must do, and I cannot write it the way they need it
      - I am told my requirements are not testable and I do not know what that means
      - I reach for the names of software I have used, because that is the only
        requirements language I have
    frequency: >-
      Intensively for one to three weeks per product, then almost never until the
      next one.
    authority: >-
      Decides what the product must do and what is out of scope; decides the
      domain's own terms; decides when a section's interview is finished and when
      a section may be left at draft; accepts or corrects a drafted section; sets
      a section to final; accepts or refutes a grade; decides the set is ready to
      be offered for approval; and is the only one who may state a domain fact as
      true. May not
      approve the PRD for a release on their own where a sponsor exists.
    proficiency: >-
      Deep in their domain, often decades. No product management training. Assume
      no familiarity with MoSCoW, Given/When/Then, or the word "persona".
  - id: PER-002
    name: Engineering lead who must build from the PRD
    short_name: EngineerLead
    goals:
      - Estimate without first interviewing the author
      - Know which decisions are mine and which have been made for me
      - Find out now, not in iteration three, what the document does not say
    pains:
      - Specifications that name a technology and so pre-empt my decision badly
      - Requirements I cannot write a test for
      - Gaps between two requirements that both looked complete
    frequency: >-
      Reads a given PRD a handful of times, intensively, at estimation and at each
      release planning.
    authority: >-
      Decides how it is built; may reject a PRD as not buildable.
    proficiency: >-
      Expert in delivery, usually knows nothing about the expert's domain.
  - id: PER-003
    name: Sponsor or approver
    short_name: Sponsor
    goals:
      - Be confident enough to commit budget and a date
      - Know what is still undecided, and who is deciding it
    pains:
      - I can only judge whether it reads well
      - I find out it was not buildable after I have committed to the plan
    frequency: Once per version, plus conditions.
    authority: >-
      Approves the PRD for a release; may approve with conditions; may reject.
    proficiency: >-
      Senior in the business, not in product or engineering.
  - id: PER-004
    name: Delivery lead running the story-mapping workshop
    short_name: DeliveryLead
    goals:
      - Walk into the workshop with a backbone already agreed
      - Trace every story back to something the expert actually said
    pains:
      - No journey means no backbone, so the workshop invents one in the room
      - Stories that trace to nothing, so nobody can say why they exist
    frequency: Once per release, plus refinement.
    authority: >-
      Decides the backlog's shape and order, and decides whether a backlog can be
      mapped from a set at all; does not decide scope.
    proficiency: >-
      Expert in agile delivery; depends entirely on the PRD for the domain.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-objectives-metrics, kind: objectives-metrics, path: ./03-objectives-metrics.md, title: Business objectives and success metrics }
  next: { id: prd-forge-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
---

# Users and personas

| ID | Role | Frequency | May approve |
| --- | --- | --- | --- |
| PER-001 | Domain expert specifying their own field | Weeks per product, then rarely | Scope, terms, drafts, section states, facts, and offering the set; not the PRD itself |
| PER-002 | Engineering lead building from it | A handful of intensive reads | May reject as not buildable |
| PER-003 | Sponsor or approver | Once per version | The PRD for a release |
| PER-004 | Delivery lead running story mapping | Once per release | Backlog shape and order |

## PER-001 is the primary persona

Everything is designed around someone with deep domain knowledge, no product
training, and a burst of intense use followed by months away. Two consequences
run through the rest of this PRD: nothing may assume prior knowledge of product
vocabulary, and the work must survive being put down for a week and picked back
up — see FR-015 and NFR-004.

## Who is deliberately not a persona

The assistant that delivers the teaching, the interview and the grading is not a
user of this product. It is how the product reaches PER-001. Listing it here
would put the delivery mechanism into the PRD, which section 9 keeps as a
constraint instead. The same goes for the grading reviewers: a reviewer that
grades a section is a mechanism, and what matters to this PRD is that PER-001
sees a grade they did not produce themselves.
