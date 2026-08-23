<script setup lang="ts">
import WeatherDashboard from '@/components/WeatherDashboard.vue'
import { koreaCities } from '@/data/cities'
</script>

<template>
  <WeatherDashboard
    country="KR"
    title="대한민국 날씨를 한눈에"
    eyebrow="KOREA LIVE WEATHER"
    description="주요 도시 100곳의 실시간 날씨와 오늘의 생활 추천을 확인해 보세요."
    :cities="koreaCities"
    :initial-count="10"
    :load-count="10"
  />
</template>
