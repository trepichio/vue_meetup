<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="loading" xs4 offset-xs4 text-xs-center>
        {{locale.app.loading}}
        <v-progress-linear
          color="info accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout
      row wrap
      v-for="meetup in meetups"
      :key="meetup.id"
      v-if="!loading"
      class="mb-4">
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
       <v-hover>
        <v-card
        class="info"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        >
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md5 align-self-center>
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
                    <div>{{meetup.date | formatDate([locale.idiom])}}</div>
                    <div><v-icon>room</v-icon>{{meetup.location}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="`/meetups/${meetup.id}`">
                    <v-icon left>arrow_forward</v-icon>
                    {{locale.meetups.view_btn}}
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
       </v-hover>
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
    },
    loading(){
      return this.$store.getters.loading;
    },
    locale() {
      return this.$store.getters.locale
    }
  }
};
</script>

<style lang="css" scoped></style>
