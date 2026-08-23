# Vue 최종실습

처음에는 배열에 저장한 Mock Data를 `v-for`로 출력하고 온도에 따라 문구를 바꾸는 실습에서 출발했습니다. 이후 `ref`, `computed`, `watch`로 상태의 변화를 표현하고, Props와 Emits로 컴포넌트의 역할을 나누었습니다. Router로 화면을 연결하고 Pinia로 공통 설정을 관리한 다음, Axios와 OpenWeather API를 이용해 Mock Data를 실시간 날씨로 교체했습니다. (기존의 MOCK Data는 API 연결 실패시 띄울지 말지 고민하다가 삭제하였습니다.)

## 기획

OpenWeather API에서 제공하는 기준으로 대한민국 주요 도시 날씨를 제공하고, 도시 검색 기능, 날씨 맞춤 생활 추천(저녁 메뉴 추천, 옷차림 추천, 길거리 번호 딸 확률) 기능 그리고 3시간 간격 예보 기능을 만들어보았습니다. 그리고 대한민국 말고 중국의 주요 여행도시의 날씨도 제공하는 기능을 추가했으며 주요 기능은 비슷하나, 대시보드 상 날씨 카드들에 좀 더 전문적인 느낌을 구현하였습니다. 마지막으로 예제 실습란이 있는데 최종 실습 전에 수업시간부터 주말까지 처음부터 쳐보았던 실습들을 추가하였습니다. 최종실습제출의 의의 외에도 나중에 Vue를 복습할 때 편리하게 실습 예시를 보기 위해 추가하였습니다. 예제 실습은 전부 AI로 개발하였습니다.

### 대한민국 지역별 날씨

메인 화면에서는 대한민국 100개 지역을 검색할 수 있습니다.
주요 파일은 다음과 같습니다.

- `WeatherParent.vue`: 검색 상태, 현재 날씨와 예보 API 통신을 관리합니다.
- `WeatherCard.vue`: 도시 객체를 Props로 받고 선택 및 상세보기 이벤트를 전달합니다.
- `WeatherDetailView.vue`: 동적 Route의 도시 ID를 이용해 상세 날씨를 표시합니다.
- `weatherCities.js`: 대한민국 100개 지역의 ID와 좌표를 보관합니다.

### 중국 여행가이드

중국 여행가이드는 주요 여행도시 50곳의 현재 날씨와 간단한 준비 팁을 제공합니다. 첫 화면에는 8개 도시를 표시하고, 더 보기 버튼을 누를 때마다 8개씩 추가합니다. 한글 도시명과 영문 도시명으로 검색할 수 있으며 화북, 화동, 화남, 중남, 서남, 서북과 동북 권역으로도 필터링할 수 있습니다.

- `ChinaWeatherView.vue`: 도시 검색, 지역 필터링, API 호출과 더 보기를 담당합니다.
- `ChinaWeatherCard.vue`: 기온, 체감온도, 습도, 바람과 여행 준비 팁을 표시합니다.
- `chinaTravelCities.js`: 중국 여행도시 50곳의 이름, 권역과 좌표를 보관합니다.

### 날씨 맞춤 생활 추천

날씨를 숫자로만 보여주기보다 하루의 선택에 연결해 보고 싶어 세 가지 추천 기능을 만들었습니다.

- `DinnerMenuRecommendation.vue`는 계절, 온도, 비와 눈을 순서대로 판단해 저녁 메뉴를 추천합니다. 다른 메뉴 보기 버튼을 누르면 후보 배열의 다음 메뉴로 이동하고, 도시가 바뀌면 첫 번째 메뉴로 돌아갑니다.
- `ClothingRecommendation.vue`는 온도 구간에 맞는 옷차림을 정하고 비, 눈과 습도에 따라 준비물을 덧붙입니다.
- `HuntingSuccessCard.vue`는 온도와 습도로 불쾌지수를 계산한 뒤 날씨 조건을 조합해 재미용 번호 교환 성공확률을 보여줍니다. 실제 결과를 예측하는 값은 아니며 재미요소를 위해 추가해보았습니다.

한국 및 중국 저녁 메뉴, 옷차림, 헌팅확률 데이터는 전부 Ai로 생성하여 넣었습니다. 기본 기능은 배운 선 한해서만 구현하였습니다.

세 컴포넌트는 `LifestyleRecommendationPanel.vue`에서 하나의 추천 영역으로 조합됩니다.

### 예제실습 모아보기

날씨 웹 프로그램과는 전혀 상관이 없지만 교수님이 전에 보여주신 실습 예시 파일을 보고 꽤 장기간동안 pdf 교재 실습을 따라친 내용이 아까워 넣게되었습니다.
`src/components`에 작성된 예제들을 모아보았습니다.

## JavaScript

지역 정보는 객체로 만들고 여러 지역 객체는 배열로 관리했습니다.

- `map()`으로 API 요청 배열과 화면에 필요한 응답 배열을 만듭니다.
- `filter()`와 `includes()`로 검색 조건에 맞는 지역을 찾습니다.
- `find()`로 도시 ID가 같은 객체를 선택합니다.
- `slice()`로 처음 표시할 도시와 단기 예보의 범위를 정합니다.
- `Math.round()`로 온도를 화면에 표시할 정수로 변환합니다.
- `async`, `await`, `try`, `catch`, `finally`로 비동기 요청과 종료 처리를 나눕니다.

영문 검색은 `toUpperCase()`를 사용해 입력값과 도시명을 같은 형태로 비교합니다. API 응답을 가공할 때 배열 메서드와 조건문을 조합하는 단순한 형태로 구성하였습니다.

## Composition API (데이터와 화면 연결)

사용자가 바꾸는 검색어, 선택 도시와 API 응답은 `ref`에 저장했습니다. 검색 결과, 온도 표시와 추천 결과는 `computed`로 계산하여 Template에 긴 계산식이 들어가지 않게 했습니다.

`watch`는 선택 도시나 검색 조건처럼 특정 값의 변화를 처리하고, `watchEffect`는 검색어가 사용되는 순간을 자동으로 추적합니다. 첫 API 호출은 컴포넌트가 화면에 연결된 뒤 실행되도록 `onMounted`에 배치했습니다.

## Props Down, Emits Up

`SearchBar.vue`는 검색어와 도시 배열을 Props로 받고 `update-query` 이벤트로 입력값을 부모에게 전달합니다. `WeatherCard.vue`는 도시를 표시하는 일에 집중하고 `select-card`, `click-detail` 이벤트만 부모에게 보냅니다.

`BaseDashboardCard.vue`는 Slot을 제공해 검색, 목록과 추천 영역이 같은 카드 틀을 공유하게 합니다. 컴포넌트 파일은 PascalCase, JavaScript의 변수와 함수는 camelCase, Template의 Props와 이벤트는 kebab-case로 작성했습니다.

## Router와 Pinia로 화면의 범위를 넓혔습니다

`router/index.js`의 `routes` 배열은 다음 화면을 Lazy Loading으로 연결합니다.

`configStore.js`는 Pinia의 State, Getter와 Action에 해당하는 값을 한곳에서 관리합니다. 섭씨와 화씨 단위 및 마지막 갱신 시간을 Store에 두었기 때문에 내비게이션에서 단위를 바꾸면 현재 날씨, 중국 날씨, 단기 예보와 상세 화면이 함께 바뀝니다.

화씨 단위는 실용적으로 필요하진 않으나 실습 과정중에 배움을 남기기 위해 그대로 두었습니다.

## Axios로 Mock Data를 실시간 데이터로 바꾸었습니다 (기존 Mock Data 삭제)

OpenWeather의 현재 날씨 API와 5일·3시간 예보 API를 Axios로 호출합니다. Vite는 `.env`에서 `VITE_`로 시작하는 환경 변수를 읽으며, 코드는 `import.meta.env.VITE_OPENWEATHER_API_KEY`로 API 키를 가져옵니다. 이 방식 역시 Vue PDF의 Vite 환경 변수 단원에서 다룬 형태를 따릅니다.

API 키가 없거나 통신에 실패하면 임의의 Mock Data로 바꾸지 않고 설정 또는 네트워크를 확인하라는 안내를 표시합니다. 로딩 상태를 해제하는 코드는 `finally`에 두어 성공과 실패 중 어느 경로에서도 같은 정리 작업이 실행되도록 했습니다.

## Css

Css는 전부 AI로 생성하였습니다.

## 프로젝트 구조

```text
src/
├── main.js
├── App.vue
├── assets/
│   ├── base.css
│   └── main.css
├── router/
│   └── index.js
├── stores/
│   ├── configStore.js
│   └── counter.js
├── data/
│   ├── weatherCities.js
│   └── chinaTravelCities.js
├── views/
│   ├── WeatherHomeView.vue
│   ├── ChinaWeatherView.vue
│   ├── PracticeGalleryView.vue
│   ├── WeatherDetailView.vue
│   └── NotFoundView.vue
└── components/
    ├── WeatherParent.vue
    ├── ChinaWeatherCard.vue
    ├── 예제 컴포넌트
    └── exercise/
        ├── BaseDashboardCard.vue
        ├── SearchBar.vue
        ├── WeatherCard.vue
        ├── ForecastPreview.vue
        ├── UnitToggler.vue
        ├── LifestyleRecommendationPanel.vue
        ├── DinnerMenuRecommendation.vue
        ├── ClothingRecommendation.vue
        └── HuntingSuccessCard.vue
```

## 사용 기술

| 영역         | 기술                                     |
| ------------ | ---------------------------------------- |
| Framework    | Vue 3, Composition API, `<script setup>` |
| Build Tool   | Vite                                     |
| Routing      | Vue Router                               |
| State        | Pinia                                    |
| HTTP         | Axios                                    |
| UI           | Element Plus                             |
| Style        | CSS, Scoped CSS, Responsive Web          |
| Code Quality | ESLint, Oxlint, Prettier                 |

## 프로젝트를 마치며

이번 프로젝트를 만들면서 하나의 기능은 새로운 문법 하나로 완성되는 것이 아니라는 점을 배웠습니다. JavaScript 배열과 함수가 데이터의 모양을 만들고, Vue의 반응형 상태가 그 변화를 화면에 연결했습니다. Props와 Emits는 컴포넌트의 책임을 나누었고, Router는 화면을 URL과 연결했습니다. Pinia는 여러 화면의 공통 설정을 모았으며 Axios는 학습용 Mockup을 실제 데이터 서비스로 발전시켰습니다.

이번 실습을 하며 교육과정 중에 있는 Vue 문법 및 기법을 따라가기 급급했던 거 같은데, 다음 프로젝트에는 더 확정된 문법과 기법을 사용하여 프로젝트를 더욱 풍부하게 만들고 싶습니다.

## 기존 프로젝트를 새로운 방식으로 다시 만들어보았습니다 (AI 사용)

기존 프로젝트는 교육 과정에서 배운 문법을 최대한 지키면서 제가 수업에서 무엇을 배웠는지 확인하는 것에 목적을 두었습니다. 하지만 프로젝트를 완성하고 나니 같은 기능을 현업에서 많이 사용하는 방식으로 작성하면 코드가 어떻게 달라지는지 직접 비교해보고 싶었습니다. 기존 코드를 바로 수정하면 기존에 배운 내용을 따라 만든 과정이 사라질 것 같아 기존 웹은 그대로 남겨두고, weather-modern 폴더에 별도의 웹을 하나 더 만들었습니다.

두 웹은 한국 100개 지역과 중국 여행도시 50곳의 실시간 날씨를 보여주고, 도시 검색, 3시간 간격 예보, 저녁 메뉴 추천, 옷차림 추천과 만남 지수를 제공한다는 점은 같습니다. 기존 웹은 JavaScript와 수업에서 배운 Composition API를 중심으로 작성했고, 새로운 웹은 같은 기능을 TypeScript와 서버 상태 관리 방식으로 다시 구성했습니다.

새로운 기능이 들어간 웹은 전부 AI한테 코드 작성을 맡기고 후에 공부하는 방식으로 진행하였습니다.

### 새 프로젝트를 별도의 폴더로 분리한 이유

새로운 문법을 연습하기 위해 기존 파일을 전부 바꾸는 것보다 학습 버전과 개선 버전을 나란히 남기는 것이 변화한 내용을 확인하기 좋다고 생각했습니다. 그래서 루트의 `src`와 `package.json`은 기존 웹에서 사용하고, `weather-modern/src`와 `weather-modern/package.json`은 새 웹에서 사용하도록 완전히 나누었습니다.

```text
skala-vue/
├── src/                       # PDF 학습 내용을 바탕으로 만든 기존 웹
├── package.json               # 기존 웹 실행 설정
└── weather-modern/
    ├── src/                   # 현업 방식을 적용한 새 웹
    ├── package.json           # 새 웹 전용 패키지
    ├── tsconfig.json          # TypeScript 설정
    ├── vite.config.ts         # 새 웹 Vite 설정
    └── vitest.config.ts       # 테스트 설정
```

기존 웹의 코드는 변경하지 않았기 때문에 두 버전을 각각 실행해 화면과 코드 구조를 비교할 수 있습니다. OpenWeather API 키는 중복해서 작성하지 않도록 새 웹의 Vite 설정이 루트의 `.env`를 읽게 만들었습니다.

## 새 웹에 추가한 기술

1. Composable 분리: `weather-modern/src/composables/useWeatherDashboard.ts`
2. TanStack Vue Query 캐시·서버 상태 관리
3. 전체 TypeScript 적용: `weather-modern/src/types/weather.ts`
4. `Promise.allSettled()` 부분 실패 처리: `weather-modern/src/api/weatherApi.ts`
5. Axios 요청 취소와 검색 디바운스
6. Vitest·Vue Test Utils 테스트
7. `<Teleport>` 도시 상세 모달: `weather-modern/src/components/CityDetailModal.vue`

### 새로운 기술에 대한 짧은 설명

1. Composable 분리 (`useWeatherDashboard.ts`) — 컴포넌트 안에 흩어진 로직(데이터 가져오기, 상태 관리)을 따로 빼서 재사용하고, 컴포넌트는 화면 표시에만 집중하게 만들 때 사용됩니다.
2. TanStack Vue Query 캐시·서버 상태 관리 — 서버에서 받아온 데이터를 화면에 보여줄 때, 같은 데이터를 여러 컴포넌트에서 공유해야 할 때, 그리고 로딩·에러 처리나 재시도, 포커스 시 자동 갱신 같은 걸 매번 직접 구현하기 귀찮을 때 주로 사용된다고 합니다.
3. 전체 TypeScript 적용 (`types/weather.ts`) — API 응답이나 컴포넌트에 주고받는 데이터 모양을 미리 정해놓고, 타입이 틀리면 실행 전에 바로 에러로 잡아내고 싶을 때 사용됩니다.
4. `Promise.allSettled()` 부분 실패 처리 (`weatherApi.ts`) — 여러 도시 날씨를 동시에 조회할 때, 하나가 실패해도 전체가 죽지 않고 성공한 것만 정상 표시하고 싶을 때 사용됩니다.
5. Axios 요청 취소와 검색 디바운스 — 검색창에 빠르게 타이핑할 때마다 매번 API를 부르지 않고, 입력이 멈춘 뒤에만 요청하거나 이전 요청을 취소해서 응답 순서가 꼬이는 걸 막고 싶을 때 사용됩니다.
6. Vitest·Vue Test Utils 테스트 — 컴포넌트나 composable이 의도대로 동작하는지 미리 검증하고, 코드를 고칠 때 실수로 뭔가 깨졌는지 빠르게 확인하고 싶을 때 사용됩니다.
7. `<Teleport>` 도시 상세 모달 (`CityDetailModal.vue`) — 모달을 부모 컴포넌트의 CSS 제약(overflow, z-index)에 갇히지 않게 화면 최상단으로 렌더링하고 싶을 때 사용됩니다.

## 새 프로젝트 구조

```text
weather-modern/
├── src/
│   ├── api/
│   │   └── weatherApi.ts
│   ├── composables/
│   │   ├── useWeatherDashboard.ts
│   │   └── useDebouncedValue.ts
│   ├── components/
│   │   ├── WeatherDashboard.vue
│   │   ├── WeatherCard.vue
│   │   ├── CityDetailModal.vue
│   │   ├── RecommendationPanel.vue
│   │   └── WeatherCard.test.ts
│   ├── data/
│   │   └── cities.ts
│   ├── types/
│   │   └── weather.ts
│   ├── utils/
│   │   ├── recommendations.ts
│   │   └── recommendations.test.ts
│   ├── views/
│   │   ├── KoreaWeatherView.vue
│   │   └── ChinaWeatherView.vue
│   ├── router/
│   │   └── index.ts
│   ├── styles/
│   │   └── main.css
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## 두 프로젝트를 비교하며 느낀 점

기존 프로젝트에서는 `ref`, `computed`, `watch`, Props, Emits와 Axios를 직접 조합하면서 Vue의 기본 동작을 이해할 수 있었습니다. 새 프로젝트에서는 TypeScript로 데이터의 형태를 정하고, Composable로 반복되는 로직을 분리했으며, Vue Query로 서버에서 가져온 데이터의 수명을 관리해보았습니다.

처음 프로젝트는 교육 내용을 따라 기능을 완성했다는 의미가 있고, 새 프로젝트는 같은 결과를 유지하면서 코드의 중복, API 실패와 테스트까지 생각해본 과정이라는 의미가 있습니다. 두 버전을 따로 남겨두었기 때문에 앞으로 새로운 기술을 배웠을 때 기능만 추가하는 것에서 끝내지 않고 왜 그 기술이 필요한지 비교하며 공부할 수 있을 것 같습니다.
