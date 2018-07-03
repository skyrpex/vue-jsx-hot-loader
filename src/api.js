const _ = require("lodash");
const api = require("vue-hot-reload-api");
const serialize = require("./serialize");

const install = _.once(Vue => {
    api.install(Vue, false);

    // Compatibility can be checked via api.compatible after installation.
    if (!api.compatible) {
        throw new Error(
            "vue-hot-reload-api is not compatible with the version of Vue you are using.",
        );
    }
});

// We'll store here the serialized components.
// The cache will be used to decide whenever
// a reload or just a rerender is needed.
const cache = {};

const findComponent = ({ ctx, module }) => {
    // Babel did not transform modules
    if (!module.exports) {
        return ctx.__esModule ? ctx.default : ctx.a;
    }

    return module.exports.__esModule ? module.exports.default : module.exports;
};

module.exports = ({ Vue, ctx, module, hotId }) => {
    // Make the API aware of the Vue that you are using.
    // Also checks compatibility.
    install(Vue);

    // Accept the hot replacement.
    module.hot.accept();

    // Retrieve the exported component. Handle ES and CJS modules as well as
    // untransformed ES modules (env/es2015 preset with modules: false).
    const component = findComponent({ ctx, module });
    if (!component || _.isEmpty(component)) {
        return;
    }

    // Serialize everything but the render function.
    // We'll use it to decide if we need to reload or rerender.
    const serialized = serialize(_.omit(component, ["render"]));

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
