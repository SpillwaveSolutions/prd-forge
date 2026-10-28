#!/usr/bin/env node
// Writes each document's front matter into a details block at the end of its
// body, so a reader who sees only the body (the pane, GitHub, the wiki) sees
// every item and field. The front matter stays the source: never edit the block.
//
//   node prd-details.mjs <set directory> [--check]
//
// The block sits between the two marker comments below. A run replaces only the
// block, so a second run changes nothing. With --check it writes nothing and
// exits 1 when a block is missing or stale.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseYaml, splitFrontMatter } from './prd-validate.mjs'

export const START = '<!-- prd-forge:details -->'
export const END = '<!-- /prd-forge:details -->'

// Per kind: the front-matter lists that hold its items, the field that heads
// each item, and, for items with no id, the field that names its heading.
// Keep in step with ITEM_LISTS in prd_export.py.
const ITEM_LISTS = {
  'problem-opportunity': [['problems', 'statement']],
  'customer-market': [['segments', 'name'], ['competitors', 'name']],
  'objectives-metrics': [['objectives', 'objective'], ['guardrails', 'metric']],
  personas: [['personas', 'name']],
  journeys: [['journeys', 'goal']],
  scenarios: [['scenarios', 'context'], ['lifecycles', 'subject']],
  scope: [['in_scope', 'summary'], ['out_of_scope', 'summary']],
  'functional-requirements': [['requirements', 'capability']],
  wireframes: [['wireframes', 'title']],
  'nonfunctional-requirements': [['requirements', 'statement'], ['not_applicable', 'category']],
  constraints: [['constraints', 'statement']],
  'decision-rights': [['decisions', 'decision']],
  'assumptions-risks-dependencies': [['assumptions', 'assumption'], ['risks', 'risk'], ['dependencies', 'need']],
  'open-questions': [['questions', 'question']],
  'release-plan': [['releases', 'name']],
  glossary: [['terms', 'term']],
  'change-log': [['changes', 'summary', 'version']],
  features: [['features', 'name']],
  epics: [['epics', 'goal']],
  stories: [['stories', 'capability']],
  spikes: [['spikes', 'question']],
}

// Fields the pane header, the links, or the grading pass already show.
const SKIP = new Set([
  'id', 'kind', 'schema', 'title', 'status', 'updated', 'links', 'score', 'blocking',
  'graded', 'domain', 'section', 'order', 'product', 'slug',
])

// Ordered lists: each entry is a step or a criterion that a reader counts.
const NUMBERED = new Set(['acceptance', 'course', 'steps', 'exit_criteria'])

// Keep in step with LABEL in prd_export.py.
const LABEL = {
  id: 'ID', why_now: 'Why now', cost_of_inaction: 'Cost of inaction', end_state: 'End state',
  pain_points: 'Pain points', golden_thread: 'Golden thread', journey_stage: 'Journey stage',
  expected_outcome: 'Expected outcome', applies_to: 'Applies to', never_delegated: 'Never delegated',
  delegable_to_agent: 'An agent may decide', evidence_required: 'Evidence required',
  if_false: 'If false', validated_by: 'Validated by', see_also: 'See also', not: 'Not',
  target_date: 'Target date', willingness_to_pay: 'Willingness to pay', our_edge: 'Our edge',
  why_we_win: 'Why we win', release_line: 'Release line', in_scope: 'In scope',
  out_of_scope: 'Out of scope', non_goals: 'Non-goals', timebox_days: 'Time-box (days)',
  ends_in: 'Ends in',
}
const label = key => LABEL[key] ?? (key[0].toUpperCase() + key.slice(1)).replaceAll('_', ' ')

const text = value => String(value).replace(/\s+/g, ' ').trim()
const isEmpty = value => value === undefined || value === null || (Array.isArray(value) && value.length === 0)
const isItem = value => value !== null && typeof value === 'object' && !Array.isArray(value)

/** A value on one line: a mapping becomes `Label: value; Label: value`. */
function inline(value) {
  if (typeof value === 'boolean') return value ? 'yes' : 'no'
  if (Array.isArray(value)) return value.map(inline).join(', ')
  if (isItem(value)) {
    return Object.entries(value).filter(([, v]) => !isEmpty(v)).map(([k, v]) => `${label(k)}: ${inline(v).replace(/\.$/, '')}`).join('; ')
  }
  return text(value)
}

/** One field as markdown paragraphs. `level` is the heading level for nested items. */
function field(key, value, level) {
  if (isEmpty(value)) return []
  if (Array.isArray(value)) {
    if (value.every(v => isItem(v) && typeof v.id === 'string')) {
      return [`**${label(key)}**`, '', ...value.flatMap(v => item(v, 'name', undefined, level))]
    }
    const short = !NUMBERED.has(key) && !value.some(isItem) && inline(value).length <= 80
    if (short) return [`**${label(key)}:** ${inline(value)}`, '']
    const marker = NUMBERED.has(key) ? (i => `${i + 1}.`) : () => '-'
    return [`**${label(key)}:**`, '', ...value.map((v, i) => `${marker(i)} ${inline(v)}`), '']
  }
  if (isItem(value)) {
    const parts = Object.entries(value).filter(([, v]) => !isEmpty(v))
    return [`**${label(key)}:**`, '', ...parts.map(([k, v]) => `- ${label(k)}: ${inline(v)}`), '']
  }
  return [`**${label(key)}:** ${inline(value)}`, '']
}

/** One item: a heading, then each field. A long headline moves under the heading. */
function item(one, headField, nameField, level) {
  const headline = isEmpty(one[headField]) ? '' : inline(one[headField])
  const name = one.id ?? (nameField ? one[nameField] : undefined)
  const short = headline.length <= 90
  const heading = name === undefined ? headline : short ? `${name} ${headline}` : String(name)
  const lines = [`${'#'.repeat(Math.min(level, 6))} ${text(heading)}`, '']
  if (name !== undefined && !short) lines.push(...field(headField, one[headField], level + 1))
  for (const [key, value] of Object.entries(one)) {
    if (key === 'id' || key === headField || (key === nameField && name !== undefined)) continue
    lines.push(...field(key, value, level + 1))
  }
  return lines
}

/** The block for one document, or '' when its front matter holds nothing to show. */
export function detailsOf(front) {
  const groups = (ITEM_LISTS[front.kind] ?? []).filter(([key]) => Array.isArray(front[key]) && front[key].length > 0)
  const listed = new Set((ITEM_LISTS[front.kind] ?? []).map(([key]) => key))
  const lines = []
  for (const [key, value] of Object.entries(front)) {
    if (!SKIP.has(key) && !listed.has(key)) lines.push(...field(key, value, 3))
  }
  const level = groups.length > 1 ? 4 : 3
  for (const [key, headField, nameField] of groups) {
    if (groups.length > 1) lines.push(`### ${label(key)}`, '')
    for (const one of front[key]) if (isItem(one)) lines.push(...item(one, headField, nameField, level))
  }
  if (lines.length === 0) return ''
  while (lines.at(-1) === '') lines.pop()
  return [START, '', '## Details', '', 'Generated from the front matter. Do not edit this block.', '', ...lines, '', END].join('\n')
}

/** The body without its details block, as a person wrote it. */
export function withoutDetails(body) {
  const from = body.indexOf(START)
  if (from === -1) return body
  const to = body.indexOf(END, from)
  return (body.slice(0, from) + (to === -1 ? '' : body.slice(to + END.length))).replace(/\n+$/, '\n')
}

/** The body with its block written or replaced. */
export function withDetails(body, front) {
  const block = detailsOf(front)
  const own = withoutDetails(body).replace(/\n+$/, '')
  return block === '' ? `${own}\n` : `${own}\n\n${block}\n`
}

export function writeDetails(dir, check = false) {
  const stale = []
  for (const file of readdirSync(dir).filter(f => f.endsWith('.md')).sort()) {
    const path = join(dir, file)
    const source = readFileSync(path, 'utf8')
    const { front: raw, rest } = splitFrontMatter(source)
    if (raw.trim() === '') continue
    const front = parseYaml(raw) ?? {}
    if (front.kind === undefined) continue
    const body = withDetails(rest, front)
    if (body === rest) continue
    stale.push(file)
    if (!check) writeFileSync(path, source.slice(0, source.length - rest.length) + body)
  }
  return stale
}

function main(argv) {
  const args = argv.filter(a => !a.startsWith('--'))
  if (args.length === 0) {
    console.error('usage: prd-details.mjs <set directory> [--check]')
    return 2
  }
  const check = argv.includes('--check')
  const stale = writeDetails(resolve(args[0]), check)
  for (const file of stale) console.log(`${check ? 'stale' : 'wrote'}: ${file}`)
  if (stale.length === 0) console.log('Every details block is current.')
  return check && stale.length > 0 ? 1 : 0
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  process.exit(main(process.argv.slice(2)))
}
