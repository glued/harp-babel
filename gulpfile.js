var gulp 		= require('gulp'),
	babel 		= require('gulp-babel'),
	browserify 	= require('browserify'),
	babelify	= require('babelify'),
	util 		= require('gulp-util'),
	buffer 		= require('vinyl-buffer'),
	source 		= require('vinyl-source-stream'),
	uglify 		= require('gulp-uglify'),
	sourcemaps 	= require('gulp-sourcemaps');

gulp.task('babelIt', function() {
 	browserify('./public/js/script.js', { debug: true })
		.add(require.resolve('babel/polyfill'))
		.transform(babelify)
		.bundle()
		.on('error', util.log.bind(util, 'Browserify Error'))
		.pipe(source('script.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/build'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['babelIt']);
});