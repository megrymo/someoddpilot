import gulp from "gulp";
import stylus from "gulp-stylus";
import nib from "nib";
import sopStyl from "sop-styl";

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
