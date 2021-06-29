<template>
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
</template>
<script>
export default {

  props: ['step'],

  data() {
    return {
    };
  },

  mounted() {
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

  }
};
</script>