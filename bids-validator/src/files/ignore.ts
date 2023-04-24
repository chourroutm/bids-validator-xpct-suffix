import { BIDSFile } from '../types/file.ts'
import { ignore, Ignore } from '../deps/ignore.ts'

export async function readBidsIgnore(file: BIDSFile) {
  const value = await file.text()
  if (value) {
    const lines = value.split('\n')
    return lines
  } else {
    return []
  }
}

const defaultIgnores = [
  '.git**',
  '.datalad/',
  '.reproman/',
  'sourcedata/',
  'code/',
  'stimuli/',
  'log/',
  '**/meg/*.ds/**',
  '**/micr/*.zarr/**',
]

/**
 * Deno implementation of .bidsignore style rules
 */
export class FileIgnoreRules {
  #ignore: Ignore

  constructor(config: string[]) {
    this.#ignore = ignore({ allowRelativePaths: true })
    this.#ignore.add(defaultIgnores)
    this.#ignore.add(config)
  }

  add(config: string[]): void {
    this.#ignore.add(config)
  }

  /** Test if a dataset relative path should be ignored given configured rules */
  test(path: string): boolean {
    return this.#ignore.ignores(path)
  }
}
