/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      referenceActions: ['closes', 'refs'],
    },
  },
  rules: {
    'footer-empty': [2, 'never'],
    'header-max-length': [2, 'always', 90],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['build', 'ci', 'deps', 'docs', 'feat', 'fix', 'refactor']],
  },
}

module.exports = config
