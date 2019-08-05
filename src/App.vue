<template>
  <v-app>
    <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          width=250
        >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="onLogout"
          v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{locale.app.menuItems.logout}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary">
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
          >MeetUp</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.link" flat>
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          {{locale.app.menuItems.logout}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3">
      <app-language-speedial></app-language-speedial>
      <v-spacer></v-spacer>
      <strong class="subheading mr-2" v-html="locale.app.footer.contact"></strong>
      <v-spacer></v-spacer>
      <div>&copy; 2019 - by Trepichio, J.</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: this.locale.app.menuItems.sign_up, link: '/user/signup' },
        {icon: 'lock_open', title: this.locale.app.menuItems.sign_in, link: '/user/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'supervisor_account', title: this.locale.app.menuItems.view_meetups, link: '/meetups' },
          {icon: 'room', title: this.locale.app.menuItems.organize_meetups, link: '/meetup/new' },
          {icon: 'person', title: this.locale.app.menuItems.profile, link: '/user/profile' }
        ]
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    language () {
      return this.$store.getters.appLanguage
    },
    locale() {
      return this.$store.getters.locale
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>
  @import './styles/main.css'
</style>