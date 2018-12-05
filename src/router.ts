import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Overview from '@/components/Overview.vue';
import DataView from '@/components/DataView.vue';
import DataEdit from '@/components/DataEdit.vue';
import PersonalDataEdit from '@/components/data-edit/PersonalDataEdit.vue';
import DataSuccess from '@/components/DataSuccess.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import VuetifyExamples from '@/VuetifyExamples.vue';

import store from '@/store';

Vue.use(Router);

const IdentifyGuard = (redirect: string | object) =>
  (to: any, from: any, next: any) => {
    if (!store.state.userData.initialized) {
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
      component: VuetifyExamples,
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: Overview,
          beforeEnter: IdentifyGuard('/login'),
        },
        {
          path: 'login',
          component: Login,
          props: {
            successRedirect: 'overview',
          },
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
          props: {
            successRedirect: 'overview',
          },
        },
        {
          path: 'data',
          name: 'data-view',
          component: DataView,
          beforeEnter: IdentifyGuard('/login'),
        },
        {
          path: 'skip',
          component: DataView,
        },
        {
          path: 'data/edit',
          name: 'data-edit',
          component: DataEdit,
          beforeEnter: IdentifyGuard('/login'),
          props: route => ({
            area: route.query.area,
          }),
        },
        {
          path: 'data/personal/edit',
          component: PersonalDataEdit,
          beforeEnter: IdentifyGuard('/login'),
        },
        {
          path: 'data/success',
          name: 'data-success',
          component: DataSuccess,
          beforeEnter: IdentifyGuard('/login'),
          props: route => ({
            addressChanged: route.query.addressChanged === 'true',
          }),
        },
      ],
    },
  ],
});
