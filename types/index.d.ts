/**
 * The state contract of the prd-forge mod: what the stepper pane reads while
 * it draws, and what the scan writes.
 */

/** One document of a PRD set, as its YAML front matter names it. */
export type PrdDocRef = {
  /** Path as the scan found it, relative to the working directory. */
  path: string
  /** The front matter's `id`; the path when it declares none. */
  id: string
  /** The front matter's `kind`: `prd` for the root, else the section's kind. */
  kind: string
  /** The front matter's `title`; the file name when it declares none. */
  title: string
  /** The PRD section number the document covers, 1 to 15; null for the root. */
  section: number | null
  /** Where the document sits in the reading order. */
  order: number
  /** `pending`, `draft`, `review` or `final`, as the front matter has it. */
  status: string
  /** The last adversarial grade, 0-100; null when the document has none yet. */
  score: number | null
  /** Blocking defects the last grading pass found; null when never graded. */
  blocking: number | null
}

/** One PRD document set: its root document and every section below it. */
export type PrdSet = {
  /** The directory holding the set, relative to the working directory. */
  dir: string
  /** The root document's path. */
  root: string
  /** The product the set is about, from the root's front matter. */
  product: string
  /** The root first, then the sections in reading order. */
  docs: PrdDocRef[]
}

declare module 'claude-code' {
  interface PluginState {
    'prd-forge': {
      /** The set the pane steps through; null until a scan finds one. */
      set: Shaped<PrdSet | null>
      /** Which document of `set.docs` the pane shows. */
      cursor: number
      /** One line under the buttons: what the last scan or step came to. */
      notice: string | null
    }
  }
}
