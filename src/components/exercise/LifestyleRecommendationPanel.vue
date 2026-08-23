<script setup>
import ClothingRecommendation from './ClothingRecommendation.vue'
import DinnerMenuRecommendation from './DinnerMenuRecommendation.vue'
import HuntingSuccessCard from './HuntingSuccessCard.vue'

defineProps({
  city: {
    type: Object,
    required: true,
  },
  menuType: {
    type: String,
    default: 'korean',
  },
})
</script>

<template>
  <div class="lifestyle-panel">
    <DinnerMenuRecommendation :city="city" :menu-type="menuType" />
    <ClothingRecommendation :city="city" />
    <HuntingSuccessCard :city="city" />
  </div>
</template>

<style scoped>
.lifestyle-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.15rem;
  perspective: 1200px;
}

@media (max-width: 900px) {
  .lifestyle-panel {
    grid-template-columns: 1fr;
  }
}
</style>
