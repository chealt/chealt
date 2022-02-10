const { eslintConfig } = require('@chealt/check');

const config = {
  ...eslintConfig,
  overrides: [
    {
      files: [
        'packages/check/**/*.js',
        'packages/jest-puppeteer-env/**/*.js',
        'packages/jest-puppeteer-env-example/**/*.js',
        'packages/mocker/**/*.js',
        'packages/mocker/**/*.cjs',
        'packages/unit-test/**/*.js',
        'packages/taas/**/*.js',
        './.eslintrc.js'
      ],
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
