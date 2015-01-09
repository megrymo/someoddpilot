var fs = require("fs");
var frontMatter = require("front-matter");
var through = require("through2");
var glob = require("glob");

module.exports = function (fileGlob) {
  function collectionsTransform(file, enc, callback) {
    var files = glob.sync(fileGlob);
    var fileData = files.map(function (filepath) {
      var contents = fs.readFileSync(filepath, "utf-8");

      return frontMatter(contents);
    });

    file.collections = {
      posts: fileData
    };

    this.push(file);

    callback();
  }

  return through.obj(collectionsTransform);
};
