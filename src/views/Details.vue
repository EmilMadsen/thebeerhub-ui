<template>
  <v-container>

    <brew-info
      v-bind:brew=brew
      v-on:save="saveBrew"
      v-on:delete="deleteBrew"
      ></brew-info>

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

  </v-container>
</template>

<script>

export default {

  props: ['id'],

  components: {
    BrewInfo: () => import("@/components/BrewInfo"),
    StepCard: () => import("@/components/StepCard"),
    BrewChart: () => import("@/components/BrewChart"),
  },

  data() {
    return {
      //
    };
  },

  mounted() {
    if (this.id) {
      this.$store.commit('setSelectedId', this.id);
      console.log("loading tilt logs")
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
