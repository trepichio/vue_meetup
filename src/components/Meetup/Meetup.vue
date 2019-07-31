<template>
	<v-container>
		<v-layout row wrap class="mt-2" v-if="loading">
		  <v-flex xs4 offset-xs4 text-xs-center>
		    Loading...
		    <v-progress-linear
		      color="info accent-4"
		      indeterminate
		      rounded
		      height="6"
		    ></v-progress-linear>
		  </v-flex>
		</v-layout>
		<v-layout row wrap v-else>
			<v-flex xs12>
				<v-card>
					<v-card-title>
						<h2 class="primary--text">{{ meetup.title }}</h2>
						<template v-if="true">
							<v-spacer></v-spacer>
							<app-edit-meetup-dialog-details
								v-if="userIsCreator"
								:meetup="meetup"
							></app-edit-meetup-dialog-details>
						</template>
					</v-card-title>
					<v-img
					  :src="meetup.imageUrl"
					  height="400px"
					></v-img>
					<v-card-text>
						<div class="info--text">
							{{ meetup.date | formatDate}} - {{ meetup.location }}
							<div style="display: inline-block">
								<app-edit-meetup-dialog-date
									:meetup="meetup"
									v-if="userIsCreator"></app-edit-meetup-dialog-date>
								<app-edit-meetup-dialog-time
									:meetup="meetup"
									v-if="userIsCreator"></app-edit-meetup-dialog-time>
							</div>
						</div>
						<div>{{meetup.description}}</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<app-register-meetup-dialog
							:meetupId="meetup.id"
							v-if="!userIsCreator"
							></app-register-meetup-dialog>
						<app-delete-meetup-dialog
							:meetup="meetup"
							v-if="userIsCreator"></app-delete-meetup-dialog>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {

  name: 'Meetup',

  data () {
    return {
    }
  },
  props: {
    id: {
      type: String,
      required: true,
      default: null
    }
  },
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    isUserAuthenticated(){
    	return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator() {
    	if (!this.isUserAuthenticated) return false
    	return this.meetup.creatorId === this.$store.getters.user.id
    },
    loading() {
    	return this.$store.getters.loading
    }
  },
  watch: {
    meetup (val, oldVal) {
      if(val === null || val === undefined) {
      	this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>