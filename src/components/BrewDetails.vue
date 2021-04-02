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

      <v-btn color="secondary" @click="saveBrew">
        Save
      </v-btn>

      <v-btn v-if="id" color="red" @click="deleteBrew">
        Delete
      </v-btn>

    </v-row>

    <v-row>
      {{steps}}
    </v-row>



  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],

  data() {
    return {
      brew: {},
      steps: [],
    };
  },

  mounted() {
    if (this.id) {
      this.loadBrew();
      this.loadSteps(this.id);
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

    loadSteps(parentId) {
      if (parentId) {
        axios
          .get(process.env.VUE_APP_API_BREW + "/step/parent/" + this.id)
          .then((response) => {
            console.log(response);
            this.steps = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    saveBrew() {
      axios
        .post(process.env.VUE_APP_API_BREW + '/brew/', this.brew)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            this.brew = response.data;
            this.loadSteps(response.data.id);
            this.$router.push({path: '/details/' + response.data.id})
          } else {
            this.brew = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteBrew() {
      if (confirm("really? delete this?")) {
        axios
          .delete(process.env.VUE_APP_API_BREW + '/brew/' + this.brew.id)
          .then(response => {
            console.log(response)
            this.$router.push({path: '/home'})
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

  }
};
</script>

<style>
</style>
