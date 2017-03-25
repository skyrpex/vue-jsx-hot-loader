import Vue from 'vue';
import Component from './component.jsx';

const el = document.createElement('div');
document.body.append(el);

const app = new Vue({
  render: h => h(Component),
});

app.$mount(el);
