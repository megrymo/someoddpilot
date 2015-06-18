import gulp from "gulp";
import frontMatter from "gulp-front-matter";
import marked from "gulp-marked";
import rename from "gulp-rename";
import collections from 'gulp-collections';
import templates from "./../templates";
import replace from 'gulp-replace';

import globs from './globs';
import renamePage from './renamePage';

import templateOptions from "./../config/templates";

gulp.task("work", function workTask() {
  return gulp.src(globs.work)
    .pipe(collections({
      globs: {
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
    .pipe(replace(/>\s+</g, '><'))
    .pipe(gulp.dest("./build/work"));
});
