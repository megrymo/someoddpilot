var gulp = require('gulp');
var globs = require('./globs');

gulp.task("watch", function () {
  gulp.watch([globs.news, globs.pages, globs.templates], ["pages"]);
  gulp.watch([globs.news, "./templates/new.html"], ["news"]);
});
