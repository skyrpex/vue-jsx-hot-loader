import path from 'path';
import hash from 'hash-sum';

export default function (output) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  const api = JSON.stringify(require.resolve('./api'));

  const moduleId = `_vue_jsx_hot-${hash(this.resourcePath)}`;
  const fileName = path.basename(this.resourcePath);
  const hotId = JSON.stringify(`${moduleId}/${fileName}`);

  return `${output} if (module.hot) require(${api})({ ctx: this, module: module, hotId: ${hotId} });`;
}
