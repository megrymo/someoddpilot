var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

// template data globals
var globals = {};

function templateStream(file, enc, callback) {
  function onTemplateFile(err, templateString) {
    if (err) {
      throw err;
    }

    var templateFn = handlebars.compile(templateString);

    var data = _.extend(
      globals,
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

function forEachPartial(partialPath, name) {
  handlebars.registerPartial(
    name,
    fs.readFileSync(
      path.join(__dirname, "/partials/", partialPath + ".html"),
      "utf-8"
    )
  );
}

function forEachHelper(helper, name) {
  handlebars.registerHelper(
    name,
    helper
  );
}

function templates(options) {
  options = options || {};

  _.forEach(options.partials || [], forEachPartial);

  _.forEach(options.helpers || [], forEachHelper);

  globals = options.globals || {};

  return through.obj(templateStream);
}

module.exports = templates;
