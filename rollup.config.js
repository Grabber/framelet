import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
   entry: 'src/index.js',
   output: {
      file: 'dist/post-messenger.min.js',
      name: 'PostMessenger',
      format: 'umd',
   },
   plugins: [
      babel({
         exclude: 'node_modules/**',
      }),
      uglify({
         output: { comments: false },
         compress: { warnings: false }
      }),
   ],
};