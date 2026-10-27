---
id: prd-forge-glossary
kind: glossary
schema: prd-forge/glossary@1
title: Glossary
status: draft
updated: 2026-10-27
domain: product management tooling
section: 14
order: 150
score: 65
blocking: 2
graded: 2026-10-27
terms:
  - term: PRD
    meaning: >-
      A written statement of what to build, for whom, why, and how you know it
      works, plus what not to build. It does not say how to build it.
    see_also:
      - section
      - document set
    not: >-
      A design document. A PRD that names components or technologies has stopped
      being a PRD and has started being an architecture sketch.
  - term: Document set
    meaning: >-
      The documents that together are one PRD: a root document and one document
      per section, each linking to the others.
    see_also:
      - PRD
  - term: Golden thread
    meaning: >-
      The one user journey that release 1 must deliver from end to end.
    see_also:
      - journey
      - release line
    not: >-
      The most important journey in general. It is the journey chosen for release 1,
      which is often the simplest rather than the most valuable.
  - term: Release line
    meaning: >-
      The smallest set of journey stages that completes the golden thread, and so
      the boundary of what release 1 contains.
    see_also:
      - golden thread
      - scope
    not: >-
      A date or a deadline. It is a line across the journey, not across a calendar.
  - term: Stage
    meaning: One large step of a journey, naming a person, an input, an output and a decision.
    see_also:
      - journey
      - step
    not: >-
      A screen or a system step. A stage survives a redesign.
  - term: The five tests
    meaning: >-
      The five numbered properties a statement must have to be a product
      requirement. Test 1, it names a user or a stakeholder. Test 2, it states an
      outcome a person can see. Test 3, it has a pass-or-fail acceptance test.
      Test 4, it has a priority. Test 5, it does not name the component or the
      technology that delivers it. The numbers are part of the term: the set
      refers to "test 5" by number.
    see_also:
      - blocking defect
  - term: Rubric
    meaning: >-
      The stated standard a section is scored against: a set of dimensions, each
      with written anchors for what a score of 0, 2 and 4 look like.
    see_also:
      - score
      - blocking defect
    not: >-
      A checklist. A checklist asks whether something is present; a rubric asks how
      good it is, against written anchors.
  - term: Blocking defect
    meaning: >-
      A named fault that stops a section advancing however high its score is, such
      as a requirement that names a technology or an id that refers to nothing.
    see_also:
      - rubric
      - score
    not: >-
      A low score. Score and blocking defects are counted separately and a high
      score never clears a blocking defect.
  - term: Score
    meaning: >-
      A section's total against its rubric, 0 to 100, written by a grading pass and
      never by hand.
    see_also:
      - rubric
      - blocking defect
    not: >-
      A measure of whether the product is a good idea. It measures how well the
      section is written, nothing else.
  - term: Spike
    meaning: >-
      A time-boxed piece of work whose only output is an answer to an open question,
      or a recorded decision.
    see_also:
      - open question
    not: >-
      A piece of the product. A spike produces knowledge, not a feature.
  - term: Open question
    meaning: >-
      Something not yet decided, recorded with the one person who decides it and
      the date by which they must.
    see_also:
      - spike
      - assumption
    not: >-
      A risk. A risk is something that might happen and nobody can simply decide; an
      open question has a decider.
  - term: Non-goal
    meaning: >-
      Something a reasonable reader would expect the product to do, that it will not
      do, with no plan to.
    see_also:
      - scope
    not: >-
      Out of scope. Out of scope means not yet, with a condition for revisiting; a
      non-goal means not ever, with a reason.
  - term: Journey
    meaning: >-
      The steps one user takes to reach one goal with the product, from start to
      end, in order.
    see_also:
      - stage
      - golden thread
    not: >-
      A use case. A journey covers the whole path to a goal, including steps
      outside the product.
  - term: Step
    meaning: What a user does, sees or decides at one point inside a stage.
    see_also:
      - stage
      - journey
    not: A stage. A stage holds many steps.
  - term: Section
    meaning: >-
      One of the fifteen numbered parts of a PRD, each held in its own document.
      Section 5 holds two documents, journeys and scenarios, and section 7 holds
      two, functional requirements and wireframes, so a set has seventeen section
      documents across fifteen sections. Cross-references in a set are by section
      number.
    see_also:
      - document set
  - term: Scope
    meaning: >-
      What a release contains and what it does not, set against the journey stages
      it completes.
    see_also:
      - release line
      - non-goal
  - term: Assumption
    meaning: >-
      Something taken on faith that the product depends on, recorded with what
      would break if it turned out false.
    see_also:
      - open question
      - risk
    not: >-
      An open question. Nobody can simply decide an assumption true; it is
      validated or falsified.
  - term: Risk
    meaning: >-
      Something that may happen and would damage the product, recorded with a
      likelihood, an impact, a mitigation and one named owner.
    see_also:
      - assumption
      - spike
  - term: Readable form
    meaning: >-
      The part of a section a person reads: its prose, its headings and its
      tables, written to be judged by the expert who gave the answers.
    see_also:
      - section
  - term: Threshold
    meaning: >-
      The score at or above which a section may advance, provided it also carries
      no blocking defect. It is 70.
    see_also:
      - score
      - blocking defect
  - term: Grade
    meaning: >-
      A section's score together with its blocking-defect count and its weakest
      dimension, the rubric dimension that scored lowest, which the set also calls
      the section's weakest part. A grade is what an expert is shown; a score is
      one number inside it.
    see_also:
      - score
      - grading pass
    not: A score. The score is part of the grade, not the whole of it.
  - term: Grading pass
    meaning: >-
      One run of a section or a set against its rubric, producing a grade. It is
      the only thing that writes a score, and it never changes the document.
    see_also:
      - grade
      - rubric
  - term: State
    meaning: >-
      Where a section stands, one of four in this order: `pending` (not yet
      interviewed), `draft` (written), `review` (ready for someone else to read),
      `final` (approved). A section reaches `review` at a score of 70 or more with
      no blocking defects, and `final` only with an approval recorded.
    see_also:
      - threshold
      - blocking defect
  - term: Override
    meaning: >-
      An expert's decision to advance a section past a gate it has not met,
      recorded in the change log with the score at the time.
    see_also:
      - state
      - threshold
  - term: Verdict
    meaning: >-
      What a buildability review concludes, one of three: `buildable`, `buildable
      with gaps`, `not buildable`.
    see_also:
      - derivability checks
  - term: Derivability checks
    meaning: >-
      The eleven checks a buildability review runs to decide whether a backlog can
      be derived from a set. They are product content, shipped and versioned with
      the product, and the set states their count and their verdict vocabulary
      rather than restating the list.
    see_also:
      - verdict
      - rubric
  - term: Candidate architecture decision
    meaning: >-
      A technology or design preference the expert stated during the interview,
      kept out of the requirements and handed to the engineering lead as a topic
      for an architecture decision record.
    see_also:
      - the five tests
    not: A requirement. It is deliberately not one, because it would fail test 5.
  - term: Unit of work
    meaning: >-
      What the expert's domain counts one piece of work as: an engagement, a load,
      a claim, a case, a patient. Every question the expert is asked uses their
      word for it.
  - term: Unverified
    meaning: >-
      A citation that was checked and could not be confirmed against its source.
      It is marked as such and never stated as fact.
    see_also:
      - the five tests
  - term: MoSCoW
    meaning: >-
      The priority scale this set uses: `must`, `should`, `could`, `wont`. This
      set uses MoSCoW and not RFC 2119's MUST and SHOULD.
    see_also:
      - the five tests
  - term: Wireframe
    meaning: >-
      A sketch of one screen a person works in or one report a person reads,
      labeled an illustration, not a design. It shows what
      the person sees and does there, and names the requirements it makes concrete.
      Every requirement shown in a screen or a report has one, in section 7.
    see_also:
      - the five tests
  - term: Buildability review
    meaning: >-
      A reading of the whole set as the engineering lead who has to build it. It
      runs the eleven derivability checks and reports a verdict and, for each
      release-line stage, whether a requirement covers it or it is a gap.
    see_also:
      - verdict
      - derivability checks
      - finding
    not: >-
      A grading pass. A grading pass scores one section against its rubric; a
      buildability review reads the whole set and asks whether a backlog can be
      derived from it.
  - term: Finding
    meaning: >-
      One fault that a grading pass or a buildability review reports, with the
      document it is in quoted. A finding is checked against the document before
      the expert sees it, and is dropped when the document does not support it.
    see_also:
      - blocking defect
      - grading pass
      - buildability review
    not: >-
      A blocking defect. A blocking defect is one kind of finding, the kind that
      stops a section advancing. Every blocking defect is reported as a finding,
      but most findings only lower a score or name a weak dimension.
  - term: Root document
    meaning: >-
      The one document of a set that every other document names as its parent.
      It carries the summary, the scope, every section's state and grade, and
      every open question with its decider and date, and it is what an approver
      reads.
    see_also:
      - document set
      - approver
    not: >-
      Section 1. The root document has no section number; section 1 is the
      problem and opportunity.
  - term: Approver
    meaning: >-
      The one person who decides whether a set is approved for a release: the
      sponsor, or the expert when no sponsor exists. They approve, approve with
      conditions, or reject, and the decision is recorded in section 15 against a
      named version. An approver who approves with conditions approves the set
      on the conditions they state, and the set reads as approved with conditions
      until that same approver clears every one.
    see_also:
      - condition
      - root document
    not: >-
      The expert. The expert decides the state of each section; the approver
      decides on the whole set. They are one person only when no sponsor exists.
  - term: Condition
    meaning: >-
      What an approver who approves with conditions requires before the approval
      is unconditional. Each condition names the open question or requirement it
      depends on and a date, and only the approver who stated it clears it.
    see_also:
      - approver
      - open question
    not: >-
      A constraint. A condition belongs to one approval and is cleared; a
      constraint holds for the product and is never cleared.
  - term: Constraint
    meaning: >-
      A rule the product must obey that the team cannot change by agreeing among
      themselves, recorded in section 9 with its category, the authority that
      imposes it by name, and how compliance is shown. A regulation or a standard
      appears in a constraint only when the expert named it.
    see_also:
      - condition
    not: >-
      A requirement. A requirement states what a user can do and has a priority;
      a constraint limits how every requirement it applies to may be met, and is
      not prioritized or deferred.
  - term: Objective
    meaning: >-
      A business result the product is expected to produce, recorded in section 3
      with the problems it addresses, one metric, a baseline, a target with a
      date, and one owner. If the product ships and the metric does not move, the
      product did not work.
    see_also:
      - baseline
    not: >-
      A requirement. An objective says what the business gains; a requirement
      says what a user can do, and names the objective it serves.
  - term: Baseline
    meaning: >-
      The value an objective's metric has today, before the product. When it is
      not known, the baseline says unknown and names the open question that will
      establish it, and the target is an intention rather than a commitment until
      the question is answered.
    see_also:
      - objective
      - open question
    not: >-
      A target. The baseline is where the metric stands now; the target is where
      the objective says it will be by a date.
  - term: Requirement
    meaning: >-
      A statement of what one named user can do with the product and the outcome
      they can see, recorded in section 7 with its acceptance criteria, a
      priority, the journey stage it serves, and the objective it serves. A
      statement is a requirement only when it passes the five tests.
    see_also:
      - the five tests
      - acceptance criteria
      - objective
  - term: Acceptance criteria
    meaning: >-
      The pass-or-fail statements on a requirement or a journey stage. Each is
      written as Given a situation, When the person acts, Then what they see, and
      each is one an engineer who was not in the interview could write a test
      from. A story derived from a requirement takes the requirement's criteria
      as its acceptance criteria.
    see_also:
      - requirement
      - stage
      - the five tests
  - term: Gap
    meaning: >-
      Something the set does not say that a team needs in order to build: most
      often a release-line stage that no requirement covers, as a buildability
      review reports it. A gap is closed with a requirement, or owned as an open
      question with a decider and a date.
    see_also:
      - buildability review
      - release line
      - open question
  - term: Version
    meaning: >-
      A numbered state of the set, recorded in section 15 with its date, its
      author, and the sections it changed. An approval names the one version it
      covers, and a change written after an approval records a new version that
      the approval does not cover.
    see_also:
      - approver
      - condition
    not: >-
      A release of the product. The product's releases are numbered too, and a
      set written by one release is read by later ones; a version of the set
      counts changes to the set.
  - term: Domain
    meaning: >-
      The field of work the expert specifies software for, such as freight. The
      expert names it before the first section. It sets the unit of work, the
      vocabulary every question uses, and the examples each section is taught
      with. The expert supplies knowledge of the domain; the product does not.
    see_also:
      - unit of work
  - term: Reading order
    meaning: >-
      The order in which the documents of a set are read: the root document, then
      the section documents by section number, from section 1 to section 15.
      Where a section holds two documents, journeys come before scenarios and
      functional requirements come before wireframes. The next and the previous
      section of any document follow this order.
    see_also:
      - section
      - root document
  - term: Interview
    meaning: >-
      The questions the expert answers about one section, in stage ST-002. It
      starts after the expert reads what the section is for, puts one or two
      questions at a time, and ends when the section has enough material to be
      drafted, when the expert says they have nothing more to add, or when their
      answers would already score the section 70 or more with no blocking defect.
      Only the expert answers in it. An engineer who reads the set later was not
      in the interview.
    see_also:
      - section
      - candidate architecture decision
  - term: Handover
    meaning: >-
      The point at which the approved set reaches the engineering lead who has to
      build from it. Journey J-002 starts there: its trigger is that the PRD has
      been approved for a release, and its first stage, ST-009, takes the approved
      set and its buildability report. A set is handed over only once it is
      approved.
    see_also:
      - approver
      - candidate architecture decision
  - term: Dependency
    meaning: >-
      Something outside the product that the product relies on, recorded in
      section 11 with what happens if it is not there, such as D-001, an assistant
      session the expert is already working in.
    see_also:
      - assumption
      - risk
    not: >-
      A requirement's wait on an open question. A requirement that waits on a
      question names the question, and the question lists the requirement in what
      it blocks.
links:
  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }
  prev: { id: prd-forge-release-plan, kind: release-plan, path: ./14-release-plan.md, title: Release plan }
  next: { id: prd-forge-change-log, kind: change-log, path: ./16-change-log.md, title: Change log and approvals }
---

# Glossary

| Term | Most often confused with |
| --- | --- |
| PRD | A design document |
| Golden thread | The most important journey |
| Release line | A date |
| Stage | A screen |
| Rubric | A checklist |
| Blocking defect | A low score |
| Score | A verdict on the product idea |
| Spike | A piece of the product |
| Open question | A risk |
| Non-goal | Out of scope |
| Grade | Score |
| State | Threshold |
| Assumption | Open question, risk |
| Candidate architecture decision | A requirement |
| Buildability review | A grading pass |
| Finding | A blocking defect |
| Root document | Section 1 |
| Approver | The expert |
| Condition | A constraint |
| Constraint | A requirement |
| Objective | A requirement |
| Baseline | A target |
| Version | A release of the product |
| Dependency | A requirement's wait on an open question |

Seventeen terms were added at version 0.2.0. Five of them existed only as
`see_also` pointers to nothing, which is this set's own named blocking defect; the
rest were load-bearing inside acceptance criteria while being defined nowhere:
threshold, grade, grading pass, state, verdict, override, unit of work and the
rest. The five tests are now numbered, because the set cites "test 5" by number
five times.

The `not` column above is the one that earns its keep. Every one of these has
been confused in practice, and three of them, golden thread, blocking defect and
score, carry a cost when confused: a team picks the wrong journey for release 1,
ships a section with a known fault because the number looked good, or believes a
well-written specification means a sound product.
