<template>
  <v-dialog width="350px" persistent v-model="editDialog">
		<v-btn
			accent
			slot="activator"
		>
		{{locale.dateDialog.title}}
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>
							<h2>{{locale.dateDialog.title}}</h2>
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-date-picker
							v-model="editableDate"
							actions
							scrollable
							full-width
              :first-day-of-week="0"
              :locale=locale.idiom
						>
							<template scope="{save, cancel}">
								<v-btn flat @click="onClose" class="blue--text darken-1">Close</v-btn>
								<v-btn flat @click="onSaveChanges" class="green--text darken-1">Save</v-btn>
							</template>
						</v-date-picker>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import moment from 'moment'
export default {

  name: 'EditMeetupDateDialog',
  props: ['meetup'],
  data () {
    return {
    	editDialog: false,
    	editableDate: null
    }
  },
  computed: {
    locale () {
      return this.$store.getters.locale
    }
  },
  methods: {
    onSaveChanges () {
    	const newDate = new Date(this.meetup.date)
    	const newDay = new Date(this.editableDate).getUTCDate()
    	console.log("newDay", newDay);
    	const newMonth = new Date(this.editableDate).getUTCMonth()
    	console.log("newMonth", newMonth);
    	const newYear = new Date(this.editableDate).getUTCFullYear()
    	console.log("newYear", newYear);

    	newDate.setDate(newDay)
    	newDate.setUTCMonth(newMonth)
    	newDate.setUTCFullYear(newYear)
		  console.log("newDate", newDate);
    	this.$store.dispatch('updateMeetupData', {
    		id: this.meetup.id,
    		date: newDate.toISOString()
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
  	this.editableDate = moment(this.meetup.date).format().substr(0,10)
  	console.log("editableDate", this.editableDate);
  	console.log("this.meetup.date", this.meetup.date);
  }
}
</script>

<style lang="css" scoped>
</style>