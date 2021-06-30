<template>
  <v-container class="home-main">
    <v-row>
      <v-col cols="12">
        <Banner/>
      </v-col>
    </v-row>

    <loader v-if="loading"></loader>

    <v-row v-else>
      <feed-card
              v-for="(brew, i) in brews"
              :key="i"
              :size="3"
              :brew="brew"
              v-on:gotobrew="gotoBrew"
      />
    </v-row>

  </v-container>
</template>

<script>

export default {
  components: {
    FeedCard: () => import("@/components/FeedCard"),
    Banner: () => import("@/components/Banner"),
    Loader: () => import("@/components/Loader"),
  },

  data() {
    return {
      // layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3], // TODO: move to model
    };
  },

  mounted() {
    if(!this.loading) {
      this.$store.dispatch("loadBrews")
    }
  },

  computed: {
    brews() {
      return this.$store.getters.getBrews;
    },
    loading() {
      return this.$store.getters.getIsLoading;
    }
  },

  methods: {
    gotoBrew(brewId) {
      this.$router.push({ path: '/details/' + brewId})
    },
  }

};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
