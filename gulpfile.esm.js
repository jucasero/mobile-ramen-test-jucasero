import gulp from 'gulp';
import { spawnSync } from 'child_process';
import yargs from 'yargs';

gulp.task('generate', (cb) => {
  const argv = yargs.options({
    module: {
      alias: 'm',
      demandOption: false,
      describe: 'generator module',
      type: 'string',
    },
  }).argv;
  const { module } = argv;
  let args = '';
  if (module) {
    args = `${module}`;
  }
  const result = spawnSync(
    `npm run env -- plop --plopfile tools/generate.js -- ${args}`,
    {
      stdio: 'inherit',
      shell: true,
    }
  );

  if (result.status !== 0) {
    const err = new Error('');
    err.stack = ' ';
    return cb(err);
  }
  cb();
});
