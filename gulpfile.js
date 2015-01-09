var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var templates = require("./templates");

function renamePost(filePath) {
  filePath.dirname = path.join(filePath.dirname, filePath.basename);
  filePath.basename = "index";
}

var postsGlob = "./src/posts/*.md";

function postsTask() {
  return gulp.src(postsGlob)
    .pipe(frontMatter({
      property: "frontMatter",
      remove: true
    }))
    .pipe(marked())
    .pipe(rename(renamePost))
    .pipe(templates())
    .pipe(gulp.dest("./dest/posts"));
}

gulp.task("posts", postsTask);
