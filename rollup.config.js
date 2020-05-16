import babel from '@rollup/plugin-babel';
import buble from '@rollup/plugin-buble';
import resolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';

export default {
   entry: 'src/index.js',
   output: {
      file: 'dist/post-messenger.min.js',
      format: 'umd',
      name: 'PostMessage',
   },
   plugins: [
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