const {
  eslintConfig: { baseConfig, reactConfig }
} = require('@chealt/check');

const config = {
  ...baseConfig,
  ignorePatterns: ['packages/taas-ui/api/index.js'],
  overrides: [
    {
      files: ['packages/mocker/**/*.cjs', 'packages/**/*.js', 'packages/**/*.jsx', './.eslintrc.js'],
      parserOptions: {
        requireConfigFile: false
      },
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['packages/taas-ui/**/*.jsx'],
      ...reactConfig
    }
  ]
};

module.exports = config;
