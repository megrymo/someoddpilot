import gulp from 'gulp';
import globs from './globs';
import watch from 'gulp-watch';

gulp.task("watch", function () {
  watch([globs.news, globs.pages, globs.templates, globs.homeSlides], function () {
    gulp.start(["pages"]);
  });
  watch(["./src/data/about/*", "./src/templates/about/*"], function () {
    gulp.start(["about"]);
  });
  watch(["./src/data/work/*"], function () {
    gulp.start(["work"]);
  });
  watch([globs.news, "./src/templates/news/*.html"], function () {
    gulp.start(["news"]);
  });
  watch(["./src/**/templates/*.html"], function () {
    gulp.start(["templates"]);
  });
  watch(["./src/stylus/*"], function () {
    gulp.start(["style"]);
  });
  watch(["./src/js/**/*", "./src/js/client.js"], function () {
    gulp.start(["scripts"]);
  });
  watch(["./src/assets/**/*"], function () {
    gulp.start(["assets"]);
  });
});
