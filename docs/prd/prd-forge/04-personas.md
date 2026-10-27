---
id: prd-forge-personas
kind: personas
schema: prd-forge/personas@1
title: Users and personas
status: draft
updated: 2026-10-27
domain: product management tooling
section: 4
order: 40
score: 89
blocking: 0
graded: 2026-10-27
personas:
  - id: PER-001
    name: "Product manager (senior: manager to principal), in a consultancy or an in-house product team: the domain expert, or a proxy who speaks for one"
    short_name: DomainExpert
    primary: true
    population: >-
      One per PRD. Per organization, 2 PRDs run at once and 6 start in a year.
    external: false
    problems: [P-001, P-004]
    basis: >-
      Assumed, not researched. Section 1's evidence note says the evidence comes
      from one engagement. The ten observed sittings in D-002 test it.
    context: >-
      Works inside the session they already use, as section 11 records (D-001),
      in bursts weeks apart (NFR-004).
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
      Three working sittings a week of 1 to 2 hours each, for one to three weeks
      per PRD, about 6 to 9 sittings per PRD, then rarely until the next one.
    authority: >-
      Decides what the product must do and what is out of scope; decides the
      domain's own terms; decides when a section's interview is finished and when
      a section may be left at draft; accepts or corrects a drafted section; sets
      a section to final; accepts or refutes a grade; decides the set is ready to
      be offered for approval; and is the only one who may state a domain fact as
      true. May not
      approve the PRD for a release on their own where a sponsor exists.
    proficiency: >-
      Either deep in the domain with no product management training, or a product
      manager who speaks for such an expert. The product assumes the first: no
      familiarity with MoSCoW, Given/When/Then, or the word "persona".
  - id: PER-002
    name: Engineering lead (staff or principal engineer) on the development team, who must build from the PRD
    short_name: EngineerLead
    population: >-
      One or two per PRD, so 2 to 4 at once in an organization running 2 PRDs at
      once.
    external: false
    problems: [P-001, P-002]
    basis: >-
      Assumed, not researched, as section 1's evidence note says. The three
      engineering leads in D-003 test it.
    context: >-
      Reads the set cold at estimation and at each release planning, without
      having been in the interview.
    goals:
      - Estimate without first interviewing the author
      - Know which decisions are mine and which have been made for me
      - Find out now, not in iteration three, what the document does not say
    pains:
      - Specifications that name a technology and so pre-empt my decision badly
      - Requirements I cannot write a test for
      - Gaps between two requirements that both looked complete
    frequency: >-
      Reads each PRD at estimation and at each release planning, so at least 12
      reads a year in an organization that starts 6 PRDs a year.
    authority: >-
      Decides how it is built. Judges whether a set can be built from and reports
      the gaps, under TR-006, and records a verdict that a set is not buildable
      when it is not.
    proficiency: >-
      Expert in delivery, usually knows nothing about the expert's domain.
  - id: PER-003
    name: "Sponsor: the budget holder (director or partner), who is also the approver"
    short_name: Sponsor
    population: >-
      One per PRD, and one organization starts 6 PRDs a year.
    external: false
    problems: [P-003]
    basis: >-
      Assumed, not researched, as section 1's evidence note says. Q-005 tests it
      with three sponsors.
    context: >-
      Reads the root document or an exported copy outside the product, once per
      version (ST-006).
    goals:
      - Be confident enough to commit budget and a date
      - Know what is still undecided, and who is deciding it
    pains:
      - I can only judge whether it reads well
      - I find out it was not buildable after I have committed to the plan
    frequency: >-
      Once per version offered, about 6 versions a year per organization, plus
      any conditions.
    authority: >-
      Approves the PRD for a release; may approve with conditions; may reject.
    proficiency: >-
      Senior in the business, not in product or engineering.
  - id: PER-004
    name: Delivery lead (delivery manager or product owner) on the development team, who runs the story-mapping workshop
    short_name: DeliveryLead
    population: >-
      One per PRD, and one organization starts 6 PRDs a year.
    external: false
    problems: [P-002]
    basis: >-
      Assumed, not researched, as section 1's evidence note says. Q-023 tests it
      with three delivery leads.
    context: >-
      Runs the story-mapping workshop from the approved set (ST-007, ST-008).
    goals:
      - Walk into the workshop with a backbone already agreed
      - Trace every story back to something the expert actually said
    pains:
      - No journey means no backbone, so the workshop invents one in the room
      - Stories that trace to nothing, so nobody can say why they exist
    frequency: >-
      Once per release, about 6 workshops a year per organization, plus
      refinement.
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

| ID | Role | Per PRD | Frequency | Decides |
| --- | --- | --- | --- | --- |
| PER-001 | Senior product manager in a consultancy or an in-house product team: the domain expert, or a proxy who speaks for one | One; 2 PRDs at once and 6 a year per organization | 3 working sittings a week of 1 to 2 hours, for 1 to 3 weeks per PRD | What the product must do, scope, the domain's terms, when an interview ends, drafts, section states, whether to accept or refute a grade, domain facts, and when the set is offered; not the PRD itself where a sponsor exists |
| PER-002 | Engineering lead (staff or principal engineer) on the development team | One or two | At estimation and at each release planning | How it is built, and whether a set can be built from, with its gaps (TR-006) |
| PER-003 | Sponsor: the budget holder (director or partner), who is also the approver | One | Once per version, about 6 a year | Approves the PRD for a release, with or without conditions, or rejects it (TR-001) |
| PER-004 | Delivery lead (delivery manager or product owner) on the development team | One | Once per release, about 6 a year | The backlog's shape and order, and whether a backlog can be mapped at all |

No persona is external. Under a client contract, in segment S-001, the
sponsor, the engineering lead, and the delivery lead all work for the
consultancy. The client's staff only supply domain knowledge to the expert, and
they do not use the product.

## PER-001 is the primary persona

PER-001 is the product manager who writes the PRD: either the domain expert, or a
product manager who speaks for one. The set calls this person the expert,
because they hold the domain knowledge in the interview. Everything is designed
around someone with deep domain knowledge, no product training, and a burst of
intense use followed by months away. Two consequences
run through the rest of this PRD: nothing may assume prior knowledge of product
vocabulary, and the work must survive being put down for a week and picked back
up. See FR-015 and NFR-004.

## Who is deliberately not a persona

No mechanism is a persona. Whatever delivers the teaching, the interview, and
the grading is how the product reaches PER-001, and the set keeps it out of the
requirements: section 6 makes a separate application a non-goal, and section 11
records the session as dependency D-001. What matters to this PRD is that
PER-001 sees a grade they did not produce themselves.
