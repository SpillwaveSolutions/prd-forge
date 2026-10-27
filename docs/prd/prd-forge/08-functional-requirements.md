---
id: prd-forge-functional-requirements
kind: functional-requirements
schema: prd-forge/functional-requirements@1
title: Functional requirements
status: draft
updated: 2026-10-27
domain: product management tooling
section: 7
order: 80
score: 81
blocking: 0
graded: 2026-10-27
requirements:
  - id: FR-001
    user: PER-001
    capability: >-
      State the idea in their own words and establish the domain's vocabulary once
    outcome: >-
      Every question they are asked afterwards uses their unit of work and their
      terms, so they are never translating.
    acceptance:
      - >-
        Given an expert who says the unit of work is a "load", when any later
        question refers to that unit, then it says "load" and not "item",
        "record" or "entity".
      - >-
        Given three words the expert says an outsider would misread, when the
        first section is drafted, then each of those words appears in the glossary
        with the expert's own meaning.
      - >-
        Given an expert who has not stated a domain, when they ask to begin a
        section, then they are asked for the domain and the unit of work first.
    priority: must
    shown_in: conversation
    journey_stage: ST-001
    objective: O-003
  - id: FR-002
    user: PER-001
    capability: >-
      See every section of the set and what state each one is in, at any point
    outcome: >-
      They can see at a glance what is done, what is weak and what has not been
      started, without opening any section.
    acceptance:
      - >-
        Given a set where four section documents are drafted and thirteen are
        pending, when the expert asks where things stand, then they see all
        seventeen section documents with each one's state, and the pending ones
        are shown as not started rather than omitted.
      - >-
        Given a section that has been graded, when the expert sees the set's state,
        then that section shows its score and how many blocking defects it has.
      - >-
        Given a set where no section has been started, when the expert asks where
        things stand, then every section is listed and shown as not started.
    priority: should
    shown_in: screen
    journey_stage: ST-001
    objective: O-002
  - id: FR-003
    user: PER-001
    capability: >-
      Be taught what a section is, why it matters and what belongs in it, before
      being asked anything about it
    outcome: >-
      Before the first question of a section reaches them, what the section is for
      and what belongs in it is in front of them, in their own domain's terms.
    acceptance:
      - >-
        Given a section the expert has not done before, when they begin it, then
        they are first told what it is, why it matters and what belongs in it, in
        no more than ten lines.
      - >-
        Given a stated domain, when a section is taught, then the example used is
        in that domain and not in another.
      - >-
        Given an expert who says they already know the section, when they ask to
        skip the teaching, then the questions begin and the teaching is not forced.
    priority: must
    shown_in: conversation
    journey_stage: ST-002
    objective: O-003
  - id: FR-004
    user: PER-001
    capability: Be asked one or two questions at a time, never a questionnaire
    outcome: >-
      No message puts more than two questions to them, so each answer they give
      addresses one thing.
    acceptance:
      - >-
        Given any section's interview, when the expert is asked for input, then at
        most two questions are put to them at once.
      - >-
        Given an answer that leaves something the section needs still unanswered, or
        that could be written into the section in two ways differing in meaning,
        when it is received, then a follow-up is asked about that answer before
        the next topic is opened.
      - >-
        Given an expert whose answers would already score the section 70 or more
        with no blocking defects, when further questions remain unasked on the
        list, then the interview stops rather than continuing to the end of it.
    priority: must
    shown_in: conversation
    journey_stage: ST-002
    objective: O-003
  - id: FR-005
    user: PER-001
    capability: >-
      Say that they have nothing more to add, and have that end the section's
      interview
    outcome: >-
      They are never trapped in an interview, and what they chose to leave
      incomplete is recorded rather than hidden.
    acceptance:
      - >-
        Given an expert who says they are done with a section, when the section
        does not yet pass its rubric, then it is written anyway at draft, and what
        is missing is recorded as an open question or named plainly to them.
      - >-
        Given an expert who ends a section early, when they are told what was left
        behind, then the statement names the specific gap, not just a score.
    priority: should
    shown_in: conversation
    journey_stage: ST-002
    objective: O-002
  - id: FR-006
    user: PER-001
    capability: >-
      Have a fact they do not know recorded as an open question with a decider and
      a date, rather than filled in for them
    outcome: >-
      Nothing in their PRD is a number or a citation that nobody can stand behind.
    acceptance:
      - >-
        Given an expert who says they would have to check a figure, when the
        section is drafted, then no figure is written in its place and an open
        question records who could find out and by when.
      - >-
        Given an objective whose baseline is unknown, when the section is drafted,
        then the baseline says so explicitly and an open question exists for it.
      - >-
        Given a regulation or standard the expert has not named, when a constraint
        is drafted, then no regulation number appears that the expert did not
        supply.
    priority: must
    shown_in: conversation
    journey_stage: ST-002
    objective: O-001
  - id: FR-007
    user: PER-001
    capability: >-
      State a technology they want and have the need beneath it recorded instead,
      with their preference preserved for the engineering lead
    outcome: >-
      Their requirement names no technology, their reasoning is not lost, and they
      do not feel overruled.
    acceptance:
      - >-
        Given an expert who names a technology, when they are asked what the user
        gets from it and answer, then the recorded requirement states that outcome
        and names no technology, component, vendor or screen.
      - >-
        Given a technology the expert stated, when the set is handed over, then
        that preference appears on a list of candidate architecture decisions for
        the engineering lead.
      - >-
        Given an expert who insists the technology belongs in the requirement, when
        they have been told once why it does not, then their decision is recorded
        and is not argued again at the next grading pass.
    priority: must
    shown_in: conversation
    journey_stage: ST-002
    objective: O-001
  - id: FR-008
    user: PER-001
    capability: Read the drafted section as prose rather than as a filled-in form
    outcome: >-
      They can judge from the prose alone whether it says what they meant, and
      no id, priority or link is stated two different ways in the set.
    acceptance:
      - >-
        Given a drafted section, when the expert reviews it, then every item is
        shown in a sentence or in a table row under named column headings, and no
        item is shown only as a bare list of names and values.
      - >-
        Given an id, priority or link that two places in the set state
        differently, when the section is read, then the expert is told of the
        difference rather than it being silently resolved.
    priority: should
    shown_in: screen
    journey_stage: ST-003
    objective: O-003
  - id: FR-009
    user: PER-001
    capability: >-
      See a score, every blocking defect by name, and which part of the section is
      weakest
    outcome: >-
      They know how good the section is against a stated standard, and what
      specifically is wrong, rather than being told it looks good.
    acceptance:
      - >-
        Given a graded section, when the expert reads the grade, then they see a
        score, a count of blocking defects, and each blocking defect stated with
        where it is.
      - >-
        Given a section scoring 70 or more with one blocking defect, when the grade
        is reported, then the section is not offered as ready, and the defect is
        named.
      - >-
        Given a graded section, when the expert reads the grade, then the weakest
        part is named and why it is weak is stated in no more than three lines.
    priority: must
    shown_in: screen
    journey_stage: ST-003
    objective: O-001
  - id: FR-010
    user: PER-001
    capability: >-
      Be asked the single question that would most improve the section, not a list
      of everything wrong with it
    outcome: >-
      They can act immediately, and the section improves one answer at a time
      instead of stalling under a list.
    acceptance:
      - >-
        Given a graded section scoring under 70, or carrying any blocking defect,
        when the expert is asked to improve it, then exactly one question is put
        to them.
      - >-
        Given that one question, when it is asked, then it addresses the weakest
        part that was just named, and not a different part.
    priority: must
    shown_in: conversation
    journey_stage: ST-004
    objective: O-003
  - id: FR-011
    user: PER-001
    capability: See the section re-graded against the same standard after answering
    outcome: >-
      They can see whether their answer actually improved the section, and by how
      much.
    acceptance:
      - >-
        Given an answered question, when the section is re-graded, then it is
        scored against the same rubric as before and both scores are visible.
      - >-
        Given a re-grade, when the score has risen, then the document has changed;
        a score never rises without a change to the document.
      - >-
        Given a section scoring 70 or more with no blocking defects, when it is
        re-graded, then the expert is offered the state `review`, and is told that
        `review` means the section is ready for someone else to read.
    priority: should
    shown_in: screen
    journey_stage: ST-004
    objective: O-003
  - id: FR-012
    user: PER-001
    capability: >-
      See what a development team would not be able to build from the set, before
      anyone has estimated it
    outcome: >-
      They learn where their own specification fails while it is still cheap to
      fix, rather than at iteration three.
    acceptance:
      - >-
        Given a set in which every section has been written at least once, when
        the expert asks for a buildability review, then they see a verdict and,
        for each release-line stage, whether a requirement covers it or it is a
        gap.
      - >-
        Given a requirement whose acceptance criteria an engineer who was not in
        the interview judges insufficient to write a test from, when the review
        reports it, then the requirement is named and the document is quoted.
      - >-
        Given an open question that blocks a `must` requirement, when the review
        runs, then that requirement's wait on the question is reported.
      - >-
        Given a review finding, when it is reported to the expert, then it has been
        checked against the document and anything not supported by the document has
        been dropped.
    priority: must
    shown_in: report
    journey_stage: ST-005
    objective: O-001
  - id: FR-013
    user: PER-003
    capability: >-
      See, in the set's own root document, what is being approved, what is still
      undecided and who owns each undecided thing
    outcome: >-
      They can commit budget and a date knowing what they are committing to and
      what is still open.
    acceptance:
      - >-
        Given a set offered for approval, when the approver opens its root
        document, then that one document carries the summary, the scope, every
        section's state and grade, and every open question with its decider and
        date, without the approver opening any other document.
      - >-
        Given a set with any blocking defect anywhere, when the approver opens it,
        then they see that, with the sections it is in.
    priority: must
    shown_in: report
    journey_stage: ST-006
    objective: O-001
  - id: FR-014
    user: PER-003
    capability: >-
      Approve, approve with conditions, or reject, and have that recorded against a
      named version
    outcome: >-
      What was approved, when, by whom and on what conditions is answerable later
      without asking anyone.
    acceptance:
      - >-
        Given an approver who approves with conditions, when they state the
        conditions, then each condition names the open question or requirement it
        depends on and a date.
      - >-
        Given a recorded approval, when the set is read later, then the version
        approved, the approver, their role, the date and the decision are all
        present.
      - >-
        Given an approved set that is then changed, when the change is written,
        then a new version is recorded and the earlier approval is not represented
        as covering it.
    priority: must
    shown_in: report
    journey_stage: ST-006
    objective: O-001
  - id: FR-015
    user: PER-001
    capability: >-
      Stop in the middle of a set and resume days later without being asked
      anything twice
    outcome: >-
      They pick up at the first unfinished section, and nothing they have already
      told the product is asked for again.
    acceptance:
      - >-
        Given an expert returning after eight days, when they say they want to
        carry on, then work resumes at the first section not yet at `review`.
      - >-
        Given an expert who has already stated their domain and vocabulary, when
        they resume, then they are not asked for either again and the vocabulary
        in use is unchanged.
      - >-
        Given an expert who answered a question in a section before stopping, when
        they resume that section, then that question is not put to them again.
    priority: should
    shown_in: conversation
    journey_stage: ST-001
    objective: O-002
  - id: FR-016
    user: PER-001
    capability: >-
      Refute a grading finding by pointing at the document, and have it withdrawn
    outcome: >-
      They are told the finding was dropped, and it does not reappear at the next
      grading pass.
    acceptance:
      - >-
        Given a finding the expert refutes, when it is checked against the
        document and the document does not support it, then it is dropped and the
        expert is told it was dropped.
      - >-
        Given a finding the document does support, when the expert disputes it,
        then the reason is stated once and their decision is recorded.
      - >-
        Given a decision the expert reaffirmed after an objection, when the
        section is graded again, then the objection is not raised as a new finding.
    priority: should
    shown_in: conversation
    journey_stage: ST-003
    objective: O-001
  - id: FR-017
    user: PER-001
    capability: >-
      Move from the section in front of them to any other section of the set
      without losing their place
    outcome: >-
      They reach the section they want in one step, and can always return to the
      view they were on before.
    acceptance:
      - >-
        Given a section in front of them, when they ask for the next or the
        previous section, then the section after or before it in reading order is
        shown, and at the first or the last section the view does not change.
      - >-
        Given a section that cites an id another section defines, such as Q-001,
        when they follow that id, then the section that defines it is shown and
        the id is named above it.
      - >-
        Given they have moved from a section to three other things in the set, one
        after another, when they ask to go back three times, then they see each
        earlier thing again, the most recent first, and end at the section they
        started from.
    priority: should
    shown_in: screen
    journey_stage: ST-003
    objective: O-002
  - id: FR-018
    user: PER-001
    capability: >-
      See the set as it now stands after it was changed outside the view in front
      of them
    outcome: >-
      After they ask to refresh, what they read is the set as it now stands.
    acceptance:
      - >-
        Given a section changed after they opened the set, when they ask to
        refresh, then within 10 seconds that section shows its new text and its
        new state.
      - >-
        Given a section that is graded again while the set is open, when they ask
        to refresh, then within 10 seconds the new grade is shown.
      - >-
        Given no set existed when they looked, when a set is written and they ask
        to refresh, then every section of it is listed.
    priority: should
    shown_in: screen
    journey_stage: ST-003
    objective: O-002
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-scope, kind: scope, path: ./07-scope.md, title: Scope }
  next: { id: prd-forge-wireframes, kind: wireframes, path: ./08-wireframes.md, title: Wireframes }
---

# Functional requirements

| ID | User | Capability | Priority | Stage |
| --- | --- | --- | --- | --- |
| FR-001 | PER-001 | State the idea; establish the vocabulary once | must | ST-001 |
| FR-002 | PER-001 | See the whole set's state at a glance | should | ST-001 |
| FR-003 | PER-001 | Be taught the section before being asked | must | ST-002 |
| FR-004 | PER-001 | Be asked one or two questions at a time | must | ST-002 |
| FR-005 | PER-001 | End a section and see what was left behind | should | ST-002 |
| FR-006 | PER-001 | Unknown facts become open questions, never inventions | must | ST-002 |
| FR-007 | PER-001 | Technology talk converted; preference preserved | must | ST-002 |
| FR-008 | PER-001 | Read the draft as prose | should | ST-003 |
| FR-009 | PER-001 | See score, blocking defects, weakest part | must | ST-003 |
| FR-010 | PER-001 | Be asked one question, not twelve | must | ST-004 |
| FR-011 | PER-001 | See the re-grade against the same standard | should | ST-004 |
| FR-012 | PER-001 | See what a team could not build from it | must | ST-005 |
| FR-013 | PER-003 | See what is approved and what is open, on one page | must | ST-006 |
| FR-014 | PER-003 | Approve, with conditions, against a version | must | ST-006 |
| FR-015 | PER-001 | Stop and resume without being asked anything twice | should | ST-001 |
| FR-016 | PER-001 | Refute a finding and have it withdrawn | should | ST-003 |
| FR-017 | PER-001 | Move to any section without losing their place | should | ST-003 |
| FR-018 | PER-001 | See the set as it now stands | should | ST-003 |

Every release-line stage has at least one `must` requirement. Ten of the 18
are `must`: without any one of them, REL-001 does not do what it promises. The
eight `should` requirements make the work faster or easier to follow, and the
expert can still reach an approved set without them. The expert set this split
at version 0.8.0.

Six of the `must` requirements wait on an open question in section 12.
FR-004, FR-009, FR-010, and FR-012 wait on Q-009, where the rubric and the
derivability checks live and who owns them. FR-010 also waits on Q-007, whether
the working order is right and how looping back to the journeys feels, because
Q-007 blocks ST-004. FR-013 waits on Q-005, whether a
sponsor accepts a specification that carries a grade. FR-014 waits on Q-011, how
an approver records a decision.

FR-015 and FR-016 were split out of FR-002 and FR-009 at version 0.2.0, because
each has a failure mode of its own: a build could deliver perfect set-state
visibility and still re-ask three answered questions, and could report a grade
perfectly and still defend a finding the document does not support. Ids are never
renumbered, so they sit at the end rather than in stage order.

## A judgement call worth challenging

FR-002, FR-008 and FR-013 refer to "the set", "the section", "a table row" and
"the root document". A reviewer may read those as naming an output format and
therefore failing test 5. The judgement taken here is that a written
specification is the product's subject, not its delivery technology, so these
words name the artifact rather than the mechanism. What is deliberately absent
everywhere: the assistant the product runs inside, how grading is performed, who
or what reviews the set, and what the documents are stored as. Those are in
section 6 as non-goals, in section 11 as dependencies, or nowhere.

FR-001, FR-009, FR-013 and FR-014 each read as more than one capability, and a
reviewer has called them out for it. They are left whole deliberately: each is one
act with several parts, and a build delivering half of one would be visibly
unfinished rather than arguably done. FR-015 and FR-016 were split precisely
because they were not like that, each had a failure mode the other half could
hide.
