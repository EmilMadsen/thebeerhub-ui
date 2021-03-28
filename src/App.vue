<template>
  <v-app>

    <v-app-bar app>

    <v-btn class="hidden-sm-and-down" text @click="gotoPage('home')">Home</v-btn>
    <v-btn class="hidden-sm-and-down" text>About</v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer/>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    Footer: () => import('@/components/Footer'),
  },

  methods: {
    gotoPage(name) {
      this.$router.push({ name: name})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
