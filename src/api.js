const Vue = require('vue');
const _ = require('lodash');
const api = require('vue-hot-reload-api');
const serialize = require('serialize-javascript');

// We'll store here the serialized components.
// The cache will be used to decide whenever
// a reload or just a rerender is needed.
const cache = {};

// https://github.com/yahoo/serialize-javascript/blob/adfee60681dd02b0c4ec73793ad4bb39bbff46ef/index.js#L15
const IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g;

// Native objects aren't serializable by the 'serialize-javascript' package,
// so we'll just transform it to strings.
const transformUnserializableProps = (item) => {
  if (_.isObject(item) || _.isArray(item)) {
    return _.mapValues(item, transformUnserializableProps);
  }

  const serializedItem = item.toString();
  if (IS_NATIVE_CODE_REGEXP.test(serializedItem)) {
    return serializedItem;
  }

  return item;
};

const findComponent = ({ ctx, module }) => {
  // Babel did not transform modules
  if (!module.exports) {
    // eslint-disable-next-line no-underscore-dangle
    return ctx.__esModule ? ctx.default : ctx.a;
  }

  // eslint-disable-next-line no-underscore-dangle
  return module.exports.__esModule ? module.exports.default : module.exports;
};

module.exports = ({ ctx, module, hotId }) => {
  // Make the API aware of the Vue that you are using.
  // Also checks compatibility.
  api.install(Vue, false);

  // Compatibility can be checked via api.compatible after installation.
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.',
    );
  }

  // Accept the hot replacement.
  module.hot.accept();

  // Retrieve the exported component. Handle ES and CJS modules as well as
  // untransformed ES modules (env/es2015 preset with modules: false).
  const component = findComponent({ ctx, module });

  // Serialize everything but the render function.
  // We'll use it to decide if we need to reload or rerender.
  const serialized = serialize(
    transformUnserializableProps(_.omit(component, ['render'])),
    { space: 0 },
  );

  if (!module.hot.data) {
    // If no data, we need to create the record.
    api.createRecord(hotId, component);
  } else if (cache[hotId] === serialized) {
    // Rerender only since the component hasn't changed.
    api.rerender(hotId, component);
  } else {
    // Reload the component.
    api.reload(hotId, component);
  }

  // Save the serialized component to the cache.
  cache[hotId] = serialized;
};
