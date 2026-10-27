---
id: prd-forge-glossary
kind: glossary
schema: prd-forge/glossary@1
title: Glossary
status: draft
updated: 2026-10-26
domain: product management tooling
section: 14
order: 150
score: 60
blocking: 7
graded: 2026-10-26
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
      One directory of documents that together are one PRD: an index and one
      document per section, each linking to the others.
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
      documents, prefixed 01 to 16, against fifteen section numbers.
    see_also:
      - document set
    not: >-
      A file number. The file prefix and the section number differ from section 5
      onward; cross-references in this set are by section number.
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
      - machine-readable form
  - term: Machine-readable form
    meaning: >-
      The part of a section a tool reads: the structured record of its items, each
      with its id, its fields and its links to other sections. Every item in it has
      a counterpart in the readable form, and the two disagree when an item's id,
      priority or link differs between them.
    see_also:
      - readable form
    not: A storage format. It says what is recorded, not how or where.
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
      dimension — the rubric dimension that scored lowest, which the set also calls
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
      A text sketch of one screen a person works in or one report a person reads,
      drawn in characters and labeled an illustration, not a design. It shows what
      the person sees and does there, and names the requirements it makes concrete.
      Every requirement shown in a screen or a report has one, in section 7.
    see_also:
      - the five tests
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
| Section | A file number |
| Machine-readable form | A storage format |

Seventeen terms were added at version 0.2.0. Five of them existed only as
`see_also` pointers to nothing, which is this set's own named blocking defect; the
rest were load-bearing inside acceptance criteria while being defined nowhere —
threshold, grade, grading pass, state, verdict, override, unit of work and the
rest. The five tests are now numbered, because the set cites "test 5" by number
five times.

The `not` column above is the one that earns its keep. Every one of these has
been confused in practice, and three of them — golden thread, blocking defect and
score — carry a cost when confused: a team picks the wrong journey for release 1,
ships a section with a known fault because the number looked good, or believes a
well-written specification means a sound product.
