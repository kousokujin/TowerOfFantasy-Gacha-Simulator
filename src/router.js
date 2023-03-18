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
      props: true,
      meta: {
        type: "blackcore"
      },
      component: () => import('./components/GachaView.vue')
    },
    {
      path: '/goldcore',
      name: "Goldcore",
      props: true,
      meta: {
        type: "goldcore"
      },
      component: () => import('./components/GachaView.vue')
    }
  ]
})

export default router