var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var templates = require("./../templates");

var globs = require('./globs');
var renamePage = require('./renamePage');

var templateOptions = require("./../config/templates");

gulp.task("work", function workTask() {
  return gulp.src(globs.work)
    .pipe(frontMatter(require('./fmOptions')))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/work"));
});
