import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#CBAA5C',
                secondary: '#083759',
            },
        },
    },
  }

export default new Vuetify(opts)
