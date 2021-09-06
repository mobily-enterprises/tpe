import resolve from '@rollup/plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

module.exports = [

  // IIFE
  {
    // input: './tpe-babel.js',
    input: './tpe.js',
    output: {
      file: 'distr/tpe.js', // IIFE ONE FILE
      format: 'iife'
    },
    // plugins: [resolve({}), babel({exclude: [/\/core-js\//]}), minify({})]
    // plugins: [resolve({}), babel({ runtimeHelpers: true }), minify({})]
    plugins: [resolve({}), terser()]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/tpe-esm.js', // IIFE ONE FILE
      format: 'esm'
    },
    plugins: [resolve({})]
  }

]
