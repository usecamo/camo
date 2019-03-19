import { parallel, series } from 'gulp';
import archive from './build/archive';
import clean from './build/clean';
import cssBuild from './build/cssBuild';
import jsBuild from './build/jsBuild';

export default series(clean, parallel(jsBuild, cssBuild), archive);
