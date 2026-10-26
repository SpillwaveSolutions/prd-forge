// Tests for the YAML subset in prd-validate.mjs, which prd-diagrams.mjs reuses.
// PyYAML is the oracle: for every document in the shipped sets, the subset must
// read the front matter exactly as a full YAML parser does.
//
//   node --test scripts/prd-validate.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseYaml, splitFrontMatter } from './prd-validate.mjs'

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
