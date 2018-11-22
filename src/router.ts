import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Overview from '@/components/Overview.vue';
import Identify from '@/components/Identify.vue';
import DataEdit from '@/components/DataEdit.vue';
import DataSuccess from '@/components/DataSuccess.vue';
import DataView from '@/components/DataView.vue';
import VuetifyExamples from '@/VuetifyExamples.vue';

import store from '@/store';

Vue.use(Router);

const IdentifyGuard = (to: any, from: any, next: any) => {
  // TODO: fix error
  // @ts-ignore
  if (!store.state.userData.initialized) {
    next('/identify');
  }
  next();
};

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
        {
          path: '/identify',
          name: 'identify',
          component: Identify,
        },
        {
          path: '/data',
          name: 'data-view',
          component: DataView,
          beforeEnter: IdentifyGuard,
        },
        {
          path: '/data/edit',
          name: 'data-edit',
          component: DataEdit,
          beforeEnter: IdentifyGuard,
          props: (route) => ({
            area: route.query.area,
          }),
        },
        {
          path: '/data/success',
          name: 'data-success',
          component: DataSuccess,
          beforeEnter: IdentifyGuard,
          props: (route) => ({
            addressChanged: route.query.addressChanged === 'true',
          }),
        },
        {
          path: '/showcase',
          component: VuetifyExamples,
        },
      ],
    },
  ],
});
