<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title class="pl-10 pb-0">
          <span class="text-h5">Upload Image</span>
        </v-card-title>

        <v-card-text>
          <v-container>

            <div>
                <v-img :src="previewImage" class="uploading-image"/>
                <v-file-input type="file" accept="image/jpeg" @change="uploadImage"></v-file-input>
            </div>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveImage"> Save </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["show"],

  data: () => ({
     previewImage: null,
     image: null,
  }),

  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(localValue) {
        this.$emit("update:show", localValue);
      },
    },
    hasAuth() {
      return this.$store.getters.getIsAuthenticated;
    },
  },

  methods: {
    uploadImage(e){
        this.image = e;
        const reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = e =>{
            this.previewImage = e.target.result;
        };
    },
    saveImage() {
        this.$store.dispatch("saveBrewImage", this.image)
        this.showDialog = false;
    }
  },
};
</script>
<style scoped>
   .uploading-image{
     display:flex;
   }

   #file-upload-button {
       color: gold;
       background-color: red;
   }
 </style>