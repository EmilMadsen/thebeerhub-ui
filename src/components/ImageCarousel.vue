<template>
  <v-carousel height="400">
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >

        <v-btn 
            v-if="hasAuth"
            absolute
            style="z-index: 10"
            small  
            @click="deleteImage(image.id)">
                <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-img :src="image.imageUrl" contain max-height="400"></v-img>

    </v-carousel-item>
  </v-carousel>
</template>

<script>
    export default {
        props: ['images'],

        computed: {
            hasAuth() {
                return this.$store.getters.getIsAuthenticated;
            },
        },

        methods: {
            deleteImage(imageId) {
                this.$store.dispatch("deleteImage", imageId)
            }
        }
    }
</script>