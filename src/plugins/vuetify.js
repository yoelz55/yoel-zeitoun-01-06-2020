import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#E3F2FD',
        secondary: '#42A5F5',
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        
        primary: 'black',
        secondary: '#64B5F6',
        accent: colors.shades.black,
        error: colors.red.accent3,
        
      },
    },
  }
});
