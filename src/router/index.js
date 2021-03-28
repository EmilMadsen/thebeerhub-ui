import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import BrewDetails from '../components/BrewDetails.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: '/', redirect: { name: 'home' }},

    {
      path: '/home',
      name: 'home',
      component: Home,
    },

    {
      path: '/create',
      name: 'details',
      component: BrewDetails,
    },

    {
      path: '/details/:id',
      name: 'details',
      component: BrewDetails,
      props: true
    }

  ],
})
