var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        "==": function (l, r) { return l == r; },
        "===": function (l, r) { return l === r; },
        "!=": function (l, r) { return l != r; },
        "!==": function (l, r) { return l !== r; },
        "<": function (l, r) { return l < r; },
        ">": function (l, r) { return l > r; },
        "<=": function (l, r) { return l <= r; },
        ">=": function (l, r) { return l >= r; },
        "typeof": function (l, r) { return typeof l == r; },
        "any": function (l, r) {
          r=r.split(" ");
          return _.contains(r,l);}
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

handlebars.registerHelper("everyOther", function (index, amount, offset, scope) {
    if (scope === undefined) {
        scope = offset;
        offset = 0;
    }
    if (((++index) - offset) % amount ) {
      return scope.inverse(this);
    } else {
      return scope.fn(this);
    }
});

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

  globals = options.globals || {};

  return through.obj(templateStream);
}

module.exports = templates;
