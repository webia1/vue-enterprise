import Vue from 'vue';
import Router from 'vue-router';

import ChangeContact from '@/views/ChangeContact.vue';
import ChangeSuccess from '@/views/ChangeSuccess.vue';
import Dashboard from '@/views/Dashboard.vue';
import DeveloperDashboard from '@/views/DeveloperDashboard.vue';
import Identify from '@/views/Identify.vue';
import Login from '@/views/Login.vue';
import OCR from '@/views/OCR.vue';
import Services from '@/views/Services.vue';
import Showcase from '@/Showcase.vue';

import store from '@/store';

Vue.use(Router);

const IdentifyGuard = (redirect: string | object) =>
  (to: any, from: any, next: any) => {
    if (!(store.state as any).userData.initialized) {
      return next(redirect);
    }
    return next();
  };

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/showcase',
      component: Showcase,
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '/identify',
          component: Identify,
          props: () => ({
            successRedirect: 'services',
          }),
        },
        {
          path: 'dev',
          component: DeveloperDashboard,
        },
        {
          path: 'ocr',
          component: OCR,
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
          beforeEnter: IdentifyGuard('/'),
        },
        {
          path: 'change/contact',
          component: ChangeContact,
          beforeEnter: IdentifyGuard('/'),
        },
        {
          path: 'change/bank',
          redirect: '/services',
          // beforeEnter: IdentifyGuard('/'),
        },
        {
          path: 'change/success',
          component: ChangeSuccess,
          beforeEnter: IdentifyGuard('/'),
        },
        {
          path: '',
          redirect: '/identify',
        },
      ],
    },
  ],
});
