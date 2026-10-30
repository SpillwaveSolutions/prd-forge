#!/usr/bin/env node
// Validates a prd-forge document set: YAML front matter against the JSON
// Schemas in ../schemas, the link graph between documents, and the
// cross-section id references. No dependencies.
//
//   node prd-validate.mjs <set directory> [--json] [--quiet]

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { withDetails, withoutDetails } from './prd-details.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCHEMA_DIR = resolve(HERE, '..', 'schemas')

// ---------------------------------------------------------------- YAML subset

/** Splits `---\n...\n---\n` off the head of a document. */
export function splitFrontMatter(text) {
  const body = { front: '', rest: text }
  if (!text.startsWith('---')) return body
  const lines = text.split('\n')
  let end = -1
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trimEnd() === '---' || lines[i].trimEnd() === '...') { end = i; break }
  }
  if (end === -1) return body
  return { front: lines.slice(1, end).join('\n'), rest: lines.slice(end + 1).join('\n') }
}

const isBlank = line => line.trim() === '' || line.trim().startsWith('#')
const indentOf = line => line.length - line.trimStart().length

/** Strips a trailing `# comment` that is outside quotes. */
function stripComment(s) {
  let quote = null
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]
    if (quote !== null) { if (c === quote) quote = null; continue }
    if (c === '"' || c === "'") { quote = c; continue }
    if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) return s.slice(0, i)
  }
  return s
}

function scalar(raw) {
  const s = stripComment(raw).trim()
  if (s === '' || s === '~' || s === 'null') return null
  if (s === 'true') return true
  if (s === 'false') return false
  if (/^-?\d+$/.test(s)) return Number(s)
  if (/^-?\d*\.\d+$/.test(s)) return Number(s)
  if ((s.startsWith('"') && s.endsWith('"') && s.length > 1) ||
      (s.startsWith("'") && s.endsWith("'") && s.length > 1)) {
    const inner = s.slice(1, -1)
    return s[0] === '"' ? inner.replace(/\\"/g, '"').replace(/\\n/g, '\n') : inner.replace(/''/g, "'")
  }
  return s
}

/** `{a: 1, b: x}` / `[a, b]`, one line, no nesting of block constructs. */
function flow(raw) {
  const s = raw.trim()
  const parts = (inner, close) => {
    const out = []
    let depth = 0, quote = null, start = 0
    for (let i = 0; i < inner.length; i += 1) {
      const c = inner[i]
      if (quote !== null) { if (c === quote) quote = null; continue }
      if (c === '"' || c === "'") { quote = c; continue }
      if (c === '{' || c === '[') depth += 1
      else if (c === '}' || c === ']') depth -= 1
      else if (c === ',' && depth === 0) { out.push(inner.slice(start, i)); start = i + 1 }
    }
    const tail = inner.slice(start)
    if (tail.trim() !== '' || out.length > 0) out.push(tail)
    return out.filter(p => p.trim() !== '' || close === ']')
  }
  if (s.startsWith('{')) {
    const map = {}
    for (const part of parts(s.slice(1, -1), '}')) {
      const cut = splitKey(part)
      if (cut === null) continue
      map[cut.key] = value(cut.value)
    }
    return map
  }
  if (s.startsWith('[')) return parts(s.slice(1, -1), ']').map(value)
  return scalar(s)
}

const value = raw => {
  const s = raw.trim()
  return s.startsWith('{') || s.startsWith('[') ? flow(s) : scalar(s)
}

/** Finds the `key:` of a mapping line, respecting quotes. */
function splitKey(line) {
  const s = line.trimStart()
  let quote = null
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]
    if (quote !== null) { if (c === quote) quote = null; continue }
    if (c === '"' || c === "'") { quote = c; continue }
    if (c === ':' && (i + 1 === s.length || /[\s]/.test(s[i + 1]))) {
      const key = s.slice(0, i).trim().replace(/^["']|["']$/g, '')
      return { key, value: s.slice(i + 1) }
    }
  }
  return null
}

function blockScalar(lines, at, indent, style) {
  const chunks = []
  let i = at
  let own = null
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { chunks.push(''); i += 1; continue }
    const ind = indentOf(line)
    if (ind <= indent) break
    if (own === null) own = ind
    chunks.push(line.slice(own))
    i += 1
  }
  while (chunks.length > 0 && chunks[chunks.length - 1] === '') chunks.pop()
  let text
  if (style.startsWith('|')) text = chunks.join('\n')
  else {
    // folded: blank lines become newlines, consecutive lines join with a space
    text = chunks.reduce((acc, line, n) => {
      if (n === 0) return line
      if (line === '' || acc.endsWith('\n')) return `${acc}\n`
      return `${acc} ${line}`
    }, '')
    text = text.replace(/\n(?!\n)/g, '\n')
  }
  if (style.includes('-')) text = text.replace(/\n+$/, '')
  else if (!style.includes('+')) text = `${text.replace(/\n+$/, '')}\n`
  return { text, next: i }
}

/**
 * A plain or quoted scalar that runs on over lines indented past `indent`:
 * YAML folds those lines into the first with single spaces.
 */
function runOn(lines, from, indent, first) {
  let text = first
  let i = from
  while (i < lines.length && lines[i].trim() !== '' && indentOf(lines[i]) > indent) {
    text = `${text} ${lines[i].trim()}`
    i += 1
  }
  return { text, next: i }
}

function parseBlock(lines, from, indent) {
  let i = from
  while (i < lines.length && isBlank(lines[i])) i += 1
  if (i >= lines.length) return { node: null, next: i }
  if (indentOf(lines[i]) < indent) return { node: null, next: i }

  if (lines[i].trimStart().startsWith('- ') || lines[i].trimStart() === '-') {
    const own = indentOf(lines[i])
    const list = []
    while (i < lines.length) {
      if (isBlank(lines[i])) { i += 1; continue }
      const ind = indentOf(lines[i])
      if (ind < own) break
      const trimmed = lines[i].trimStart()
      if (ind > own || !(trimmed === '-' || trimmed.startsWith('- '))) break
      const after = trimmed === '-' ? '' : trimmed.slice(2)
      const cut = splitKey(after)
      if (after.trim() === '') {
        const nested = parseBlock(lines, i + 1, own + 1)
        list.push(nested.node); i = nested.next
      } else if (cut !== null && !after.trim().startsWith('{')) {
        // a map whose first key sits on the dash line
        const inner = [`${' '.repeat(own + 2)}${after}`]
        let j = i + 1
        while (j < lines.length && (isBlank(lines[j]) || indentOf(lines[j]) > own)) {
          if (!isBlank(lines[j]) && indentOf(lines[j]) <= own + 1) break
          inner.push(lines[j]); j += 1
        }
        const nested = parseBlock(inner, 0, own + 2)
        list.push(nested.node); i = j
      } else if (/^[|>][-+]?\d*$/.test(after.trim())) {
        const folded = blockScalar(lines, i + 1, own, after.trim())
        list.push(folded.text); i = folded.next
      } else {
        const run = runOn(lines, i + 1, own, after)
        list.push(value(run.text)); i = run.next
      }
    }
    return { node: list, next: i }
  }

  const own = indentOf(lines[i])
  const map = {}
  while (i < lines.length) {
    if (isBlank(lines[i])) { i += 1; continue }
    const ind = indentOf(lines[i])
    if (ind < own) break
    if (ind > own) { i += 1; continue }
    const cut = splitKey(lines[i])
    if (cut === null) { i += 1; continue }
    const raw = stripComment(cut.value).trim()
    if (/^[|>][-+]?\d*$/.test(raw)) {
      const folded = blockScalar(lines, i + 1, own, raw)
      map[cut.key] = folded.text; i = folded.next
    } else if (raw === '') {
      const nested = parseBlock(lines, i + 1, own + 1)
      map[cut.key] = nested.node; i = nested.next
    } else {
      const run = runOn(lines, i + 1, own, raw)
      map[cut.key] = value(run.text); i = run.next
    }
  }
  return { node: map, next: i }
}

export function parseYaml(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  if (lines.some(line => line.includes('\t') && indentOf(line) === 0 === false && /^\s*\t/.test(line))) {
    throw new Error('front matter contains a tab character')
  }
  const { node } = parseBlock(lines, 0, 0)
  return node === null ? {} : node
}

// ------------------------------------------------------- JSON Schema (subset)

const schemaCache = new Map()

function loadSchema(name) {
  if (schemaCache.has(name)) return schemaCache.get(name)
  const path = join(SCHEMA_DIR, name)
  if (!existsSync(path)) throw new Error(`schema not found: ${name}`)
  const parsed = JSON.parse(readFileSync(path, 'utf8'))
  schemaCache.set(name, parsed)
  return parsed
}

function deref(ref, current) {
  const [file, pointer] = ref.split('#')
  const root = file === '' ? current : loadSchema(file)
  let node = root
  for (const part of (pointer ?? '').split('/').filter(p => p !== '')) {
    node = node?.[part.replace(/~1/g, '/').replace(/~0/g, '~')]
    if (node === undefined) throw new Error(`cannot resolve $ref ${ref}`)
  }
  return { node, root }
}

const typeOf = v =>
  v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v

function check(value, schema, root, path, out) {
  if (schema === true || schema === undefined) return
  if (schema.$ref !== undefined) {
    const { node, root: next } = deref(schema.$ref, root)
    check(value, node, next, path, out)
    const rest = { ...schema }; delete rest.$ref
    if (Object.keys(rest).length > 0) check(value, rest, root, path, out)
    return
  }
  for (const sub of schema.allOf ?? []) check(value, sub, root, path, out)
  if (schema.oneOf !== undefined) {
    const ok = schema.oneOf.some(sub => { const t = []; check(value, sub, root, path, t); return t.length === 0 })
    if (!ok) out.push(`${path}: matches none of the allowed forms`)
  }
  if (schema.type !== undefined) {
    const kinds = Array.isArray(schema.type) ? schema.type : [schema.type]
    const actual = typeOf(value)
    const fits = kinds.some(k => k === actual || (k === 'number' && actual === 'integer'))
    if (!fits) { out.push(`${path}: expected ${kinds.join(' or ')}, got ${actual}`); return }
  }
  if (schema.enum !== undefined && !schema.enum.includes(value)) {
    out.push(`${path}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`)
  }
  if (typeof value === 'string') {
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
      out.push(`${path}: ${JSON.stringify(value.slice(0, 60))} does not match ${schema.pattern}`)
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      out.push(`${path}: shorter than ${schema.minLength} characters`)
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) out.push(`${path}: below ${schema.minimum}`)
    if (schema.maximum !== undefined && value > schema.maximum) out.push(`${path}: above ${schema.maximum}`)
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      out.push(`${path}: needs at least ${schema.minItems} ${schema.minItems === 1 ? 'entry' : 'entries'}`)
    }
    value.forEach((item, i) => check(item, schema.items, root, `${path}[${i}]`, out))
  }
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of schema.required ?? []) {
      if (value[key] === undefined || value[key] === null) out.push(`${path}: missing ${key}`)
    }
    for (const [key, sub] of Object.entries(schema.properties ?? {})) {
      if (value[key] !== undefined) check(value[key], sub, root, `${path}.${key}`, out)
    }
    if (schema.additionalProperties === false) {
      const known = new Set(Object.keys(schema.properties ?? {}))
      for (const key of Object.keys(value)) {
        if (!known.has(key)) out.push(`${path}: unexpected field ${key}`)
      }
    }
  }
}

const SCHEMA_FILE = {
  prd: 'prd-root.json',
  'problem-opportunity': 'problem-opportunity.json',
  'customer-market': 'customer-market.json',
  'objectives-metrics': 'objectives-metrics.json',
  personas: 'personas.json',
  journeys: 'journeys.json',
  scenarios: 'scenarios.json',
  scope: 'scope.json',
  'functional-requirements': 'functional-requirements.json',
  wireframes: 'wireframes.json',
  'nonfunctional-requirements': 'nonfunctional-requirements.json',
  constraints: 'constraints.json',
  'decision-rights': 'decision-rights.json',
  'assumptions-risks-dependencies': 'assumptions-risks-dependencies.json',
  'open-questions': 'open-questions.json',
  'release-plan': 'release-plan.json',
  glossary: 'glossary.json',
  'change-log': 'change-log.json',
  'review-comments': 'review-comments.json',
  backlog: 'backlog-root.json',
  features: 'features.json',
  epics: 'epics.json',
  stories: 'stories.json',
  spikes: 'spikes.json',
}

// ------------------------------------------------------------ structural rules

/** The widest a sketch may be: it must fit the pane and a printed page. */
const SKETCH_COLUMNS = 60

/** The lines of the `wireframe` fence under the body heading that names `id`. */
function sketchOf(body, id) {
  // The details block names each WF id again, with no sketch under it.
  const lines = withoutDetails(body).split('\n')
  const head = lines.findIndex(line => /^#{2,4}\s/.test(line) && line.includes(id))
  if (head === -1) return undefined
  for (let i = head + 1; i < lines.length && !/^#{1,4}\s/.test(lines[i]); i++) {
    if (/^```wireframe\s*$/.test(lines[i])) {
      const end = lines.findIndex((line, j) => j > i && /^```\s*$/.test(line))
      return end === -1 ? undefined : lines.slice(i + 1, end)
    }
  }
  return undefined
}

const idsOf = (docs, kind, list, field = 'id') =>
  new Set((docs.find(d => d.front.kind === kind)?.front?.[list] ?? [])
    .filter(one => one !== null && typeof one === 'object')
    .map(one => one[field])
    .filter(one => typeof one === 'string'))

function structural(docs, dir) {
  const errors = []
  const warnings = []
  const byPath = new Map(docs.map(d => [d.file, d]))
  const roots = docs.filter(d => d.front.kind === 'prd' || d.front.kind === 'backlog')

  if (roots.length === 0) errors.push(`${dir}: no document with kind: prd or kind: backlog`)
  if (roots.length > 1) errors.push(`${dir}: ${roots.length} root documents; there must be one`)
  const root = roots[0]

  const seen = new Map()
  for (const doc of docs) {
    const id = doc.front.id
    if (typeof id !== 'string') continue
    if (seen.has(id)) errors.push(`${doc.file}: id "${id}" is also used by ${seen.get(id)}`)
    else seen.set(id, doc.file)
  }

  // links resolve
  for (const doc of docs) {
    const links = doc.front.links
    if (links === undefined || links === null) continue
    const each = []
    for (const key of ['parent', 'prev', 'next']) if (links[key]) each.push([key, links[key]])
    for (const key of ['children', 'related']) {
      for (const [i, one] of (links[key] ?? []).entries()) if (one) each.push([`${key}[${i}]`, one])
    }
    for (const [where, link] of each) {
      if (typeof link !== 'object' || typeof link.path !== 'string') {
        errors.push(`${doc.file}: links.${where} is not a link object with a path`)
        continue
      }
      const target = basename(link.path)
      const found = byPath.get(target)
      if (found === undefined) errors.push(`${doc.file}: links.${where} points at ${link.path}, which is not in the set`)
      else if (link.id !== undefined && found.front.id !== undefined && link.id !== found.front.id) {
        errors.push(`${doc.file}: links.${where} says id ${link.id}, but ${target} is ${found.front.id}`)
      }
      // FR-020: the root's contents say what each document says of itself
      if (found !== undefined && doc === root && where.startsWith('children')) {
        for (const key of ['title', 'status']) {
          if (link[key] !== undefined && found.front[key] !== undefined && String(link[key]) !== String(found.front[key])) {
            warnings.push(`${doc.file}: links.${where} says ${key} "${link[key]}", but ${target} says "${found.front[key]}"`)
          }
        }
      }
    }
  }

  // FR-020: an item is defined in one place only. Links name documents, so they
  // are references, not definitions.
  const definedIn = new Map()
  const define = (node, file) => {
    if (Array.isArray(node)) node.forEach(one => define(one, file))
    else if (node !== null && typeof node === 'object') {
      if (typeof node.id === 'string') {
        const other = definedIn.get(node.id)
        if (other !== undefined) errors.push(`${file}: ${node.id} is defined here and in ${other}`)
        else definedIn.set(node.id, file)
      }
      for (const [key, value] of Object.entries(node)) if (key !== 'links') define(value, file)
    }
  }
  for (const doc of docs) {
    for (const [key, value] of Object.entries(doc.front)) if (key !== 'links' && key !== 'id') define(value, doc.file)
  }

  if (root !== undefined) {
    const children = new Set((root.front.links?.children ?? [])
      .filter(c => c && typeof c.path === 'string').map(c => basename(c.path)))
    for (const doc of docs) {
      if (doc === root) continue
      if (!children.has(doc.file)) errors.push(`${root.file}: links.children omits ${doc.file}`)
      const parent = doc.front.links?.parent
      if (!parent || basename(parent.path ?? '') !== root.file) {
        errors.push(`${doc.file}: links.parent must point at ${root.file}`)
      }
    }
    // the prev/next chain
    const chain = docs.filter(d => d !== root).sort((a, b) => (a.front.order ?? 0) - (b.front.order ?? 0))
    chain.forEach((doc, i) => {
      const wantPrev = i === 0 ? root.file : chain[i - 1].file
      const gotPrev = basename(doc.front.links?.prev?.path ?? '')
      if (gotPrev !== wantPrev) errors.push(`${doc.file}: links.prev should be ${wantPrev}, found ${gotPrev || 'nothing'}`)
      const next = doc.front.links?.next
      if (i === chain.length - 1) {
        if (next !== null && next !== undefined) errors.push(`${doc.file}: the last section's links.next must be null`)
      } else {
        const gotNext = basename(next?.path ?? '')
        if (gotNext !== chain[i + 1].file) errors.push(`${doc.file}: links.next should be ${chain[i + 1].file}, found ${gotNext || 'nothing'}`)
      }
    })
  }

  // cross-section ids
  const personas = idsOf(docs, 'personas', 'personas')
  const shortNames = (docs.find(d => d.front.kind === 'personas')?.front?.personas ?? []).map(p => p?.short_name).filter(Boolean)
  for (const name of new Set(shortNames.filter((name, i) => shortNames.indexOf(name) !== i))) {
    errors.push(`personas: short_name ${name} is used by more than one persona`)
  }
  const objectives = idsOf(docs, 'objectives-metrics', 'objectives')
  const journeys = docs.find(d => d.front.kind === 'journeys')?.front?.journeys ?? []
  const stages = new Set()
  let goldenThreads = 0
  for (const journey of journeys) {
    if (journey?.golden_thread === true) goldenThreads += 1
    for (const stage of journey?.stages ?? []) if (stage?.id) stages.add(stage.id)
    if (journey?.persona && personas.size > 0 && !personas.has(journey.persona)) {
      errors.push(`journeys: ${journey.id} persona ${journey.persona} is not a persona id in section 4`)
    }
  }
  if (journeys.length > 0 && goldenThreads !== 1) {
    errors.push(`journeys: ${goldenThreads} journeys marked golden_thread; exactly one must be`)
  }
  const rootThread = root?.front?.golden_thread
  if (journeys.length > 0 && typeof rootThread === 'string') {
    if (!journeys.some(j => j?.id === rootThread)) {
      errors.push(`${root.file}: golden_thread ${rootThread} is not a journey id`)
    }
  }

  const frs = docs.find(d => d.front.kind === 'functional-requirements')?.front?.requirements ?? []
  const frIds = new Set(frs.map(r => r?.id).filter(Boolean))
  for (const req of frs) {
    if (req?.journey_stage && stages.size > 0 && !stages.has(req.journey_stage)) {
      errors.push(`functional-requirements: ${req.id} journey_stage ${req.journey_stage} is not a stage in section 5`)
    }
    if (req?.objective && objectives.size > 0 && !objectives.has(req.objective)) {
      errors.push(`functional-requirements: ${req.id} objective ${req.objective} is not an objective in section 3`)
    }
    if (req?.user && personas.size > 0 && /^PER-\d{3}$/.test(req.user) && !personas.has(req.user)) {
      errors.push(`functional-requirements: ${req.id} user ${req.user} is not a persona in section 4`)
    }
  }

  // wireframes: what they illustrate exists, each has its sketch, and every
  // requirement shown on a screen or in a report has one
  const nfrIds = idsOf(docs, 'nonfunctional-requirements', 'requirements')
  const wfDoc = docs.find(d => d.front.kind === 'wireframes')
  const illustrated = new Set()
  for (const wf of wfDoc?.front?.wireframes ?? []) {
    for (const id of wf?.illustrates ?? []) {
      illustrated.add(id)
      const known = id.startsWith('NFR-') ? nfrIds : frIds
      if (known.size > 0 && !known.has(id)) errors.push(`wireframes: ${wf.id} illustrates ${id}, which does not exist`)
    }
    if (wf?.persona && personas.size > 0 && !personas.has(wf.persona)) {
      errors.push(`wireframes: ${wf.id} persona ${wf.persona} is not a persona in section 4`)
    }
    if (wf?.journey_stage && stages.size > 0 && !stages.has(wf.journey_stage)) {
      errors.push(`wireframes: ${wf.id} journey_stage ${wf.journey_stage} is not a stage in section 5`)
    }
    if (!existsSync(join(dir, 'diagrams', `${wf?.id}.puml`))) {
      errors.push(`wireframes: ${wf?.id} has no PlantUML Salt drawing at diagrams/${wf?.id}.puml`)
    }
    const sketch = sketchOf(wfDoc.body ?? '', wf?.id ?? '')
    if (sketch === undefined) {
      errors.push(`wireframes: ${wf?.id} has no wireframe fence under a heading naming it`)
    } else {
      const wide = sketch.findIndex(line => [...line].length > SKETCH_COLUMNS)
      if (wide !== -1) errors.push(`wireframes: ${wf.id} sketch line ${wide + 1} is wider than ${SKETCH_COLUMNS} columns`)
    }
  }
  for (const req of frs) {
    if ((req?.shown_in === 'screen' || req?.shown_in === 'report') && !illustrated.has(req.id)) {
      errors.push(`functional-requirements: ${req.id} is shown in a ${req.shown_in}, and no wireframe illustrates it`)
    }
  }

  // every image a body links to is on disk
  for (const doc of docs) {
    for (const [, path] of (doc.body ?? '').matchAll(/^!\[[^\]]*\]\(([^)\s]+)\)\s*$/gm)) {
      if (!/^[a-z]+:/.test(path) && !existsSync(join(dir, path))) {
        errors.push(`${doc.file}: links to ${path}, which does not exist; run prd-diagrams.mjs`)
      }
    }
  }

  const scope = docs.find(d => d.front.kind === 'scope')?.front
  for (const item of scope?.in_scope ?? []) {
    if (item?.journey_stage && stages.size > 0 && !stages.has(item.journey_stage)) {
      errors.push(`scope: ${item.id} journey_stage ${item.journey_stage} is not a stage in section 5`)
    }
    for (const id of item?.requirements ?? []) {
      if (frIds.size > 0 && !frIds.has(id)) errors.push(`scope: ${item.id} names requirement ${id}, which does not exist`)
    }
  }

  // the release line: the stages section 6 puts in scope
  const lineStages = new Set([
    ...(scope?.in_scope ?? []).map(item => item?.journey_stage),
    ...(scope?.outside_product ?? []).map(item => item?.stage),
  ].filter(Boolean))
  const scenarios = docs.find(d => d.front.kind === 'scenarios')?.front?.scenarios ?? []
  const wfIds = new Set((wfDoc?.front?.wireframes ?? []).map(wf => wf?.id).filter(Boolean))
  const journeyIds = new Set(journeys.map(j => j?.id).filter(Boolean))
  for (const sc of scenarios) {
    if (sc?.journey && journeyIds.size > 0 && !journeyIds.has(sc.journey)) {
      errors.push(`scenarios: ${sc.id} journey ${sc.journey} does not exist`)
    }
    if (sc?.stage && stages.size > 0 && !stages.has(sc.stage)) {
      errors.push(`scenarios: ${sc.id} stage ${sc.stage} does not exist`)
    }
    if (sc?.priority === 'must' && sc?.stage && lineStages.size > 0 && !lineStages.has(sc.stage)) {
      errors.push(`scenarios: ${sc.id} is a must, but its stage ${sc.stage} is not on the release line in section 6`)
    }
    if (sc?.priority === undefined) warnings.push(`scenarios: ${sc?.id} has no priority`)
    for (const id of sc?.wireframes ?? []) {
      if (wfIds.size > 0 && !wfIds.has(id)) errors.push(`scenarios: ${sc.id} links wireframe ${id}, which does not exist`)
    }
  }
  // lifecycles: every transition joins declared states, and every state but
  // a final one has a way out
  const lifecycles = docs.find(d => d.front.kind === 'scenarios')?.front?.lifecycles ?? []
  const lcIds = new Set(lifecycles.map(lc => lc?.id).filter(Boolean))
  for (const lc of lifecycles) {
    const names = new Set((lc?.states ?? []).map(state => state?.name))
    const finals = new Set(lc?.final ?? [])
    for (const name of [lc?.initial, ...finals]) {
      if (name !== undefined && !names.has(name)) errors.push(`scenarios: ${lc.id} names state "${name}", which it does not declare`)
    }
    for (const move of lc?.transitions ?? []) {
      for (const end of [move?.from, move?.to]) {
        if (!names.has(end)) errors.push(`scenarios: ${lc.id} has a transition with state "${end}", which it does not declare`)
      }
      if (move?.by && /^PER-\d{3}$/.test(move.by) && personas.size > 0 && !personas.has(move.by)) {
        errors.push(`scenarios: ${lc.id} transition by ${move.by} is not a persona in section 4`)
      }
    }
    for (const name of names) {
      if (!finals.has(name) && !(lc?.transitions ?? []).some(move => move?.from === name)) {
        warnings.push(`scenarios: ${lc.id} state "${name}" is not final and has no way out`)
      }
    }
  }
  for (const sc of scenarios) {
    for (const id of sc?.lifecycles ?? []) {
      if (!lcIds.has(id)) errors.push(`scenarios: ${sc.id} names lifecycle ${id}, which does not exist`)
    }
  }
  // two unhappy paths for every happy path, per journey
  for (const journey of journeys) {
    const of = scenarios.filter(sc => sc?.journey === journey?.id)
    const happy = of.filter(sc => sc?.variant === 'happy').length
    const unhappy = of.filter(sc => sc?.variant === 'alternate' || sc?.variant === 'exception').length
    if (happy > 0 && unhappy < 2 * happy) {
      warnings.push(`scenarios: ${journey.id} has ${happy} happy ${happy === 1 ? 'path' : 'paths'} and ${unhappy} unhappy; aim for at least ${2 * happy}, or record the gap as an open question`)
    }
  }

  for (const rel of docs.find(d => d.front.kind === 'release-plan')?.front?.releases ?? []) {
    for (const id of rel?.requirements ?? []) {
      if (frIds.size > 0 && !frIds.has(id)) errors.push(`release-plan: ${rel.id} names requirement ${id}, which does not exist`)
    }
    for (const id of rel?.journey_stages ?? []) {
      if (stages.size > 0 && !stages.has(id)) errors.push(`release-plan: ${rel.id} names stage ${id}, which does not exist`)
    }
  }

  // the five tests, mechanically checkable parts
  for (const req of frs) {
    const missing = ['user', 'outcome', 'priority'].filter(f => !req?.[f])
    if (missing.length > 0) errors.push(`functional-requirements: ${req?.id ?? '(no id)'} fails the five tests: no ${missing.join(', no ')}`)
    if (!Array.isArray(req?.acceptance) || req.acceptance.length === 0) {
      errors.push(`functional-requirements: ${req?.id ?? '(no id)'} fails test 3: no acceptance criteria`)
    }
  }
  for (const nfr of docs.find(d => d.front.kind === 'nonfunctional-requirements')?.front?.requirements ?? []) {
    // 'zero' and 'none' are quantities; the rule is against adjectives, not words.
    // A standard's version, such as WCAG 2.2 or ISO 27001, is not a quantity.
    const target = typeof nfr?.target === 'string' ? nfr.target.replace(/\b[A-Z][A-Z/]+[ -]?\d+(?:[.:]\d+)*/g, '') : undefined
    if (target !== undefined && !/\d|[Zz]ero|[Nn]one/.test(target)) {
      errors.push(`nonfunctional-requirements: ${nfr.id} target "${nfr.target}" names no quantity`)
    }
  }
  for (const rule of docs.find(d => d.front.kind === 'decision-rights')?.front?.decisions ?? []) {
    if (rule?.never_delegated === true && rule?.delegable_to_agent === true) {
      errors.push(`decision-rights: ${rule.id} is both never_delegated and delegable_to_agent`)
    }
  }

  // Checks from the 0.6.0 specification review. Each one makes a rule that a
  // section guide already states checkable.
  const frontOf = kind => docs.find(d => d.front.kind === kind)?.front
  const atReview = kind => ['review', 'final'].includes(frontOf(kind)?.status)
  // A field the guide requires: a warning while the document is a draft, an
  // error once it is offered for review.
  const gate = (kind, message) => (atReview(kind) ? errors : warnings).push(message)
  // A number, not the digits of an id such as Q-001.
  const hasNumber = text => /\d/.test(String(text ?? '').replace(/\b[A-Z]{1,4}-\d+\b/g, ''))

  // the details block says what the front matter says
  for (const doc of docs) {
    if (doc.body !== undefined && withDetails(doc.body, doc.front, docs.map(d => d.front)) !== doc.body) {
      gate(doc.front.kind, `${doc.file}: the details block does not match the front matter; run prd-details.mjs`)
    }
  }

  // the root: the summary's measure carries a number
  const measure = root?.front?.summary?.measure
  if (typeof measure === 'string' && !hasNumber(measure)) {
    errors.push(`${root.file}: summary.measure has no number in it`)
  }

  // sections 1 and 3: each problem has its persona, and reaches a requirement
  // through an objective
  const problems = frontOf('problem-opportunity')?.problems ?? []
  const problemIds = new Set(problems.map(p => p?.id).filter(Boolean))
  for (const problem of problems) {
    if (problem?.persona && personas.size > 0 && !personas.has(problem.persona)) {
      errors.push(`problem-opportunity: ${problem.id} persona ${problem.persona} is not a persona in section 4`)
    }
  }
  const objectiveList = frontOf('objectives-metrics')?.objectives ?? []
  const questionIds = idsOf(docs, 'open-questions', 'questions')
  for (const objective of objectiveList) {
    for (const id of objective?.problems ?? []) {
      if (problemIds.size > 0 && !problemIds.has(id)) errors.push(`objectives-metrics: ${objective.id} names problem ${id}, which does not exist`)
    }
    if (!hasNumber(objective?.target)) errors.push(`objectives-metrics: ${objective?.id} target has no number in it`)
    if (!hasNumber(objective?.baseline) && !objective?.baseline_question) {
      errors.push(`objectives-metrics: ${objective?.id} baseline has no number and names no baseline_question`)
    }
    if (objective?.baseline_question && questionIds.size > 0 && !questionIds.has(objective.baseline_question)) {
      errors.push(`objectives-metrics: ${objective.id} baseline_question ${objective.baseline_question} does not exist`)
    }
  }
  if (problems.length > 0 && objectiveList.length > 0) {
    const servedObjectives = new Set(frs.map(r => r?.objective).filter(Boolean))
    const reached = new Set(objectiveList.filter(o => servedObjectives.has(o?.id)).flatMap(o => o?.problems ?? []))
    for (const id of problemIds) {
      if (!reached.has(id)) warnings.push(`problem-opportunity: ${id} reaches no requirement through an objective`)
    }
  }

  // section 2: the status quo is named among the alternatives
  const competitors = frontOf('customer-market')?.competitors ?? []
  if (competitors.length > 0 && !competitors.some(c => c?.kind === 'status-quo')) {
    errors.push('customer-market: no competitor has kind status-quo; name what customers do today')
  }

  // section 5: the golden thread has a happy path, an exception exists, and a
  // screen or report scenario links a wireframe
  const golden = journeys.find(j => j?.golden_thread === true)
  if (scenarios.length > 0) {
    const goldenHappy = scenarios.filter(sc => sc?.journey === golden?.id && sc?.variant === 'happy')
    if (golden !== undefined && goldenHappy.length === 0) errors.push(`scenarios: the golden thread ${golden.id} has no happy scenario`)
    if (!scenarios.some(sc => sc?.variant === 'exception')) errors.push('scenarios: no scenario is an exception')
    if (lineStages.size > 0 && goldenHappy.length > 0 &&
        !goldenHappy.some(sc => [...lineStages].every(st => (sc?.stages ?? [sc?.stage]).includes(st)))) {
      warnings.push('scenarios: no happy scenario of the golden thread spans every release-line stage; give one a stages list')
    }
    const wfStage = new Map((wfDoc?.front?.wireframes ?? []).map(wf => [wf?.id, wf?.journey_stage]))
    for (const sc of scenarios) {
      if (sc?.priority === undefined && atReview('scenarios')) errors.push(`scenarios: ${sc?.id} has no priority`)
      if ((sc?.shown_in === 'screen' || sc?.shown_in === 'report') && (sc?.wireframes ?? []).length === 0) {
        errors.push(`scenarios: ${sc.id} is shown in a ${sc.shown_in} and links no wireframe`)
      }
      for (const id of sc?.wireframes ?? []) {
        const at = wfStage.get(id)
        if (at && sc?.stage && at !== sc.stage && !(sc?.stages ?? []).includes(at)) {
          warnings.push(`scenarios: ${sc.id} is at ${sc.stage}, but its wireframe ${id} is at ${at}`)
        }
      }
    }
  }

  // sections 6 and 7: the release line is one unbroken run of the golden
  // thread to its end, each of its stages has a must, and every must is in scope
  if (golden !== undefined && lineStages.size > 0) {
    const order = (golden.stages ?? []).map(st => st?.id)
    const at = [...lineStages].map(st => order.indexOf(st))
    if (at.includes(-1)) {
      errors.push(`scope: the release line names a stage that is not in the golden thread ${golden.id}`)
    } else if (Math.max(...at) !== order.length - 1 || Math.max(...at) - Math.min(...at) + 1 !== lineStages.size) {
      errors.push(`scope: the release line is not one unbroken run of ${golden.id}'s stages ending at its last stage`)
    }
    const outside = new Set((scope?.outside_product ?? []).map(item => item?.stage))
    for (const st of lineStages) {
      if (outside.has(st)) continue
      if (!frs.some(r => r?.journey_stage === st && r?.priority === 'must')) errors.push(`functional-requirements: release-line stage ${st} has no must requirement`)
    }
  }
  if (scope !== undefined) {
    const inScope = new Set((scope.in_scope ?? []).flatMap(item => item?.requirements ?? []))
    for (const req of frs) {
      if (req?.priority === 'must' && !inScope.has(req.id)) errors.push(`scope: must requirement ${req.id} is in no in-scope item`)
    }
  }
  for (const req of frs) {
    for (const field of ['objective', 'shown_in']) {
      if (req?.[field] === undefined) gate('functional-requirements', `functional-requirements: ${req?.id} has no ${field}`)
    }
  }

  // section 8: every category the rubric asks about has a requirement or a reason
  const nfrDoc = frontOf('nonfunctional-requirements')
  if (nfrDoc !== undefined) {
    const covered = new Set([...(nfrDoc.requirements ?? []).map(r => r?.category), ...(nfrDoc.not_applicable ?? []).map(n => n?.category)])
    for (const category of ['performance', 'scale', 'availability', 'security', 'privacy', 'accessibility', 'retention', 'observability']) {
      if (!covered.has(category)) warnings.push(`nonfunctional-requirements: no ${category} requirement, and no not_applicable reason`)
    }
  }

  // section 10: approvers are personas, each stage's decision has a rule, and
  // what a rule needs follows from how it is delegated
  const rules = frontOf('decision-rights')?.decisions ?? []
  const ruled = new Set(rules.flatMap(rule => rule?.stages ?? []))
  for (const rule of rules) {
    if (typeof rule?.approver === 'string' && personas.size > 0) {
      if (!/^PER-\d{3}$/.test(rule.approver)) warnings.push(`decision-rights: ${rule.id} approver "${rule.approver}" is not a persona id`)
      else if (!personas.has(rule.approver)) errors.push(`decision-rights: ${rule.id} approver ${rule.approver} is not a persona in section 4`)
    }
    for (const st of rule?.stages ?? []) {
      if (stages.size > 0 && !stages.has(st)) errors.push(`decision-rights: ${rule.id} names stage ${st}, which does not exist`)
    }
    if (rule?.never_delegated === true && !rule?.evidence_required) errors.push(`decision-rights: ${rule.id} is never delegated and has no evidence_required`)
    if (rule?.delegable_to_agent === true && !rule?.escalation) errors.push(`decision-rights: ${rule.id} is delegable to an agent and has no escalation`)
  }
  if (ruled.size > 0) {
    for (const journey of journeys) {
      for (const st of journey?.stages ?? []) {
        if (st?.decision && !ruled.has(st.id)) warnings.push(`decision-rights: stage ${st.id} has a decision and no rule names it`)
      }
    }
  }

  // sections 11 and 12: what blocks exists, and nothing a release needs is due
  // after the release
  const allIds = new Set()
  const collect = node => {
    if (Array.isArray(node)) node.forEach(collect)
    else if (node !== null && typeof node === 'object') {
      if (typeof node.id === 'string') allIds.add(node.id)
      Object.values(node).forEach(collect)
    }
  }
  docs.forEach(doc => collect(doc.front))
  const releases = frontOf('release-plan')?.releases ?? []
  const dueAfterRelease = (by, blocks) => releases.find(rel =>
    rel?.target_date && String(by) > String(rel.target_date) &&
    blocks.some(id => (rel.requirements ?? []).includes(id) || (rel.journey_stages ?? []).includes(id)))
  const blockers = [
    ...(frontOf('assumptions-risks-dependencies')?.dependencies ?? []).map(d => ['assumptions-risks-dependencies', d]),
    ...(frontOf('open-questions')?.questions ?? []).map(q => ['open-questions', q]),
  ]
  for (const [kind, item] of blockers) {
    for (const id of item?.blocks ?? []) {
      if (!allIds.has(id)) errors.push(`${kind}: ${item.id} blocks ${id}, which does not exist`)
    }
    const late = item?.by === undefined || item?.answer ? undefined : dueAfterRelease(item.by, item.blocks ?? [])
    if (late !== undefined) errors.push(`${kind}: ${item.id} is due ${item.by}, after ${late.id}'s target ${late.target_date}, and ${late.id} needs what it blocks`)
  }

  // section 14: no term twice, and every see_also names a term
  const terms = frontOf('glossary')?.terms ?? []
  const termNames = terms.map(t => String(t?.term ?? '').toLowerCase())
  for (const name of new Set(termNames.filter((name, i) => termNames.indexOf(name) !== i))) {
    errors.push(`glossary: the term "${name}" is defined more than once`)
  }
  for (const t of terms) {
    for (const ref of t?.see_also ?? []) {
      if (!termNames.includes(String(ref).toLowerCase())) warnings.push(`glossary: "${t.term}" sees also "${ref}", which is not a term`)
    }
  }

  // section 15: the root's version is logged, and a final section has an approval
  const changes = frontOf('change-log')?.changes
  if (Array.isArray(changes) && root?.front?.version && !changes.some(c => String(c?.version) === String(root.front.version))) {
    errors.push(`change-log: the root's version ${root.front.version} has no change entry`)
  }
  // FR-014: an approval covers one version, and the latest decision on it wins,
  // so a later rejection makes the set read as not approved.
  const version = String(root?.front?.version ?? '')
  const current = (changes ?? []).find(c => String(c?.version) === version)
  const decisions = [...(current?.approvals ?? [])].sort((a, b) => String(a?.date ?? '').localeCompare(String(b?.date ?? '')))
  const decision = decisions.at(-1)
  const approved = decision?.decision === 'approved' || decision?.decision === 'approved-with-conditions'
  for (const doc of docs) {
    if (doc.front.status === 'final' && !approved) {
      errors.push(`${doc.file}: status final with no approval of version ${version} recorded in the change log`)
    }
  }

  // Checks from the 0.7.0 medium-priority review.
  const personaList = frontOf('personas')?.personas ?? []
  const objectiveIds = new Set(objectiveList.map(o => o?.id).filter(Boolean))
  const mustExist = (ids, known, where) => {
    for (const id of ids ?? []) if (known.size > 0 && !known.has(id)) errors.push(`${where} names ${id}, which does not exist`)
  }

  // the root names a real objective, primary persona, and approvers
  mustExist([root?.front?.summary?.objective].filter(Boolean), objectiveIds, `${root?.file}: summary.objective`)
  mustExist([root?.front?.primary_persona].filter(Boolean), personas, `${root?.file}: primary_persona`)
  // FR-021: each approver is a named person with a role; a bare persona id is
  // the older form, which names a role but no person.
  const approvers = root?.front?.approvers ?? []
  mustExist(approvers.map(a => (typeof a === 'string' ? a : a?.persona)).filter(Boolean), personas, `${root?.file}: approvers`)
  const namedApprovers = approvers.filter(a => typeof a === 'object' && a?.name)
  if (root?.front?.kind === 'prd') {
    if (namedApprovers.length === 0) gate('prd', `${root.file}: no approver is named; name each approver by name and role before the set is offered for approval`)
    for (const a of approvers) if (typeof a === 'string') warnings.push(`${root.file}: approver ${a} has no name; give the person's name and role`)
  }
  const isApprover = a => namedApprovers.some(n => n.name === a?.name && n.role === a?.role)

  // sections 2 and 4: segments name real personas; one primary persona at most
  for (const segment of frontOf('customer-market')?.segments ?? []) {
    mustExist([...(segment?.user_personas ?? []), segment?.buyer_persona].filter(Boolean), personas, `customer-market: ${segment?.id}`)
  }
  if (personaList.filter(p => p?.primary === true).length > 1) errors.push('personas: more than one persona is primary')
  for (const persona of personaList) mustExist(persona?.problems, problemIds, `personas: ${persona?.id}`)

  // section 5: journey objectives exist; a pain point names a real stage and a
  // need that answers it; a low-scored stage has a pain point
  for (const journey of journeys) {
    mustExist(journey?.objectives, objectiveIds, `journeys: ${journey?.id}`)
    const own = new Set((journey?.stages ?? []).map(st => st?.id))
    const pains = (journey?.pain_points ?? []).filter(p => p !== null && typeof p === 'object')
    for (const pain of pains) {
      if (pain.stage && !own.has(pain.stage)) errors.push(`journeys: ${journey.id} pain point names stage ${pain.stage}, which is not in the journey`)
      if (pain.need && !(journey.needs ?? []).includes(pain.need)) errors.push(`journeys: ${journey.id} pain point names a need that is not in its needs: "${pain.need}"`)
    }
    if (pains.length > 0) {
      for (const st of journey?.stages ?? []) {
        if (Number.isInteger(st?.satisfaction) && st.satisfaction <= 2 && !pains.some(p => p.stage === st.id)) {
          warnings.push(`journeys: ${st.id} scores ${st.satisfaction} and no pain point names it`)
        }
      }
    }
  }

  // scenarios: a branch starts from a real step; lifecycles reach every state,
  // end somewhere, and state each move's rule and who makes it
  const stagesOf = new Map(journeys.map(j => [j?.id, new Set((j?.stages ?? []).map(st => st?.id))]))
  for (const sc of scenarios) {
    if (sc?.rejoins && sc.rejoins !== 'end' && !stagesOf.get(sc.journey)?.has(sc.rejoins)) {
      errors.push(`scenarios: ${sc.id} rejoins ${sc.rejoins}, which is not a stage of ${sc.journey}`)
    }
    const from = sc?.branches_from
    if (from) {
      const base = scenarios.find(other => other?.id === from.scenario)
      if (base === undefined) errors.push(`scenarios: ${sc.id} branches from ${from.scenario}, which does not exist`)
      else if (from.step > (base.course ?? []).length) errors.push(`scenarios: ${sc.id} branches from step ${from.step} of ${from.scenario}, which has ${(base.course ?? []).length} steps`)
    }
  }
  for (const lc of lifecycles) {
    if ((lc?.final ?? []).length === 0) warnings.push(`scenarios: ${lc?.id} has no final state`)
    const reached = new Set([lc?.initial])
    for (let grew = true; grew;) {
      grew = false
      for (const move of lc?.transitions ?? []) {
        if (reached.has(move?.from) && !reached.has(move?.to)) { reached.add(move.to); grew = true }
      }
    }
    for (const state of lc?.states ?? []) {
      if (!reached.has(state?.name)) warnings.push(`scenarios: ${lc.id} state "${state.name}" cannot be reached from "${lc.initial}"`)
    }
    for (const move of lc?.transitions ?? []) {
      if (!move?.rule || !move?.by) warnings.push(`scenarios: ${lc.id} transition ${move?.from} to ${move?.to} has no ${!move?.rule ? 'rule' : 'by'}`)
    }
  }

  // section 6: outside-product stages exist; the scope names its release by id
  mustExist((scope?.outside_product ?? []).map(item => item?.stage), stages, 'scope: outside_product')
  const releaseIds = new Set(releases.map(rel => rel?.id).filter(Boolean))
  if (typeof scope?.release === 'string' && releaseIds.size > 0) {
    const named = /^(REL-\d{3})\b/.exec(scope.release)?.[1]
    if (named === undefined) warnings.push(`scope: release "${scope.release}" does not start with its REL-nnn id from section 13`)
    else if (!releaseIds.has(named)) errors.push(`scope: release names ${named}, which is not a release in section 13`)
  }

  // section 13: the first release delivers exactly the release line, and every
  // release says how you know it worked and how firm its date is
  const firstRelease = releases[0]
  if (firstRelease && lineStages.size > 0) {
    const stagesOf = new Set(firstRelease.journey_stages ?? [])
    if (stagesOf.size !== lineStages.size || ![...lineStages].every(st => stagesOf.has(st))) {
      errors.push(`release-plan: ${firstRelease.id}'s stages differ from the release line in section 6`)
    }
  }
  for (const rel of releases) {
    mustExist(rel?.objectives, objectiveIds, `release-plan: ${rel?.id}`)
    mustExist(rel?.depends_on, allIds, `release-plan: ${rel?.id} depends_on`)
    if ((rel?.exit_criteria ?? []).length === 0 && (rel?.journey_stages ?? []).length > 0) warnings.push(`release-plan: ${rel.id} has no exit_criteria`)
    if (rel?.target_date && !rel?.date_status) warnings.push(`release-plan: ${rel.id} has a target date and no date_status`)
  }

  // section 7: criteria are Given/When/Then about what the user observes, and
  // must is the minimum
  const UI_WORDS = /\b(button|click|tap|drop-?down|checkbox|modal|pop-?up|menu|tab)s?\b/i
  for (const req of frs) {
    for (const criterion of req?.acceptance ?? []) {
      if (!/\bgiven\b[\s\S]*\bwhen\b[\s\S]*\bthen\b/i.test(criterion)) warnings.push(`functional-requirements: ${req.id} has a criterion that is not Given/When/Then`)
      const ui = UI_WORDS.exec(criterion)
      if (ui) warnings.push(`functional-requirements: ${req.id} has a criterion that names a control: "${ui[0]}"`)
    }
  }
  if (frs.length >= 5) {
    const share = frs.filter(r => r?.priority === 'must').length / frs.length
    if (share > 0.6) warnings.push(`functional-requirements: ${Math.round(share * 100)}% of requirements are must; ask whether each is the minimum the release is useless without`)
  }

  // wireframes: the marks run 1 to n and match the shows lines and the drawing
  for (const wf of wfDoc?.front?.wireframes ?? []) {
    const sketch = sketchOf(wfDoc.body ?? '', wf?.id ?? '')
    if (sketch === undefined) continue
    const marksIn = text => [...new Set([...text.matchAll(/<(\d+)>/g)].map(m => Number(m[1])))].sort((a, b) => a - b)
    const marks = marksIn(sketch.join('\n'))
    const shows = (wf?.shows ?? []).length
    if (marks.length !== shows || marks.some((n, i) => n !== i + 1)) {
      errors.push(`wireframes: ${wf.id} has marks ${marks.join(', ') || 'none'} for ${shows} shows lines; they must run 1 to ${shows}`)
    }
    const puml = join(dir, 'diagrams', `${wf.id}.puml`)
    if (existsSync(puml)) {
      const drawn = marksIn(readFileSync(puml, 'utf8'))
      if (drawn.join() !== marks.join()) errors.push(`wireframes: ${wf.id} drawing has marks ${drawn.join(', ')}, and its sketch has ${marks.join(', ')}`)
    }
  }

  // sections 8 and 9: what a requirement or constraint applies to exists
  const appliesTo = (ids, where) => mustExist((ids ?? []).filter(id => id !== 'all'), allIds, where)
  for (const nfr of frontOf('nonfunctional-requirements')?.requirements ?? []) appliesTo(nfr?.applies_to, `nonfunctional-requirements: ${nfr?.id} applies_to`)
  for (const c of frontOf('constraints')?.constraints ?? []) {
    appliesTo(c?.applies_to, `constraints: ${c?.id} applies_to`)
    mustExist(c?.nfr, nfrIds, `constraints: ${c?.id} nfr`)
  }

  // section 10: an agent's role agrees with how the decision is delegated
  for (const rule of rules) {
    if (rule?.never_delegated === true && ['acts', 'acts-person-may-reverse'].includes(rule?.agent_role)) {
      errors.push(`decision-rights: ${rule.id} is never delegated, but its agent_role is ${rule.agent_role}`)
    }
    if (rule?.delegable_to_agent === true && rule?.agent_role === 'none') {
      errors.push(`decision-rights: ${rule.id} is delegable to an agent, but its agent_role is none`)
    }
  }

  // sections 12 and 15: an answered question is recorded in the change log
  const resolved = new Set((changes ?? []).flatMap(c => c?.resolves ?? []))
  for (const change of changes ?? []) mustExist(change?.resolves, questionIds, `change-log: ${change?.version} resolves`)
  for (const q of frontOf('open-questions')?.questions ?? []) {
    if (q?.answer && !resolved.has(q.id)) warnings.push(`open-questions: ${q.id} is answered, and no change log entry resolves it`)
  }

  // section 14: a synonym the glossary says to avoid does not appear
  for (const t of terms) {
    for (const word of t?.avoid ?? []) {
      const pattern = new RegExp(`\\b${String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      for (const doc of docs) {
        if (doc.front.kind !== 'glossary' && pattern.test(doc.body ?? '')) warnings.push(`${doc.file}: uses "${word}"; the glossary says to say "${t.term}"`)
      }
    }
  }

  // Checks from the 0.8.0 low-priority review.
  // sections 1 and 3: a problem says what doing nothing costs; one objective is
  // primary, and it is the one the root names
  for (const problem of problems) {
    if (!problem?.cost_of_inaction) warnings.push(`problem-opportunity: ${problem?.id} has no cost_of_inaction`)
  }
  const primaries = objectiveList.filter(o => o?.primary === true)
  if (primaries.length > 1) errors.push('objectives-metrics: more than one objective is primary')
  const named = root?.front?.summary?.objective
  if (named && primaries.length === 1 && primaries[0].id !== named) {
    errors.push(`objectives-metrics: ${primaries[0].id} is primary, but the root's summary.objective is ${named}`)
  }

  // scenarios: a scenario's stage is in its journey, and its persona is a persona
  for (const sc of scenarios) {
    const journey = journeys.find(j => j?.id === sc?.journey)
    const own = new Set((journey?.stages ?? []).map(st => st?.id))
    for (const st of [sc?.stage, ...(sc?.stages ?? [])].filter(Boolean)) {
      if (journey && stages.has(st) && !own.has(st)) warnings.push(`scenarios: ${sc.id} stage ${st} is not in its journey ${journey.id}`)
    }
    if (sc?.persona && personas.size > 0 && !personas.has(sc.persona)) warnings.push(`scenarios: ${sc.id} persona ${sc.persona} is not a persona in section 4`)
  }

  // section 6: an out-of-scope item says when to look at it again
  for (const item of scope?.out_of_scope ?? []) {
    if (!item?.revisit) warnings.push(`scope: ${item?.id} has no revisit`)
  }

  // section 7: a Given states a state, not something the user does
  const ACTION = /\b(clicks?|taps?|enters?|types?|selects?|submits?|presses?|chooses?)\b/i
  for (const req of frs) {
    for (const criterion of req?.acceptance ?? []) {
      const given = /\bgiven\b([\s\S]*?)\bwhen\b/i.exec(criterion)?.[1] ?? ''
      const act = ACTION.exec(given)
      if (act) warnings.push(`functional-requirements: ${req.id} has a Given that states an action, "${act[0]}"; state the situation instead`)
    }
  }

  // wireframes: a state sketch belongs to another sketch that exists
  for (const wf of wfDoc?.front?.wireframes ?? []) {
    if (wf?.state_of === wf?.id) errors.push(`wireframes: ${wf.id} is a state of itself`)
    else if (wf?.state_of) mustExist([wf.state_of], wfIds, `wireframes: ${wf.id} state_of`)
  }

  // section 10: a second approver is a persona, and not the first approver
  for (const rule of rules) {
    if (!rule?.second_approver) continue
    if (rule.second_approver === rule.approver) errors.push(`decision-rights: ${rule.id} second_approver is the approver`)
    else if (/^PER-\d{3}$/.test(rule.second_approver)) mustExist([rule.second_approver], personas, `decision-rights: ${rule.id} second_approver`)
  }

  // section 12: one person decides
  for (const q of frontOf('open-questions')?.questions ?? []) {
    if (/\s(and|with|or)\s|[/&+]/.test(q?.decider ?? '')) warnings.push(`open-questions: ${q.id} decider "${q.decider}" names more than one person; name one, and put the rest in consulted`)
  }

  // section 15: a rejection says why; a decision counts only from a named
  // approver; each condition names what it depends on, and only its approver
  // clears it
  for (const change of changes ?? []) {
    for (const approval of change?.approvals ?? []) {
      if (approval?.decision === 'rejected' && !approval?.note) errors.push(`change-log: ${change.version} rejection by ${approval.name} has no note`)
      if (root?.front?.kind === 'prd' && !isApprover(approval)) {
        errors.push(`change-log: ${change.version} decision by ${approval?.name} (${approval?.role}) is not from a named approver, so it is not an approval`)
      }
      for (const [i, c] of (approval?.conditions ?? []).entries()) {
        const where = `change-log: ${change.version} condition ${i + 1} of ${approval?.name}`
        if ((c?.depends_on ?? []).length === 0) errors.push(`${where} names nothing it depends on`)
        for (const id of c?.depends_on ?? []) if (!allIds.has(id)) errors.push(`${where} depends on ${id}, which does not exist`)
        if (c?.cleared === true && c?.cleared_by !== approval?.name) errors.push(`${where} is cleared by ${c?.cleared_by ?? 'nobody named'}; only ${approval?.name} clears it`)
      }
    }
  }

  // section 15, review comments: each names a real id and came from one place in
  // one Word file. An open one is only a warning: FR-022 records it as a
  // condition on the approval rather than blocking it.
  const sources = new Set()
  for (const rc of frontOf('review-comments')?.comments ?? []) {
    if (rc?.about && !allIds.has(rc.about)) errors.push(`review-comments: ${rc.id} is about ${rc.about}, which does not exist`)
    if (rc?.source && sources.has(rc.source)) errors.push(`review-comments: ${rc.id} repeats source ${rc.source}`)
    sources.add(rc?.source)
    if (rc?.status === 'open' || !rc?.response) {
      // FR-014: once the current version is approved, an unanswered comment is
      // a condition on that approval.
      const asCondition = approved && (decision?.conditions ?? []).some(c => (c?.depends_on ?? []).includes(rc?.id))
      if (approved && !asCondition) errors.push(`review-comments: ${rc?.id} has no response, and the approval of ${version} does not hold it as a condition`)
      else if (!approved) warnings.push(`review-comments: ${rc?.id} has no response yet; at approval it becomes a condition under FR-014`)
    }
  }

  // gates
  for (const doc of docs) {
    if (doc.front.status === 'final' && (doc.front.blocking ?? 0) > 0) {
      errors.push(`${doc.file}: status final with ${doc.front.blocking} blocking defects`)
    }
    if (doc.front.status === 'review' && (doc.front.blocking ?? 0) > 0) {
      warnings.push(`${doc.file}: status review with ${doc.front.blocking} blocking defects`)
    }
  }

  return { errors, warnings }
}

// ------------------------------------------------------------------- the run

export function validateSet(dir) {
  const report = { dir, documents: [], errors: [], warnings: [] }
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    report.errors.push(`${dir}: not a directory`)
    return report
  }
  const files = readdirSync(dir).filter(f => f.endsWith('.md')).sort()
  if (files.length === 0) { report.errors.push(`${dir}: no markdown documents`); return report }

  const docs = []
  for (const file of files) {
    const text = readFileSync(join(dir, file), 'utf8')
    const { front: raw, rest: body } = splitFrontMatter(text)
    const entry = { file, front: {}, body, errors: [] }
    if (raw.trim() === '') {
      entry.errors.push(`${file}: no YAML front matter`)
    } else {
      try { entry.front = parseYaml(raw) ?? {} }
      catch (error) { entry.errors.push(`${file}: front matter did not parse: ${error.message}`) }
    }
    docs.push(entry)
  }

  for (const doc of docs) {
    const kind = doc.front.kind
    const name = SCHEMA_FILE[kind]
    if (kind === undefined) { doc.errors.push(`${doc.file}: front matter has no kind`); continue }
    if (name === undefined) { doc.errors.push(`${doc.file}: kind "${kind}" has no schema`); continue }
    const expected = `prd-forge/${name.replace(/\.json$/, '')}@1`
    if (doc.front.schema !== undefined && doc.front.schema !== expected) {
      doc.errors.push(`${doc.file}: schema is "${doc.front.schema}", expected "${expected}"`)
    }
    try {
      const schema = loadSchema(name)
      const found = []
      check(doc.front, schema, schema, doc.file, found)
      doc.errors.push(...found)
    } catch (error) { doc.errors.push(`${doc.file}: ${error.message}`) }
  }

  const struct = structural(docs.filter(d => d.front.kind !== undefined), dir)
  report.documents = docs.map(d => ({
    file: d.file, kind: d.front.kind ?? null, status: d.front.status ?? null,
    score: d.front.score ?? null, blocking: d.front.blocking ?? null, errors: d.errors,
  }))
  report.errors = [...docs.flatMap(d => d.errors), ...struct.errors]
  report.warnings = struct.warnings
  return report
}

function main(argv) {
  const args = argv.filter(a => !a.startsWith('--'))
  const asJson = argv.includes('--json')
  const quiet = argv.includes('--quiet')
  if (args.length === 0) {
    console.error('usage: prd-validate.mjs <set directory> [--json] [--quiet]')
    return 2
  }
  const report = validateSet(resolve(args[0]))
  if (asJson) { console.log(JSON.stringify(report, null, 2)); return report.errors.length > 0 ? 1 : 0 }

  if (!quiet) {
    console.log(`${report.dir}\n`)
    for (const doc of report.documents) {
      const grade = doc.score === null ? '' : ` ${doc.score}/100`
      const block = doc.blocking ? ` ${doc.blocking} blocking` : ''
      const mark = doc.errors.length === 0 ? 'ok  ' : 'FAIL'
      console.log(`  ${mark} ${doc.file.padEnd(38)} ${String(doc.status ?? '-').padEnd(8)}${grade}${block}`)
    }
    console.log('')
  }
  for (const warning of report.warnings) console.log(`  warning: ${warning}`)
  for (const error of report.errors) console.log(`  error:   ${error}`)
  console.log(
    report.errors.length === 0
      ? `\n${report.documents.length} documents, no errors${report.warnings.length > 0 ? `, ${report.warnings.length} warnings` : ''}.`
      : `\n${report.errors.length} ${report.errors.length === 1 ? 'error' : 'errors'} in ${report.documents.length} documents.`,
  )
  return report.errors.length > 0 ? 1 : 0
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  process.exit(main(process.argv.slice(2)))
}
