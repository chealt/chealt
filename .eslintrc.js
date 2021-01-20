const { eslintConfig } = require('@chealt/check');

const config = {
  ...eslintConfig,
  overrides: [
    {
      files: ['packages/fitter/**/*.js'],
      settings: {
        react: {
          pragma: 'h',
          version: 'detect'
        }
      }
    }
  ]
};

module.exports = config;
