# prd-forge FAQ

## Why use prd-forge and not Anthropic's product-management plugin?

Use prd-forge when you must write a classical PRD that a development team can
build from. Use Anthropic's product-management plugin when you need a quick
feature spec, or its other product-management tasks.

Anthropic's plugin is `product-management` in `anthropics/knowledge-work-plugins`.
Its `write-spec` skill writes one PRD for one feature. Its `roadmap-update`
skill manages a roadmap. prd-forge does only the PRD, and it checks the PRD in
more ways.

### How the two compare

| Area | prd-forge | product-management `write-spec` |
| --- | --- | --- |
| Output | Eighteen linked markdown files. The YAML front matter of each file is checked against a JSON Schema. | One markdown document with eight sections. |
| Grading | Each section has a rubric of five to twelve dimensions, each scored 0 to 4, and a list of blocking defects. | No grading. |
| Review agents | Three read-only agents: an adversarial grader, an engineering-lead reviewer, and a domain-voice checker. | No agents. |
| Validation | A validator checks the link graph, the ids, and the references between sections. It checks that each objective names a real problem, and that each requirement names a real journey stage and a real objective. | No validator. |
| Requirement rules | Each requirement must pass five tests. It names a user, states an outcome that a person can see, has a pass-or-fail test, has a priority, and names no technology. | Each requirement can note technical considerations. |
| Quality check | Agents grade the draft, and the expert accepts or refutes each grade. | The skill asks the user which sections to change. |
| Backlog | The `prd-to-backlog` skill derives features, epics, stories, and spikes, and traces each one to a requirement id. | The skill offers an engineering ticket breakdown as a follow-up. |

### What the two share

Both use these concepts:

- MoSCoW priorities.
- Given/When/Then acceptance criteria.
- Non-goals.
- Open questions, each with an owner.

### Can you install both?

Yes. The two plugins have different skill names. If you ask for a "PRD" or a
"spec", either skill can start. To choose prd-forge, ask for the `prd-wizard`
skill by name.
