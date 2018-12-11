import Vue from 'vue';
import Router from 'vue-router';
import ChangeContact from '@/views/ChangeContact.vue';
import Dashboard from '@/views/Dashboard.vue';
import Overview from '@/views/Overview.vue';
import Login from '@/views/Login.vue';
import Services from '@/views/Services.vue';
import ChangeSuccess from '@/views/ChangeSuccess.vue';
import VuetifyExamples from '@/VuetifyExamples.vue';

import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/showcase',
      component: VuetifyExamples,
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '',
          component: Overview,
          props: () => ({
            successRedirect: 'services',
          }),
        },
        {
          path: 'login',
          component: Login,
          props: () => ({
            successRedirect: 'services',
          }),
        },
        {
          path: 'services',
          component: Services,
        },
        {
          path: 'change/contact',
          component: ChangeContact,
        },
        {
          path: 'change/bank',
          redirect: '/',
        },
        {
          path: 'change/success',
          component: ChangeSuccess,
        },
      ],
    },
  ],
});
