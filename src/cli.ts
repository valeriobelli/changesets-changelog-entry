import { program } from 'commander'
import { getChangelogEntryFromFile } from '.'

program
  .name('changesets-changelog-entry')
  .description("Get an entry from Changesets' changelog.")
  .argument('<path to changelog>', 'The pathname to the changelog that must be read.')
  .argument('<version>', 'The version from which the changelog must be read.')
  .action((pathname, version) => {
    console.log(getChangelogEntryFromFile(pathname, version).content)
  })
  .showHelpAfterError()
  .parse()
