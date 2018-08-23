module.exports = {
  '*.js': [
    'eslint --fix',
    'git add'
  ],
  '*.vue': [
    'eslint --fix',
    'git add'
  ],
  '*.styl': ['stylelint --fix', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
}
