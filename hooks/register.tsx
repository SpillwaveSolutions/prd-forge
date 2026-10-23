import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { PrdDocRef, PrdSet } from '../types'

const PANE = 'prd-forge'

/** Bump the shape tag whenever PrdSet's fields change. */
const set = atom({ plugin: 'prd-forge', key: 'set' } as const, null, {
  shape: 'prd-set-1',
})
const cursor = atom({ plugin: 'prd-forge', key: 'cursor' } as const, 0)
const notice = atom({ plugin: 'prd-forge', key: 'notice' } as const, null)

type Front = Record<string, string>

/**
 * The top-level scalars of a document's YAML front matter. Indented lines are
 * left alone, so the nested `links:` block passes by: the pane wants the index
 * fields, and `scripts/prd-validate.mjs` reads the links.
 */
const frontMatterOf = (text: string): Front => {
  const front: Front = {}
  if (!text.startsWith('---')) return front
  const end = text.indexOf('\n---', 3)
  const head = end === -1 ? text.slice(3) : text.slice(3, end)
  for (const line of head.split('\n')) {
    const field = /^([A-Za-z_][A-Za-z0-9_-]*):[ \t]*(.*)$/.exec(line)
    if (field === null) continue
    const [, key = '', raw = ''] = field
    const value = raw.trim().replace(/^["']|["']$/g, '')
    if (key !== '' && value !== '' && !value.startsWith('#')) front[key] = value
  }
  return front
}

const bodyOf = (text: string): string => {
  if (!text.startsWith('---')) return text
  const end = text.indexOf('\n---', 3)
  return end === -1 ? text : text.slice(text.indexOf('\n', end + 1) + 1)
}

const wholeOr = (value: string | undefined, fallback: number): number => {
  const n = Number(value)
  return value !== undefined && Number.isFinite(n) ? Math.trunc(n) : fallback
}

const docOf = (path: string, front: Front): PrdDocRef => ({
  path,
  id: front.id ?? path,
  kind: front.kind ?? 'section',
  title: front.title ?? path.slice(path.lastIndexOf('/') + 1),
  section: front.section === undefined ? null : wholeOr(front.section, 0),
  order: wholeOr(front.order, 999),
  status: front.status ?? 'unknown',
  score: front.score === undefined ? null : wholeOr(front.score, 0),
  blocking: front.blocking === undefined ? null : wholeOr(front.blocking, 0),
})

type Scanned = { set: PrdSet; mtimeMs: number }

/** Reads one directory as a PRD set; undefined when it holds no `kind: prd`. */
const scanDir = async ($: EngineInterface, dir: string): Promise<Scanned | undefined> => {
  const entries = await $.fs.list(dir).catch(() => [])
  const found: { doc: PrdDocRef; front: Front }[] = []
  let mtimeMs = 0
  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.md')) continue
    const path = `${dir}/${entry.name}`
    const text = await $.fs.read(path).catch(() => undefined)
    if (typeof text !== 'string') continue
    const front = frontMatterOf(text)
    found.push({ doc: docOf(path, front), front })
    mtimeMs = Math.max(mtimeMs, entry.mtimeMs)
  }
  const root = found.find(one => one.doc.kind === 'prd' || one.doc.kind === 'backlog')
  if (root === undefined) return undefined
  const sections = found
    .filter(one => one !== root)
    .sort((a, b) => a.doc.order - b.doc.order || a.doc.path.localeCompare(b.doc.path))
  return {
    mtimeMs,
    set: {
      dir,
      root: root.doc.path,
      product: root.front.product ?? root.doc.title,
      docs: [root.doc, ...sections.map(one => one.doc)],
    },
  }
}

/** The named directory, else the newest set one level below it. */
const discover = async ($: EngineInterface, dir: string): Promise<PrdSet | null> => {
  const here = await scanDir($, dir)
  if (here !== undefined) return here.set
  const entries = await $.fs.list(dir).catch(() => [])
  let best: Scanned | undefined
  for (const entry of entries) {
    if (entry.kind !== 'dir') continue
    const one = await scanDir($, `${dir}/${entry.name}`)
    if (one !== undefined && (best === undefined || one.mtimeMs > best.mtimeMs)) best = one
  }
  return best?.set ?? null
}

const statusOf = (docs: readonly PrdDocRef[]): string => {
  const done = docs.filter(doc => doc.status === 'final' || doc.status === 'review').length
  const blocking = docs.reduce((sum, doc) => sum + (doc.blocking ?? 0), 0)
  return `${done}/${docs.length} written${blocking === 0 ? '' : `, ${blocking} blocking`}`
}

/** The dim note beside a contents row: what still has to happen to it. */
const markerOf = (doc: PrdDocRef): string =>
  doc.status === 'pending'
    ? '(pending)'
    : doc.blocking !== null && doc.blocking > 0
      ? `(${doc.blocking} blocking)`
      : doc.score !== null
        ? `(${doc.score})`
        : ''

/** Whether a written path is a document of the set under `home`. */
const isOfTheSet = (path: string, home: string): boolean =>
  path.endsWith('.md') && path.includes(home)

/** Reads the set at `dir` into state and reports what it came to. */
async function rescan($: EngineInterface, dir: string): Promise<PrdSet | null> {
  const found = await discover($, dir)
  await update($, set, () => found)
  await update($, notice, () =>
    found === null
      ? `No PRD set under ${dir}. Run the prd-wizard skill to write one.`
      : `${found.dir} — ${statusOf(found.docs)}`,
  )
  if (found !== null) {
    await update($, cursor, at => Math.min(Math.max(at, 0), found.docs.length - 1))
  }

  return found
}

/** Moves the pane by `delta` documents, stopping at either end. */
async function step($: EngineInterface, delta: number): Promise<void> {
  const current = await read($, set)
  if (current === null) return
  const last = current.docs.length - 1
  await update($, cursor, at => Math.min(Math.max(at + delta, 0), last))
}

export const register: Register = (on, options) => {
  const configured = typeof options.docs_dir === 'string' ? options.docs_dir : 'docs/prd'
  const home = configured.replace(/\/+$/, '') || 'docs/prd'

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'prd',
      description: 'Open the PRD stepper pane on a PRD document set',
      argumentHint: '[directory]',
    })
    await $.command.register({
      name: 'prd-step',
      description: 'Move the PRD stepper pane to another section',
      argumentHint: '[next|prev|first|last|<n>]',
    })
    const found = await rescan($, home)
    if (found !== null) void $.ui.open({ id: PANE, title: 'PRD' })

    return next(e)
  })

  on('command.run', { command: 'prd' }, async ($, e) => {
    const dir = e.args.trim().replace(/\/+$/, '')
    const found = await rescan($, dir === '' ? home : dir)
    await $.ui.open({ id: PANE, title: 'PRD', focus: true, rows: 24, columns: 64 })

    return {
      text:
        found === null
          ? `No PRD set found under ${dir === '' ? home : dir}. Ask for the prd-wizard skill to interview you and write one.`
          : `PRD pane open on ${found.dir}: ${found.product}, ${statusOf(found.docs)}.`,
    }
  })

  on('command.run', { command: 'prd-step' }, async ($, e) => {
    const current = await read($, set)
    if (current === null) return { text: `No PRD set loaded. Run /prd first.` }
    const last = current.docs.length - 1
    const word = e.args.trim().toLowerCase()
    const at =
      word === 'prev' || word === 'back'
        ? (await read($, cursor)) - 1
        : word === 'first'
          ? 0
          : word === 'last'
            ? last
            : word === '' || word === 'next'
              ? (await read($, cursor)) + 1
              : wholeOr(word, 1) - 1
    const landed = Math.min(Math.max(at, 0), last)
    await update($, cursor, () => landed)
    await $.ui.open({ id: PANE, title: 'PRD' })
    const doc = current.docs[landed]

    return {
      text:
        doc === undefined
          ? `PRD ${landed + 1}/${last + 1}.`
          : `PRD ${landed + 1}/${last + 1}: ${doc.title} (${doc.status}) — ${doc.path}`,
    }
  })

  // The wizard writes the set while the pane is open: pick its edits up. The
  // `.catch` replays what `next` settled to, so a failure here never denies
  // the write.
  on('tool.call', { tool: 'Write' }, async ($, e, next) => {
    const ran = await next(e)
    if (isOfTheSet(e.file_path, home) && ran.deny === undefined && ran.isError !== true) {
      await rescan($, home)
    }

    return ran
  }).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'Edit' }, async ($, e, next) => {
    const ran = await next(e)
    if (isOfTheSet(e.file_path, home) && ran.deny === undefined && ran.isError !== true) {
      await rescan($, home)
    }

    return ran
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Markdown, Text } = $.ui.resolve(e)
    const current = await read($, set)
    const line = await read($, notice)

    if (current === null) {
      return (
        <Box flexDirection="column" gap={1}>
          <Text weight="semibold">No PRD set loaded</Text>
          <Text dimColor>{line ?? `Looked under ${home}.`}</Text>
          <Text dimColor>
            Ask for the prd-wizard skill: it interviews you and writes the set.
          </Text>
          <Button key="rescan" label="Rescan" hotkey="r" onPress={() => void rescan($, home)} />
        </Box>
      )
    }

    const at = Math.min(Math.max(await read($, cursor), 0), current.docs.length - 1)
    const doc = current.docs[at]
    if (doc === undefined) {
      return (
        <Box flexDirection="column">
          <Text dimColor>The set changed while the pane was open. Press Rescan.</Text>
          <Button key="rescan" label="Rescan" hotkey="r" onPress={() => void rescan($, home)} />
        </Box>
      )
    }
    const text = await $.fs.read(doc.path).catch(() => undefined)
    const body =
      typeof text === 'string' ? bodyOf(text).trim() : `_Could not read ${doc.path}._`
    const hasContents = e.props.bodyColumns >= 40

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text weight="semibold">{current.product}</Text>
          <Text dimColor>
            {at + 1}/{current.docs.length}
            {doc.section === null ? '  root' : `  section ${doc.section}`}
            {'  '}
            {doc.status}
            {doc.score === null ? '' : `  graded ${doc.score}/100`}
            {doc.blocking === null || doc.blocking === 0 ? '' : `  ${doc.blocking} blocking`}
          </Text>
        </Box>
        <Box gap={1}>
          <Button key="prev" label="< Prev" hotkey="p" onPress={() => void step($, -1)} />
          <Button
            key="next"
            label="Next >"
            hotkey="n"
            variant="primary"
            onPress={() => void step($, 1)}
          />
          <Button key="rescan" label="Rescan" hotkey="r" onPress={() => void rescan($, home)} />
        </Box>
        {line !== null && <Text dimColor>{line}</Text>}
        {hasContents && (
          <Box flexDirection="column">
            {current.docs.map((one, index) => (
              <Button
                key={`go-${one.id}`}
                plain
                dimColor={index !== at}
                onPress={() => void update($, cursor, () => index)}
              >
                {index === at ? '> ' : '  '}
                {one.title} <Text dimColor>{markerOf(one)}</Text>
              </Button>
            ))}
          </Box>
        )}
        <Markdown key="body" text={body === '' ? '_This section is empty._' : body} />
      </Box>
    )
  })
}
