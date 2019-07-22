<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      autocomplete="username email"
                      :rules="[rules.email, rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      autocomplete="new-password"
                      :append-icon="showPwd ? 'visibility' : 'visibility_off'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                      hint="At least 8 characters"
                      counter
                      maxlenght="12"
                      :rules="[rules.required, rules.counter]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign In</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: "Signin",

  data() {
    return {
      email: '',
      password: '',
      showPwd: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length < 8 ? 'At least 8 characters required' : value.length <= 12 || 'Max 12 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        error: null
      }
    };
  },

  computed: {
    user(){
      return this.$store.getters.user
    }
  },
  watch: {
    user (val, oldVal) {
      if (val !== null && val !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      // VueX
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password } )

    }
  }
};
</script>

<style lang="css" scoped></style>
