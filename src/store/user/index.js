import * as Firebase from 'firebase'

export default {
    state: {
    	user: null,
    },
    getters: {
      user(state) {
        return state.user
      },
    },
    mutations: {
       setUser(state, payload) {
           state.user = payload
       },
       setUserData(state, payload){
          state.user.registeredMeetup = payload
       },
    },
    actions: {
      registerUserForMeetup({ commit, getters, dispatch }, payload) {
        commit('setLoading', true)
        const meetups = [ ...getters.user.registeredMeetup, payload.meetupId]
        //////////////////////////////////////////////////////////////////////
        // Instead of passing 'meetups' to server , I did this hack         //
        // to clean User Registered Meetups which don't exist               //
        // on server anymore. Easy and cheapier way to handle that without  //
        // using Cloud Functions                                            //
        //////////////////////////////////////////////////////////////////////
        const loadedMeetups = getters.loadedMeetups
        const newUserMeetupList = meetups.filter(register => {
          return loadedMeetups.find(meetup => meetup.id === register)
        })
        console.log("newUserMeetupList", newUserMeetupList);
        Firebase.database().ref('users/' + payload.userId)
          .child('registeredMeetups').set(newUserMeetupList)
          .then(() => {
            // This is not needed if REALTIME is being used to sync in loadUserData
            dispatch('loadUserData', newUserMeetupList)

            commit('setLoading', false)
          })
          .catch((error) => {
            console.error(error)
            commit('setLoading', false)
          })
      },
      unregisterUserForMeetup({ commit, getters, dispatch }, payload) {
        commit('setLoading', true)
        const meetups = getters.user.registeredMeetup.filter(meetup => meetup !== payload.meetupId)
        //////////////////////////////////////////////////////////////////////
        // Instead of passing 'meetups' to server , I did this hack         //
        // to clean User Registered Meetups which don't exist               //
        // on server anymore. Easy and cheapier way to handle that without  //
        // using Cloud Functions                                            //
        //////////////////////////////////////////////////////////////////////
        const loadedMeetups = getters.loadedMeetups
        const newUserMeetupList = meetups.filter(register => {
          return loadedMeetups.find(meetup => meetup.id === register)
        })
        console.log("newUserMeetupList", newUserMeetupList);
        Firebase.database().ref('users/' + payload.userId)
          .child('registeredMeetups').set(newUserMeetupList)
          .then(() => {
            // This is not needed if REALTIME is being used to sync in loadUserData
            dispatch('loadUserData', newUserMeetupList)

            commit('setLoading', false)
          })
          .catch((error) => {
            console.error(error)
            commit('setLoading', false)
          })
      },
      loadUserData({ commit, getters}, payload ){
        commit('setLoading', true)
        const userId = getters.user.id
        /**
         * USING THIS REALTIME LISTENER THERE IS NO NEED
         * FOR 'REGISTER' AND 'UNREGISTER' ACTIONS
         * DISPATCHING THIS ACTION AGAIN TO SYNC DATA
         */
/*          Firebase.database().ref('users/' + userId).child('registeredMeetups')
          .on('value',(snap)=>{
            const obj =  snap.val()
            console.log("obj", obj);

            commit('setUserData', obj || [])
            commit('setLoading', false)
          })
*/
        // This is the standard way
        Firebase.database().ref('users/' + userId).child('registeredMeetups').once('value')
            .then((data) => {
              const meetups = []
              const obj = data.val()

              for (let key in obj) {
                meetups.push(obj[key])
              }
              commit('setUserData', meetups)
              commit('setLoading', false)
            })
            .catch((error) => { console.log(error)})
      },
      autoSignIn({ commit }, payload) {
        commit('setUser', { id: payload.uid, registeredMeetup: []})
      },
      signUserUp({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')
        Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(data => {
             commit('setLoading', false)
             const newUser = {
                id: data.user.uid,
                registeredMeetup: []
             }
             commit('setUser', newUser)
          })
          .catch(error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      signUserIn({ commit, getters, dispatch }, { email, password }) {
        commit('setLoading', true)
        commit('clearError')
        Firebase.auth().signInWithEmailAndPassword(email, password)
          .then(data => {
              const currentUser = {
                  id: data.user.uid,
                  registeredMeetup: []
              }
              commit('setUser', currentUser)
              dispatch('loadUserData')
              commit('setLoading', false)
          })
          .catch(function(error) {
            // Handle Errors here.
            commit('setLoading', false)
            commit('setError', error)
            console.error("errorCode", error.code);
          });
      },
      logout({ commit }) {
        Firebase.auth().signOut()
          .then(function () {
            commit('setUser', null)
          })
          .catch((error) => {
            console.warn(error)
          })
      },
  }
};