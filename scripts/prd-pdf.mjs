#!/usr/bin/env node
// Renders the HTML that prd_export.py wrote to a print-quality PDF with a
// running footer. Called by prd_export.py; not usually run by hand.
//
//   node prd-pdf.mjs <input.html> <output.pdf> [title]
//
// Prefers Playwright, which can print a footer with page numbers. Falls back to
// spawning Chromium directly, which cannot, so the PDF then has no page numbers.

import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
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

/** The first Chromium on this machine that we know how to spawn. */
const findChromium = () => {
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, '/opt/pw-browsers'].filter(Boolean)
  const candidates = [
    process.env.CHROME_PATH,
    ...roots.flatMap(root => [
      `${root}/chromium/chrome-linux/chrome`,
      `${root}/chromium-1243/chrome-linux64/chrome`,
    ]),
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean)

  return candidates.find(path => existsSync(path))
}

const footer = `<div style="width:100%;font:8pt Inter,Helvetica,Arial,sans-serif;color:#8b93a1;
  padding:0 20mm;display:flex;align-items:center">
  <span style="flex:1;text-align:left">${title.replace(/[<>&"]/g, '')}</span>
  <span style="flex:1;text-align:right"><span class="pageNumber"></span> of
  <span class="totalPages"></span></span></div>`

const playwright = findPlaywright()

if (playwright !== undefined) {
  const browser = await playwright.chromium.launch({ args: ['--no-sandbox'] })
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
} else {
  const chrome = findChromium()
  if (chrome === undefined) {
    console.error('prd-pdf: no Playwright and no Chromium found; install one or pass --docx only')
    process.exit(1)
  }
  const ran = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
    `--print-to-pdf=${output}`, pathToFileURL(input).href,
  ], { encoding: 'utf8' })
  if (ran.status !== 0 && !existsSync(output)) {
    console.error(ran.stderr ?? 'prd-pdf: Chromium did not write the file')
    process.exit(1)
  }
  console.log('pdf: rendered with Chromium directly, so it has no page numbers')
}
