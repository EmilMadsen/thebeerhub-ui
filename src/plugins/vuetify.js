import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        options: {
            customProperties: true,
        },
        dark: true,
        themes: {
            dark: {
                primary: '#da671c',
                secondary: '#083759',
                thirdary: '#da671c'
            },
        },
    },
  }

export default new Vuetify(opts)
