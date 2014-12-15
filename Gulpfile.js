var gulp     = require('gulp');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
var header   = require('gulp-header');
var jshint   = require('gulp-jshint');
var plumber  = require('gulp-plumber');
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */'

function bufferedBrowserify(standaloneName) {
  var transform     = require('vinyl-transform');
  var browserify    = require('browserify');
  var to5browserify = require('6to5-browserify');

  return transform(function(filename) {
    return browserify(filename, {standalone: standaloneName, debug: true})
      .transform(to5browserify)
      .bundle()
      .on('error', function(err){
        console.error(err.message);
        this.emit('end');
      })
      ;
  });
}

gulp.task('jshint', function() {
  gulp.src(['./index.js', './src/**/*.js'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', function() {
  var name = package.name,
      lowerName = name.toLocaleLowerCase();

  return gulp.src('./index.js')
    .pipe(plumber())
    .pipe(bufferedBrowserify(name))
    .pipe(header(banner, {name: name, version: package.version}))
    .pipe(rename(lowerName + '.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename(lowerName + '.min.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');
  var to5     = require('gulp-6to5');

  gulp.src(['./test/**/*.js', '!./test/setup.js'])
    .pipe(plumber())
    .pipe(to5())
    .pipe(bufferedBrowserify(null))
    .pipe(espower())
    .pipe(gulp.dest('./temp'));

  gulp.src('./test/setup.js')
    .pipe(plumber())
    .pipe(bufferedBrowserify(null))
    .pipe(gulp.dest('./temp'));

});

/**
 * for node
 */
//gulp.task('build', function() {
//  var to5     = require('gulp-6to5');
//
//  return gulp.src('./src/**/*.js')
//    .pipe(plumber())
//    .pipe(to5())
//    .pipe(gulp.dest('./dist/cmj'));
//});
//
//gulp.task('build-test', function() {
//  var espower = require('gulp-espower');
//  var to5     = require('gulp-6to5');
//
//  gulp.src(['./test/**/*.js', '!./test/setup.js'])
//    .pipe(plumber())
//    .pipe(to5())
//    .pipe(espower())
//    .pipe(gulp.dest('./temp'));
//
//});

gulp.task('pretest', function() {
  gulp.start('build', 'build-test');
});
