const _ = require("lodash");
const serialize = require("serialize-javascript");

const toString = object => {
    if (typeof object.toString === "function") {
        return object.toString();
    }

    return Object.prototype.toString.call(object);
};

// Native objects aren't serializable by the 'serialize-javascript' package,
// so we'll just transform it to strings.
//
// We'll use a local cache to prevent transforming cyclic objects.
const transformUnserializableProps = (item, localCache = null) => {
    if (localCache == null) {
        // eslint-disable-next-line no-param-reassign
        localCache = [];
    } else if (_.indexOf(localCache, item) !== -1) {
        return null;
    }

    if (!item) {
        return item;
    }

    const serializedItem = toString(item);

    // https://github.com/yahoo/serialize-javascript/blob/adfee60681dd02b0c4ec73793ad4bb39bbff46ef/index.js#L15
    const isNative = /\{\s*\[native code\]\s*\}/g.test(serializedItem);
    if (isNative) {
        return serializedItem;
    }

    if (_.isFunction(item)) {
        return item;
    }

    if ((_.isObject(item) || _.isArray(item)) && _.size(item) > 0) {
        localCache.push(item);
        return _.mapValues(item, value =>
            transformUnserializableProps(value, localCache),
        );
    }

    return item;
};

module.exports = object =>
    serialize(transformUnserializableProps(object), { space: 0 });
