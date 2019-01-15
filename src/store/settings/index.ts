import _ from 'lodash';

import state from './state';

const validMocks = [
  'address',
  'geo',
  'geocoding',
];

export default {
  state,
  namespaced: true,
  getters: {
    hasEnabledMockData: ctx => key => _.includes(ctx.enabledMocks, key),
  },
  mutations: {
    toggleMockData: (ctx: any, key: string) => {
      if (_.includes(validMocks, key)) {
        let enabledMocks = [...ctx.enabledMocks];
        if (_.includes(enabledMocks, key)) {
          enabledMocks = _.without(enabledMocks, key);
        } else {
          enabledMocks.push(key);
        }

        ctx.enabledMocks = enabledMocks;
      }
    },
  },
  actions: {
    enableMocks: (ctx) => {
      if (!_.includes(ctx.state.enabledMocks, 'address')) {
        ctx.commit('toggleMockData', 'address');
      }
      if (!_.includes(ctx.state.enabledMocks, 'geo')) {
        ctx.commit('toggleMockData', 'geo');
      }
      if (!_.includes(ctx.state.enabledMocks, 'geocoding')) {
        ctx.commit('toggleMockData', 'geocoding');
      }
    },
    disableMocks: (ctx) => {
      if (_.includes(ctx.state.enabledMocks, 'address')) {
        ctx.commit('toggleMockData', 'address');
      }
      if (_.includes(ctx.state.enabledMocks, 'geo')) {
        ctx.commit('toggleMockData', 'geo');
      }
      if (_.includes(ctx.state.enabledMocks, 'geocoding')) {
        ctx.commit('toggleMockData', 'geocoding');
      }
    },
  },
};
