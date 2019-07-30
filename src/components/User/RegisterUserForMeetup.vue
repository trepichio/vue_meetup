<template>
	<v-layout row justify-end>
	    <v-dialog v-model="confirmDialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn v-if="!isAlreadyRegisteredAt"color="primary" dark v-on="on">Register</v-btn>
          <v-btn v-else color="primary" dark v-on="on">Unregister</v-btn>
        </template>
	      <v-card>
          <v-card-title class="headline">{{ isAlreadyRegisteredAt ? 'Unregister': 'Register'}} for Meetup?</v-card-title>
	        <v-spacer></v-spacer>
          <v-card-text v-if="!user">You need to sign in before registering.
            <router-link
              tag="span"
              class="link"
              style="color: blue"
              :to="{name: 'signin', query: { entryUrl: this.$route.path} }">Sign in</router-link> if you already have an account or <router-link
               tag="span"
               class="link"
               style="color: green"
               :to="{name: 'signup', query: { entryUrl: this.$route.path} }">create one now</router-link>.
          </v-card-text>
	        <v-card-text v-else>You can always change your decision later on.</v-card-text>
	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn color="blue darken-1" flat @click="confirmDialog = false">Cancel</v-btn>
            <v-btn v-if="user" color="green darken-1" flat @click="userRegistration">Confirm</v-btn>

	        </v-card-actions>
	      </v-card>
	    </v-dialog>
	  </v-layout>
</template>

<script>
export default {

  name: 'RegisterMeetup',
  props: ['meetupId'],
  data () {
    return {
    	confirmDialog: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    isAlreadyRegisteredAt () {
      if (this.user !== null && this.user !== undefined && this.user.registeredMeetup !== null) {
        return this.user.registeredMeetup.find(meetup => meetup === this.meetupId)
      }
      return false
    },
  },
  methods: {
    userRegistration() {
      if (this.user !== null && this.user !== undefined) {
        const payload = {
          userId: this.user.id,
          meetupId: this.meetupId
        }

        if(!this.isAlreadyRegisteredAt) {
          this.$store.dispatch('registerUserForMeetup', payload )
        }
        else{
          this.$store.dispatch('unregisterUserForMeetup', payload)
        }
      }
      this.confirmDialog = false
    }
  }
}
</script>

<style lang="css" scoped>
  .link {
    cursor: pointer;
    font-style: italic;
  }
</style>