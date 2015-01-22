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
  templates: "./templates/**/*.html"
};
var fmOptions = {
  property: "frontMatter",
  remove: true
};

function newsTask() {
  return gulp.src(globs.news)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest/news"));
}

gulp.task("news", newsTask);

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      news: globs.news,
      work: globs.work,
      options: {
        count: 10
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest"));
}

gulp.task("pages", pagesTask);

gulp.task("work", function () {
  return gulp.src(globs.work)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest/work"));
});

gulp.task("api", function () {
  api({
    glob: "src/news/*.md",
    count: 2,
    sortBy: function (a, b) {
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
  })
    .pipe(gulp.dest("dest/api/news"));
});

gulp.task("connect", function () {
  connect.server({
    root: "dest"
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

gulp.task("default", ["style", "news", "pages", "work", "connect", "watch"]);

gulp.task("deploy", ["style", "news", "pages", "work"]);
