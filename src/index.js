import path from 'path';
import hash from 'hash-sum';

export default function (output) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  const moduleId = `_vue_jsx-${hash(this.resourcePath)}`;
  const fileName = path.basename(this.resourcePath);
  const hotId = JSON.stringify(`${moduleId}/${fileName}`);

  return `
    ${output}

    if (module.hot) {
      const api = require('vue-hot-reload-api')
      const Vue = require('vue');

      // make the API aware of the Vue that you are using.
      // also checks compatibility.
      api.install(Vue);

      // compatibility can be checked via api.compatible after installation
      if (!api.compatible) {
        throw new Error(
          'vue-hot-reload-api is not compatible with the version of Vue you are using.'
        );
      }

      if (!module.hot.data) {
        api.createRecord(${hotId}, module.exports);
      } else {
        api.rerender(${hotId}, module.exports);
      }
    }
  `;
}
