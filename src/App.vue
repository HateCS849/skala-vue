<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="site-header__brand" to="/">
        <span>🌤️</span>
        Vue 최종실습
      </RouterLink>

      <nav>
        <RouterLink to="/">날씨</RouterLink>
        <RouterLink to="/china">중국 여행가이드</RouterLink>
        <RouterLink to="/practice">예제 실습</RouterLink>
      </nav>

      <UnitToggler />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>Vue Composition API Weather Dashboard</footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.site-header {
  position: sticky;
  z-index: 100;
  top: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  max-width: 1380px;
  margin: 1rem auto 0;
  padding: 0.85rem 1rem 0.85rem 1.25rem;
  border: 1px solid rgb(148 196 255 / 18%);
  border-radius: 1.25rem;
  background: linear-gradient(135deg, rgb(7 24 52 / 88%), rgb(24 18 62 / 78%));
  box-shadow:
    0 18px 50px rgb(0 5 20 / 34%),
    inset 0 1px rgb(255 255 255 / 8%);
  backdrop-filter: blur(24px) saturate(150%);
}

.site-header__brand {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #ffffff;
  font-size: 1.08rem;
  font-weight: 850;
  letter-spacing: -0.02em;
  text-shadow: 0 0 24px rgb(56 189 248 / 45%);
}

.site-header__brand span {
  display: grid;
  width: 2.3rem;
  height: 2.3rem;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 0.8rem;
  place-items: center;
  background: linear-gradient(135deg, rgb(56 189 248 / 28%), rgb(139 92 246 / 25%));
  box-shadow: 0 0 24px rgb(56 189 248 / 22%);
  animation: brand-float 3.5s ease-in-out infinite;
}

nav {
  display: flex;
  gap: 0.4rem;
  padding: 0.3rem;
  border: 1px solid rgb(148 196 255 / 10%);
  border-radius: 0.9rem;
  background: rgb(255 255 255 / 4%);
}

nav a {
  position: relative;
  padding: 0.55rem 0.85rem;
  border-radius: 0.65rem;
  color: #a9bad2;
  font-size: 0.9rem;
  font-weight: 700;
  transition: 180ms ease;
}

nav a:hover,
nav a.router-link-active {
  color: #ffffff;
  background: linear-gradient(135deg, rgb(37 99 235 / 80%), rgb(124 58 237 / 72%));
  box-shadow:
    0 8px 22px rgb(37 99 235 / 25%),
    inset 0 1px rgb(255 255 255 / 20%);
  transform: translateY(-1px);
}

main {
  max-width: 1380px;
  min-height: calc(100vh - 150px);
  margin: 0 auto;
  padding: 1.7rem 1.25rem 4rem;
}

footer {
  padding: 1.5rem 1.5rem 2.2rem;
  color: #7187a7;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

@keyframes brand-float {
  50% {
    box-shadow: 0 0 32px rgb(56 189 248 / 38%);
    transform: translateY(-3px) rotate(4deg);
  }
}

@media (max-width: 760px) {
  .site-header {
    position: relative;
    top: 0;
    align-items: flex-start;
    flex-direction: column;
    margin: 0.75rem;
  }

  nav {
    width: 100%;
    overflow-x: auto;
  }

  nav a {
    flex: 0 0 auto;
  }

  main {
    padding: 1rem 0.75rem 3rem;
  }
}

.site-header {
  top: 0;
  max-width: none;
  min-height: 76px;
  margin: 0;
  padding: 0.85rem max(1.25rem, calc((100vw - 1380px) / 2));
  border: 0;
  border-radius: 0;
  background: var(--brand-950);
  box-shadow: 0 1px 0 rgb(255 255 255 / 10%);
  backdrop-filter: none;
}

.site-header__brand {
  font-size: 1.15rem;
  font-weight: 800;
  text-shadow: none;
}

.site-header__brand span {
  border-color: rgb(255 255 255 / 20%);
  border-radius: 10px;
  background: rgb(255 255 255 / 10%);
  box-shadow: none;
  animation: none;
}

nav {
  border: 0;
  border-radius: 0;
  background: transparent;
}

nav a {
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  color: rgb(255 255 255 / 68%);
  font-weight: 600;
}

nav a:hover,
nav a.router-link-active {
  color: #ffffff;
  background: rgb(255 255 255 / 12%);
  box-shadow: none;
  transform: none;
}

main {
  max-width: 1440px;
  padding: 2rem 2rem 5rem;
}

footer {
  padding: 2.5rem 1.5rem;
  color: rgb(255 255 255 / 45%);
  background: var(--brand-950);
}

@media (max-width: 760px) {
  .site-header {
    position: relative;
    align-items: stretch;
    margin: 0;
    padding: 1rem;
  }

  main {
    padding: 1rem 0.75rem 3rem;
  }
}
</style>
