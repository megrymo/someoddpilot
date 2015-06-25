import gulp from 'gulp';
import frontMatter from 'gulp-front-matter';
import marked from 'gulp-marked';
import rename from 'gulp-rename';
import templates from './../src/templates';

import globs from './globs';
import renamePage from './renamePage';

import templateOptions from './../config/templates';
import fmOptions from './fmOptions';

function newsTask() {
  return gulp.src(globs.news)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest('build/news'));
}

gulp.task('news', newsTask);
