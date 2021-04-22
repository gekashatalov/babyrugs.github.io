"use strict";

const
	gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	filesize = require('gulp-filesize');

function buildStyles() {
	var cssData = gulp.src([
		"private_html/css/vendors/*.css",
		"private_html/css/less/core.less"
	])
	.pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
	.pipe(autoprefixer({
		overrideBrowserslist:  ['last 2 versions'],
		cascade: false
	}))
	.pipe(concat('style.min.css'));
	cssData.pipe(cssnano({zindex: false}));
	cssData.pipe(gulp.dest('public_html/css'));
	return cssData;
}

function buildScripts() {
	return (gulp
		.src([
			"private_html/js/vendors/jquery.js",
			"private_html/js/vendors/*.js",
			"private_html/js/site.*.js",
		])
		// .pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('public_html/js'))
	);
}

function watchFiles() {
	gulp.watch('private_html/css/**/*.*', buildStyles);
	gulp.watch('private_html/js/**/*.*', buildScripts);
};

const build = gulp.parallel(buildStyles, buildScripts);
const watch = gulp.parallel(watchFiles);
const oDefault = gulp.series(build, watch);

exports.build = build;
exports.default = oDefault;