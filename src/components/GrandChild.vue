<script setup>
import { inject } from 'vue'

const theme = inject('globalTheme')
</script>

<template>
  <div class="child-container">
    <h3>최하위 컴포넌트</h3>
    <p>Inject로 받은 테마: {{ theme }}</p>
  </div>
</template>
