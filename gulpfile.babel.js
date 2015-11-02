import fs         from 'fs';
import gulp       from 'gulp';
import babel      from 'gulp-babel';
import browserify from 'browserify';
import babelify   from 'babelify';
import util       from 'gulp-util';
import buffer     from 'vinyl-buffer';
import source     from 'vinyl-source-stream';
import uglify     from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import plugins    from 'gulp-load-plugins';
import collapse   from 'bundle-collapser/plugin';

const $ = plugins();

gulp.task('compile', () => {
	browserify('./public/_js/script.js', { debug: true })
	.add(require.resolve('babel-polyfill'))
	.transform(babelify.configure({presets: ["es2015"]}))
	.bundle()
	.on('error', util.log.bind(util, 'Browserify Error'))
	.pipe(source('script.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify({ mangle: false }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/build'));
});

gulp.task('prod:build', ['lint'], () => {
	browserify('./public/_js/script.js', { debug: false, fullPaths: false })
	.add(require.resolve('babel-polyfill'))
	.transform(babelify.configure({compact:true})) //,  optional: ['minification.removeConsole']
	.plugin(collapse)
	.bundle()
	.on('error', util.log.bind(util, 'Browserify Error'))
	.pipe(source('script.js'))
	.pipe(buffer())
	.pipe(uglify({
      mangle:true,
      compress:true
    }))
	.pipe(gulp.dest('./public/build'));
});

gulp.task('lint', () => {
	return gulp.src('public/_js/**/*.js')
  .pipe($.plumber())
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failOnError())
  .pipe($.jscs())
  // .pipe($.notify(jscsNotify));
});

gulp.task('watch', () => {
	gulp.watch(['public/_js/*.js','public/_js/**/*.js'], ['compile']);
});
