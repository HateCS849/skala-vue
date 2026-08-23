<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>Pinia Counter Store</h2>
    <p>State 데이터: {{ counterStore.count }}</p>
    <p>Getter 데이터: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">숫자 1 증가</button>
  </div>
</template>
