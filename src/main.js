import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' 
import router from './router'
import store from './store'
import stepDurationFormatter from './services/stepDurationFormatter'

Vue.config.productionTip = false
Vue.use(stepDurationFormatter)

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
}).$mount('#app')
