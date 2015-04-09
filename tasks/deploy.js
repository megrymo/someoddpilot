import gulp from "gulp";
import awspublish from 'gulp-awspublish';

function deployTask() {
  var publisher = awspublish.create({
    region: 'us-west-2',
    bucket: 'someoddpilot.com'
  });

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  gulp.src('./dest/{**/,}*.{html,css,js,png,svg,jpg}')
    .pipe(awspublish.gzip({ext: '.gz'}))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
}

gulp.task(
  'deploy',
  ['style', 'news', 'pages', 'work'],
  deployTask
);
