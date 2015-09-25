'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('devcognos', function() {

  return gulp.src('app/cognos/**/*')
    .pipe(changed('app/cognos/**/*')) // Ignore unchanged files
    .pipe(gulp.dest('build/cognos'))
    .pipe(browserSync.stream({ once: true }));

});
