---
id: prd-forge-journeys
kind: journeys
schema: prd-forge/journeys@1
title: User journeys
status: draft
updated: 2026-10-27
domain: product management tooling
section: 5
order: 50
score: 88
blocking: 1
graded: 2026-10-27
journeys:
  - id: J-001
    persona: PER-001
    goal: >-
      An approved PRD whose buildability gaps have been found and either closed or
      given a decider and a date, before anyone estimates it.
    trigger: >-
      The expert has been asked to specify a product, or has an idea they want
      built, and has nothing written down.
    golden_thread: true
    objectives: [O-001, O-002, O-003]
    stages:
      - id: ST-001
        name: Expert states the idea and their domain
        actor: Domain expert
        satisfaction: 3
        acceptance:
          - >-
            Given an expert with an idea and nothing written down, when they
            state the idea, the domain, and three words an outsider would
            misread, then they see a document set with every section listed and
            marked as not yet started.
        steps:
          - Says what they want built, in their own words, however roughly
          - Is asked what the business domain is and what the unit of work is
            called - an engagement, a load, a claim, a case
          - Names three words their team uses that an outsider would misread
          - Sees that a set of documents now exists, every section listed and
            marked as not yet started
        inputs:
          - The idea, the domain, and the vocabulary
        outputs:
          - A document set with every section visible and honestly marked empty
        decision: What this product is, and what the domain's own words are
      - id: ST-002
        name: Expert is taught a section, then interviewed on it
        actor: Domain expert
        satisfaction: 2
        acceptance:
          - >-
            Given a section not yet interviewed, when the expert reads what it
            is for and answers its questions one or two at a time, then the
            interview ends when the question list is finished, when they are
            told the section already meets the gate, or when they say they have
            nothing more to add, and they see the section drafted.
        steps:
          - Reads what the section is, why it matters, and what belongs in it, in
            under ten lines, with an example from their own domain
          - Is asked one or two questions at a time, in their own vocabulary
          - Is asked follow-ups where an answer was thin
          - Says when they have nothing more to add
        inputs:
          - Their knowledge of the domain, in answer to each question
        outputs:
          - The answers the section is drafted from
        decision: Whether the questions have reached the end of what they know
      - id: ST-003
        name: Expert reads the draft and its grade
        actor: Domain expert
        satisfaction: 2
        acceptance:
          - >-
            Given a drafted and graded section, when the expert opens it, then
            they read it as prose and see its score, each blocking defect, and
            its weakest part.
        steps:
          - Reads the drafted section as prose, not as a form
          - Sees a score, how many blocking defects there are, and what each one is
          - Sees which part of the section is weakest, and why
          - Decides whether the grade is fair
        inputs:
          - The drafted section and its grade
        outputs:
          - A judgement on whether the draft says what they meant
        decision: Accept the draft, correct it, or refute the grade
      - id: ST-004
        name: Expert answers the one question that improves it most
        actor: Domain expert
        satisfaction: 2
        acceptance:
          - >-
            Given one question about the weakest part of a section, when the
            expert answers it, then they see the section re-graded against the
            same rubric.
          - >-
            Given one question whose premise the expert says is wrong, when they
            say why, then the finding behind the question is checked against the
            document as a refutation under FR-016, and they see whether it was
            dropped.
          - >-
            Given an expert returning after a break, when they say they want to
            carry on, then they resume at the first section not yet at review,
            and no question they already answered is put to them again.
        steps:
          - Reads a single question, not a list of twelve
          - Answers it, or says why the premise is wrong
          - Sees the section re-graded against the same rubric
          - Moves to the next section, or goes back to an earlier one when this
            section showed it was incomplete
          - Stops when they need to, and later resumes at the first section not
            yet at review
        inputs:
          - One answer
        outputs:
          - A section at a grade the expert accepts, and a set that is one section
            further on
        decision: Whether this section is done enough to leave
        handoff: >-
          Back into ST-002 for the next section, until every section has been
          through this loop.
      - id: ST-005
        name: Expert sees what a development team could not build
        actor: Domain expert
        satisfaction: 1
        acceptance:
          - >-
            Given a set with every section written at least once, when the
            expert asks for a buildability review, then they see what an engineer
            could not build and which release-line stages have no requirement
            behind them.
          - >-
            Given a gap the review reports, when the expert does not close it,
            then they see it recorded as an open question with a decider and a
            date.
        steps:
          - Asks for a buildability review of the whole set, read as an engineer would
          - Sees what an engineer could not build, and what they would have to guess
          - Sees which release-line stages have no requirement behind them
          - Closes each gap, or records it as an open question with a decider and
            a date
          - Offers the set to the sponsor for approval
        inputs:
          - Every section written at least once, so there is something to review
        outputs:
          - A list of what is not buildable, and a set with each gap closed or
            owned
        decision: Is this ready to be read by someone who will commit to it
        handoff: >-
          Sponsor, who receives the set offered for approval as its root document
          or an exported copy.
      - id: ST-006
        name: Sponsor approves the PRD for a release
        actor: Sponsor
        satisfaction: 2
        acceptance:
          - >-
            Given a set offered for approval, when the sponsor approves, approves
            with conditions, or rejects it, and the expert records the decision,
            then the sponsor sees the decision, their name, their role, and the
            date recorded against the set's version.
        steps:
          - Reads the root document or an exported copy, outside the product
          - Sees the summary, the scope, what is still open, each section's grade,
            and whether anything is still blocking
          - Approves, approves with conditions naming what the condition is, or
            rejects, and tells the expert
          - Sees the expert record the decision in section 15 against this version
        inputs:
          - The set offered for approval, as its root document or an exported copy
        outputs:
          - An approved PRD at a named version, with the approval recorded
        decision: Approve, approve with conditions, or reject
        handoff: Engineering lead, to record a verdict on the approved set in ST-009
    pain_points:
      - pain: I do not know what the section is for, so I fill the heading with adjectives
        stage: ST-002
        need: Teach me the section before you ask me about it, in my own domain
      - pain: Nobody tells me my requirements are untestable until a team tries to build them
        stage: ST-005
        need: Show me, before anyone builds, what an engineer cannot build
      - pain: I reach for the names of software I have used
        stage: ST-002
        need: Convert my technology talk into the need underneath it, without arguing
      - pain: I put this down for a week and cannot remember where I was
        stage: ST-004
        need: Let me stop and resume without starting over
      - pain: I cannot tell whether what I have written is good
        stage: ST-003
        need: Tell me where it is weak, against a stated standard, and ask me one thing
      - pain: As the sponsor, I can only judge whether it reads well
        stage: ST-006
        need: Show the sponsor each grade and every blocking defect before they decide
    needs:
      - Teach me the section before you ask me about it, in my own domain
      - Tell me where it is weak, against a stated standard, and ask me one thing
      - Convert my technology talk into the need underneath it, without arguing
      - Let me stop and resume without starting over
      - Show me, before anyone builds, what an engineer cannot build
      - Show the sponsor each grade and every blocking defect before they decide
    end_state: >-
      The set is approved, with or without recorded conditions, at a named
      version, every section has a grade with no blocking defects, every open
      question has a decider and a date, and the buildability review reports no
      gap that is neither closed nor owned.
  - id: J-002
    persona: PER-004
    goal: >-
      A backlog whose every story traces to a requirement the expert actually
      stated.
    trigger: The PRD has been approved for a release.
    objectives: [O-001]
    stages:
      - id: ST-009
        name: Engineering lead records whether the set can be built from
        actor: Engineering lead
        satisfaction: 2
        acceptance:
          - >-
            Given an approved set and the report of its buildability review,
            when the engineering lead records a verdict that differs from the
            report's, then they see their verdict recorded as the verdict, with
            the report kept alongside it.
          - >-
            Given an approved set and the report of its buildability review,
            when the engineering lead records a verdict that agrees with the
            report's, then they see their verdict recorded with the report.
          - >-
            Given a gap in the set, when the engineering lead records it, then
            they see the document quoted for it.
        steps:
          - Reads the report of the buildability review, its verdict, and the gaps it quotes
          - Checks each reported gap against the document it quotes
          - Records their own verdict on whether the set can be built from
        inputs:
          - An approved set and the report of its buildability review
        outputs:
          - The engineering lead's own recorded verdict, with the report kept
            alongside it
        decision: Can a team build from this set
        handoff: The delivery lead, to check the PRD can carry a backlog
      - id: ST-007
        name: Delivery lead checks the PRD can carry a backlog
        actor: Delivery lead
        satisfaction: 1
        acceptance:
          - >-
            Given an approved set and the release it is mapped for, when the
            delivery lead checks it, then they see whether a golden-thread
            journey exists and what would block deriving a backlog.
          - >-
            Given an approved set with no journey, when the delivery lead checks
            it, then they see a no-go, with the reason that a backlog cannot be
            derived, and the workshop waits.
        steps:
          - Sees whether a journey exists and which one is the golden thread
          - Sees which release-line stages have requirements behind them
          - Sees what would block deriving a backlog, before the workshop
        inputs:
          - An approved set, and the release it is being mapped for
        outputs:
          - A go or no-go on holding the story-mapping workshop
        decision: Is there a backbone to map against
      - id: ST-008
        name: Delivery lead derives features, epics and stories
        actor: Delivery lead
        satisfaction: 2
        acceptance:
          - >-
            Given an approved set, when the delivery lead derives a backlog from
            it, then they see one feature per journey stage, epics scoped by the
            release line, and a story per requirement, each naming the id it
            came from.
        steps:
          - Sees one feature per journey stage, with the requirement ids it carries
          - Sees epics scoped by the release line
          - Sees a story per requirement, in the persona's own words, with the
            requirement's criteria as its acceptance criteria
          - Sees spikes for the open questions that block the release line
          - Sees each non-functional requirement and constraint that applies to a
            story as a definition-of-done item on it
        inputs:
          - The approved set
        outputs:
          - A backlog whose every level names what it came from
        decision: Which epics come first, and why
        handoff: The engineering team, for iteration planning
    pain_points:
      - pain: The workshop invents a backbone in the room because the PRD has none
        stage: ST-007
        need: A journey to map against, agreed before the workshop
      - pain: Stories trace to nothing, so nobody can say why they exist
        stage: ST-008
        need: Every story carrying the requirement id it came from
      - pain: Non-functional requirements and constraints are forgotten until late
        stage: ST-008
        need: Constraints arriving as definition-of-done items, not as surprises
      - pain: As the engineering lead, I find gaps between two requirements that both looked complete
        stage: ST-009
        need: Every gap quoted from the document, before the team estimates
    needs:
      - A journey to map against, agreed before the workshop
      - Every story carrying the requirement id it came from
      - Constraints arriving as definition-of-done items, not as surprises
      - Every gap quoted from the document, before the team estimates
    end_state: >-
      Features, epics, stories and spikes exist for release 1, each naming the PRD
      requirement ids behind it, and no task or estimate has been invented yet.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-personas, kind: personas, path: ./04-personas.md, title: Users and personas }
  next: { id: prd-forge-scenarios, kind: scenarios, path: ./06-scenarios.md, title: Scenarios }
---

# User journeys

## J-001 - A domain expert reaches an approved PRD whose gaps are known (golden thread)

![J-001 journey diagram](diagrams/J-001.svg)

![J-001 satisfaction](diagrams/J-001-satisfaction.svg)

Persona PER-001. Trigger: they have been asked to specify a product and have
nothing written. Stages ST-001 to ST-006.

| Stage | Actor | Decision |
| --- | --- | --- |
| ST-001 States the idea and the domain | Domain expert | What this is, and the domain's own words |
| ST-002 Taught a section, then interviewed | Domain expert | Have the questions reached the end of what they know |
| ST-003 Reads the draft and its grade | Domain expert | Accept, correct, or refute the grade |
| ST-004 Answers the one question that matters most | Domain expert | Is this section done enough to leave |
| ST-005 Sees what a team could not build | Domain expert | Is it ready for someone who will commit |
| ST-006 Sponsor approves for a release, outside the product | Sponsor | Approve, approve with conditions, or reject |

ST-002 to ST-004 are a loop, run once per section. The loop is the whole
product: the expert is taught, asked, shown a draft, shown a grade, and asked one
more thing.

End state: approved, with or without recorded conditions, at a named version,
every section graded with nothing blocking, every open question with a decider
and a date, and no buildability gap left that is neither closed nor owned.

In release 1, ST-006 happens outside the product. The sponsor reads the root
document or an exported copy and gives a decision. The expert records it in
section 15 under FR-014, with the sponsor's name, role, and date (section 6).

## How each stage feels today

Each stage is scored from 1 (bad) to 5 (good) for how it feels today, without
this product. The scores are the expert's.

| Stage | Score | Pain point behind it |
| --- | --- | --- |
| ST-001 | 3 | None. Stating the idea comes naturally. |
| ST-002 | 2 | Headings filled with adjectives, and software names in place of needs |
| ST-003 | 2 | Cannot tell whether what was written is good |
| ST-004 | 2 | Put down for a week and cannot remember where they were |
| ST-005 | 1 | Nobody says the requirements are untestable until a team tries to build them |
| ST-006 | 2 | The sponsor can only judge whether it reads well |
| ST-009 | 2 | Gaps between two requirements that both looked complete |
| ST-007 | 1 | The workshop invents a backbone in the room |
| ST-008 | 2 | Stories trace to nothing, and constraints arrive late |

The goal deliberately does not claim an engineering lead's confirmation. No stage
in ST-001 to ST-006 puts one in the actor seat, so claiming it would promise
something the release line cannot deliver. A lead's own recorded confirmation is
OUT-004, deferred to release 2 with J-002, where it is stage ST-009.

## J-002 - A delivery lead derives a backlog (not the golden thread)

![J-002 journey diagram](diagrams/J-002.svg)

![J-002 satisfaction](diagrams/J-002-satisfaction.svg)

Persona PER-004, stages ST-009, ST-007, and ST-008. In ST-009 the engineering
lead, PER-002, reads the report of the buildability review and records their own verdict under
TR-006, before the delivery lead takes over. ST-009 was added at 0.8.1, after
ST-008, and ids are never renumbered. Release 1 does not have to complete
this journey (see section 6), but the PRD must carry what it needs, which is what
ST-007 checks.

## What these journeys deliberately do not say

No stage says where the teaching text comes from, how a grade is computed, or
what reviews the set in ST-005. Those are mechanisms. Every stage above names a
person, what they do and see, and what they decide.
