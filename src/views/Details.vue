<template>
  <v-container>

    <brew-info
      v-bind:brew=brew
      v-on:save="saveBrew"
      v-on:delete="deleteBrew"
      ></brew-info>

    <v-container>
      <v-row>
        <v-col cols="12" md="3" v-for="step in steps" v-bind:key="step.id">
          <v-card outlined>
            <v-list-item>
              <v-list-item-content class="mb-3">
                <div class="overline">
                    {{step.index}} - {{step.name}}
                </div>
                <v-list-item-subtitle>started: {{getTime(step, 'started')}}</v-list-item-subtitle>
                <v-list-item-subtitle>ended: {{getTime(step, 'ended')}}</v-list-item-subtitle>
                <v-list-item-subtitle>duration: {{getDuration(step)}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-btn color="secondary" small class="mt-6" @click="gotoStepper(brew.id)">Stepper</v-btn>
    </v-container>

  </v-container>
</template>

<script>

import axios from "axios";

export default {

  props: ['id'],

  components: {
    BrewInfo: () => import("@/components/BrewInfo")
  },

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

    getTime(step, property) {
      if (step && step[property]) {
        let date = new Date(step[property]);
        return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
      } else {
        return '-'
      }
    },

    getDuration(step) {

      if (step && step.started) {

        // get dates
        let started = new Date(step.started).getTime();
        let end = step.ended ? new Date(step.ended).getTime() : new Date().getTime();

        // find the distance between end and the started date
        let distance = end - started;

        // time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // set result
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      } else {
        return '-';
      }
    },

    gotoStepper(brewId) {
      this.$router.push({ path: '/stepper/' + brewId})
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

    loadSteps(parentId) {
      if (parentId) {
        axios
          .get(process.env.VUE_APP_API_BREW + "/step/parent/" + this.id)
          .then((response) => {
            console.log(response);
            this.steps = response.data;
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
