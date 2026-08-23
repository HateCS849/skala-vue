<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'

const createPractice = (id, title, file, category, description, loader) => {
  return {
    id,
    title,
    file,
    category,
    description,
    component: defineAsyncComponent(loader),
  }
}

const practiceList = [
  createPractice(
    'sample-one',
    '반응형 변수 비교',
    'SampleOne.vue',
    'Vue 기초',
    '일반 변수와 ref 변수의 화면 갱신 차이를 확인합니다.',
    () => import('../components/SampleOne.vue'),
  ),
  createPractice(
    'sample-two',
    'Template 보간법',
    'SampleTwo.vue',
    'Vue 기초',
    '문자열과 JavaScript 표현식을 Template에 출력합니다.',
    () => import('../components/SampleTwo.vue'),
  ),
  createPractice(
    'ref',
    'ref 반응형 상태',
    'Ref.vue',
    'Vue 기초',
    '숫자, 문자열, 배열과 객체를 ref로 관리합니다.',
    () => import('../components/Ref.vue'),
  ),
  createPractice(
    'reactive',
    'reactive 반응형 상태',
    'Reactive.vue',
    'Vue 기초',
    '객체와 배열을 reactive로 관리합니다.',
    () => import('../components/Reactive.vue'),
  ),
  createPractice(
    'v-text',
    'v-text',
    'Vtext.vue',
    '디렉티브',
    '보간법, v-text와 v-html 출력 결과를 비교합니다.',
    () => import('../components/Vtext.vue'),
  ),
  createPractice(
    'v-html',
    'v-html',
    'Vhtml.vue',
    '디렉티브',
    'HTML 문자열을 실제 마크업으로 출력합니다.',
    () => import('../components/Vhtml.vue'),
  ),
  createPractice(
    'v-bind',
    'v-bind 기본',
    'Vbind.vue',
    '디렉티브',
    '링크, 이미지와 disabled 속성을 동적으로 바인딩합니다.',
    () => import('../components/Vbind.vue'),
  ),
  createPractice(
    'class-binding',
    'Class Binding',
    'ClassBindingExample.vue',
    '디렉티브',
    '객체와 배열 형식으로 CSS 클래스를 바인딩합니다.',
    () => import('../components/ClassBindingExample.vue'),
  ),
  createPractice(
    'style-binding',
    'Style Binding',
    'StyleBindingExample.vue',
    '디렉티브',
    '객체와 배열 형식으로 인라인 스타일을 바인딩합니다.',
    () => import('../components/StyleBindingExample.vue'),
  ),
  createPractice(
    'v-if',
    'v-if 조건부 렌더링',
    'Vif.vue',
    '디렉티브',
    'v-if, v-else-if와 v-else로 조건을 분기합니다.',
    () => import('../components/Vif.vue'),
  ),
  createPractice(
    'v-show',
    'v-show 표시 전환',
    'Vshow.vue',
    '디렉티브',
    '요소를 유지한 상태에서 표시 여부를 전환합니다.',
    () => import('../components/Vshow.vue'),
  ),
  createPractice(
    'v-for',
    'v-for 반복 렌더링',
    'Vfor.vue',
    '디렉티브',
    '배열, 객체와 객체 배열을 반복 출력합니다.',
    () => import('../components/Vfor.vue'),
  ),
  createPractice(
    'v-pre',
    'v-pre',
    'Vpre.vue',
    '디렉티브',
    'Template 문법을 해석하지 않고 그대로 표시합니다.',
    () => import('../components/Vpre.vue'),
  ),
  createPractice(
    'v-cloak',
    'v-cloak',
    'Vcloak.vue',
    '디렉티브',
    'Vue가 연결되기 전의 Template 노출을 방지합니다.',
    () => import('../components/Vcloak.vue'),
  ),
  createPractice(
    'v-once',
    'v-once',
    'Vonce.vue',
    '디렉티브',
    '최초 한 번 렌더링한 값을 고정합니다.',
    () => import('../components/Vonce.vue'),
  ),
  createPractice(
    'v-memo',
    'v-memo',
    'Vmemo.vue',
    '디렉티브',
    '지정한 반응형 값이 변경될 때만 영역을 갱신합니다.',
    () => import('../components/Vmemo.vue'),
  ),
  createPractice(
    'v-on',
    'v-on 이벤트',
    'Von.vue',
    '이벤트와 폼',
    '인라인 연산과 함수 호출로 클릭 이벤트를 처리합니다.',
    () => import('../components/Von.vue'),
  ),
  createPractice(
    'event-object',
    'Event 객체',
    'EventObject.vue',
    '이벤트와 폼',
    '이벤트 좌표와 클릭 대상 태그를 확인합니다.',
    () => import('../components/EventObject.vue'),
  ),
  createPractice(
    'event-modifier',
    '이벤트 수식어 기본',
    'EventModifier.vue',
    '이벤트와 폼',
    '.prevent와 .stop 수식어를 확인합니다.',
    () => import('../components/EventModifier.vue'),
  ),
  createPractice(
    'event-modifier-extended',
    '이벤트 수식어 확장',
    'EventModifierExtended.vue',
    '이벤트와 폼',
    '.once, .self와 키보드 수식어를 확인합니다.',
    () => import('../components/EventModifierExtended.vue'),
  ),
  createPractice(
    'form-binding',
    'v-model 기본',
    'FormDataBinding.vue',
    '이벤트와 폼',
    'v-model과 :value 및 @input 조합을 비교합니다.',
    () => import('../components/FormDataBinding.vue'),
  ),
  createPractice(
    'form-elements',
    'Form 요소 바인딩',
    'FormElementsHandling.vue',
    '이벤트와 폼',
    'Textarea, Checkbox, Radio와 Select를 연결합니다.',
    () => import('../components/FormElementsHandling.vue'),
  ),
  createPractice(
    'form-modifier',
    'v-model 수식어',
    'FormModelModifier.vue',
    '이벤트와 폼',
    '.lazy, .number와 .trim 수식어를 확인합니다.',
    () => import('../components/FormModelModifier.vue'),
  ),
  createPractice(
    'computed',
    'computed 캐싱',
    'ComputedExample.vue',
    'Composition API',
    '일반 함수와 Computed의 재계산 차이를 비교합니다.',
    () => import('../components/ComputedExample.vue'),
  ),
  createPractice(
    'watch',
    'watch 기본',
    'WatchEx.vue',
    'Composition API',
    '선택한 도시의 이전 값과 새로운 값을 감시합니다.',
    () => import('../components/WatchEx.vue'),
  ),
  createPractice(
    'watch-multi',
    '여러 변수 Watch',
    'WatchMultiSource.vue',
    'Composition API',
    '도시와 날짜 변수를 동시에 감시합니다.',
    () => import('../components/WatchMultiSource.vue'),
  ),
  createPractice(
    'watch-deep',
    'Deep Watch',
    'WatchDeep.vue',
    'Composition API',
    'ref 객체 전체와 특정 속성을 감시합니다.',
    () => import('../components/WatchDeep.vue'),
  ),
  createPractice(
    'watch-reactive',
    'reactive Watch',
    'WatchReactive.vue',
    'Composition API',
    'reactive 객체 전체와 특정 속성을 감시합니다.',
    () => import('../components/WatchReactive.vue'),
  ),
  createPractice(
    'watch-effect',
    'watchEffect',
    'WatchEffectExample.vue',
    'Composition API',
    '사용한 반응형 변수를 자동으로 추적합니다.',
    () => import('../components/WatchEffectExample.vue'),
  ),
  createPractice(
    'lifecycle',
    'Lifecycle Hook',
    'LifecycleHook.vue',
    'Composition API',
    'Mounted, Updated와 Unmounted 실행 시점을 확인합니다.',
    () => import('../components/LifecycleHook.vue'),
  ),
  createPractice(
    'props-emits',
    'Props & Emits',
    'PropsEmitsParent.vue',
    '컴포넌트',
    '부모와 자식이 Props와 Emits로 통신합니다.',
    () => import('../components/PropsEmitsParent.vue'),
  ),
  createPractice(
    'slot-default',
    'Default Slot',
    'SlotDefaultParent.vue',
    '컴포넌트',
    '부모가 자식의 기본 Slot에 마크업을 주입합니다.',
    () => import('../components/SlotDefaultParent.vue'),
  ),
  createPractice(
    'slot-named',
    'Named Slot',
    'SlotNamedParent.vue',
    '컴포넌트',
    '이름이 지정된 Header Slot을 사용합니다.',
    () => import('../components/SlotNamedParent.vue'),
  ),
  createPractice(
    'slot-scoped',
    'Scoped Slot',
    'SlotScopedParent.vue',
    '컴포넌트',
    '자식의 데이터를 부모 Slot에서 사용합니다.',
    () => import('../components/SlotScopedParent.vue'),
  ),
  createPractice(
    'provide-inject',
    'Provide & Inject',
    'GrandParent.vue',
    '컴포넌트',
    '중간 컴포넌트를 건너뛰어 반응형 데이터를 전달합니다.',
    () => import('../components/GrandParent.vue'),
  ),
  createPractice(
    'pinia',
    'Pinia Counter',
    'StoreCounter.vue',
    '라이브러리',
    'Store의 State, Getter와 Action을 사용합니다.',
    () => import('../components/StoreCounter.vue'),
  ),
  createPractice(
    'axios-weather',
    'Axios 날씨 API',
    'AxiosWeatherExample.vue',
    '라이브러리',
    'Axios와 async/await로 실시간 날씨를 가져옵니다.',
    () => import('../components/AxiosWeatherExample.vue'),
  ),
  createPractice(
    'axios-json',
    'Axios REST CRUD',
    'AxiosJson.vue',
    '라이브러리',
    'GET, POST, PATCH와 DELETE 요청을 실습합니다.',
    () => import('../components/AxiosJson.vue'),
  ),
  createPractice(
    'weather-mockup',
    '날씨 Mockup 기본',
    'WeatherMockup.vue',
    '날씨 과제',
    '배열 렌더링과 조건부 출력으로 날씨 카드를 만듭니다.',
    () => import('../components/WeatherMockup.vue'),
  ),
  createPractice(
    'weather-composition',
    'Weather Composition',
    'WeatherMockup2.vue',
    '날씨 과제',
    'ref, computed와 watcher를 날씨 검색에 적용합니다.',
    () => import('../components/WeatherMockup2.vue'),
  ),
]

const categoryList = [
  '전체',
  'Vue 기초',
  '디렉티브',
  '이벤트와 폼',
  'Composition API',
  '컴포넌트',
  '라이브러리',
  '날씨 과제',
]
const searchQuery = ref('')
const selectedCategory = ref('전체')
const selectedPracticeId = ref('v-bind')

const filteredPracticeList = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toUpperCase()

  return practiceList.filter((practice) => {
    const isSameCategory = selectedCategory.value === '전체' || practice.category === selectedCategory.value
    const isSameQuery =
      !normalizedQuery ||
      practice.title.toUpperCase().includes(normalizedQuery) ||
      practice.file.toUpperCase().includes(normalizedQuery) ||
      practice.description.toUpperCase().includes(normalizedQuery)
    return isSameCategory && isSameQuery
  })
})

const selectedPractice = computed(() => {
  return practiceList.find((practice) => practice.id === selectedPracticeId.value) || practiceList[0]
})

const handleSelectPractice = (practiceId) => {
  selectedPracticeId.value = practiceId
}
</script>

<template>
  <section class="practice-gallery">
    <header class="practice-gallery__header">
      <div>
        <h1>예제실습 모아보기</h1>
      </div>
      <strong>{{ practiceList.length }} EXAMPLES</strong>
    </header>

    <div class="practice-gallery__toolbar">
      <label>
        예제 검색
        <input v-model.trim="searchQuery" type="search" placeholder="제목 또는 파일명 검색" />
      </label>
      <label>
        학습 분류
        <select v-model="selectedCategory">
          <option v-for="category in categoryList" :key="category" :value="category">{{ category }}</option>
        </select>
      </label>
    </div>

    <div class="practice-gallery__workspace">
      <aside class="practice-gallery__list">
        <p class="practice-gallery__result">검색 결과 {{ filteredPracticeList.length }}개</p>
        <button
          v-for="practice in filteredPracticeList"
          :key="practice.id"
          type="button"
          :class="{ 'practice-gallery__item--active': practice.id === selectedPractice.id }"
          class="practice-gallery__item"
          @click="handleSelectPractice(practice.id)"
        >
          <span>{{ practice.category }}</span>
          <strong>{{ practice.title }}</strong>
          <small>{{ practice.file }}</small>
        </button>
        <p v-if="!filteredPracticeList.length" class="practice-gallery__empty">일치하는 예제가 없습니다.</p>
      </aside>

      <article class="practice-preview">
        <header class="practice-preview__bar">
          <div class="practice-preview__lights"><span></span><span></span><span></span></div>
          <div>
            <strong>{{ selectedPractice.title }}</strong>
            <small>src/components/{{ selectedPractice.file }}</small>
          </div>
          <span class="practice-preview__badge">{{ selectedPractice.category }}</span>
        </header>
        <div class="practice-preview__description">{{ selectedPractice.description }}</div>
        <div class="practice-preview__viewport">
          <Suspense>
            <component :is="selectedPractice.component" :key="selectedPractice.id" />
            <template #fallback>
              <div class="practice-preview__loading">예제를 불러오는 중입니다...</div>
            </template>
          </Suspense>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.practice-gallery {
  display: grid;
  gap: 1.25rem;
}

.practice-gallery__header {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  padding: clamp(1.8rem, 5vw, 3.5rem);
  border: 1px solid rgb(167 139 250 / 24%);
  border-radius: 1.6rem;
  color: #ffffff;
  background:
    radial-gradient(circle at 88% 15%, rgb(34 211 238 / 24%), transparent 25%),
    linear-gradient(135deg, rgb(37 99 235 / 88%), rgb(109 40 217 / 84%) 56%, rgb(14 116 144 / 88%));
  box-shadow:
    0 26px 65px rgb(3 9 32 / 40%),
    inset 0 1px rgb(255 255 255 / 18%);
}

.practice-gallery__header h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.05em;
}

.practice-gallery__header p:last-child {
  color: rgb(255 255 255 / 78%);
}

.practice-gallery__header > strong {
  flex: 0 0 auto;
  padding: 0.7rem 1rem;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 999px;
  background: rgb(4 12 38 / 18%);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
}

.practice-gallery__toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 0.35fr);
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgb(148 196 255 / 16%);
  border-radius: 1.2rem;
  background: rgb(10 28 59 / 70%);
  backdrop-filter: blur(20px);
}

.practice-gallery__toolbar label {
  display: grid;
  gap: 0.45rem;
  color: #afc4de;
  font-size: 0.82rem;
  font-weight: 750;
}

.practice-gallery__toolbar input,
.practice-gallery__toolbar select {
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid rgb(125 211 252 / 20%);
  border-radius: 0.75rem;
  outline: none;
  color: #edf8ff;
  background: #0c2348;
  font: inherit;
}

.practice-gallery__toolbar input:focus,
.practice-gallery__toolbar select:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 4px rgb(56 189 248 / 10%);
}

.practice-gallery__workspace {
  display: grid;
  grid-template-columns: minmax(240px, 0.32fr) minmax(0, 1fr);
  gap: 1rem;
  min-height: 650px;
}

.practice-gallery__list {
  max-height: 760px;
  overflow-y: auto;
  padding: 0.8rem;
  border: 1px solid rgb(148 196 255 / 16%);
  border-radius: 1.2rem;
  background: rgb(8 24 52 / 72%);
}

.practice-gallery__result {
  padding: 0.35rem 0.5rem 0.75rem;
  color: #7890af;
  font-size: 0.78rem;
}

.practice-gallery__item {
  display: grid;
  gap: 0.25rem;
  width: 100%;
  margin-bottom: 0.45rem;
  padding: 0.85rem;
  border: 1px solid transparent;
  border-radius: 0.85rem;
  color: #dcecff;
  background: rgb(255 255 255 / 3%);
  cursor: pointer;
  text-align: left;
  transition: 180ms ease;
}

.practice-gallery__item:hover,
.practice-gallery__item--active {
  border-color: rgb(103 232 249 / 35%);
  background: linear-gradient(120deg, rgb(37 99 235 / 28%), rgb(124 58 237 / 18%));
  box-shadow: 0 10px 25px rgb(0 8 28 / 24%);
  transform: translateX(3px);
}

.practice-gallery__item > span {
  color: #67e8f9;
  font-size: 0.68rem;
  font-weight: 800;
}

.practice-gallery__item > strong {
  font-size: 0.9rem;
}

.practice-gallery__item > small {
  color: #7187a6;
  font-size: 0.72rem;
}

.practice-gallery__empty {
  padding: 2rem 1rem;
  color: #7890af;
  text-align: center;
}

.practice-preview {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(148 196 255 / 18%);
  border-radius: 1.2rem;
  background: rgb(4 14 35 / 82%);
  box-shadow: 0 24px 60px rgb(0 5 20 / 35%);
}

.practice-preview__bar {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  min-height: 70px;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgb(148 196 255 / 14%);
  background: linear-gradient(120deg, rgb(15 39 76 / 96%), rgb(31 24 72 / 92%));
}

.practice-preview__lights {
  display: flex;
  gap: 0.38rem;
}

.practice-preview__lights span {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: #fb7185;
}

.practice-preview__lights span:nth-child(2) {
  background: #fbbf24;
}

.practice-preview__lights span:nth-child(3) {
  background: #4ade80;
}

.practice-preview__bar > div:nth-child(2) {
  display: grid;
  min-width: 0;
}

.practice-preview__bar strong {
  overflow: hidden;
  color: #f4f9ff;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.practice-preview__bar small {
  overflow: hidden;
  color: #7890af;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.practice-preview__badge {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  color: #cffafe;
  background: rgb(14 116 144 / 24%);
  font-size: 0.7rem;
  font-weight: 800;
}

.practice-preview__description {
  padding: 0.8rem 1.1rem;
  border-bottom: 1px solid rgb(148 196 255 / 10%);
  color: #93a9c5;
  background: rgb(17 40 76 / 72%);
  font-size: 0.83rem;
}

.practice-preview__viewport {
  min-height: 540px;
  padding: clamp(1.2rem, 4vw, 2.5rem);
  color: #1e293b;
  background:
    linear-gradient(rgb(148 163 184 / 12%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(148 163 184 / 12%) 1px, transparent 1px), #f8fafc;
  background-size: 24px 24px;
}

.practice-preview__viewport :deep(.practice-section) {
  max-width: 760px;
  margin: 0 auto;
  padding: clamp(1.2rem, 4vw, 2rem);
  border: 1px solid #dbe4ef;
  border-radius: 1rem;
  color: #1e293b;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 20px 45px rgb(15 23 42 / 12%);
}

.practice-preview__viewport :deep(h2) {
  margin-bottom: 1rem;
  color: #0f172a;
}

.practice-preview__viewport :deep(h3) {
  margin: 1rem 0 0.55rem;
  color: #334155;
}

.practice-preview__viewport :deep(button),
.practice-preview__viewport :deep(input),
.practice-preview__viewport :deep(select),
.practice-preview__viewport :deep(textarea) {
  margin: 0.25rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  color: #1e293b;
  background: #ffffff;
  font: inherit;
}

.practice-preview__viewport :deep(button) {
  color: #ffffff;
  background: #2563eb;
  cursor: pointer;
}

.practice-preview__viewport :deep(button:disabled) {
  cursor: not-allowed;
  opacity: 0.45;
}

.practice-preview__viewport :deep(.monitor),
.practice-preview__viewport :deep(.base-card),
.practice-preview__viewport :deep(.parent-container),
.practice-preview__viewport :deep(.child-container),
.practice-preview__viewport :deep(.result-card) {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background: #f1f5f9;
}

.practice-preview__loading {
  display: grid;
  min-height: 300px;
  color: #64748b;
  place-items: center;
}

@media (max-width: 900px) {
  .practice-gallery__workspace {
    grid-template-columns: 1fr;
  }

  .practice-gallery__list {
    display: flex;
    gap: 0.5rem;
    max-height: none;
    overflow-x: auto;
  }

  .practice-gallery__result,
  .practice-gallery__empty {
    display: none;
  }

  .practice-gallery__item {
    flex: 0 0 210px;
    margin-bottom: 0;
  }
}

@media (max-width: 640px) {
  .practice-gallery__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .practice-gallery__toolbar {
    grid-template-columns: 1fr;
  }

  .practice-preview__bar {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .practice-preview__badge {
    display: none;
  }
}

.practice-gallery__header {
  min-height: 260px;
  border: 0;
  border-radius: 28px;
  background:
    radial-gradient(circle at 86% 20%, rgb(77 125 244 / 38%), transparent 18rem),
    linear-gradient(120deg, var(--brand-950), var(--brand-900) 62%, var(--brand-700));
  box-shadow: 0 24px 60px rgb(5 15 53 / 18%);
}

.practice-gallery__header h1 {
  font-weight: 700;
  letter-spacing: -0.035em;
}

.practice-gallery__header > strong {
  border-color: rgb(255 255 255 / 20%);
  background: rgb(255 255 255 / 8%);
}

.practice-gallery__toolbar,
.practice-gallery__list,
.practice-preview {
  border-color: var(--ink-200);
  background: #ffffff;
  box-shadow: 0 12px 30px rgb(13 28 80 / 6%);
  backdrop-filter: none;
}

.practice-gallery__toolbar label {
  color: var(--ink-700);
}

.practice-gallery__toolbar input,
.practice-gallery__toolbar select {
  border-color: var(--ink-300);
  color: var(--ink-900);
  background: var(--ink-50);
}

.practice-gallery__toolbar input:focus,
.practice-gallery__toolbar select:focus {
  border-color: var(--brand-500);
  box-shadow: 0 0 0 4px var(--brand-50);
}

.practice-gallery__result,
.practice-gallery__item > small,
.practice-gallery__empty {
  color: var(--ink-500);
}

.practice-gallery__item {
  color: var(--ink-800);
  background: transparent;
}

.practice-gallery__item:hover,
.practice-gallery__item--active {
  border-color: var(--brand-200);
  background: var(--brand-50);
  box-shadow: none;
  transform: translateX(3px);
}

.practice-gallery__item > span {
  color: var(--brand-600);
}

.practice-preview__bar {
  border-bottom-color: rgb(255 255 255 / 12%);
  background: var(--brand-950);
}

.practice-preview__bar strong {
  color: #ffffff;
}

.practice-preview__bar small {
  color: rgb(255 255 255 / 50%);
}

.practice-preview__badge {
  color: var(--brand-100);
  background: rgb(255 255 255 / 10%);
}

.practice-preview__description {
  border-bottom-color: var(--ink-200);
  color: var(--ink-600);
  background: var(--ink-50);
}

.practice-preview__viewport {
  background:
    linear-gradient(rgb(201 206 214 / 22%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(201 206 214 / 22%) 1px, transparent 1px), #ffffff;
  background-size: 24px 24px;
}

.practice-preview__viewport :deep(.practice-section) {
  border-color: var(--ink-200);
  border-radius: 14px;
  box-shadow: 0 16px 34px rgb(13 28 80 / 9%);
}

.practice-preview__viewport :deep(button) {
  border-radius: 999px;
  background: var(--brand-500);
}
</style>
