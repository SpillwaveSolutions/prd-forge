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

test('a must scenario off the release line fails the set', () => {
  const errors = validateEdited('06-scenarios.md', text =>
    text.replace('    stage: ST-002\n    persona: PER-001\n    variant: happy\n', '    stage: ST-007\n    persona: PER-001\n    variant: happy\n    priority: must\n'))
  assert.ok(errors.some(e => /SC-001 is a must, but its stage ST-007 is not on the release line/.test(e)), errors.join('\n'))
})

test('a stage satisfaction outside 1 to 5 fails the set', () => {
  const errors = validateEdited('05-user-journeys.md', text =>
    text.replace(/(      - id: ST-001\n)/, '$1        satisfaction: 7\n'))
  assert.ok(errors.some(e => /satisfaction: above 5/.test(e)), errors.join('\n'))
})

test('a journey stage with no acceptance fails the set', () => {
  const errors = validateEdited('05-user-journeys.md', text =>
    text.replace(/(      - id: ST-002\n.*\n.*\n)        acceptance:\n          - >-\n(            .*\n)+/, '$1'))
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
