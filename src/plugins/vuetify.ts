import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  lang: {
    locales: { de },
    current: 'de',
  },
  theme: {
    primary: '#ED0039',
    secondary: '#6a625a',
    accent: '#6A625A',
    error: '#FF0000',
    warning: '#FFEB3b',
    info: '#E1E0DE',
    success: '#78B60B',
    dashcol: '#FFFFFF',
  },
});
