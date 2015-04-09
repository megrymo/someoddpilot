var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('test', function testTask() {
  return gulp.src('{gulpfile,app,client,helpers/*}.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
