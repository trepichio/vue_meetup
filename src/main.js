import Vue from "vue";
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from "./App.vue";
import router from "./router";
import { store } from './store';
import DateFilter from './filters/date';

Vue.filter('formatDate', DateFilter)

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
      primary: '#009688',
      secondary: '#03a9f4',
      accent: '#3f51b5',
      error: '#f44336',
      warning: '#ffc107',
      info: '#00bcd4',
      success: '#4caf50'
   }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
