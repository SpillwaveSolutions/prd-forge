import type { On } from 'claude-code'
import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'prd-forge',
  component: 'Pane',
  requestId: 'prd-forge',
  props: {
    title: 'PRD',
    isFocused: false,
    bodyColumns: 56,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 24 },
    view: {},
  },
} as const

const front = (fields: string) => `---\n${fields}\n---\n`

const ROOT = `${front(`id: demo
kind: prd
schema: prd-forge/prd-root@1
title: Demo PRD
status: draft
updated: 2026-10-23
product: Demo Returns
slug: demo
order: 0`)}
# Demo PRD

The root body.

\`\`\`wireframe
┌─ Returns desk ─┐
│ [ Accept ] <1> │
└────────────────┘
\`\`\`

![WF-001 drawing](diagrams/WF-001.svg)

<!-- prd-forge:details -->

## Details

<!-- /prd-forge:details -->
`

const JOURNEYS = `${front(`id: demo-journeys
kind: journeys
schema: prd-forge/journeys@1
title: User journeys
status: draft
updated: 2026-10-23
section: 5
order: 50
score: 81
blocking: 0`)}
# User journeys

The golden thread runs from counter to hub. The targets are therefore
intentions, not commitments.

| ID | Persona | Note |
| --- | --- | --- |
| J-001 | PER-001 | starts at the counter |

![J-001 journey diagram](diagrams/J-001.svg)
`

const PERSONAS = `${front(`id: demo-personas
kind: personas
schema: prd-forge/personas@1
title: Users and personas
status: pending
updated: 2026-10-23
section: 4
order: 40
personas:
  - id: PER-001
    name: Ana`)}
# Users and personas

Not interviewed yet.
`

const NOTES = `${front(`doc: ../05-user-journeys.md
score: 81`)}
# Why user journeys scored 81

The hand-off at the hub is implicit. See PER-001.
`

const RUBRIC = `# Journeys

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Handoffs | Implicit | Mentioned | Every change of actor is explicit |

## Blocking defects

- A stage with no actor.

## Industry-standard wording

Not part of the rubric.
`

const J001_TEXT = `+----------------+
| Trigger: walks |
+----------------+
    |
    v
`

const FILES: Record<string, string> = {
  'docs/prd/diagrams/J-001.txt': J001_TEXT,
  'docs/prd/grades/05-user-journeys.md': NOTES,
  'skills/prd-wizard/sections/05-journeys.md': RUBRIC,
  'docs/prd/prd.md': ROOT,
  'docs/prd/04-personas.md': PERSONAS,
  'docs/prd/05-user-journeys.md': JOURNEYS,
}

const entry = (name: string) =>
  ({ name, kind: 'file', size: 100, mtimeMs: 1, isLink: false }) as const

/** Serves the set above from `docs/prd`, and nothing anywhere else. */
const servesTheSet = (on: On) => {
  on('command.register', (_, e) => ({ value: { command: e.name } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('session.cwd', () => ({ value: '/w' }))
  // The engine resolves a relative path against the working directory before it
  // raises the event, so these match by suffix.
  on('fs.list', (_, e) => ({
    value: e.path.endsWith('docs/prd')
      ? [entry('prd.md'), entry('04-personas.md'), entry('05-user-journeys.md')]
      : e.path.endsWith('skills/prd-wizard/sections')
        ? [entry('05-journeys.md')]
        : [],
  }))
  on('fs.read', (_, e) => {
    const found = Object.entries(FILES).find(([path]) => e.path.endsWith(path))
    if (found === undefined) throw new Error(`no such file: ${e.path}`)

    return { value: found[1] }
  })
}

test('the pane opens on the set and draws the root first, on every surface', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })

    expect((await ui.find({ type: 'Text', text: /Demo Returns/ }))?.text).toContain('Demo Returns')
    expect(await ui.find({ type: 'Text', text: /1\/3/ })).toBeTruthy()
    const body = surface === 'terminal' ? 'Text' : 'Markdown'
    expect(await ui.find({ type: body, text: /The root body/ })).toBeTruthy()
    await ui.unmount()
  }
})

test('Next moves to the following document in order', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  await ui.press({ key: 'next' })


  expect(await ui.find({ type: 'Text', text: /2\/3/ })).toBeTruthy()
  expect(await ui.find({ type: 'Markdown', text: /Not interviewed yet/ })).toBeTruthy()
  await ui.unmount()
})

test('the contents list marks a pending section and shows a grade', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  expect(await ui.find({ type: 'Text', text: /\(pending\)/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /\(81\)/ })).toBeTruthy()
  await ui.unmount()
})

test('with no set on disk the pane says so instead of drawing an empty document', async ($, on) => {
  on('command.register', (_, e) => ({ value: { command: e.name } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('fs.list', () => ({ value: [] }))

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })

  expect(await ui.find({ type: 'Text', text: /No PRD set loaded/ })).toBeTruthy()
  expect(await ui.find({ type: 'Markdown' })).toBeFalsy()
  await ui.unmount()
})

test('a value an earlier version of the mod stored is declined', async ($, on) => {
  servesTheSet(on)
  // The shape tag moved on; what the old code wrote must not be drawn. The
  // matcher keeps this to the one key, so the rest of the state is the kit's.
  on('state.get', { plugin: 'prd-forge', key: 'set' }, () => ({
    value: { value: { shape: 'prd-set-0', value: { docs: [{ path: 'gone.md' }] } }, version: 1 },
  }))

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  expect(await ui.find({ type: 'Text', text: /No PRD set loaded/ })).toBeTruthy()
  await ui.unmount()
})

test('the terminal draws joined lines, a grid, and an ID a click follows; Back returns', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  await ui.press({ key: 'go-demo-journeys' })

  expect(await ui.find({ type: 'Text', text: /therefore intentions/ })).toBeTruthy()
  expect(await ui.find({ text: /\| ID \|/ })).toBeFalsy()
  expect(await ui.find({ type: 'Text', text: /^Persona$/ })).toBeTruthy()
  expect(await ui.find({ text: /file:/ })).toBeFalsy()
  const id = (await ui.findAll({ type: 'Button', text: 'PER-001' }))[0]

  await ui.press({ key: id?.key ?? '' })

  expect(await ui.find({ type: 'Text', text: /Not interviewed yet/ })).toBeTruthy()
  await ui.press({ key: 'back' })
  expect(await ui.find({ type: 'Text', text: /therefore intentions/ })).toBeTruthy()
  await ui.unmount()
})

test('a grade opens its reasons, the reasons open the rubric, and Back steps out', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })

  await ui.press({ key: 'grade-demo-journeys' })

  expect(await ui.find({ type: 'Text', text: /User journeys: graded 81\/100/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /Why user journeys scored 81/ })).toBeTruthy()
  await ui.press({ key: 'rubric' })
  expect(await ui.find({ type: 'Text', text: /Every change of actor is explicit/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /A stage with no actor/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /Not part of the rubric/ })).toBeFalsy()
  await ui.press({ key: 'back' })
  expect(await ui.find({ type: 'Text', text: /Why user journeys scored 81/ })).toBeTruthy()
  await ui.press({ key: 'back' })
  expect(await ui.find({ type: 'Text', text: /The root body/ })).toBeTruthy()
  await ui.unmount()
})

test('on the desktop an ID is a markdown link a press follows', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'go-demo-journeys' })
  const href = 'file:///w/docs/prd/04-personas.md#PER-001'

  expect(await ui.find({ type: 'Markdown', text: `[PER-001](${href})` })).toBeTruthy()
  await ui.press({ key: 'body', link: { href } })

  expect(await ui.find({ type: 'Markdown', text: /Not interviewed yet/ })).toBeTruthy()
  await ui.unmount()
})

test('a wireframe fence draws as the sketch itself, line for line, under a caption', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })

  expect(await ui.find({ type: 'Text', text: /illustration, not a design/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: '│ [ Accept ] <1> │' })).toBeTruthy()
  expect(await ui.find({ text: /```/ })).toBeFalsy()
  expect(await ui.find({ text: /WF-001 drawing/ })).toBeFalsy()
  expect(await ui.find({ text: /diagrams\// })).toBeFalsy()
  await ui.unmount()
})

test('the marker comments of the details block do not draw', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })

  expect(await ui.find({ type: 'Text', text: /Details/ })).toBeTruthy()
  expect(await ui.find({ text: /<!--/ })).toBeFalsy()
  await ui.unmount()
})

test('in the terminal a diagram draws as its text view, line for line', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  await ui.press({ key: 'go-demo-journeys' })

  expect(await ui.find({ type: 'Text', text: 'J-001 journey diagram · text view' })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: '| Trigger: walks |' })).toBeTruthy()
  expect(await ui.find({ text: /drawn in the exported Word and PDF/ })).toBeFalsy()
  await ui.unmount()
})

test('a table too narrow for a grid draws one record per row, each cell under its heading', async ($, on) => {
  servesTheSet(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  // A heading named `h` once hid the JSX factory here, and the pane drew nothing.
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal', props: { ...PANE.props, bodyColumns: 8 } })
  // The contents list needs 40 columns, so step to the journeys instead.
  await ui.press({ key: 'next' })
  await ui.press({ key: 'next' })

  expect(await ui.find({ type: 'Text', text: 'Persona: ' })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: 'Note: ' })).toBeTruthy()
  await ui.unmount()
})
