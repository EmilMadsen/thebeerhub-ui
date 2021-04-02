<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="brew.brew_name"
          label="Name of brew"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.brew_type" label="Brew Type"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.id" disabled label="Id"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="brew.created"
          disabled
          label="Created"
        ></v-text-field>
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
        <v-text-field
          v-model.number="brew.target_start_gravity"
          type="number"
          label="Target Start Gravity"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="brew.actual_start_gravity"
          type="number"
          label="Actual Start Gravity"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="brew.target_end_gravity"
          type="number"
          label="Target End Gravity"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="brew.actual_end_gravity"
          type="number"
          label="Actual End Gravity"
        ></v-text-field>
      </v-col>

    <v-col cols="12" md="6">
      <v-btn small color="secondary" @click="saveBrew"> Save </v-btn>
      <v-btn small v-if="brew.id" color="red" @click="deleteBrew"> Delete </v-btn>
    </v-col>


    </v-row>
  </v-container>
</template>

<script>

export default {

  name: "BrewInfo",

  props: ["brew"],

  methods: {

    saveBrew() {
        this.$emit('save')
    },

    deleteBrew() {
        this.$emit('delete')
    },
  },
};
</script>
<style>
</style>
