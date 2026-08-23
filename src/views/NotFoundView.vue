<template>
  <section class="not-found">
    <p class="not-found__code">404</p>
    <h1>페이지를 찾을 수 없습니다.</h1>
    <p>주소가 올바른지 확인하거나 메인 대시보드로 이동해 주세요.</p>
    <RouterLink to="/">메인 대시보드로 이동</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  position: relative;
  overflow: hidden;
  padding: clamp(2rem, 8vw, 5rem);
  border: 1px solid rgb(148 196 255 / 17%);
  border-radius: 1.6rem;
  background:
    radial-gradient(circle at 50% 15%, rgb(139 92 246 / 27%), transparent 36%),
    linear-gradient(145deg, rgb(15 38 75 / 84%), rgb(22 18 62 / 78%));
  text-align: center;
  box-shadow:
    0 28px 70px rgb(0 8 28 / 40%),
    inset 0 1px rgb(255 255 255 / 8%);
  backdrop-filter: blur(24px);
}

.not-found__code {
  color: transparent;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 950;
  letter-spacing: -0.08em;
  line-height: 1;
  background: linear-gradient(135deg, #67e8f9, #60a5fa, #c084fc, #f472b6);
  background-clip: text;
  filter: drop-shadow(0 0 26px rgb(96 165 250 / 25%));
  animation: error-float 4s ease-in-out infinite;
}

h1 {
  margin-top: 0.7rem;
  color: #f4f8ff;
  font-size: 1.6rem;
  font-weight: 850;
}

h1 + p {
  margin: 0.7rem 0 1.5rem;
  color: #9bb0cc;
}

a {
  display: inline-block;
  padding: 0.7rem 1.1rem;
  border: 1px solid rgb(147 197 253 / 30%);
  border-radius: 0.8rem;
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  box-shadow: 0 12px 30px rgb(37 99 235 / 25%);
  font-weight: 750;
}

@keyframes error-float {
  50% {
    transform: translateY(-8px);
  }
}

.not-found {
  border-color: var(--ink-200);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 18px 42px rgb(13 28 80 / 8%);
  backdrop-filter: none;
}

.not-found__code {
  color: var(--brand-500);
  background: none;
  filter: none;
  animation: none;
}

h1 {
  color: var(--ink-900);
  font-weight: 700;
}

h1 + p {
  color: var(--ink-500);
}

a {
  border-color: var(--brand-500);
  border-radius: 999px;
  background: var(--brand-500);
  box-shadow: none;
}
</style>
