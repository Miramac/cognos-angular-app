'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('devcognos', function() {

  return gulp.src(config.cognos.src)
    .pipe(changed(config.cognos.src)) // Ignore unchanged files
    .pipe(gulp.dest(config.cognos.dest))
    .pipe(browserSync.stream({ once: true }));
});
