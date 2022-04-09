const {
  eslintConfig: { baseConfig, preactConfig }
} = require('@chealt/check');

const config = {
  ...baseConfig,
  ignorePatterns: ['packages/taas-ui/api/index.js'],
  overrides: [
    {
      files: ['packages/mocker/**/*.cjs', 'packages/**/*.js', './.eslintrc.js'],
      parserOptions: {
        requireConfigFile: false
      },
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['packages/**/*.jsx'],
      ...preactConfig
    }
  ]
};

module.exports = config;
