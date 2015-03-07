var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");
var collections = require("gulp-collections");
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

function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(filePath.dirname, filePath.basename);
    filePath.basename = "index";
  }
}

function renamePageParentFolder(filePath) {
  if (filePath.basename !== "index") {
    filePath.basename = "index";
  }
}

var globs = {
  news: "./src/news/*.md",
  about: {
    first: "./src/about/index.md",
    others: "./src/about/!(index).md"
  },
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

function newsTask() {
  return gulp.src(globs.news)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/news"));
}

gulp.task("news", newsTask);

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      news: globs.news,
      about: globs.about.first,
      homeSlides: globs.homeSlides,
      work: globs.work,
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest"));
}

gulp.task("pages", pagesTask);

gulp.task("work", function () {
  return gulp.src(globs.work)
    .pipe(collections({
      work: globs.work,
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/work"));
});

gulp.task("about", function () {
  return gulp.src(globs.about.others)
    .pipe(collections({
      others: globs.about.others,
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/about")),

    gulp.src(globs.about.first)
    .pipe(collections({
      first: globs.about.first
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates(templateOptions))
    .pipe(gulp.dest("./dest/about"));
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
    .pipe(gulp.dest("dest/api/news"));
});

gulp.task("connect", function () {
  connect.server({
    root: "dest"
  });
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

gulp.task("templates", function () {
  return gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dest/"));
});

gulp.task("watch", function () {
  gulp.watch([globs.news, globs.pages, globs.templates], ["pages"]);
  gulp.watch(["./*/about/*"], ["about"]);
  gulp.watch(["./*/work/*"], ["work"]);
  gulp.watch([globs.news, "./templates/news/*.html"], ["news"]);
  gulp.watch(["./src/**/templates/*.html"], ["templates"]);
  gulp.watch(["./stylus/*"], ["style"]);
  gulp.watch(["./src/**/*.js"], ["scripts"]);
});

gulp.task("default", [ "style", "news", "pages", "work", "about", "connect", "watch", "scripts", "templates"]);

gulp.task("deploy", ["style", "news", "pages", "work"]);
