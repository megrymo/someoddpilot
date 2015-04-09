import gulp from "gulp";
import frontMatter from "gulp-front-matter";
import marked from "gulp-marked";
import rename from "gulp-rename";
import templates from "./../templates";
import collections from "gulp-collections";

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
        about: globs.about.first,
        work: globs.work
      },
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(require(fmOptions)))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("build"));
}

gulp.task("pages", pagesTask);
