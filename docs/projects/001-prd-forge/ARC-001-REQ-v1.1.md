# Project requirements: prd-forge

> **Template Origin**: Official | **ArcKit Version**: 6.18.3 | **Command**: `/arckit:requirements`

## Document control

| Field | Value |
|-------|-------|
| **Document ID** | ARC-001-REQ-v1.1 |
| **Document Type** | Business and Technical Requirements |
| **Project** | prd-forge (Project 001) |
| **Classification** | PUBLIC |
| **Status** | DRAFT |
| **Version** | 1.1 |
| **Created Date** | 2026-10-27 |
| **Last Modified** | 2026-10-27 |
| **Review Cycle** | Monthly |
| **Next Review Date** | 2026-11-26 |
| **Owner** | Richard Hightower, product owner |
| **Reviewed By** | [PENDING] |
| **Approved By** | [PENDING] |
| **Distribution** | Project Team, Architecture Team |

## Revision history

| Version | Date | Author | Changes | Approved By | Approval Date |
|---------|------|--------|---------|-------------|---------------|
| 1.0 | 2026-10-27 | ArcKit AI | Initial creation from `/arckit:requirements` command | [PENDING] | [PENDING] |
| 1.1 | 2026-10-27 | ArcKit AI | Refreshed for PRD 0.8.1: C-001 to C-003 moved, ST-009 added, CF-4 resolved | [PENDING] | [PENDING] |

---

## Document purpose

This document carries prd-forge's own PRD, version 0.8.1, into the architecture layer, and traces each requirement to the code that meets it. The PRD says what the product must do and names no technology [BND-C1]. This document says how the existing code base does it, so it names technology.

Use it as the input to the data model (`ARC-001-DATA`) and the architecture diagrams (`diagrams/ARC-001-DIAG-*`), and as the record of where the code meets, partly meets, or misses the PRD.

**Identifier rules**:

- Functional requirements FR-001 to FR-018 keep the PRD's own ids, wording, priorities, and acceptance criteria. A script copied them from the PRD's front matter, so they cannot drift in transcription.
- FR-019 and higher are capabilities the code has and the PRD does not. Each is marked "Source: code", and its priority is a proposal for the product owner.
- Non-functional requirements use ArcKit's category prefixes (`NFR-P-`, `NFR-SEC-`, and so on). Each names the PRD NFR it carries.
- Conflicts are `CF-n`, technical constraints `TC-n`, and business constraints `BC-n`, so that they do not collide with the PRD's constraint ids C-001 to C-004.

---

## Executive summary

### Business context

A domain expert knows what their product must do, but what they write down is a feature list with no named users, no pass-or-fail criteria, and the technology already chosen. The team that builds from it re-derives the specification first, and the gaps surface mid-iteration [ROOT-C1].

prd-forge is a Claude Code plugin that interviews the expert section by section, teaches each section before it asks, writes the answers as a set of schema-checked markdown files, and grades each section with read-only reviewers. A pane beside the conversation steps through the set. Scripts validate the set, draw its diagrams, and export it to Word and PDF.

Release 1 is the single-expert path, from an idea to an approved PRD. Most of it exists in the code today. This document records which parts do not, and why.

### Objectives

- A specification handed to a development team can be built from without re-deriving it (PRD O-001).
- A domain expert reaches an approved specification in days, not weeks (PRD O-002).
- Requirements are testable as written (PRD O-003).
- No domain content leaves the session the expert already uses (PRD A-005 and NFR-008).

### Expected outcomes

- 80% of PRDs pass an engineering buildability review on first submission by 2027-09-30. Baseline unknown (Q-001).
- Median under 5 working days from the first interview question to approval by 2027-09-30. Baseline unknown (Q-002).
- 95% of `must` requirements judged testable by an engineer outside the interview by 2027-09-30. Baseline unknown (Q-003).

### Project scope

**In Scope**:

- Release 1 (REL-001): journey stages ST-001 to ST-006 for one expert writing one PRD with one golden-thread journey [SC-C1].
- The plugin's skills, agents, command, pane, schemas, and scripts.
- The PRD's personas: the domain expert and the sponsor act in release 1.

**Out of Scope**:

- Backlog derivation as a release-1 capability (REL-002), although the `prd-to-backlog` skill already exists (FR-022).
- More than one author on a set (REL-003).
- An engineering lead's own recorded confirmation (OUT-004).
- Any view beyond the documents and the pane (OUT-003).

---

## Stakeholders

| Stakeholder | Role | Organization | Involvement Level |
|-------------|------|--------------|-------------------|
| Richard Hightower | Product owner | prd-forge | Decision maker |
| Domain expert (PER-001) | Primary user | Customer | Requirements definition, user acceptance |
| Sponsor or approver (PER-003) | Approver | Customer | Decision maker for each PRD |
| Engineering lead (PER-002) | Builder from the PRD | Customer | Technical review (release 2) |
| Delivery lead (PER-004) | Backlog owner | Customer | User acceptance (release 2) |
| Customer policy owner | Information policy | Customer | Security and privacy review |
| prd-forge maintainers | Contributors | prd-forge | Technical oversight |

The stakeholder analysis is `ARC-001-STKE-v1.0` [STKE-C1].

---

## Business requirements

### BR-001: Specifications a team can build from

**Description**: A PRD written with prd-forge can be estimated and built from without the team re-deriving it.

**Rationale**: The engineering lead's driver SD-3 and the expert's SD-1 [STKE-C1]. It is PRD objective O-001.

**Acceptance Criteria**:

- [ ] 80% of pilot PRDs pass the buildability review on first submission by 2027-09-30, against the baseline Q-001 establishes by 2027-03-31

**Priority**: MUST_HAVE

**Stakeholder**: Product owner (goal G-1)

---

### BR-002: Approval in days

**Description**: A domain expert with no product training reaches an approved PRD for a single-journey product in days.

**Rationale**: The buyers compare against billable hours or a contracted product manager (SD-6). It is PRD objective O-002.

**Acceptance Criteria**:

- [ ] Median under 5 working days from the first interview question to a recorded approval, for a single-journey product, by 2027-09-30

**Priority**: MUST_HAVE

**Stakeholder**: Product owner (goal G-2)

---

### BR-003: Testable requirements

**Description**: Requirements are testable as written, so a team can close them without asking the author.

**Rationale**: The engineering lead's pain, "Requirements I cannot write a test for" (SD-3). It is PRD objective O-003.

**Acceptance Criteria**:

- [ ] An engineer outside the interview judges 95% of `must` requirements testable as written, by 2027-09-30

**Priority**: MUST_HAVE

**Stakeholder**: Product owner (goal G-3)

---

### BR-004: Grades the expert and the sponsor can trust

**Description**: Every grade is evidence that quotes the document, can be refuted, and can be read after the fact.

**Rationale**: R-001 and R-002 are the PRD's two high-likelihood, high-impact risks. A grade nobody trusts is decoration (A-002).

**Acceptance Criteria**:

- [ ] Every finding in a pilot PRD's grades quotes the document
- [ ] No finding the expert refuted appears in the next grade

**Priority**: MUST_HAVE

**Stakeholder**: Product owner (goal G-5)

---

### BR-005: Adoption without a policy exception

**Description**: An organization can adopt prd-forge without an exception to its information policy.

**Rationale**: The policy owner's driver SD-7, and PRD assumption A-005.

**Acceptance Criteria**:

- [ ] Each release adds zero destinations for domain content, reviewed against A-005

**Priority**: MUST_HAVE

**Stakeholder**: Customer policy owner (goal G-4)

---

## Functional requirements

### User personas

#### Persona 1: Domain expert (PER-001, DomainExpert)

- **Role**: Domain expert specifying software for their own field
- **Goals**: Get what is in their head into a form the team can build from; stop being asked the same question by four engineers
- **Pain Points**: Cannot write requirements the way the team needs them; told they are not testable
- **Technical Proficiency**: Low in product practice; deep in the domain

#### Persona 2: Engineering lead (PER-002, EngineerLead)

- **Role**: Engineering lead who must build from the PRD
- **Goals**: Estimate without interviewing the author
- **Pain Points**: Specifications that name a technology; requirements nobody can test
- **Technical Proficiency**: High

#### Persona 3: Sponsor or approver (PER-003, Sponsor)

- **Role**: Approves the PRD for a release
- **Goals**: Commit budget and a date with confidence
- **Pain Points**: Can only judge whether a PRD reads well
- **Technical Proficiency**: Low

#### Persona 4: Delivery lead (PER-004, DeliveryLead)

- **Role**: Runs the story-mapping workshop
- **Goals**: Start the workshop with a backbone already agreed
- **Pain Points**: Stories that trace to nothing
- **Technical Proficiency**: Medium

---

### Use cases

#### UC-1: Write one section

**Actor**: Domain expert (PER-001)

**Preconditions**:

- A set exists with the section listed and not started
- The plugin is installed in the expert's session

**Main Flow**:

1. User asks to work on a section.
2. System teaches what the section is for, from its guide in `skills/prd-wizard/sections/`.
3. User answers one or two questions at a time.
4. System writes the section document with schema-valid front matter.
5. System runs `scripts/prd-validate.mjs` on the set.
6. System grades the section with `prd-forge:prd-adversary` and writes `grades/<file>`.
7. User reads the draft and its grade in the pane.
8. System asks the one question that most improves the section, then regrades.

**Postconditions**:

- The section is at `draft`, with `score`, `blocking`, and `graded` set and its reasons file written

**Alternative Flows**:

- **Alt 3a**: If the expert does not know a fact, then the system records an open question with a decider and a date.
- **Alt 3b**: If the expert names a technology, then the system records the need beneath it and keeps the preference as a candidate architecture decision.

**Exception Flows**:

- **Ex 1**: The expert refutes a finding by pointing at the document. The system checks it, drops it if the document does not support it, and says so.

**Business Rules**:

- Only the expert sets a section to `final` (TR-002).
- A reviewer reports; it never edits the document.

**Priority**: CRITICAL

---

#### UC-2: Resume after a break

**Actor**: Domain expert (PER-001)

**Preconditions**:

- A set exists with at least one section drafted

**Main Flow**:

1. User runs `/prd-q` or says they want to carry on.
2. System reads the set's front matter and finds the first section that is not at `review`.
3. System shows where the set stands, with each section's grade.
4. System asks the next unanswered question in the expert's vocabulary.

**Postconditions**:

- No answered question is asked again

**Alternative Flows**:

- **Alt 2a**: If answers were given in an earlier session and the section was never drafted, then those answers are lost, because they lived only in the conversation (Q-010).

**Exception Flows**:

- **Ex 1**: No set exists. The pane says so and offers to start one.

**Business Rules**:

- The expert decides when an interview is finished (TR-008).

**Priority**: HIGH

---

#### UC-3: Check buildability before approval

**Actor**: Domain expert (PER-001)

**Preconditions**:

- Every section is at `review`

**Main Flow**:

1. User asks for the buildability review.
2. System runs `prd-forge:prd-engineer-review` over the whole set.
3. System reports a verdict, each release-line stage with no requirement, and each requirement nobody could test.
4. User fixes the gaps or records each as an open question with a decider and a date.

**Postconditions**:

- Every gap is closed or owned

**Alternative Flows**:

- **Alt 3a**: The verdict is `buildable`, with no gaps.

**Exception Flows**:

- **Ex 1**: The set has no journey. The review reports that no backlog can be derived.

**Business Rules**:

- The engineering lead's judgement stands over the reviewer's (TR-006).

**Priority**: HIGH

---

#### UC-4: Approve a PRD

**Actor**: Sponsor or approver (PER-003)

**Preconditions**:

- The expert has offered the set for approval (TR-010)

**Main Flow**:

1. User opens the root document.
2. System shows what is approved, what is open, and who owns each open item.
3. User approves, approves with conditions, or rejects.
4. System records the decision against the set's version in the change log.

**Postconditions**:

- An approval with name, role, date, and decision exists in `16-change-log.md`

**Alternative Flows**:

- **Alt 3a**: Approve with conditions. Each condition names the open question or requirement it depends on, and a date.

**Exception Flows**:

- **Ex 1**: A rejection with no note fails validation.

**Business Rules**:

- Approval is never delegated (TR-001).

**Priority**: CRITICAL

---

### Functional requirements detail

#### FR-001: State the idea in their own words and establish the domain's vocabulary once

**Description**: The domain expert specifying software for their own field can state the idea in their own words and establish the domain's vocabulary once.

**Relates To**: BR-003, PRD FR-001, stage ST-001 (Expert states the idea and their domain), objective O-003

**Rationale**: Every question they are asked afterwards uses their unit of work and their terms, so they are never translating.

**Acceptance Criteria**:

- [ ] Given an expert who says the unit of work is a "load", when any later question refers to that unit, then it says "load" and not "item", "record" or "entity".
- [ ] Given three words the expert says an outsider would misread, when the first section is drafted, then each of those words appears in the glossary with the expert's own meaning.
- [ ] Given an expert who has not stated a domain, when they ask to begin a section, then they are asked for the domain and the unit of work first.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/SKILL.md`, `skills/prd-wizard/sections/15-glossary.md`

---

#### FR-002: See every section of the set and what state each one is in, at any point

**Description**: The domain expert specifying software for their own field can see every section of the set and what state each one is in, at any point.

**Relates To**: BR-002, PRD FR-002, stage ST-001 (Expert states the idea and their domain), objective O-002

**Rationale**: They can see at a glance what is done, what is weak and what has not been started, without opening any section.

**Acceptance Criteria**:

- [ ] Given a set where four section documents are drafted and thirteen are untouched, when the expert asks where things stand, then they see all seventeen section documents with each one's state, and the untouched ones are shown as not started rather than omitted.
- [ ] Given a section that has been graded, when the expert sees the set's state, then that section shows its score and how many blocking defects it has.
- [ ] Given a set where no section has been started, when the expert asks where things stand, then every section is listed and shown as not started.

**Shown in**: screen

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `hooks/register.tsx`, `skills/prd-wizard/SKILL.md`

---

#### FR-003: Be taught what a section is, why it matters and what belongs in it, before being asked anything about it

**Description**: The domain expert specifying software for their own field can be taught what a section is, why it matters and what belongs in it, before being asked anything about it.

**Relates To**: BR-003, PRD FR-003, stage ST-002 (Expert is taught a section, then interviewed on it), objective O-003

**Rationale**: Before the first question of a section reaches them, what the section is for and what belongs in it is in front of them, in their own domain's terms.

**Acceptance Criteria**:

- [ ] Given a section the expert has not done before, when they begin it, then they are first told what it is, why it matters and what belongs in it, in no more than ten lines.
- [ ] Given a stated domain, when a section is taught, then the example used is in that domain and not in another.
- [ ] Given an expert who says they already know the section, when they ask to skip the teaching, then the questions begin and the teaching is not forced.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/sections/`, `skills/prd-wizard/reference/method.md`

---

#### FR-004: Be asked one or two questions at a time, never a questionnaire

**Description**: The domain expert specifying software for their own field can be asked one or two questions at a time, never a questionnaire.

**Relates To**: BR-003, PRD FR-004, stage ST-002 (Expert is taught a section, then interviewed on it), objective O-003

**Rationale**: No message puts more than two questions to them, so each answer they give addresses one thing.

**Acceptance Criteria**:

- [ ] Given any section's interview, when the expert is asked for input, then at most two questions are put to them at once.
- [ ] Given an answer that leaves a field the section needs still unfillable, or that could be written into the section in two ways differing in meaning, when it is received, then a follow-up is asked about that answer before the next topic is opened.
- [ ] Given an expert whose answers would already score the section 70 or more with no blocking defects, when further questions remain unasked on the list, then the interview stops rather than continuing to the end of it.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/reference/method.md`

---

#### FR-005: Say that they have nothing more to add, and have that end the section's interview

**Description**: The domain expert specifying software for their own field can say that they have nothing more to add, and have that end the section's interview.

**Relates To**: BR-002, PRD FR-005, stage ST-002 (Expert is taught a section, then interviewed on it), objective O-002

**Rationale**: They are never trapped in an interview, and what they chose to leave incomplete is recorded rather than hidden.

**Acceptance Criteria**:

- [ ] Given an expert who says they are done with a section, when the section does not yet pass its rubric, then it is written anyway at draft, and what is missing is recorded as an open question or named plainly to them.
- [ ] Given an expert who ends a section early, when they are told what was left behind, then the statement names the specific gap, not just a score.

**Shown in**: conversation

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Partly met: the method moves on at draft, with no explicit "nothing more" signal

**Implemented by**: `skills/prd-wizard/reference/method.md`

---

#### FR-006: Have a fact they do not know recorded as an open question with a decider and a date, rather than filled in for them

**Description**: The domain expert specifying software for their own field can have a fact they do not know recorded as an open question with a decider and a date, rather than filled in for them.

**Relates To**: BR-001, PRD FR-006, stage ST-002 (Expert is taught a section, then interviewed on it), objective O-001

**Rationale**: Nothing in their PRD is a number or a citation that nobody can stand behind.

**Acceptance Criteria**:

- [ ] Given an expert who says they would have to check a figure, when the section is drafted, then no figure is written in its place and an open question records who could find out and by when.
- [ ] Given an objective whose baseline is unknown, when the section is drafted, then the baseline says so explicitly and an open question exists for it.
- [ ] Given a regulation or standard the expert has not named, when a constraint is drafted, then no regulation number appears that the expert did not supply.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/SKILL.md`, `scripts/prd-validate.mjs`

---

#### FR-007: State a technology they want and have the need beneath it recorded instead, with their preference preserved for the engineering lead

**Description**: The domain expert specifying software for their own field can state a technology they want and have the need beneath it recorded instead, with their preference preserved for the engineering lead.

**Relates To**: BR-001, PRD FR-007, stage ST-002 (Expert is taught a section, then interviewed on it), objective O-001

**Rationale**: Their requirement names no technology, their reasoning is not lost, and they do not feel overruled.

**Acceptance Criteria**:

- [ ] Given an expert who names a technology, when they are asked what the user gets from it and answer, then the recorded requirement states that outcome and names no technology, component, vendor or screen.
- [ ] Given a technology the expert stated, when the set is handed over, then that preference appears on a list of candidate architecture decisions for the engineering lead.
- [ ] Given an expert who insists the technology belongs in the requirement, when they have been told once why it does not, then their decision is recorded and is not argued again at the next grading pass.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/reference/boundaries.md`

---

#### FR-008: Read the drafted section as prose rather than as a filled-in form

**Description**: The domain expert specifying software for their own field can read the drafted section as prose rather than as a filled-in form.

**Relates To**: BR-003, PRD FR-008, stage ST-003 (Expert reads the draft and its grade), objective O-003

**Rationale**: They can judge whether it says what they meant, without reading a structured record they have no way to assess.

**Acceptance Criteria**:

- [ ] Given a drafted section, when the expert reviews it, then what they are shown reads as written English, in sentences and short tables, and they are not asked to read the section's machine-readable form to judge it.
- [ ] Given a section whose readable form and machine-readable form disagree, when either is read, then the disagreement is reported to the expert rather than silently resolved.

**Shown in**: screen

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `hooks/markdown.tsx`

---

#### FR-009: See a score, every blocking defect by name, and which part of the section is weakest

**Description**: The domain expert specifying software for their own field can see a score, every blocking defect by name, and which part of the section is weakest.

**Relates To**: BR-001, PRD FR-009, stage ST-003 (Expert reads the draft and its grade), objective O-001

**Rationale**: They know how good the section is against a stated standard, and what specifically is wrong, rather than being told it looks good.

**Acceptance Criteria**:

- [ ] Given a graded section, when the expert reads the grade, then they see a score, a count of blocking defects, and each blocking defect stated with where it is.
- [ ] Given a section scoring 70 or more with one blocking defect, when the grade is reported, then the section is not offered as ready, and the defect is named.
- [ ] Given a graded section, when the expert reads the grade, then the weakest part is named and why it is weak is stated in no more than three lines.

**Shown in**: screen

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `agents/prd-adversary.md`, `skills/prd-wizard/reference/grading.md`, `hooks/register.tsx`

---

#### FR-010: Be asked the single question that would most improve the section, not a list of everything wrong with it

**Description**: The domain expert specifying software for their own field can be asked the single question that would most improve the section, not a list of everything wrong with it.

**Relates To**: BR-003, PRD FR-010, stage ST-004 (Expert answers the one question that improves it most), objective O-003

**Rationale**: They can act immediately, and the section improves one answer at a time instead of stalling under a list.

**Acceptance Criteria**:

- [ ] Given a graded section scoring under 70, or carrying any blocking defect, when the expert is asked to improve it, then exactly one question is put to them.
- [ ] Given that one question, when it is asked, then it addresses the weakest part that was just named, and not a different part.

**Shown in**: conversation

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/reference/grading.md`

---

#### FR-011: See the section re-graded against the same standard after answering

**Description**: The domain expert specifying software for their own field can see the section re-graded against the same standard after answering.

**Relates To**: BR-003, PRD FR-011, stage ST-004 (Expert answers the one question that improves it most), objective O-003

**Rationale**: They can see whether their answer actually improved the section, and by how much.

**Acceptance Criteria**:

- [ ] Given an answered question, when the section is re-graded, then it is scored against the same rubric as before and both scores are visible.
- [ ] Given a re-grade, when the score has risen, then the document has changed; a score never rises without a change to the document.
- [ ] Given a section scoring 70 or more with no blocking defects, when it is re-graded, then the expert is offered the state `review`, and is told that `review` means the section is ready for someone else to read.

**Shown in**: screen

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/reference/grading.md`, `agents/prd-adversary.md`

---

#### FR-012: See what a development team would not be able to build from the set, before anyone has estimated it

**Description**: The domain expert specifying software for their own field can see what a development team would not be able to build from the set, before anyone has estimated it.

**Relates To**: BR-001, PRD FR-012, stage ST-005 (Expert sees what a development team could not build), objective O-001

**Rationale**: They learn where their own specification fails while it is still cheap to fix, rather than at iteration three.

**Acceptance Criteria**:

- [ ] Given a set in which every section has been written at least once, when the expert asks for a buildability review, then they see a verdict and, for each release-line stage, whether a requirement covers it or it is a gap.
- [ ] Given a requirement whose acceptance criteria an engineer who was not in the interview judges insufficient to write a test from, when the review reports it, then the requirement is named and the document is quoted.
- [ ] Given an open question that blocks a `must` requirement, when the review runs, then that dependency is reported.
- [ ] Given a review finding, when it is reported to the expert, then it has been checked against the document and anything not supported by the document has been dropped.

**Shown in**: report

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `agents/prd-engineer-review.md`

---

#### FR-013: See, in the set's own root document, what is being approved, what is still undecided and who owns each undecided thing

**Description**: The sponsor or approver can see, in the set's own root document, what is being approved, what is still undecided and who owns each undecided thing.

**Relates To**: BR-001, PRD FR-013, stage ST-006 (Approver approves the PRD for a release), objective O-001

**Rationale**: They can commit budget and a date knowing what they are committing to and what is still open.

**Acceptance Criteria**:

- [ ] Given a set offered for approval, when the approver opens its root document, then that one document carries the summary, the scope, every section's state and grade, and every open question with its decider and date, without the approver opening any other document.
- [ ] Given a set with any blocking defect anywhere, when the approver opens it, then they see that, with the sections it is in.

**Shown in**: report

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/sections/00-root.md`

---

#### FR-014: Approve, approve with conditions, or reject, and have that recorded against a named version

**Description**: The sponsor or approver can approve, approve with conditions, or reject, and have that recorded against a named version.

**Relates To**: BR-001, PRD FR-014, stage ST-006 (Approver approves the PRD for a release), objective O-001

**Rationale**: What was approved, when, by whom and on what conditions is answerable later without asking anyone.

**Acceptance Criteria**:

- [ ] Given an approver who approves with conditions, when they state the conditions, then each condition names the open question or requirement it depends on and a date.
- [ ] Given a recorded approval, when the set is read later, then the version approved, the approver, their role, the date and the decision are all present.
- [ ] Given an approved set that is then changed, when the change is written, then a new version is recorded and the earlier approval is not represented as covering it.

**Shown in**: report

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Partly met: the schema records approvals; how an approver records one is open (Q-011)

**Implemented by**: `schemas/change-log.json`, `skills/prd-wizard/sections/16-change-log.md`

---

#### FR-015: Stop in the middle of a set and resume days later without being asked anything twice

**Description**: The domain expert specifying software for their own field can stop in the middle of a set and resume days later without being asked anything twice.

**Relates To**: BR-002, PRD FR-015, stage ST-001 (Expert states the idea and their domain), objective O-002

**Rationale**: They pick up at the first unfinished section, and nothing they have already told the product is asked for again.

**Acceptance Criteria**:

- [ ] Given an expert returning after eight days, when they say they want to carry on, then work resumes at the first section not yet at `review`.
- [ ] Given an expert who has already stated their domain and vocabulary, when they resume, then they are not asked for either again and the vocabulary in use is unchanged.
- [ ] Given an expert who answered a question in a section before stopping, when they resume that section, then that question is not put to them again.

**Shown in**: conversation

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Partly met: resumes from the set; answers given before a section is drafted live only in the conversation (Q-010)

**Implemented by**: `commands/prd-q.md`, `skills/prd-wizard/reference/method.md`

---

#### FR-016: Refute a grading finding by pointing at the document, and have it withdrawn

**Description**: The domain expert specifying software for their own field can refute a grading finding by pointing at the document, and have it withdrawn.

**Relates To**: BR-001, PRD FR-016, stage ST-003 (Expert reads the draft and its grade), objective O-001

**Rationale**: They are told the finding was dropped, and it does not reappear at the next grading pass.

**Acceptance Criteria**:

- [ ] Given a finding the expert refutes, when it is checked against the document and the document does not support it, then it is dropped and the expert is told it was dropped.
- [ ] Given a finding the document does support, when the expert disputes it, then the reason is stated once and their decision is recorded.
- [ ] Given a decision the expert reaffirmed after an objection, when the section is graded again, then the objection is not raised as a new finding.

**Shown in**: conversation

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `skills/prd-wizard/reference/grading.md`

---

#### FR-017: Move from the section in front of them to any other section of the set without losing their place

**Description**: The domain expert specifying software for their own field can move from the section in front of them to any other section of the set without losing their place.

**Relates To**: BR-002, PRD FR-017, stage ST-003 (Expert reads the draft and its grade), objective O-002

**Rationale**: They reach the section they want in one step, and can always return to the view they were on before.

**Acceptance Criteria**:

- [ ] Given a section in front of them, when they ask for the next or the previous section, then the section after or before it in reading order is shown, and at the first or the last section the view does not change.
- [ ] Given a section that cites an ID another section defines, such as Q-001, when they follow that ID, then the section that defines it is shown and the ID is named above it.
- [ ] Given they have moved through three views, a section, its grade, and its rubric, when they ask to go back three times, then they see the grade, then the section, then the view they started from.

**Shown in**: screen

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `hooks/register.tsx`, `hooks/markdown.tsx`

---

#### FR-018: See the set as it now stands after it was changed outside the view in front of them

**Description**: The domain expert specifying software for their own field can see the set as it now stands after it was changed outside the view in front of them.

**Relates To**: BR-002, PRD FR-018, stage ST-003 (Expert reads the draft and its grade), objective O-002

**Rationale**: What they read is never older than the last change written to the set.

**Acceptance Criteria**:

- [ ] Given a section changed after they opened the set, when they ask to refresh, then that section shows its new text and its new state.
- [ ] Given a section that is graded again while the set is open, when the new grade is written, then the new grade is shown without them asking.
- [ ] Given no set existed when they looked, when a set is written and they ask to refresh, then every section of it is listed.

**Shown in**: screen

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met

**Implemented by**: `hooks/register.tsx`

---


#### FR-019: Validate a set mechanically

**Description**: Anyone can check a set against its schemas and its cross-section rules, and get a pass or a list of errors and warnings.

**Relates To**: BR-001, BR-003. Supports PRD FR-006, FR-012, and the guides' blocking defects. Source: code.

**Rationale**: The rules every section guide states are checked in under a second, before any reviewer reads the set.

**Acceptance Criteria**:

- [ ] Given a set with an error, when `node scripts/prd-validate.mjs <set>` runs, then it lists the error and exits with status 1
- [ ] Given a field a guide requires at review, when the section is a draft, then the validator warns, and when the section is at review, then it fails

**Priority**: SHOULD_HAVE (proposed; not in the PRD)

**Implementation status**: Met

**Implemented by**: `scripts/prd-validate.mjs`, `schemas/`, tested by `scripts/prd-validate.test.mjs`

---

#### FR-020: Draw the set's diagrams

**Description**: Anyone can draw the journeys, satisfaction curves, scenarios, lifecycles, release line, and decision rights from the set, and link them into its documents.

**Relates To**: BR-002. Source: code.

**Rationale**: A sponsor and a team read a picture of the journey faster than its front matter.

**Acceptance Criteria**:

- [ ] Given a set, when `node scripts/prd-diagrams.mjs <set>` runs twice, then the second run changes no file
- [ ] Given a stage name that holds `#`, `;`, `"`, `<`, or `>`, when its diagram renders, then the name shows as written

**Priority**: SHOULD_HAVE (proposed; not in the PRD)

**Implementation status**: Met

**Implemented by**: `scripts/prd-diagrams.mjs`, tested by `scripts/prd-diagrams.test.mjs`

---

#### FR-021: Export the set to Word and PDF

**Description**: Anyone can export a set to one Word file and one PDF file, with every diagram and wireframe drawing embedded.

**Relates To**: BR-002, PRD FR-013. Source: code.

**Rationale**: A sponsor reviews and circulates a document, not a folder.

**Acceptance Criteria**:

- [ ] Given a set, when `prd_export.py <set>` runs, then it writes `<slug>-prd.docx` and `<slug>-prd.pdf` beside the set
- [ ] Given a wireframe with a Salt drawing, when the set is exported, then the drawing replaces the text sketch

**Priority**: SHOULD_HAVE (proposed; not in the PRD)

**Implementation status**: Met

**Implemented by**: `scripts/prd_export.py`, `scripts/prd-pdf.mjs`

---

#### FR-022: Derive a backlog from an approved PRD

**Description**: The delivery lead can derive features, epics, stories, and spikes from a PRD, each tracing to a PRD requirement id.

**Relates To**: REL-002, stages ST-009, ST-007, and ST-008, goal G-6. Source: code. The PRD gives REL-002 no requirements.

**Rationale**: The delivery lead's driver SD-5: start the workshop with a backbone.

**Acceptance Criteria**:

- [ ] Given an approved PRD, when the backlog is derived, then every story names its epic and the PRD requirements it came from
- [ ] Given a PRD with no journey, when derivation is asked for, then it stops and says why

**Priority**: WONT_HAVE for release 1 (proposed; REL-002 scope)

**Implementation status**: Met in code ahead of its release

**Implemented by**: `skills/prd-to-backlog/SKILL.md`, `skills/prd-wizard/reference/backlog.md`, `schemas/features.json`, `schemas/epics.json`, `schemas/stories.json`, `schemas/spikes.json`

---

#### FR-023: Check a section's terminology against its domain

**Description**: The expert can have a section's terms and standard references checked against the conventions of its domain.

**Relates To**: PRD FR-006 and C-004. Source: code.

**Rationale**: An invented or misused term in a regulated domain exposes the expert professionally (C-004).

**Acceptance Criteria**:

- [ ] Given a term the reviewer cannot verify, when it reports, then it marks the term unverified and does not state it as fact

**Priority**: COULD_HAVE (proposed; not in the PRD)

**Implementation status**: Met. CF-3 resolved at 0.12.0 under PRD TR-015

**Implemented by**: `agents/prd-domain-voice.md`

---

## Non-Functional Requirements (NFRs)

### Performance requirements

#### NFR-P-001: Response time between questions

**Requirement**: An expert answering a question does not lose their train of thought waiting for the next one.

- **Metric**: 95th percentile elapsed time from the expert submitting an answer to the next question or the drafted section appearing.
- **Target**: under 20 seconds at p95, and under 60 seconds at p99

**Measurement Method**: At least 300 timed observations per release, taken across five scripted runs of all seventeen section documents on a set already holding 60 requirements, from the expert's own side of the conversation rather than from inside the product.

**Applies To**: FR-004, FR-010

**Rationale**: Carries PRD NFR-001 (performance) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: under 20 seconds at p95, and under 60 seconds at p99

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Not measured

**Implemented by**: host session

---

#### NFR-P-002: Grading pass duration

**Requirement**: A grading pass does not make the expert wait so long that they stop asking for one.

- **Metric**: 95th percentile elapsed time for one section's grade to be reported, measured per grading pass on the section just drafted.
- **Target**: under 90 seconds at p95 for a single section

**Measurement Method**: At least 200 grading passes per release, spread across all seventeen section documents and across sets of 20, 60 and 120 requirements.

**Applies To**: FR-009, FR-011

**Rationale**: Carries PRD NFR-002 (performance) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: under 90 seconds at p95 for a single section

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Not measured

**Implemented by**: `agents/prd-adversary.md`

---

### Availability and resilience requirements

#### NFR-A-001: Durability of work

**Requirement**: Work survives the expert stopping, and survives the tool they were using going away.

- **Metric**: Share of a set's content recoverable after the authoring session ends, with no part of the product running.
- **Target**: 100%, readable without this product

**Measurement Method**: End a session mid-section, then read the whole set with nothing but a text editor, once per release.

**Applies To**: FR-015

**Rationale**: Carries PRD NFR-004 (durability) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 100%, readable without this product

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met: every set is plain markdown with YAML front matter

**Implemented by**: `schemas/`, `docs/prd/prd-forge/`

---

#### NFR-A-002: No answer lost on interruption

**Requirement**: An interview in progress survives the product being unavailable; no session loses an answer the expert has already given.

- **Metric**: Answers lost per interruption, and time to resume after one.
- **Target**: Zero answers lost, on every interruption; resume within 1 minute at p95 and within 3 minutes at p99

**Measurement Method**: Interrupt a session mid-section 100 times per release, spread across all seventeen section documents, and count answers lost and seconds to resume.

**Applies To**: FR-015

**Rationale**: Carries PRD NFR-011 (availability) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: Zero answers lost, on every interruption; resume within 1 minute at p95 and within 3 minutes at p99

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Gap: answers before a section is drafted live only in the conversation (Q-010)

**Implemented by**: `skills/prd-wizard/reference/method.md`

---

### Scalability requirements

#### NFR-S-001: Set size

**Requirement**: A set stays workable at the size real products reach.

- **Metric**: The size of one set at which every requirement in section 7 still passes its acceptance criteria and every target in this section still holds.
- **Target**: 120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms

**Measurement Method**: A generated set at those sizes, run through every function in section 7, per release.

**Applies To**: all

**Rationale**: Carries PRD NFR-003 (scale) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Not measured at the target size

**Implemented by**: `scripts/prd-validate.mjs`, `hooks/register.tsx`

---

### Security requirements

#### NFR-SEC-001: Read access

**Requirement**: Nobody but the people the organisation has already given access to its documents can read a set.

- **Metric**: Number of ways to read a set that the organisation's own document access rules do not govern.
- **Target**: zero

**Measurement Method**: Enumerate every read path to a set per release and check each against the organisation's own access rules; recorded against the system-of-record non-goal in section 6 and A-005.

**Applies To**: all

**Rationale**: Carries PRD NFR-012 (security) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: zero

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met: the product adds no read path; access is the folder's own

**Implemented by**: `hooks/register.tsx`, `scripts/`

---

#### NFR-SEC-002: Reviewers are read-only

**Requirement**: Every grading and review agent can read the set and cannot write to it.

**Measurement Method**: Inspect each agent's `tools` list in `agents/*.md`.

**Rationale**: Principle 3, "A person decides; an agent proposes" [PRIN-C1]. Source: code.

**Acceptance Criteria**:

- [ ] No agent in `agents/` lists `Write`, `Edit`, or `Bash`

**Priority**: MUST_HAVE

**Implementation status**: Met: `prd-adversary` and `prd-engineer-review` have Read, Grep, and Glob; `prd-domain-voice` adds WebSearch and WebFetch

**Implemented by**: `agents/prd-adversary.md`, `agents/prd-engineer-review.md`, `agents/prd-domain-voice.md`

---

#### NFR-SEC-003: No secrets in a set or in the product

**Requirement**: No credential, key, or token is stored in a document set or in the plugin.

**Measurement Method**: A secret scan of the repository and of each shipped set per release.

**Rationale**: Principle 4 [PRIN-C2]. The product needs no credential of its own. Source: code.

**Acceptance Criteria**:

- [ ] The release secret scan finds nothing

**Priority**: MUST_HAVE

**Implementation status**: Met: the plugin has no configuration beyond `docs_dir`

**Implemented by**: `.claude-plugin/plugin.json`

---

### Compliance and regulatory requirements

#### NFR-C-001: Domain content stays inside the boundary

**Requirement**: What the expert says about their domain stays within whatever boundary their organisation already works in; this product adds no new place for it to go.

- **Metric**: Number of destinations set content reaches beyond the boundary A-005 names.
- **Target**: zero

**Measurement Method**: Review of every outbound destination per release, recorded against A-005.

**Applies To**: all

**Rationale**: Carries PRD NFR-008 (privacy) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: zero

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met. CF-3 resolved at 0.12.0: research is on by default with standard and term names only, and a set (`web_research: false`) or an organization (managed `permissions.deny`) turns it off

**Implemented by**: `agents/prd-domain-voice.md`

---

#### NFR-C-002: Retention

**Requirement**: A set remains readable and retrievable for as long as the organisation keeps the specifications it builds from, without this product being involved.

- **Metric**: Share of a set retrievable and readable from the organisation's own document store, with no part of this product present.
- **Target**: 100%, for as long as the organisation retains the set; no expiry imposed by us

**Measurement Method**: Retrieve a set written one release ago from the organisation's own store and read it with a text editor, once per release.

**Applies To**: FR-014

**Rationale**: Carries PRD NFR-010 (retention) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 100%, for as long as the organisation retains the set; no expiry imposed by us

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Met: the product imposes no expiry

**Implemented by**: `schemas/`

---

### Usability requirements

#### NFR-U-001: Usable without product training

**Requirement**: An expert with no product management training can complete a section without asking anyone what a word means.

- **Metric**: Share of sections a first-time expert completes without asking for the meaning of a product management term.
- **Target**: 90% of sections, measured over 10 first-time experts

**Measurement Method**: Observed sessions with 10 first-time experts before release, questions to the observer counted and categorised.

**Applies To**: all

**Rationale**: Carries PRD NFR-005 (usability) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 90% of sections, measured over 10 first-time experts

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Not measured (D-002)

**Implemented by**: `skills/prd-wizard/sections/`

---

#### NFR-U-002: Accessibility

**Requirement**: Everything the expert and the approver read is usable with a screen reader and without a mouse.

- **Metric**: Conformance to WCAG 2.2 AA of everything the product puts in front of the expert or the approver along the golden-thread journey.
- **Target**: zero level-A or level-AA violations on the golden-thread path

**Measurement Method**: One manual screen-reader pass of the golden-thread journey per release, plus an automated check in the release pipeline of everything that journey shows.

**Applies To**: all

**Rationale**: Carries PRD NFR-006 (accessibility) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: zero level-A or level-AA violations on the golden-thread path

**Priority**: MUST_HAVE (from the PRD)

**Implementation status**: Partly met: every pane control has a keyboard hotkey; no screen-reader pass yet

**Implemented by**: `hooks/register.tsx`

---

### Maintainability and supportability requirements

#### NFR-M-001: Explainable grades

**Requirement**: An expert can tell why a section received the score it did, after the fact.

- **Metric**: Share of grades for which the score per rubric dimension and the quotation behind each can be recovered after the session.
- **Target**: 100% for any section at review or better

**Measurement Method**: Re-read a graded set a week later and reconstruct every score, once per release.

**Applies To**: FR-009

**Rationale**: Carries PRD NFR-007 (observability) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 100% for any section at review or better

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met: each grade writes grades/<file>

**Implemented by**: `skills/prd-wizard/reference/grading.md`, `docs/prd/prd-forge/grades/`

---

#### NFR-M-002: Readable by later versions

**Requirement**: A set written by an earlier version is still readable and still gradable by a later one.

- **Metric**: Share of sets written by version N that version N+1 reads and grades without the expert rewriting anything.
- **Target**: 100% within a major version

**Measurement Method**: Keep one set per released version and run the current version against all of them, per release.

**Applies To**: all

**Rationale**: Carries PRD NFR-009 (supportability) into the architecture, where the design must meet it.

**Acceptance Criteria**:

- [ ] The measurement above meets the target: 100% within a major version

**Priority**: SHOULD_HAVE (from the PRD)

**Implementation status**: Met within 0.x except a recorded break: 0.8.0 requires journey_stage

**Implemented by**: `schemas/`, `scripts/prd-validate.mjs`

---

#### NFR-M-003: Automated checks before every change

**Requirement**: Every change passes the plugin validation, the pane tests, the script tests, the validator on both shipped sets, the diagram check, and the export.

**Measurement Method**: The command list in `CLAUDE.md`, run before each pull request.

**Rationale**: Principle 16 [PRIN-C3]. Source: code.

**Acceptance Criteria**:

- [ ] `claude plugin test .` passes, and `node --test scripts/prd-validate.test.mjs scripts/prd-diagrams.test.mjs` passes
- [ ] The validator reports no errors on `docs/prd/prd-forge` and `examples/acme-returns`

**Priority**: MUST_HAVE

**Implementation status**: Met: 10 pane tests and 90 script tests pass at 0.8.0

**Implemented by**: `hooks/register.test.tsx`, `scripts/prd-validate.test.mjs`, `scripts/prd-diagrams.test.mjs`

---

### Portability and interoperability requirements

#### NFR-I-001: Any YAML reader reads a set

**Requirement**: The front matter the product writes is read the same way by the validator's own reader and by a standard YAML library.

**Measurement Method**: The PyYAML oracle test compares both readers on every shipped document.

**Rationale**: A set must outlive the tool that wrote it (PRD NFR-004, NFR-010). Source: code.

**Acceptance Criteria**:

- [ ] For every shipped document, `parseYaml()` and PyYAML produce the same value

**Priority**: MUST_HAVE

**Implementation status**: Met

**Implemented by**: `scripts/prd-validate.mjs` (`parseYaml`), `scripts/prd-validate.test.mjs`

---

## Integration requirements

### External system integrations

#### INT-001: Integration with the Claude Code plugin host

**Purpose**: Deliver the interview, the reviewers, and the commands inside the session the expert already uses (the section 6 non-goal "We are not building a separate application").

**Integration Type**: In-process plugin

**Data Exchanged**:

- **From prd-forge to the host**: Skills (`prd-wizard`, `prd-to-backlog`), agents (`prd-adversary`, `prd-engineer-review`, `prd-domain-voice`), the prompt command `/prd-q`, and the manifest's user setting `docs_dir`
- **From the host to prd-forge**: The model turn that runs each skill and agent, and the tools it grants

**Integration Pattern**: Declarative plugin manifest and markdown definitions

**Authentication**: None of its own. The host session's user is the only actor.

**Error Handling**: A skill or agent the host fails to load is reported by `claude plugin validate .`

**SLA**: The host's own. PRD dependency D-001 is committed by 2027-01-31.

**Owner**: The assistant platform provider

**Rationale**: Section 6 rules out a separate application. It was C-001 until PRD 0.8.1.

**Acceptance Criteria**:

- [ ] `claude plugin validate .` passes
- [ ] Each agent's tool list matches NFR-SEC-002

**Priority**: MUST_HAVE

---

#### INT-002: Integration with the Claude Code hooks module API

**Purpose**: Draw the PRD pane beside the conversation and keep it current.

**Integration Type**: Event hooks in a TypeScript module

**Data Exchanged**:

- **From the host to prd-forge**: `session.start`, `command.run` for `/prd` and `/prd-step`, `tool.call` for `Write` and `Edit`, and `ui.render` for the pane
- **From prd-forge to the host**: Commands registered with `$.command.register`, files read with `$.fs.list` and `$.fs.read`, the pane opened with `$.ui.open`, and session state in five atoms: `set`, `cursor`, `page`, `history`, and `notice`

**Integration Pattern**: Event-driven, with a typed state contract in `types/index.d.ts`

**Authentication**: None

**Error Handling**: A Write or Edit under `docs_dir` triggers a rescan. A set changed outside the pane shows a notice with a Refresh control.

**SLA**: Redraw on the next render after the tool call

**Owner**: prd-forge maintainers

**Rationale**: PRD FR-002, FR-017, and FR-018.

**Acceptance Criteria**:

- [ ] `claude plugin test .` passes
- [ ] A change to `PrdSet` bumps the `shape` tag of the `set` atom

**Priority**: MUST_HAVE

---

#### INT-003: Integration with the Mermaid CLI (`mmdc`)

**Purpose**: Render the generated Mermaid diagrams to SVG and PNG.

**Integration Type**: Child process

**Data Exchanged**:

- **From prd-forge to `mmdc`**: `.mmd` sources from the set's `diagrams/` folder
- **From `mmdc` to prd-forge**: `.svg` and `.png` files

**Integration Pattern**: `spawnSync('mmdc', …)` in `scripts/prd-diagrams.mjs`

**Authentication**: None

**Error Handling**: Without `mmdc`, the diagram tests skip, and a skip passes. The text sources stay.

**SLA**: None

**Owner**: The Mermaid project

**Rationale**: FR-020.

**Acceptance Criteria**:

- [ ] `prd-diagrams.mjs --check` reports no gaps on both shipped sets

**Priority**: SHOULD_HAVE

---

#### INT-004: Integration with PlantUML

**Purpose**: Render the hand-written Salt wireframe drawings to SVG and PNG for the export.

**Integration Type**: Child process

**Data Exchanged**:

- **From prd-forge to PlantUML**: `WF-nnn.puml` files
- **From PlantUML to prd-forge**: `.svg` and `.png` files

**Integration Pattern**: `spawnSync('plantuml', …)` in `scripts/prd-diagrams.mjs`

**Authentication**: None

**Error Handling**: The validator checks that each drawing's marks match its sketch, whether or not it renders.

**SLA**: None

**Owner**: The PlantUML project

**Rationale**: FR-021.

**Acceptance Criteria**:

- [ ] Every wireframe in a shipped set has a rendered drawing

**Priority**: SHOULD_HAVE

---

#### INT-005: Integration with Python, `python-docx`, and PyYAML

**Purpose**: Build the Word file and the HTML for the PDF.

**Integration Type**: Script run through `uv`

**Data Exchanged**:

- **From the set to the export**: Every top-level document and every `.png` in `diagrams/`
- **From the export to the user**: `<slug>-prd.docx` and an HTML file for the PDF step

**Integration Pattern**: `uv run --with python-docx --with pyyaml python3 scripts/prd_export.py <set>`

**Authentication**: None

**Error Handling**: A missing library stops the export with a message. The set is unchanged.

**SLA**: None

**Owner**: prd-forge maintainers

**Rationale**: FR-021.

**Acceptance Criteria**:

- [ ] The export of the reference set writes both files

**Priority**: SHOULD_HAVE

---

#### INT-006: integration with playwright or chromium

**Purpose**: Print the export's HTML to a PDF.

**Integration Type**: Child process

**Data Exchanged**:

- **From prd-forge**: The export's HTML file
- **To prd-forge**: The PDF file

**Integration Pattern**: `prd_export.py` runs `node scripts/prd-pdf.mjs`, which prefers Playwright and falls back to spawning Chromium

**Authentication**: None

**Error Handling**: Without Playwright, the PDF has no page numbers. Without either, the script reports it and writes no PDF.

**SLA**: None

**Owner**: The Playwright and Chromium projects

**Rationale**: FR-021.

**Acceptance Criteria**:

- [ ] The export of the reference set writes a PDF with page numbers where Playwright is installed

**Priority**: COULD_HAVE

---

#### INT-007: Integration with web search and fetch

**Purpose**: Let `prd-domain-voice` check a term or a standard against public sources.

**Integration Type**: Host tools `WebSearch` and `WebFetch`

**Data Exchanged**:

- **From prd-forge to the web**: Search queries built from the section's terms and standard names
- **From the web to prd-forge**: Search results and fetched pages

**Integration Pattern**: Agent tool calls

**Authentication**: None

**Error Handling**: A term that cannot be verified is marked unverified.

**SLA**: None

**Owner**: The host's search provider

**Rationale**: FR-023 and C-004.

**Acceptance Criteria**:

- [x] The product owner resolves CF-3 before this integration is used on customer content (resolved 2026-10-30, PRD TR-015)

**Priority**: COULD_HAVE

---

#### INT-008: Integration with the file system as the store

**Purpose**: Hold every set as plain files where the organization already keeps documents (the section 6 system-of-record non-goal).

**Integration Type**: Local files

**Data Exchanged**:

- **Both ways**: Markdown documents with YAML front matter under `docs_dir`, plus each set's `grades/` and `diagrams/` folders

**Integration Pattern**: Read and write through the host's file tools and Node's file API

**Authentication**: The organization's own file permissions (NFR-SEC-001)

**Error Handling**: The validator reports every broken link or reference.

**SLA**: The organization's storage

**Owner**: The customer

**Rationale**: The section 6 system-of-record non-goal (C-002 until PRD 0.8.1), and PRD NFR-004 and NFR-010.

**Acceptance Criteria**:

- [ ] A set copied to another machine validates and exports there

**Priority**: MUST_HAVE

---

## Data requirements

### Data entities

The full data model is `ARC-001-DATA`. The entities below are the persistent ones. Each is a document kind with a JSON Schema in `schemas/`, or an item inside one.

#### Entity 1: PRD set (root document)

**Description**: One folder holding a product's PRD. The root document `prd.md` (kind `prd`) names the product and links every section.

**Attributes**:

| Attribute | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| id | String | Yes | Stable document id | Unique in the set |
| kind | Enum | Yes | Document kind | `prd` for the root |
| version | String | Yes | Semantic version of the set | Matches a change log entry |
| owner | String | Yes | Owner's name and role | Personal data |
| golden_thread | String | Yes, once section 5 exists | The release-1 journey | `J-nnn` that exists |
| summary | Object | Yes | Problem, users, why now, bet, measure | `measure` has a number |
| approvers | List | No | Persona ids who approve | Each `PER-nnn` exists |
| links.children | List | Yes | Every section document | Each path exists |

**Relationships**:

- One-to-many with section documents via `links.children`

**Data Volume**: One per product. The reference set has 18 documents.

**Access Patterns**: Read whole by the pane, the validator, and the export

**Data Classification**: Set by the customer. The reference set is PUBLIC.

**Data Retention**: As long as the organization keeps the set (NFR-C-002)

---

#### Entity 2: Section document

**Description**: One markdown file per PRD section, with front matter of one of 17 kinds, from `problem-opportunity` to `change-log`.

**Attributes**:

| Attribute | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| id, kind, schema, title | String | Yes | Identity | `schema` names the kind's schema |
| status | Enum | Yes | `pending`, `draft`, `review`, or `final` | `final` needs an approval |
| section, order | Number | Yes | Place in the reading order | Unique order |
| score, blocking, graded | Number, Number, Date | No | The last grade | Written only by the grading pass |
| links | Object | Yes | `parent`, `prev`, `next`, `related` | Each target exists |

**Relationships**:

- Many-to-one with the PRD set; one-to-one with its grade reasons file

**Data Volume**: 17 per set at most

**Access Patterns**: Read by front matter for navigation; body read for prose

**Data Classification**: Set by the customer

**Data Retention**: As the PRD set

---

#### Entity 3: Items inside sections

**Description**: The identified items each section holds, such as personas (`PER-nnn`), journeys and stages (`J-nnn`, `ST-nnn`), requirements (`FR-nnn`, `NFR-nnn`), wireframes (`WF-nnn`), decision rules (`TR-nnn`), and open questions (`Q-nnn`).

**Attributes**: Defined per kind in `schemas/<kind>.json`. Every item has a stable `id` that is never reused or renumbered.

**Relationships**: By id reference, which `structural()` in `scripts/prd-validate.mjs` checks

**Data Volume**: Up to 120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms per set (NFR-S-001)

**Access Patterns**: Looked up by id across sections

**Data Classification**: Set by the customer. Names in `owner`, `decider`, `consulted`, and approvals are personal data.

**Data Retention**: As the PRD set

---

#### Entity 4: Grade reasons and diagrams

**Description**: `grades/<file>` holds the reasons for a document's grade. `diagrams/` holds each diagram's source with its rendered `.svg` and `.png`.

**Attributes**: A grade file has `doc`, `score`, `blocking`, `graded`, and `grader`, then a dimension table. A diagram is a `.mmd` or `.puml` source and its renderings.

**Relationships**: One grade file per graded document; diagrams linked from the documents that show them

**Data Volume**: One grade file per document; about 4 files per diagram

**Access Patterns**: The pane opens a grade file when the expert opens a grade

**Data Classification**: As the set

**Data Retention**: As the set. Diagrams regenerate from the set.

---

#### Entity 5: Pane session state

**Description**: What the pane draws: the scanned set, the cursor, the page, the Back history, and a notice.

**Attributes**: Declared in `types/index.d.ts` as `PrdSet`, `PrdDocRef`, `PrdPage`, and `PrdView`.

**Relationships**: Derived from the set by a scan; never written back

**Data Volume**: One per session

**Access Patterns**: Read on every render

**Data Classification**: Not persisted

**Data Retention**: The session only

---

#### DR-001: Every document is checked against its kind

**Requirement**: Every document's front matter MUST declare a `kind` and pass that kind's schema.

**Rationale**: Principle 7 [PRIN-C4].

**Acceptance Criteria**:

- [ ] `prd-validate.mjs` reports no schema error on both shipped sets

**Priority**: MUST_HAVE

---

#### DR-002: Identifiers are stable and resolve

**Requirement**: An item id MUST never be reused or renumbered, and every id a document cites MUST exist in the set.

**Rationale**: Engineers and stories cite ids. A renumbered id breaks every reference to it.

**Acceptance Criteria**:

- [ ] The validator reports every reference to an id that does not exist

**Priority**: MUST_HAVE

---

#### DR-003: Personal data stays minimal and in the set

**Requirement**: The only personal data in a set MUST be the names and roles the expert enters for owners, deciders, the people consulted, and approvers. The product MUST NOT copy them anywhere else.

**Rationale**: PRD A-005 and NFR-008. The customer is the controller of a set's content, and the product adds no processing outside the session.

**Acceptance Criteria**:

- [ ] No script writes outside the set folder it was given, except the export's own output files beside the set

**Priority**: MUST_HAVE

---

#### DR-004: Derived data is regenerated, never edited

**Requirement**: Diagrams MUST be regenerated from the set after a change to journeys, scenarios, the release plan, decision rights, or wireframes.

**Rationale**: Principle 9 [PRIN-C5].

**Acceptance Criteria**:

- [ ] `prd-diagrams.mjs --check` reports no gaps before a release

**Priority**: SHOULD_HAVE

---

### Data quality requirements

**Data Accuracy**: No domain fact stated without a source (PRD C-004). An unknown baseline names its open question.

**Data Completeness**: Fields a section guide requires are warnings at draft and errors at review.

**Data Consistency**: Every cross-section id resolves. The plugin's version equals the reference set's version.

**Data Timeliness**: The pane rescans after every Write or Edit under `docs_dir`.

**Data Lineage**: Each FR in a derived backlog names its PRD requirement. Each diagram names its source in a generated comment.

---

### Data migration requirements

**Migration Scope**: No legacy system. Sets written by an earlier 0.x version.

**Migration Strategy**: In place. A breaking schema change is named in the release notes, such as `journey_stage` becoming required in 0.8.0.

**Data Transformation**: The expert or the interview adds the newly required field.

**Data Validation**: The validator on the migrated set.

**Rollback Plan**: The set is under the customer's own version control or backup.

**Migration Timeline**: At each upgrade the customer chooses.

---

## Constraints and Assumptions

### Technical constraints

**TC-1**: The product runs inside the host session and has no application of its own (a PRD section 6 non-goal; C-001 until 0.8.1).

**TC-2**: Output is plain-text documents in the customer's own store (a PRD section 6 non-goal; C-002 until 0.8.1).

**TC-3**: The scripts need Node.js. The export needs Python 3 run through `uv`. Diagrams need `mmdc` and PlantUML, and the PDF needs Playwright or Chromium, all optional.

**TC-4**: The validator's YAML reader is a subset. Inside a `{ … }` link mapping, a `title` that holds a comma, a colon, or a `#` must be quoted.

---

### Business constraints

**BC-1**: Release dates are indicative: REL-001 2027-03-31 and REL-002 2027-06-30 (PRD section 13).

**BC-2**: No regulation, standard, or statistic is stated as fact without a source (PRD C-004).

**BC-3**: Domain content does not leave the session (PRD assumption A-005; C-003 until 0.8.1).

---

### Assumptions

**A-1**: An expert will answer fifty to a hundred questions across a few sittings, if each is clearly worth answering (PRD A-001).

**A-2**: An expert will act on a grade they did not produce (PRD A-002).

**A-3**: An engineering lead will accept a PRD that names no technology (PRD A-003).

**A-4**: Organizations will let a specification be drafted inside an assistant session (PRD A-004).

**Validation Plan**: Ten observed first-time experts (D-002) and three cold reads by engineering leads (D-003), both requested for 2027-03-31.

---

## Success Criteria and KPIs

### Business success metrics

| Metric | Baseline | Target | Timeline | Measurement Method |
|--------|----------|--------|----------|-------------------|
| First-submission buildability pass rate | Unknown (Q-001) | 80% | 2027-09-30 | Buildability review on pilot PRDs |
| Median working days to approval | Unknown (Q-002) | Under 5 | 2027-09-30 | Change log and approval dates |
| `must` requirements judged testable | Unknown (Q-003) | 95% | 2027-09-30 | Three engineering leads score independently |

---

### Technical success metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Validator errors on shipped sets | 0 | `prd-validate.mjs` |
| Automated tests passing | 100% | `claude plugin test .` and `node --test` |
| Validator run time on the reference set | Under 1 second | Measured 0.05 seconds at 0.8.0 |
| Added destinations for domain content | 0 per release | Outbound-destination review |

---

### User adoption metrics

| Metric | Target | Timeline | Measurement Method |
|--------|--------|----------|-------------------|
| First-time experts observed completing a PRD | 10 | 2027-03-31 | D-002 sessions |
| Sections completed without help | 90% | 2027-03-31 | PRD NFR-005, over 10 first-time experts |

---

## Dependencies and Risks

### Dependencies

| Dependency | Description | Owner | Target Date | Status | Impact if Delayed |
|------------|-------------|-------|-------------|--------|-------------------|
| D-001 | A host session that carries a long interview and reads and writes files | Assistant platform provider | 2027-01-31 | On Track | HIGH |
| D-002 | Ten first-time experts willing to be observed | Early customers | 2027-03-31 | At Risk | HIGH |
| D-003 | Three engineering leads for cold reads | Early customers | 2027-03-31 | At Risk | HIGH |
| Q-009 | Where the rubric and the derivability checks live, and who owns them | Richard Hightower | 2027-01-31 | At Risk | HIGH |
| Q-010 | Where an answer lives before its section is drafted | Richard Hightower | 2027-01-31 | At Risk | HIGH |
| Q-011 | How an approver records a decision | Richard Hightower | 2027-02-28 | At Risk | HIGH |

D-002 and D-003 are "requested" in the PRD, so this document marks them At Risk.

---

### Risks

| Risk ID | Description | Probability | Impact | Mitigation Strategy | Owner |
|---------|-------------|-------------|--------|---------------------|-------|
| R-001 | The expert accepts a weak PRD because its score was high | HIGH | HIGH | Quote every finding; report blocking defects apart from the score | Richard Hightower |
| R-002 | The grading reports findings that are not in the document | HIGH | HIGH | Check every finding against the document before reporting (FR-016) | Richard Hightower |
| R-003 | A fluent PRD is written for the wrong product | MEDIUM | HIGH | Accepted: a grade is evidence, never a warrant | Richard Hightower |
| R-004 | The interview is too long to finish | MEDIUM | MEDIUM | One or two questions at a time; resume with `/prd-q` | Richard Hightower |
| R-005 | A later version cannot read an earlier set | LOW | HIGH | NFR-M-002; breaking changes named in release notes | Richard Hightower |

The risk ids are the PRD's own (section 11).

**Risk Scoring**: Probability × Impact = Risk Level

- High Risk (Red): Requires executive escalation
- Medium Risk (Yellow): Active monitoring and mitigation
- Low Risk (Green): Accepted

---

## Requirement conflicts & resolutions

> **Source**: The conflict analysis in `ARC-001-STKE-v1.0`, the 0.8.0 grades of the PRD, and a reading of the code.

### Conflict CF-1: Release date against the evidence it rests on

**Conflicting Requirements**:

- **Requirement A**: BC-1, REL-001 on 2027-03-31
- **Requirement B**: The assumption validation plan: D-002 and D-003, also due 2027-03-31

**Stakeholders Involved**:

- **Product owner**: Wants release 1 on its date (SD-8)
- **Sponsor**: Wants confidence before committing (SD-4)

**Nature of Conflict**:

- Release 1 ships on the day its assumptions are first tested, so it cannot use the results.

**Trade-off Analysis**:

| Option | Pros | Cons | Impact |
|--------|------|------|--------|
| **Option 1**: Ship on 2027-03-31 as an experiment | Date kept | Shipped without evidence | Product owner satisfied, sponsor at risk |
| **Option 2**: Move REL-001 after D-002 and D-003 report | Evidence first | Later release | Sponsor satisfied |
| **Option 3**: Bring D-002 and D-003 forward | Both | Depends on early customers | Both, if customers commit |

**Resolution Strategy**: PENDING

**Decision**: Not yet made. The PRD names it a decision for the sponsor at TR-001.

**Rationale**: Not decided.

**Decision Authority**: Sponsor (TR-001), per the RACI in `ARC-001-STKE-v1.0`

**Impact on Requirements**:

- **Modified**: BC-1 changes if Option 2 is chosen

**Stakeholder Management**:

- Record the decision as an open question with the sponsor as decider, before 2027-03-31.

**Future Consideration**:

- Revisit at the next review of this document.

---

### Conflict CF-2: Stage acceptance needs requirements marked `should`

**Conflicting Requirements**:

- **Requirement A**: FR-002, FR-008, and FR-011 are SHOULD_HAVE
- **Requirement B**: Stages ST-001, ST-003, and ST-004 cannot pass their own acceptance without them

**Stakeholders Involved**:

- **Domain expert**: Set the 10 `must` and 8 `should` split
- **Engineering lead**: Needs the `must` set to deliver every stage

**Nature of Conflict**:

- The PRD's body says the expert can reach an approved set without the `should` requirements. The stage acceptance says otherwise.

**Trade-off Analysis**:

| Option | Pros | Cons | Impact |
|--------|------|------|--------|
| **Option 1**: Raise the three to `must` | Stages pass | `must` rises to 72%, which brings back the validator warning | Engineering lead satisfied |
| **Option 2**: Change the three stages' acceptance | Split kept | The stages promise less | Expert's split kept |

**Resolution Strategy**: PENDING

**Decision**: Not yet made.

**Rationale**: Not decided.

**Decision Authority**: Domain expert (TR-004)

**Impact on Requirements**:

- **Modified**: FR-002, FR-008, FR-011 priorities, or stages ST-001, ST-003, ST-004

**Stakeholder Management**:

- Raised to the product owner with the 0.8.0 grades.

**Future Consideration**:

- None.

---

### Conflict CF-3: A reviewer that searches the web, against content staying in the session

**Conflicting Requirements**:

- **Requirement A**: FR-023 and INT-007: `prd-domain-voice` has `WebSearch` and `WebFetch`, and its instructions say to search the web where it can
- **Requirement B**: NFR-C-001 (PRD NFR-008) and BC-3 (PRD A-005): domain content is not sent anywhere beyond the session

**Stakeholders Involved**:

- **Domain expert**: Wants their terms checked (C-004)
- **Customer policy owner**: Wants nothing to leave the session (SD-7)

**Nature of Conflict**:

- A search query built from a section's terms sends those terms to the host's search provider. For an unreleased product, the terms themselves may be confidential.

**Trade-off Analysis**:

| Option | Pros | Cons | Impact |
|--------|------|------|--------|
| **Option 1**: Remove the web tools | A-005 fully met | Terms checked only against the set | Policy owner satisfied |
| **Option 2**: Search only for named public standards, never for the product's own terms | Standards still checked | Needs a rule the agent follows | Both partly satisfied |
| **Option 3**: Ask the expert before each search | Expert decides | One more question | Both satisfied if the expert understands the trade |

**Resolution Strategy**: Option 2, on by default, with two switches to turn it off

**Decision**: Made on 2026-10-30 by Richard Hightower and recorded in the PRD as TR-015 at 0.12.0. The domain check researches the domain on the web by default, for any domain. Its queries carry only standard names, terms of art, and the domain. A set turns research off with `web_research: false` in its root. An organization turns it off for every set by denying `WebSearch` and `WebFetch` in its managed settings, which Claude Code applies to subagents too. NFR-008 and A-005 now state this default.

**Rationale**: A citation the reviewer cannot confirm is worth less to the expert, and most domains are public. An organization whose policy allows no outbound query has an enforced switch.

**Decision Authority**: Product owner, for prd-forge's own design

**Impact on Requirements**:

- **Modified**: INT-007 and `agents/prd-domain-voice.md`, or A-005's wording

**Stakeholder Management**:

- State the chosen rule in the release notes' data-handling section.

**Future Consideration**:

- Add the rule to PRD section 9 or 10.

---

### Conflict CF-4: Product decisions recorded as constraints

**Conflicting Requirements**:

- **Requirement A**: TC-1 and TC-2 (PRD C-001 and C-002) are the product owner's own decisions
- **Requirement B**: The engineering lead's need to know which decisions are theirs (SD-3)

**Stakeholders Involved**:

- **Product owner**: Made the decisions
- **Engineering lead**: Inherits them as if imposed from outside

**Nature of Conflict**:

- The PRD's grade of section 9 found three of four constraints are product decisions, which a constraint section should not hold.

**Trade-off Analysis**:

| Option | Pros | Cons | Impact |
|--------|------|------|--------|
| **Option 1**: Move C-001 and C-002 to the PRD's scope section | Correct section | PRD change | Engineering lead satisfied |
| **Option 2**: Keep them as constraints with the reason recorded | No change | Grade stays at 35 | Product owner satisfied |

**Resolution Strategy**: PRIORITIZE

**Decision**: Option 1. In PRD 0.8.1 (PR #8) the product owner moved C-001 and C-002 to section 6 as non-goals and C-003 to section 11 as assumption A-005. Section 9 keeps only C-004.

**Rationale**: A constraint section holds rules imposed from outside. The three were the product owner's own decisions or an unnamed policy.

**Decision Authority**: Product owner (TR-004)

**Impact on Requirements**:

- **Modified**: TC-1, TC-2, and BC-3 now cite their new homes

**Stakeholder Management**:

- Resolved. The engineering lead now sees these as product scope, not as outside rules.

**Future Consideration**:

- None.

---

## Timeline and Milestones

### High-Level milestones

| Milestone | Description | Target Date | Dependencies |
|-----------|-------------|-------------|--------------|
| Open questions Q-005, Q-009, Q-010 answered | Sponsor response, rubric ownership, answer storage | 2027-01-31 | Product owner |
| Q-011 answered | How an approver records a decision | 2027-02-28 | Product owner |
| REL-001 | Single-expert PRD authoring | 2027-03-31 (indicative) | D-002, D-003, CF-1 |
| REL-002 | Backlog derivation | 2027-06-30 (indicative) | REL-001 exit criteria |
| Objective targets assessed | O-001 to O-003 | 2027-09-30 | Baselines Q-001 to Q-003 |

---

## Budget

### Cost estimate

| Category | Estimated Cost | Notes |
|----------|----------------|-------|
| Development | Not estimated | The PRD records no budget. prd-forge is MIT-licensed and built by its maintainers. |
| Infrastructure | None | The product runs in the customer's existing session and stores files in the customer's store. |
| Third-party services | None of its own | Customers use their existing assistant subscription (D-001). |
| Testing | Maintainer time | D-002 and D-003 sessions with early customers |
| Training | None | The product teaches each section as it goes. |
| **Total** | **Not estimated** | |

### Ongoing operational costs

| Category | Annual Cost | Notes |
|----------|-------------|-------|
| Infrastructure | None | No hosting |
| Licenses | None | MIT license |
| Support | Maintainer time | Issues and releases on GitHub |
| **Total** | **Not estimated** | |

---

## Approval

### Requirements review

| Reviewer | Role | Status | Date | Comments |
|----------|------|--------|------|----------|
| Richard Hightower | Product Owner | [ ] Approved | [PENDING] | |
| [PENDING] | Enterprise Architect | [ ] Approved | [PENDING] | |

### Sign-Off

| Stakeholder | Signature | Date |
|-------------|-----------|------|
| Richard Hightower, product owner | [PENDING] | [PENDING] |

---

## Requirements traceability matrix

| ArcKit ID | Source | Business requirement | User | Priority | Implemented by | Status |
|-----------|--------|----------------------|------|----------|----------------|--------|
| FR-001 | PRD FR-001 | BR-003 | PER-001 | MUST_HAVE | `skills/prd-wizard/SKILL.md`, `skills/prd-wizard/sections/15-glossary.md` | Met |
| FR-002 | PRD FR-002 | BR-002 | PER-001 | SHOULD_HAVE | `hooks/register.tsx`, `skills/prd-wizard/SKILL.md` | Met |
| FR-003 | PRD FR-003 | BR-003 | PER-001 | MUST_HAVE | `skills/prd-wizard/sections/`, `skills/prd-wizard/reference/method.md` | Met |
| FR-004 | PRD FR-004 | BR-003 | PER-001 | MUST_HAVE | `skills/prd-wizard/reference/method.md` | Met |
| FR-005 | PRD FR-005 | BR-002 | PER-001 | SHOULD_HAVE | `skills/prd-wizard/reference/method.md` | Partly met |
| FR-006 | PRD FR-006 | BR-001 | PER-001 | MUST_HAVE | `skills/prd-wizard/SKILL.md`, `scripts/prd-validate.mjs` | Met |
| FR-007 | PRD FR-007 | BR-001 | PER-001 | MUST_HAVE | `skills/prd-wizard/reference/boundaries.md` | Met |
| FR-008 | PRD FR-008 | BR-003 | PER-001 | SHOULD_HAVE | `hooks/markdown.tsx` | Met |
| FR-009 | PRD FR-009 | BR-001 | PER-001 | MUST_HAVE | `agents/prd-adversary.md`, `skills/prd-wizard/reference/grading.md`, `hooks/register.tsx` | Met |
| FR-010 | PRD FR-010 | BR-003 | PER-001 | MUST_HAVE | `skills/prd-wizard/reference/grading.md` | Met |
| FR-011 | PRD FR-011 | BR-003 | PER-001 | SHOULD_HAVE | `skills/prd-wizard/reference/grading.md`, `agents/prd-adversary.md` | Met |
| FR-012 | PRD FR-012 | BR-001 | PER-001 | MUST_HAVE | `agents/prd-engineer-review.md` | Met |
| FR-013 | PRD FR-013 | BR-001 | PER-003 | MUST_HAVE | `skills/prd-wizard/sections/00-root.md` | Met |
| FR-014 | PRD FR-014 | BR-001 | PER-003 | MUST_HAVE | `schemas/change-log.json`, `skills/prd-wizard/sections/16-change-log.md` | Partly met |
| FR-015 | PRD FR-015 | BR-002 | PER-001 | SHOULD_HAVE | `commands/prd-q.md`, `skills/prd-wizard/reference/method.md` | Partly met |
| FR-016 | PRD FR-016 | BR-001 | PER-001 | SHOULD_HAVE | `skills/prd-wizard/reference/grading.md` | Met |
| FR-017 | PRD FR-017 | BR-002 | PER-001 | SHOULD_HAVE | `hooks/register.tsx`, `hooks/markdown.tsx` | Met |
| FR-018 | PRD FR-018 | BR-002 | PER-001 | SHOULD_HAVE | `hooks/register.tsx` | Met |
| NFR-P-001 | PRD NFR-001 | NFR | all | MUST_HAVE | host session | Not measured |
| NFR-P-002 | PRD NFR-002 | NFR | all | MUST_HAVE | `agents/prd-adversary.md` | Not measured |
| NFR-S-001 | PRD NFR-003 | NFR | all | MUST_HAVE | `scripts/prd-validate.mjs`, `hooks/register.tsx` | Not measured at the target size |
| NFR-A-001 | PRD NFR-004 | NFR | all | MUST_HAVE | `schemas/`, `docs/prd/prd-forge/` | Met |
| NFR-U-001 | PRD NFR-005 | NFR | all | MUST_HAVE | `skills/prd-wizard/sections/` | Not measured (D-002) |
| NFR-U-002 | PRD NFR-006 | NFR | all | MUST_HAVE | `hooks/register.tsx` | Partly met |
| NFR-M-001 | PRD NFR-007 | NFR | all | SHOULD_HAVE | `skills/prd-wizard/reference/grading.md`, `docs/prd/prd-forge/grades/` | Met |
| NFR-C-001 | PRD NFR-008 | NFR | all | MUST_HAVE | `agents/prd-domain-voice.md` | Conflict |
| NFR-M-002 | PRD NFR-009 | NFR | all | SHOULD_HAVE | `schemas/`, `scripts/prd-validate.mjs` | Met within 0.x except a recorded break |
| NFR-C-002 | PRD NFR-010 | NFR | all | MUST_HAVE | `schemas/` | Met |
| NFR-A-002 | PRD NFR-011 | NFR | all | MUST_HAVE | `skills/prd-wizard/reference/method.md` | Gap |
| NFR-SEC-001 | PRD NFR-012 | NFR | all | MUST_HAVE | `hooks/register.tsx`, `scripts/` | Met |
| FR-019 | Code | BR-001, BR-003 | All | SHOULD_HAVE | `scripts/prd-validate.mjs` | Met |
| FR-020 | Code | BR-002 | All | SHOULD_HAVE | `scripts/prd-diagrams.mjs` | Met |
| FR-021 | Code | BR-002 | PER-003 | SHOULD_HAVE | `scripts/prd_export.py`, `scripts/prd-pdf.mjs` | Met |
| FR-022 | Code | REL-002 | PER-004 | WONT_HAVE | `skills/prd-to-backlog/SKILL.md` | Met |
| FR-023 | Code | BR-005 | PER-001 | COULD_HAVE | `agents/prd-domain-voice.md` | Conflict |
| NFR-SEC-002 | Principle 3 | BR-004 | All | MUST_HAVE | `agents/*.md` | Met |
| NFR-SEC-003 | Principle 4 | BR-005 | All | MUST_HAVE | `.claude-plugin/plugin.json` | Met |
| NFR-M-003 | Principle 16 | All | All | MUST_HAVE | Test suites | Met |
| NFR-I-001 | PRD NFR-004, NFR-010 | BR-005 | All | MUST_HAVE | `scripts/prd-validate.mjs` | Met |

---

## Appendices

### Appendix A: Glossary

The PRD's glossary, `docs/prd/prd-forge/15-glossary.md`, defines the product's terms. Terms this document adds:

- **Set**: One PRD, as a folder of markdown documents with YAML front matter.
- **Pane**: The view beside the conversation that the hooks module draws.
- **Reviewer**: A read-only agent that grades a section or the whole set.
- **Source: code**: A requirement the code meets and the PRD does not state.

### Appendix B: reference documents

- Architecture principles: `docs/projects/000-global/ARC-000-PRIN-v1.0.md`
- Stakeholder analysis: `docs/projects/001-prd-forge/ARC-001-STKE-v1.0.md`
- prd-forge PRD 0.8.0: `docs/prd/prd-forge/`

### Appendix C: Wireframes and Mockups

The PRD's ten wireframes, WF-001 to WF-010, are in `docs/prd/prd-forge/08-wireframes.md`, with Salt drawings in its `diagrams/` folder.

### Appendix D: data models

The data model is `ARC-001-DATA`, written next from the data requirements above.

---

## External references

### Document register

| Doc ID | Filename | Type | Source Location | Description |
|--------|----------|------|-----------------|-------------|
| ROOT | prd.md | PRD root | `docs/prd/prd-forge/` | Summary and objectives |
| SC | 07-scope.md | PRD section 6 | `docs/prd/prd-forge/` | Release line |
| FRD | 08-functional-requirements.md | PRD section 7 | `docs/prd/prd-forge/` | FR-001 to FR-018, copied by script |
| NFRD | 09-nonfunctional-requirements.md | PRD section 8 | `docs/prd/prd-forge/` | NFR-001 to NFR-012, copied by script |
| BND | boundaries.md | Product rules | `skills/prd-wizard/reference/` | What a PRD contains |
| PRIN | ARC-000-PRIN-v1.0.md | Principles | `docs/projects/000-global/` | Architecture principles |
| STKE | ARC-001-STKE-v1.0.md | Stakeholders | `docs/projects/001-prd-forge/` | Drivers, goals, RACI |

### Citations

| Citation ID | Doc ID | Page/Section | Category | Quoted Passage |
|-------------|--------|--------------|----------|----------------|
| ROOT-C1 | ROOT | summary.problem | Business | "what they can write down is a feature list with no named users, no pass-or-fail criteria and the technology already chosen" |
| SC-C1 | SC | release_line | Scope | "ST-001 through ST-006 for one expert writing one PRD with one golden-thread journey." |
| BND-C1 | BND | Opening | Business | "It does not say **how** to build it." |
| PRIN-C1 | PRIN | Principle 3 | Security | "An automated reviewer MAY produce evidence and a proposal, and MUST NOT make the decision itself" |
| PRIN-C2 | PRIN | Principle 4 | Security | "No secret, key, or credential is stored in a document set or in the product." |
| PRIN-C3 | PRIN | Principle 16 | Practice | "Every change MUST pass the full check list before a pull request" |
| PRIN-C4 | PRIN | Principle 7 | Data | "Every document MUST declare its `kind` in its front matter and MUST pass the schema for that kind." |
| PRIN-C5 | PRIN | Principle 9 | Data | "A person MUST NOT edit a generated artifact by hand" |
| STKE-C1 | STKE | Drivers SD-1 to SD-9 | Stakeholders | Drivers, goals G-1 to G-6, and the RACI |

### Unreferenced documents

| Filename | Source Location | Reason |
|----------|-----------------|--------|
| 08-wireframes.md | `docs/prd/prd-forge/` | Referenced in Appendix C, not cited inline |

---

**Generated by**: ArcKit `/arckit:requirements` command
**Generated on**: 2026-10-27
**ArcKit Version**: 6.18.3
**Project**: prd-forge (Project 001)
**AI Model**: Claude Opus 5.5 (claude-opus-5-5)
**Generation Context**: prd-forge PRD 0.8.1 (FR and NFR entries copied by script from its front matter), the code base at the v0.8.0 tag, `ARC-000-PRIN-v1.0`, and `ARC-001-STKE-v1.0`
