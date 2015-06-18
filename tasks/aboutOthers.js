import gulp from "gulp";
import frontMatter from "gulp-front-matter";
import marked from "gulp-marked";
import rename from "gulp-rename";
import collections from 'gulp-collections';
import templates from "./../templates";
import {about as aboutGlobs} from './globs';
import renamePage from './renamePage';
import templateOptions from "./../config/templates";
import fmOptions from './fmOptions';
import replace from 'gulp-replace';

gulp.task("about-others", function () {
  return gulp.src(aboutGlobs.others)
    .pipe(collections({
      others: aboutGlobs.others,
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(replace(/>\s+</g, '><'))
    .pipe(gulp.dest("./build/about"));
});
