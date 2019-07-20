<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<h2 class="secondary--text">Create a new Meetup</h2>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12>
				<form @submit.prevent="onCreateNewMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="title"
								label="Title"
								id="title"
								v-model="title"
								required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="location"
								label="Location"
								id="location"
								v-model="location"
								required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="imageUrl"
								label="Image URL"
								id="image_url"
								v-model="imageUrl"
								required></v-text-field>
							</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-img :src="imageUrl" height="150"></v-img>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-textarea
								name="description"
								label="Description"
								auto-grow
								value=""
								required
								v-model="description"
								></v-textarea>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn class="primary"
							type="submit"
							:disabled="!formIsValid"
							>Create Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {

  name: 'CreateMeetup',

  data () {
    return {
    	title: '',
    	location: '',
    	imageUrl: '',
    	description: '',
    	count: this.$store.getters.loadedMeetups.length
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
      	this.location !== '' &&
      	this.imageUrl !== '' &&
      	this.description !== '';
    }
  },
  methods: {
    onCreateNewMeetup () {
			if (!this.formIsValid) return;
    	const meetupData = {
    		title: this.title,
    		location: this.location,
    		imageUrl: this.imageUrl,
    		description: this.description,
    		date: new Date(),
    		id: ++this.count + ''
    	}
      this.$store.dispatch('createMeetup', meetupData)
			this.$router.push('/meetups')
    }
  }
}
</script>

<style lang="css" scoped>
</style>