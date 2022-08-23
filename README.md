# changesets-changelog-entry

This library extracts the logic of internal functions of [https://github.com/changesets/action](https://github.com/changesets/action) to be consumed externally. It offers two ways of consumption:

- CLI
- library

## Installation

```bash
yarn add --dev changesets-changelog-entry
```

## Usage

### CLI

```bash
yarn changesets-changelog-entry ./pathname/to/changelog.md @megacorpinc/example-lib@1.0.0-evil
```

### Library

```javascript
const { getChangelogEntry, getChangelogEntryFromFile } = require('changesets-changelog-entry')

const changelog = `# @megacorpinc/example-lib

## 1.0.0-evil

### Major changes

- Destroy the earth
`

const entryFromStringContent = getChangelogEntry(changelog, '1.0.0-evil')

console.log(entryFromStringContent.content)
console.log(entryFromStringContent.highestLevel)

const entryFromFile = getChangelogEntryFromFile('./CHANGELOG.md', '1.0.0-evil')

console.log(entryFromFile.content)
console.log(entryFromFile.highestLevel)
```
