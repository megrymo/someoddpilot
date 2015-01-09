var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");
var collections = require("./collections");
var connect = require("gulp-connect");

function renamePost(filePath) {
  filePath.dirname = path.join(filePath.dirname, filePath.basename);
  filePath.basename = "index";
}

function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(filePath.dirname, filePath.basename);
    filePath.basename = "index";
  }
}

var globs = {
  posts: "./src/posts/*.md",
  pages: "./src/*.md",
  templates: "./templates/*.html"
};
var fmOptions = {
  property: "frontMatter",
  remove: true
};

function postsTask() {
  return gulp.src(globs.posts)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePost))
    .pipe(templates())
    .pipe(gulp.dest("./dest/posts"));
}

gulp.task("posts", postsTask);

function pagesTask() {
  return gulp.src(globs.pages)
    .pipe(collections({
      posts: globs.posts
    }))
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePage))
    .pipe(templates())
    .pipe(gulp.dest("./dest"));
}

gulp.task("pages", pagesTask);

gulp.task("connect", function () {
  connect.server({
    root: "dest"
  });
});

gulp.task("watch", function () {
  gulp.watch([globs.posts, globs.pages, globs.templates], ["pages"]);
  gulp.watch([globs.posts, "./templates/post.html"], ["posts"]);
});

gulp.task("default", ["posts", "pages", "connect", "watch"]);
