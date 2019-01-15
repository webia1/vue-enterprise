import '@babel/polyfill';
import Vue from 'vue';
import '@/plugins/vuetify';
import '@/plugins/validation';
import App from './App.vue';
import router from './router';
import store from '@/store';

Vue.config.productionTip = false;

// import userData from '@/globals/userData';

// store.dispatch('userData/initializeUserData', userData);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
