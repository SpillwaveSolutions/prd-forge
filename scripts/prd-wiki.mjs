#!/usr/bin/env node
// Writes a set as GitHub Wiki pages into a local clone of the wiki repository.
//
//   node prd-wiki.mjs <set directory> <wiki clone directory>
//
// - The root becomes Home.md. Each other document becomes one page named
//   <section>-<title>, such as 7-Functional-requirements.md, in set order.
// - Each diagram links its .png, copied into <wiki>/<slug>/, because a wiki
//   page does not run the export.
// - Links between documents point at wiki pages, and each item ID links to
//   its page and its heading in the details block, such as
//   7-Functional-requirements#fr-001.
// - _Sidebar.md lists the pages in set order.
//
// It writes files and prints the git commands. It never commits or pushes.
// One wiki holds one set: a second set would replace Home.md.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseYaml, splitFrontMatter } from './prd-validate.mjs'

const ID = /(?<![\w-])([A-Z]{1,4}-\d{2,4})(?![\w-])/g

/** A wiki page name: letters, digits, `.`, `_`, and `-`, words joined by `-`. */
export const pageName = (section, title) => {
  const words = String(title ?? '').replace(/[^A-Za-z0-9 ._-]+/g, ' ').trim().split(/\s+/).filter(Boolean)
  return [section, ...words].filter(part => part !== undefined && part !== '').join('-') || 'Untitled'
}

/** GitHub's anchor for a heading: lower case, punctuation dropped, spaces as `-`. */
const anchorOf = heading => heading.trim().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/ /g, '-')

/** Every item id a document defines, at any depth of its front matter. */
function idsIn(value, out = []) {
  if (Array.isArray(value)) for (const one of value) idsIn(one, out)
  else if (value !== null && typeof value === 'object') {
    if (typeof value.id === 'string' && /^[A-Z]{1,4}-\d{2,4}$/.test(value.id)) out.push(value.id)
    for (const [key, one] of Object.entries(value)) if (key !== 'links') idsIn(one, out)
  }
  return out
}

/**
 * A body as a wiki page: images point at the copied PNG, links to set
 * documents point at pages, and each known ID links to where it is defined.
 * Code, headings, and the text of existing links stay as they are.
 */
export function wikiBody(body, { slug, pageOf, idPage }) {
  let fenced = false
  return body.split('\n').map(line => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return line }
    if (fenced || /^#{1,6}\s/.test(line)) return line
    // Keep code spans, links, images, and comments whole; link IDs between them.
    return line.split(/(`[^`]*`|!?\[[^\]]*\]\([^)]*\)|<!--.*?-->)/).map((part, i) => {
      if (i % 2 === 1) {
        const image = /^(!\[[^\]]*\]\()diagrams\/([^)\s]+)\.svg\)$/.exec(part)
        if (image) return `${image[1]}${slug}/${image[2]}.png)`
        const link = /^\[([^\]]*)\]\((?:\.\/)?([^)#\s]+\.md)(#[^)]*)?\)$/.exec(part)
        return link && pageOf[link[2]] ? `[${link[1]}](${pageOf[link[2]]}${link[3] ?? ''})` : part
      }
      return part.replace(ID, id => (idPage[id] ? `[${id}](${idPage[id]}#${anchorOf(id)})` : id))
    }).join('')
  }).join('\n')
}

/** Writes the set's pages, sidebar, and images into `out`. Returns the files written. */
export function writeWiki(dir, out) {
  const docs = readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const { front: raw, rest } = splitFrontMatter(readFileSync(join(dir, file), 'utf8'))
      return { file, front: raw.trim() === '' ? {} : parseYaml(raw) ?? {}, body: rest }
    })
    .filter(doc => doc.front.kind !== undefined)
  const isRoot = doc => doc.front.kind === 'prd' || doc.front.kind === 'backlog'
  docs.sort((a, b) => Number(isRoot(b)) - Number(isRoot(a)) || (a.front.order ?? 999) - (b.front.order ?? 999) || a.file.localeCompare(b.file))
  const root = docs.find(isRoot)
  const slug = String(root?.front.slug ?? 'prd').replace(/[^A-Za-z0-9._-]+/g, '-')

  const pageOf = {}
  for (const doc of docs) pageOf[doc.file] = isRoot(doc) ? 'Home' : pageName(doc.front.section, doc.front.title ?? doc.file.replace(/\.md$/, ''))
  const idPage = {}
  for (const doc of docs) for (const id of idsIn(doc.front)) idPage[id] ??= pageOf[doc.file]

  mkdirSync(join(out, slug), { recursive: true })
  const written = []
  const write = (name, text) => {
    const path = join(out, name)
    if (!existsSync(path) || readFileSync(path, 'utf8') !== text) writeFileSync(path, text)
    written.push(name)
  }
  for (const doc of docs) write(`${pageOf[doc.file]}.md`, `${wikiBody(doc.body, { slug, pageOf, idPage }).trim()}\n`)
  const sidebar = docs.map(doc => {
    const title = isRoot(doc) ? (doc.front.product ?? 'Home') : `${doc.front.section ?? ''} ${doc.front.title ?? ''}`.trim()
    return `- [${title.replace(/[[\]]/g, '')}](${pageOf[doc.file]})`
  })
  write('_Sidebar.md', `${[`**${String(root?.front.product ?? slug).replace(/[*[\]]/g, '')}**`, '', ...sidebar].join('\n')}\n`)

  const images = join(dir, 'diagrams')
  for (const png of existsSync(images) ? readdirSync(images).filter(f => f.endsWith('.png')) : []) {
    copyFileSync(join(images, png), join(out, slug, png))
    written.push(`${slug}/${png}`)
  }
  return written
}

function main(argv) {
  const [dir, out] = argv.filter(a => !a.startsWith('--'))
  if (dir === undefined || out === undefined) {
    console.error('usage: prd-wiki.mjs <set directory> <wiki clone directory>')
    return 2
  }
  const written = writeWiki(resolve(dir), resolve(out))
  console.log(`Wrote ${written.filter(f => f.endsWith('.md')).length} pages and ${written.filter(f => f.endsWith('.png')).length} images to ${resolve(out)}.`)
  console.log('\nReview the pages, then publish them:\n')
  console.log(`  git -C ${resolve(out)} add -A`)
  console.log(`  git -C ${resolve(out)} commit -m "Update the PRD pages"`)
  console.log(`  git -C ${resolve(out)} push`)
  return 0
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  process.exit(main(process.argv.slice(2)))
}
