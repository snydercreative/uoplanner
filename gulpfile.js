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
const sourcemaps = require('gulp-sourcemaps');
const fs = require('fs')

gulp.task('clean', () => {
	if (fs.existsSync('public'))
		return gulp.src('public')
			.pipe(clean());
});

gulp.task('move-data', () => {
	return gulp.src('client/data/**/*')
		.pipe(gulp.dest("public/data"));
});

gulp.task('scss', () => {
	return gulp.src('client/stylesheets/master.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/css'));
});

gulp.task('js', () => {
	return gulp.src([
			'client/js/utility/namespacer.js', 
			'client/js/utility/**/*.js', 
			'client/js/*.js', 
			'client/js/skillsApp/skillsApp.js', 
			'client/js/skillsApp/services/**/*.js', 
			'client/js/skillsApp/**/*.js'])
		.pipe(sourcemaps.init())
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
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('move-vendor-js', () => {
	gulp.src('client/js/vendor/**/*')
		.pipe(gulp.dest('public/js/vendor'));
});

gulp.task('html', () => {
	gulp.src('client/js/skillsApp/_directives/**/*.html')
		.pipe(gulp.dest('public/views'))
});

gulp.task('default', async () => {
	gulp.series('clean', 'scss','js', 'html', 'move-data', 'move-vendor-js')
});

gulp.task('watcher', async () => {
	gulp.watch('client/stylesheets/**/*.scss', gulp.series('default'));
	gulp.watch('client/js/*.js', gulp.series('default'));
	gulp.watch('client/js/utility/**/*.js', gulp.series('default'));
	gulp.watch('client/js/skillsApp/**/*.js', gulp.series('default'));
	gulp.watch('client/js/skillsApp/**/*.html', gulp.series('default'));
	gulp.watch('server/web/_views/**/*.pug', gulp.series('default'));
});