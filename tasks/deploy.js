var gulp = require("gulp");
var awspublish = require('gulp-awspublish');

gulp.task(
  'deploy',
  ['style', 'news', 'pages', 'work'],
  function () {
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
);
