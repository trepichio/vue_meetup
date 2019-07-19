<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 text-xs-center text-sm-right>
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 text-xs-center text-sm-left>
        <v-btn large router to="/meetup/new" class="info"
          >Organize Meetup</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
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
      meetups: [
        {
          imageUrl:
            "https://images.musement.com/cover/0002/49/thumb_148242_cover_header.jpeg?w=1200&h=630&q=60&fit=crop",
          id: "1",
          title: "Meetup in New York"
        },
        {
          imageUrl:
            "https://cache.marriott.com/marriottassets/destinations/hero/sao-paulo-destination.jpg?interpolation=progressive-bilinear",
          id: "2",
          title: "Meetup in São Paulo"
        },
        {
          imageUrl:
            "https://4brf13430svm3bnu053zbxvg-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Ultimate-Travel-Guide-to-London.jpg",
          id: "3",
          title: "Meetup in London"
        },
        {
          imageUrl:
            "http://3.bp.blogspot.com/-zOupjE38FuM/V1_7jGFtbWI/AAAAAAAAAV0/gKpFn_jTxHQFGPoc9Vjv28jyzWOmkm-7gCK4B/s1600/lorena%2Bsp.jpg",
          id: "4",
          title: "Meetup in Lorena"
        }
      ]
    };
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
