#!/usr/bin/env node
// Renders the HTML that prd_export.py wrote to a print-quality PDF with a
// running footer. Called by prd_export.py; not usually run by hand.
//
//   node prd-pdf.mjs <input.html> <output.pdf> [title]
//
// Requires Playwright so every successful PDF has a page-number footer.

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const [input, output, title = ''] = process.argv.slice(2)

if (!input || !output) {
  console.error('usage: prd-pdf.mjs <input.html> <output.pdf> [title]')
  process.exit(2)
}

/** Playwright, wherever it is installed; undefined when it is not. */
const findPlaywright = () => {
  for (const name of ['playwright', 'playwright-core']) {
    try {
      return require(name)
    } catch {
      /* try the next one */
    }
  }

  return undefined
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]))

const footer = `<div style="width:100%;font:8pt Inter,Helvetica,Arial,sans-serif;color:#8b93a1;
  padding:0 20mm;display:flex;align-items:center">
  <span style="flex:1;text-align:left">${escapeHtml(title)}</span>
  <span style="flex:1;text-align:right">Page <span class="pageNumber"></span> of
  <span class="totalPages"></span></span></div>`

const playwright = findPlaywright()

if (playwright === undefined) {
  console.error('prd-pdf: install Playwright and its Chromium browser, or export with --docx only')
  process.exit(1)
}

const browser = await playwright.chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
})
try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(input).href, { waitUntil: 'load' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: output,
    format: 'Letter',
    printBackground: true,
    margin: { top: '18mm', bottom: '20mm', left: '20mm', right: '20mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footer,
  })
} finally {
  await browser.close()
}
console.log('pdf: rendered with Playwright, with page numbers')
