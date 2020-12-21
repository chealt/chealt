import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const config = {
  input: ['src/index.js'],
  output: {
    file: 'build/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel()
  ]
};

export default config;
