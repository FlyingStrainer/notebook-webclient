var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var download = require("gulp-download");
var uglify = require("gulp-uglify");
var exec = require('child_process').exec;
var gutil = require("gulp-util");
var minifier = require("gulp-clean-css");

gulp.task("js", function() {
	return gulp.src(["build/javascripts/lib/*.js", "build/javascripts/foundation.js", "build/javascripts/build/site.js"])
		       .pipe(concat("site.min.js"))
		       .pipe(gulp.dest("build/javascripts/"));
});

gulp.task("css", function() {
	gulp.src(["source/stylesheets/site.css.scss"])
		.pipe(concat("site.css"))
		.pipe(sass({includePaths: "./"})
			.on("error", gutil.log))
		.pipe(minifier())
		.pipe(gulp.dest("build/stylesheets/"));
});

gulp.task("build", function() {
		gulp.start("js");
                gulp.start("css");
});

gulp.task("default", ["build"]);
