const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', path.join(__dirname, 'src/')]],
      },
    },
    'import/core-modules': [],
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
      },
    ],

    semi: ['error', 'never'],
    'function-paren-newline': ['off'], // prettier does this
    'comma-dangle': ['off'], // prettier does this
    'no-param-reassign': ['error', { props: false }],
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': ['off'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': ['error', { code: 80, ignoreUrls: true }],
  },
}
