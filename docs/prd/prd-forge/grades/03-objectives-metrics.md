---
doc: ../03-objectives-metrics.md
score: 75
blocking: 0
graded: 2026-10-26
grader: prd-forge:prd-adversary
---

# Why business objectives and success metrics scored 75

| Dimension | Score | Why |
| --- | --- | --- |
| Outcome, not output | 3 | All three are outcomes, not deliverables. None measures what section 2 says the buyer pays for: "the comparison is billable hours saved". |
| Metric precision | 2 | O-001 does not define the PRDs counted or which verdict is a pass. O-003's metric counts all requirements and its target counts `must` ones. No objective has `measurement` or `indicator`. |
| Baseline | 2 | All three are "unknown", each with a question, decider, and date. Q-002 measures from "a product idea", and the O-002 metric from "the first interview question". |
| Target | 3 | Each target has a number and a date, but O-001 says "Do not set a target against this until Q-001 is answered", and the body calls the targets "intentions, not commitments". |
| Owner | 4 | One named owner on every objective. |
| Count | 4 | Three objectives, and together they reach all four problems in section 1. |

## Blocking defects

None. Each baseline names its open question, every objective is referenced by section 7, and there are three objectives.

## How to raise the grade

- **Metric precision (2 to 4):** For O-001, define the population and say whether `buildable with gaps` is a pass. For O-003, count the same set in the metric and the target, and give the rule for combining several raters. Add `measurement` and `indicator`.
- **Baseline (2 to 4):** Align Q-002's start event with the O-002 metric, and remove or source "the weeks a product manager's discovery cycle takes".
- **Target (3 to 4):** Stand behind the targets, or mark each as provisional until its question's due date.
- **Outcome, not output (3 to 4):** Add an objective the buyer recognizes, such as cost per approved specification, or say why quality is the business result for this release.

## Notes

- `guardrails` is absent.
- The rubric's defect "a target or baseline with no digit" reads, literally, as firing on every unknown baseline. The guide should say the digit test applies to a baseline only when it names no `baseline_question`.
