---
doc: ../03-objectives-metrics.md
score: 88
blocking: 0
graded: 2026-10-28
grader: prd-forge:prd-adversary
previous_score: 83
---

# Why objectives and metrics scored 88

| Dimension | Score | Why |
| --- | --- | --- |
| Outcome, not output | 4 | All three are business results. |
| Metric precision | 3 | No measurement says who computes it or how often. O-003 does not say whether 95% is pooled or per PRD. O-002 sets no minimum count. |
| Baseline | 2 | All three baselines are unknown and point to Q-001 to Q-003. |
| Target | 4 | Each has a number and a date. |
| Owner | 4 | One named person. |
| Count | 4 | Three objectives reach P-001 to P-004. |

## Blocking defects

None.

## Weakest dimension

Baseline. All three objectives rest on baselines that nobody has measured.

## How to raise the grade

- **Baseline (2 to 4):** Run the Q-001 to Q-003 spikes, and record each figure with `baseline_as_of` and `baseline_source`.
- **Metric precision (3 to 4):** Name who computes each number and how often, whether O-003 is pooled, and the record and minimum count for O-002.
- **Guardrails:** Add one, such as the expert's satisfaction, so O-002 cannot improve by making the interview worse. This closes a gap against the guide, not a dimension.

## The details block

The generated details block contradicts nothing. It shows the front matter word for word, and it makes visible any place where the hand-written prose has drifted from it.

- The pilot-PRD and pass definitions now appear three times: in the front matter, in the prose, and in the block.
