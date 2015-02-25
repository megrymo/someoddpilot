module.exports = function (index, amount, offset, scope) {
  if (((++index) - offset) % amount ) {
    return scope.inverse(this);
  } else {
    return scope.fn(this);
  }
};
