import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import A1 from '@/components/A/1/A1.vue'
import B1 from '@/components/B/1/B1.vue'
import C1 from '@/components/C/1/C1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/A/1',
      name: 'A1',
      component: A1
    },
    {
      path: '/B/1',
      name: 'B1',
      component: B1
    },
    {
      path: '/C/1',
      name: 'C1',
      component: C1
    }
  ]
})
