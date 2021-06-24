<template>
  <v-container>

    <brew-info 
      v-bind:brew=brew
      v-on:save="saveBrew"
      ></brew-info>

  </v-container>
</template>

<script>

import BrewService from '../service/BrewService'

export default {

  components: {
    BrewInfo: () => import("@/components/BrewInfo")
  },

  data() {
    return {
      brew: {},
    };
  },

  methods: {

    saveBrew() {
      BrewService
        .post(process.env.VUE_APP_API_BREW + '/brew/', this.brew)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            this.$router.push({path: '/details/' + response.data.id})
          } else {
            alert(response)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

  }
};
</script>

<style>
</style>
