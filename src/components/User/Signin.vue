<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form
                @submit.prevent="onSignIn"
                ref="form"
                v-model="valid"
              >
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
                      :label=locale.signin.password_label
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
                    <v-btn
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                      @click="loader = 'loading'"
                    >{{locale.signin.confirm_btn}}
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
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
      },
      valid: false
    };
  },

  computed: {
    user(){
      return this.$store.getters.user
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    },
    locale(){
      return this.$store.getters.locale
    }
  },
  watch: {
    user (val, oldVal) {
      if (val !== null && val !== undefined) {
        if(this.$route.query.entryUrl) {
          this.$router.push(this.$route.query.entryUrl)
        }
        else{
          this.$router.push('/')
        }
      }
    }
  },
  methods: {
    onSignIn () {
      // VueX
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password } )
      }

    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  created(){
    this.$store.dispatch('clearError')
  }
};
</script>

<style lang="css" scoped></style>