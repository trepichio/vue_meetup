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
					</v-card-title>
					<v-img
					  :src="meetup.imageUrl"
					  height="400px"
					></v-img>
					<v-card-text>
						<div class="info--text">{{ meetup.date | formatDate}} - {{ meetup.location }}</div>
						<div>{{meetup.description}}</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="primary">Register</v-btn>
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
    loading() {
    	return this.$store.getters.loading
    }
  }
}
</script>

<style lang="css" scoped>
</style>