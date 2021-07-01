<template>
  <v-container class="mb-16"> <!-- TODO fix login modal offset-->

    <brew-info
      v-bind:brew=brew
      v-on:save="saveBrew"
      v-on:delete="deleteBrew">
    </brew-info>

    <v-col>
      <image-carousel 
        v-if="brew.images && brew.images.length > 0"
        :images="brew.images"
      ></image-carousel>

      <v-btn class="mt-4" small v-if="hasAuth" color="secondary" @click="imageDialog = true"> Add Image </v-btn>
    </v-col>

    <v-container v-if="brew">
      <v-row>
        <v-col cols="12" md="4" v-for="step in brew.brewSteps" v-bind:key="step.id">
          <step-card
            v-bind:step=step
          ></step-card>
        </v-col>
      </v-row>
      <v-btn 
        v-if="hasAuth"
        color="secondary" 
        small 
        class="mt-6" 
        @click="gotoStepper(brew.id)"
      >
          Stepper
      </v-btn>
    </v-container>

    <BrewChart
      v-if="brew && tiltLogs && tiltLogs.length > 0"
      v-bind:labels="getChartDataValues(tiltLogs, 'timestamp')"
      v-bind:datasetLabel="'gravity'"
      v-bind:datasetData="getChartDataValues(tiltLogs, 'gravity')"
      v-bind:color="'green'"
    ></BrewChart>

    <BrewChart
      v-if="brew && tiltLogs && tiltLogs.length > 0"
      v-bind:labels="getChartDataValues(tiltLogs, 'timestamp')"
      v-bind:datasetLabel="'temperature (celcius)'"
      v-bind:datasetData="getChartDataValues(tiltLogs, 'temperature')"
      v-bind:color="'blue'"
    ></BrewChart>

    <image-upload-dialog
      :show.sync="imageDialog"
    ></image-upload-dialog>

  </v-container>
</template>

<script>

export default {

  props: ['id'],

  components: {
    BrewInfo: () => import("@/components/BrewInfo"),
    ImageCarousel: () => import("@/components/ImageCarousel"),
    ImageUploadDialog: () => import("@/components/ImageUploadDialog"),
    StepCard: () => import("@/components/StepCard"),
    BrewChart: () => import("@/components/BrewChart"),
  },

  data() {
    return {
        imageDialog: false,
      //
    };
  },

  mounted() {
    if (this.id) {
      this.$store.commit('setSelectedId', this.id);
      this.$store.dispatch('loadTiltLog', this.id);
    }
  },

  computed: {
    brew() {
      let brew = this.$store.getters.getSelectedBrew;
      return brew ? brew : {};
    },
    tiltLogs() {
      return this.$store.getters.getTiltLogs;
    },
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {

    getChartDataValues(logs, target) {
      if (logs) {
        return logs.map(log => log[target])
      }
      return [];
    },

    gotoStepper(brewId) {
      this.$router.push({ path: '/stepper/' + brewId})
    },

    saveBrew() {
        this.$store.dispatch("saveBrew", this.brew)
    },

    deleteBrew() {
      if (confirm("really? delete this?")) {
        this.$store.dispatch("deleteBrew", this.brew.id)
      }
    }

  }
};
</script>

<style>
</style>
