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
import router from "./router/router";
import { store } from './store';
import DateFilter from './filters/date';
import AlertComponent from './components/shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterUserForMeetupDialog from './components/User/RegisterUserForMeetup.vue'
import DeleteMeetupDialog from './components/Meetup/DeleteMeetupDialog.vue'
import AppLanguageSpeedial from './components/shared/AppLanguageSpeedial.vue'

Vue.filter('formatDate', DateFilter)
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-meetup-dialog-details', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-dialog-date', EditMeetupDateDialog)
Vue.component('app-edit-meetup-dialog-time', EditMeetupTimeDialog)
Vue.component('app-register-meetup-dialog', RegisterUserForMeetupDialog)
Vue.component('app-delete-meetup-dialog', DeleteMeetupDialog)
Vue.component('app-language-speedial', AppLanguageSpeedial)

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
    this.$store.dispatch('setAppLanguage', localStorage.getItem('vue_meetup_language') || 'eng')
     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadUserData')
      }
     })
     this.$store.dispatch('loadMeetups')
  }
}).$mount("#app");
