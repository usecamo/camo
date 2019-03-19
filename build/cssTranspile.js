import { dest, src } from 'gulp';
import path from 'path';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

export default function cssTranspile(style, name) {
  return new Promise((resolve, reject) => {
    src('scss/camo.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ includePaths: ['node_modules'], outputStyle: style })
        .on('error', sass.logError))
      .pipe(rename(name))
      .pipe(sourcemaps.mapSources(sourcePath => path.join('scss', sourcePath)))
      .on('error', reject)
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/css'))
      .on('end', resolve);
  });
}
