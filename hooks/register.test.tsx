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

The golden thread runs from counter to hub.
`

const PERSONAS = `${front(`id: demo-personas
kind: personas
schema: prd-forge/personas@1
title: Users and personas
status: pending
updated: 2026-10-23
section: 4
order: 40`)}
# Users and personas

Not interviewed yet.
`

const FILES: Record<string, string> = {
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
  // The engine resolves a relative path against the working directory before it
  // raises the event, so these match by suffix.
  on('fs.list', (_, e) => ({
    value: e.path.endsWith('docs/prd')
      ? [entry('prd.md'), entry('04-personas.md'), entry('05-user-journeys.md')]
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
    expect(await ui.find({ type: 'Markdown', text: /The root body/ })).toBeTruthy()
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
