<template>
  <v-app>
    <v-app-bar app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- nav top header buttons -->
      <div v-for="(link, index) in links" v-bind:key="index">
          <v-btn 
            class="hidden-sm-and-down"
            v-if="showButton(link.requireAuth)"
            text
            @click="gotoPage(link.routerName)"> 
            {{link.name}}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon @click="gotoPage('login')">
        <v-icon>{{accountIcon}}</v-icon>
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

        <!-- nav drawer buttons -->
        <v-list-item v-for="(link, index) in links" v-bind:key="index">
            <v-list-item-title @click="gotoPage(link.routerName)" v-if="showButton(link.requireAuth)">
                <v-icon small>{{link.icon}}</v-icon> 
                {{link.name}}
            </v-list-item-title>
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
      links: [
        { name: 'Home', routerName: 'home', icon: 'mdi-home', requireAuth: false },
        { name: 'Priming', routerName: 'priming', icon: 'mdi-beaker', requireAuth: false },
        { name: 'Create', routerName: 'create', icon: 'mdi-pen', requireAuth: true },
      ]
    }),

  // components: {
  //   Footer: () => import("@/components/Footer"),
  // },

  mounted() {
    this.$store.dispatch("loadBrews")
  },

  computed: {
    accountIcon() {
      if (this.hasAuth) {
        return "mdi-account-check"
      }
      return "mdi-account"
    },
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {
    gotoPage(name) {
      this.$router.push({ name: name }).catch((err) => {});
    },

    showButton(requireAuth) {
      if (requireAuth) {
        return this.hasAuth;
      }
      return true;
    }

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
