const {
  eslintConfig: { baseConfig, preactConfig, playwrightConfig }
} = require('@chealt/check');

const config = {
  ...baseConfig,
  // Make sure that Jest rules don't apply to Playwright tests
  overrides: [
    {
      files: [
        'packages/**/*.cjs',
        'packages/**/*.js',
        './.eslintrc.js',
        'packages/**/*.mjs',
        './playwright.config.js',
        '.stylelintrc.js'
      ],
      parserOptions: {
        requireConfigFile: false
      }
    },
    {
      files: ['packages/chealt.com/**/*.jsx'],
      ...preactConfig,
      ...baseConfig
    },
    {
      files: ['packages/chealt.com/vite.config.js'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
      }
    },
    {
      files: ['**/*.ui-spec.js'],
      ...playwrightConfig
    }
  ]
};

module.exports = config;
