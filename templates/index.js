var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

var partials = ["head", "foot"];

partials.forEach(function (partial) {
  handlebars.registerPartial(
    partial,
    fs.readFileSync(
      path.join(__dirname, "/partials/", partial + ".html"),
      "utf-8"
    )
  );
});

function templateStream(file, enc, callback) {
  function onTemplateFile(err, templateString) {
    if (err) {
      throw err;
    }

    var templateFn = handlebars.compile(templateString);

    var data = _.extend(
      file.frontMatter,
      {
        collections: file.collections,
        contents: file.contents.toString()
      }
    );

    file.contents = new Buffer(templateFn(data), "utf-8");
    callback(null, file);
  }

  var templatePath = path.join(__dirname, file.frontMatter.template + ".html");

  fs.readFile(templatePath, "utf-8", onTemplateFile);
}

function templates() {
  return through.obj(templateStream);
}

module.exports = templates;
