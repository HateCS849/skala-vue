<script setup>
import { reactive, ref, watch } from 'vue'

const state = reactive({
  productName: '노트북',
  price: 1000,
})
const logAutoDeep = ref('대기 중...')
const logTarget = ref('대기 중...')

watch(state, (newValue, oldValue) => {
  logAutoDeep.value = `[자동 deep] 이전가격: ${oldValue.price}원 / 현재가격: ${newValue.price}원`
})

watch(
  () => state.price,
  (newPrice, oldPrice) => {
    logTarget.value = `[타겟 감지] ${oldPrice}원에서 ${newPrice}원으로 변경됨!`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>reactive() 데이터 Watch</h2>
    <p>상품명: {{ state.productName }} / 가격: {{ state.price }}원</p>
    <button @click="state.price += 500">가격 500원 인상</button>
    <div class="monitor">
      <p>전체 감시: {{ logAutoDeep }}</p>
      <p>가격 감시: {{ logTarget }}</p>
    </div>
  </div>
</template>
