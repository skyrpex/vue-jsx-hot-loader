import Vue from 'vue';
import api from 'vue-hot-reload-api';
import serialize from 'serialize-javascript';
import { omit } from 'lodash';

// We'll store here the serialized components.
// The cache will be used to decide whenever
// a reload or just a rerender is needed.
const cache = {};

export default ({ module, hotId }) => {
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

  // Retrieve the exported component. Handle ES and CJS modules.
  // eslint-disable-next-line no-underscore-dangle
  const component = module.exports.__esModule ? module.exports.default : module.exports;

  // Serialize everything but the render function.
  // We'll use it to decide if we need to reload or rerender.
  const serialized = serialize(omit(component, ['render']), { space: 0 });

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
