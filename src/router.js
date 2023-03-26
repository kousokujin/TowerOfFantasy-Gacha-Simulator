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
      path: '/gacha10/:type/:id',
      name: 'Redcore',
      component: () => import('./components/GachaView.vue')
    },
    {
      path: '/gacha10/:type/',
      name: 'Blackcore',
      component: () => import('./components/GachaView.vue')
    }
  ]
})

export default router