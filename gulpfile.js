var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");
var connect = require("gulp-connect");
var api = require("gulp-static-api");
var stylus = require("gulp-stylus");
var nib = require("nib");
var sopStyl = require("sop-styl");
var watchify = require("watchify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var gutil = require("gulp-util");
var _ = require("lodash");
var awspublish = require('gulp-awspublish');
var eslint = require('gulp-eslint');

function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(filePath.dirname, filePath.basename);
    filePath.basename = "index";
  }
}

var globs = {
  news: "./src/news/*.md",
  pages: "./src/*.md",
  work: "./src/work/*.md",
  homeSlides: "./src/home-slides/*.md",
  templates: "./templates/**/*.html"
};
var fmOptions = {
  property: "frontMatter",
  remove: true
};

var templateOptions = _.merge({
  helpers: {
    dateFormat: require("./helpers/dateFormat")
  }
}, require("./config/templates"));

require('./tasks/news');
require('./tasks/pages');

gulp.task("work", function () {
  return gulp.src(globs.work)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/work"));
});

function sortByDate(a, b) {
  if (!b.attributes.date) {
    return -1;
  }
  if (!a.attributes.date) {
    return 1;
  }

  a = new Date(a.attributes.date);
  b = new Date(b.attributes.date);

  return (a > b) ?
    -1 : (a < b) ?
    1 : 0;
}

gulp.task("api", function () {
  api({
    glob: "src/news/*.md",
    count: 2,
    sortBy: sortByDate
  })
    .pipe(gulp.dest("./build/api/news"));
});

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
