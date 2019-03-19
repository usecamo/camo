/**
 * index.test.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import sass from 'node-sass';

test('compile camo.scss', () => {
  return new Promise((resolve, reject) => {
    sass.render({
      file: 'scss/camo.scss',
      includePaths: [
        'node_modules'
      ]
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        expect(result.css).toBeTruthy();
        resolve();
      }
    });
  });
});
