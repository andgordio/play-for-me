import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import A1 from '@/components/A/1/A1.vue'
// import A2 from '@/components/A/2/A2.vue'
// import B1 from '@/components/B/1/B1.vue'
// import B2 from '@/components/B/2/B2.vue'

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
    }
    // {
    // path: '/A/2',
    // name: 'A2',
    // component: A2
    // },
    // {
    // path: '/B/1',
    // name: 'B1',
    // component: B1
    // },
    // {
    // path: '/B/2',
    // name: 'B2',
    // component: B2
    // }
  ]
})
