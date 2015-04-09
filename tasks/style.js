var gulp = require("gulp");
var stylus = require("gulp-stylus");
var nib = require("nib");
var sopStyl = require("sop-styl");

gulp.task("style", function () {
  gulp.src("stylus/style.styl")
    .pipe(stylus({
      use: [
        nib(),
        sopStyl()
      ]
    }))
    .pipe(gulp.dest("dest/css"));
});
