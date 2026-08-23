<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">
        <span class="brand__mark" aria-hidden="true">W</span>
        <span>
          <strong>SKALA Weather</strong>
          <small>MODERN EDITION</small>
        </span>
      </RouterLink>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/">한국 날씨</RouterLink>
        <RouterLink to="/china">중국 여행가이드</RouterLink>
      </nav>
      <span class="live-badge"><i></i> OpenWeather Live</span>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <strong>SKALA Weather Modern</strong>
      <span>Vue 3 · TypeScript · TanStack Query</span>
    </footer>
  </div>
</template>
