import Vue from 'vue';
import Vuex from 'vuex';
import * as Firebase from 'firebase'
import meetup from './meetup'
import user from './user'
import shared from './shared'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
      meetup,
      user,
      shared
    }
});