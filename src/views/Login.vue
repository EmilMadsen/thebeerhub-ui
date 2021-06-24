<template>
  <v-container>

            <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  Beerclub Login
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                              outline
                              label="Username"
                              type="text"
                              v-model="username"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="login">
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-btn @click="killToken">kill token</v-btn>
          <v-btn @click="printToken">print token</v-btn>

        </v-flex>
      </v-layout>

  </v-container>
</template>

<script>

import BrewService from '../service/BrewService'

export default {

  components: {
  },

  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {

    login() {
      BrewService.login( this.username, this.password)
    },

    killToken() {
      localStorage.removeItem('user-token');
    },

    printToken() {
      alert(localStorage.getItem('user-token'))
    }

  }
};
</script>

<style>
</style>
