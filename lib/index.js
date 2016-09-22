'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (output) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  var moduleId = '_vue_jsx-' + (0, _hashSum2.default)(this.resourcePath);
  var fileName = _path2.default.basename(this.resourcePath);
  var hotId = JSON.stringify(moduleId + '/' + fileName);

  return '\n    ' + output + '\n\n    if (module.hot) {\n      const api = require(\'vue-hot-reload-api\')\n      const Vue = require(\'vue\');\n\n      // make the API aware of the Vue that you are using.\n      // also checks compatibility.\n      api.install(Vue);\n\n      // compatibility can be checked via api.compatible after installation\n      if (!api.compatible) {\n        throw new Error(\n          \'vue-hot-reload-api is not compatible with the version of Vue you are using.\'\n        );\n      }\n\n      if (!module.hot.data) {\n        api.createRecord(' + hotId + ', module.exports);\n      } else {\n        api.rerender(' + hotId + ', module.exports);\n      }\n    }\n  ';
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];