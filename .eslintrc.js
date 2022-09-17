const {
  eslintConfig: { baseConfig, preactConfig }
} = require('@chealt/check');

const config = {
  ...baseConfig,
  ignorePatterns: ['packages/taas-ui/api/index.js'],
  overrides: [
    {
      files: [
        'packages/mocker/**/*.cjs',
        'packages/**/*.js',
        './.eslintrc.js',
        'packages/**/*.mjs'
      ],
      parserOptions: {
        requireConfigFile: false
      }
    },
    {
      files: ['packages/chealt.com/**/*.js'],
      ...preactConfig
    }
  ]
};

module.exports = config;
