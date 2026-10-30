// Tests for the review-comments kind: the validator's rules, and the round trip
// from the Word export through a reviewer's comments to prd_comments.py.
//
//   node --test scripts/prd-comments.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateSet } from './prd-validate.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const hasUv = spawnSync('uv', ['--version']).status === 0

/** A copy of the reference set with a review-comments document holding `comments`. */
function withComments(comments, status = 'draft', rootStatus = 'draft', approvals = []) {
  const dir = join(mkdtempSync(join(tmpdir(), 'prd-comments-')), 'set')
  cpSync(join(REPO, 'docs/prd/prd-forge'), dir, { recursive: true })
  const link = '{ id: prd-forge-review-comments, kind: review-comments, path: ./17-review-comments.md, title: Review comments }'
  const log = join(dir, '16-change-log.md')
  writeFileSync(log, readFileSync(log, 'utf8').replace('  next: null\n', `  next: ${link}\n`)
    .replace(/^ {2}- version: .+\n {4}date: /m, m => (approvals.length > 0 ? m.replace('    date: ', `    approvals:\n${approvals.join('\n')}\n    date: `) : m)))
  const root = join(dir, 'prd.md')
  writeFileSync(root, readFileSync(root, 'utf8').replace(/^status: \w+$/m, `status: ${rootStatus}`).replace(/(\n {4}- \{ id: prd-forge-change-log[^\n]*\n)/, `$1    - ${link.replace(' }', ', section: 15, order: 170, status: draft }')}\n`))
  writeFileSync(join(dir, '17-review-comments.md'), [
    '---',
    'id: prd-forge-review-comments',
    'kind: review-comments',
    'schema: prd-forge/review-comments@1',
    'title: Review comments',
    `status: ${status}`,
    'updated: 2026-10-28',
    'section: 15',
    'order: 170',
    'comments:',
    ...comments.flatMap(c => [
      `  - id: ${c.id}`,
      `    about: ${c.about}`,
      '    reviewer: Ann Lee',
      '    comment: Who decides this?',
      `    status: ${c.status ?? 'open'}`,
      ...(c.reply ? ['    replies:', `      - { reviewer: Cy Diaz, comment: ${c.reply} }`] : []),
      ...(c.response ? [`    response: ${c.response}`] : []),
      `    source: ${c.source ?? `reviewed.docx#${c.id}`}`,
    ]),
    'links:',
    '  parent: { id: prd-forge, kind: prd, path: ./prd.md, title: prd-forge PRD }',
    '  prev: { id: prd-forge-change-log, kind: change-log, path: ./16-change-log.md, title: Change log and approvals }',
    '  next: null',
    '---',
    '',
    '# Review comments',
    '',
  ].join('\n'))
  return { ...validateSet(dir), dir }
}

test('an answered review comment on a real id leaves the set valid', () => {
  const report = withComments([{ id: 'RC-001', about: 'FR-003', status: 'answered', response: 'The expert decides, under TR-004.' }])
  assert.deepEqual(report.errors, [])
  assert.ok(!report.warnings.some(w => /RC-001 has no response/.test(w)), report.warnings.join('\n'))
})

test('a review comment on an id that does not exist fails the set', () => {
  const { errors } = withComments([{ id: 'RC-001', about: 'FR-999' }])
  assert.ok(errors.some(e => /RC-001 is about FR-999, which does not exist/.test(e)), errors.join('\n'))
})

test('two comments from one source fail the set', () => {
  const { errors } = withComments([{ id: 'RC-001', about: 'FR-003', source: 'a.docx#1' }, { id: 'RC-002', about: 'FR-004', source: 'a.docx#1' }])
  assert.ok(errors.some(e => /RC-002 repeats source a\.docx#1/.test(e)), errors.join('\n'))
})

test('an open comment warns, even at review, and never blocks: FR-022 makes it a condition', () => {
  assert.ok(withComments([{ id: 'RC-001', about: 'FR-003' }]).warnings.some(w => /RC-001 has no response yet/.test(w)))
  for (const report of [withComments([{ id: 'RC-001', about: 'FR-003' }], 'review'), withComments([{ id: 'RC-001', about: 'FR-003' }], 'draft', 'review')]) {
    assert.ok(!report.errors.some(e => /RC-001/.test(e)), report.errors.join('\n'))
    assert.ok(report.warnings.some(w => /RC-001 has no response yet/.test(w)))
  }
})

test('the next export prints each comment with its reply and its answer', { skip: !hasUv }, () => {
  const { dir, errors } = withComments([{ id: 'RC-001', about: 'FR-003', status: 'answered', reply: 'The expert.', response: 'The expert decides, under TR-004.' }])
  assert.deepEqual(errors, [])
  const out = mkdtempSync(join(tmpdir(), 'prd-comments-'))
  const run = spawnSync('uv', ['run', '-q', '--with', 'python-docx', '--with', 'pyyaml', 'python3', 'scripts/prd_export.py', dir, '--docx', '--out', out], { encoding: 'utf8', cwd: REPO })
  assert.equal(run.status, 0, run.stderr)
  const text = spawnSync('uv', ['run', '-q', '--with', 'python-docx', 'python3', '-c',
    'import sys, docx; d = docx.Document(sys.argv[1]); print("\\n".join([p.text for p in d.paragraphs] + [c.text for t in d.tables for r in t.rows for c in r.cells]))',
    join(out, readdirSync(out).find(f => f.endsWith('.docx')))], { encoding: 'utf8' })
  assert.equal(text.status, 0, text.stderr)
  for (const want of ['RC-001', 'Who decides this?', 'Cy Diaz', 'The expert decides, under TR-004.']) assert.ok(text.stdout.includes(want), want)
})

// Builds a reviewed copy of the example set's Word export: a comment on an
// item, a comment on the summary, and a reply to the first, which Word keeps
// in commentsExtended.xml. Then reads it back.
const REVIEW = String.raw`
import glob, re, sys, zipfile, docx
out = sys.argv[1]
src = glob.glob(out + "/acme-returns-prd.docx")[0]
d = docx.Document(src)
ps = d.paragraphs
item = next(p for p in ps if p.text.startswith("PER-002"))
prose = next(p for p in ps if "return" in p.text.lower() and not p.style.name.startswith("Heading") and len(p.text) > 60)
d.add_comment(runs=item.runs, text="Who is this?", author="Ann Lee", initials="AL")
d.add_comment(runs=prose.runs[:1], text="Is this true?", author="Bo Chan", initials="BC")
d.add_comment(runs=item.runs, text="A returns agent.", author="Cy Diaz", initials="CD")
d.save(out + "/plain.docx")
W14 = "http://schemas.microsoft.com/office/word/2010/wordml"
with zipfile.ZipFile(out + "/plain.docx") as z, zipfile.ZipFile(out + "/reviewed.docx", "w") as w:
    for name in z.namelist():
        data = z.read(name)
        if name == "word/comments.xml":
            text = data.decode()
            if 'xmlns:w14=' not in text:
                text = text.replace("<w:comments ", '<w:comments xmlns:w14="' + W14 + '" ', 1)
            n = iter(range(1, 100))
            text = re.sub(r"<w:p(?=[ >])", lambda m: '<w:p w14:paraId="%08X"' % next(n), text)
            data = text.encode()
        w.writestr(name, data)
    w.writestr("word/commentsExtended.xml",
        '<w15:commentsEx xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">'
        '<w15:commentEx w15:paraId="00000003" w15:paraIdParent="00000001"/></w15:commentsEx>')
`

test('a reviewer comment maps to the item or section it marks, with its reply', { skip: !hasUv }, () => {
  const out = mkdtempSync(join(tmpdir(), 'prd-comments-'))
  const uv = args => spawnSync('uv', ['run', '-q', '--with', 'python-docx', '--with', 'pyyaml', 'python3', ...args], { encoding: 'utf8', cwd: REPO })
  const exported = uv(['scripts/prd_export.py', 'examples/acme-returns', '--docx', '--out', out])
  assert.equal(exported.status, 0, exported.stderr)
  const reviewed = uv(['-c', REVIEW, out])
  assert.equal(reviewed.status, 0, reviewed.stderr)
  const read = uv(['scripts/prd_comments.py', 'examples/acme-returns', join(out, 'reviewed.docx')])
  assert.equal(read.status, 0, read.stderr)
  const comments = JSON.parse(read.stdout)
  assert.equal(comments.length, 2, read.stdout)
  const onItem = comments.find(c => c.comment === 'Who is this?')
  assert.equal(onItem.about, 'PER-002')
  assert.match(onItem.quote, /^PER-002 /)
  assert.deepEqual(onItem.replies.map(r => [r.reviewer, r.comment]), [['Cy Diaz', 'A returns agent.']])
  assert.equal(comments.find(c => c.comment === 'Is this true?').about, 'acme-returns')
  assert.ok(comments.every(c => /^reviewed\.docx#\d+$/.test(c.source)))
  assert.ok(readdirSync(out).includes('acme-returns-prd.docx'))

  // --import adds both to a copy of the set once, links the register, and leaves it valid.
  const set = join(out, 'set')
  cpSync(join(REPO, 'examples/acme-returns'), set, { recursive: true })
  const first = JSON.parse(uv(['scripts/prd_comments.py', set, join(out, 'reviewed.docx'), '--import']).stdout)
  const again = JSON.parse(uv(['scripts/prd_comments.py', set, join(out, 'reviewed.docx'), '--import']).stdout)
  assert.deepEqual([first.added.length, again.added.length, again.skipped.length], [2, 0, 2])
  const report = validateSet(set)
  assert.deepEqual(report.errors.filter(e => !/details block/.test(e)), [])
  assert.equal(report.documents.length, 8)
})

test('once the version is approved, an unanswered comment must be a condition on it (FR-014)', () => {
  const approval = dependsOn => [
    '      - name: Richard Hightower', '        role: Sponsor', '        date: 2026-10-30', '        decision: approved-with-conditions',
    '        conditions:', '          - condition: Answer the comment.', `            depends_on: [${dependsOn}]`, '            by: 2027-01-31',
  ]
  const held = withComments([{ id: 'RC-001', about: 'FR-003' }], 'draft', 'draft', approval('RC-001'))
  assert.ok(!held.errors.some(e => /RC-001/.test(e)), held.errors.join('\n'))
  const dropped = withComments([{ id: 'RC-001', about: 'FR-003' }], 'draft', 'draft', approval('Q-001'))
  assert.ok(dropped.errors.some(e => /RC-001 has no response, and the approval of [\d.]+ does not hold it as a condition/.test(e)), dropped.errors.join('\n'))
})
