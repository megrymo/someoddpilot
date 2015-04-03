var handlebars = require("handlebars");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var consolidate = require("gulp-consolidate-render");
var glob = require('glob');

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
