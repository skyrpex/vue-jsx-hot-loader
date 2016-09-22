'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (output) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  return '\n    ' + output + '\n\n    if (module.hot) {\n      const api = require(\'vue-hot-reload-api\')\n      const Vue = require(\'vue\');\n\n      // make the API aware of the Vue that you are using.\n      // also checks compatibility.\n      api.install(Vue);\n\n      // compatibility can be checked via api.compatible after installation\n      if (!api.compatible) {\n        throw new Error(\n          \'vue-hot-reload-api is not compatible with the version of Vue you are using.\'\n        );\n      }\n\n      if (!module.hot.data) {\n        api.createRecord(\'very-unique-id\', module.exports);\n      } else {\n        api.rerender(\'very-unique-id\', module.exports);\n      }\n    }\n  ';
};

module.exports = exports['default'];