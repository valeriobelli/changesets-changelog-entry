import { readFileSync } from 'fs'
import { toString as mdastToString } from 'mdast-util-to-string'
import { isAbsolute, join } from 'path'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

type HeadingStartInfo = {
  depth: number
  index: number
}

export const BumpLevels = {
  dep: 0,
  major: 3,
  minor: 2,
  patch: 1,
} as const

type CanonicalBumpLevel = Exclude<keyof typeof BumpLevels, 'dep'>

export const getChangelogEntry = (changelog: string, version: string) => {
  const ast = unified().use(remarkParse).parse(changelog)

  let highestLevel: number = BumpLevels.dep

  const nodes = ast.children
  let headingStartInfo: HeadingStartInfo | null = null
  let endIndex: number | undefined

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (node.type === 'heading') {
      const stringified: string = mdastToString(node)
      const match = stringified.toLowerCase().match(/(major|minor|patch)/)

      if (match !== null) {
        const level = BumpLevels[match[0] as CanonicalBumpLevel]

        highestLevel = Math.max(level, highestLevel)
      }

      if (headingStartInfo === null && stringified === version) {
        headingStartInfo = {
          depth: node.depth,
          index: i,
        }

        continue
      }

      if (endIndex === undefined && headingStartInfo !== null && headingStartInfo.depth === node.depth) {
        endIndex = i

        break
      }
    }
  }

  if (headingStartInfo) {
    ast.children = ast.children.slice(headingStartInfo.index + 1, endIndex)
  }

  return {
    content: unified().use(remarkStringify).stringify(ast),
    highestLevel: highestLevel,
  }
}

export const getChangelogEntryFromFile = (pathname: string, version: string) => {
  const path = isAbsolute(pathname) ? pathname : join(process.cwd(), pathname)
  const changelog = readFileSync(path).toString('utf-8')

  return getChangelogEntry(changelog, version)
}
