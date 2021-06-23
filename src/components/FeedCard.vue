<template>
  <v-col cols="12" :md="size === 2 ? 6 : size === 3 ? 4 : undefined">
    <v-card
      :height="brew.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
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
                color="grey darken-3"
                text-color="white"
                small
                @click.stop=""
              >
                {{ brew.brewType }}
              </v-chip>

              <h3 class="title font-weight-bold mb-2 caption">
                {{ brew.brewName }}
              </h3>

              <div class="caption">{{ brew.author }}<br />{{ getDate(brew.created) }}</div>
            </v-col>

            <v-col align-self="end">
              <v-chip
                class="text-uppercase ma-0"
                color="primary"
                label
                small
                @click.prevent="gotoBrew(brew.id)"
              >
                Read More
              </v-chip>
            </v-col>
          </v-row>
      </v-img>
    </v-card>
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

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
