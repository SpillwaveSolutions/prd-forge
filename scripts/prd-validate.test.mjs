// Tests for the YAML subset in prd-validate.mjs, which prd-diagrams.mjs reuses.
// PyYAML is the oracle: for every document in the shipped sets, the subset must
// read the front matter exactly as a full YAML parser does.
//
//   node --test scripts/prd-validate.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseYaml, splitFrontMatter, validateSet } from './prd-validate.mjs'
import { detailsOf, withDetails, withoutDetails, writeDetails } from './prd-details.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const PYYAML = 'import json,sys,yaml; print(json.dumps(yaml.safe_load(sys.stdin.read()), default=str))'
const hasPyYaml = spawnSync('python3', ['-c', 'import yaml']).status === 0

test('a list item and a value that run on over more lines are read whole', () => {
  const front = parseYaml(
    [
      'course:',
      '  - They read eight lines on what a journey is, why',
      '    requirements miss the steps between them',
      '  - They see the grade',
      'trigger: They say they are ready to do the',
      '  journeys section.',
      'after: kept',
    ].join('\n'),
  )
  assert.deepEqual(front.course, [
    'They read eight lines on what a journey is, why requirements miss the steps between them',
    'They see the grade',
  ])
  assert.equal(front.trigger, 'They say they are ready to do the journeys section.')
  assert.equal(front.after, 'kept')
})

for (const set of ['docs/prd/prd-forge', 'examples/acme-returns']) {
  for (const file of readdirSync(join(REPO, set)).filter(f => f.endsWith('.md'))) {
    test(`${set}/${file} reads as PyYAML reads it`, { skip: !hasPyYaml }, () => {
      const { front } = splitFrontMatter(readFileSync(join(REPO, set, file), 'utf8'))
      const oracle = spawnSync('python3', ['-c', PYYAML], { input: front, encoding: 'utf8' })
      assert.equal(oracle.status, 0, oracle.stderr)
      assert.deepEqual(parseYaml(front), JSON.parse(oracle.stdout))
    })
  }
}

/** A copy of prd-forge's own set with `edit` applied to one file, validated. */
function validateEdited(file, edit) {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-validate-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  const path = join(dir, file)
  writeFileSync(path, edit(readFileSync(path, 'utf8')))
  return validateSet(dir).errors
}

/** The same, returning the warnings. */
function warningsEdited(file, edit) {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-validate-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  const path = join(dir, file)
  writeFileSync(path, edit(readFileSync(path, 'utf8')))
  return validateSet(dir).warnings
}

/** Asserts that editing `file` makes the set fail with an error matching `pattern`. */
function failsWith(file, edit, pattern) {
  const errors = validateEdited(file, edit)
  assert.ok(errors.some(e => pattern.test(e)), `no error matching ${pattern}:\n${errors.join('\n')}`)
}

test('a must scenario off the release line fails the set', () => {
  const errors = validateEdited('06-scenarios.md', text =>
    text.replace('    stage: ST-002\n    stages: [ST-002, ST-003, ST-004]\n', '    stage: ST-007\n').replace('    variant: happy\n', '    variant: happy\n    priority: must\n'))
  assert.ok(errors.some(e => /SC-001 is a must, but its stage ST-007 is not on the release line/.test(e)), errors.join('\n'))
})

test('a stage satisfaction outside 1 to 5 fails the set', () => {
  const errors = validateEdited('05-user-journeys.md', text =>
    text.replace(/(      - id: ST-001\n(?:.*\n)*?        )satisfaction: 3\n/, '$1satisfaction: 7\n'))
  assert.ok(errors.some(e => /satisfaction: above 5/.test(e)), errors.join('\n'))
})

test('a journey stage with no acceptance fails the set', () => {
  const errors = validateEdited('05-user-journeys.md', text =>
    text.replace(/(      - id: ST-002\n(?:.*\n)*?)        acceptance:\n          - >-\n(            .*\n)+/, '$1'))
  assert.ok(errors.some(e => /stages\[1\]: missing acceptance/.test(e)), errors.join('\n'))
})

test('a journey stage acceptance not written as Given/When/Then fails the set', () => {
  const errors = validateEdited('05-user-journeys.md', text =>
    text.replace('            Given a drafted and graded section, when the expert opens it, then\n', '            The expert reads the draft and agrees with it, which shows it is\n'))
  assert.ok(errors.some(e => /acceptance\[0\].*does not match/.test(e)), errors.join('\n'))
})

test('a scenario that links a wireframe that does not exist fails the set', () => {
  const errors = validateEdited('06-scenarios.md', text =>
    text.replace('    wireframes: [WF-008]\n', '    wireframes: [WF-099]\n'))
  assert.ok(errors.some(e => /SC-001 links wireframe WF-099, which does not exist/.test(e)), errors.join('\n'))
})

test('a lifecycle transition to a state it does not declare fails the set', () => {
  const errors = validateEdited('06-scenarios.md', text => text.replace('        to: final\n', '        to: archived\n'))
  assert.ok(errors.some(e => /LC-001 has a transition with state "archived", which it does not declare/.test(e)), errors.join('\n'))
})

test('a scenario that names a lifecycle that does not exist fails the set', () => {
  const errors = validateEdited('06-scenarios.md', text => text.replace('    lifecycles: [LC-001]\n', '    lifecycles: [LC-009]\n'))
  assert.ok(errors.some(e => /names lifecycle LC-009, which does not exist/.test(e)), errors.join('\n'))
})

test('a persona short name with a space, or used twice, fails the set', () => {
  const spaced = validateEdited('04-personas.md', text => text.replace('short_name: Sponsor\n', 'short_name: The Sponsor\n'))
  assert.ok(spaced.some(e => /short_name.*does not match/.test(e)), spaced.join('\n'))
  const twice = validateEdited('04-personas.md', text => text.replace('short_name: Sponsor\n', 'short_name: DomainExpert\n'))
  assert.ok(twice.some(e => /short_name DomainExpert is used by more than one persona/.test(e)), twice.join('\n'))
})

test('the specification-review checks hold on prd-forge\'s own set', () => {
  assert.deepEqual(validateSet(join(REPO, 'docs/prd/prd-forge')).errors, [])
})

test('the root measure needs a number', () =>
  failsWith('prd.md', t => t.replace(/  measure: >-\n(?: {4}.*\n)+/, '  measure: Share of the pilot PRDs that pass.\n'), /summary\.measure has no number/))

test('the status quo must be named among the competitors', () =>
  failsWith('02-customer-market.md', t => t.replace('kind: status-quo', 'kind: indirect'), /no competitor has kind status-quo/))

test('an unknown baseline must name its question, and the question must exist', () => {
  failsWith('03-objectives-metrics.md', t => t.replace('    baseline_question: Q-002\n', ''), /O-002 baseline has no number and names no baseline_question/)
  failsWith('03-objectives-metrics.md', t => t.replace('baseline_question: Q-002', 'baseline_question: Q-099'), /O-002 baseline_question Q-099 does not exist/)
})

test('an objective may name only problems that exist', () =>
  failsWith('03-objectives-metrics.md', t => t.replace('problems: [P-004]', 'problems: [P-099]'), /O-002 names problem P-099/))

test('a problem reached by no requirement draws a warning', () => {
  const warnings = warningsEdited('03-objectives-metrics.md', t => t.replace('problems: [P-004]', 'problems: []').replace('problems: [P-001, P-004]', 'problems: [P-001]'))
  assert.ok(warnings.some(w => /P-004 reaches no requirement/.test(w)), warnings.join('\n'))
})

test('the golden thread needs a happy scenario', () =>
  failsWith('06-scenarios.md', t => t.replaceAll('    variant: happy\n', '    variant: alternate\n'), /golden thread J-001 has no happy scenario/))

test('a scenario shown on a screen must link a wireframe', () =>
  failsWith('06-scenarios.md', t => t.replace('    wireframes: [WF-010]\n', ''), /SC-002 is shown in a screen and links no wireframe/))

test('every must requirement must be in scope', () =>
  failsWith('07-scope.md', t => t.replace('      - FR-014\n', ''), /must requirement FR-014 is in no in-scope item/))

test('the release line must be a run of golden-thread stages', () =>
  failsWith('07-scope.md', t => t.replace('journey_stage: ST-006', 'journey_stage: ST-007'), /release line names a stage that is not in the golden thread/))

test('a decision rule\'s approver and stages must exist', () => {
  failsWith('11-decision-rights.md', t => t.replace('approver: PER-003', 'approver: PER-009'), /approver PER-009 is not a persona/)
  failsWith('11-decision-rights.md', t => t.replace('stages: [ST-006]', 'stages: [ST-099]'), /names stage ST-099, which does not exist/)
})

test('a dependency that blocks a missing id, or is due after the release it blocks, fails', () => {
  failsWith('12-assumptions-risks-dependencies.md', t => t.replace('      - A-001\n', '      - A-099\n'), /blocks A-099, which does not exist/)
  failsWith('12-assumptions-risks-dependencies.md', t => t.replace('    by: 2027-01-31\n    status: requested\n    owner: Richard Hightower\n    blocks:\n      - A-001\n', '    by: 2027-04-30\n    status: requested\n    owner: Richard Hightower\n    blocks:\n      - FR-001\n      - A-001\n'), /D-002 is due 2027-04-30, after REL-001's target/)
})

test('a glossary term may be defined once', () =>
  failsWith('15-glossary.md', t => t.replace('  - term: MoSCoW\n', '  - term: PRD\n'), /the term "prd" is defined more than once/))

test('the root version needs a change entry, and a final section an approval', () => {
  failsWith('prd.md', t => t.replace(/^version: .*$/m, 'version: 9.9.9'), /root's version 9.9.9 has no change entry/)
  failsWith('10-constraints.md', t => t.replace('status: draft', 'status: final'), new RegExp(`status final with no approval of version ${esc(VERSION)} recorded`))
})

/** Edits several files of a copy of the reference set; returns the report. */
function validateFiles(edits) {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-validate-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  for (const [file, edit] of Object.entries(edits)) writeFileSync(join(dir, file), edit(readFileSync(join(dir, file), 'utf8')))
  return validateSet(dir)
}

// The reference set's version, and the one before it in its change log.
const VERSION = /^version: (.+)$/m.exec(readFileSync(join(REPO, 'docs/prd/prd-forge/prd.md'), 'utf8'))[1]
const EARLIER = [...readFileSync(join(REPO, 'docs/prd/prd-forge/16-change-log.md'), 'utf8').matchAll(/^  - version: (.+)$/gm)].map(m => m[1]).find(v => v !== VERSION)
const esc = v => v.replaceAll('.', '\\.')

// An approver whose name and role hold the characters a YAML subset trips on.
const AWKWARD = '"O\'Brien (CFO); \\"Ops\\" #2 <lead>"'
const NAMED = t => t.replace('  - { name: Richard Hightower, role: Sponsor, persona: PER-003 }\n',
  `  - { name: Richard Hightower, role: Sponsor, persona: PER-003 }\n  - { name: ${AWKWARD}, role: "Finance, ops", persona: PER-003 }\n`)

/** The change log with `approvals` (YAML lines) recorded against `version`. */
const logged = (version, ...approvals) => t => t.replace(`  - version: ${version}\n    date: `, m => m.replace('    date: ', `    approvals:\n${approvals.join('\n')}\n    date: `))
const decided = (decision, date = '2026-10-30', name = 'Richard Hightower', role = 'Sponsor', extra = []) =>
  [`      - name: ${name}`, `        role: ${role}`, `        date: ${date}`, `        decision: ${decision}`, ...extra].join('\n')
const finalSection = t => t.replace('status: draft', 'status: final')

test('an approval covers only the version it names (FR-014)', () => {
  const ok = validateFiles({ '16-change-log.md': logged(VERSION, decided('approved')), '10-constraints.md': finalSection })
  assert.ok(!ok.errors.some(e => /no approval of version/.test(e)), ok.errors.join('\n'))
  const old = validateFiles({ '16-change-log.md': logged(EARLIER, decided('approved')), '10-constraints.md': finalSection })
  assert.ok(old.errors.some(e => e.includes(`status final with no approval of version ${VERSION}`)), old.errors.join('\n'))
})

test('a later rejection of the same version means the set is not approved (FR-014)', () => {
  const { errors } = validateFiles({
    '16-change-log.md': logged(VERSION, decided('approved', '2026-10-30'), decided('rejected', '2026-10-31', 'Richard Hightower', 'Sponsor', ['        note: The scope moved.'])),
    '10-constraints.md': finalSection,
  })
  assert.ok(errors.some(e => e.includes(`no approval of version ${VERSION}`)), errors.join('\n'))
})

test('each condition names what it depends on, and that it exists (FR-014)', () => {
  const cond = (...lines) => ['        conditions:', '          - condition: Q-001 is answered.', ...lines, '            by: 2027-01-31']
  const none = validateFiles({ '16-change-log.md': logged(VERSION, decided('approved-with-conditions', undefined, undefined, undefined, cond())) })
  assert.ok(none.errors.some(e => /depends_on: missing|names nothing it depends on/.test(e)), none.errors.join('\n'))
  const missing = validateFiles({ '16-change-log.md': logged(VERSION, decided('approved-with-conditions', undefined, undefined, undefined, cond('            depends_on: [Q-999]'))) })
  assert.ok(missing.errors.some(e => /depends on Q-999, which does not exist/.test(e)), missing.errors.join('\n'))
})

test('only the approver who set a condition clears it (FR-014)', () => {
  const cond = ['        conditions:', '          - condition: Q-001 is answered.', '            depends_on: [Q-001]', '            by: 2027-01-31', '            cleared: true', '            cleared_by: Someone Else']
  const { errors } = validateFiles({ '16-change-log.md': logged(VERSION, decided('approved-with-conditions', undefined, undefined, undefined, cond)) })
  assert.ok(errors.some(e => /cleared by Someone Else; only Richard Hightower clears it/.test(e)), errors.join('\n'))
})

test('a decision from someone not named as an approver is not an approval (FR-021)', () => {
  const { errors } = validateFiles({ '16-change-log.md': logged(VERSION, decided('approved', undefined, 'Pat Doe', 'Sponsor')) })
  assert.ok(errors.some(e => /decision by Pat Doe \(Sponsor\) is not from a named approver/.test(e)), errors.join('\n'))
})

test('an approver whose name holds awkward characters is matched exactly (FR-021)', () => {
  const ok = validateFiles({ 'prd.md': NAMED, '16-change-log.md': logged(VERSION, decided('approved', undefined, AWKWARD, '"Finance, ops"')) })
  assert.ok(!ok.errors.some(e => /not from a named approver/.test(e)), ok.errors.join('\n'))
})

test('a set with no named approver warns at draft and fails at review (FR-021)', () => {
  const bare = t => t.replace('  - { name: Richard Hightower, role: Sponsor, persona: PER-003 }\n', '  - PER-003\n')
  const draft = validateFiles({ 'prd.md': bare })
  assert.deepEqual(draft.errors, [])
  assert.ok(draft.warnings.some(w => /no approver is named/.test(w)), draft.warnings.join('\n'))
  assert.ok(draft.warnings.some(w => /approver PER-003 has no name/.test(w)), draft.warnings.join('\n'))
  failsWith('prd.md', t => bare(t).replace(/^status: draft$/m, 'status: review'), /no approver is named/)
})

test('an item defined in two documents fails the set and names both (FR-020)', () => {
  failsWith('13-open-questions.md', t => t.replace('  - id: Q-023\n', '  - id: FR-007\n'), /13-open-questions\.md: FR-007 is defined here and in 08-functional-requirements\.md/)
})

test('the root contents differing from a document warns (FR-020)', () => {
  const warnings = warningsEdited('10-constraints.md', t => t.replace('status: draft', 'status: review'))
  assert.ok(warnings.some(w => /links\.children\[\d+\] says status "draft", but 10-constraints\.md says "review"/.test(w)), warnings.join('\n'))
})

test('web_research is a boolean', () => {
  const ok = validateFiles({ 'prd.md': t => t.replace(/^approvers:$/m, 'web_research: false\napprovers:') })
  assert.deepEqual(ok.errors, [])
  failsWith('prd.md', t => t.replace(/^approvers:$/m, 'web_research: maybe\napprovers:'), /web_research/)
})

test('a requirement missing shown_in warns at draft and fails at review', () => {
  const drop = t => t.replace('    shown_in: conversation\n', '')
  assert.ok(warningsEdited('08-functional-requirements.md', drop).some(w => /FR-001 has no shown_in/.test(w)))
  failsWith('08-functional-requirements.md', t => drop(t).replace('status: draft', 'status: review'), /FR-001 has no shown_in/)
})

test('an id is not a number', () =>
  failsWith('prd.md', t => t.replace(/  measure: >-\n(?: {4}.*\n)+/, '  measure: Share of the pilot PRDs that pass, as Q-001 records.\n'), /summary\.measure has no number/))

test('prd-forge\'s own PRD carries the plugin\'s version', () => {
  const plugin = JSON.parse(readFileSync(join(REPO, '.claude-plugin/plugin.json'), 'utf8')).version
  const { front } = splitFrontMatter(readFileSync(join(REPO, 'docs/prd/prd-forge/prd.md'), 'utf8'))
  assert.equal(parseYaml(front).version, plugin)
})

// Checks from the 0.7.0 medium-priority review.
const warnsWith = (file, edit, pattern) => {
  const warnings = warningsEdited(file, edit)
  assert.ok(warnings.some(w => pattern.test(w)), `no warning matching ${pattern}:\n${warnings.join('\n')}`)
}

test('the root names a real objective, primary persona, and approvers', () => {
  failsWith('prd.md', t => t.replace('  objective: O-001\n', '  objective: O-099\n'), /summary\.objective names O-099/)
  failsWith('prd.md', t => t.replace('primary_persona: PER-001', 'primary_persona: PER-099'), /primary_persona names PER-099/)
  failsWith('prd.md', t => t.replace('persona: PER-003 }', 'persona: PER-099 }'), /approvers names PER-099/)
})

test('segments name real personas, and only one persona is primary', () => {
  failsWith('02-customer-market.md', t => t.replace('    user_personas:\n      - PER-001\n', '    user_personas:\n      - PER-099\n'), /S-001 names PER-099/)
  failsWith('04-personas.md', t => t.replace('short_name: Sponsor\n', 'short_name: Sponsor\n    primary: true\n'), /more than one persona is primary/)
})

test('a journey names real objectives and persona, and its pain points name real stages and needs', () => {
  failsWith('05-user-journeys.md', t => t.replace('objectives: [O-001, O-002, O-003]', 'objectives: [O-099]'), /J-001 names O-099/)
  failsWith('05-user-journeys.md', t => t.replace('  - id: J-001\n    persona: PER-001\n', '  - id: J-001\n    persona: PER-099\n'), /J-001 persona PER-099 is not a persona/)
  const pain = need => t => t.replace('    pain_points:\n', `    pain_points:\n      - pain: Slow\n        stage: ST-002\n        need: ${need}\n`)
  failsWith('05-user-journeys.md', pain('Not one of its needs'), /names a need that is not in its needs/)
})

test('every stage has a decision, and Gherkin capitals are accepted', () => {
  failsWith('05-user-journeys.md', t => t.replace("        decision: What this product is, and what the domain's own words are\n", ''), /stages\[0\]: missing decision/)
  const errors = validateEdited('05-user-journeys.md', t => t.replace('when the expert opens it, then', 'When the expert opens it, Then'))
  assert.deepEqual(errors, [])
})

test('a scenario branches from a step that exists', () =>
  failsWith('06-scenarios.md', t => t.replace('  - id: SC-002\n    branches_from: { scenario: SC-007, step: 5 }\n', '  - id: SC-002\n    branches_from: { scenario: SC-001, step: 99 }\n'), /SC-002 branches from step 99 of SC-001/))

test('a lifecycle state that cannot be reached, or a transition with no by, draws a warning', () => {
  const extra = t => t.replace('      - name: final\n', '      - name: archived\n        meaning: Kept for the record.\n      - name: final\n')
  warnsWith('06-scenarios.md', extra, /LC-001 state "archived" cannot be reached/)
  warnsWith('06-scenarios.md', t => t.replace('        rule: The expert decides the interview is finished (TR-008)\n        by: PER-001\n', '        rule: The expert decides the interview is finished (TR-008)\n'), /transition pending to draft has no by/)
})

test('the scope names a real release, and outside-product stages exist', () => {
  failsWith('07-scope.md', t => t.replace('release: REL-001,', 'release: REL-099,'), /release names REL-099/)
  failsWith('07-scope.md', t => t.replace('  - stage: ST-006\n', '  - stage: ST-099\n'), /outside_product names ST-099/)
})

test('the first release delivers exactly the release line, and names real objectives and waits', () => {
  failsWith('14-release-plan.md', t => t.replace(/(journey_stages:\n(?: +- ST-00\d\n)*?) +- ST-006\n/, '$1'), /REL-001's stages differ from the release line/)
  failsWith('14-release-plan.md', t => t.replace('  - id: REL-002\n', '  - id: REL-002\n    depends_on: [Q-099]\n'), /REL-002 depends_on names Q-099/)
})

test('a criterion that names a control, or is not Given/When/Then, draws a warning', () => {
  warnsWith('08-functional-requirements.md', t => t.replace('when the expert asks where things stand', 'when the expert clicks the status button'), /FR-002 has a criterion that names a control/)
  warnsWith('08-functional-requirements.md', t => t.replace('Given a set where four section documents', 'For a set where four section documents'), /criterion that is not Given\/When\/Then/)
})

test('wireframe marks run 1 to n and match the drawing', () =>
  failsWith('08-wireframes.md', t => t.replace('losing their place. See Q-009 › <5>', 'losing their place. See Q-009 › <6>'), /WF-001 has marks 1, 2, 3, 4, 6 for 6 shows lines/))

// A constraint with characters that YAML treats as special.
const C_099 = `  - id: C-099
    category: legal
    statement: "No figure (or [clause]) is stated; see #3 <here> and \\"quoted\\" text."
    authority: "Example Act 2026, s. 4(1): retention; see #2"
    verification: Checked once per release.
`

test('what an NFR or a constraint applies to exists', () => {
  failsWith('09-nonfunctional-requirements.md', t => t.replace('    applies_to:\n      - FR-004\n', '    applies_to:\n      - FR-099\n'), /applies_to names FR-099/)
  failsWith('10-constraints.md', t => t.replace('constraints: []\n', `constraints:\n${C_099}    applies_to:\n      - FR-099\n`), /C-099 applies_to names FR-099/)
})

test('section 9 can be empty, and a constraint with awkward characters validates', () => {
  assert.deepEqual(validateEdited('10-constraints.md', t => t), [])
  assert.deepEqual(validateEdited('10-constraints.md', t => t.replace('constraints: []\n', `constraints:\n${C_099}`)), [])
})

test('an agent role agrees with how the decision is delegated', () =>
  failsWith('11-decision-rights.md', t => t.replace('stages: [ST-006]', 'stages: [ST-006]\n    agent_role: acts'), /TR-001 is never delegated, but its agent_role is acts/))

test('the change log resolves real questions, and an answered question is resolved', () => {
  failsWith('16-change-log.md', t => t.replace('  - version: 0.7.0\n', '  - version: 0.7.0\n    resolves: [Q-099]\n'), /0\.7\.0 resolves names Q-099/)
  warnsWith('13-open-questions.md', t => t.replace('  - id: Q-001\n', '  - id: Q-001\n    answer: Forty percent.\n'), /Q-001 is answered, and no change log entry resolves it/)
})

test('a synonym the glossary avoids draws a warning where a section uses it', () =>
  warnsWith('15-glossary.md', t => t.replace('  - term: PRD\n', '  - term: PRD\n    avoid: [specification]\n'), /uses "specification"; the glossary says to say "PRD"/))

test('a release-line stage outside the product needs no must requirement', () => {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-validate-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  const edit = (file, fn) => writeFileSync(join(dir, file), fn(readFileSync(join(dir, file), 'utf8')))
  edit('08-functional-requirements.md', t => t.replace(/(  - id: FR-012\n(?:.*\n)*?    priority: )must/, '$1should'))
  assert.ok(validateSet(dir).errors.some(e => /release-line stage ST-005 has no must/.test(e)))
  edit('07-scope.md', t => t.replace('outside_product:\n', 'outside_product:\n  - stage: ST-005\n    workaround: The expert asks an engineer.\n'))
  const errors = validateSet(dir).errors
  assert.ok(!errors.some(e => /ST-005 has no must/.test(e)), errors.join('\n'))
})

// Checks from the 0.8.0 low-priority review.
test('a problem with no cost of inaction draws a warning', () =>
  warnsWith('01-problem-opportunity.md', t => t.replace(/    cost_of_inaction: >-\n(?: {6}.*\n)+/, ''), /P-001 has no cost_of_inaction/))

test('one objective is primary, and it is the one the root names', () => {
  failsWith('03-objectives-metrics.md', t => t.replace('  - id: O-002\n', '  - id: O-002\n    primary: true\n'), /O-002 is primary, but the root's summary\.objective is O-001/)
  failsWith('03-objectives-metrics.md', t => t.replace('  - id: O-002\n', '  - id: O-002\n    primary: true\n').replace('  - id: O-003\n', '  - id: O-003\n    primary: true\n'), /more than one objective is primary/)
})

test('a scenario stage outside its journey, or an unknown persona, draws a warning', () => {
  warnsWith('06-scenarios.md', t => t.replace('    stage: ST-004\n    rejoins: ST-004\n    persona: PER-001\n    variant: alternate\n', '    stage: ST-007\n    rejoins: ST-004\n    persona: PER-001\n    variant: alternate\n'), /SC-002 stage ST-007 is not in its journey J-001/)
  warnsWith('06-scenarios.md', t => t.replace(/(  - id: SC-003\n(?:.*\n)*?    persona: )PER-001/, '$1PER-099'), /SC-003 persona PER-099 is not a persona/)
})

test('an out-of-scope item with no revisit draws a warning', () =>
  warnsWith('07-scope.md', t => t.replace(/    revisit: >-\n(?: {6}.*\n)+/, ''), /has no revisit/))

test('a Given that states an action draws a warning', () =>
  warnsWith('08-functional-requirements.md', t => t.replace('Given a set where four section documents', 'Given the expert types a set where four section documents'), /FR-002 has a Given that states an action, "types"/))

test('a functional requirement must name its journey stage', () =>
  failsWith('08-functional-requirements.md', t => t.replace('    journey_stage: ST-001\n', ''), /missing journey_stage/))

test('a state sketch belongs to another sketch that exists', () => {
  failsWith('08-wireframes.md', t => t.replace('    state_of: WF-001\n    illustrates: [FR-018]\n', '    state_of: WF-099\n    illustrates: [FR-018]\n'), /WF-007 state_of names WF-099/)
  failsWith('08-wireframes.md', t => t.replace('    state_of: WF-001\n    illustrates: [FR-018]\n', '    state_of: WF-007\n    illustrates: [FR-018]\n'), /WF-007 is a state of itself/)
})

test('a target that holds only a standard\'s version names no quantity', () =>
  failsWith('09-nonfunctional-requirements.md', t => t.replace('    target: under 20 seconds at p95, and under 60 seconds at p99\n', '    target: conforms to WCAG 2.2 AA\n'), /target "conforms to WCAG 2\.2 AA" names no quantity/))

test('a second approver is a persona, and not the first approver', () => {
  failsWith('11-decision-rights.md', t => t.replace('approver: PER-003', 'approver: PER-003\n    second_approver: PER-003'), /TR-001 second_approver is the approver/)
  failsWith('11-decision-rights.md', t => t.replace('approver: PER-003', 'approver: PER-003\n    second_approver: PER-099'), /TR-001 second_approver names PER-099/)
})

test('an open question with more than one decider draws a warning', () =>
  warnsWith('13-open-questions.md', t => t.replace('    decider: Richard Hightower\n    consulted: the first three sponsors\n', '    decider: Richard Hightower and the first three sponsors\n'), /Q-005 decider .* names more than one person/))

test('a rejection with no note fails the set', () =>
  failsWith('16-change-log.md', t => t.replace('  - version: 0.7.0\n', '  - version: 0.7.0\n    approvals:\n      - { name: A Sponsor, role: Sponsor, date: 2026-10-26, decision: rejected }\n'), /0\.7\.0 rejection by A Sponsor has no note/))

test('a front-matter change the details block does not show draws a warning in a draft', () =>
  warnsWith('08-functional-requirements.md', t => t.replace('    objective: O-003\n', '    objective: O-001\n'), /08-functional-requirements\.md: the details block does not match/))

test('a stale details block fails a section at review', () =>
  failsWith('08-functional-requirements.md', t => t.replace('status: draft', 'status: review').replace('    objective: O-003\n', '    objective: O-001\n'), /08-functional-requirements\.md: the details block does not match/))

test('the details block shows every field, is idempotent, and leaves the written body alone', () => {
  const HOSTILE = 'Ann (QA) [lead] said "no"; see #3 <b>'
  const front = {
    kind: 'functional-requirements',
    requirements: [{
      id: 'FR-001', capability: HOSTILE, user: 'PER-001', shown_in: 'screen',
      acceptance: ['Given one, when two, then three', 'Given four, when five, then six'],
      evidence: ['plain', { claim: 'a claim', source: 'a source' }],
    }],
  }
  const block = detailsOf(front)
  assert.match(block, /^### FR-001$/m)
  assert.match(block, /^\*\*Capability:\*\* Ann \(QA\) \[lead\] said "no"; see #3 <b>$/m)
  assert.match(block, /^1\. Given one, when two, then three$/m)
  assert.match(block, /^- \*\*Claim:\*\* a claim\n {2}- \*\*Source:\*\* a source$/m)
  assert.match(block, /^\*\*User:\*\* PER-001$/m)
  const body = '# Title\n\nWritten by a person.\n'
  const once = withDetails(body, front)
  assert.equal(withDetails(once, front), once)
  assert.equal(withoutDetails(once), body)
  assert.equal(detailsOf({ kind: 'constraints', constraints: [] }), '')
})

for (const set of ['docs/prd/prd-forge', 'examples/acme-returns']) {
  test(`every details block in ${set} is current`, () => assert.deepEqual(writeDetails(join(REPO, set), true), []))
}

test('a scenario that rejoins a stage outside its journey fails the set', () =>
  failsWith('06-scenarios.md', t => t.replace('    rejoins: ST-004\n', '    rejoins: ST-009\n'), /SC-\d{3} rejoins ST-009, which is not a stage of J-001/))

test('the root block shows the approver what the set holds (FR-013)', () => {
  const set = [
    { kind: 'prd', approvers: [{ name: '"Ops" <lead> #2', role: 'Sponsor; CFO' }] },
    { kind: 'scope', section: 6, order: 70, title: 'Scope', status: 'review', score: 88, in_scope: [{ id: 'IN-001', summary: 'Pick | choose' }], out_of_scope: [{ id: 'OUT-001', summary: 'Teams' }] },
    { kind: 'open-questions', section: 12, order: 130, title: 'Open questions', status: 'draft', blocking: 2, questions: [{ id: 'Q-001', question: 'Who decides?', decider: 'Ann Lee', by: '2027-01-31' }, { id: 'Q-002', question: 'Done?', answer: 'Yes.' }] },
  ]
  const block = detailsOf(set[0], set)
  assert.match(block, /IN-001: Pick \| choose/)
  assert.match(block, /OUT-001: Teams/)
  assert.match(block, /\| 6 \| Scope \| review \| 88\/100 \| — \|/)
  assert.match(block, /Q-001: Who decides\? Decider: Ann Lee\. By: 2027-01-31\./)
  assert.doesNotMatch(block, /Q-002/)
  assert.match(block, /Blocking defects in section 12 \(2\)\./)
  assert.match(block, /"Ops" <lead> #2/)
  assert.equal(withDetails(withDetails('# Root\n', set[0], set), set[0], set), withDetails('# Root\n', set[0], set))
})

test('a section change makes the root block stale (FR-013)', () =>
  warnsWith('10-constraints.md', t => t.replace('score: 95', 'score: 60'), /prd\.md: the details block does not match/))
