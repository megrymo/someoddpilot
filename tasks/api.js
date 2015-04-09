var gulp = require("gulp");
var api = require("gulp-static-api");

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
    .pipe(gulp.dest("build/api/news"));
});
