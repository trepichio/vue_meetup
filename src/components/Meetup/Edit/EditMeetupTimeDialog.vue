<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<v-btn
			accent
			slot="activator"
		>
		Edit Time
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>
							<h1>Edit Meetup Time</h1>
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-time-picker
							v-model="editableTime"
							actions
							scrollable
							full-width
							format="24hr"
						>
							<template scope="{save, cancel}">
								<v-btn flat @click="onClose" class="blue--text darken-1">Close</v-btn>
								<v-btn flat @click="onSaveChanges" class="green--text darken-1">Save</v-btn>
							</template>
						</v-time-picker>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {

  name: 'EditMeetupTimeDialog',
  props: ['meetup'],
  data () {
    return {
    	editDialog: false,
    	editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
    	const newDateTime = new Date(this.meetup.date)
    	const newHours = this.editableTime.match(/^(\d+)/)[1]
    	const newMinutes = this.editableTime.match(/:(\d+)/)[1]

    	newDateTime.setHours(newHours)
    	newDateTime.setMinutes(newMinutes)
		console.log("newTime", newDateTime.toISOString());
    	this.$store.dispatch('updateMeetupData', {
    		id: this.meetup.id,
    		date: newDateTime.toISOString()
    	})
    	this.editDialog = false
    },
    onDismissed () {
      	this.$store.dispatch('clearError')
    },
    onClose(){
      	this.$store.dispatch('clearError')
      	this.editDialog = false
    }
  },
  created() {
    this.$store.dispatch('clearError')
  	this.editableTime = new Date(this.meetup.date)
  	console.log("this.editableTime", this.editableTime);
  }
}
</script>

<style lang="css" scoped>
</style>