// Tests for prd-wiki.mjs: every page, image, and anchor a page links exists.
//
//   node --test scripts/prd-wiki.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pageName, wikiBody, writeWiki } from './prd-wiki.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')

/** The anchors GitHub gives a page's headings, a repeat suffixed -1, -2, … */
function anchorsOf(text) {
  const seen = new Map()
  const out = new Set()
  let fenced = false
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced
    const heading = !fenced && /^#{1,6}\s+(.*)$/.exec(line)
    if (!heading) continue
    const base = heading[1].trim().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/ /g, '-')
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    out.add(n === 0 ? base : `${base}-${n}`)
  }
  return out
}

for (const set of ['docs/prd/prd-forge', 'examples/acme-returns']) {
  test(`every link in the wiki of ${set} reaches a page, an image, or a heading`, () => {
    const out = mkdtempSync(join(tmpdir(), 'prd-wiki-'))
    writeWiki(join(REPO, set), out)
    const pages = readdirSync(out).filter(f => f.endsWith('.md'))
    assert.ok(pages.includes('Home.md') && pages.includes('_Sidebar.md'))
    const texts = Object.fromEntries(pages.map(p => [p.replace(/\.md$/, ''), readFileSync(join(out, p), 'utf8')]))
    let ids = 0
    for (const [page, text] of Object.entries(texts)) {
      for (const [, image] of text.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
        assert.ok(existsSync(join(out, image)), `${page} shows ${image}, which was not copied`)
      }
      for (const [, target, anchor] of text.matchAll(/(?<!!)\[[^\]]*\]\(([A-Za-z0-9._-]+)(?:#([^)]*))?\)/g)) {
        if (/\.(png|svg)$/.test(target)) continue
        assert.ok(texts[target] !== undefined, `${page} links to ${target}, which is not a page`)
        if (anchor !== undefined) {
          ids += 1
          assert.ok(anchorsOf(texts[target]).has(anchor), `${page} links to ${target}#${anchor}, which is not a heading there`)
        }
      }
      assert.doesNotMatch(text, /\]\(diagrams\/|\]\(\.?\/?[\w-]+\.md/, `${page} still links a set file`)
    }
    if (set === 'docs/prd/prd-forge') assert.ok(ids > 100, `only ${ids} ID links`)
    // A second run writes the same files.
    const again = mkdtempSync(join(tmpdir(), 'prd-wiki-'))
    writeWiki(join(REPO, set), again)
    for (const page of pages) assert.equal(readFileSync(join(again, page), 'utf8'), texts[page.replace(/\.md$/, '')])
  })
}

test('a page name keeps only letters, digits, and dashes, whatever the title holds', () => {
  assert.equal(pageName(7, 'Functional requirements'), '7-Functional-requirements')
  assert.equal(pageName(11, 'Assumptions, risks and dependencies'), '11-Assumptions-risks-and-dependencies')
  assert.equal(pageName(4, 'Ops "night shift" (PER-004) [acting] #3 <b>; café'), '4-Ops-night-shift-PER-004-acting-3-b-caf')
  assert.equal(pageName(undefined, '((()))'), 'Untitled')
})

test('IDs link outside code, headings, and existing links, and nowhere they are unknown', () => {
  const body = [
    '## FR-001 heading stays',
    'See FR-001 and Q-999, `FR-001` in code, [FR-001 text](./08-x.md#a), and ![FR-001](diagrams/FR-001.svg).',
    '```',
    'FR-001 in a fence',
    '```',
    '<!-- FR-001 in a comment -->',
  ].join('\n')
  const out = wikiBody(body, { slug: 's', pageOf: { '08-x.md': '7-X' }, idPage: { 'FR-001': '7-X' } })
  assert.equal(out.split('\n')[0], '## FR-001 heading stays')
  assert.equal(out.split('\n')[1], 'See [FR-001](7-X#fr-001) and Q-999, `FR-001` in code, [FR-001 text](7-X#a), and ![FR-001](s/FR-001.png).')
  assert.equal(out.split('\n')[3], 'FR-001 in a fence')
  assert.equal(out.split('\n')[5], '<!-- FR-001 in a comment -->')
})
