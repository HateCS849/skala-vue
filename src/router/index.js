import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: () => import('../views/WeatherHomeView.vue'),
  },
  {
    path: '/china',
    name: 'ChinaWeather',
    component: () => import('../views/ChinaWeatherView.vue'),
  },
  {
    path: '/practice',
    name: 'PracticeGallery',
    component: () => import('../views/PracticeGalleryView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
