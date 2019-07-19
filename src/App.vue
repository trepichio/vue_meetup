<template>
  <v-app>
    <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
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
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      menuItems: [
        {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        {icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        {icon: 'person', title: 'Profile', link: '/user/profile' },
        {icon: 'face', title: 'Sign up', link: '/user/signup' },
        {icon: 'lock_open', title: 'Sign in', link: '/user/signin' },
      ]
    }
  }
}
</script>
