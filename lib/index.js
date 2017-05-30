'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (output) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  var api = JSON.stringify(require.resolve('./api'));

  var moduleId = '_vue_jsx_hot-' + (0, _hashSum2.default)(this.resourcePath);
  var fileName = _path2.default.basename(this.resourcePath);
  var hotId = JSON.stringify(moduleId + '/' + fileName);

  return output + ' if (module.hot) require(' + api + ')({ ctx: this, module: module, hotId: ' + hotId + ' });';
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];