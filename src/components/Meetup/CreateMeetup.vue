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
							<v-img :src="imageUrl" height="150"></v-img>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn raised @click="onPickFile" class="primary">UPLOAD IMAGE</v-btn>
							<input
								type="file"
								style="display: none"
								ref="fileInput"
								accept="image/*"
								@change="onFilePicked"
							>
						</v-flex>
					</v-layout>
					<v-layout row mb-2>
						<v-flex xs12 sm6 offset-sm3>
							<h4>Choose a Date & Time:</h4>
					    <v-date-picker
					    	v-model="date"
					    	:landscape="landscape"
					    	:reactive="reactive"
					    	:full-width=true
					    ></v-date-picker>
					  </v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
					    <v-time-picker
					    	v-model="time"
					    	:landscape="landscape"
					    	:reactive="reactive"
					    	format="24hr"
					    	:full-width=true
					    ></v-time-picker>
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
    	description: '',
    	date: new Date().toISOString().substr(0,10),
    	time: new Date(),
    	image: null,
    	imageUrl: '',
    	landscape: false,
    	reactive: true
    }
  },
  computed: {
  	user() {
  		return this.$store.getters.user
  	},
    formIsValid () {
      return this.title !== '' &&
      	this.location !== '' &&
      	this.description !== '' &&
      	this.date !== '' &&
      	this.time !== '';
    },
    submittableDateTime() {
    	// Passing a date string formatted with '/' instead of '-'
    	// converts the day correctly
    	const date = new Date(this.date.replace(/-/g, '\/'))

    	if (typeof this.time === 'string') {
    		const hours = this.time.match(/^(\d+)/)[1]
    		const minutes = this.time.match(/:(\d+)/)[1]
	    	date.setHours(hours)
	    	date.setMinutes(minutes)
    	} else {
	    	date.setHours(this.time.getHours())
	    	date.setMinutes(this.time.getMinutes())
	    }
    	return date
    }
  },
  methods: {
    onCreateNewMeetup () {
		if (!this.formIsValid) return;
		if (!this.image) return alert('Check if you upload an image correctly')
    	const meetupData = {
    		title: this.title,
    		location: this.location,
    		image: this.image,
    		description: this.description,
    		date: this.submittableDateTime,
    	}
      	this.$store.dispatch('createMeetup', meetupData)
		this.$router.push('/meetups')
    },
    onPickFile(){
    	this.$refs.fileInput.click();
    },
    onFilePicked(event){
    	const files = event.target.files
    	let filename = files[0].name

    	if (filename.lastIndexOf('.') <= 0) {
    		return alert('Please add a valid file!')
    	}

    	const fileReader = new FileReader()
    	fileReader.addEventListener('load', () => {
    		this.imageUrl = fileReader.result
    	})
    	fileReader.readAsDataURL(files[0])
    	this.image = files[0]
    }
  },
  watch: {
    user (val, oldVal) {
      if (val === null || val === undefined) {
        this.$router.push('/')
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>