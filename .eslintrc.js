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
  // required to lint *.vue files
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      alias: [],
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
    'no-param-reassign': ['error', { props: false }],
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': ['off'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': ['error', { code: 80, ignoreUrls: true }],
  },
}
