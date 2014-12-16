var gulp     = require('gulp');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
var header   = require('gulp-header');
var jshint   = require('gulp-jshint');
var plumber  = require('gulp-plumber');
var sequence = require('run-sequence').use(gulp);
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */'

function bufferedBrowserify(standaloneName) {
  var transform  = require('vinyl-transform');
  var browserify = require('browserify');
  var to5ify     = require('6to5ify');

  return transform(function(filename) {
    return browserify(filename, {
        standalone : standaloneName,
        debug      : true,
        noParse    : [require.resolve('6to5/browser-polyfill')]
      })
      .transform(to5ify.configure({
        experimental : false,
        runtime      : true
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
  return gulp.src(['./index.js', './src/**/*.js'])
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

gulp.task('build', function() {
  var exportName = package.name.replace('-', '');
  var fileName = package.name.toLocaleLowerCase();

  return gulp.src('./index.js')
    .pipe(bufferedBrowserify(exportName))
    .pipe(header(banner, {name: fileName, version: package.version}))
    .pipe(rename(fileName + '.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename(fileName + '.min.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');

  gulp.src('./test/runner.js')
    .pipe(bufferedBrowserify(null))
    .pipe(gulp.dest('./temp'));

  return gulp.src(['./test/**/*.js', '!./test/runner.js'])
    .pipe(bufferedBrowserify(null))
    .pipe(espower())
    .pipe(gulp.dest('./temp'));
});

/**
 * for node
 */
//gulp.task('build', function() {
//  var to5     = require('gulp-6to5');
//
//  return gulp.src('./src/**/*.js')
//    .pipe(to5({
//      experimental : false,
//      runtime      : true
//    }))
//    .pipe(gulp.dest('./temp/src'));
//});
//
//gulp.task('build-test', function() {
//  var espower = require('gulp-espower');
//  var to5     = require('gulp-6to5');
//
//  return gulp.src(['./test/**/*.js', '!./test/setup.js'])
//    .pipe(to5({
//      experimental : false,
//      runtime      : true
//    }))
//    .pipe(espower())
//    .pipe(gulp.dest('./temp/test'));
//});
