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

/**
 * Pages whose content area is more than `limit` blank, skipping the last page of
 * each section, which may end anywhere. The blank share is measured from the
 * lowest inked row down to the bottom margin, so a figure counts as content.
 */
function mostlyBlankPages(path, limit = 0.5) {
  const starts = new Set([...run('pdfinfo', ['-dests', path]).matchAll(/^\s*(\d+) \[/gm)].map(m => Number(m[1])))
  const count = Number(run('pdfinfo', [path]).match(/^Pages:\s+(\d+)/m)[1])
  const blank = []
  for (let page = 2; page < count; page++) {
    if (starts.has(page + 1)) continue
    const r = spawnSync('pdftoppm', ['-gray', '-r', '20', '-f', String(page), '-l', String(page), path])
    assert.ifError(r.error)
    const [, size] = r.stdout.subarray(0, 40).toString('latin1').split('\n')
    const [width, height] = size.split(' ').map(Number)
    const pixels = r.stdout.subarray(r.stdout.length - width * height)
    const mm = 279.4 / height
    const top = Math.floor(18 / mm), bottom = Math.floor(259.4 / mm)
    let last = top
    for (let y = top; y < bottom; y++) {
      if (pixels.subarray(y * width, (y + 1) * width).some(v => v < 240)) last = y
    }
    const share = (bottom - last) / (bottom - top)
    if (share > limit) blank.push(`page ${page} is ${Math.round(share * 100)}% blank`)
  }
  return blank
}

test('no page of the tracked PDF is mostly blank in the middle of a section', {
  skip: !available('pdftoppm') && 'requires Poppler pdftoppm and pdfinfo',
}, () => {
  assert.deepEqual(mostlyBlankPages(reference + '.pdf'), [])
})

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
