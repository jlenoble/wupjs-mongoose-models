import gulp from 'gulp';

import {allSrcGlob, allBuildGlob, dockerBuildGlob} from './globs';
import {build} from './build';
import {test} from './test';

export const watch = done => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(allBuildGlob, test);
  gulp.watch(dockerBuildGlob, gulp.series('docker', test));
  done();
};

gulp.task('watch', watch);
