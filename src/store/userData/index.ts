// import Vue from 'vue';
import state from './state';

export default {
  state,
  namespaced: true,
  mutations: {
    setContactData(ctx: any, data: any) {
      // Vue.set(ctx, 'contact', {
      //   ...ctx.contact,
      //   ...data,
      // });
      ctx.contact = {
        ...ctx.contact,
        ...data,
      };
    },
    setBankData(ctx: any, data: any) {
      // Vue.set(ctx, 'bank', {
      //   ...ctx.bank,
      //   ...data,
      // });
      ctx.bank = {
        ...ctx.bank,
        ...data,
      };
    },
    initialized(ctx: any) {
      // Vue.set(ctx, 'initialized', true);
      ctx.initialized = true;
    },
  },
  actions: {
    initializeUserData(ctx: any, userData: any) {
      ctx.commit('setContactData', userData.contact);
      ctx.commit('setBankData', userData.bank);
      ctx.commit('initialized');
    },
  },
};
