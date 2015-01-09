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

var postsGlob = "./src/posts/*.md";
var fmOptions = {
  property: "frontMatter",
  remove: true
};

function postsTask() {
  return gulp.src(postsGlob)
    .pipe(frontMatter(fmOptions))
    .pipe(marked())
    .pipe(rename(renamePost))
    .pipe(templates())
    .pipe(gulp.dest("./dest/posts"));
}

gulp.task("posts", postsTask);

function pagesTask() {
  return gulp.src(["./src/*.md"])
    .pipe(collections({
      posts: "./src/posts/*.md"
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

gulp.task("default", ["posts", "pages", "connect"]);
