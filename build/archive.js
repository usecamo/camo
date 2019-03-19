import { dest, src } from 'gulp';
import { version as packageVersion } from '../package';
import zip from 'gulp-zip';

export default function archive() {
  return src('dist/**')
    .pipe(zip(`camo-${packageVersion}-dist.zip`))
    .pipe(dest('dist'));
}
