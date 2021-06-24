import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import Stepper from '../views/Stepper.vue'
import PrimingSugar from '../views/PrimingSugar.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: '/', redirect: { name: 'home' }},

    {
      path: '/login',
      name: 'login',
      component: Login,
    },

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
    },

    {
      path: '/stepper/:id',
      name: 'stepper',
      component: Stepper,
      props: true
    },

    {
      path: '/priming',
      name: 'priming',
      component: PrimingSugar,
    }

  ],
})
