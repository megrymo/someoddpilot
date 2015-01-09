var gulp = require("gulp");
var frontMatter = require("gulp-front-matter");
var marked = require("gulp-marked");
var rename = require("gulp-rename");
var path = require("path");
var through = require("through2");
var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");

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
    .pipe(through.obj(function (file, enc, callback) {
      fs.readFileSync(
        path.join(__dirname, "templates/", file.frontMatter.template + ".html"),
        "utf-8",
        function (err, templateString) {
          if (err) {
            throw err;
          }

          var templateFn = handlebars.compile(templateString);

          var data = _.extend(
            file.frontMatter,
            {
              contents: file.contents.toString()
            }
          );

          file.contents = new Buffer(templateFn(data), "utf-8");
          callback(null, file);
        }
      );
    }))
    .pipe(gulp.dest("./dest"));
}

gulp.task("posts", postsTask);
