# vue-jsx-hot-loader

> Vue.js v2 JSX component hot loader for [Webpack](http://webpack.js.org/).

This loader will enable Hot Module Replacement when using Vue 2 JSX render functions.

*NOTE: This plugin is still an experiment*

## Installation

`npm install @skyrpex/vue-jsx-hot-loader`

## Usage

```js
// path/to/component.jsx
export default {
  render(h) {
    return <div>
      <p>Hello</p>
    </div>;
  },
};
```

```js
// webpack.config.js
export default {
  // ...
  module: {
    loaders: [
      // Enable HMR for JSX.
      {
        test: /\.jsx$/,
        use: [
          'babel-loader',
          '@skyrpex/vue-jsx-hot-loader',
        ],
      },
      // Remember to use babel on the rest of the JS files.
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
```
