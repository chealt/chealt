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
      },
      parserOptions: {
        babelOptions: {
          configFile: './packages/fitter/.babelrc'
        }
      }
    },
    {
      files: [
        'packages/check/**/*.js',
        'packages/jest-puppeteer-env/**/*.js',
        'packages/jest-puppeteer-env-example/**/*.js',
        'packages/mocker/**/*.js',
        'packages/mocker/**/*.cjs',
        'packages/unit-test/**/*.js',
        './.eslintrc.js'
      ],
      parserOptions: {
        requireConfigFile: false
      }
    }
  ]
};

module.exports = config;
