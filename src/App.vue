<template>
  <v-app>
    <v-app-bar app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn class="hidden-sm-and-down" text @click="gotoPage('home')"
        >Home</v-btn
      >
      <v-btn class="hidden-sm-and-down" text @click="gotoPage('priming')"
        >Priming</v-btn
      >
      <v-spacer></v-spacer>

      <v-btn icon @click="gotoPage('login')">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="gotoPage('home')">Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="gotoPage('priming')">Priming</v-list-item-title>
          </v-list-item>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- <Footer /> -->

  </v-app>
</template>

<script>
export default {

  name: "App",

   data: () => ({
      drawer: false,
      group: null,
    }),

  // components: {
  //   Footer: () => import("@/components/Footer"),
  // },

  methods: {
    gotoPage(name) {
      this.$router.push({ name: name }).catch((err) => {});
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
