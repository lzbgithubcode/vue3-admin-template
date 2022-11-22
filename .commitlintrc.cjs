module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'env',
        'build',
        'ci',
        'perf',
        'feat',
        'fix',
        'refactor',
        'docs',
        'chore',
        'style',
        'revert',
        'test'
      ]
    ],
    'type-empty': [2, 'always', 'type no  empty'],
    'scope-empty': [2, 'always', 'scope no  empty'],
    'subject-empty': [0],
    'header-max-length': [0, 'always', 72]
  }
}
