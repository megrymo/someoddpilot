var gulp = require("gulp");
var watchify = require("watchify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var gutil = require("gulp-util");

var bundler = watchify(browserify("./client.js", watchify.args));

gulp.task("scripts", function () {
  return bundler.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("client.js"))
    .pipe(gulp.dest("./dest/js"));
});
