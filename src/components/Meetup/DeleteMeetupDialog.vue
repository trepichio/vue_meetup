<template>
  <v-layout row justify-end>
        <v-dialog lazy v-model="confirmDialog" persistent max-width="400">
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on">{{locale.deleteMeetupDialog.title}}</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              <div v-html="locale.deleteMeetupDialog.message_title">
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text class="text-xs-center" v-html="locale.deleteMeetupDialog.message_description"></v-card-text>
            <v-card-actions>
            <v-layout row justify-center>
              <v-flex xs6 sm12>
              <v-btn color="green darken-3" :class="[$vuetify.breakpoint.xsOnly ? 'mb-4' : '']" flat @click="confirmDialog = false">{{locale.deleteMeetupDialog.confirm_btn}}</v-btn>
              <v-btn color="red darken-3" raised @click="deleteMeetup">{{locale.deleteMeetupDialog.cancel_btn}} </v-btn>
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
    },
    locale () {
      return this.$store.getters.locale;
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