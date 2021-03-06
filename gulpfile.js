'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var minifyCSS = require('gulp-minify-css')
var gulpif = require('gulp-if')
var electron = require('electron-connect').server.create()

var isProduction = false // (process.env.NODE_ENV !== 'development');

gulp.task('style', function () {
  return gulp.src('./app/style/main.scss')
    .pipe(sass())
    .pipe(gulpif(isProduction, minifyCSS()))
    .pipe(gulp.dest('./app/build/style/'))
})

gulp.task('serve', function () {
  // Start browser process
  electron.start()

  // // Add an argument
  // electron.start('Hoge!');

  // // Add list of arguments
  // electron.start(['Hoge', 'foo']);

  // // Callback
  // electron.start(function () {
  //   console.log('started');
  // });

  // Watch styles
  gulp.watch('app/style/**/*.*', ['style'])

  // Restart browser process
  gulp.watch('main.js', electron.restart)

  // Reload renderer process
  gulp.watch(['app/app.js', 'app/index.html'], electron.reload);
})

gulp.task('reload:browser', function () {
  // Restart main process
  electron.restart()
})

gulp.task('reload:renderer', function () {
  // Reload renderer process
  electron.reload()
})

gulp.task('default', ['serve'])

