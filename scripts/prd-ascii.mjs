// Text views of a set's diagrams, in strict ASCII, for the terminal pane, which
// cannot show the rendered images. prd-diagrams.mjs writes each one as
// diagrams/<id>.txt beside its .mmd, from the same front matter.
//
// No line is wider than WIDTH, so a view fits the pane without wrapping.
// Wireframes have no text view: the pane already shows their text sketch.

export const WIDTH = 60

// A course step that is what the product shows the user, not what the user
// does: "They see …", "They are asked …", "They read …".
export const USER_SEES = /^(they|the [a-z -]+?) (see|sees|read|reads|are|is|get|gets|hear|hears|find|finds|receive|receives)\b/i

export const VARIANT = { happy: 'happy path', alternate: 'alternate path', exception: 'exception' }

const PLAIN = { '‘': "'", '’': "'", '“': '"', '”': '"', '–': '-', '—': '-', '…': '...', '→': '->', '←': '<-', '×': 'x' }

/**
 * Text in printable ASCII on one line: typographic marks become their plain
 * forms, NFKD takes accents off letters and turns a no-break space into a space,
 * and any other character becomes `?`.
 */
export const ascii = text =>
  String(text ?? '')
    .replace(/[‘’“”–—…→←×]/g, c => PLAIN[c])
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\x20-\x7e]/g, '?')
    .replace(/\s+/g, ' ')
    .trim()

/** Lines of at most `width` characters. A word longer than the width is split. */
export function wrapText(text, width) {
  const out = []
  let line = ''
  for (let word of ascii(text).split(' ').filter(Boolean)) {
    while (word.length > width) {
      if (line !== '') { out.push(line); line = '' }
      out.push(word.slice(0, width))
      word = word.slice(width)
    }
    if (line !== '' && line.length + 1 + word.length > width) { out.push(line); line = word }
    else line = line === '' ? word : `${line} ${word}`
  }
  if (line !== '') out.push(line)
  return out.length > 0 ? out : ['']
}

/** `text` wrapped to the view, each line after `first` indented by `indent`. */
const hang = (first, text, indent) =>
  wrapText(text, WIDTH - Math.max(first.length, indent.length)).map((line, i) => (i === 0 ? first : indent) + line)

/** A box the full width of the view, each paragraph wrapped inside it. */
export function box(...paragraphs) {
  const inner = WIDTH - 4
  const rule = `+${'-'.repeat(WIDTH - 2)}+`
  const body = paragraphs.filter(p => p !== undefined && p !== '').flatMap(p => wrapText(p, inner))
  return [rule, ...body.map(l => `| ${l.padEnd(inner)} |`), rule]
}

/** The arrow between two boxes, with a label when there is one. */
const arrow = note => (note ? ['    |', ...wrapText(note, WIDTH - 6).map(l => `    | ${l}`), '    v'] : ['    |', '    v'])

const done = lines => `${lines.join('\n')}\n`

/** A journey: its trigger, each stage and its actor, and its end state. */
export function journeyText(journey) {
  const stages = journey.stages ?? []
  const lines = [...box(`Trigger: ${ascii(journey.trigger)}`)]
  stages.forEach((stage, i) => {
    const before = stages[i - 1]
    lines.push(...arrow(before !== undefined && before.actor !== stage.actor ? `hand-off to ${ascii(stage.actor)}` : ''))
    lines.push(...box(`${stage.id} ${ascii(stage.name)}`, `Actor: ${ascii(stage.actor)}`))
  })
  lines.push(...arrow(''), ...box(`End state: ${ascii(journey.end_state)}`))
  return done(lines)
}

/**
 * A journey's overview: its main path, and after each stage the alternates and
 * exceptions that branch there, `branches` in the order the overview ranks them.
 */
export function overviewText(journey, branches) {
  const stages = journey.stages ?? []
  const lines = [...box(`${journey.id} trigger`)]
  stages.forEach((stage, i) => {
    const before = stages[i - 1]
    lines.push(...arrow(before !== undefined && before.actor !== stage.actor ? `hand-off to ${ascii(stage.actor)}` : ''))
    lines.push(...box(`${stage.id} ${ascii(stage.name)}`))
    for (const sc of branches.filter(b => b.stage === stage.id)) {
      const where = sc.rejoins === 'end' ? '-> the journey ends' : sc.rejoins ? `-> rejoins ${sc.rejoins}` : '-> ends at its outcome'
      lines.push('    |')
      lines.push(...hang(`    |-- ${sc.id}? yes: `, `${VARIANT[sc.variant] ?? sc.variant}, ${sc.priority}`, '    |       '))
      lines.push(...wrapText(sc.trigger, WIDTH - 12).map(l => `    |       ${l}`))
      lines.push(`    |       ${where}`, '    | no')
    }
  })
  lines.push(...arrow(''), ...box('End state'))
  return done(lines)
}

/** A scenario: Given, When, each step of the course in order, Then. */
export function scenarioText(scenario) {
  const tags = [VARIANT[scenario.variant] ?? scenario.variant, scenario.priority].filter(Boolean).join(', ')
  const lines = [...box(`${scenario.id} ${tags}`, `Given: ${ascii(scenario.context)}`)]
  if (scenario.trigger) lines.push(...arrow(''), ...box(`When: ${ascii(scenario.trigger)}`))
  for (const step of scenario.course ?? []) {
    lines.push(...arrow(''), ...box(`${USER_SEES.test(step) ? 'Sees' : 'Does'}: ${ascii(step)}`))
  }
  lines.push(...arrow(''), ...box(`Then: ${ascii(scenario.expected_outcome)}`))
  return done(lines)
}

/** A journey's satisfaction scores, one row per stage. Undefined unless every stage has one. */
export function satisfactionText(journey) {
  const stages = journey.stages ?? []
  if (stages.length === 0 || !stages.every(stage => Number.isInteger(stage.satisfaction))) return undefined
  const lines = [...wrapText(`${journey.id}, how each stage feels today, from 1 to 5`, WIDTH), '']
  for (const stage of stages) {
    const n = Math.max(0, Math.min(5, stage.satisfaction))
    lines.push(...hang(`${stage.id} [${'#'.repeat(n).padEnd(5)}] ${stage.satisfaction}  `, ascii(stage.name), ' '.repeat(18)))
  }
  return done(lines)
}

/** A lifecycle: its states, then each transition with what moves it, the rule, and who. */
export function lifecycleText(lifecycle, roleNames = {}) {
  const names = (lifecycle.states ?? []).map(state => ascii(state.name))
  const lines = [
    ...wrapText(`${lifecycle.id} ${ascii(lifecycle.subject)}`, WIDTH),
    ...wrapText(`States: ${names.join(', ')}`, WIDTH),
    ...wrapText(`Starts at ${ascii(lifecycle.initial)}. Ends at ${(lifecycle.final ?? []).map(ascii).join(' or ') || 'no final state'}.`, WIDTH),
  ]
  for (const move of lifecycle.transitions ?? []) {
    lines.push('', ...wrapText(`${ascii(move.from)} --> ${ascii(move.to)}`, WIDTH))
    if (move.when) lines.push(...hang('  When: ', ascii(move.when), '        '))
    if (move.rule) lines.push(...hang('  Rule: ', ascii(move.rule), '        '))
    if (move.by) lines.push(...hang('  By: ', ascii(roleNames[move.by] ?? move.by), '      '))
  }
  return done(lines)
}

/** The release line: each release, first release first, with the stages it delivers. */
export function releaseText(releases, journeys, requirements) {
  const stages = journeys.flatMap(j => j.stages ?? [])
  const musts = id => requirements.filter(r => r.journey_stage === id && r.priority === 'must').length
  const placed = new Set()
  const lines = []
  const column = (head, ids) => {
    if (lines.length > 0) lines.push('')
    lines.push(...box(...head))
    const here = stages.filter(stage => ids.includes(stage.id))
    if (here.length === 0) lines.push('  Nothing planned yet')
    for (const stage of here) {
      placed.add(stage.id)
      const n = musts(stage.id)
      lines.push(...hang(`  ${stage.id} `, `${ascii(stage.name)} (${n} must ${n === 1 ? 'requirement' : 'requirements'})`, '         '))
    }
  }
  for (const release of releases) {
    column([`${release.id} ${ascii(release.name)}`, release.target_date ? `by ${ascii(release.target_date)}` : ''], release.journey_stages ?? [])
  }
  const rest = stages.filter(stage => !placed.has(stage.id)).map(stage => stage.id)
  if (rest.length > 0) column(['In no release'], rest)
  return done(lines)
}

/** Decision rights: each approver, then the decisions they own. */
export function decisionsText(decisions, roleNames = {}) {
  const approvers = [...new Set(decisions.map(d => String(d.approver ?? 'Unassigned')))]
  const lines = []
  for (const who of approvers) {
    if (lines.length > 0) lines.push('')
    lines.push(...wrapText(`${ascii(roleNames[who] ?? who)} decides:`, WIDTH))
    for (const d of decisions.filter(one => String(one.approver ?? 'Unassigned') === who)) {
      const tag = d.never_delegated === true ? 'never delegated' : d.delegable_to_agent === true ? 'delegable to an agent' : 'delegable to a person'
      lines.push(...hang(`  - ${d.id} `, `${ascii(d.decision)} (${tag})`, '           '))
    }
  }
  return done(lines)
}
