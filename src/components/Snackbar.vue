<template>
  <v-snackbar v-model="show" :color="color" top right>
    {{ text }}
    <v-btn text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {

  data() {
    return {
      show: false,
      text: '',
      color: 'green',
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showSnackbar") {
        this.text = state.snackbar.text;
        this.color = state.snackbar.color;
        this.show = true;
      }
    });
  },
}
</script>
