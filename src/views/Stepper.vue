<template>
  <v-container>

    <v-card>
        <v-col>
          {{this.brew.brew_name}}
          <br>
          {{this.activeStep}}
          <br>
          {{now}}
          <br>
          {{duration}}
          <br>
          <v-btn @click="nextStep">next step</v-btn>
        </v-col>
    </v-card>

  </v-container>
</template>

<script>
import axios from "axios";

export default {

  props: ['id'],

  data() {
    return {
      steps: [],
      brew: {},
      duration: "xx",
    };
  },

  mounted() {
    if (this.id) {
      this.loadSteps(this.id);
      this.loadBrew();
    }
    this.setDuration();
  },

  computed: {

    now() {
      return new Date().toISOString();
    },

    activeStep() {
      if (this.steps) {
        for (let i = 0; i < this.steps.length; i++) {
          if (this.steps[i].started && !this.steps[i].ended) {
            return this.steps[i];
          }
        }
        return this.steps[0];
      }
      return null;
    }
  },

  methods: {

    setDuration() {
      // Update the count down every 1 second
      let self = this;

      setInterval(function() {


        if (self.activeStep && self.activeStep.started) {
          // Get todays date and time
          let now = new Date().getTime();
          // console.log(new Date())
          let started = new Date(self.activeStep.started).getTime();
          // console.log(new Date(self.activeStep.started))

          // Find the distance between now an the count down date
          let distance = now - started;
          // console.log(distance)

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Output the result in an element with id="demo"
          self.duration = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }

      }, 1000);
    },

    nextStep() {
      if (this.activeStep) {
        // check if index 1 and not started
        if (!this.activeStep.started && this.activeStep.index === 1) {
          this.activeStep.started = new Date().toISOString();
          this.updateStep(this.activeStep)
        }

        // else close old, and start new.
      }
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

    updateStep(step) {
      axios
        .post(process.env.VUE_APP_API_BREW + '/step/', step)
        .then((response) => {
          console.log(response);
          this.loadSteps(this.id);
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
