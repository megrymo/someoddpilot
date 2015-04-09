var gulp = require("gulp");
var connect = require("gulp-connect");
var stylus = require("gulp-stylus");
var nib = require("nib");
var sopStyl = require("sop-styl");
var watchify = require("watchify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var gutil = require("gulp-util");
var awspublish = require('gulp-awspublish');
var eslint = require('gulp-eslint');

var globs = {
  news: "./src/news/*.md",
  pages: "./src/*.md",
  work: "./src/work/*.md",
  homeSlides: "./src/home-slides/*.md",
  templates: "./templates/**/*.html"
};

require('./tasks/news');
require('./tasks/pages');
require('./tasks/work');
require('./tasks/api');

gulp.task("connect", function () {
  connect.server({
    root: "build"
  });
});

gulp.task("watch", function () {
  gulp.watch([globs.news, globs.pages, globs.templates], ["pages"]);
  gulp.watch([globs.news, "./templates/new.html"], ["news"]);
});

gulp.task("style", function () {
  gulp.src("stylus/style.styl")
    .pipe(stylus({
      use: [
        nib(),
        sopStyl()
      ]
    }))
    .pipe(gulp.dest("dest/css"));
});

var bundler = watchify(browserify("./client.js", watchify.args));

gulp.task("scripts", function () {
  return bundler.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("client.js"))
    .pipe(gulp.dest("./dest/js"));
});

gulp.task("default", ["style", "news", "pages", "work", "connect", "watch"]);

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

gulp.task('test', function testTask() {
  return gulp.src('{gulpfile,app,client,helpers/*}.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
