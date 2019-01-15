import Vue from 'vue';
import Vuex from 'vuex';
import defaults from './defaults';
import settings from './settings';
import userData from './userData';

const modules = {
  defaults,
  settings,
  userData,
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});

export { modules };
