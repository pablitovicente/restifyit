'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('lint', () => {
  // All files but ignore node_modules
  return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('develop', function () {
  const stream = nodemon({script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
    tasks: ['lint']});

  stream
    .on('restart', function () {
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 5);  // restart the server in 10 seconds
    });
});

gulp.task('default', ['lint', 'develop'], function () {

});



