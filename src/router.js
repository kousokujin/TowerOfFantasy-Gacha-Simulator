import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () =>import('./components/Home/home.vue')
    },
    {
      path: '/gacha10/:type/:id',
      name: 'Redcore',
      component: () => import('./components/Gacha10/GachaView.vue')
    },
    {
      path: '/gacha10/:type/',
      name: 'Blackcore',
      component: () => import('./components/Gacha10/GachaView.vue')
    }
  ]
})

export default router