# Stakeholder drivers and goals analysis: prd-forge

> **Template Origin**: Official | **ArcKit Version**: 6.18.3 | **Command**: `/arckit:stakeholders`

## Document control

| Field | Value |
|-------|-------|
| **Document ID** | ARC-001-STKE-v1.0 |
| **Document Type** | Stakeholder Drivers and Goals Analysis |
| **Project** | prd-forge (Project 001) |
| **Classification** | PUBLIC |
| **Status** | DRAFT |
| **Version** | 1.0 |
| **Created Date** | 2026-10-27 |
| **Last Modified** | 2026-10-27 |
| **Review Cycle** | Monthly |
| **Next Review Date** | 2026-11-26 |
| **Owner** | Richard Hightower, product owner |
| **Reviewed By** | [PENDING] |
| **Approved By** | [PENDING] |
| **Distribution** | prd-forge maintainers and contributors |

## Revision history

| Version | Date | Author | Changes | Approved By | Approval Date |
|---------|------|--------|---------|-------------|---------------|
| 1.0 | 2026-10-27 | ArcKit AI | Initial creation from `/arckit:stakeholders` command | PENDING | PENDING |

---

## Executive summary

### Purpose

This document identifies the stakeholders of prd-forge, their drivers, the goals those drivers become, and the measurable outcomes that show each goal is met. It derives everything from prd-forge's own PRD, version 0.8.0, and from the grades recorded against it. It invents no stakeholder, figure, or baseline that the PRD does not hold.

Two layers of stakeholder exist. The **product layer** is the people who build, fund, and depend on prd-forge itself. The **use layer** is the four personas who meet prd-forge each time an organization writes a PRD with it. The decision rights TR-001 to TR-013 govern the use layer [DRR-C1].

### Key findings

The domain expert, the engineering lead, the sponsor, and the delivery lead want the same thing from different sides: a specification that a team can build from without asking the author again [PER-C1]. The sharpest conflict is time against evidence. Release 1 is due on 2027-03-31, the same day the ten observed experts and the three engineering leads that test its assumptions are due [ARD-C1]. Every baseline that the objectives depend on is still unknown [OM-C1].

### Critical success factors

- An engineering lead estimates from a prd-forge PRD without first interviewing its author (O-001).
- A domain expert with no product training reaches an approved PRD in under 5 working days (O-002).
- The expert trusts the grade because every finding quotes the document and can be refuted (R-001, R-002).
- No domain content leaves the session the expert already uses (C-003).

### Stakeholder alignment score

**Overall Alignment**: MEDIUM

The four personas' goals align. The alignment is MEDIUM, not HIGH, for three reasons. The release date competes with the evidence that would justify it. Three of the four constraints are the product owner's own decisions, which an engineering lead or a customer's policy owner may not accept. And A-002 and A-003, the assumptions that the grade and a technology-free PRD will be accepted, are untested [ARD-C2].

---

## Stakeholder identification

### Internal stakeholders

| Stakeholder | Role/Department | Influence | Interest | Engagement Strategy |
|-------------|----------------|-----------|----------|---------------------|
| Richard Hightower | Product owner; owner of every objective, risk, and open question [OM-C2] | HIGH | HIGH | Active involvement, decision authority |
| prd-forge maintainers | Contributors to the SpillwaveSolutions/prd-forge repository | MEDIUM | HIGH | Pull request review, release notes |

### External stakeholders

| Stakeholder | Organization | Relationship | Influence | Interest |
|-------------|--------------|--------------|-----------|----------|
| Domain expert (PER-001, DomainExpert) | Customer organization | Primary user | MEDIUM | HIGH |
| Engineering lead (PER-002, EngineerLead) | Customer organization | Consumer of the PRD | HIGH | MEDIUM |
| Sponsor or approver (PER-003, Sponsor) | Customer organization | Approver of each PRD | HIGH | MEDIUM |
| Delivery lead (PER-004, DeliveryLead) | Customer organization | Consumer of the PRD for the backlog | MEDIUM | HIGH |
| Practice lead (buyer, segment S-001) | Consultancies and advisory firms | Buyer | HIGH | MEDIUM |
| Head of product or transformation (buyer, segment S-002) | Regulated-industry organizations | Buyer | HIGH | MEDIUM |
| Customer information-policy owner | Customer organization | Authority behind C-003 | HIGH | LOW |
| Assistant platform provider | Host of the session (D-001) | Platform dependency | HIGH | LOW |
| Early customers and professional network | D-002 and D-003 participants | Evidence providers | MEDIUM | MEDIUM |
| Product manager entering a new domain (segment S-003) | Product teams | Weak-fit segment | LOW | LOW |

### UK Government roles

Not applicable. prd-forge is not a UK Government service, and no customer segment in section 2 is a government body [CM-C1].

### Stakeholder Power-Interest Grid

```text
                          INTEREST
              Low                         High
        ┌─────────────────────┬─────────────────────┐
        │                     │                     │
        │   KEEP SATISFIED    │   MANAGE CLOSELY    │
   High │                     │                     │
        │  • Policy owner     │  • Product owner    │
        │  • Platform provider│  • Sponsor          │
        │  • Engineering lead │  • Buyers (S-1, S-2)│
 P      │                     │                     │
 O      ├─────────────────────┼─────────────────────┤
 W      │                     │                     │
 E      │      MONITOR        │    KEEP INFORMED    │
 R      │                     │                     │
   Low  │  • Product managers │  • Domain expert    │
        │    (S-003)          │  • Delivery lead    │
        │                     │  • Maintainers      │
        │                     │  • Early customers  │
        └─────────────────────┴─────────────────────┘
```

| Stakeholder | Power | Interest | Quadrant | Engagement Strategy |
|-------------|-------|----------|----------|---------------------|
| Product owner | HIGH | HIGH | Manage Closely | Owns every decision record and release |
| Sponsor (PER-003) | HIGH | MEDIUM | Manage Closely | Approval pack per PRD version |
| Buyers (S-001, S-002) | HIGH | MEDIUM | Manage Closely | Outcome evidence from the pilot |
| Engineering lead (PER-002) | HIGH | MEDIUM | Keep Satisfied | Cold read of a finished set (D-003) |
| Customer policy owner | HIGH | LOW | Keep Satisfied | Statement of where content goes, per release |
| Assistant platform provider | HIGH | LOW | Keep Satisfied | Track platform changes that affect D-001 |
| Domain expert (PER-001) | MEDIUM | HIGH | Keep Informed | The product itself: teaching, interview, grades |
| Delivery lead (PER-004) | MEDIUM | HIGH | Keep Informed | Derived backlog in release 2 |
| Maintainers | MEDIUM | HIGH | Keep Informed | Pull requests and release notes |
| Early customers | MEDIUM | MEDIUM | Keep Informed | Observed sessions (D-002) |
| Product managers (S-003) | LOW | LOW | Monitor | None until the segment is sized (Q-004) |

The engineering lead sits in Keep Satisfied, not Manage Closely, because no engineering lead acts in release 1. Section 6 defers the lead's confirmation to release 2 [SC-C1].

**Quadrant Interpretation:**

- **Manage Closely** (High Power, High Interest): Key decision-makers requiring active engagement
- **Keep Satisfied** (High Power, Low Interest): Influential stakeholders needing periodic updates
- **Keep Informed** (Low Power, High Interest): Engaged stakeholders needing regular communication
- **Monitor** (Low Power, Low Interest): Minimal engagement required

---

## Stakeholder drivers analysis

### SD-1: Domain expert - Get what is in their head into a buildable form

**Stakeholder**: Domain expert specifying software for their own field (PER-001)

**Driver Category**: OPERATIONAL

**Driver Statement**: "Get what is in my head into a form the development team can build from", and "Stop being asked the same question by four different engineers" [PER-C1].

**Context & Background**: The expert is deep in their domain, often for decades, with no product management training and no familiarity with MoSCoW or Given/When/Then [PER-C2]. They work on a PRD intensively for one to three weeks per product.

**Driver Intensity**: CRITICAL

**Enablers**:

- Teaching before each question, in their own vocabulary
- One or two questions at a time, and an honest record of what they do not know

**Blockers**:

- An interview too long to finish (R-004)
- Being asked an answered question again after a break

**Related Stakeholders**: Engineering lead (SD-2), who receives the result.

---

### SD-2: Domain expert - Not be the reason the project is late

**Stakeholder**: Domain expert (PER-001)

**Driver Category**: PERSONAL

**Driver Statement**: "Not be the reason the project is late" [PER-C1].

**Context & Background**: The expert's name is on the specification. A PRD that a team cannot build from comes back to them, and a wrong citation exposes them professionally (C-004).

**Driver Intensity**: HIGH

**Enablers**:

- Seeing their own weak spots before anyone estimates (FR-012)
- Unknown facts recorded as open questions, never invented

**Blockers**:

- A high grade on a weak document (R-001)

**Related Stakeholders**: Sponsor (SD-4), who commits to a date on the strength of the PRD.

---

### SD-3: Engineering lead - Estimate without interviewing the author

**Stakeholder**: Engineering lead who must build from the PRD (PER-002)

**Driver Category**: OPERATIONAL

**Driver Statement**: "Estimate without first interviewing the author", and "Find out now, not in iteration three, what the document does not say" [PER-C3].

**Context & Background**: The lead is expert in delivery and usually knows nothing about the domain. Their pains are specifications that name a technology, requirements nobody can test, and gaps between two requirements that both looked complete [PER-C3].

**Driver Intensity**: CRITICAL

**Enablers**:

- Every requirement passes the five tests
- A buildability review before estimation

**Blockers**:

- Reading a technology-free PRD as incomplete (A-003)

**Related Stakeholders**: Domain expert (SD-1), whose words the lead builds from.

---

### SD-4: Sponsor - Commit budget and a date with confidence

**Stakeholder**: Sponsor or approver (PER-003)

**Driver Category**: RISK

**Driver Statement**: "Be confident enough to commit budget and a date", and "Know what is still undecided, and who is deciding it" [PER-C4].

**Context & Background**: The sponsor is senior in the business, not in product or engineering. Today they can only judge whether a PRD reads well, and they learn it was not buildable after they commit [PER-C4].

**Driver Intensity**: HIGH

**Enablers**:

- One page with what is approved, what is open, and who owns each open item (FR-013)
- Approval with conditions against a named version (FR-014)

**Blockers**:

- A machine-produced grade that lowers their confidence instead of raising it (Q-005)

**Related Stakeholders**: Buyers (SD-6), who fund the work the sponsor approves.

---

### SD-5: Delivery lead - Start the workshop with a backbone

**Stakeholder**: Delivery lead running the story-mapping workshop (PER-004)

**Driver Category**: OPERATIONAL

**Driver Statement**: "Walk into the workshop with a backbone already agreed", and "Trace every story back to something the expert actually said" [PER-C5].

**Context & Background**: Without a journey, the workshop invents a backbone in the room, and stories trace to nothing [PER-C5].

**Driver Intensity**: MEDIUM (release 1 does not serve this stakeholder; release 2 does)

**Enablers**:

- A golden-thread journey in every PRD
- Requirement ids that stories can cite

**Blockers**:

- A backlog derived from a PRD with no journey

**Related Stakeholders**: Engineering lead (SD-3), who shares the need for traceability.

---

### SD-6: Buyers - Pay for outcomes, not hours

**Stakeholder**: Practice lead (S-001) and head of product or transformation (S-002)

**Driver Category**: FINANCIAL

**Driver Statement**: For S-001, "the comparison is billable hours saved". For S-002, the cost is "compared against contracting a product manager for the engagement" [CM-C2].

**Context & Background**: The buyer already pays for the expert's time or for a contracted product manager. prd-forge must cost less than those, or deliver more.

**Driver Intensity**: HIGH

**Enablers**:

- Evidence from the pilot that time to approval falls (O-002)

**Blockers**:

- Segment sizes still unknown (Q-004)

**Related Stakeholders**: Sponsor (SD-4).

---

### SD-7: Customer policy owner - Keep domain content inside the boundary

**Stakeholder**: The customer organization's information-policy owner

**Driver Category**: COMPLIANCE

**Driver Statement**: Content an expert enters about their domain is not sent anywhere beyond the session they already use, and is not retained outside the documents (C-003) [CON-C1].

**Context & Background**: Experts describe unreleased products and regulated domains. A-004 assumes organizations will let a specification be drafted inside an assistant session at all [ARD-C2].

**Driver Intensity**: CRITICAL

**Enablers**:

- Zero additional destinations for domain content (NFR-008)
- Plain-text documents stored where the organization already stores documents (C-002)

**Blockers**:

- Any telemetry or remote copy of content

**Related Stakeholders**: Buyers (SD-6), who cannot buy what the policy owner blocks.

---

### SD-8: Product owner - Prove the method before scaling it

**Stakeholder**: Richard Hightower, product owner

**Driver Category**: STRATEGIC

**Driver Statement**: Show that a domain expert with no product training can reach a PRD an engineering lead confirms is buildable [ROOT-C2], and test the assumptions under that bet before building for more than one author [RP-C1].

**Context & Background**: The product owner owns all three objectives, every risk, and every open question [OM-C2]. Release 3 waits for evidence that one author's path works.

**Driver Intensity**: CRITICAL

**Enablers**:

- Ten observed first-time experts (D-002) and three cold reads by engineering leads (D-003)

**Blockers**:

- Both evidence dependencies due on the release date itself [ARD-C1]

**Related Stakeholders**: Early customers (SD-9).

---

### SD-9: Early customers - Influence a tool they will use

**Stakeholder**: Early customers and the professional network (D-002, D-003)

**Driver Category**: CUSTOMER

**Driver Statement**: Shape a method that fits their domain before it is fixed.

**Context & Background**: The PRD records their participation as requested, not committed [ARD-C1]. Their motivation is an inference from that request, not a stated fact.

**Driver Intensity**: MEDIUM

**Enablers**:

- Short, scheduled sessions with a visible result

**Blockers**:

- No named party who has confirmed

**Related Stakeholders**: Product owner (SD-8).

---

## Driver-to-Goal mapping

### Goal G-1: 80% of PRDs pass the buildability review on first submission by 2027-09-30

**Derived From Drivers**: SD-1, SD-2, SD-3, SD-8

**Goal Owner**: Product owner

**Goal Statement**: 80% of PRDs pass an engineering buildability review on first submission by 2027-09-30, measured on the pilot PRDs (PRD O-001) [OM-C3].

**Why This Matters**: The engineering lead estimates without re-deriving the PRD, and the expert stops being the cause of the clarification loop.

**Success Metrics**:

- **Primary Metric**: Share of PRDs that pass the eleven derivability checks on first submission
- **Secondary Metrics**:
  - Number of clarification questions an engineering lead asks before estimating
  - Number of gaps the review finds per PRD

**Baseline**: Unknown. Q-001 will establish it by 2027-03-31 [OQ-C1].

**Target**: 80%

**Measurement Method**: The buildability review run on each pilot PRD, with the engineering leads from D-003.

**Dependencies**:

- D-003, three engineering leads for cold reads
- Q-009, where the derivability checks live and who owns them

**Risks to Achievement**:

- The pass condition is not yet defined: whether `buildable with gaps` counts as a pass (grade of section 3)
- A-003: a lead reads a technology-free PRD as incomplete

---

### Goal G-2: An expert reaches an approved PRD in under 5 working days by 2027-09-30

**Derived From Drivers**: SD-1, SD-6, SD-8

**Goal Owner**: Product owner

**Goal Statement**: The median elapsed working days from the first interview question to a recorded approval is under 5 for a single-journey product, by 2027-09-30 (PRD O-002) [OM-C3].

**Why This Matters**: The buyer compares cost against hours or a contracted product manager. Days, not weeks, is the case for buying.

**Success Metrics**:

- **Primary Metric**: Median working days from the first question to approval
- **Secondary Metrics**:
  - Sections completed per sitting (Q-006)
  - Share of sets abandoned before approval

**Baseline**: Unknown. Q-002 will establish it by 2027-03-31.

**Target**: Under 5 working days

**Measurement Method**: Dates from the set's change log and approval record.

**Dependencies**:

- D-002, ten observed first-time experts
- Q-011, how an approver records a decision

**Risks to Achievement**:

- R-004: the interview is too long to finish
- Q-002 measures from "a product idea", and the metric starts at the first question, so the baseline may not compare

---

### Goal G-3: 95% of `must` requirements are testable as written by 2027-09-30

**Derived From Drivers**: SD-3, SD-2

**Goal Owner**: Product owner

**Goal Statement**: An engineer who was not in the interview judges 95% of `must` requirements testable as written, by 2027-09-30 (PRD O-003) [OM-C3].

**Why This Matters**: Testable requirements remove the lead's "requirements I cannot write a test for" pain.

**Success Metrics**:

- **Primary Metric**: Share of `must` requirements judged testable
- **Secondary Metrics**:
  - Share of acceptance criteria in Given/When/Then form, which the validator checks

**Baseline**: Unknown. Q-003 will establish it by 2027-03-31.

**Target**: 95%

**Measurement Method**: Three engineering leads score each requirement independently (Q-003's method).

**Dependencies**:

- D-003

**Risks to Achievement**:

- No rule yet combines three raters' scores into one judgement

---

### Goal G-4: Zero domain content leaves the expert's session, every release

**Derived From Drivers**: SD-7, SD-6

**Goal Owner**: Product owner

**Goal Statement**: Each release adds zero destinations for domain content, from release 1 onward (C-003, NFR-008) [CON-C1].

**Why This Matters**: Without it, the policy owner blocks adoption and the buyer cannot buy.

**Success Metrics**:

- **Primary Metric**: Outbound destinations for domain content added in the release
- **Secondary Metrics**:
  - Read paths to a set that bypass the organization's own permissions (NFR-012)

**Baseline**: Zero, by design. The product holds no service of its own.

**Target**: Zero

**Measurement Method**: A review of every outbound destination per release, recorded against C-003.

**Dependencies**:

- D-001, the host session

**Risks to Achievement**:

- A-004: an organization refuses assistant sessions for specification work altogether

---

### Goal G-5: Every grade is evidence the expert can check, from release 1

**Derived From Drivers**: SD-2, SD-4, SD-8

**Goal Owner**: Product owner

**Goal Statement**: From release 1, every grading finding quotes the document, every finding the expert refutes is withdrawn, and the reasons for every grade can be read after the fact (TR-003, NFR-007, FR-016).

**Why This Matters**: R-001 and R-002 are the two high-likelihood, high-impact risks. A grade nobody trusts is decoration (A-002) [ARD-C2].

**Success Metrics**:

- **Primary Metric**: Share of findings with a quotation from the document
- **Secondary Metrics**:
  - Share of refuted findings that survive into the next report

**Baseline**: Not measured. The reference set's grades file each finding with a quotation, which shows the method works on one set.

**Target**: 100% quoted; zero refuted findings surviving

**Measurement Method**: Review of the grades files for the pilot PRDs.

**Dependencies**:

- Q-009, where the rubric lives and who owns it

**Risks to Achievement**:

- R-002: the reviewer reports findings that are not in the document

---

### Goal G-6: Every derived story names its requirement, by release 2

**Derived From Drivers**: SD-5, SD-3

**Goal Owner**: Product owner

**Goal Statement**: By REL-002's indicative date of 2027-06-30, every story derived from a pilot PRD names the requirement id it came from [RP-C2].

**Why This Matters**: Stories that trace to nothing are the delivery lead's main pain.

**Success Metrics**:

- **Primary Metric**: Share of derived stories that cite a requirement id

**Baseline**: Not measured.

**Target**: 100%

**Measurement Method**: The validator's trace check on the derived backlog set.

**Dependencies**:

- Release 1's exit criteria met

**Risks to Achievement**:

- REL-002 lists no requirements yet (grade of section 13)

---

## Goal-to-Outcome mapping

### Outcome OC-1: Specifications built from without a clarification loop

**Supported Goals**: G-1, G-3

**Outcome Statement**: Engineering teams estimate and build from prd-forge PRDs without first returning to the author.

**Measurement Details**:

- **KPI**: First-submission pass rate of the buildability review
- **Current Value**: Unknown (Q-001)
- **Target Value**: 80%
- **Measurement Frequency**: Per pilot PRD, reported quarterly
- **Data Source**: Buildability review reports and engineering-lead cold reads
- **Report Owner**: Product owner

**Business Value**:

- **Financial Impact**: Fewer engineering hours spent re-deriving a specification. Not yet quantified (grade of section 1).
- **Strategic Impact**: The product's central claim, "why we win" in section 2, is proven or disproven [CM-C3].
- **Operational Impact**: Estimation starts at the first reading.
- **Customer Impact**: The expert is no longer the bottleneck.

**Timeline**:

- **Phase 1 (to 2027-03-31)**: Baseline from Q-001; release 1 ships
- **Phase 2 (to 2027-06-30)**: Pilot PRDs reviewed
- **Phase 3 (to 2027-09-30)**: 80% target assessed
- **Sustainment**: Reviewed per release

**Stakeholder Benefits**:

- **Engineering lead**: Estimates without interviewing the author
- **Domain expert**: Stops answering the same question four times

**Leading Indicators**:

- Gaps found per PRD by the buildability review before circulation

**Lagging Indicators**:

- Pass rate on first submission

---

### Outcome OC-2: Experts reach approval in days

**Supported Goals**: G-2

**Outcome Statement**: A domain expert reaches an approved PRD for a single-journey product in under 5 working days.

**Measurement Details**:

- **KPI**: Median working days, first question to approval
- **Current Value**: Unknown (Q-002)
- **Target Value**: Under 5
- **Measurement Frequency**: Per pilot PRD
- **Data Source**: Change log and approval dates in each set
- **Report Owner**: Product owner

**Business Value**:

- **Financial Impact**: Compared with billable hours (S-001) or a contracted product manager (S-002). Not yet quantified.
- **Strategic Impact**: The basis of the buyer's decision.
- **Operational Impact**: Specification no longer waits for a product manager.
- **Customer Impact**: The expert finishes inside the window they have.

**Timeline**:

- **Phase 1 (to 2027-03-31)**: Baseline from Q-002
- **Phase 2 (to 2027-06-30)**: Ten observed experts (D-002)
- **Phase 3 (to 2027-09-30)**: Target assessed

**Stakeholder Benefits**:

- **Buyers**: A cost case they can compare
- **Sponsor**: An approval pack sooner

**Leading Indicators**:

- Sections completed per sitting

**Lagging Indicators**:

- Median days to approval

---

### Outcome OC-3: Adoption without a policy exception

**Supported Goals**: G-4

**Outcome Statement**: Customers adopt prd-forge without an exception to their information policy.

**Measurement Details**:

- **KPI**: Outbound destinations for domain content
- **Current Value**: Zero
- **Target Value**: Zero
- **Measurement Frequency**: Per release
- **Data Source**: The outbound-destination review
- **Report Owner**: Product owner

**Business Value**:

- **Financial Impact**: No sale lost to a policy refusal
- **Strategic Impact**: Regulated-industry segment S-002 stays reachable
- **Operational Impact**: No security review per customer for a remote service
- **Customer Impact**: The expert can describe unreleased work

**Timeline**:

- **Every release**: Review recorded against C-003

**Stakeholder Benefits**:

- **Policy owner**: Nothing new to approve
- **Buyers**: No blocker to purchase

**Leading Indicators**:

- Zero findings in each release review

**Lagging Indicators**:

- A-004 confirmed by pilot organizations

---

### Outcome OC-4: Trusted grades

**Supported Goals**: G-5

**Outcome Statement**: Experts act on grades they did not produce, and sponsors gain confidence from them.

**Measurement Details**:

- **KPI**: Share of findings quoted; refuted findings that survive
- **Current Value**: Not measured
- **Target Value**: 100% quoted; zero surviving
- **Measurement Frequency**: Per pilot PRD
- **Data Source**: Grades files
- **Report Owner**: Product owner

**Business Value**:

- **Strategic Impact**: A-002 and Q-005 answered
- **Customer Impact**: The expert sees their weak spots before anyone estimates

**Timeline**:

- **Release 1 onward**: Measured on every pilot PRD

**Stakeholder Benefits**:

- **Domain expert**: A grade they can refute
- **Sponsor**: Evidence behind the number

**Leading Indicators**:

- Refutations accepted in observed sessions

**Lagging Indicators**:

- Sponsors' answer to Q-005

---

### Outcome OC-5: Traceable backlogs

**Supported Goals**: G-6

**Outcome Statement**: Delivery leads run story-mapping workshops from a derived backlog that traces every story to the PRD.

**Measurement Details**:

- **KPI**: Share of stories that cite a requirement id
- **Current Value**: Not measured
- **Target Value**: 100%
- **Measurement Frequency**: Per derived backlog
- **Data Source**: Validator trace check on the backlog set
- **Report Owner**: Product owner

**Business Value**:

- **Operational Impact**: The workshop starts from an agreed backbone

**Timeline**:

- **Release 2 (indicative 2027-06-30)**: First derived backlogs

**Stakeholder Benefits**:

- **Delivery lead**: No backbone invented in the room
- **Engineering lead**: Every story says why it exists

**Leading Indicators**:

- PRDs with a golden-thread journey

**Lagging Indicators**:

- Workshops run without re-deriving features

---

## Complete traceability matrix

### Stakeholder → Driver → Goal → Outcome

| Stakeholder | Driver ID | Driver Summary | Goal ID | Goal Summary | Outcome ID | Outcome Summary |
|-------------|-----------|----------------|---------|--------------|------------|-----------------|
| Domain expert | SD-1 | Buildable form | G-1 | 80% pass first time | OC-1 | No clarification loop |
| Domain expert | SD-1 | Buildable form | G-2 | Under 5 days | OC-2 | Approval in days |
| Domain expert | SD-2 | Not the cause of delay | G-5 | Evidence-backed grades | OC-4 | Trusted grades |
| Engineering lead | SD-3 | Estimate without the author | G-1 | 80% pass first time | OC-1 | No clarification loop |
| Engineering lead | SD-3 | Estimate without the author | G-3 | 95% testable | OC-1 | No clarification loop |
| Sponsor | SD-4 | Commit with confidence | G-5 | Evidence-backed grades | OC-4 | Trusted grades |
| Delivery lead | SD-5 | Backbone for the workshop | G-6 | Stories cite requirements | OC-5 | Traceable backlogs |
| Buyers | SD-6 | Outcomes, not hours | G-2 | Under 5 days | OC-2 | Approval in days |
| Buyers | SD-6 | Outcomes, not hours | G-4 | Zero content leaves | OC-3 | Adoption without exception |
| Policy owner | SD-7 | Content stays inside | G-4 | Zero content leaves | OC-3 | Adoption without exception |
| Product owner | SD-8 | Prove the method | G-1 | 80% pass first time | OC-1 | No clarification loop |
| Product owner | SD-8 | Prove the method | G-5 | Evidence-backed grades | OC-4 | Trusted grades |
| Early customers | SD-9 | Shape the method | G-2 | Under 5 days | OC-2 | Approval in days |

### Conflict analysis

**Competing Drivers**:

- **Conflict 1**: The product owner wants release 1 on 2027-03-31 (SD-8), but the evidence it rests on, D-002 and D-003, is due the same day, so release 1 cannot use the results [ARD-C1].
  - **Resolution Strategy**: Decide whether release 1 moves or ships knowingly as an experiment. The release plan names this as a decision for the sponsor at TR-001 [RP-C1]. No open question records it yet, and the grade of section 12 asks for one.

- **Conflict 2**: The expert's priority split (10 `must`, 8 `should`) serves the 60% `must` guideline, but ST-001, ST-003, and ST-004 cannot pass their own acceptance without FR-002, FR-008, and FR-011, which are `should` (grade of section 7) [GR-C1].
  - **Resolution Strategy**: The expert decides (TR-004): raise the three to `must`, which brings `must` to 72%, or change the three stages' acceptance.

- **Conflict 3**: Three constraints, C-001 to C-003, are the product owner's own decisions [CON-C2]. An engineering lead (SD-3) wants to know which decisions are theirs, and a customer's policy owner (SD-7) may impose stricter rules than C-003.
  - **Resolution Strategy**: Move C-001 and C-002 to section 6 as scope decisions, and name the outside policy behind C-003 or record it as an assumption (grade of section 9). The product owner decides.

- **Conflict 4**: The sponsor wants a grade that raises confidence (SD-4), and R-001 says a high grade on a weak PRD is false assurance [ARD-C2].
  - **Resolution Strategy**: Present the grade as evidence, never a warrant (a non-goal in section 6), with every finding quoted (G-5). Q-005 tests the sponsor's response by 2027-01-31.

**Synergies**:

- **Synergy 1**: The domain expert's SD-1 and the engineering lead's SD-3 both want fewer clarification questions. G-1 satisfies both.
- **Synergy 2**: The engineering lead's SD-3 and the delivery lead's SD-5 both want traceability from work back to what the expert said. Requirement ids serve both.
- **Synergy 3**: The policy owner's SD-7 and the buyers' SD-6 align: plain-text documents in the customer's own store (C-002) cost nothing new to approve.

---

## Communication & engagement plan

### Stakeholder-Specific messaging

#### Domain expert (PER-001)

**Primary Message**: You can write a PRD a team can build from, and see where it is weak before anyone estimates.

**Key Talking Points**:

- Each section is taught before you are asked about it
- You are never asked the same question twice
- Every grade quotes your document, and you can refute it

**Communication Frequency**: Continuous, inside the session

**Preferred Channel**: The interview and the pane beside it

**Success Story**: An approved set in under a week, with no question asked twice.

#### Engineering lead (PER-002)

**Primary Message**: The PRD says what and why. The how is yours.

**Key Talking Points**:

- Every requirement has a pass-or-fail test
- The buildability review reports gaps before you estimate
- Technology preferences arrive as candidate decision records

**Communication Frequency**: Per PRD, at estimation

**Preferred Channel**: The exported PRD and its buildability report

**Success Story**: An estimate with no clarification meeting.

#### Sponsor (PER-003)

**Primary Message**: You see what you approve, what is open, and who owns each open item, on one page.

**Key Talking Points**:

- Approve, approve with conditions, or reject, against a named version
- The grade is evidence, not a warrant

**Communication Frequency**: Once per PRD version

**Preferred Channel**: The root document and the approval pack

**Success Story**: A commitment to budget and date that holds.

#### Delivery lead (PER-004)

**Primary Message**: Release 2 derives your backbone and stories from the approved PRD.

**Key Talking Points**:

- Features come from journey stages; stories cite requirement ids

**Communication Frequency**: Per release

**Preferred Channel**: The derived backlog set

**Success Story**: A workshop that starts from an agreed backbone.

#### Buyers (S-001, S-002)

**Primary Message**: Days to an approved specification, against weeks today.

**Key Talking Points**:

- Pilot results for O-002, with the baseline from Q-002

**Communication Frequency**: Quarterly during the pilot

**Preferred Channel**: Pilot summary report

**Success Story**: A measured drop in time to approval.

#### Customer policy owner

**Primary Message**: Domain content stays in the session and in your documents.

**Key Talking Points**:

- Zero added destinations, reviewed per release
- No product-held copy of anything

**Communication Frequency**: Per release

**Preferred Channel**: Release notes section on data handling

**Success Story**: Adoption with no policy exception.

#### Product owner and maintainers

**Primary Message**: Every change keeps the reference PRD valid and the versions in step.

**Key Talking Points**:

- Branch, pull request, release from `main`

**Communication Frequency**: Per pull request

**Preferred Channel**: GitHub pull requests and releases

**Success Story**: A release with every check passing.

---

## Change impact assessment

### Impact on Stakeholders

| Stakeholder | Current State | Future State | Change Magnitude | Resistance Risk | Mitigation Strategy |
|-------------|---------------|--------------|------------------|-----------------|---------------------|
| Domain expert | Writes a feature list, answers questions for weeks | Interviewed section by section, graded | HIGH | MEDIUM | Teach before asking; keep sittings short |
| Engineering lead | Re-derives the PRD before estimating | Estimates from a reviewed PRD | MEDIUM | MEDIUM | Cold reads in D-003; candidate decision records |
| Sponsor | Judges on readability | Judges on evidence and open items | MEDIUM | LOW | One-page approval pack |
| Delivery lead | Invents the backbone in the workshop | Starts from a derived backbone | MEDIUM | LOW | Release 2 |
| Policy owner | Reviews new tools case by case | Nothing new leaves the session | LOW | MEDIUM | Per-release data statement |

### Change readiness

**Champions**:

- Product owner - owns the method and every objective

**Fence-sitters**:

- Sponsor - convinced if a graded PRD raises confidence (Q-005)
- Engineering lead - convinced if a technology-free PRD reads as disciplined (Q-008)

**Resisters**:

- Customer policy owner - may refuse assistant sessions for specification work (A-004) - publish the data-handling statement before the pilot

---

## Risk Register (Stakeholder-Related)

### Risk SR-1: Evidence arrives after the release it should shape

**Related Stakeholders**: Product owner, sponsor, early customers

**Risk Description**: D-002 and D-003 are due on release 1's target date and are only requested [ARD-C1].

**Impact on Goals**: G-1, G-2, G-3

**Probability**: HIGH

**Impact**: HIGH

**Mitigation Strategy**: Record the move-or-ship decision as an open question with the sponsor as decider, before 2027-03-31.

**Contingency Plan**: Ship release 1 as an experiment and say so in the release notes.

---

### Risk SR-2: The grade becomes false assurance

**Related Stakeholders**: Domain expert, sponsor

**Risk Description**: The expert accepts a weak PRD because its score is high (PRD R-001) [ARD-C2].

**Impact on Goals**: G-1, G-5

**Probability**: HIGH

**Impact**: HIGH

**Mitigation Strategy**: Every finding quoted; blocking defects reported apart from the score; the grade framed as evidence.

**Contingency Plan**: Remove the overall score from the approval pack and keep only findings.

---

### Risk SR-3: A technology-free PRD reads as incomplete

**Related Stakeholders**: Engineering lead

**Risk Description**: A-003 fails: the lead reads the absence of technology as a gap.

**Impact on Goals**: G-1, G-3

**Probability**: MEDIUM

**Impact**: HIGH

**Mitigation Strategy**: Hand over the candidate decision records with the PRD; Q-008 tests it.

**Contingency Plan**: Add an architecture hand-off document beside the PRD, such as these ArcKit documents.

---

### Risk SR-4: An organization refuses the delivery model

**Related Stakeholders**: Policy owner, buyers

**Risk Description**: A-004 fails: an organization will not let a specification be drafted inside an assistant session.

**Impact on Goals**: G-4, G-2

**Probability**: MEDIUM

**Impact**: HIGH

**Mitigation Strategy**: Publish where content goes, per release, before each pilot.

**Contingency Plan**: Revisit C-001 and C-003 with the product owner.

---

## Governance & decision rights

### Decision authority matrix (RACI)

The PRD's decision rules govern every PRD that prd-forge writes [DRR-C1]. "Reviewer" means the read-only grading agent.

| Decision Type | Responsible | Accountable | Consulted | Informed |
|---------------|-------------|-------------|-----------|----------|
| TR-001 Approve a PRD for a release | Sponsor | Sponsor | Domain expert | Engineering lead, delivery lead |
| TR-002 Set a section to final | Domain expert | Domain expert | Reviewer | Sponsor |
| TR-003 Accept or refute a section's score | Reviewer (proposes) | Domain expert | None | Sponsor |
| TR-004 Decide what the product is for and what is out of scope | Domain expert | Domain expert | Sponsor | Engineering lead, delivery lead |
| TR-005 State a domain fact as true | Domain expert | Domain expert | None | Engineering lead |
| TR-006 Judge whether a set can be built from | Reviewer (proposes) | Engineering lead | Domain expert | Sponsor |
| TR-007 Decide the domain's terms | Domain expert | Domain expert | None | All readers |
| TR-008 Decide a section's interview is finished | Domain expert | Domain expert | None | None |
| TR-009 Leave a section at draft | Domain expert | Domain expert | None | Sponsor |
| TR-010 Offer the set for approval | Domain expert | Domain expert | Reviewer | Sponsor |
| TR-011 Decide a backlog can be mapped from the set | Reviewer (proposes) | Delivery lead | Domain expert | Engineering lead |
| TR-012 Decide which epics come first | Delivery lead | Delivery lead | Engineering lead | Sponsor |
| TR-013 Accept or correct a drafted section | Domain expert | Domain expert | None | None |
| prd-forge releases and principle exceptions | Maintainers | Product owner | Contributors | Users through release notes |

### Escalation path

1. **Level 1**: The domain expert, for every decision about a PRD's content (TR-002 to TR-010, TR-013).
2. **Level 2**: The sponsor, for approval, conditions, and release-date trade-offs (TR-001).
3. **Level 3**: The product owner, for prd-forge itself: its method, its constraints, and exceptions to its principles.

---

## Validation & Sign-off

### Stakeholder review

| Stakeholder | Review Date | Comments | Status |
|-------------|-------------|----------|--------|
| Product owner | [PENDING] | [PENDING] | [PENDING] |

### Document approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | [PENDING] | [PENDING] | [PENDING] |
| Business Owner | Richard Hightower | [PENDING] | [PENDING] |
| Enterprise Architect | [PENDING] | [PENDING] | [PENDING] |

---

## Appendices

### Appendix a: stakeholder interview summaries

No stakeholder interviews were held for this analysis. The personas, goals, and pains come from prd-forge's PRD, which records them as the product owner's account. Section 4's grade notes that no persona states its `basis`, so a reader cannot tell which are researched [GR-C2]. D-002 and D-003 are the planned first contact with real experts and engineering leads.

### Appendix B: survey results

No surveys were run.

### Appendix C: References

- prd-forge PRD, version 0.8.0, `docs/prd/prd-forge/`
- Grades of the PRD, `docs/prd/prd-forge/grades/`
- Architecture principles, `docs/projects/000-global/ARC-000-PRIN-v1.0.md`

## External references

### Document register

| Doc ID | Filename | Type | Source Location | Description |
|--------|----------|------|-----------------|-------------|
| ROOT | prd.md | PRD root | `docs/prd/prd-forge/` | Summary, stakeholders, approvers |
| SC | 07-scope.md | PRD section 6 | `docs/prd/prd-forge/` | Release line, in and out of scope |
| CM | 02-customer-market.md | PRD section 2 | `docs/prd/prd-forge/` | Segments, buyers, competitors |
| OM | 03-objectives-metrics.md | PRD section 3 | `docs/prd/prd-forge/` | Objectives O-001 to O-003 |
| PER | 04-personas.md | PRD section 4 | `docs/prd/prd-forge/` | Personas PER-001 to PER-004 |
| CON | 10-constraints.md | PRD section 9 | `docs/prd/prd-forge/` | Constraints C-001 to C-004 |
| DRR | 11-decision-rights.md | PRD section 10 | `docs/prd/prd-forge/` | Decision rules TR-001 to TR-013 |
| ARD | 12-assumptions-risks-dependencies.md | PRD section 11 | `docs/prd/prd-forge/` | Assumptions, risks, dependencies |
| OQ | 13-open-questions.md | PRD section 12 | `docs/prd/prd-forge/` | Open questions |
| RP | 14-release-plan.md | PRD section 13 | `docs/prd/prd-forge/` | Releases and exit criteria |
| GR | grades/ | Grade reasons | `docs/prd/prd-forge/grades/` | Rubric grades of every section |

### Citations

| Citation ID | Doc ID | Page/Section | Category | Quoted Passage |
|-------------|--------|--------------|----------|----------------|
| SC-C1 | SC | OUT-004 | Scope | The engineering lead's confirmation is out of scope, revisited "Release 2, with J-002" |
| ROOT-C2 | ROOT | summary.bet | Strategy | "A domain expert, with no product management training, can reach a PRD that an engineering lead confirms is buildable" |
| CM-C1 | CM | segments | Market | Segments S-001 to S-003: consultancies, regulated-industry organizations, product teams |
| CM-C2 | CM | S-001, S-002 | Financial | "the comparison is billable hours saved"; "Compared against contracting a product manager" |
| CM-C3 | CM | why_we_win | Strategy | "The expert can see, before anyone starts building, which parts of their own specification a development team will not be able to build from" |
| OM-C1 | OM | Baselines | Metrics | "unknown - not measured; see Q-001" |
| OM-C2 | OM | owner | Governance | "owner: Richard Hightower" on every objective |
| OM-C3 | OM | Targets | Metrics | "80% of PRDs pass on first submission"; "Under 5 working days"; "95% of `must` requirements" |
| PER-C1 | PER | PER-001 goals | Driver | "Get what is in my head into a form the development team can build from" |
| PER-C2 | PER | PER-001 proficiency | Context | "No product management training." |
| PER-C3 | PER | PER-002 goals and pains | Driver | "Estimate without first interviewing the author" |
| PER-C4 | PER | PER-003 goals and pains | Driver | "Be confident enough to commit budget and a date" |
| PER-C5 | PER | PER-004 goals and pains | Driver | "Walk into the workshop with a backbone already agreed" |
| CON-C1 | CON | C-003 | Compliance | "is not sent anywhere beyond the assistant session they are already using" |
| CON-C2 | CON | C-001, C-002 | Governance | "Product decision, Richard Hightower, recorded at version 0.1.0." |
| DRR-C1 | DRR | Front matter | Governance | Decision rules TR-001 to TR-013, with approvers PER-001 to PER-004 |
| ARD-C1 | ARD | D-002, D-003 | Risk | "by: 2027-03-31", "status: requested" |
| ARD-C2 | ARD | A-002, A-003, A-004, R-001 | Risk | "The grade becomes false assurance, which is worse than no grade." |
| OQ-C1 | OQ | Q-001 | Metrics | "What share of specifications reaching a development team today pass a buildability review on first submission?" |
| RP-C1 | RP | Schedule problem | Delivery | "That is a decision for the sponsor at TR-001 and it is not made here." |
| RP-C2 | RP | REL-002 exit criteria | Delivery | "Every story derived from a pilot PRD names the requirement id it came from." |
| GR-C1 | GR | 08-functional-requirements.md | Conflict | "ST-001, ST-003, and ST-004 cannot meet their own acceptance without FR-002, FR-008, and FR-011, which are `should`." |
| GR-C2 | GR | 04-personas.md | Evidence | No persona has `basis` |

### Unreferenced documents

| Filename | Source Location | Reason |
|----------|-----------------|--------|
| 01-problem-opportunity.md | `docs/prd/prd-forge/` | Problems feed the requirements, not the stakeholder map |

---

**Generated by**: ArcKit `/arckit:stakeholders` command
**Generated on**: 2026-10-27
**ArcKit Version**: 6.18.3
**Project**: prd-forge (Project 001)
**AI Model**: Claude Opus 5.5 (claude-opus-5-5)
