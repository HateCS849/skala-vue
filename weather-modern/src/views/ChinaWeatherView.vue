<script setup lang="ts">
import WeatherDashboard from '@/components/WeatherDashboard.vue'
import { chinaCities } from '@/data/cities'
</script>

<template>
  <WeatherDashboard
    country="CN"
    title="중국 여행도시 날씨 가이드"
    eyebrow="CHINA TRAVEL GUIDE"
    description="여행도시 50곳의 날씨와 중국 음식, 옷차림, 만남 지수를 함께 확인해 보세요."
    :cities="chinaCities"
    :initial-count="8"
    :load-count="8"
  />
</template>
