import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'korea-weather',
      component: () => import('@/views/KoreaWeatherView.vue'),
    },
    {
      path: '/china',
      name: 'china-weather',
      component: () => import('@/views/ChinaWeatherView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
