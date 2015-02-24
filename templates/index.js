var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var consolidate = require("gulp-consolidate-render");

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
    },
    engine: "handlebars",
    compileData: function (sources) {
      return _.merge.apply(_, sources);
    }
  });

  _.forEach(options.partials || [], forEachPartial, options);

  _.forEach(options.helpers || [], forEachHelper);

  return consolidate(options);
}

module.exports = templates;
