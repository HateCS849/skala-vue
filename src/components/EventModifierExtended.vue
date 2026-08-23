<script setup>
import { ref } from 'vue'

const message = ref('이벤트를 실행해 보세요.')

const handleOnce = () => {
  message.value = '.once 이벤트는 한 번만 실행됩니다.'
}

const handleSelf = () => {
  message.value = '.self가 적용된 부모 영역을 직접 클릭했습니다.'
}

const handleEnter = () => {
  message.value = 'Enter 키를 눌렀습니다.'
}

const handleEscape = () => {
  message.value = 'Escape 키를 눌렀습니다.'
}
</script>

<template>
  <div class="practice-section">
    <h2>추가 이벤트 수식어 학습</h2>
    <p>{{ message }}</p>
    <button @click.once="handleOnce">한 번만 실행</button>
    <div @click.self="handleSelf" style="padding: 20px; background-color: #eeeeee">
      부모 영역
      <button>자식 버튼</button>
    </div>
    <input type="text" placeholder="Enter 또는 Escape 입력" @keyup.enter="handleEnter" @keyup.esc="handleEscape" />
  </div>
</template>
