<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title class="pl-10 pb-0">
          <span class="text-h5">Your token is getting old</span>
        </v-card-title>
        <v-card-text class="pl-11">
          <small>Login to renew token</small>
        </v-card-text>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="logout"> Logout </v-btn>
          <v-btn color="blue darken-1" text @click="login"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["loginDialog"],

  data: () => ({
    // dialog: false,
    username: "",
    password: "",
  }),

  computed: {
    showDialog: {
      get() {
        return this.loginDialog;
      },
      set(localValue) {
        this.$emit("update:loginDialog", localValue);
      },
    },
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      this.showDialog = false;
    },
    logout() {
      this.$store.commit("logout");
      this.showDialog = false;
    },
  },
};
</script>