var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");
var collections = require("./collections");

function renamePost(filePath) {
  filePath.dirname = path.join(filePath.dirname, filePath.basename);
  filePath.basename = "index";
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
  return gulp.src("./src/*.md")
    .pipe(collections("./src/posts/*.md"))
    .pipe(frontMatter(fmOptions))
    .pipe(templates())
    .pipe(gulp.dest("./dest"));
}

gulp.task("pages", pagesTask);
