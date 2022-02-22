const {
  eslintConfig: { baseConfig, svelteConfig }
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
      files: ['*.svelte'],
      ...svelteConfig
    }
  ]
};

module.exports = config;
