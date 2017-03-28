# vue-jsx-hot-loader

> Works with:
>
> ![Vue 2](https://img.shields.io/badge/vue-%5E2.0-green.svg)
> ![Webpack](https://img.shields.io/badge/webpack-%5E2.0-green.svg)

This loader will enable `Hot Module Replacement` for [Webpack](http://webpack.js.org/) when using Vue's JSX render functions.

*NOTE: This plugin is still an experiment.*

## Installation

`npm install vue-jsx-hot-loader`

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
