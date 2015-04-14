import gulp from 'gulp';
import globs from './globs';
import watch from 'gulp-watch';

gulp.task("watch", function () {
  watch([globs.news, globs.pages, globs.templates], function () {
    gulp.start(["pages"]);
  });
  watch(["./src/about/*", "./templates/about/*"], function () {
    gulp.start(["about"]);
  });
  watch(["./src/work/*"], function () {
    gulp.start(["work"]);
  });
  watch([globs.news, "./templates/news/*.html"], function () {
    gulp.start(["news"]);
  });
  watch(["./src/**/templates/*.html"], function () {
    gulp.start(["templates"]);
  });
  watch(["./stylus/*"], function () {
    gulp.start(["style"]);
  });
  watch(["./src/**/*.js"], function () {
    gulp.start(["scripts"]);
  });
  watch(["./src/assets/**/*"], function () {
    gulp.start(["assets"]);
  });
});
