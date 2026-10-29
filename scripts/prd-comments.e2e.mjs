// End-to-end test of reviewers' Word comments, with Microsoft Word itself:
// export a PRD to Word, have Word comment on it, import the comments, answer
// them, and export again. It skips unless Word and uv are on this Mac.
//
//   node --test scripts/prd-comments.e2e.mjs
//
// Word opens and closes one document while this runs. Other documents open in
// Word are not touched.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeDetails } from './prd-details.mjs'
import { validateSet } from './prd-validate.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
// Word's sandbox opens files in its own container without asking for access.
const WORD_TMP = join(homedir(), 'Library/Containers/com.microsoft.Word/Data/tmp')
const hasWord = process.platform === 'darwin' && existsSync('/Applications/Microsoft Word.app') && existsSync(WORD_TMP)
const hasUv = spawnSync('uv', ['--version']).status === 0

const python = (...args) => {
  const run = spawnSync('uv', ['run', '-q', '--with', 'python-docx', '--with', 'pyyaml', 'python3', ...args], { encoding: 'utf8', cwd: REPO })
  assert.equal(run.status, 0, `${args.join(' ')}\n${run.stderr}`)
  return run.stdout
}

// What a reviewer marks, and what they say. The first two are item headings as
// the export writes them; the third is a sentence of the executive summary.
const REVIEW = [
  ['PER-002  Contact-centre agent', 'Who on the returns queue is this?', 'PER-002'],
  ['FR-002  See whether the item may be returned', 'Does this include online orders?', 'FR-002'],
  ['An associate can resolve any return at the counter', 'Is one conversation realistic?', 'acme-returns'],
]

test('a reviewer comments in Word, and each comment comes back, is answered, and shows in the next export', { skip: !(hasWord && hasUv), timeout: 600_000 }, () => {
  const work = mkdtempSync(join(tmpdir(), 'prd-comments-e2e-'))
  const set = join(work, 'set')
  cpSync(join(REPO, 'examples/acme-returns'), set, { recursive: true })

  // 1. Export, and give Word a copy to comment on.
  python('scripts/prd_export.py', set, '--docx', '--out', work)
  const inWord = mkdtempSync(join(WORD_TMP, 'prd-forge-e2e-'))
  const reviewed = join(inWord, 'reviewed.docx')
  copyFileSync(join(work, 'acme-returns-prd.docx'), reviewed)

  // 2. Word comments on it, as a reviewer would, and saves it.
  const word = spawnSync('osascript', [join(REPO, 'scripts/word-comment.applescript'), reviewed, ...REVIEW.flatMap(([find, say]) => [find, say])], { encoding: 'utf8', timeout: 300_000 })
  assert.equal(word.status, 0, word.stderr)
  assert.equal(word.stdout.trim(), String(REVIEW.length))
  // Keep the reviewed copy with the rest of the run, out of Word's container.
  copyFileSync(reviewed, join(work, 'reviewed.docx'))
  rmSync(inWord, { recursive: true })

  // 3. The reader maps each comment to the item or document it marks.
  const kept = join(work, 'reviewed.docx')
  const read = JSON.parse(python('scripts/prd_comments.py', set, kept))
  assert.equal(read.length, REVIEW.length, JSON.stringify(read, null, 2))
  for (const [find, say, about] of REVIEW) {
    const one = read.find(c => c.comment === say)
    assert.ok(one, `no comment "${say}"`)
    assert.equal(one.about, about, say)
    assert.equal(one.quote, find.replace(/\s+/g, ' '), say)
    assert.ok(one.reviewer && one.reviewer !== 'unknown', `${say} has no reviewer`)
    assert.match(one.date ?? '', /^\d{4}-\d{2}-\d{2}$/)
  }

  // 4. The import adds all three once, and a second import adds nothing.
  const first = JSON.parse(python('scripts/prd_comments.py', set, kept, '--import'))
  assert.equal(first.added.length, REVIEW.length)
  const again = JSON.parse(python('scripts/prd_comments.py', set, kept, '--import'))
  assert.deepEqual([again.added.length, again.skipped.length], [0, REVIEW.length])
  writeDetails(set)
  let report = validateSet(set)
  assert.deepEqual(report.errors, [])
  assert.equal(report.warnings.filter(w => /has no response yet/.test(w)).length, REVIEW.length)

  // 5. The team answers each one.
  const register = join(set, '17-review-comments.md')
  writeFileSync(register, readFileSync(register, 'utf8').replace(/    status: open\n/g, (_, at, all) => {
    const id = all.slice(0, at).match(/- id: (RC-\d{3})/g).at(-1).slice(6)
    return `    status: answered\n    response: >-\n      Answer to ${id}, agreed with the expert.\n`
  }))
  writeDetails(set)
  report = validateSet(set)
  assert.deepEqual(report.errors, [])
  assert.deepEqual(report.warnings.filter(w => /review-comments/.test(w)), [])

  // 6. The next export shows each comment with its answer.
  const out = join(work, 'next')
  python('scripts/prd_export.py', set, '--docx', '--out', out)
  const text = python('-c', 'import sys, docx; d = docx.Document(sys.argv[1]); print("\\n".join([p.text for p in d.paragraphs] + [c.text for t in d.tables for r in t.rows for c in r.cells]))', join(out, 'acme-returns-prd.docx'))
  for (const [, say] of REVIEW) assert.ok(text.includes(say), say)
  for (const id of ['RC-001', 'RC-002', 'RC-003']) assert.ok(text.includes(`Answer to ${id}, agreed with the expert.`), id)
})
