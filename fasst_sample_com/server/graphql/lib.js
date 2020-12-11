const R = require('ramda');

module.exports = {
  toString: (path) => (obj) => R.compose(
    R.when(R.compose(R.not, R.isNil), v => v.toString()),
    R.pathOr(null, path.split('.'))
  )(obj)
};