<template>
  <v-container>

    <v-row>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.brew_name" label="Name of brew"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.brew_type" label="Brew Type"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.id" disabled label="Id"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.datetime" disabled label="Datetime"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.brewsters" label="Brewsters"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.location" label="Location"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.recipe" label="Recipe"></v-text-field>
      </v-col>

    </v-row>




    <v-row>

      <v-col cols="12" md="3">
        <v-text-field v-model.number="brew.target_start_gravity" type="number" label="Target Start Gravity"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model.number="brew.actual_start_gravity" type="number" label="Actual Start Gravity"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model.number="brew.target_end_gravity" type="number" label="Target End Gravity"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model.number="brew.actual_end_gravity" type="number" label="Actual End Gravity"></v-text-field>
      </v-col>

    </v-row>

    <v-btn color="secondary" @click="saveBrew"
    >Save
    </v-btn>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],

  data() {
    return {
      brew: {},
    };
  },

  mounted() {
    if (this.id) {
      this.loadBrew();
    }
  },

  methods: {

    loadBrew() {
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

    saveBrew() {
      axios
        .post(process.env.VUE_APP_API_BREW + '/brew/', this.brew)
        .then((response) => {
          console.log(response);
          if (!this.id) {
            this.$router.push({path: '/details/' + response.data.id})
          } else {
            this.brew = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }
};
</script>

<style>
</style>
