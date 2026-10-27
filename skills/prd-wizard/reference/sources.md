# Sources for standard terms

Several words the method uses come from established practice: MoSCoW,
Given/When/Then, story, epic, feature, story map, backbone, and spike. Teams
bring their own meaning for each, so a set says where the word comes from and
where its meaning departs.

## Rules

- When a guide or a set uses a term listed here, cite this source in the
  glossary entry's `source` field, in the form "Title, Author or publisher,
  date, URL".
- State any place where the set's meaning departs from the source, in the
  glossary entry's `meaning` or `not`.
- Add a new source here only after you verify it against the published page.
  Record the date you read it.

## The sources

All five were read on 2026-10-27.

| Terms | Source | Defining text | Cited by |
| --- | --- | --- | --- |
| MoSCoW, `must`, `should`, `could`, `wont` | "What is MoSCoW Prioritization?", Agile Business Consortium, https://www.agilebusiness.org/?p=1907 | The W is "Won't Have this time". The method is associated with DSDM. | `sections/08-functional-requirements.md`, `sections/15-glossary.md` |
| Given/When/Then, acceptance criteria | "Introducing BDD", Dan North, 20 Sep 2006, https://dannorth.net/blog/introducing-bdd/ | "We started describing the acceptance criteria in terms of scenarios", in the Given/When/Then form. | `sections/05-journeys.md`, `sections/06-scenarios.md`, `sections/08-functional-requirements.md`, `sections/11-decision-rights.md`, `sections/15-glossary.md`, `reference/backlog.md`, `prd-to-backlog/SKILL.md` |
| Story, epic, feature | "Epics, Features and User Stories", Mountain Goat Software, last updated 28 Apr 2025, https://www.mountaingoatsoftware.com/blog/stories-epics-and-themes | "A user story is simply something a user wants." "An epic is a large user story." "A feature is a user story that is big enough to be released." | `sections/03-objectives-metrics.md`, `sections/05-journeys.md`, `sections/07-scope.md`, `sections/08-functional-requirements.md`, `sections/11-decision-rights.md`, `sections/12-assumptions-risks-dependencies.md`, `sections/13-open-questions.md`, `sections/15-glossary.md`, `reference/backlog.md`, `SKILL.md`, `prd-to-backlog/SKILL.md` |
| Story map, backbone | "The New User Story Backlog is a Map", Jeff Patton & Associates, 8 Oct 2008, updated 12 Apr 2023, https://www.jpattonassociates.com/the-new-backlog/ | The big things on top of the map are "the essential capabilities the system needs to have", and "I refer to them as the 'backbone' of the software." | `sections/05-journeys.md`, `sections/07-scope.md`, `sections/15-glossary.md`, `reference/method.md`, `reference/backlog.md`, `prd-to-backlog/SKILL.md` |
| Spike | "Spike Solutions", in The Art of Agile Development, 1st ed., James Shore and Shane Warden, 3 Jun 2010, https://www.jamesshore.com/v2/books/aoad1/spike_solutions | "A spike solution, or spike, is a technical investigation." | `sections/12-assumptions-risks-dependencies.md`, `sections/13-open-questions.md`, `sections/15-glossary.md`, `reference/backlog.md`, `prd-to-backlog/SKILL.md` |

## Where the method departs

- **Feature.** The source makes a feature any story big enough to release. The
  method makes a feature the backlog item for one journey stage.
- **Epic.** The source makes an epic a large story. The method scopes epics by
  the release line, so an epic groups the items one release delivers.
- **`wont`.** The method keeps the source's meaning, won't have this time. A
  `wont` item is out of scope and revisited later, not a non-goal.
