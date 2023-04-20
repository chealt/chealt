const {
  eslintConfig: { baseConfig, preactConfig }
} = require('@chealt/check');

const config = {
  ...baseConfig,
  overrides: [
    {
      files: [
        'packages/mocker/**/*.cjs',
        'packages/**/*.cjs',
        'packages/**/*.js',
        './.eslintrc.js',
        'packages/**/*.mjs',
        '.stylelintrc.js'
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
