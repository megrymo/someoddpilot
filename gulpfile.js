var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");

gulp.task("posts", function () {
  gulp.src("./src/*.md")
    .pipe(frontMatter({
      property: "frontMatter",
      remove: true
    }))
    .pipe(marked())
    .pipe(rename(function (path) {
      path.dirname += "/posts/" + path.basename;
      path.basename = "index";
    }))
    .pipe(gulp.dest("./dest"));
});
