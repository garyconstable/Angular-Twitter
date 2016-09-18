/***********************************************************************
Gulp Build Script.
***********************************************************************/
var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var streamqueue  = require('streamqueue');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
//Combine and minify scripts
//
gulp.task('script', function() {
  //js
  return streamqueue({ objectMode: true },
    //front end vendor
    gulp.src('public/assets/js/vendor/jquery.js'),
    gulp.src('public/assets/js/vendor/bootstrap.js'),
    gulp.src('public/assets/js/vendor/masonry.pkgd.js'),
    gulp.src('public/assets/js/vendor/images-loaded.js'),
    //ng
    gulp.src('public/assets/js/angular/angular.js'),
    gulp.src('public/assets/js/angular/angular-animate.js'),
    gulp.src('public/assets/js/angular/angular-route.js'),
    gulp.src('public/assets/js/angular/angular-resource.js'),
    gulp.src('public/assets/js/vendor/angular-masonry-directive.js'),
    //app
    gulp.src('public/app/app-module.js'),
    //components
    gulp.src('public/app/components/index/indexController.js')
  )
  .pipe(concat('app.js'))
  //.pipe(uglify({mangle: false}))
  .pipe(gulp.dest('public/assets/js/'))
});
// create the build files + manifest
//
gulp.task('manifest', function () {
  return streamqueue({ objectMode: true },
    gulp.src('public/assets/css/app.css'),
    gulp.src('public/assets/js/app.js')
  )
  .pipe(gulp.dest('public/build/'))  // copy original assets to build dir
  .pipe(rev())
  .pipe(gulp.dest('public/build/'))  // write rev'd assets to build dir
  .pipe(rev.manifest())
  .pipe(gulp.dest('public/build/')); // write manifest to build dir
});
//copy assets to folder
//
gulp.task('copy-assets', function () {
  return streamqueue({ objectMode: true },
    gulp.src('public/assets/css/app.css'),
    gulp.src('public/assets/js/app.js')
  )
  .pipe(gulp.dest('public/build/'))
});
// create a handlebars helper to look up fingerprinted asset by non-fingerprinted name
//
var handlebarOptsProduction = {
  helpers: {
    assetPath: function (path, context) {
      return ['/build', context.data.root[path]].join('/');
    }
  }
};
var handlebarOptsDev = {
  helpers: {
    assetPath: function (path, context) {
      return ['/build', path].join('/');
    },
    devCSS: function(){
      return '\r\n<link href="/assets/css/app.css" rel="stylesheet" />';
    }
  }
};
//Compile index html with asset versions
//
gulp.task('buildIndex-production', function () {
  var manifest = JSON.parse(fs.readFileSync('public/build/rev-manifest.json', 'utf8'));
  return gulp.src('index.hbs')
    .pipe(handlebars(manifest, handlebarOptsProduction))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('public/'))
});
gulp.task('buildIndex-dev', function () {
  var manifest = JSON.parse(fs.readFileSync('public/build/rev-manifest.json', 'utf8'));
  return gulp.src('index.hbs')
    .pipe(handlebars(manifest, handlebarOptsDev))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('public/'))
});
// Remove old files
//
gulp.task('removeAssets',[], function () {
  return del([
    'public/build/*.css',
    'public/build/*.js'
  ]);
});
// Cleanup
//
gulp.task('cleanUp',[], function () {
  return del([
    'public/build/app.css',
    'public/build/app.js'
  ]);
});
// Default Gulp task, build production
//
gulp.task('default', function(callback) {
  runSequence(
    'removeAssets',
    'script',
    'manifest',
    'buildIndex-production',
    'cleanUp',
    callback
  );
});
// Dev Gulp task, build dev
//
gulp.task('dev', function(callback) {
  runSequence(
    'removeAssets',
    'script',
    'manifest',
    'buildIndex-dev',
    callback
  );
});
// Dev Gulp task, build dev
//
gulp.task('rebuild', function(callback) {
  runSequence(
    'removeAssets',
    'script',
    'copy-assets',
    callback
  );
});
// // Watch task
//
gulp.task('watch', function() {
  var watcher = gulp.watch([
    //root
    '*.js',
    //app
    'public/app/app-module.js',
    //components
    'public/app/components/index/indexController.js'
  ], ['rebuild']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
