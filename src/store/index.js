import Vue from 'vue';
import Vuex from 'vuex';
import * as Firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    	loadedMeetups: [
    		{
    		  imageUrl:
    		    "https://images.musement.com/cover/0002/49/thumb_148242_cover_header.jpeg?w=1200&h=630&q=60&fit=crop",
    		  id: "1",
    		  title: "Meetup in New York",
    		  date: '2019-08-01',
              location: 'New York'
    		},
    		{
    		  imageUrl:
    		    "https://cache.marriott.com/marriottassets/destinations/hero/sao-paulo-destination.jpg?interpolation=progressive-bilinear",
    		  id: "2",
    		  title: "Meetup in São Paulo",
    		  date: '2019-08-01',
              location: 'São Paulo'
    		},
    		{
    		  imageUrl:
    		    "https://4brf13430svm3bnu053zbxvg-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Ultimate-Travel-Guide-to-London.jpg",
    		  id: "3",
    		  title: "Meetup in London",
    		  date: '2019-08-01',
              location: 'London'
    		},
    		{
    		  imageUrl:
    		    "http://3.bp.blogspot.com/-zOupjE38FuM/V1_7jGFtbWI/AAAAAAAAAV0/gKpFn_jTxHQFGPoc9Vjv28jyzWOmkm-7gCK4B/s1600/lorena%2Bsp.jpg",
    		  id: "4",
    		  title: "Meetup in Lorena",
    		  date: '2019-08-01',
              location: 'Lorena'
    		}
    	],
    	user: null,
      loading: false,
      error: false
    },
    getters: {
    	loadedMeetups(state) {
    		return state.loadedMeetups.sort((MeetupA, MeetupB) => {
    			return MeetupA.date > MeetupB.date ? 1 : -1
    		})
    	},
    	loadedMeetup(state) {
    		return (meetupId) => {
    			return state.loadedMeetups.find((meetup) => {
    				return meetupId === meetup.id
    			})
    		}
    	},
    	featuredMeetups(state, getters) {
    		return getters.loadedMeetups.slice(0,5)
    	},
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    },
    mutations: {
       setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
       },
       createMeetup(state, payload) {
           state.loadedMeetups =  [...state.loadedMeetups, payload]
       },
       updateMeetup(state, payload) {
          const meetup = state.loadedMeetups.find(meetup => {
            return meetup.id === payload.id
          })
          if (payload.title) {
            meetup.title = payload.title
          }
          if (payload.description) {
            meetup.description = payload.description
          }
          if (payload.date) {
            meetup.date = payload.date
          }

       },
       setUser(state, payload) {
           state.user = payload
       },
       setLoading(state, payload) {
           state.loading = payload
       },
       setError(state, payload) {
           state.error = payload
       },
       clearError(state) {
           state.error = null
       }
    },
    actions: {
        createMeetup({ commit, getters }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            Firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                  const filename = payload.image.name
                  const ext = filename.slice(filename.lastIndexOf('.'))
                  return Firebase.storage().ref(`meetups/${key}.${ext}`).put(payload.image)
                })
                .then(fileData => fileData.ref.getDownloadURL())
                .then((url) => {
                  imageUrl = url
                  return Firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    // Reach out to Firebase and store it
                    commit('createMeetup', {
                      ...meetup,
                      imageUrl: imageUrl,
                      id: key
                    })
                })
                .catch((error) => {
                    console.log("error", error);

                })

        },
        updateMeetupData({ commit }, payload) {
          commit('setLoading', true)
          const updateObj = {}
          if (payload.title) {
            updateObj.title = payload.title
          }
          if (payload.description) {
            updateObj.description = payload.description
          }
          if (payload.date) {
            updateObj.date = payload.date
          }
          // update just change properties passed into provided object
          // an empty one doesn't override anything
          Firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
              commit('setLoading', false)
              commit('updateMeetup', payload)
            })
            .catch((error) => {
              console.error(error)
              commit('setLoading', false)
            })
        },
        loadMeetups({ commit, getters }){
            commit('setLoading', true)
            Firebase.database().ref('meetups').once('value')
                .then((data) => {
                  const meetups = []
                  const obj = data.val()

                  for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        location: obj[key].location,
                        date: obj[key].date,
                        creatorId: obj[key].creatorId
                    })
                  }
                  commit('setLoadedMeetups', meetups)
                  commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        autoSignIn({ commit }, payload) {
          commit('setUser', { id: payload.uid, registeredMeetup: []})
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    data => {
                       commit('setLoading', false)
                       const newUser = {
                        id: data.user.uid,
                        registeredMeetup: []
                       }
                       commit('setUser', newUser)
                    }
                ).catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn({ commit }, { email, password }) {
            commit('setLoading', true)
            commit('clearError')
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(data => {
                    commit('setLoading', false)
                    const currentUser = {
                        id: data.user.uid,
                        registeredMeetup: []
                    }
                    commit('setUser', currentUser)
                })
                .catch(function(error) {
                  // Handle Errors here.
                  commit('setLoading', false)
                  commit('setError', error)

                  var errorCode = error.code;
                  console.error("errorCode", errorCode);
                  var errorMessage = error.message;

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
        clearError({ commit }) {
            commit('clearError')
        }
    }
});