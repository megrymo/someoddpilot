import gulp from "gulp";
import connect from "gulp-connect";

gulp.task("connect", function connectTask() {
  connect.server({
    root: "build"
  });
});
