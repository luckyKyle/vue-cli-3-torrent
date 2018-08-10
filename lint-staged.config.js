module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  '*.json': ['prettier --write', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --write',
    'git add',
    'yarn unit --bail --findRelatedTests'
  ],
  '*.styl': ['stylelint --fix', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
}
