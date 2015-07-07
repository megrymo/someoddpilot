module.exports = function(lvalue, rvalue, options) {
  if (arguments.length < 3){
    throw new Error("Handlebars Helper greaterThan needs 2 parameters");
  }
  if (lvalue < rvalue || lvalue === rvalue) {
    return options.inverse(this);
  }
  return options.fn(this);
};
