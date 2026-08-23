<script setup>
import { provide, ref } from 'vue'
import ParentComponent from './ParentComponent.vue'

const themeColor = ref('dark-mode')

provide('globalTheme', themeColor)
</script>

<template>
  <div class="practice-section">
    <h2>Provide & Inject</h2>
    <p>최상위 테마: {{ themeColor }}</p>
    <button @click="themeColor = themeColor === 'dark-mode' ? 'light-mode' : 'dark-mode'">테마 변경</button>
    <ParentComponent />
  </div>
</template>
