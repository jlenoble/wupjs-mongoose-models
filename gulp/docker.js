import gulp from 'gulp';
import childProcessData from 'child-process-data';
import {spawn} from 'child_process';

import {testDir} from './globs';

export const buildDockerImage = () => {
  return childProcessData(spawn('docker', ['build', '-t',
    'jlenoble/mongo-wup', '.'], {
      cwd: testDir,
    }));
};

gulp.task('docker', buildDockerImage);
