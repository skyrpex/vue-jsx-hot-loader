module.exports = {
  entry: `${__dirname}/index.js`,
  extendWebpack(config) {
    config.module.rule('js').test(/\.js$/);
    config.module.rule('jsx').test(/\.jsx$/);
    config.module.rule('jsx').use('babel-loader').loader('babel-loader');
    config.module.rule('jsx').use('vue-jsx-hot-loader').loader(require.resolve('../src/index'));
  },
};
