var moment = require("moment");

module.exports = function (context, block) {
  var f = block.hash.format || "MMM Do, YYYY";
  return moment(context).format(f);
};
