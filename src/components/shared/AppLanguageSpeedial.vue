<template>
	<v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="yellow darken-2"
            dark
            fab
          >
            <v-icon>language</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click.prevent="setLanguage"
        >
          <v-icon class="flag-icon flag-icon-br">ptbr</v-icon>
        </v-btn>

        <v-btn
          fab
          dark
          small
          color="blue"
          @click.prevent="setLanguage"
        >
          <v-icon class="flag-icon flag-icon-us">eng</v-icon>
        </v-btn>
      </v-speed-dial>
</template>

<script>
export default {

  name: 'AppLanguageSpeedial',
  data () {
    return {
      direction: 'right',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-x-transition'
    }
  },
  computed: {
    activeFab () {
      switch (this.tabs) {
        case 'ptbr': return { 'class': 'flag-icon flag-icon-br', icon: 'ptbr' }
        case 'eng': return { 'class': 'flag-icon flag-icon-us', icon: 'eng' }
        default: return {}
      }
    }
  },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  },
  methods: {
    setLanguage (e) {
      console.log("target", e.target.textContent);
      const idiom =  e.target.textContent
      this.tabs = idiom
      localStorage.setItem('vue_meetup_language', idiom)
      this.$store.dispatch('setAppLanguage', idiom)
    }
  }
}
</script>

<style lang="css" scoped>
  .flag-icon-background {
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
  }
  .flag-icon {
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    position: relative;
    display: inline-block;
    width: 1.33333333em;
    line-height: 1em;
  }
  .flag-icon:before {
    content: "\00a0";
  }

  .flag-icon-br {
    background-image: url(../../assets/brazil.svg);
  }
  .flag-icon-us {
    background-image: url(../../assets/usa.svg);
  }
</style>