// import Vue from 'vue';
import state from './state';

export default {
  state,
  namespaced: true,
  mutations: {
    setPersonalData: (ctx: any, data: any) => {
      // Vue.set(ctx, 'contact', {
      //   ...ctx.contact,
      //   ...data,
      // });
      ctx.personal = {
        ...ctx.personal,
        ...data,
      };
    },
    setIdentity: (ctx, { firstName, lastName }) => {
      ctx.personal.firstName = firstName;
      ctx.personal.lastName = lastName;
    },
    setBankData: (ctx: any, data: any) => {
      // Vue.set(ctx, 'bank', {
      //   ...ctx.bank,
      //   ...data,
      // });
      ctx.bank = {
        ...ctx.bank,
        ...data,
      };
    },
    setDateFrom: (ctx, dateFrom) => {
      ctx.dateFrom = dateFrom;
    },
    storeConfirmationEmail: (ctx, email) => {
      ctx.confirmationEmail = email;
    },
    useConfirmationEmail: (ctx) => {
      ctx.confirmationEmailUsed = true;
    },
    initialized(ctx: any) {
      // Vue.set(ctx, 'initialized', true);
      ctx.initialized = true;
    },
  },
  actions: {
    initializeUserData: (ctx: any, userData: any) => {
      ctx.commit('setPersonalData', userData.personal);
      ctx.commit('setBankData', userData.bank);
      ctx.commit('storeConfirmationEmail', userData.confirmationEmail);
      ctx.commit('initialized');
    },
    updateUser: (ctx: any, data: any) => {
      ctx.commit('setPersonalData', data.personal);
      ctx.commit('setDateFrom', data.dateFrom);
    },
    contactChanged: (ctx) => {
      ctx.commit('useConfirmationEmail');
    },
  },
};
