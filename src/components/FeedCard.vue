<template>
  <v-col cols="12" :md="size === 2 ? 6 : size === 3 ? 4 : undefined">
    <v-hover v-slot="{ hover }"> 

      <v-card
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        :height="brew.prominent ? 450 : 350"
        color="grey lighten-1"
        dark
        @click.prevent="gotoBrew(brew.id)"
      >
        <v-img
          :src="require(`@/assets/beer-lineup.jpg`)"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >
            <v-row class="fill-height text-right ma-0">
              <v-col cols="12" >
                
                <v-chip
                  label
                  class="mx-0 mb-2 text-uppercase"
                  color="primary"
                  small
                  @click.stop=""
                >
                  {{ brew.brewName }}
                </v-chip>

                <h3 class="title font-weight-bold mb-2 caption">
                  {{ brew.brewType }}
                </h3>

                <div class="caption">{{ brew.author }}<br />{{ getDate(brew.created) }}</div>
              </v-col>

            </v-row>
        </v-img>
      </v-card>

    </v-hover>
  
  </v-col>
</template>

<script>
export default {
  name: "FeedCard",

  props: {
    size: {
      type: Number,
      required: true,
    },
    brew: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    getDate(datetime) {
        if (datetime) {
          return new Date(datetime).toLocaleDateString();
        }
        return '';
    },

    gotoBrew(brewId) {
      this.$emit('gotobrew', brewId)
    }
  }
};
</script>

<style scoped>

  .v-image__image {
    transition: 0.3s linear;
  }

  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }
</style>
