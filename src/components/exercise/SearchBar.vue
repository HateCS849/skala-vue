<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  cityList: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const handleSearchInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label for="city-search">지역 이름</label>
    <div class="search-bar__field">
      <span>🔎</span>
      <input
        id="city-search"
        type="search"
        list="weather-city-options"
        :value="searchQuery"
        placeholder="검색할 지역 이름 입력"
        autocomplete="off"
        @input="handleSearchInput"
      />
      <datalist id="weather-city-options">
        <option v-for="city in cityList" :key="city.id" :value="city.name"></option>
      </datalist>
    </div>
    <p class="search-bar__status">
      검색 중인 지역: <strong>{{ searchQuery || '전체' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar {
  display: grid;
  gap: 0.75rem;
}

label {
  color: #d8e8fa;
  font-size: 0.9rem;
  font-weight: 750;
}

.search-bar__field {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  padding: 0 1rem;
  border: 1px solid rgb(125 211 252 / 20%);
  border-radius: 1rem;
  background: linear-gradient(120deg, rgb(5 18 44 / 70%), rgb(30 41 91 / 45%));
  box-shadow:
    inset 0 1px rgb(255 255 255 / 6%),
    0 10px 30px rgb(0 8 30 / 24%);
  transition:
    border-color 200ms ease,
    box-shadow 200ms ease,
    transform 200ms ease;
}

.search-bar__field:focus-within {
  border-color: #38bdf8;
  box-shadow:
    0 0 0 4px rgb(56 189 248 / 10%),
    0 0 35px rgb(37 99 235 / 18%);
  transform: translateY(-2px);
}

input {
  width: 100%;
  padding: 0.95rem 0;
  border: 0;
  outline: 0;
  color: #f3f8ff;
  background: transparent;
  font: inherit;
}

input::placeholder {
  color: #7186a4;
}

.search-bar__status {
  color: #8297b4;
  font-size: 0.9rem;
}

.search-bar__status strong {
  color: #67e8f9;
  font-weight: 800;
  text-shadow: 0 0 18px rgb(34 211 238 / 28%);
}

label {
  color: var(--ink-700);
  font-weight: 700;
}

.search-bar__field {
  border-color: var(--ink-300);
  border-radius: 14px;
  background: var(--ink-50);
  box-shadow: none;
}

.search-bar__field:focus-within {
  border-color: var(--brand-500);
  box-shadow: 0 0 0 4px var(--brand-50);
  transform: none;
}

input {
  color: var(--ink-900);
}

input::placeholder {
  color: var(--ink-400);
}

.search-bar__status {
  color: var(--ink-500);
}

.search-bar__status strong {
  color: var(--brand-600);
  text-shadow: none;
}
</style>
