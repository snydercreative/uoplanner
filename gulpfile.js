const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const stylish = require('jshint-stylish');
const runSequence = require('run-sequence');
const cssnano = require('gulp-cssnano');

gulp.task('clean', () => {
	return gulp.src('public')
		.pipe(clean());
});

gulp.task('scss', () => {
	return gulp.src('client/stylesheets/master.scss')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['clean'], (callback) => {
	return runSequence(['scss'], callback);
});

gulp.task('watcher', () => {
	gulp.watch('client/stylesheets/**/*.scss', ['default']);
	gulp.watch('client/js/*.js', ['default']);
	gulp.watch('client/js/utility/**/*.js', ['default']);
});