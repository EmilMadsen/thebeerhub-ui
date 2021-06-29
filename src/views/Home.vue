<template>
  <v-container class="home-main">
    <v-row>
      <v-col cols="12">
        <Banner/>
      </v-col>
    </v-row>

    <v-row v-if="brews.length > 0">
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
  },

  data() {
    return {
      // layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3], // TODO: move to model
    };
  },

  mounted() {
      this.$store.dispatch("loadBrews")
  },

  computed: {
    brews() {
      return this.$store.getters.getBrews;
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
