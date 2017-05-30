'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueHotReloadApi = require('vue-hot-reload-api');

var _vueHotReloadApi2 = _interopRequireDefault(_vueHotReloadApi);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We'll store here the serialized components.
// The cache will be used to decide whenever
// a reload or just a rerender is needed.
var cache = {};

exports.default = function (_ref) {
  var ctx = _ref.ctx,
      module = _ref.module,
      hotId = _ref.hotId;

  // Make the API aware of the Vue that you are using.
  // Also checks compatibility.
  _vueHotReloadApi2.default.install(_vue2.default, false);

  // Compatibility can be checked via api.compatible after installation.
  if (!_vueHotReloadApi2.default.compatible) {
    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
  }

  // Accept the hot replacement.
  module.hot.accept();

  // Retrieve the exported component. Handle ES and CJS modules as well as
  // untransformed ES modules (env/es2015 preset with modules: false).
  var component = void 0;
  if (!module.exports) {
    // babel did not transform modules
    // eslint-disable-next-line no-underscore-dangle
    component = ctx.__esModule ? ctx.default : ctx;
  } else {
    // eslint-disable-next-line no-underscore-dangle
    component = module.exports.__esModule ? module.exports.default : module.exports;
  }

  // Serialize everything but the render function.
  // We'll use it to decide if we need to reload or rerender.
  var serialized = (0, _serializeJavascript2.default)((0, _lodash.omit)(component, ['render']), { space: 0 });

  if (!module.hot.data) {
    // If no data, we need to create the record.
    _vueHotReloadApi2.default.createRecord(hotId, component);
  } else if (cache[hotId] === serialized) {
    // Rerender only since the component hasn't changed.
    _vueHotReloadApi2.default.rerender(hotId, component);
  } else {
    // Reload the component.
    _vueHotReloadApi2.default.reload(hotId, component);
  }

  // Save the serialized component to the cache.
  cache[hotId] = serialized;
};

module.exports = exports['default'];