# Section 8 — Non-functional requirements

**Kind** `nonfunctional-requirements` · **Schema** `prd-forge/nonfunctional-requirements@1` · **File** `09-nonfunctional-requirements.md`

## What this section is

How fast, how many, how available, how secure, how accessible, and how long data
is kept — **as numbers**. An NFR without a number is an opinion.

## Why it matters

These become acceptance criteria on stories, items in the definition of done, or
separate platform stories. They are also the main driver of architecture, which
is why they must be stated as measurable targets and not as adjectives: an
engineer can build for "95th percentile under 2 seconds at 500 concurrent
caseworkers"; nobody can build for "fast".

## What belongs in each entry

- `id`: `NFR-nnn`.
- `category`: performance, scale, availability, durability, security, privacy,
  accessibility, retention, observability, usability, localisation,
  supportability.
- `statement`: the requirement in a sentence.
- `metric`: what is measured.
- `target`: the number, with its unit and percentile. `zero` and `none` count:
  an absolute of nought is a number, and is often the right target.
- `measurement`: how and where it is measured.
- `priority`, and `applies_to` when it holds only for certain requirements.

## What does not belong

- "Scalable", "performant", "secure", "robust", "user-friendly" with no number.
- Technology choices ("must run on Kubernetes").
- Targets copied from another product without a reason.

## How to interview for it

Derive these from section 4's `frequency` and section 2's segment sizes, then
confirm:

1. "How many of these people are working at once on a busy day? At peak?"
2. "How long can they wait for this before they do something else?"
3. "What happens if it is unavailable for an hour? For a day?"
4. "Who must never see this data? What does the regulation say?"
5. "How long must records be kept, and who says so?" (Cross-check section 9.)
6. "Does anyone using this rely on a screen reader, keyboard only, or magnification?"
7. "When it breaks, what must someone be able to find out?"

For each answer, ask: "What is the number, and how would we measure it?"

## Worked example (domain: government benefits claims)

_The figures, citations and organisations in this example are invented, to show the form. Never copy a number or a citation from it into a real PRD._

> **NFR-003** · performance · priority: must
> Statement: a caseworker sees a claimant's full case without waiting.
> Metric: 95th percentile time to first meaningful render of the case view.
> Target: under 1.5 seconds at 2,000 concurrent caseworkers.
> Measurement: synthetic journey run every 5 minutes against production, plus
> real-user timing reported weekly.
>
> **NFR-007** · retention · priority: must · applies_to: FR-040
> Statement: a decided claim and the evidence behind it remain retrievable for the
> statutory period.
> Metric: retrievability of a decided claim and its evidence.
> Target: 7 years from the decision date, 100% retrievable.
> Measurement: quarterly restore test of a sampled claim from each quarter.
>
> **NFR-011** · accessibility · priority: must
> Statement: every journey in section 5 is completable without a mouse and with a
> screen reader. Claimants include people whose disability is the reason for the
> claim, so this is the product, not a compliance overlay.
> Metric: WCAG 2.2 AA conformance on the golden-thread journey.
> Target: zero level-A or level-AA violations on the golden-thread path.
> Measurement: automated axe scan in CI plus one manual screen-reader pass per
> release, and one session per release with a claimant who uses assistive
> technology.

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Numbers | Adjectives only | Some numbers | Every entry has a quantity and a unit (`zero` counts) |
| Percentiles | Averages | Mixed | Percentiles where latency matters |
| Measurement | Absent | Named loosely | A method and a place, repeatable |
| Category coverage | One or two | Several | Performance, scale, availability, security, privacy, accessibility, retention, observability all considered or explicitly N/A |
| Derivation | Arbitrary | Plausible | Traceable to persona frequency and segment size |
| No technology | Names a platform | One leak | None |
| Scope | Blanket | Mostly blanket | `applies_to` used where the requirement is not universal |

## Blocking defects

- A `target` that names no quantity (an adjective, not a number; `zero` and
  `none` are quantities).
- A `measurement` that nobody could actually run.
- No accessibility entry, and no explicit statement that it does not apply.
- No retention entry where section 9 names a retention constraint.
- An NFR that names a technology, platform or vendor.

## Industry-standard wording

- Say "p95" / "p99" and name the unit: "p95 < 1.5 s".
- Say "availability 99.9% measured monthly, excluding announced maintenance".
- Cite the standard by name and version: "WCAG 2.2 AA", "SOC 2 Type II".
- Say "recovery time objective" and "recovery point objective" where downtime
  matters, with numbers for both.
