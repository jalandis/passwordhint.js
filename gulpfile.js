var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    download = require('gulp-download'),
    nightwatch = require('gulp-nightwatch'),
    fs = require('fs'),
    util = require('gulp-util'),
    webserver = require('gulp-webserver');

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

gulp.task('download-selenium', function() {

  if (!fs.existsSync('bin/selenium-server-standalone-2.46.0.jar')) {
    download('http://selenium-release.storage.googleapis.com/2.46/selenium-server-standalone-2.46.0.jar')
      .pipe(gulp.dest('bin/'));
  }


  if (!fs.existsSync('bin/chromedriver_linux64.zip')) {
    download('http://chromedriver.storage.googleapis.com/2.16/chromedriver_linux64.zip')
      .pipe(gulp.dest('bin/'));
  }
});

gulp.task('nightwatch', function() {
  gulp.src('')
    .pipe(nightwatch({
      configFile: 'test/nightwatch.json'
    }));
});

gulp.task('nightwatch', function() {

  var browser = util.env.browser ? util.env.browser : 'firefox',
      tag = util.env.tag ? util.env.tag : 'password',
      serverStream;

  serverStream = gulp.src('./build')
    .pipe(webserver());

  gulp.src('')
    .pipe(nightwatch({
      configFile: './tests/config/nightwatch.json',
      cliArgs: {
        env: browser,
        tag: tag
      }
    })).on('end', function () {
      serverStream.emit('kill');
    });
});
