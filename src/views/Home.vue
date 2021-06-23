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
              :size="layout[i]"
              :brew="brew"
              v-on:gotobrew="gotoBrew"
      />
    </v-row>



  </v-container>
</template>

<script>

import axios from "axios";

export default {
  components: {
    FeedCard: () => import("@/components/FeedCard"),
    Banner: () => import("@/components/Banner"),
  },

  data() {
    return {
      brews: [],
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3], // TODO: move to model
    };
  },

  mounted() {
    axios
      .get(process.env.VUE_APP_API_BREW + "/brew")
      .then((response) => {
        console.log(response);
        this.brews = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {

    gotoBrew(brewId) {
      console.log("opening: " + brewId)
      this.$router.push({ path: '/details/' + brewId})

    }

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
