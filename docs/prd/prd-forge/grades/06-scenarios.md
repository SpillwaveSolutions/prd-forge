---
doc: ../06-scenarios.md
score: 89
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 86
---

# Why scenarios scored 89

| Dimension | Score | Why |
| --- | --- | --- |
| Concreteness | 3 | Most scenarios carry real values, but SC-007's course is generic and SC-003 is vague. |
| Bound to a journey | 4 | Every scenario names J-001 and a stage, and every `branches_from` target exists. |
| One goal | 4 | Each scenario reaches one goal. |
| Variant coverage | 3 | J-002 has no scenario, and the document does not say why. |
| Outcome testability | 4 | Pass or fail, with numbers. |
| User's view | 4 | Steps are what the user sees or does. |
| First use, return, and concurrency | 3 | Concurrency is only stated, not walked through. |
| Lifecycle | 3 | SC-005 moves sections from review to draft and does not name LC-001, and LC-001's `when` omits the buildability review. |
| Priority | 4 | Every `must` sits on the release line. |

## Blocking defects

None.

## Weakest dimension

Lifecycle and concurrency, tied at 3.

## How to raise the grade

- **Lifecycle (3 to 4):** Add `lifecycles: [LC-001]` to SC-005, widen the review-to-draft `when` to include the buildability review, and replace "done" in SC-002 with an LC-001 state.
- **Variant coverage (3 to 4):** Say that J-002 has no scenario because OUT-001 defers it to REL-002, or add a J-002 happy path.
- **Concurrency (3 to 4):** Write the scenario where the sponsor reads one version while the expert changes a section. Its priority comes from the expert.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- Some course steps do not start with "They see" or "They are", so the generated flowcharts draw what the product shows as something the user does, in SC-007 and SC-008.
