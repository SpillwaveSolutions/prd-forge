---
doc: ../15-glossary.md
score: 55
blocking: 6
graded: 2026-10-27
grader: prd-forge:prd-adversary
previous_score: 60
---

# Why the glossary scored 55

The seven terms 0.8.1 added now resolve their defects. The grader read every acceptance criterion again and found six more undefined words.

| Dimension | Score | Why |
| --- | --- | --- |
| Coverage | 2 | Words used in acceptance criteria are missing, and so are the backlog terms ST-008 relies on. |
| Author's voice | 3 | Some meanings read as notes about the set: "the set refers to 'test 5' by number". |
| Disambiguation | 3 | The body table promises State against Threshold, and the State entry has no `not`. |
| Consistency | 2 | "Document set" is defined and not used; "weakest dimension" and "weakest part", and "buildability review" and "buildability report", alternate. No entry has `avoid`. |
| Authority | 1 | No entry has `source`, although MoSCoW and Spike have known origins. |

## Blocking defects

- "requirement" is used in FR-012 and FR-014 and has no entry.
- "acceptance criteria" is used in FR-012 and has no entry.
- "gap" is used in FR-012 and has no entry.
- "version" is used in FR-014 and has no entry.
- "domain" is used in FR-001 and FR-003 and has no entry.
- "reading order" is used in FR-017 and has no entry, and the set's file order and section order differ.

## How to raise the grade

- **Coverage (2 to 4):** Add the six terms, then backlog, feature, epic, story, story-mapping workshop, release, persona, segment, and pilot.
- **Authority (1 to 4):** Add `source` to MoSCoW and Spike, and say what `wont` means.
- **Consistency (2 to 4):** Pick one word of each pair and put the other in `avoid`.
- **Disambiguation and voice (3 to 4):** Add the `not` fields the table promises, and remove notes about the set from meanings.
