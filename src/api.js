const _ = require('lodash');
const api = require('vue-hot-reload-api');

const installApi = _.once((Vue) => {
  // Make the API aware of the Vue that you are using.
  // Also checks compatibility.
  api.install(Vue, false);

  // Compatibility can be checked via api.compatible after installation.
  if (!api.compatible) {
    throw new Error(
      'vue-hot-reload-api is not compatible with the version of Vue you are using.',
    );
  }
});

const findComponent = ({ ctx, module }) => {
  // Babel did not transform modules
  if (!module.exports) {
    // eslint-disable-next-line no-underscore-dangle
    return ctx.__esModule ? ctx.default : ctx.a;
  }

  // eslint-disable-next-line no-underscore-dangle
  return module.exports.__esModule ? module.exports.default : module.exports;
};

module.exports = ({ Vue, ctx, module, hotId }) => {
  installApi(Vue);

  // Accept the hot replacement.
  module.hot.accept();

  // Retrieve the exported component. Handle ES and CJS modules as well as
  // untransformed ES modules (env/es2015 preset with modules: false).
  const component = findComponent({ ctx, module });

  if (!module.hot.data) {
    // If no data, we need to create the record.
    api.createRecord(hotId, component);
  } else {
    // Reload the component.
    api.reload(hotId, component);
  }
};
