<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 text-xs-center text-sm-right>
        <v-btn large to="/meetups" class="info">{{locale.home.explore_btn}}</v-btn>
      </v-flex>
      <v-flex xs12 sm6 text-xs-center text-sm-left>
        <v-btn large to="/meetup/new" class="info"
          >{{locale.home.organize_btn}}</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
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
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style='cursor: pointer'>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click.stop="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 text-xs-center>
        <p>{{locale.home.main_message}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {

    };
  },
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading
    },
    locale () {
      return this.$store.getters.locale
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push(`/meetups/${id}`)
    }
  }
};
</script>

<style lang="css" scoped>
.title {
	position: absolute;
	bottom: 50px;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 2rem;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
