import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import './validation';
import App from './App.vue';
import router from './router';
import store from '@/store/index';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
