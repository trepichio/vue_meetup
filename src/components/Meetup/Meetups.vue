<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md5>
                <v-img
                  :src="meetup.imageUrl"
                  height="130px"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="headline white--text mb-0">
                      {{meetup.title}}
                    </h5>
                    <div>{{meetup.date | formatDate}}</div>
                    <div><v-icon>room</v-icon>{{meetup.location}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="`/meetups/${meetup.id}`">
                    <v-icon left>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Meetups",

  data() {
    return {};
  },
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>

<style lang="css" scoped></style>
