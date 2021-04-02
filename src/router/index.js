import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      name: 'create',
      component: Create,
    },

    {
      path: '/details/:id',
      name: 'details',
      component: Details,
      props: true
    }

  ],
})
