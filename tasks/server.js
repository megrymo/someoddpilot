import gulp from 'gulp';
import gls from 'gulp-live-server';

gulp.task('server', function () {
  gls
    .static(['src', 'build'], process.env.PORT || 8080)
    .start();
});
