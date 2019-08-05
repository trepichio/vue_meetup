<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<v-btn
			fab
			accent
			slot="activator"
		>
			<v-icon>edit</v-icon>
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>
							<h1>{{locale.editMeetupDetailsDialog.title}}</h1>
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row v-if="error">
				  <v-flex xs12>
				    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
				  </v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							<v-text-field
								name="title"
								:label=locale.editMeetupDetailsDialog.title_label
								id="title"
								v-model="editedTitle"
								required></v-text-field>
							<v-textarea
								name="description"
								:label=locale.editMeetupDetailsDialog.description_label
								auto-grow
								value=""
								required
								v-model="editedDescription"
								></v-textarea>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
				          <v-btn flat @click="onClose" class="blue--text darken-1">{{locale.app.close}}</v-btn>
				          <v-btn flat @click="onSaveChanges" class="green--text darken-1">{{locale.app.save}}</v-btn>
				        </v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {

  name: 'EditMeetupDetailsDialog',
  props: ['meetup'],
  data () {
    return {
    	editDialog: false,
    	editedTitle: this.meetup.title,
    	editedDescription: this.meetup.description
    }
  },
  computed: {
  	formIsValid () {
  	  return this.editedTitle.trim() !== '' &&
  	  	this.editedDescription.trim() !== ''
  	},
  	error() {
  		return this.$store.getters.error
  	},
  	locale () {
  		return this.$store.getters.locale
  	}
  },
  methods: {
    onSaveChanges () {
    	if (!this.formIsValid) return this.$store.commit('setError', { message: "Can't save an invalid form. Please fill up what is missing."});
		this.editDialog = false
		this.$store.dispatch('updateMeetupData', {
			id: this.meetup.id,
			title: this.editedTitle,
			description: this.editedDescription,
		})
    },
    onDismissed () {
      	this.$store.dispatch('clearError')
    },
    onClose(){
      	this.$store.dispatch('clearError')
      	this.editDialog = false
    }
  },
  created(){
    this.$store.dispatch('clearError')
  }
}
</script>

<style lang="css" scoped>
</style>