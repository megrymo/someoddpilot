var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var templates = require("./../templates");
var collections = require("gulp-collections");

var globs = require('./globs');
var renamePage = require('./renamePage');

var templateOptions = require("./../config/templates");

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      globs: {
        homeSlides: globs.homeSlides,
        news: globs.news,
        about: globs.about.first,
        work: globs.work
      },
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(require('./fmOptions')))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("build"));
}

gulp.task("pages", pagesTask);
