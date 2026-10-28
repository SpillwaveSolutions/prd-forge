import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { PrdDocRef, PrdPage, PrdSet, PrdView } from '../types'
import { drawMarkdown, linkIds, reflow, type Linker } from './markdown'

const PANE = 'prd-forge'

/** Bump the shape tag whenever PrdSet's fields change. */
const set = atom({ plugin: 'prd-forge', key: 'set' } as const, null, {
  shape: 'prd-set-3',
})
const cursor = atom({ plugin: 'prd-forge', key: 'cursor' } as const, 0)
const page = atom({ plugin: 'prd-forge', key: 'page' } as const, 'doc')
const history = atom({ plugin: 'prd-forge', key: 'history' } as const, [])
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
  graded: front.graded ?? null,
})

/** The `id: X-001` entries a document's front matter defines. */
const idsOf = (text: string): string[] => {
  const end = text.startsWith('---') ? text.indexOf('\n---', 3) : -1
  const head = end === -1 ? '' : text.slice(3, end)
  return [...head.matchAll(/^\s*(?:-\s+)?id:\s*([A-Z]+-\d+)\s*$/gm)].map(m => m[1] ?? '')
}

type Scanned = { set: PrdSet; mtimeMs: number }

/** Reads one directory as a PRD set; undefined when it holds no `kind: prd`. */
const scanDir = async ($: EngineInterface, dir: string): Promise<Scanned | undefined> => {
  const entries = await $.fs.list(dir).catch(() => [])
  const found: { doc: PrdDocRef; front: Front }[] = []
  const ids: Record<string, string> = {}
  let mtimeMs = 0
  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.md')) continue
    const path = `${dir}/${entry.name}`
    const text = await $.fs.read(path).catch(() => undefined)
    if (typeof text !== 'string') continue
    const front = frontMatterOf(text)
    found.push({ doc: docOf(path, front), front })
    for (const id of idsOf(text)) ids[id] ??= path
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
      ids,
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
      : ''

/** Whether a written path is a document of the set under `home`. */
const isOfTheSet = (path: string, home: string): boolean =>
  path.endsWith('.md') && path.includes(home)

/** The `file:` URL of a set document, `#id` added when a link names one. */
const urlOf = (cwd: string, path: string, id?: string): string =>
  `file://${encodeURI(path.startsWith('/') ? path : `${cwd}/${path}`)}${id === undefined ? '' : `#${id}`}`

/** Where the grading pass writes a document's grading notes: `grades/` beside it. */
const notesOf = (path: string): string => {
  const cut = path.lastIndexOf('/') + 1
  return `${path.slice(0, cut)}grades/${path.slice(cut)}`
}

/** What a score means and what to do about it, from the grading reference. */
const bandOf = (score: number): string =>
  score >= 85
    ? 'Buildable. Offer review status.'
    : score >= 70
      ? 'Buildable with questions. Fix the weakest dimension first.'
      : score >= 50
        ? 'Not yet buildable. Return to the interview for this section.'
        : 'Not started in earnest. Interview for this section again.'

const SCORING =
  'Each dimension scores 0, 2 or 4 against the anchors below, 1 and 3 between them. ' +
  'The grade is 100 × the sum ÷ (4 × the number of dimensions). ' +
  'A blocking defect is not points: one keeps a section out of review at any grade.'

/** A kind's rubric and blocking-defect list, cut from the wizard's section guide. */
const rubricOf = async ($: EngineInterface, kind: string): Promise<string | undefined> => {
  const dir = `${$.plugin.root}/skills/prd-wizard/sections`
  const entries = await $.fs.list(dir).catch(() => [])
  const name = kind === 'prd' ? '00-root.md' : entries.find(one => one.name.endsWith(`-${kind}.md`))?.name
  if (name === undefined) return undefined
  const text = await $.fs.read(`${dir}/${name}`).catch(() => undefined)
  if (typeof text !== 'string') return undefined
  const start = text.search(/^## Rubric/m)
  if (start === -1) return undefined
  const rest = text.slice(start)
  const blocking = rest.search(/^## Blocking defects/m)
  const after = blocking === -1 ? -1 : rest.slice(blocking + 1).search(/^## /m)
  return after === -1 ? rest : rest.slice(0, blocking + 1 + after)
}

/** Reads the set at `dir` into state and reports what it came to. */
async function rescan($: EngineInterface, dir: string): Promise<PrdSet | null> {
  const found = await discover($, dir)
  await update($, set, () => found)
  await update($, notice, () =>
    found === null
      ? `No PRD set under ${dir}. Run the prd-wizard skill to write one.`
      : `${found.dir}: ${statusOf(found.docs)}`,
  )
  if (found !== null) {
    await update($, cursor, at => Math.min(Math.max(at, 0), found.docs.length - 1))
  }

  return found
}

/** Shows document `at` on `to`, and keeps the screen left behind for Back. */
async function go($: EngineInterface, at: number, to: PrdPage): Promise<void> {
  const current = await read($, set)
  if (current === null) return
  const landed = Math.min(Math.max(at, 0), current.docs.length - 1)
  const here: PrdView = { at: await read($, cursor), page: await read($, page) }
  if (here.at === landed && here.page === to) return
  await update($, history, past => [...past, here].slice(-50))
  await update($, cursor, () => landed)
  await update($, page, () => to)
}

/** Returns to the screen shown before the last move. */
async function back($: EngineInterface): Promise<void> {
  const past = await read($, history)
  const last = past[past.length - 1]
  if (last === undefined) return
  await update($, history, all => all.slice(0, -1))
  await update($, cursor, () => last.at)
  await update($, page, () => last.page)
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
    await go($, at, 'doc')
    await $.ui.open({ id: PANE, title: 'PRD' })
    const landed = await read($, cursor)
    const doc = current.docs[landed]

    return {
      text:
        doc === undefined
          ? `PRD ${landed + 1}/${last + 1}.`
          : `PRD ${landed + 1}/${last + 1}: ${doc.title} (${doc.status}), ${doc.path}`,
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
    const terminal = e.surface === 'terminal' ? $.ui.resolve(e) : undefined
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
          <Button key="rescan" label="Refresh" hotkey="r" onPress={() => void rescan($, home)} />
        </Box>
      )
    }

    const at = Math.min(Math.max(await read($, cursor), 0), current.docs.length - 1)
    const doc = current.docs[at]
    if (doc === undefined) {
      return (
        <Box flexDirection="column">
          <Text dimColor>The set changed while the pane was open. Press Refresh.</Text>
          <Button key="rescan" label="Refresh" hotkey="r" onPress={() => void rescan($, home)} />
        </Box>
      )
    }
    const view = await read($, page)
    const canGoBack = (await read($, history)).length > 0
    const cwd = await $.session.cwd().catch(() => '')
    const columns = e.props.bodyColumns
    const dir = doc.path.slice(0, doc.path.lastIndexOf('/') + 1)

    // An ID another document defines, or a relative link to a set document,
    // as the index of that document. On the document's own page its own IDs
    // stay plain: a link to the page already shown goes nowhere.
    const target = (ref: string): number | undefined => {
      const path = /^[A-Z]{1,4}-\d+$/.test(ref)
        ? current.ids[ref]
        : ref.endsWith('.md') && !/^[a-z]+:/.test(ref)
          ? `${dir}${ref.replace(/^\.\//, '')}`
          : undefined
      if (path === undefined || (view === 'doc' && path === doc.path)) return undefined
      const index = current.docs.findIndex(one => one.path === path)
      return index === -1 ? undefined : index
    }
    const linker: Linker = {
      target,
      go: (to, ref) => {
        void go($, to, 'doc')
        void update($, notice, () => `${ref}: ${current.docs[to]?.title ?? ''}`)
      },
    }
    // Surfaces other than the terminal draw markdown links well: the IDs
    // become `file:` links there, and a press on one is followed the same way.
    const hrefOf = (ref: string): string | undefined => {
      const to = target(ref)
      const path = to === undefined ? undefined : current.docs[to]?.path
      return path === undefined ? undefined : urlOf(cwd, path, ref.endsWith('.md') ? undefined : ref)
    }
    const follow = (link: { href: string }) => {
      const [address = '', id] = link.href.split('#')
      const to = current.docs.findIndex(one => urlOf(cwd, one.path) === address)
      if (to !== -1) linker.go(to, id ?? current.docs[to]?.title ?? '')
    }
    const draw = (md: string, key: string, views: Record<string, string> = {}) => {
      if (terminal !== undefined) return drawMarkdown(terminal, md, columns, linker, key, views)
      const text = linkIds(reflow(md), hrefOf)
      const ours = [...new Set(text.match(/file:\/\/[^)\s]+/g) ?? [])].slice(0, 256)
      return <Markdown key={key} text={text} onLinkPress={follow} pressableLinks={ours} />
    }
    const linkText = (text: string) => (
      <Text color="suggestion" underline>
        {text}
      </Text>
    )

    let content
    if (view === 'grade' && doc.score !== null) {
      const notes = await $.fs.read(notesOf(doc.path)).catch(() => undefined)
      content = (
        <Box flexDirection="column" gap={1}>
          <Text weight="bold">
            {doc.title}: graded {doc.score}/100
          </Text>
          <Text dimColor>
            {bandOf(doc.score)}
            {doc.graded === null ? '' : ` Graded ${doc.graded}.`}
            {` ${doc.blocking ?? 0} blocking defects.`}
          </Text>
          <Button key="rubric" plain onPress={() => void go($, at, 'rubric')}>
            {linkText(`See the rubric for ${doc.title}`)}
          </Button>
          {typeof notes === 'string' ? (
            draw(bodyOf(notes).trim(), 'notes')
          ) : (
            <Text dimColor>
              No grading notes are recorded for this grade. Ask the prd-wizard skill to grade
              the section again: the grading pass writes its reasons to {notesOf(doc.path)}.
            </Text>
          )}
        </Box>
      )
    } else if (view === 'rubric') {
      const rubric = await rubricOf($, doc.kind)
      content = (
        <Box flexDirection="column" gap={1}>
          <Text weight="bold">Rubric for {doc.title}</Text>
          <Text dimColor>{SCORING}</Text>
          {rubric === undefined ? (
            <Text dimColor>No rubric is defined for documents of kind {doc.kind}.</Text>
          ) : (
            draw(rubric, 'rubric')
          )}
        </Box>
      )
    } else {
      const text = await $.fs.read(doc.path).catch(() => undefined)
      const body =
        typeof text === 'string' ? bodyOf(text).trim() : `_Could not read ${doc.path}._`
      // The terminal cannot show a diagram, so read the text view that
      // prd-diagrams.mjs writes beside each one: diagrams/J-001.txt.
      const views: Record<string, string> = {}
      if (terminal !== undefined) {
        for (const [, path = ''] of body.matchAll(/^!\[[^\]]*\]\(([^)\s]+)\.svg\)\s*$/gm)) {
          const view = await $.fs.read(`${dir}${path}.txt`).catch(() => undefined)
          if (typeof view === 'string') views[`${path}.svg`] = view
        }
      }
      content = draw(body === '' ? '_This section is empty._' : body, 'body', views)
    }

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text weight="semibold">{current.product}</Text>
          <Box columnGap={2} flexWrap="wrap">
            <Text dimColor>
              {at + 1}/{current.docs.length}
              {doc.section === null ? '  root' : `  section ${doc.section}`}
              {'  '}
              {doc.status}
            </Text>
            {doc.score !== null && (
              <Button key="grade" plain onPress={() => void go($, at, 'grade')}>
                {linkText(`graded ${doc.score}/100`)}
              </Button>
            )}
            {doc.blocking !== null && doc.blocking > 0 && (
              <Text dimColor>{doc.blocking} blocking</Text>
            )}
          </Box>
        </Box>
        <Box gap={1}>
          <Button key="prev" label="< Prev" hotkey="p" onPress={() => void go($, at - 1, 'doc')} />
          <Button
            key="next"
            label="Next >"
            hotkey="n"
            variant="primary"
            onPress={() => void go($, at + 1, 'doc')}
          />
          <Button key="rescan" label="Refresh" hotkey="r" onPress={() => void rescan($, home)} />
          <Button
            key="back"
            label="Back"
            hotkey="b"
            dimColor={!canGoBack}
            onPress={() => void back($)}
          />
        </Box>
        {line !== null && <Text dimColor>{line}</Text>}
        {columns >= 40 && (
          <Box flexDirection="column">
            {current.docs.map((one, index) => (
              <Box key={`row-${one.id}`} columnGap={1}>
                <Button
                  key={`go-${one.id}`}
                  plain
                  dimColor={index !== at}
                  onPress={() => void go($, index, 'doc')}
                >
                  {index === at ? '> ' : '  '}
                  {one.title}
                </Button>
                {one.score !== null && (
                  <Button key={`grade-${one.id}`} plain onPress={() => void go($, index, 'grade')}>
                    {linkText(`(${one.score})`)}
                  </Button>
                )}
                {markerOf(one) !== '' && <Text dimColor>{markerOf(one)}</Text>}
              </Box>
            ))}
          </Box>
        )}
        {content}
      </Box>
    )
  })
}
