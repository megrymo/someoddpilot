var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

partials.forEach(function (partial) {
  handlebars.registerPartial(
    partial,
    fs.readFileSync(
      path.join(__dirname, "/partials/", partial + ".html"),
      "utf-8"
    )
  );
});

handlebars.registerHelper("equal", function(lvalue, rvalue, options) {
    if (arguments.length < 3){
      throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    if ( lvalue !== rvalue ) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
});

handlebars.registerHelper("lessThan", function(lvalue, rvalue, options) {
    if (arguments.length < 3){
      throw new Error("Handlebars Helper lessThan needs 2 parameters");
    }
    if (lvalue > rvalue || lvalue === rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
});

handlebars.registerHelper("greaterThan", function(lvalue, rvalue, options) {
    if (arguments.length < 3){
      throw new Error("Handlebars Helper greaterThan needs 2 parameters");
    }
    if (lvalue < rvalue || lvalue === rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
});

handlebars.registerHelper("everyOtherOffset", function (index, amount, offset, scope) {
    if (((++index) - offset) % amount ) {
      return scope.inverse(this);
    } else {
      return scope.fn(this);
    }
});

handlebars.registerHelper("everyOther", function (index, amount, scope) {
    if (++index % amount ) {
      return scope.inverse(this);
    } else {
      return scope.fn(this);
    }
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

  var templateName = file.frontMatter.template || "news";

  var templatePath = path.join(__dirname, templateName + ".html");

  fs.readFile(templatePath, "utf-8", onTemplateFile);
}

function templates(options) {
  options = options || {};

  var partials = options.partials || [];

  _.forEach(partials, function (partialPath, name) {
    handlebars.registerPartial(
      name,
      fs.readFileSync(
        path.join(__dirname, "/partials/", partialPath + ".html"),
        "utf-8"
      )
    );
  });

  var helpers = options.helpers || [];

  _.forEach(helpers, function (helper, name) {
    handlebars.registerHelper(
      name,
      helper
    );
  });

  return through.obj(templateStream);
}

module.exports = templates;
