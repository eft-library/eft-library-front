# 정적 JSON 전환 전후 성능 측정 방법

운영 페이지 기준으로 Lighthouse 성능 지표를 저장한다.

## 측정 스크립트

```bash
source ~/.nvm/nvm.sh && nvm use 24
node script/measure-production-performance.mjs
```

Lighthouse가 사용할 Chrome을 찾지 못하면 Chrome을 설치하거나 Chrome for Testing을 내려받는다.

```bash
pnpm dlx @puppeteer/browsers install chrome@stable --path .cache/performance-browsers
```

특정 Chrome 실행 파일을 직접 지정할 수도 있다.

```bash
PERF_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node script/measure-production-performance.mjs
```

기본값:

- 기준 URL: `https://eftlibrary.com`
- 라벨: `before-static-json`
- 실행 횟수: `1`
- 결과 저장 위치: `docs/performance/results/{label}/{YYYY-MM-DD}`

## 일부 페이지만 측정

```bash
PERF_PAGES=live-map-customs,boss-detail,community-detail \
node script/measure-production-performance.mjs
```

## 여러 번 반복 측정

```bash
PERF_RUNS=3 \
node script/measure-production-performance.mjs
```

## 정적 JSON 전환 후 비교 측정

```bash
PERF_LABEL=after-static-json \
node script/measure-production-performance.mjs
```

## 결과 확인

각 실행은 Lighthouse JSON 원본과 `summary.md`를 함께 남긴다.

예:

```text
docs/performance/results/before-static-json/2026-06-22/summary.md
docs/performance/results/before-static-json/2026-06-22/live-map-customs.json
docs/performance/results/after-static-json/2026-06-22/summary.md
docs/performance/results/after-static-json/2026-06-22/live-map-customs.json
```

`summary.md`에는 아래 지표가 표로 정리된다.

- Performance score
- FCP
- LCP
- TBT
- CLS
- TTFB
- transferred bytes
- request count

## 비교 시 주의점

- 같은 네트워크 환경에서 측정한다.
- 가능한 같은 시간대에 전후 결과를 측정한다.
- 첫 실행은 Chrome/Lighthouse 설치나 캐시 영향이 있을 수 있으므로 중요한 페이지는 `PERF_RUNS=3`으로 반복 측정한다.
- 로그인/개인화가 필요한 페이지는 운영 비로그인 기준으로만 비교한다.
