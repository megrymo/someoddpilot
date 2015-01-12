var _ = require("lodash");
var glob = require("glob");
var fm = require("front-matter");
var fs = require("fs");
var path = require("path");
var through = require("through2");
var File = require("vinyl");

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

module.exports = function (options) {
  var stream = through.obj(function (file, enc, cb) {
    cb(null, new File(file));
  });

  glob(options.glob, function (err, files) {
    if (err) {
      throw err;
    }

    files = getFileInfo(files);

    if (options.sortBy) {
      files = files.sort(options.sortBy);
    }

    files = group(options, files);

    _.forEach(files, function (item, index) {
      stream.write({
        path: index + ".json",
        contents: new Buffer(JSON.stringify(item))
      });
    });
  });

  return stream;
};
