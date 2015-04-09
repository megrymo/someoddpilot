import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('test', function testTask() {
  return gulp.src('{gulpfile,app,client,helpers/*}.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
