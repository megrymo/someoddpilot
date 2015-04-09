import gulp from "gulp";
import frontMatter from "gulp-front-matter";
import marked from "gulp-marked";
import rename from "gulp-rename";
import collections from 'gulp-collections';
import templates from "./../templates";

var globs = require('./globs');
import renamePage from './renamePage';

var templateOptions = require("./../config/templates");

gulp.task("about-first", function aboutFirstTask() {
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
