import babel from '@rollup/plugin-babel';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';

export default {
   input: 'src/index.js',
   output: {
      file: 'dist/framelet.min.js',
      format: 'umd',
      name: 'Framelet',
   },
   plugins: [
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      babel({
         babelHelpers: 'bundled',
         babelrc: false,
         exclude: 'node_modules/**',
         presets: [
            ['@babel/preset-env', { modules: false, loose: true }],
         ],
      }),
      resolve({
         browser: true,
      }),
      buble({
         exclude: ['node_modules/**'],
      }),
      terser(),
   ],
};