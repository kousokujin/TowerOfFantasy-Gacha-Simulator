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
      component: () => import('./components/GachaView.vue')
    },
    {
      path: '/goldcore',
      name: "Goldcore",
      component: () => import('./components/GachaView.vue')
    },
    {
      path: '/redcore/:id',
      name: "Redcore",
      component: () => import('./components/GachaView.vue')
    }
  ]
})

export default router