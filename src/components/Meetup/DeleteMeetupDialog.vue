<template>
  <v-layout row justify-end>
        <v-dialog lazy v-model="confirmDialog" persistent max-width="400">
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on">DELETE</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              <div>
                <strong class="red--text text--darken-1">Are you SURE </strong> you want to <strong class="red--text text--darken-1">delete</strong> this Meetup?
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text class="text-xs-center">This action <strong class="red--text text--darken-1">CANNOT BE UNDONE</strong> after you confirm! <strong>Be aware</strong> YOU have been advised.</v-card-text>
            <v-card-actions>
            <v-layout row justify-center>
              <v-flex xs6 sm12>
              <v-btn color="green darken-3" flat @click="confirmDialog = false">NO! I CHANGED MY MIND</v-btn>
              <v-btn color="red darken-3" raised @click="deleteMeetup">YEAH! GET RID OF IT! </v-btn>
              </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
</template>

<script>
export default {

  name: 'DeleteMeetupDialog',
  props: ['meetup'],
  data () {
    return {
      confirmDialog: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {
    deleteMeetup () {
      if(this.user && this.user.id === this.meetup.creatorId) {
        this.$store.dispatch('removeMeetup', {id: this.meetup.id })
          .then(() => {
          // if there is no error go to home page
          if(!this.$store.getters.error){
            this.$router.replace('/')
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>