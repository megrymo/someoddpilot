var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var through = require("through2");

handlebars.registerHelper("compare", function (lvalue, operator, rvalue, options) {

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
        "contains": function (l, r) {
          var what = new RegExp(r);
          return what.test(l); },
        "doesntContain": function (l, r) {
          var whatNot = new RegExp(r);
          var doesIt =  !whatNot.test(l);
          return !doesIt; },
        "any": function (l, r) {
          r = r.split(" ");
          return _.contains(r, l);}
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

handlebars.registerHelper("eachLimited", function(ary, max, options) {
    if(!ary || ary.length == 0){
        return options.inverse(this);
    }
    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i){
        result.push(options.fn(ary[i]));
      }
    return result.join("");
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

function forEachPartial(partialPath, name) {
  fs.readFile(
    path.join(
      this.partialPath.prefix,
      partialPath + this.partialPath.extension
    ),
    "utf-8",
    function (err, contents) {
      if (err) {
        throw err;
      }

      handlebars.registerPartial(name, contents);
    }
  );
}

function forEachHelper(helper, name) {
  handlebars.registerHelper(name, helper);
}

function templates(options) {
  options = _.merge(options, {
    partialPath: {
      prefix: path.join(__dirname, "partials"),
      extension: ".html"
    }
  });

  _.forEach(options.partials || [], forEachPartial, options);

  _.forEach(options.helpers || [], forEachHelper);

  var globals = options.globals || {};

  return through.obj(function (file, enc, callback) {
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
  });
}

module.exports = templates;
