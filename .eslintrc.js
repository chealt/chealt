const { eslintConfig } = require('@chealt/check');

const config = {
  ...eslintConfig,
  overrides: [
    {
      files: ['packages/mocker/**/*.cjs', 'packages/**/*.js', './.eslintrc.js'],
      parserOptions: {
        requireConfigFile: false
      },
      rules: {
        'no-console': 'off'
      }
    }
  ]
};

module.exports = config;
