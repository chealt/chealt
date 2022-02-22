const javascriptRules = require('./rules/javascript');
const importRules = require('./rules/import');
const prettierRules = require('./rules/prettier');

const reactConfig = {
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  rules: {
    'require-jsdoc': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['class'] }]
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
  reactConfig
};
