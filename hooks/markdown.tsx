import type { Elements } from 'claude-code'

/**
 * Draws a PRD document's markdown in the terminal pane. The terminal's own
 * `Markdown` shows a link as `text (url)` where the terminal has no OSC 8
 * hyperlinks, and sizes tables to the window, not the pane: this draws links
 * as colored text a click follows, and tables as a grid that fits the pane.
 */

type Ui = Elements['terminal']

/** Resolves an ID (`Q-001`) or a link target to a document index, and goes there. */
export type Linker = {
  target: (ref: string) => number | undefined
  go: (to: number, ref: string) => void
}

const FENCE = /^\s*(```|~~~)/
const BLOCK_START = /^\s*(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|\||(-{3,}|\*{3,}|_{3,})\s*$)/
const ID = /(?<![\w-])([A-Z]{1,4}-\d{2,4})(?![\w-])/g

/**
 * Joins the soft-wrapped lines of each paragraph and list item. A pane's
 * markdown keeps every newline, so 80-column source lines would break short.
 */
export const reflow = (md: string): string => {
  const out: string[] = []
  let fenced = false
  for (const line of md.split('\n')) {
    const fence = FENCE.test(line)
    const prev = out[out.length - 1]
    const joins =
      !fenced &&
      !fence &&
      line.trim() !== '' &&
      prev !== undefined &&
      prev.trim() !== '' &&
      !BLOCK_START.test(line) &&
      !/^\s*(#|\||```|~~~)/.test(prev) &&
      !/(\s{2}|\\)$/.test(prev)
    if (joins) out[out.length - 1] = `${prev} ${line.trim()}`
    else out.push(line)
    if (fence) fenced = !fenced
  }
  return out.join('\n')
}

/**
 * Rewrites each linkable ID and set link as a markdown link to `hrefOf`'s
 * answer, for surfaces whose own `Markdown` draws links well. Code spans,
 * fences and other links stay as they are.
 */
export const linkIds = (md: string, hrefOf: (ref: string) => string | undefined): string => {
  let fenced = false
  return md
    .split('\n')
    .map(line => {
      const fence = FENCE.test(line)
      if (fence) fenced = !fenced
      if (fenced || fence) return line
      return line
        .split(/(`[^`]*`|\[[^\]]*\]\([^)]*\))/)
        .map((part, index) => {
          if (index % 2 === 1) {
            const link = /^\[([^\]]*)\]\(([^)]*)\)$/.exec(part)
            const href = link === null ? undefined : hrefOf(link[2] ?? '')
            return href === undefined ? part : `[${link?.[1]}](${href})`
          }
          return part.replace(ID, (id: string) => {
            const href = hrefOf(id)
            return href === undefined ? id : `[${id}](${href})`
          })
        })
        .join('')
    })
    .join('\n')
}

type Block = { space: boolean } & (
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'para' | 'quote'; text: string }
  | { kind: 'item'; indent: number; marker: string; text: string }
  | { kind: 'code'; lang: string; lines: string[] }
  | { kind: 'rule' }
  | { kind: 'image'; alt: string; path: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
)

const cellsOf = (line: string): string[] =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())

const TABLE_RULE = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/

/** One block per line of reflowed markdown, fences and tables taken whole. */
const blocksOf = (md: string): Block[] => {
  const blocks: Block[] = []
  const lines = md.split('\n')
  let space = false
  for (let at = 0; at < lines.length; at++) {
    const line = lines[at] ?? ''
    const was = space
    space = false
    if (line.trim() === '') {
      space = blocks.length > 0
      continue
    }
    // A marker comment, such as the edges of the generated details block.
    if (/^\s*<!--.*-->\s*$/.test(line)) {
      space = was
      continue
    }
    if (FENCE.test(line)) {
      const code: string[] = []
      while (++at < lines.length && !FENCE.test(lines[at] ?? '')) code.push(lines[at] ?? '')
      blocks.push({ space: was, kind: 'code', lang: line.replace(FENCE, '').trim(), lines: code })
      continue
    }
    if (/^\s*\|/.test(line) && TABLE_RULE.test(lines[at + 1] ?? '')) {
      const rows: string[][] = []
      at += 2
      while (at < lines.length && /^\s*\|/.test(lines[at] ?? '')) rows.push(cellsOf(lines[at++] ?? ''))
      at -= 1
      blocks.push({ space: was, kind: 'table', head: cellsOf(line), rows })
      continue
    }
    const image = /^!\[([^\]]*)\]\(([^)]*)\)\s*$/.exec(line)
    if (image !== null) {
      blocks.push({ space: was, kind: 'image', alt: image[1] ?? 'diagram', path: image[2] ?? '' })
      continue
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    const item = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(line)
    const quote = /^\s*>\s?(.*)$/.exec(line)
    if (heading !== null) {
      blocks.push({ space: was, kind: 'heading', level: heading[1]?.length ?? 1, text: heading[2] ?? '' })
    } else if (item !== null) {
      const marker = /\d/.test(item[2] ?? '') ? (item[2] ?? '') : '•'
      blocks.push({ space: was, kind: 'item', indent: Math.floor((item[1]?.length ?? 0) / 2), marker, text: item[3] ?? '' })
    } else if (quote !== null) {
      blocks.push({ space: was, kind: 'quote', text: quote[1] ?? '' })
    } else if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ space: was, kind: 'rule' })
    } else {
      blocks.push({ space: was, kind: 'para', text: line.trim() })
    }
  }
  return blocks
}

type Style = { bold?: true; italic?: true; code?: true; dim?: true }
type Run = Style & { text: string; to?: number; ref?: string; href?: string }

const INLINE =
  /`([^`]+)`|\*\*(.+?)\*\*|__(.+?)__|(?<![\w*])\*(?!\s)(.+?)\*(?![\w*])|(?<![\w_])_(?!\s)(.+?)_(?![\w_])|\[([^\]]+)\]\(([^)\s]+)\)/g

/** Splits text into styled runs, IDs and set links resolved to their documents. */
const runsOf = (text: string, base: Style, link: Linker): Run[] => {
  const runs: Run[] = []
  const plain = (t: string, style: Style) => {
    let last = 0
    for (const m of t.matchAll(ID)) {
      const to = link.target(m[0])
      if (to === undefined) continue
      if (m.index > last) runs.push({ ...style, text: t.slice(last, m.index) })
      runs.push({ ...style, text: m[0], to, ref: m[0] })
      last = m.index + m[0].length
    }
    if (last < t.length) runs.push({ ...style, text: t.slice(last) })
  }
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) plain(text.slice(last, m.index), base)
    const [, code, b1, b2, i1, i2, label, href] = m
    if (code !== undefined) runs.push({ ...base, code: true, text: code })
    else if (b1 !== undefined || b2 !== undefined) plain(b1 ?? b2 ?? '', { ...base, bold: true })
    else if (i1 !== undefined || i2 !== undefined) plain(i1 ?? i2 ?? '', { ...base, italic: true })
    else if (label !== undefined && href !== undefined) {
      const to = link.target(href) ?? link.target(label)
      if (to !== undefined) runs.push({ ...base, text: label, to, ref: label })
      else if (/^https?:/.test(href)) runs.push({ ...base, text: label, href })
      else runs.push({ ...base, text: label })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) plain(text.slice(last), base)
  return runs
}

/** Draws a block's inline text: one wrapping `Text`, or words that wrap when it holds links. */
const drawInline = (ui: Ui, text: string, base: Style, link: Linker, key: string) => {
  const { Box, Button, Link, Text } = ui
  const runs = runsOf(text, base, link)
  const styled = (run: Run, k: string) => (
    <Text
      key={k}
      weight={run.bold ? 'bold' : undefined}
      italic={run.italic}
      dimColor={run.dim}
      color={run.code ? 'permission' : run.href !== undefined ? 'suggestion' : undefined}
    >
      {run.href !== undefined ? <Link href={run.href}>{run.text}</Link> : run.text}
    </Text>
  )
  if (!runs.some(run => run.to !== undefined)) {
    return <Text key={key}>{runs.map((run, r) => styled(run, `${key}-${r}`))}</Text>
  }
  // A Button cannot sit inside a Text, so the line is laid out word by word.
  // ponytail: one element per word, cheap enough for a section's links
  const words: Run[][] = [[]]
  for (const run of runs) {
    run.text.split(/(\s+)/).forEach((piece, p) => {
      if (p % 2 === 1) words.push([])
      else if (piece !== '') words[words.length - 1]?.push({ ...run, text: piece })
    })
  }
  const part = (run: Run, k: string) =>
    run.to === undefined ? (
      styled(run, k)
    ) : (
      <Button key={k} plain onPress={() => link.go(run.to ?? 0, run.ref ?? run.text)}>
        <Text color="suggestion" underline weight={run.bold ? 'bold' : undefined}>
          {run.text}
        </Text>
      </Button>
    )
  return (
    <Box key={key} flexWrap="wrap" columnGap={1}>
      {words
        .filter(word => word.length > 0)
        .map((word, w) =>
          word.length === 1 && word[0] !== undefined ? (
            part(word[0], `${key}-${w}`)
          ) : (
            <Box key={`${key}-${w}`}>{word.map((run, r) => part(run, `${key}-${w}-${r}`))}</Box>
          ),
        )}
    </Box>
  )
}

/** What a cell shows, near enough to size a column by. */
const shownLength = (cell: string): number =>
  cell.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').length

export const GAP = 2

/**
 * Column widths that fit `columns`: each column gets what it needs when all
 * fit, else a fair share, with the rest handed to the columns still short.
 * Undefined when a column would fall under 8, too narrow for a grid.
 */
export const widthsOf = (head: string[], rows: string[][], columns: number): number[] | undefined => {
  const need = head.map((h, c) => Math.max(shownLength(h), ...rows.map(row => shownLength(row[c] ?? ''))))
  const room = columns - GAP * (head.length - 1)
  const fair = Math.floor(room / head.length)
  if (fair < 8) return undefined
  const widths = need.map(n => Math.min(n, fair))
  let left = room - widths.reduce((sum, w) => sum + w, 0)
  // ponytail: greedy by shortfall, fine for the handful of columns a PRD table has
  while (left > 0) {
    const short = widths.map((w, c) => (need[c] ?? 0) - w)
    const c = short.indexOf(Math.max(...short))
    if ((short[c] ?? 0) <= 0) break
    const give = Math.min(left, short[c] ?? 0)
    widths[c] = (widths[c] ?? 0) + give
    left -= give
  }
  return widths
}

/**
 * Draws reflowed markdown as pane elements, `columns` wide. `views` holds the
 * text view of a diagram by the image path the markdown links, such as
 * `diagrams/J-001.svg`.
 */
export const drawMarkdown = (ui: Ui, md: string, columns: number, link: Linker, key: string, views: Record<string, string> = {}) => {
  const { Box, Text } = ui
  const drawBlock = (block: Block, k: string) => {
    switch (block.kind) {
      case 'heading':
        return (
          <Box key={k} flexDirection="column">
            {drawInline(ui, block.text, { bold: true }, link, `${k}-h`)}
            {block.level <= 2 && <Text dimColor>{'─'.repeat(Math.min(columns, block.text.length + 2))}</Text>}
          </Box>
        )
      case 'para':
        return drawInline(ui, block.text, {}, link, k)
      case 'quote':
        return (
          <Box key={k}>
            <Text dimColor>{'│ '}</Text>
            <Box flexShrink={1}>{drawInline(ui, block.text, { dim: true }, link, `${k}-q`)}</Box>
          </Box>
        )
      case 'item':
        return (
          <Box key={k} paddingLeft={block.indent * 2}>
            <Text>{`${block.marker} `}</Text>
            <Box flexShrink={1} flexGrow={1}>
              {drawInline(ui, block.text, {}, link, `${k}-i`)}
            </Box>
          </Box>
        )
      case 'code':
        // A wireframe is a sketch: drawn whole, cut at the pane's edge rather
        // than wrapped, since a wrapped line breaks the drawing.
        if (block.lang === 'wireframe') {
          return (
            <Box key={k} flexDirection="column">
              <Text dimColor>wireframe · illustration, not a design</Text>
              {block.lines.map((line, l) => (
                <Text key={`${k}-${l}`} wrap="truncate-end">
                  {line === '' ? ' ' : line}
                </Text>
              ))}
            </Box>
          )
        }
        return (
          <Box key={k} flexDirection="column" paddingLeft={2}>
            {block.lines.map((line, l) => (
              <Text key={`${k}-${l}`} color="permission">
                {line === '' ? ' ' : line}
              </Text>
            ))}
          </Box>
        )
      case 'image': {
        // The terminal cannot draw the picture. Draw its text view, cut at the
        // pane's edge like a wireframe, or nothing when it has none.
        const view = views[block.path]
        if (view !== undefined) {
          return (
            <Box key={k} flexDirection="column">
              <Text dimColor>{`${block.alt} · text view`}</Text>
              {view.replace(/\n+$/, '').split('\n').map((line, l) => (
                <Text key={`${k}-${l}`} wrap="truncate-end">
                  {line === '' ? ' ' : line}
                </Text>
              ))}
            </Box>
          )
        }
        return null
      }
      case 'rule':
        return (
          <Text key={k} dimColor>
            {'─'.repeat(columns)}
          </Text>
        )
      case 'table': {
        const widths = widthsOf(block.head, block.rows, columns)
        // Too narrow for a grid: one record per row, the first cell its name.
        if (widths === undefined) {
          return (
            <Box key={k} flexDirection="column" gap={1}>
              {block.rows.map((row, r) => (
                <Box key={`${k}-${r}`} flexDirection="column">
                  {drawInline(ui, row[0] ?? '', { bold: true }, link, `${k}-${r}-0`)}
                  {block.head.slice(1).map((name, c) => (
                    <Box key={`${k}-${r}-${c + 1}`}>
                      <Text dimColor>{`${name}: `}</Text>
                      <Box flexShrink={1}>{drawInline(ui, row[c + 1] ?? '', {}, link, `${k}-${r}-${c + 1}-v`)}</Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )
        }
        const rule = '─'.repeat(widths.reduce((sum, w) => sum + w, 0) + GAP * (widths.length - 1))
        return (
          <Box key={k} flexDirection="column">
            {[block.head, ...block.rows].map((row, r) => (
              <Box key={`${k}-${r}`} flexDirection="column">
                <Box columnGap={GAP}>
                  {widths.map((w, c) => (
                    <Box key={`${k}-${r}-${c}`} width={w} flexShrink={0}>
                      {drawInline(ui, row[c] || ' ', r === 0 ? { bold: true } : {}, link, `${k}-${r}-${c}-t`)}
                    </Box>
                  ))}
                </Box>
                <Text dimColor>{rule}</Text>
              </Box>
            ))}
          </Box>
        )
      }
    }
  }
  return (
    <Box key={key} flexDirection="column">
      {blocksOf(reflow(md)).map((block, b) => block.kind === 'image' && views[block.path] === undefined ? null : (
        <Box key={`${key}-${b}`} flexDirection="column" marginTop={block.space ? 1 : 0}>
          {drawBlock(block, `${key}-${b}-x`)}
        </Box>
      ))}
    </Box>
  )
}
