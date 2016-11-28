# Vue JSX Webpack loader

This loader will allow to use JSX render functions along with HMR. Beware, it may have bugs.

## Installation

`npm install @skyrpex/vue-jsx-loader`

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
      // Place the vue-jsx-loader before the babel-loader
      {
        test: /jsx$/,
        loader: 'babel-loader!@skyrpex/vue-jsx-loader',
      },
      // This is not required, but be sure to not parse JSX files with Babel twice
      {
        test: /js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```
