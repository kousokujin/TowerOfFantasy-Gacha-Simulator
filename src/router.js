import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () =>import('./components/home.vue')
    },
    {
      path: '/blackcore',
      name: 'Blackcore',
      component: () => import('./components/blackcore.vue')
    }
  ]
})

export default router