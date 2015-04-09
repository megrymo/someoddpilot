var gulp = require('gulp');
var globs = require('./globs');

gulp.task("watch", function () {
  gulp.watch([globs.news, globs.pages, globs.templates], ["pages"]);
  gulp.watch(["./*/about/*"], ["about"]);
  gulp.watch(["./*/work/*"], ["work"]);
  gulp.watch([globs.news, "./templates/news/*.html"], ["news"]);
  gulp.watch(["./src/**/templates/*.html"], ["templates"]);
  gulp.watch(["./stylus/*"], ["style"]);
  gulp.watch(["./src/**/*.js"], ["scripts"]);
});
