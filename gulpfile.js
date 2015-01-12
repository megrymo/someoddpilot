var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");
var collections = require("gulp-collections");
var connect = require("gulp-connect");
var api = require("gulp-static-api");

function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(filePath.dirname, filePath.basename);
    filePath.basename = "index";
  }
}

var globs = {
  posts: "./src/posts/*.md",
  pages: "./src/*.md",
  caseStudies: "./src/case-studies/*.md",
  templates: "./templates/**/*.html"
};
var fmOptions = {
  property: "frontMatter",
  remove: true
};

function postsTask() {
  return gulp.src(globs.posts)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest/posts"));
}

gulp.task("posts", postsTask);

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      posts: globs.posts,
      caseStudies: globs.caseStudies,
      options: {
        count: 1
      }
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest"));
}

gulp.task("pages", pagesTask);

gulp.task("case-studies", function () {
  return gulp.src(globs.caseStudies)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest/case-studies"));
});

gulp.task("api", function () {
  api({
    glob: "src/posts/*.md",
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
    .pipe(gulp.dest("dest/api/posts"));
});

gulp.task("connect", function () {
  connect.server({
    root: "dest"
  });
});

gulp.task("watch", function () {
  gulp.watch([globs.posts, globs.pages, globs.templates], ["pages"]);
  gulp.watch([globs.posts, "./templates/post.html"], ["posts"]);
});

gulp.task("default", ["posts", "pages", "case-studies", "connect", "watch"]);
