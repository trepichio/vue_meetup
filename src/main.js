// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./firebase.config"

import Vue from "vue";
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from "./App.vue";
import router from "./router";
import { store } from './store';
import DateFilter from './filters/date';
import AlertComponent from './components/shared/Alert.vue'

Vue.filter('formatDate', DateFilter)
Vue.component('app-alert', AlertComponent)

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
  render: h => h(App),
  created() {
     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     this.$store.dispatch('loadMeetups')
  }
}).$mount("#app");
