import Vue from 'vue';
import router from './router';

const el = document.createElement('div');
document.body.append(el);

const app = new Vue({
  router,
  render() {
    return (
      <router-view></router-view>
    );
  },
});

app.$mount(el);
