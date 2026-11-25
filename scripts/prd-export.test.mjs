import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const file = (path) => fileURLToPath(new URL(path, import.meta.url))
const reference = file('../docs/prd/prd-forge/prd-forge-prd')
const require = createRequire(import.meta.url)
const available = (cmd) => !spawnSync(cmd, ['--version']).error
const playwrightAvailable = ['playwright', 'playwright-core'].some((name) => {
  try { return !!require.resolve(name) } catch { return false }
})

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8' })
  assert.ifError(r.error)
  assert.equal(r.status, 0, r.stderr || r.stdout)
  return r.stdout
}

function checkPdfFooters(path, title) {
  const pages = run('pdftotext', ['-layout', path, '-']).split('\f')
  assert.equal(pages.pop(), '')
  assert.ok(pages.length > 1, 'expected multiple pages')
  pages.forEach((page, i) => {
    const lines = page.trimEnd().split('\n')
    const footer = lines.at(-1).replace(/\s+/g, ' ').trim()
    assert.equal(footer, `${title} Page ${i + 1} of ${pages.length}`)
    assert.ok(lines.slice(0, -1).join('').trim(), `blank content on page ${i + 1}`)
  })
  return pages.length
}

test('the tracked PDF has a title/version and the correct page number on every page', {
  skip: !available('pdftotext') && 'requires Poppler pdftotext',
}, () => {
  const title = run('python3', ['-c', 'import re,sys; print(re.search(r"^version: (.+)$",open(sys.argv[1]).read(),re.M)[1])', file('../docs/prd/prd-forge/prd.md')]).trim()
  checkPdfFooters(reference + '.pdf', 'PRD Forge PRD, version ' + title)
})

test('the PDF driver preserves punctuation and numbers a two-page export', {
  skip: !(available('pdftotext') && playwrightAvailable) && 'requires Playwright with Chromium and Poppler pdftotext',
}, () => {
  const dir = mkdtempSync(join(tmpdir(), 'prd-export-test-'))
  try {
    const input = join(dir, 'fixture.html')
    const output = join(dir, 'fixture.pdf')
    const title = 'Review <R&D> "field", version 1.0'
    writeFileSync(input, '<!doctype html><meta charset="utf-8"><p>First section</p><p style="break-before:page">Second section</p>')
    run(process.execPath, [file('./prd-pdf.mjs'), input, output, title])
    assert.equal(checkPdfFooters(output, title), 2)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('the tracked Word output has a two-level TOC, field refresh, section breaks and page fields', () => {
  run('python3', ['-c', String.raw`
import re, sys, zipfile
from xml.etree import ElementTree as ET
w = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
attr = "{" + w["w"] + "}val"
with zipfile.ZipFile(sys.argv[1]) as doc:
    def xml(name):
        return ET.fromstring(doc.read("word/" + name + ".xml"))
    body = xml("document")
    fields = [(n.text or "").strip() for n in body.findall(".//w:instrText", w)]
    assert any(v.startswith('TOC \\o "1-2" ') and r"\h" in v for v in fields), fields
    assert len(body.findall(".//w:pageBreakBefore", w)) >= 2
    assert xml("settings").find(".//w:updateFields", w).attrib[attr] in {"1", "true", "on"}
    footers = [n.removeprefix("word/").removesuffix(".xml") for n in doc.namelist() if re.fullmatch(r"word/footer\d+\.xml", n)]
    assert any(
        [(n.text or "").strip() for n in xml(f).findall(".//w:instrText", w)] == ["PAGE", "NUMPAGES"]
        and [n.text for n in xml(f).findall(".//w:t", w)][-4:] == ["Page ", "1", " of ", "1"]
        for f in footers
    ), footers
`, reference + '.docx'])
})
