// Tests for prd-diagrams.mjs. Each generated diagram must render with mmdc, the
// tool the export depends on, including when names carry characters Mermaid
// treats as syntax.
//
//   node --test scripts/prd-diagrams.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { decisionsMermaid, drawSet, journeyMermaid, lifecycleMermaid, releaseMermaid, satisfactionMermaid, scenarioMermaid } from './prd-diagrams.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')

const hasMmdc = spawnSync('mmdc', ['--version']).status === 0

/** Renders `mermaid` with mmdc; returns the SVG, or throws with mmdc's error text. */
function render(mermaid) {
  const dir = mkdtempSync(join(tmpdir(), 'prd-diagrams-'))
  writeFileSync(join(dir, 'd.mmd'), mermaid)
  const run = spawnSync('mmdc', ['-q', '-i', join(dir, 'd.mmd'), '-o', join(dir, 'd.svg')], { encoding: 'utf8' })
  if (run.status !== 0 || !existsSync(join(dir, 'd.svg'))) throw new Error(`${run.stderr}${run.stdout}`)
  return readFileSync(join(dir, 'd.svg'), 'utf8')
}

/** mmdc's error text, or '' when it drew. */
const renderError = mermaid => {
  try {
    render(mermaid)
    return ''
  } catch (error) {
    return error.message
  }
}

/** The text an SVG shows a reader: tags dropped, entities decoded. */
const shown = svg =>
  svg.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ')

// Names a real expert might write: parentheses, brackets, quotes, and Mermaid's
// own punctuation.
const HOSTILE = [
  'Product sponsor (PER-004)',
  'Claims lead [acting]',
  'Ops "night shift" manager',
  'R&D lead; reviewer #2',
  'Buyer {EU} | finance',
  'QA <lead>',
]

test('a journey renders when an actor name holds parentheses (the 0.4.1 bug)', { skip: !hasMmdc }, () => {
  const journey = {
    id: 'J-001', trigger: 'A sponsor (PER-004) asks for a plan', golden_thread: true, end_state: 'Approved (v1)',
    stages: [
      { id: 'ST-001', name: 'Expert drafts', actor: 'Domain expert (PER-001)' },
      { id: 'ST-002', name: 'Sponsor approves', actor: 'Product sponsor (PER-004)' },
    ],
  }
  assert.equal(renderError(journeyMermaid(journey)), '')
})

test('a journey renders with every awkward name at each hand-off', { skip: !hasMmdc }, () => {
  const stages = HOSTILE.map((actor, i) => ({ id: `ST-00${i + 1}`, name: `Step ${actor}`, actor }))
  const journey = { id: 'J-009', trigger: HOSTILE.join(' / '), end_state: HOSTILE[0], stages }
  assert.equal(renderError(journeyMermaid(journey)), '')
})

test('a scenario renders as a flowchart: what the user sees slanted, what they do plain', { skip: !hasMmdc }, () => {
  const scenario = {
    id: 'SC-009', variant: 'exception', priority: 'must', context: HOSTILE.join(', '), trigger: HOSTILE[1],
    course: [...HOSTILE.map(name => `They see ${name}`), ...HOSTILE.map(name => `They say ${name}`)],
    expected_outcome: HOSTILE[2],
  }
  const mermaid = scenarioMermaid(scenario)
  assert.equal(renderError(mermaid), '')
  assert.match(mermaid, /^flowchart TB$/m)
  assert.doesNotMatch(mermaid, /sequenceDiagram/)
  assert.match(mermaid, /s0\[\/"They see /)
  assert.match(mermaid, /s6\["They say /)
  assert.match(mermaid, /exception, must/)
  assert.match(mermaid, /<b>Given<\/b>[\s\S]*<b>When<\/b>[\s\S]*<b>Then<\/b>/)
})

test('a journey with every stage scored draws its satisfaction curve', { skip: !hasMmdc }, () => {
  const stages = HOSTILE.map((name, i) => ({ id: `ST-00${i + 1}`, name: `${name}: step, one`, actor: name, satisfaction: (i % 5) + 1 }))
  const mermaid = satisfactionMermaid({ id: 'J-009', stages })
  assert.match(mermaid, /^journey$/m)
  const text = shown(render(mermaid))
  for (const name of HOSTILE) assert.ok(text.includes(`${name}: step, one`), `"${name}" is missing from: ${text.slice(0, 300)}`)
})

test('a journey with any stage unscored draws no satisfaction curve, rather than invent a score', () => {
  const stages = [{ id: 'ST-001', name: 'A', actor: 'X', satisfaction: 3 }, { id: 'ST-002', name: 'B', actor: 'X' }]
  assert.equal(satisfactionMermaid({ id: 'J-001', stages }), undefined)
  assert.equal(satisfactionMermaid({ id: 'J-002', stages: [] }), undefined)
})

test('the release line renders, with stages in no release in a column of their own', { skip: !hasMmdc }, () => {
  const journeys = [{ id: 'J-001', stages: HOSTILE.map((name, i) => ({ id: `ST-00${i + 1}`, name })) }]
  const releases = [
    { id: 'REL-001', name: HOSTILE[0], target_date: '2027-03-31', journey_stages: ['ST-001', 'ST-002'] },
    { id: 'REL-002', name: HOSTILE[4] },
  ]
  const requirements = [{ id: 'FR-001', journey_stage: 'ST-001', priority: 'must' }]
  const mermaid = releaseMermaid(releases, journeys, requirements)
  assert.equal(renderError(mermaid), '')
  assert.match(mermaid, /In no release/)
  assert.match(mermaid, /1 must requirement</)
  assert.match(mermaid, /Nothing planned yet/)
  assert.match(mermaid, /REL001 ~~~ REL002\n {2}REL002 ~~~ unplanned/)
})

test('the decision rights render, with approvers that are not persona ids', { skip: !hasMmdc }, () => {
  const decisions = HOSTILE.map((name, i) => ({
    id: `TR-00${i + 1}`, decision: name, approver: i % 2 === 0 ? 'PER-001' : name,
    never_delegated: i % 3 === 0, delegable_to_agent: i % 3 === 1,
  }))
  const mermaid = decisionsMermaid(decisions, { 'PER-001': 'DomainExpert' })
  assert.equal(renderError(mermaid), '')
  assert.match(mermaid, /<b>DomainExpert<\/b>/)
  assert.doesNotMatch(mermaid, /PER-001/)
})

for (const set of ['docs/prd/prd-forge', 'examples/acme-returns']) {
  test(`drawSet draws and links ${set}, and a second run changes nothing`, { skip: !hasMmdc }, () => {
    const dir = join(mkdtempSync(join(tmpdir(), 'prd-set-')), 'set')
    cpSync(join(REPO, set), dir, { recursive: true })
    assert.deepEqual(drawSet(dir), [])
    const before = Object.fromEntries(readdirSync(dir).filter(f => f.endsWith('.md')).map(f => [f, readFileSync(join(dir, f), 'utf8')]))
    assert.deepEqual(drawSet(dir), [])
    for (const [file, text] of Object.entries(before)) assert.equal(readFileSync(join(dir, file), 'utf8'), text, file)
    assert.deepEqual(drawSet(dir, { check: true }), [])
    // Every image a document links to exists, as .svg and as the .png the export embeds.
    for (const text of Object.values(before)) {
      for (const [, path] of text.matchAll(/^!\[[^\]]*\]\((diagrams\/[^)]+)\.svg\)$/gm)) {
        assert.ok(existsSync(join(dir, `${path}.svg`)), path)
        assert.ok(existsSync(join(dir, `${path}.png`)), path)
      }
    }
  })
}

test('every awkward name reads exactly as written in each kind of diagram', { skip: !hasMmdc }, () => {
  const scenario = { id: 'SC-009', variant: 'happy', context: 'c', course: HOSTILE.map(name => `They say ${name}`) }
  const stages = HOSTILE.map((name, i) => ({ id: `ST-00${i + 1}`, name, actor: name }))
  const decisions = HOSTILE.map((name, i) => ({ id: `TR-00${i + 1}`, decision: name, approver: 'PER-001' }))
  const drawn = [
    shown(render(scenarioMermaid(scenario))),
    shown(render(journeyMermaid({ id: 'J-009', trigger: 't', end_state: 'e', stages }))),
    shown(render(releaseMermaid([{ id: 'REL-001', name: 'R', journey_stages: stages.map(s => s.id) }], [{ id: 'J-009', stages }], []))),
    shown(render(decisionsMermaid(decisions, {}))),
  ]
  for (const text of drawn) {
    for (const name of HOSTILE) assert.ok(text.includes(name), `"${name}" is missing from: ${text.slice(0, 300)}`)
    assert.doesNotMatch(text, /#\d+;|#quot;|<b>/)
  }
})

test('drawSet draws, links, and sizes a satisfaction curve once every stage is scored', { skip: !hasMmdc }, () => {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-set-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  const file = join(dir, '05-user-journeys.md')
  let score = 0
  writeFileSync(file, readFileSync(file, 'utf8').replace(/(\n {6}- id: ST-\d{3}\n)/g, m => `${m}        satisfaction: ${(score++ % 5) + 1}\n`))
  assert.deepEqual(drawSet(dir), [])
  assert.match(readFileSync(file, 'utf8'), /^!\[J-001 satisfaction\]\(diagrams\/J-001-satisfaction\.svg\)$/m)
  // Rendered at its own width, the curve is wide and short, not a small
  // drawing at the top of an empty page.
  const png = readFileSync(join(dir, 'diagrams/J-001-satisfaction.png'))
  const [width, height] = [png.readUInt32BE(16), png.readUInt32BE(20)]
  assert.ok(width > 2 * height, `${width} x ${height}`)
  assert.doesNotMatch(readFileSync(join(dir, 'diagrams/J-001-satisfaction.svg'), 'utf8').slice(0, 600), /<svg[^>]* height="/)
})

test('a lifecycle draws as a state diagram, every name and rule as written', { skip: !hasMmdc }, () => {
  const states = HOSTILE.map(name => ({ name, meaning: 'm' }))
  const transitions = HOSTILE.slice(1).map((name, i) => ({ from: HOSTILE[i], to: name, when: `move ${i}`, rule: `rule ${name}`, by: 'PER-001' }))
  const mermaid = lifecycleMermaid({ id: 'LC-009', subject: 's', states, initial: HOSTILE[0], final: [HOSTILE[5]], transitions }, { 'PER-001': 'DomainExpert' })
  assert.match(mermaid, /\(DomainExpert\)/)
  assert.doesNotMatch(mermaid, /PER-001/)
  assert.match(mermaid, /^stateDiagram-v2$/m)
  assert.match(mermaid, /\[\*\] --> s0/)
  assert.match(mermaid, /s5 --> \[\*\]/)
  const text = shown(render(mermaid))
  for (const name of HOSTILE) {
    assert.ok(text.includes(name), `state "${name}" is missing`)
    if (name !== HOSTILE[0]) assert.ok(text.includes(`rule ${name}`), `rule for "${name}" is missing`)
  }
})
