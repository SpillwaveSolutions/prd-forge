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
score: 75
blocking: 3
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
    meaning: One part of a journey, naming a person, an input, an output and a decision, and holding its steps.
    see_also:
      - journey
      - step
    not: >-
      A screen or a system step. A stage survives a redesign.
  - term: The five tests
    meaning: >-
      The five properties a statement must have to be a requirement, numbered 1
      to 5 in this order: a named user, an outcome a person can see, a
      pass-or-fail acceptance test, a priority, and no named component or
      technology.
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
      A piece of work, usually time-boxed, whose only output is an answer to an
      open question, or a recorded decision. This set widens the source because
      some of its open questions ask what people will accept, as Q-005 does, and
      only work with those people answers them.
    see_also:
      - open question
    not: >-
      A piece of the product. A spike produces knowledge, not a feature. This set
      departs from the source, where a spike is a technical investigation. Here
      a spike may be research with people, as in Q-005, and some run inside a
      dependency's sessions, as Q-006 and Q-007 run in D-002's.
    source: >-
      Spike Solutions, The Art of Agile Development, 1st ed., James Shore and
      Shane Warden, 3 Jun 2010,
      https://www.jamesshore.com/v2/books/aoad1/spike_solutions
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
      Out of scope. Out of scope means not yet, with a point at which it is
      revisited. A non-goal means not ever, with a reason.
  - term: Journey
    meaning: >-
      The stages one user goes through to reach one goal with the product, from
      start to end, in order.
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
    not: >-
      An assumption. An assumption is believed true and must be tested. A risk is
      an event that may happen, and it is mitigated.
  - term: Readable form
    meaning: >-
      The part of a section a person reads: its prose, its headings and its
      tables, written to be judged by the expert who gave the answers.
    see_also:
      - section
  - term: Threshold
    meaning: >-
      The score at or above which a section may advance: 70. A score at the
      threshold is not enough on its own, because the gate also needs no blocking
      defect.
    see_also:
      - score
      - blocking defect
  - term: Grade
    meaning: >-
      A section's score together with its blocking-defect count and its weakest
      part, the rubric dimension that scored lowest. A grade is what an expert is
      shown, and a score is one number inside it.
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
      Where a section stands: `pending`, shown to the expert as not started;
      `draft`, written; `review`, ready for someone else to read, reached through
      the gate; or `final`, set by the expert under TR-002. LC-001 in section
      5 shows each move.
    not: >-
      A threshold. The threshold is the score a gate needs. The state is where
      the section stands.
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
    not: >-
      An approval. An override moves one section past its gate, and an approval
      covers the whole set.
  - term: Verdict
    meaning: >-
      What a buildability review concludes, one of three: `buildable`, `buildable
      with gaps`, `not buildable`. In ST-009 the engineering lead may record their
      own verdict, and where it differs, theirs is the verdict and the buildability
      review's is kept beside it.
    see_also:
      - derivability checks
  - term: Derivability checks
    meaning: >-
      The eleven checks a buildability review runs to decide whether a backlog can
      be derived from a set. Q-009 asks which version of them release 1 grades
      against.
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
      What the expert's domain counts one piece of work as: a load, a claim, a
      case, a patient. Every question the expert is asked uses their
      word for it.
    not: >-
      An engagement. An engagement is the writing of one set with this product,
      and the unit of work is what the expert's own domain counts.
  - term: Unverified
    meaning: >-
      A citation that was checked and could not be confirmed against its source.
      It is marked as such and never stated as fact.
    see_also:
      - expert
  - term: MoSCoW
    meaning: >-
      The priority scale this set uses: `must`, `should`, `could`, `wont`. This
      set uses MoSCoW and not RFC 2119's MUST and SHOULD. `wont` keeps the
      source's meaning, won't have this time: a `wont` item is out of scope and
      revisited later, not a non-goal.
    see_also:
      - the five tests
      - out of scope
    source: >-
      What is MoSCoW Prioritization?, Agile Business Consortium, accessed
      2026-10-27, https://www.agilebusiness.org/?p=1907
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
      The one person who approves, approves with conditions, or rejects the whole
      set for a release under TR-001: the sponsor, or the expert when no sponsor
      exists. A set approved with conditions reads that way until the approver
      clears every condition.
    see_also:
      - condition
      - root document
      - trust rule
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
      statement is a requirement only when it meets the five tests.
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
    not: >-
      Exit criteria. Acceptance criteria decide whether one requirement or stage
      passes, and exit criteria decide whether a whole release is done. This set
      also departs from the source: North writes acceptance criteria as
      scenarios, and in this set a scenario is a different thing, a path through
      journey stages in section 5.
    source: >-
      Introducing BDD, Dan North, 20 Sep 2006,
      https://dannorth.net/blog/introducing-bdd/
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
      The questions the expert answers about one section in stage ST-002, after
      reading what the section is for. It ends as the question list says. Only the
      expert answers in it, so an engineer who reads the set later was not in the
      interview.
    see_also:
      - section
      - candidate architecture decision
  - term: Handover
    meaning: >-
      The point at which the approved set reaches the engineering lead who has to
      build from it. Journey J-002 starts there: its trigger is that the PRD has
      been approved for a release, and its first stage, ST-009, takes the approved
      set and the report of its buildability review. A set is handed over only
      once it is approved.
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
  - term: Backlog
    meaning: >-
      The features, epics and stories a delivery lead derives from an approved
      set, in stages ST-007 and ST-008 of journey J-002. Every level of it names
      the id it came from.
    see_also:
      - feature
      - epic
      - story
    not: >-
      The set. The set says what the product must do; the backlog is derived from
      it once it is approved.
  - term: Feature
    meaning: >-
      The backlog item for one journey stage, carrying the ids of the requirements
      on that stage. The set departs from the source here: the source makes a
      feature any story big enough to be released, and this set makes it one
      journey stage, so every story traces to the backbone, which in this set is
      the journey stages.
    see_also:
      - backlog
      - stage
    not: >-
      A requirement. A feature holds every requirement of one stage. Also not the
      everyday sense in section 1, where a "feature list" is a list of features
      with no named user.
    source: >-
      Epics, Features and User Stories, Mountain Goat Software, updated 28 Apr
      2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
  - term: Epic
    meaning: >-
      A group of backlog items that one release delivers. The source defines an
      epic as a large user story. This set keeps that it is large, and fixes its
      size by the release rather than by judgment, so that each release's backlog
      is one group a delivery lead can plan, as ST-008's epics scoped by the
      release line need.
    see_also:
      - backlog
      - release line
    not: >-
      A feature. A feature covers one journey stage, and an epic covers the
      stages one release delivers.
    source: >-
      Epics, Features and User Stories, Mountain Goat Software, updated 28 Apr
      2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
  - term: Story
    meaning: >-
      The backlog item for one requirement, in the persona's own words, with the
      requirement's acceptance criteria as its own.
    see_also:
      - backlog
      - requirement
      - acceptance criteria
    not: >-
      A requirement. The requirement is in the set; the story is derived from it.
      This set departs from the source, where a story is anything a user wants.
      Here each story is bound to exactly one requirement, so every story carries
      the requirement id it came from, which is J-002's need.
    source: >-
      Epics, Features and User Stories, Mountain Goat Software, updated 28 Apr
      2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
  - term: Expert
    meaning: >-
      The person who holds the domain knowledge in the interview, persona PER-001:
      the domain expert, or a product manager who speaks for one. The expert
      answers the interviews, owns the set, decides what the product must do, the
      domain's own terms, and the state of each section, and is the only one who
      may state a domain fact as true.
    see_also:
      - domain
      - interview
      - sponsor
    not: >-
      The approver. The expert approves their own set only when no sponsor
      exists, under TR-001.
  - term: Sponsor
    meaning: >-
      The person who commits budget and a date, persona PER-003, and who approves
      the set for a release under TR-001. The sponsor may approve, approve with
      conditions, or reject.
    see_also:
      - approver
      - expert
    not: >-
      The expert. Where no sponsor exists, the expert approves their own set under
      TR-001, and the change log records that no separate approver existed.
  - term: Engineering lead
    meaning: >-
      The person who has to build from the approved set, persona PER-002. The
      engineering lead receives the set at handover, records their own verdict on
      its buildability review in ST-009, and receives each candidate architecture
      decision.
    see_also:
      - handover
      - buildability review
      - candidate architecture decision
    not: >-
      The expert. The engineering lead was not in the interview and builds from
      what the set says, not from what the expert meant.
  - term: Delivery lead
    meaning: >-
      The person who turns an approved set into a backlog and runs the
      story-mapping workshop, persona PER-004, in stages ST-007 and ST-008.
    see_also:
      - backlog
      - engineering lead
    not: >-
      The engineering lead. The delivery lead plans the work from the set, and
      the engineering lead builds it.
  - term: Persona
    meaning: >-
      A named role from section 4, such as PER-001, the expert. Every
      requirement, journey, and trust rule names the persona it serves or who
      acts.
    see_also:
      - expert
      - journey
    not: >-
      A user. Anyone who uses the product is a user, and a persona is one named
      role with its own goals.
  - term: Item
    meaning: >-
      One numbered entry in a section with its own id, such as a problem, a
      persona, a stage, a requirement, or an open question. A section is made of
      its items and the prose around them.
    see_also:
      - id
      - section
    not: >-
      A line or a field of an entry. A requirement and all its acceptance
      criteria are one item.
  - term: Id
    meaning: >-
      The label that names one item, such as FR-008 or Q-001. Each id is unique
      in the set, and ids are never renumbered or reused.
    see_also:
      - item
      - link
  - term: Link
    meaning: >-
      A reference from one item to another by its id, such as the journey stage a
      requirement serves or the requirements an open question blocks.
    see_also:
      - id
  - term: Priority
    meaning: >-
      How much a requirement or a scenario matters to a release, stated in MoSCoW
      terms. Only the expert gives a priority.
    see_also:
      - MoSCoW
  - term: Teaching
    meaning: >-
      What the expert is told about a section before its interview: what it is,
      why it matters, and what belongs in it, in no more than ten lines and with
      an example from the expert's domain.
    see_also:
      - interview
      - domain
  - term: Decider
    meaning: >-
      The one named person who makes one decision: who answers an open question
      by its date, or who decides under one trust rule in section 10, whose table
      names that person in its Decider column.
    see_also:
      - open question
      - trust rule
    not: >-
      The approver. The approver decides only whether the whole set is approved
      for a release, under TR-001, and is the decider of that one rule.
  - term: Release
    meaning: >-
      A numbered release, such as REL-001, with its outcomes, its exit criteria,
      and the journey stages it completes when it has any. The first release
      holds exactly the release line.
    see_also:
      - release line
      - scope
      - exit criteria
    not: >-
      The release line. The release line is the smallest set of stages that
      completes the golden thread, and a release is what ships. Release 1 ships
      exactly the release line.
  - term: Vocabulary
    meaning: >-
      The unit of work and the words the expert says an outsider would misread,
      each with the expert's own meaning. The expert states it once, before the
      first section. Every later question uses it, and it does not change when
      the expert resumes.
    see_also:
      - unit of work
      - domain
    not: >-
      The glossary. The vocabulary is the few words the expert states at the
      start, and the glossary holds every domain term of the set.
  - term: Engineer
    meaning: >-
      Anyone on the team who builds from the set and was not in the interview.
      The engineering lead is one. An acceptance criterion is good only when an
      engineer could write a test from it.
    see_also:
      - engineering lead
      - acceptance criteria
    avoid:
      - builder
  - term: Scenario
    meaning: >-
      One concrete path a persona takes through one or more journey stages,
      recorded in section 5 with its steps and the outcome they see. A scenario
      shows a stage working, or failing, with real content.
    see_also:
      - journey
      - stage
    not: >-
      A journey. The journey names the stages, and a scenario walks one path
      through them.
  - term: Trust rule
    meaning: >-
      A rule in section 10 that names who decides one decision, at which stages,
      on what evidence, and what happens when that person is away. A rule marked
      never delegated is always decided by a person.
    see_also:
      - approver
      - override
  - term: Story-mapping workshop
    meaning: >-
      The meeting in which the delivery lead and the team map a backlog against
      the journeys of an approved set. It needs a backbone agreed before it
      starts.
    see_also:
      - backbone
      - backlog
      - delivery lead
    source: >-
      The New User Story Backlog is a Map, Jeff Patton & Associates, 8 Oct 2008,
      updated 12 Apr 2023, https://www.jpattonassociates.com/the-new-backlog/
  - term: Backbone
    meaning: >-
      The ordered journey stages that a story-mapping workshop maps features
      against. A set with no journey gives the workshop no backbone, so the
      workshop invents one in the room. This set departs from the source, where
      the backbone is the capabilities the system needs. In this set the backbone
      is the journey stages, including stages that happen outside the product.
    see_also:
      - journey
      - story-mapping workshop
    source: >-
      The New User Story Backlog is a Map, Jeff Patton & Associates, 8 Oct 2008,
      updated 12 Apr 2023, https://www.jpattonassociates.com/the-new-backlog/
  - term: Question list
    meaning: >-
      The questions an interview may put for one section. The interview ends when
      the list is finished, when the expert says they have nothing more to add,
      or earlier, when the expert's answers would already meet the gate.
    see_also:
      - interview
  - term: Gate
    meaning: >-
      What a section must meet to move to its next state. For `review`, a score at
      or above the threshold with no blocking defect, in a set that checks
      clean.
      The expert may override a gate, and the override is recorded.
    see_also:
      - state
      - override
      - threshold
    not: >-
      The threshold. The threshold is the score alone, and a gate also needs no
      blocking defect. Also not the everyday sense in sections 1 and 10, where
      "gates an engineer would have to invent" means decision points the set
      left unstated.
  - term: Out of scope
    meaning: >-
      Something the product will not do in a release, with a point at which it is
      revisited, recorded in section 6.
    see_also:
      - non-goal
      - scope
    not: >-
      A non-goal. A non-goal is never done, and an out-of-scope item is not done
      yet.
  - term: Objection
    meaning: >-
      A finding that the document supports and that the expert refutes. Its
      reason is stated to the expert once, and the expert's decision is recorded.
      The decision is reaffirmed when the expert keeps it after hearing the
      reason. A finding that names the same item for the same reason is the same
      objection, and a later grading pass does not raise it again as new.
    see_also:
      - finding
      - grading pass
    not: >-
      A refuted finding the document does not support. A finding of this kind is
      dropped, not kept as an objection.
  - term: Refute
    meaning: >-
      To challenge a finding, or a score through its findings. The finding is
      then checked against the document.
      If the document does not support it, it is dropped and the expert is told.
      If the document supports it, it stays as an objection, and the expert's
      decision is recorded.
    see_also:
      - finding
      - objection
    avoid:
      - dispute
    not: >-
      Showing a finding wrong. A refuted finding can still stand, when the
      document supports it.
  - term: Session
    meaning: >-
      The assistant conversation the expert is already working in, which the
      product works inside, as dependency D-001 records. A session ends when that
      conversation ends, and the set stays where it was written.
    see_also:
      - dependency
  - term: Change log
    meaning: >-
      Section 15, which records each version of the set with its date, its author,
      and the sections it changed, and every approval and override.
    see_also:
      - version
      - approver
      - override
  - term: Target
    meaning: >-
      The value a measure must reach: where an objective says it will be, or what
      a non-functional requirement must meet, such as under 20 seconds at p95.
    see_also:
      - objective
      - baseline
  - term: Exit criteria
    meaning: >-
      What must be true before a release counts as done, stated with each release
      in section 13.
    see_also:
      - release
    not: >-
      Acceptance criteria. Acceptance criteria decide one requirement or stage,
      and exit criteria decide the whole release.
  - term: Non-functional requirement
    meaning: >-
      A quality the product must have, such as speed, accessibility, or retention,
      recorded in section 8 with a measure and a target. It applies across
      requirements, not to one user's capability.
    see_also:
      - requirement
      - target
    not: >-
      A requirement in section 7. A requirement names a user and what they can do.
  - term: Summary
    meaning: >-
      The opening of the root document, which states in a few sentences the
      problem, the users, why now, the bet, the one objective that proves it, and
      how it is measured. An approver reads it first.
    see_also:
      - root document
      - objective
  - term: Glossary
    meaning: >-
      Section 14, this section. It gives each domain term one meaning, and every
      requirement and acceptance criterion uses those words.
    see_also:
      - vocabulary
  - term: View
    meaning: >-
      What the expert has in front of them at one moment, such as one section or
      its grade.
    see_also:
      - section
  - term: Topic
    meaning: >-
      One subject inside a section's interview, such as one requirement or one
      stage. A follow-up question finishes a topic before the next one opens.
    see_also:
      - interview
      - question list
  - term: Ready
    meaning: >-
      At `review`: fit for someone else to read. A section is ready when it meets
      the gate and the expert accepts, or when the expert overrides the gate and
      the override is recorded.
    see_also:
      - state
      - gate
    not: >-
      A set ready to be offered for approval. Ready describes one section. The
      expert decides that the whole set is offered for approval, under TR-010.
      Ready is also not a verdict of the buildability review.
  - term: Capability
    meaning: >-
      The first part of a requirement: what one named user can do with the
      product, in their own words.
    see_also:
      - requirement
      - outcome
  - term: Outcome
    meaning: >-
      The second part of a requirement: what the user sees or has once the
      capability exists, stated so that someone else could check it.
    see_also:
      - requirement
      - capability
    not: >-
      A feeling. "They feel confident" is not an outcome a tester can check.
  - term: Problem
    meaning: >-
      A condition a named persona suffers today, recorded in section 1 with
      counted evidence, why it matters now, and what it costs to leave it.
    see_also:
      - persona
      - objective
  - term: Approval
    meaning: >-
      The approver's recorded decision on one version of the set: approve,
      approve with conditions, or reject, with the approver, their role, the
      date, and the version. A rejection is an approval record too. An approval
      covers only the version it names, and a later change records a new
      version that it does not cover.
    see_also:
      - approver
      - condition
      - version
    not: >-
      An override. An override moves one section past its gate, and an approval
      is a decision on the whole set.
  - term: Engagement
    meaning: >-
      One piece of work in which one expert writes one set, from the first
      question to the approval. TR-001 covers an engagement with no sponsor.
    see_also:
      - expert
      - sponsor
    not: >-
      A unit of work. The unit of work is what the expert's own domain counts.
  - term: Lifecycle
    meaning: >-
      The states one thing passes through and the moves between them, with the
      person who makes each move, recorded in section 5. LC-001 is the lifecycle
      of a section of the set.
    see_also:
      - state
      - scenario
  - term: Handoff
    meaning: >-
      The point at which one stage's work passes to the next person or the next
      stage, named on each journey stage.
    see_also:
      - stage
      - handover
    not: >-
      The handover. The handover is the one handoff at which the approved set
      reaches the engineering lead.
  - term: Segment
    meaning: >-
      A group of organizations that would buy the product for the same reason,
      recorded in section 2 with its buyer and its user, such as S-001.
    see_also:
      - buyer
  - term: Buyer
    meaning: >-
      The person in a segment who decides to pay for the product, such as a
      principal or a practice lead.
    see_also:
      - segment
    not: >-
      The user. The buyer pays, and the user is the person who works with the
      product, such as the consultant with the domain knowledge.
  - term: Status quo
    meaning: >-
      What a buyer does today with no product: a smart practitioner, a document,
      and a willing engineer. Section 2 records it as a competitor, because every
      buyer already has it.
    see_also:
      - segment
  - term: Delegated
    meaning: >-
      Given to an agent to decide. Section 10 marks for each trust rule whether an
      agent may decide it, and a rule that is never delegated is always decided by
      the person it names.
    see_also:
      - trust rule
  - term: Definition of done
    meaning: >-
      The conditions every backlog item must meet before the team counts it as
      done. The delivery lead needs the set's constraints to arrive as items of
      it, not as surprises, in J-002.
    see_also:
      - backlog
      - constraint
  - term: Checks clean
    meaning: >-
      Every id and every link in the set resolves to an item or a document that
      exists, and every document has the parts its section needs.
    see_also:
      - gate
      - link
  - term: Pilot PRD
    meaning: >-
      One of the first 5 PRDs written with release 1 by people other than the
      product's author. O-001 and REL-001's exit criteria count them.
    see_also:
      - first submission
      - release
  - term: First submission
    meaning: >-
      The first time a PRD goes through the buildability review. Only that first
      verdict counts, so no gap fixed after it changes the result.
    see_also:
      - buildability review
      - pilot PRD
  - term: Reviewer
    meaning: >-
      A second reader who comments on a section without being able to change it,
      as REL-003 plans. No persona in release 1 is a reviewer.
    see_also:
      - review
    not: >-
      A grading pass. The grading pass that scores a section is not a person.
  - term: Iteration
    meaning: >-
      One fixed period of the delivery team's work after the PRD is approved.
      "Iteration three" means late in the build, after the plan is made.
    see_also:
      - release
  - term: Review
    meaning: >-
      The state `review`: a section ready for someone else to read.
    see_also:
      - state
      - buildability review
      - reviewer
    not: >-
      The buildability review, which is its own term, or the expert reading a
      draft, which the set calls reading.
  - term: Pass
    meaning: >-
      A PRD passes the buildability review when its verdict is `buildable`, or
      `buildable with gaps` with every gap closed or owned, as O-001 defines.
    see_also:
      - buildability review
      - verdict
      - first submission
    not: >-
      Meeting the gate, or a grading pass. A section meets the gate, a grading
      pass is one run of the rubric, and a PRD passes the buildability review.
  - term: Indicative
    meaning: >-
      Said of a release date the plan aims at and has not committed to, marked
      indicative in section 13.
    see_also:
      - release
  - term: Follow-up
    meaning: >-
      A further question about the answer just given, asked before the next topic
      opens, when the answer leaves something the section needs unanswered or
      could be written into the section in two ways.
    see_also:
      - interview
      - topic
  - term: Host
    meaning: >-
      The assistant session the expert already works in, which renders what the
      product shows and carries its load, as dependency D-001 records.
    see_also:
      - session
      - dependency
  - term: Specification
    meaning: >-
      In the general sense only: a requirements document written without this
      method, as section 1 and Q-001 use the word. This set calls its own
      documents the set, or the PRD.
    see_also:
      - prd
      - document set
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
| Score | A judgement on the product idea |
| Spike | A piece of the product |
| Open question | A risk |
| Non-goal | Out of scope |
| Grade | Score |
| State | Threshold |
| Assumption | An open question |
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
| Backlog | The set |
| Feature | A requirement |
| Story | A requirement |
| Expert | The approver |
| Sponsor | The expert |
| Engineering lead | The expert |
| Delivery lead | The engineering lead |
| Item | A line or a field of an entry |
| Pass | Meeting the gate |
| Scenario | A journey |
| Objection | A refuted finding the document does not support |
| Refute | Showing a finding wrong |
| Gate | The threshold |
| Out of scope | A non-goal |
| Outcome | A feeling |
| Ready | A set ready to be offered for approval |
| Reviewer | A grading pass |
| Approval | An override |
| Engagement | A unit of work |
| Handoff | The handover |
| Journey | A use case |
| Step | A stage |
| Override | An approval |
| Release | The release line |
| Non-functional requirement | A requirement in section 7 |
| Acceptance criteria | Exit criteria |
| Epic | A feature |
| Vocabulary | The glossary |
| Persona | A user |
| Buyer | The user |
| Risk | An assumption |
| Decider | The approver |
| Review | The buildability review |
| Exit criteria | Acceptance criteria |
| Unit of work | An engagement |

The "Most often confused with" column above is the one that earns its keep. Three
of them, golden thread, blocking defect and
score, carry a cost when confused: a team picks the wrong journey for release 1,
ships a section with a known fault because the number looked good, or believes a
well-written PRD means a sound product.

## References

Eight terms come from established practice, and each entry's `source` names
where. Where this set departs from the source, the entry says so.

- MoSCoW: "What is MoSCoW Prioritization?", Agile Business Consortium, accessed 2026-10-27, https://www.agilebusiness.org/?p=1907
- Given/When/Then: "Introducing BDD", Dan North, 20 Sep 2006, https://dannorth.net/blog/introducing-bdd/
- Story, epic, and feature: "Epics, Features and User Stories", Mountain Goat Software, last updated 28 Apr 2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes
- Story map and backbone: "The New User Story Backlog is a Map", Jeff Patton & Associates, 8 Oct 2008, updated 12 Apr 2023, https://www.jpattonassociates.com/the-new-backlog/
- Spike: "Spike Solutions", in The Art of Agile Development, 1st ed., James Shore and Shane Warden, 3 Jun 2010, https://www.jamesshore.com/v2/books/aoad1/spike_solutions
