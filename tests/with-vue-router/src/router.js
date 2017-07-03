/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/1',
    },
    {
      path: '/1',
      component: require('./page-1.jsx').default,
    },
    {
      path: '/2',
      component: require('./page-2.jsx').default,
    },
  ],
});

export default router;
