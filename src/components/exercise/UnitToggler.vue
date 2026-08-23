<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>온도 단위 {{ configStore.unitSymbol }}</span>
    <el-button size="small" plain type="primary" @click="configStore.toggleUnit"> 단위 변경 </el-button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  padding: 0.35rem 0.4rem 0.35rem 0.7rem;
  border: 1px solid rgb(148 196 255 / 10%);
  border-radius: 0.8rem;
  color: #a9bdd7;
  background: rgb(255 255 255 / 4%);
  font-size: 0.82rem;
  font-weight: 700;
}

.unit-toggler {
  border-color: rgb(255 255 255 / 16%);
  border-radius: 999px;
  color: rgb(255 255 255 / 72%);
  background: rgb(255 255 255 / 8%);
}

.unit-toggler :deep(.el-button) {
  --el-button-text-color: #ffffff;
  --el-button-border-color: rgb(255 255 255 / 22%);
  --el-button-bg-color: transparent;
  --el-button-hover-text-color: var(--brand-950);
  --el-button-hover-bg-color: #ffffff;
  --el-button-hover-border-color: #ffffff;
}
</style>
