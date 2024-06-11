const importRules = require('./rules/import');
const javascriptRules = require('./rules/javascript');

const preactConfig = {
  extends: ['preact', 'plugin:i18next/recommended'],
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
    page: true
  },
  parser: '@babel/eslint-parser',
  rules: {
    ...javascriptRules,
    ...importRules
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: ['import', 'i18next']
};

const playwrightConfig = {
  extends: ['plugin:playwright/playwright-test'],
  rules: {
    ...javascriptRules,
    ...importRules,
    'jest/no-done-callback': 'off',
    'playwright/require-top-level-describe': ['error']
  },
  plugins: ['playwright', 'import']
};

module.exports = {
  baseConfig,
  preactConfig,
  playwrightConfig
};
