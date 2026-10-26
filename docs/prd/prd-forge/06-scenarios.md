---
id: prd-forge-scenarios
kind: scenarios
schema: prd-forge/scenarios@1
title: Scenarios
status: draft
updated: 2026-10-26
domain: product management tooling
section: 5
order: 60
scenarios:
  - id: SC-001
    journey: J-001
    stage: ST-002
    stages: [ST-002, ST-003, ST-004]
    persona: PER-001
    variant: happy
    shown_in: screen
    lifecycles: [LC-001]
    wireframes: [WF-008]
    context: >-
      A freight operations manager is on section 5 of their first PRD. Sections 1
      and 4 are drafted and graded. They have 40 minutes before a meeting.
    trigger: They say they are ready to do the journeys section.
    course:
      - They read eight lines on what a user journey is, why requirements written
        one at a time miss the steps between them, and what a stage must name
      - They are asked to pick one person and one thing that person is trying to
        finish
      - They say "a dispatcher getting a late load recovered"
      - They are asked for the big steps, names only, and give five
      - They are asked, per stage, who acts, what they see and what they decide
      - They see a drafted journey with five stages, and a grade of 78 with no
        blocking defects
      - They are asked one question - what the dispatcher decides at stage three -
        and answer it
      - They see the journey re-graded at 88
    expected_outcome: >-
      The journeys section is at status draft with a score of 88 and no blocking
      defects, one journey is marked as the golden thread, and every stage names
      an actor and a decision.
  - id: SC-002
    journey: J-001
    stage: ST-004
    persona: PER-001
    variant: alternate
    shown_in: screen
    lifecycles: [LC-001]
    wireframes: [WF-010]
    context: >-
      The same manager stopped mid-way through section 7 eight days ago. They
      remember almost nothing about where they were.
    trigger: They come back and say they want to carry on.
    course:
      - They see which sections are done, which are drafted, and which have not
        been started, with each grade
      - They see that section 7 is at draft with two blocking defects, both named
      - They are not asked any question they have already answered
      - They are asked the next question in section 7, in the vocabulary they
        established in ST-001
    expected_outcome: >-
      Work resumes at the first section that is not yet at review, no earlier
      answer is requested again, and the domain vocabulary is unchanged.
  - id: SC-003
    journey: J-001
    stage: ST-002
    persona: PER-001
    variant: exception
    shown_in: conversation
    context: >-
      A claims manager is answering questions about section 7. They have strong
      views about how it should be built.
    trigger: >-
      They say "it should push the decision to the adjuster's phone".
    course:
      - They are asked what the adjuster gets from that
      - They say the adjuster is in the field and cannot wait until they are back
        at a desk
      - They see a requirement recorded as the adjuster being able to act on the
        claim away from their desk, with criteria about what they can do and see
      - They see that "push to the phone" was kept on a list of candidate
        architecture decisions, to hand to the engineering lead
      - No argument is had about whether a notification is the right design
    expected_outcome: >-
      The requirement names no technology, the user need is recorded, the expert's
      preference is preserved for the architecture discussion, and the expert does
      not feel overruled.
  - id: SC-004
    journey: J-001
    stage: ST-003
    persona: PER-001
    variant: exception
    shown_in: conversation
    context: >-
      The grading reviewer has reported that a requirement names a component. The
      expert reads the finding and believes it is wrong.
    trigger: They say the finding is wrong - the word is their domain's own term.
    course:
      - The finding is checked against the document rather than defended
      - Where the word is indeed a domain term and not a component, the finding is
        dropped and the expert is told it was dropped
      - Where it is genuinely a component, the reason is stated once, and if the
        expert still disagrees their decision is recorded with the dissent noted
      - The grade reflects what the document says after that decision, not what the
        reviewer first claimed
    expected_outcome: >-
      A finding the expert refutes does not survive into the report, the expert is
      told so plainly, and a disagreement the expert insists on is recorded rather
      than re-argued at the next grading pass.
  - id: SC-005
    journey: J-001
    stage: ST-005
    persona: PER-001
    variant: exception
    shown_in: report
    wireframes: [WF-009]
    context: >-
      Every section is at `review`. The expert asks whether a team could build the
      set. Two release-line stages have no `must` requirement.
    trigger: They ask for the buildability review.
    course:
      - They see a verdict of buildable with gaps
      - They see the two stages that have no requirement behind them, named
      - They see three requirements an engineer could not write a test for, each
        quoted
      - They see what the reviewer would ask for first, in order
      - They fix two of them and record the third as an open question with a
        decider and a date
    expected_outcome: >-
      The expert knows exactly what a builder cannot build before anyone has
      estimated, and every gap is either closed or owned by a named decider with a
      date.
  - id: SC-006
    journey: J-001
    stage: ST-002
    persona: PER-001
    variant: exception
    shown_in: conversation
    context: >-
      The expert is on section 3 and does not know the current value of the metric
      they have just named.
    trigger: They are asked for the baseline and say they would have to check.
    course:
      - They are not offered a plausible-looking number
      - They are asked who could find out, and by when
      - They see an open question recorded with that person and that date, and the
        objective linked to it
      - They see that the target is marked as an intention until the baseline
        arrives
    expected_outcome: >-
      No baseline is invented, the objective carries an explicit unknown, and
      section 12 holds a question with a named decider and a date.
lifecycles:
  - id: LC-001
    subject: a section of the PRD
    states:
      - name: pending
        meaning: Listed in the set and not yet interviewed.
      - name: draft
        meaning: Interviewed and written, and graded or waiting for a grade.
      - name: review
        meaning: Ready for someone other than the expert to read.
      - name: final
        meaning: Approved, with the approval recorded in section 15.
    initial: pending
    final: [final]
    transitions:
      - from: pending
        to: draft
        when: The expert finishes the section's interview and it is written
        by: PER-001
      - from: draft
        to: review
        when: The expert accepts the offer of review
        rule: >-
          A grade of 70 or more, zero blocking defects, and a set that checks
          clean, unless the expert overrides the gate and the override is
          recorded in section 15
        by: PER-001
      - from: review
        to: final
        when: The expert sets the section to final
        rule: >-
          An independent grading pass with zero blocking defects, and an
          approval recorded in section 15, unless the expert overrides the gate
          and the override is recorded in section 15
        by: PER-001
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-journeys, kind: journeys, path: ./05-user-journeys.md, title: User journeys }
  next: { id: prd-forge-scope, kind: scope, path: ./07-scope.md, title: Scope }
---

# Scenarios

![SC-001 scenario](diagrams/SC-001.svg)

![LC-001 lifecycle of a section of the PRD](diagrams/LC-001.svg)

![WF-008 drawing](diagrams/WF-008.svg)

![SC-002 scenario](diagrams/SC-002.svg)

![WF-010 drawing](diagrams/WF-010.svg)

![SC-003 scenario](diagrams/SC-003.svg)

![SC-004 scenario](diagrams/SC-004.svg)

![SC-005 scenario](diagrams/SC-005.svg)

![WF-009 drawing](diagrams/WF-009.svg)

![SC-006 scenario](diagrams/SC-006.svg)

| ID | Stage | Variant | What it covers |
| --- | --- | --- | --- |
| SC-001 | ST-002 | happy | A section taught, interviewed, drafted, graded, improved |
| SC-002 | ST-004 | alternate | Resuming after eight days away |
| SC-003 | ST-002 | exception | The expert states a technology |
| SC-004 | ST-003 | exception | The expert refutes a grading finding |
| SC-005 | ST-005 | exception | Buildability review finds holes |
| SC-006 | ST-002 | exception | The expert has no baseline for a metric |

SC-001 is the end-to-end acceptance test for release 1. SC-005 is the expert's
own run of the buildability review, which is why its persona is PER-001 and not
the engineering lead: no engineering lead is in release 1 at all, per OUT-004.

The four exceptions are the ones that decide whether this product is trustworthy.
SC-003 and SC-006 are where a specification quietly acquires a technology choice
or an invented fact. SC-004 is where the grading either earns the expert's trust
or loses it: a reviewer that cannot be refuted is a reviewer nobody believes.
SC-005 is the moment the product is supposed to pay for itself.
