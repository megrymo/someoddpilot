import gulp from "gulp";
import frontMatter from "gulp-front-matter";
import marked from "gulp-marked";
import rename from "gulp-rename";
import templates from "./../templates";
import collections from "gulp-collections";
import replace from "gulp-replace";

import globs from './globs';
import renamePage from './renamePage';

import templateOptions from "./../config/templates";
import fmOptions from './fmOptions';

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      globs: {
        homeSlides: globs.homeSlides,
        news: globs.news,
        work: globs.work
      },
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(replace(/>\s+</g, '><'))
    .pipe(gulp.dest("build"));
}

gulp.task("pages", pagesTask);
