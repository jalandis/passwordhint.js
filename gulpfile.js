var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    gutil = require('gulp-util'),
    download = require('gulp-download'),
    nightwatch = require('gulp-nightwatch'),
    notify = require('gulp-notify');;

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('src/js/*.js', ['compress']);
  gulp.watch('build/*').on('change', browserSync.reload);
});

gulp.task('compress', function () {
  return gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

gulp.task('download-selenium', function(){
  download('http://selenium-release.storage.googleapis.com/2.46/selenium-server-standalone-2.46.0.jar')
    .pipe(gulp.dest('bin/'));
});

gulp.task('nightwatch', function() {
  gulp.src('')
    .pipe(nightwatch({
      configFile: 'test/nightwatch.json'
    }));
});

gulp.task('nightwatch:firefox', function() {
  browserSync.init({
    server: {
      baseDir: './build',
      open: false
    }
  });

  gulp.src('')
    .pipe(nightwatch({
      configFile: './tests/nightwatch.json',
      cliArgs: {
        env: 'firefox',
        tag: 'password'
      }
    })).on('end', function () {
      browserSync.exit();
    });
});
