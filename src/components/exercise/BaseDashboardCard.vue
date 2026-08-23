<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h2 class="dashboard-card__title">
      <span v-if="icon">{{ icon }}</span>
      {{ title }}
    </h2>
    <div class="dashboard-card__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.dashboard-card {
  position: relative;
  overflow: hidden;
  padding: clamp(1.25rem, 3vw, 1.8rem);
  border: 1px solid rgb(148 196 255 / 16%);
  border-radius: 1.35rem;
  background: linear-gradient(145deg, rgb(15 38 75 / 78%), rgb(12 26 58 / 67%));
  box-shadow:
    0 22px 55px rgb(0 8 28 / 34%),
    inset 0 1px rgb(255 255 255 / 7%);
  backdrop-filter: blur(22px) saturate(130%);
}

.dashboard-card::before {
  position: absolute;
  top: 0;
  left: 8%;
  width: 42%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  content: '';
  opacity: 0.9;
}

.dashboard-card__title {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  margin-bottom: 1.2rem;
  color: #f2f8ff;
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.dashboard-card__title span {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  border: 1px solid rgb(125 211 252 / 18%);
  border-radius: 0.72rem;
  place-items: center;
  background: linear-gradient(135deg, rgb(14 165 233 / 20%), rgb(139 92 246 / 16%));
  box-shadow: 0 0 20px rgb(56 189 248 / 12%);
}

.dashboard-card__content {
  color: #adbed5;
}

.dashboard-card {
  border-color: var(--ink-200);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 14px 34px rgb(13 28 80 / 6%);
  backdrop-filter: none;
}

.dashboard-card::before {
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, var(--brand-500), var(--brand-200), transparent 70%);
  opacity: 1;
}

.dashboard-card__title {
  color: var(--ink-900);
  font-weight: 700;
}

.dashboard-card__title span {
  border-color: var(--brand-100);
  border-radius: 10px;
  background: var(--brand-50);
  box-shadow: none;
}

.dashboard-card__content {
  color: var(--ink-600);
}
</style>
