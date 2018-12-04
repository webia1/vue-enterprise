// import Vue from 'vue';
import state from './state';

export default {
  state,
  namespaced: true,
  mutations: {
    setPersonalData(ctx: any, data: any) {
      // Vue.set(ctx, 'contact', {
      //   ...ctx.contact,
      //   ...data,
      // });
      ctx.personal = {
        ...ctx.personal,
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
      ctx.commit('setPersonalData', userData.personal);
      ctx.commit('setBankData', userData.bank);
      ctx.commit('initialized');
    },
    updateUser(ctx: any, data: any) {
      ctx.commit('setPersonalData', data);
    },
  },
};
