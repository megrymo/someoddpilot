var path = require("path");

function renamePage(filePath) {
  if (filePath.basename !== "index") {
    filePath.dirname = path.join(
      filePath.dirname,
      filePath.basename
    );
    filePath.basename = "index";
  }
}

module.exports = renamePage;
