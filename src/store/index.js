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
    	user: null
    },
    getters: {
    	loadedMeetups(state) {
    		return state.loadedMeetups.sort((MeetupA, MeetupB) => {
    			return MeetupA.date > MeetupB.date
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
        }
    },
    mutations: {
        createMeetup(state, payload) {
           state.loadedMeetups =  [...state.loadedMeetups, payload]
       },
       setUser(state, payload) {
           state.user = payload
       }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                imageUrl: payload.imageUrl,
                date: payload.date,
                id: payload.id
            }

            // Reach out to Firebase and store it
            commit('createMeetup', meetup)

        },
        signUserUp({ commit }, payload) {
            Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    data => {
                       const newUser = {
                        id: data.user.uid,
                        registeredMeetup: []
                       }
                       commit('setUser', newUser)
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
        }
    }
});