<template>
  <v-stepper
    v-model="currentStep"
    style="max-width: 800px"
    class="mx-auto mt-12"
  >
    <v-stepper-header>
      <template v-for="step in brewSteps">
        <v-stepper-step :key="`${step.index}-step`" :step="step.index" editable>
          {{ step.name }}
        </v-stepper-step>

        <v-divider
          v-if="step.index !== brewSteps.length"
          :key="step.index"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        v-for="step in brewSteps"
        :key="`${step.index}-content`"
        :step="step.index"
      >
        <step-card v-bind:step="step"></step-card>

        <v-textarea 
          class="label-offset"
          rows=2
          hide-details
          v-model="step.description" 
          background-color="#1e1e1e" 
          label="description">
        </v-textarea>
      </v-stepper-content>

      <v-card-actions>
        <v-row class="ma-1">
            <v-btn small color="secondary" @click="saveStep">Save</v-btn>
        </v-row>
      </v-card-actions>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  props: ["activeStep", "brewSteps"],

  components: {
    StepCard: () => import("@/components/StepCard"),
  },

  data() {
    return {
      currentStep: 1,
    };
  },

  watch: {
    activeStep(val, oldVal) {
      console.log("activeStep changed")
      console.log(val)
      console.log(oldVal)
      this.currentStep = val.index;
    }
  },

  mounted() {
    this.currentStep = this.activeStep.index;
  },

  methods: {

    saveStep() {
      // find currentStep
        let currBrewStep = this.brewSteps.find(brew => brew.index == this.currentStep);
        this.$store.dispatch('saveBrewStep', currBrewStep)
    }

  },
};
</script>
<style>
 .label-offset textarea {
   padding: 8px
 }
 .label-offset label {
   left: 8px !important
 }
</style>