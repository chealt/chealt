const importRules = require('./rules/import');
const javascriptRules = require('./rules/javascript');
const prettierRules = require('./rules/prettier');

const preactConfig = {
  extends: ['preact'],
  rules: {
    'require-jsdoc': 'off',
    'react-hooks/exhaustive-deps': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    },
    react: {
      version: 'detect'
    }
  }
};

const baseConfig = {
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  globals: {
    page: true,
    jestPuppeteer: true
  },
  parser: '@babel/eslint-parser',
  rules: {
    ...javascriptRules,
    ...importRules,
    ...prettierRules
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: ['prettier'],
  plugins: ['import', 'prettier']
};

module.exports = {
  baseConfig,
  preactConfig
};
