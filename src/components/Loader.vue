<template>
  <v-card color="secondary" class="mt-15 mx-auto pa-6" max-width="300" min-height="200">
    <v-img
      class="mx-auto loader"
      height="100"
      width="100"
      :src="require('@/assets/hops-icon.png')"
    >
    </v-img>
    <v-card-text class="text-center">
            <h3  style="color: white">Loading...</h3>
    </v-card-text>
  </v-card>
</template>
<style scoped>

.loader {
  width: 120px;
  height: 120px;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>