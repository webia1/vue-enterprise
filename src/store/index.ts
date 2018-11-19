import Vue from 'vue';
import Vuex from 'vuex';
import defaults from './defaults';

const modules = {
  defaults,
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});

export { modules };
