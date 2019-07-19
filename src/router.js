import Vue from "vue";
import Router from "vue-router";
// import Home from "@/views/Home.vue";
import Home from '@/components/Home.vue';
import CreateMeetup from '@/components/Meetup/CreateMeetup.vue';
import Meetups from '@/components/Meetup/Meetups.vue';
import Profile from '@/components/User/Profile.vue';
import Signin from '@/components/User/Signin.vue';
import Signup from '@/components/User/Signup.vue';


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/meetups",
      name: "meetups",
      component: Meetups
    },
    {
      path: "/meetup/new",
      name: "createMeetup",
      component: CreateMeetup
    },
    {
      path: "/user/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/user/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/user/signin",
      name: "signin",
      component: Signin
    },
  ]
});
