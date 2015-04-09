var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var consolidate = require("gulp-consolidate-render");
var glob = require('glob');

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

handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
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

glob('helpers/*.js', function (err, filepaths) {
  if (err) {
    throw err;
  }

  filepaths.forEach(function (filepath) {
    handlebars.registerHelper(
      filepath
        .replace('helpers/', '')
        .replace('.js', ''),
      require('./../' + filepath)
    );
  });
});

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
