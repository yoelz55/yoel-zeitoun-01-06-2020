import Vue from 'vue';
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#fcf8e8',
        secondary: '#df7861',
        accent: '#ecdfc8',
        error: '#bbe1fa',
      },
      dark: {      
        primary: '#3282b8',
        secondary: '#0f4c75',
        accent: '#1b262c',
        error: '#bbe1fa',
        
      },
    },
  }
});
//nice
// primary: '#ffffff',
// secondary: '#ffe8df',
// accent: '#f0f0f0',
// error: colors.red.accent3,