# prd-forge architecture principles

> **Template Origin**: Official | **ArcKit Version**: 6.18.3 | **Command**: `/arckit:principles`

## Document control

| Field | Value |
|-------|-------|
| **Document ID** | ARC-000-PRIN-v1.0 |
| **Document Type** | Enterprise Architecture Principles |
| **Project** | prd-forge global principles (Project 000) |
| **Classification** | PUBLIC |
| **Status** | DRAFT |
| **Version** | 1.0 |
| **Created Date** | 2026-10-27 |
| **Last Modified** | 2026-10-27 |
| **Review Cycle** | Quarterly |
| **Next Review Date** | 2027-01-27 |
| **Owner** | Richard Hightower, product owner |
| **Reviewed By** | [PENDING] |
| **Approved By** | [PENDING] |
| **Distribution** | prd-forge maintainers and contributors |

## Revision history

| Version | Date | Author | Changes | Approved By | Approval Date |
|---------|------|--------|---------|-------------|---------------|
| 1.0 | 2026-10-27 | ArcKit AI | Initial creation from `/arckit:principles` command | PENDING | PENDING |

---

## Executive summary

This document sets the principles that govern every architecture decision in prd-forge. prd-forge is a plugin that runs inside a person's existing assistant session. It interviews a domain expert and writes a product requirements document (PRD) as a set of plain-text files that the customer owns.

The principles come from three places: the repository's working conventions [CL-C1], the rules the product applies to every PRD it writes [BND-C1], and the constraints and decision rights in prd-forge's own PRD [CON-C1] [DRR-C1].

**Scope**: The prd-forge plugin, its skills, agents, commands, session pane, schemas, and scripts, and every document set it writes.
**Authority**: The product owner, who holds the PRD's decision rights.
**Compliance**: Mandatory unless the product owner approves an exception, recorded as section VI describes.

**Philosophy**: These principles are technology-agnostic. They say what qualities the architecture must have, not which products deliver them. prd-forge has no servers, no database, and no deployment of its own, so the template's hosting principles do not apply. The appendix lists them with the reason.

---

## I. strategic principles

### 1. Specify the outcome, never the mechanism

**Principle Statement**:
A requirements document MUST say what to build, for whom, why, and how to know it works. It MUST NOT name a technology, a vendor, an existing component, a module split, a data model, or an estimate [BND-C1].

**Rationale**:
A requirement that names its mechanism closes the design before anyone has designed it. The team then builds what was named, not what the user needed.

**Implications**:

- The architecture documents, decision records, and backlog carry every technology choice. The PRD carries none.
- A technology the expert states is converted into the need behind it and kept on a list of candidate decision records [BND-C2].
- These ArcKit documents may name technology, because they describe how the product meets the PRD.

**Validation Gates**:

- [ ] Every functional requirement passes the five tests: a named user, a visible outcome, a pass-or-fail test, a priority, and no named component or technology [BND-C3]
- [ ] Each technology preference the expert stated appears on the candidate decision list, not in a requirement

**Example**: Good: "The adjuster can act on the claim away from their desk." Bad: "Push the decision to the adjuster's phone."

**Common Violations**: A requirement that reads "the system shall" and names a service. A wireframe that picks a platform or a component library.

---

### 2. Work where the person already works

**Principle Statement**:
The product MUST reach the expert inside the work session they already use. It MUST NOT need a separate application to open, install, or log into [CON-C2].

**Rationale**:
The expert's time is the scarce resource. A second application adds an account, a context switch, and a reason to stop.

**Implications**:

- Every capability runs as part of the host session: guided interviews, commands, read-only reviewers, and a pane beside the conversation.
- The product holds no accounts and no login of its own.

**Validation Gates**:

- [ ] A new capability needs no new installation step beyond the plugin
- [ ] No capability asks the user to sign in

**Example**: Good: the set's state appears in a pane beside the conversation. Bad: a separate web view that the expert opens to see the set.

**Common Violations**: A helper that needs its own service running before the interview can start.

---

### 3. A person decides; an agent proposes

**Principle Statement**:
Every decision that the decision rights mark as never delegated MUST be made by the named person. An automated reviewer MAY produce evidence and a proposal, and MUST NOT make the decision itself [DRR-C1].

**Rationale**:
The expert carries the professional risk of what the PRD says. A grade or a verdict that nobody can override is a grade nobody trusts [DRR-C2].

**Implications**:

- Ten of the thirteen decision rules are never delegated, including approval for a release, the final state of a section, and any statement of a domain fact [DRR-C1].
- The three delegable rules (grading, the buildability review, and the backlog check) produce assessments with their evidence, and a person can refute them.
- A reviewer is read-only: it reports and never edits the document.

**Validation Gates**:

- [ ] Each automated reviewer has read-only access to the document set
- [ ] Each assessment quotes the document for every finding below full marks
- [ ] A person's override is recorded where others can see it later

**Example**: Good: the reviewer reports a score with quotations, and the expert accepts or refutes each finding. Bad: the product sets a section to `final` because its score passed a threshold.

**Common Violations**: An agent that writes `score` or `status` without a person's action. A finding defended after the expert showed the document does not support it.

---

### 4. Security and privacy by design (NON-NEGOTIABLE)

**Principle Statement**:
Content the expert enters about their domain MUST NOT be sent anywhere beyond the session they already use, and MUST NOT be retained by the product outside the documents themselves [CON-C3]. Only people the organization already allows to read its documents can read a set [NFRD-C1].

**Rationale**:
Experts describe unreleased products, client work, and regulated domains. One leak ends their trust and may breach their employer's policy.

**Implications**:

- The product adds no outbound destination for domain content: no telemetry of content, no remote store, no copy kept elsewhere.
- Access to a set is the access the organization already applies to the folder that holds it. The product adds no access layer of its own.
- No secret, key, or credential is stored in a document set or in the product.

**Zero Trust Pillars** (as they apply to a local plugin):

1. **Identity-Based Access**: The organization's own document permissions decide who reads a set.
2. **Least Privilege**: Reviewers read and never write. Scripts write only inside the set they were given.
3. **Encryption Everywhere**: Inherited from the organization's storage and the host session. The product adds no unencrypted channel.
4. **Continuous Verification**: Each release reviews every outbound destination [NFRD-C1].

**Mandatory Controls**:

- [ ] Zero additional destinations for domain content, checked each release
- [ ] No secrets in the repository or in a document set
- [ ] Reviewers have no write tools

**Compliance Frameworks**:

- The customer's own information policy, which the product cannot weaken [CON-C3].

**Exceptions**:

- NONE. These principles are non-negotiable.

**Validation Gates**:

- [ ] Each release lists every outbound destination and finds none added
- [ ] Each new agent's tool list is read-only, unless it is the interview skill that writes the set

**Example**: Good: a grade's reasons are written beside the document, in the set's own folder. Bad: grades sent to a shared service for analytics.

**Common Violations**: A debug log that writes interview answers outside the set.

---

### 5. Every judgement explains itself after the fact

**Principle Statement**:
Every grade, verdict, and status change MUST carry its reasons in a place that a reader can open later, without rerunning anything [NFRD-C2].

**Rationale**:
An expert who cannot see why a section scored 68 cannot fix it, and a sponsor cannot trust a number with no evidence.

**Implications**:

- Each grade writes its reasons, dimension by dimension, to `grades/<file>` beside the document [CL-C2].
- Each version of a set has a change log entry that names what moved.
- The pane opens a grade's reasons and the rubric behind it in one step.

**Validation Gates**:

- [ ] Every document with a `score` has a matching reasons file
- [ ] Every version number in a set's root has a change log entry, which the validator checks

**Example**: Good: "Measure 2: the summary has a target and no value for today." Bad: "Measure: weak."

**Common Violations**: A score written into front matter with no reasons file.

---

## II. data principles

### 6. The document set is the single source of truth

**Principle Statement**:
A PRD MUST be one folder of plain-text documents that the customer owns and stores where they already store documents [CON-C4]. Every tool MUST read and write that folder, and nothing else, as the record of the PRD [CL-C3].

**Rationale**:
A set that outlives the tool that wrote it is a set the customer can trust with years of product decisions [NFRD-C3].

**Implications**:

- The links between documents (`parent`, `prev`, `next`, `children`, and `related`) live in each document's front matter, not in a separate index.
- The pane, the validator, and the export read only the front matter to navigate [CL-C3].
- The product is not the system of record. It keeps no database and no hidden state that the set depends on.

**Data Classification Tiers**: Set by the customer's own policy. The product does not classify a set.

**Data Retention**: A set lasts as long as the organization keeps it. The product imposes no expiry [NFRD-C3].

**Validation Gates**:

- [ ] A set is readable with a plain text editor and nothing else
- [ ] Every cross-document reference resolves inside the set

**Example**: Good: a set copied to another machine opens, validates, and exports there. Bad: a set whose grades exist only in the session that produced them.

**Common Violations**: A tool that keeps a cache the set needs to make sense.

---

### 7. Every document declares its kind and is checked against it

**Principle Statement**:
Every document MUST declare its `kind` in its front matter and MUST pass the schema for that kind. Every identifier a document cites MUST resolve [CL-C4].

**Rationale**:
Thirty documents written over weeks drift. A check that runs in seconds finds a broken reference before an engineer does.

**Implications**:

- A new document kind changes the schema, the kind lists, the validator, the export, the section guide, and the reference set together [CL-C5].
- A field a section guide requires at review is a warning while the section is a draft and an error once it is offered for review [CL-C6].
- The validator's reader is a subset of the front-matter language, and a test compares it with a full reader for every shipped document [CL-C7].

**Validation Gates**:

- [ ] The validator reports no errors on the reference set and the example set
- [ ] Each blocking defect a section guide states has a check and a test, where a script can check it

**Example**: Good: a scenario that names a stage outside its journey draws a warning. Bad: a typo in an identifier that nothing reports.

**Common Violations**: A field added to a document but not to its schema.

---

### 8. No invented facts

**Principle Statement**:
A regulation, standard, figure, or citation MUST NOT be stated as fact unless the expert supplied it or it was checked against its source. Anything else MUST be marked unverified or become an open question with a decider and a date [CON-C5] [DRR-C3].

**Rationale**:
An expert who circulates a PRD with a wrong citation is exposed personally and professionally.

**Implications**:

- An unknown baseline is written as unknown and names the open question that will establish it.
- A grader never estimates a stage's satisfaction or a scenario's priority. Only the expert gives them [CL-C8].

**Validation Gates**:

- [ ] Every baseline without a number names its open question
- [ ] Every citation in a set traces to the expert or to a checked source

**Example**: Good: "Baseline: unknown; see Q-001." Bad: a plausible percentage with no source.

**Common Violations**: A satisfaction score filled in to make a diagram render.

---

### 9. Derived artifacts are generated, never edited

**Principle Statement**:
A diagram or an export that derives from the set MUST be generated from the set, and the generator MUST be idempotent. A person MUST NOT edit a generated artifact by hand [CL-C9].

**Rationale**:
A hand-edited derived copy disagrees with its source the first time the source changes.

**Implications**:

- Journey, satisfaction, scenario, lifecycle, release-line, and decision-rights diagrams are generated from front matter.
- Wireframe drawings are the one hand-written exception, because they are source, not derived. The validator checks that their marks match the sketch they draw.

**Validation Gates**:

- [ ] Running the generator twice on an unchanged set changes nothing
- [ ] The generator's check mode reports no gaps on the reference set

**Example**: Good: a renamed stage appears in every diagram after one run. Bad: a diagram corrected by hand that the next run overwrites.

**Common Violations**: Committing a document change without regenerating its diagrams.

---

## III. integration principles

### 10. Parts communicate through the document set and declared contracts

**Principle Statement**:
The product's parts MUST exchange information only through the document set and its schemas, or through a declared session-state contract. A part MUST NOT depend on another part's internals [CL-C3] [CL-C10].

**Rationale**:
The interview, the reviewers, the pane, the validator, and the export change at different rates. A file contract lets each change without the others.

**Implications**:

- The pane's session state has a typed contract, and its shape tag changes whenever the state changes [CL-C10].
- Scripts share code only where the contract demands it, such as the front-matter reader that the validator and the diagram generator both use.

**Validation Gates**:

- [ ] Each part can be tested alone against a copy of the reference set
- [ ] A change to the session state bumps its shape tag

**Example**: Good: the pane rescans the set after a write, and reads only front matter. Bad: the pane reads an interview's in-memory answers.

**Common Violations**: A script that parses another script's output text instead of the set.

---

### 11. Optional tools degrade, they do not break

**Principle Statement**:
A capability that needs an outside tool, such as a diagram renderer, MUST report what is missing and skip that step. It MUST NOT stop the user's main work [CL-C11].

**Rationale**:
The expert's interview must not fail because a drawing tool is not installed.

**Implications**:

- Without a diagram renderer, the diagram tests skip, and a skip passes [CL-C11].
- The text form of every diagram and wireframe stays readable on its own.

**Validation Gates**:

- [ ] Each outside tool is named in the documentation with what it enables
- [ ] The test suite passes, with skips, when an optional tool is missing

**Example**: Good: the export embeds a diagram when its image exists and keeps the text when it does not. Bad: the validator fails because a renderer is absent.

**Common Violations**: An import of an optional library at the top level of a required script.

---

## IV. quality attributes

### 12. Respond at the pace of a conversation

**Principle Statement**:
The product MUST answer within the time a person keeps their train of thought, and MUST stay workable at the size real products reach [NFRD-C4].

**Rationale**:
An expert who waits stops answering. A set that slows at 100 requirements fails the products that need it most.

**Performance Targets** (from the PRD):

- **Next question**: under 20 seconds at p95, and under 60 seconds at p99
- **One grading pass**: under 90 seconds at p95 for one section
- **Set size**: 120 functional requirements, 10 journeys of 10 stages, and 200 glossary terms

**Validation Gates**:

- [ ] Each target is measured per release, as the PRD's measurement states
- [ ] The validator and the generators run on a set at the target size

**Example**: Good: the validator checks the whole reference set in under a second. Bad: a check that rereads every file once per reference.

**Common Violations**: Work that grows with the square of the set size on a hot path.

---

### 13. Work survives interruption

**Principle Statement**:
No answer the expert gives MUST be lost when a session ends or the product is unavailable, and a set MUST stay readable without the product [NFRD-C5].

**Rationale**:
Experts work in short sessions over weeks. Losing an answer means asking twice, which the PRD forbids.

**Availability Targets** (from the PRD):

- **Answers lost**: zero, on every interruption
- **Resume**: within 1 minute at p95 and within 3 minutes at p99
- **Readability**: 100% of a set readable without the product

**Validation Gates**:

- [ ] Each answer is written into the set before the next question
- [ ] A set opens and reads in a plain text editor

**Example**: Good: after a week away, the next question is the first unanswered one. Bad: a resumed interview that asks the opening questions again.

**Common Violations**: Holding a section's answers only in the conversation until the section is drafted.

---

### 14. Accessible to everyone who reads it

**Principle Statement**:
Everything the expert and the approver read MUST be usable with a screen reader and without a mouse [NFRD-C6].

**Rationale**:
Domain experts and approvers include people who use assistive technology. A PRD they cannot read is not approved by them.

**Implications**:

- The pane's controls work from the keyboard.
- Wireframes are text first, so a screen reader reads the sketch.
- Exports carry real headings and table structure.

**Validation Gates**:

- [ ] Zero level-A or level-AA failures on the golden-thread path, checked each release
- [ ] One screen-reader pass of the golden-thread journey per release

**Example**: Good: a grade opens with the keyboard. Bad: a diagram whose meaning exists only in color.

**Common Violations**: A control that only responds to a click.

---

### 15. Design for change within a major version

**Principle Statement**:
A set written by an earlier version MUST stay readable and gradable by a later version within the same major version [NFRD-C7]. A new field MUST be optional unless the change is recorded as breaking.

**Rationale**:
Customers keep sets for years. A minor upgrade that fails their sets breaks the promise in principle 6.

**Implications**:

- New schema fields arrive as optional. A rule that becomes required is named in the release notes as breaking.
- Every change to a document kind follows the one change list in the repository's conventions [CL-C5].

**Validation Gates**:

- [ ] The release notes name every breaking change
- [ ] The previous release's reference set still validates, or the break is recorded

**Example**: Good: a new optional field and a warning while a section is a draft. Bad: a new required field that fails every existing set.

**Common Violations**: Renumbering an identifier that other documents cite.

---

## V. development practices

### 16. Test before every pull request, including what you can only see

**Principle Statement**:
Every change MUST pass the full check list before a pull request: the plugin validation, the pane tests, the script tests, the validator on both shipped sets, the diagram check, and the export [CL-C12]. Rendered diagrams and printed pages MUST be looked at, not only parsed [CL-C13].

**Rationale**:
A diagram can parse and still drop steps, print escape codes, or shrink below a readable size. The visual check has found faults that no test caught [CL-C13].

**Implications**:

- Each new validator check has a test that breaks a copy of the reference set and expects the error or warning.
- Each changed script is run with awkward input, such as names that hold brackets, quotes, semicolons, or angle brackets.

**Validation Gates**:

- [ ] All automated checks pass
- [ ] Each changed diagram was rendered and viewed

**Example**: Good: a label escape tested with a name that holds `#` and `;`. Bad: a release cut from a branch whose tests were not run.

**Common Violations**: Fixing a test by loosening its expectation.

---

### 17. Change through review, release from main, keep versions in step

**Principle Statement**:
Every change MUST go through a branch and a pull request. Releases MUST be cut from `main` after the merge, and the product's version and its own PRD's version MUST match [CL-C14].

**Rationale**:
prd-forge's own PRD is its reference set and its test data. When the two versions differ, nobody can tell which PRD a release meets.

**Implications**:

- A version bump updates the plugin manifest, the PRD root, and the PRD's change log together, and a test fails when they differ.
- After a change to journeys, scenarios, the release plan, decision rights, or wireframes, the diagrams and the export are regenerated and committed.

**Validation Gates**:

- [ ] The plugin version equals the reference PRD's version
- [ ] The release tag points at a merge commit on `main`

**Example**: Good: version 0.8.0 in the manifest, the PRD root, and a change log entry. Bad: a release tagged from a feature branch.

**Common Violations**: A direct push to `main`.

---

## VI. exception process

### Requesting architecture exceptions

Principles are mandatory unless the product owner approves a documented exception. Principle 4 has no exceptions.

**Valid Exception Reasons**:

- A host platform limit that prevents compliance
- A legal requirement of a customer
- A transitional state during a migration between major versions
- A spike with a defined end date

**Exception Request Requirements**:

- [ ] The principle, and why it cannot be met
- [ ] The alternative and any compensating control
- [ ] An expiry date and the plan to comply

**Approval Process**:

1. Open an issue that names the principle and the exception.
2. The product owner approves or rejects it in the issue.
3. Record an approved exception in the pull request that uses it, and in the change log of the affected document set when the set is affected.
4. Review open exceptions each quarter.

---

## VII. governance and compliance

### Architecture review gates

**Before a pull request**:

- [ ] Principles 1, 7, 15, and 16 checked for the change
- [ ] Any exception approved and recorded

**Before a release**:

- [ ] Principle 4's outbound-destination review done
- [ ] Principle 17's versions in step
- [ ] Release notes name every breaking change

**Before a PRD is final**:

- [ ] Principle 3: every never-delegated decision made by its named person
- [ ] Principle 5: every grade has its reasons

### Enforcement

- The validator and the test suites enforce principles 1, 7, 9, 15, 16, and 17 where a script can.
- Pull request review enforces the rest.
- Violations are fixed before release.

---

## VIII. appendix

### Principle summary checklist

| Principle | Category | Criticality | Validation |
|-----------|----------|-------------|------------|
| 1. Specify the outcome, never the mechanism | Business | CRITICAL | Five tests, validator |
| 2. Work where the person already works | Business | HIGH | No install or sign-in step |
| 3. A person decides; an agent proposes | Business | CRITICAL | Read-only reviewers, recorded overrides |
| 4. Security and privacy by design | Technology | CRITICAL | Outbound-destination review per release |
| 5. Every judgement explains itself | Application | HIGH | Reasons file per grade |
| 6. The document set is the single source of truth | Data | CRITICAL | Set readable in a text editor |
| 7. Every document is checked against its kind | Data | HIGH | Validator, schema tests |
| 8. No invented facts | Data | CRITICAL | Open question per unknown |
| 9. Derived artifacts are generated, never edited | Data | MEDIUM | Idempotent generator, check mode |
| 10. Parts communicate through the set and contracts | Application | HIGH | Isolated tests, shape tag |
| 11. Optional tools degrade, they do not break | Technology | MEDIUM | Tests skip without the tool |
| 12. Respond at the pace of a conversation | Technology | HIGH | Timed observations per release |
| 13. Work survives interruption | Technology | CRITICAL | Zero answers lost |
| 14. Accessible to everyone who reads it | Application | HIGH | Screen-reader pass per release |
| 15. Design for change within a major version | Application | MEDIUM | Breaking changes named |
| 16. Test before every pull request | Technology | HIGH | Full check list, visual check |
| 17. Review, release from main, versions in step | Technology | HIGH | Version test, tag on merge commit |

### Template principles not adopted

| Template principle | Why it does not apply to prd-forge |
|--------------------|------------------------------------|
| Scalability and elasticity | No server or shared capacity. Set size is covered by principle 12. |
| Asynchronous communication | No services exchange messages. Parts share files (principle 10). |
| Infrastructure as code | No infrastructure. The plugin installs from its repository. |
| Continuous deployment pipeline | No deployment. Releases are tagged commits that users install (principle 17). |
| Data quality and lineage for pipelines | No data pipelines. Lineage is the front-matter links (principles 6 and 9). |

### Consistency check

No two principles conflict. Principle 1 bans technology in the PRD, and these principles and the other ArcKit documents name technology, because they describe how the product meets the PRD. Principle 9 bans hand edits to derived artifacts, and it names wireframe drawings as source, not derived.

---

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-10-27 | ArcKit AI | Initial draft from the repository conventions and prd-forge's PRD 0.8.0 |

## External references

> This section provides traceability from generated content back to source documents.

### Document register

| Doc ID | Filename | Type | Source Location | Description |
|--------|----------|------|-----------------|-------------|
| CL | CLAUDE.md | Engineering conventions | Repository root | Commands, architecture, and working conventions |
| BND | boundaries.md | Product rules | `skills/prd-wizard/reference/` | What a PRD is and is not, and the five tests |
| CON | 10-constraints.md | PRD section 9 | `docs/prd/prd-forge/` | Constraints C-001 to C-004 |
| DRR | 11-decision-rights.md | PRD section 10 | `docs/prd/prd-forge/` | Decision rules TR-001 to TR-013 |
| NFRD | 09-nonfunctional-requirements.md | PRD section 8 | `docs/prd/prd-forge/` | NFR-001 to NFR-012 |

### Citations

| Citation ID | Doc ID | Page/Section | Category | Quoted Passage |
|-------------|--------|--------------|----------|----------------|
| CL-C1 | CL | Working conventions | Practice | "Work on a branch and open a PR. Cut releases from `main` after the merge." |
| CL-C2 | CL | The document set is the data model | Data | "`grades/<file>` holds the reasons for each grade." |
| CL-C3 | CL | The document set is the data model | Data | "The pane, the validator, and the export read only the front matter to navigate." |
| CL-C4 | CL | Validator rules follow the guides | Data | "Each section guide's blocking defects are checked by `structural()`" |
| CL-C5 | CL | To add a document kind | Practice | "To add a document kind, change all of these" |
| CL-C6 | CL | Validator rules follow the guides | Data | "a warning while the section is a draft, an error at `review` or `final`." |
| CL-C7 | CL | The YAML reader is a subset | Data | "`prd-validate.test.mjs` compares its output with PyYAML for every shipped document." |
| CL-C8 | CL | PRD content rules | Data | "A stage's `satisfaction` (1 to 5) and a scenario's `priority` come only from the expert; never estimate them." |
| CL-C9 | CL | Diagrams | Data | "Never edit a generated `.mmd` file." |
| CL-C10 | CL | The mod | Integration | "Bump the `shape` tag on the `set` atom whenever `PrdSet` changes." |
| CL-C11 | CL | Commands | Integration | "Without `mmdc`, the diagram tests skip, and a skip passes." |
| CL-C12 | CL | Working conventions | Practice | "Before you open a PR, run every command in the commands section above." |
| CL-C13 | CL | Working conventions | Practice | "A diagram can parse and still drop steps, print escape codes, or shrink below a readable size" |
| CL-C14 | CL | Working conventions | Practice | "prd-forge's own PRD carries the plugin's version." |
| BND-C1 | BND | Opening | Business | "It does not say **how** to build it." |
| BND-C2 | BND | The conversion move | Business | "hand it over at the end as **candidate ADR topics**." |
| BND-C3 | BND | The five tests | Business | "It does not name the component or the technology that delivers it." |
| CON-C1 | CON | Front matter | Constraint | Constraints C-001 to C-004 |
| CON-C2 | CON | C-001 | Constraint | "There is no separate application for them to open, install or log into." |
| CON-C3 | CON | C-003 | Constraint | "is not sent anywhere beyond the assistant session they are already using" |
| CON-C4 | CON | C-002 | Constraint | "The output is plain text documents the organisation stores wherever it already stores documents." |
| CON-C5 | CON | C-004 | Constraint | "No regulation, standard, clause or statistic is stated as fact unless the expert supplied it" |
| DRR-C1 | DRR | Front matter | Business | Ten of TR-001 to TR-013 are `never_delegated: true` |
| DRR-C2 | DRR | TR-003 | Business | "Accept or refute a section's score against its rubric" |
| DRR-C3 | DRR | TR-005 | Business | "State a domain fact, figure, regulation or citation as true" |
| NFRD-C1 | NFRD | NFR-008, NFR-012 | Security | Targets "zero" for added destinations and for unauthorized readers |
| NFRD-C2 | NFRD | NFR-007 | Observability | "An expert can tell why a section received the score it did, after the fact." |
| NFRD-C3 | NFRD | NFR-004, NFR-010 | Data | "100%, for as long as the organisation retains the set; no expiry imposed by us" |
| NFRD-C4 | NFRD | NFR-001 to NFR-003 | Performance | "under 20 seconds at p95, and under 60 seconds at p99" |
| NFRD-C5 | NFRD | NFR-004, NFR-011 | Availability | "Zero answers lost, on every interruption" |
| NFRD-C6 | NFRD | NFR-006 | Accessibility | "zero level-A or level-AA violations on the golden-thread path" |
| NFRD-C7 | NFRD | NFR-009 | Supportability | "100% within a major version" |

### Unreferenced documents

| Filename | Source Location | Reason |
|----------|-----------------|--------|
| policies/README.md | `docs/projects/000-global/policies/` | No organization policies exist yet |

---

**Generated by**: ArcKit `/arckit:principles` command
**Generated on**: 2026-10-27
**ArcKit Version**: 6.18.3
**Project**: prd-forge global principles (Project 000)
**Model**: Claude Opus 5.5 (claude-opus-5-5)
