module.exports = function (index, amount, offset, scope) {
  if (scope === undefined) {
    scope = offset;
    offset = 0;
  }
  if (((++index) - offset) % amount ) {
    return scope.inverse(this);
  } else {
    return scope.fn(this);
  }
};
