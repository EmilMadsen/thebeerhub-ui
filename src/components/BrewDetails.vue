<template>
  <v-container>
    details

    {{ id }}

    {{brew}}
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],

  data() {
    return {
      brew: null
    };
  },

  mounted() {
    axios
      .get(process.env.VUE_APP_API_BREW + "/brew/" + this.id)
      .then((response) => {
        console.log(response);
        this.brew = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>
