import Terser from 'terser';
import { promises as fs } from 'fs';
import path from 'path';
import { rollup } from 'rollup';

export default function jsBuild() {
  return rollup({
    input: 'js/index.js'
  })
  .then(bundle => {
    return bundle.write({
      file: 'dist/js/camo.js',
      format: 'cjs',
      sourcemap: true,
      sourcemapPathTransform: relativePath => {
        return path.join('src', path.relative('../../js', relativePath));
      }
    });
  })
  .then(result => {
    const output = result.output[0];
    const code = output.code;
    const map = JSON.stringify(output.map);

    return Terser.minify(code, {
      sourceMap: {
        content: map,
        url: 'camo.min.js.map'
      }
    });
  })
  .then(result => {
    return Promise.all([
      fs.writeFile('dist/js/camo.min.js', result.code),
      fs.writeFile('dist/js/camo.min.js.map', result.map)
    ]);
  });
}
