module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'vue'
  ],
  env: {
    browser: true
  },
  rules: {
    'vue/jsx-uses-vars': 2
  },
};
