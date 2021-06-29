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

        <v-textarea v-model="step.description" label="description">
        </v-textarea>
      </v-stepper-content>
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

  mounted() {
    this.currentStep = this.activeStep.index;
  },

  methods: {},
};
</script>