# Section 14 — Glossary

**Kind** `glossary` · **Schema** `prd-forge/glossary@1` · **File** `15-glossary.md`

## What this section is

One meaning for each term. Every story title and acceptance criterion in the
backlog uses these words, with these meanings.

## Why it matters

Domain words carry different meanings for the expert, the engineer and the
regulator. "Exception", "review", "approval", "load", "claim", "engagement" — each
of those has cost a project months somewhere. The glossary is cheap insurance,
and it is the section that most helps a developer who is new to the domain
actually build the right thing.

## What belongs in each entry

- `term`: the word as the domain says it.
- `meaning`: one sentence, in the domain expert's words, not a dictionary's.
- `see_also`: related terms.
- `not`: what the term does *not* mean, where it is commonly confused. This field
  earns its keep more than `meaning` does.
- `source`: the standard or authority that defines the term, with `unverified:
  true` when the source was checked and could not be confirmed.
- `avoid`: synonyms not to use. The validator warns when a section uses one.

## What does not belong

- Software terms the team already shares ("API", "database").
- Two meanings for one term. If the domain genuinely has two, give them two
  terms and say so.

## How to interview for it

Build this continuously, not at the end. Every time the expert uses a word you
would have to guess at, stop and ask:

1. "What exactly do you mean by `<term>`?"
2. "Does anyone in your organisation use it differently?"
3. "What would a newcomer wrongly think it means?"
4. "Is there a regulator's or standard-setter's definition? Does yours match it?"

Then read your own draft requirements back and flag every domain word that is
not in here.

## Worked example (domain: clinical trial site activation)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **Activation.** The point at which a site may begin screening patients, after
> every readiness condition has been met and released.
> See also: initiation, screening.
> Not: initiation. The initiation visit is a meeting that may happen before or
> after activation; activation is the permission to begin.
>
> **Screening.** Assessing a patient against the study's criteria to decide
> whether they may be enrolled.
> See also: enrolment.
> Not: enrolment. A screened patient may fail screening and never enrol; counts
> of the two are different numbers and are reported separately.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Coverage | Absent or trivial | Main terms | Every domain word used in sections 1–13 |
| Author's voice | Dictionary definitions | Mixed | The expert's own words |
| Disambiguation | No `not` fields | A few | `not` on every commonly confused term |
| Consistency | Document uses other words | Mostly consistent | Sections 1–13 use exactly these terms |
| Authority | None | Mentioned | Standard-setter definitions cited where they exist |

## Blocking defects

- A domain term used in a requirement's `acceptance` that is not defined here.
- Two entries for the same term with different meanings.
- A term whose meaning contradicts a cited standard without saying why.

## Industry-standard wording

- Define the term, then use only that term. Do not alternate synonyms.
- Where the organisation and a standard disagree, give both and say which the PRD
  uses.
