import gulp from 'gulp';

gulp.task("templates", function () {
  return gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./build/"));
});
