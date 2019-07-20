<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 text-xs-center text-sm-right>
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 text-xs-center text-sm-left>
        <v-btn large to="/meetup/new" class="info"
          >Organize Meetup</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
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
        <p>Join our awesome meetups!</p>
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
