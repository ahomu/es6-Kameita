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

  return gulp.src(['./test/**/*.js'])
    .pipe(plumber())
    .pipe(to5())
    .pipe(espower())
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
//    .pipe(gulp.dest('./temp/src'));
//});
//
//gulp.task('build-test', function() {
//  var espower = require('gulp-espower');
//  var to5     = require('gulp-6to5');
//
//  return gulp.src(['./test/**/*.js', '!./test/setup.js'])
//    .pipe(plumber())
//    .pipe(to5())
//    .pipe(espower())
//    .pipe(gulp.dest('./temp/test'));
//});
