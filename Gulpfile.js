var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var sequence = require('run-sequence').use(gulp);
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */'

var FILE_BROWSERIFY_INDEX = './index.js';
var FILE_TEST_RUNNER      = './test/runner.js';

var DIR_DIST = './dist';
var DIR_TEMP = './temp';

var GLOB_TEST_FILES = ['./test/**/*.js', '!./test/runner.js'];
var GLOB_SRC_FILES  = ['./index.js', './src/**/*.js'];

function bufferedBrowserify(standaloneName) {
  var transform  = require('vinyl-transform');
  var browserify = require('browserify');
  var babelify   = require('babelify');

  return transform(function(filename) {
    return browserify(filename, {
        standalone : standaloneName,
        debug      : true,
        noParse    : [
          require.resolve('babel/browser-polyfill')
        ]
      })
      .transform(babelify.configure({
        experimental : false
      }))
      .bundle()
      .on('error', function(err){
        console.error(err.message);
        this.emit('end');
      })
      ;
  });
}

gulp.task('jshint', function() {
  var jshint   = require('gulp-jshint');

  return gulp.src(GLOB_SRC_FILES)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('bump', function(){
  return gulp.src('./package.json')
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('pretest', function() {
  gulp.start('build', 'build-test');
});

gulp.task('release', function() {
  sequence('jshint', 'bump', 'build', 'build-test');
});

gulp.task('watch', function() {
  gulp.watch(GLOB_SRC_FILES, function() {
    gulp.start('jshint', 'build');
  });
});

gulp.task('build', function() {
  var uglify     = require('gulp-uglify');
  var rename     = require('gulp-rename');
  var header     = require('gulp-header');
  var exportName = package.name.replace('-', '');
  var fileName   = package.name.toLocaleLowerCase();

  return gulp.src(FILE_BROWSERIFY_INDEX)
    .pipe(bufferedBrowserify(exportName))
    .pipe(header(banner, {name: fileName, version: package.version}))
    .pipe(rename(fileName + '.js'))
    .pipe(gulp.dest(DIR_DIST))
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename(fileName + '.min.js'))
    .pipe(gulp.dest(DIR_DIST))
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');

  gulp.src(FILE_TEST_RUNNER)
    .pipe(bufferedBrowserify(null))
    .pipe(gulp.dest(DIR_TEMP));

  return gulp.src(GLOB_TEST_FILES)
    .pipe(bufferedBrowserify(null))
    .pipe(espower())
    .pipe(gulp.dest(DIR_TEMP));
});

/**
 * for node
 */
//gulp.task('build', function() {
//  var babel   = require('gulp-babel');
//
//  return gulp.src('./src/**/*.js')
//    .pipe(babel({
//      experimental : false,
//      runtime      : true
//    }))
//    .pipe(gulp.dest('./temp/src'));
//});
//
//gulp.task('build-test', function() {
//  var espower = require('gulp-espower');
//  var babel   = require('gulp-babel');
//
//  return gulp.src(GLOB_TEST_FILES)
//    .pipe(babel({
//      experimental : false,
//    }))
//    .pipe(espower())
//    .pipe(gulp.dest('./temp/test'));
//});
