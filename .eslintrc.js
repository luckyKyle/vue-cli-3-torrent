module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'no-trailing-spaces': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': [0, 'always'],
    'indent': ['error', 2],
    'eol-last': 0
  }
}
