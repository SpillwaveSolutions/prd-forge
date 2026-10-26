# What a PRD is, and what it is not

A PRD says **what** to build, **for whom**, **why**, and **how you know it
works**. It also says what **not** to build. It does not say **how** to build it.

## The five tests for each requirement

A statement is a product requirement when it passes all five:

1. It names a user or a stakeholder.
2. It states an outcome that a person can see.
3. It has a pass-or-fail acceptance test.
4. It has a priority.
5. It does not name the component or the technology that delivers it.

Apply these to every entry in section 7, and to the acceptance criteria in
sections 8 and 10.

## What a PRD does not contain

- Technology or vendor choices.
- Names of existing systems or components.
- The split of the system into modules or services.
- Agent designs and internal workflows.
- Data models and API contracts.
- Tasks and estimates.

These belong in architecture decision records (ADRs), the architecture document,
and the backlog. **If a requirement needs a technology name to make sense, find
the user need behind it and write that need.**

Technology correctly appears for the first time at the **task** level, which the
PRD never defines. That is why the PRD can stay free of it.

## Wireframes and mockups

Required for every screen and report. Each functional requirement says where the
user meets its outcome (`shown_in`), and each `screen` or `report` requirement is
illustrated by a text sketch in `08-wireframes.md`. Label each one an
**illustration, not a design**. A sketch shows what a person sees and does. It
never picks colors, fonts, a platform, or a component, and a requirement never
names a screen: the wireframe cites the requirement, not the other way round.
The drawing rules are in `sections/08-wireframes.md`.

## The conversion move

When the expert states a technology, do not argue and do not record it in the
PRD. Convert it:

| They say | Ask | Record |
| --- | --- | --- |
| "It should use a message queue." | "What does the user get from that?" | The outcome: work continues when a step is slow. |
| "Store it in Postgres." | "Who needs to retrieve what, and for how long?" | A retention NFR and a retrieval requirement. |
| "Use an LLM to classify." | "Who decides, and what do they see?" | A decision-rights entry and a requirement for what the user is shown. |
| "Integrate with SAP." | "Whose data is that, and who needs it when?" | A dependency in section 11 and a requirement for the user's outcome. |

Keep a running list of the technology preferences they expressed and hand it over
at the end as **candidate ADR topics**. They are valuable; they are just not PRD
content.
