import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Overview from '@/components/Overview.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'dashboard/overview',
          name: 'overview',
          component: Overview,
        },
      ],
    },
  ],
});
