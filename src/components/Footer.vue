<template>
  <v-footer
    class="py-4"
    height="auto"
  >
    <v-container class="mx-auto">
      <v-row>
        <v-col cols="9">
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-3"
            color="primary"
            square
          >
            <v-icon v-text="item.icon" />
          </v-btn>
        </v-col>

        <v-spacer />

        <v-col cols="1">
          <v-btn
                  class="mr-0"
                  square
                  color="primary"
                  title="Go to top"
                  @click="$vuetify.goTo(0)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'CoreFooter',

    data: () => ({
      items: [
        {
          href: '#/create',
          icon: 'mdi-plus',
        },
      ],
    }),
  }
</script>
