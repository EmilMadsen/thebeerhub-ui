<template>
  <v-container>

    <brew-info 
      v-bind:brew=brew
      v-on:save="saveBrew"
      ></brew-info>

  </v-container>
</template>

<script>

export default {

  components: {
    BrewInfo: () => import("@/components/BrewInfo")
  },

  data() {
    return {
      brew: {},
    };
  },

  methods: {

    saveBrew() {
        this.$store.dispatch("saveBrew", this.brew)
    },

  }
};
</script>

<style>
</style>
