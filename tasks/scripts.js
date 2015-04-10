import gulp from "gulp";
import watchify from "watchify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import gutil from "gulp-util";

var bundler = watchify(browserify("./client.js", watchify.args));

bundler.transform('babelify');

gulp.task("scripts", function () {
  return bundler.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("client.js"))
    .pipe(gulp.dest("./build/js"));
});
