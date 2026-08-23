<script setup>
import { useRouter } from 'vue-router'
import WeatherParent from '../components/WeatherParent.vue'

const router = useRouter()

const handleClickDetail = (cityId) => {
  router.push('/weather/' + cityId)
}
</script>

<template>
  <WeatherParent @click-detail="handleClickDetail" />
</template>
