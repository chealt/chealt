export default {
  plugins: [
    ['@babel/plugin-transform-modules-commonjs'],
    [
      'transform-require-extensions',
      {
        extensions: {
          '.js': '.cjs'
        }
      }
    ]
  ]
};
