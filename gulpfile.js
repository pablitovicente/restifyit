const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  // All files but ignore node_modules
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
  // This will only run if the lint task is successful...
});
