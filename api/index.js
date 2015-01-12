var _ = require("lodash");
var glob = require("glob");
var fm = require("front-matter");
var fs = require("fs");
var path = require("path");

function group(options, files) {
  if (options.count) {
    return _.groupBy(files, function (file, index) {
      return Math.floor(index / options.count);
    });
  }
  return [files];
}

function getFileInfo(files) {
  return files.map(function (file) {
    return _.defaults(
      {
        slug: path.basename(file, path.extname(file))
      },
      fm(fs.readFileSync(file, "utf-8"))
    );
  });
}

function writeFiles(chunk, index) {
  fs.writeFileSync("./dest/api/" + index + ".json", JSON.stringify(chunk));
}

module.exports = function (options) {
  glob(options.glob, function (err, files) {
    if (err) {
      throw err;
    }

    files = getFileInfo(files);

    if (options.sortBy) {
      files = files.sort(options.sortBy);
    }

    files = group(options, files);

    if (!fs.existsSync("./dest/api")) {
      fs.mkdir("./dest/api");
    }

    _.forEach(files, writeFiles);
  });
};
