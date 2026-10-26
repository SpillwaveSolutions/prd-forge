#!/usr/bin/env node
// Validates a prd-forge document set: YAML front matter against the JSON
// Schemas in ../schemas, the link graph between documents, and the
// cross-section id references. No dependencies.
//
//   node prd-validate.mjs <set directory> [--json] [--quiet]

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

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
  const lines = body.split('\n')
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
    }
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
  const objectives = idsOf(docs, 'objectives-metrics', 'objectives')
  const journeys = docs.find(d => d.front.kind === 'journeys')?.front?.journeys ?? []
  const stages = new Set()
  let goldenThreads = 0
  for (const journey of journeys) {
    if (journey?.golden_thread === true) goldenThreads += 1
    for (const stage of journey?.stages ?? []) if (stage?.id) stages.add(stage.id)
    if (journey?.persona && personas.size > 0 && !personas.has(journey.persona)) {
      warnings.push(`journeys: ${journey.id} persona ${journey.persona} is not a persona id in section 4`)
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
  const lineStages = new Set((scope?.in_scope ?? []).map(item => item?.journey_stage).filter(Boolean))
  const scenarios = docs.find(d => d.front.kind === 'scenarios')?.front?.scenarios ?? []
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
    if (typeof nfr?.target === 'string' && !/\d|[Zz]ero|[Nn]one/.test(nfr.target)) {
      errors.push(`nonfunctional-requirements: ${nfr.id} target "${nfr.target}" names no quantity`)
    }
  }
  for (const rule of docs.find(d => d.front.kind === 'decision-rights')?.front?.decisions ?? []) {
    if (rule?.never_delegated === true && rule?.delegable_to_agent === true) {
      errors.push(`decision-rights: ${rule.id} is both never_delegated and delegable_to_agent`)
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
