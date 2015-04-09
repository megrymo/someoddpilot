var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var collections = require('gulp-collections');
var templates = require("./../templates");

var globs = require('./globs');
var renamePage = require('./renamePage');

var templateOptions = require("./../config/templates");

gulp.task("about-first", function () {
  return gulp.src(globs.about.first)
    .pipe(collections({
      globs: {
        first: globs.about.first
      }
    }))
    .pipe(frontMatter(require('./fmOptions')))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./build/about"));
});
