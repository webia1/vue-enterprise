import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  lang: {
    locales: { de },
    current: 'de',
  },
});
