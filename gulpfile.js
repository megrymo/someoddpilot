var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");

function renamePost(filePath) {
  filePath.dirname = path.join(filePath.dirname, "/posts/", filePath.basename);
  filePath.basename = "index";
}

function postsTask() {
  gulp.src("./src/*.md")
    .pipe(frontMatter({
      property: "frontMatter",
      remove: true
    }))
    .pipe(marked())
    .pipe(rename(renamePost))
    .pipe(gulp.dest("./dest"));
}

gulp.task("posts", postsTask);
