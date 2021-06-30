<template>
  <v-snackbar v-model="show" :color="color" top right>

    {{ text }}
    
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  
  data() {
    return {
      show: false,
      text: "",
      color: "green",
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
};
</script>
