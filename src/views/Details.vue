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

  </v-container>
</template>

<script>

export default {

  props: ['id'],

  components: {
    BrewInfo: () => import("@/components/BrewInfo"),
    StepCard: () => import("@/components/StepCard"),
  },

  data() {
    return {
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
      return this.$store.getters.getSelectedBrew;
    },
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {

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
