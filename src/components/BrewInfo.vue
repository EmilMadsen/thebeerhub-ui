<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="brew.brewName"
          :disabled="!hasAuth"
          label="Name of brew"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.brewType" label="Brew Type" :disabled="!hasAuth"></v-text-field>
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
        <v-text-field v-model="brew.brewsters" label="Brewsters" :disabled="!hasAuth"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.location" label="Location" :disabled="!hasAuth"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.recipe" label="Recipe" :disabled="!hasAuth"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="brew.tiltUrl" label="Tilt Url" :disabled="!hasAuth">
          <v-icon
                  @click="openTiltUrl(brew.tiltUrl)"
                  slot="append"
                  color="green"
          >
            mdi-link
          </v-icon>

        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        
        <v-text-field
          v-model.number="brew.targetStartGravity"
          :disabled="!hasAuth"
          type="number"
          label="Target Start Gravity"
        ></v-text-field>

        <v-text-field
          v-model.number="brew.actualStartGravity"
          :disabled="!hasAuth"
          type="number"
          label="Actual Start Gravity"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model.number="brew.targetEndGravity"
          :disabled="!hasAuth"
          type="number"
          label="Target End Gravity"
        ></v-text-field>

        <v-text-field
          v-model.number="brew.actualEndGravity"
          :disabled="!hasAuth"
          type="number"
          label="Actual End Gravity"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea
          v-model="brew.description"
          rows="1"
          :disabled="!hasAuth"
          label="Description"
        ></v-textarea>
      </v-col>

    <v-col cols="12" md="6" v-if="hasAuth">
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

  computed: {
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {

    openTiltUrl(url) {
      console.log(url)
      window.open(url);
    },

    saveBrew() {
        this.$emit('save')
    },

    deleteBrew() {
        this.$emit('delete')
    },
  },
};
</script>
<style scoped>

</style>
