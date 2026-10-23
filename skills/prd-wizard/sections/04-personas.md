# Section 4 — Users and personas

**Kind** `personas` · **Schema** `prd-forge/personas@1` · **File** `04-personas.md`

## What this section is

Each role that touches the product: what they are trying to get done, what hurts
today, how often they appear, and what they are allowed to approve.

## Why it matters

Personas become the "As a ..." in every user story. If a persona is missing, the
stories for that role get written as "As a user", and the team builds for an
average person who does not exist. The `authority` field is what section 10 then
builds the approval rules on.

## What belongs in it

- One `PER-nnn` per role, named by role: "Study start-up specialist, sponsor
  side", not "Maria".
- `goals`: what they want, in their words.
- `pains`: what is hard today, traceable to section 1.
- `frequency`: daily, per engagement, once at setup. This drives the
  non-functional requirements more than anything else in the document.
- `authority`: what they may approve or sign. Feeds section 10.
- `proficiency`: how expert they are in the domain and in software.

## What does not belong

- Demographics, stock photos, favourite coffee. They do not change a requirement.
- Internal roles that never touch the product (unless they approve something).
- More than about seven personas. If you have twelve, some are the same role.

## How to interview for it

1. "List everyone who touches this, including people outside your organisation."
2. For each: "What are they trying to get done? What does a good day look like?"
3. "What is hardest for them today?"
4. "How often do they do this — every day, once a quarter, once ever?"
5. "What can they approve or sign off that others cannot?"
6. "Who is the least experienced person who will ever do this job?"

Question 6 sets the accessibility and usability bar, and the expert usually knows
the answer immediately.

## Worked example (domain: clinical trial site activation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **PER-002. Study start-up specialist, sponsor side.** Goals: get a site from
> selected to activated without being the bottleneck; know which of 40 sites is
> stuck and on what. Pains: chasing documents by email across time zones; no
> single view of which document version is current; the same question answered
> for every site separately. Frequency: daily across a portfolio of studies.
> Authority: may mark a document received and complete; may not release a site
> for enrolment. Proficiency: expert in start-up process, high turnover in the
> role, so assume no training.
>
> **PER-004. Site coordinator, hospital research unit.** Goals: submit what the
> sponsor needs once, and know it landed. Pains: duplicate requests from the
> sponsor's monitor and start-up specialist; unclear which template version is
> accepted; no idea what is still outstanding. Frequency: a burst during
> start-up, then rarely. Authority: supplies documents and confirms site readiness;
> cannot approve anything on the sponsor's side. Proficiency: expert in their own
> hospital's process, unfamiliar with the sponsor's.
>
> **PER-005. Medical monitor.** Goals: be confident a site is ready to enrol a
> patient safely. Pains: cannot see the basis for a readiness decision without
> asking. Frequency: once per site, plus exceptions. Authority: releases a site
> for enrolment. Proficiency: clinically expert, uses the product rarely.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Role naming | First names or "the user" | Job titles | Job titles with organisation and seniority |
| Goals | Restated features | Real goals | Goals in the persona's own words |
| Pains | Absent | Generic | Each pain traceable to a `P-nnn` in section 1 |
| Frequency | Absent | Stated loosely | Stated precisely enough to size load |
| Authority | Absent | Mentioned | Stated for every persona, and used in section 10 |
| External users | Omitted | Mentioned | Treated as first-class, with their own journeys |
| Count | >9 or 1 | 8–9 | 3–7, each appearing in section 5 |

## Blocking defects

- A persona who appears in no journey in section 5.
- A journey or requirement whose user matches no persona here.
- External parties (clients, customers, regulators) touching the product and not
  listed here.
- `authority` left blank on a persona that section 10 gives approval rights to.

## Industry-standard wording

- Say "persona" or "user role" consistently; pick one and keep it.
- Say "primary persona" for the one the release is designed around.
- Avoid "power user" and "end user"; name the role instead.
