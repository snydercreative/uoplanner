const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
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
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/css'));
});

gulp.task('js', () => {
	return gulp.src(['client/js/utility/namespacer.js', 'client/js/utility/**/*', 'client/js/skillsApp/skillsApp.js', 'client/js/skillsApp/**/*'])
		.pipe(jshint({
			'esversion': 6
		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('master.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('default', ['clean'], (callback) => {
	runSequence(['scss','js'], callback);
});

gulp.task('watcher', () => {
	gulp.watch('client/stylesheets/**/*.scss', ['default']);
	gulp.watch('client/js/*.js', ['default']);
	gulp.watch('client/js/utility/**/*.js', ['default']);
	gulp.watch('client/js/skillsApp/**/*.js', ['default']);
});