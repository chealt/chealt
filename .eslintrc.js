const { eslintConfig } = require('@chealt/check');

const config = {
  ...eslintConfig,
  overrides: [
    {
      files: ['packages/fitter/**/*.js'],
      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],
      settings: {
        react: {
          pragma: 'h',
          version: 'detect'
        }
      },
      rules: {
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        'react/prop-types': 'off'
      }
    }
  ]
};

module.exports = config;
