var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

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

  var templateName = file.frontMatter.template || "post";

  var templatePath = path.join(__dirname, templateName + ".html");

  fs.readFile(templatePath, "utf-8", onTemplateFile);
}

function templates(options) {
  options = options || {};

  var partials = options.partials || [];

  partials.forEach(function (partial) {
    handlebars.registerPartial(
      partial,
      fs.readFileSync(
        path.join(__dirname, "/partials/", partial + ".html"),
        "utf-8"
      )
    );
  });

  return through.obj(templateStream);
}

module.exports = templates;
