const javascriptRules = require('./rules/javascript');
const importRules = require('./rules/import');

const config = {
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  globals: {
    page: true
  },
  parser: 'babel-eslint',
  rules: {
    ...javascriptRules,
    ...importRules
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: ['prettier'],
  plugins: ['import', 'prettier']
};

module.exports = config;
