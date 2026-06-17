# Live Map 성능 기준 측정 - 2026-06-18

## 측정 배경

- 대상 페이지: `https://eftlibrary.com/live-map/customs`
- 대상 API: `https://back.eftlibrary.com/api/live-map/v3/detail/customs`
- 목적: live-map 데이터를 정적 JSON으로 제공하기 전에 현재 성능 기준값을 남기기 위함.
- 측정 방식: 로컬 환경에서 `curl`로 운영 서버를 반복 요청.
- 참고: 현재 프로젝트에 Lighthouse/Playwright 측정 도구가 설치되어 있지 않아 FCP/LCP 같은 브라우저 렌더링 지표는 측정하지 않음.

## 측정 명령

```sh
for url in \
  'https://eftlibrary.com/live-map/customs' \
  'https://back.eftlibrary.com/api/live-map/v3/detail/customs' \
  'https://back.eftlibrary.com/api/live-map/v3/quest/bad-rep-evidence' \
  'https://back.eftlibrary.com/api/live-map/v3/story/blue-fire'; do
  echo "URL $url"
  for i in 1 2 3 4 5; do
    curl -L -s -o /dev/null \
      -w "run=$i status=%{http_code} dns=%{time_namelookup}s connect=%{time_connect}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s size=%{size_download}\n" \
      "$url"
  done
  echo
done
```

```sh
for url in \
  'https://eftlibrary.com/live-map/customs' \
  'https://back.eftlibrary.com/api/live-map/v3/detail/customs'; do
  echo "URL $url"
  curl -L -s -D - -o /dev/null -H 'Accept-Encoding: br,gzip' "$url" |
    rg -i '^(HTTP/|content-type|content-length|content-encoding|cache-control|etag|last-modified|server|x-|cf-|vary)'
  echo
done
```

## 측정 결과

### 페이지: `/live-map/customs`

| Run | Status | TTFB | Total | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 | 0.970563s | 1.822490s | 2475626 |
| 2 | 200 | 0.712442s | 1.462937s | 2475626 |
| 3 | 200 | 0.839310s | 1.632471s | 2475626 |
| 4 | 200 | 0.985694s | 1.824097s | 2475626 |
| 5 | 200 | 0.713968s | 1.460251s | 2475626 |

- 평균 TTFB: 약 `0.84s`
- 평균 전체 응답 시간: 약 `1.64s`
- 다운로드 크기: 약 `2.48MB`

주요 응답 헤더:

```txt
content-type: text/html; charset=utf-8
server: cloudflare
vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-stale-time: 300
x-nextjs-prerender: 1
x-nextjs-postponed: 1
x-powered-by: Next.js
cache-control: private, no-cache, no-store, max-age=0, must-revalidate
x-served-by: eftlibrary.com
cf-cache-status: DYNAMIC
content-encoding: br
```

### API: `/api/live-map/v3/detail/customs`

| Run | Status | TTFB | Total | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 | 0.594903s | 1.128006s | 220928 |
| 2 | 200 | 0.649231s | 1.186884s | 220928 |
| 3 | 200 | 0.608602s | 0.895793s | 220928 |
| 4 | 200 | 0.600368s | 1.138235s | 220928 |
| 5 | 200 | 0.617578s | 0.897858s | 220928 |

- 평균 TTFB: 약 `0.61s`
- 평균 전체 응답 시간: 약 `1.05s`
- 다운로드 크기: 약 `221KB`

주요 응답 헤더:

```txt
content-type: application/json
server: cloudflare
x-served-by: back.eftlibrary.com
cf-cache-status: DYNAMIC
content-encoding: br
```

### API: `/api/live-map/v3/quest/bad-rep-evidence`

| Run | Status | TTFB | Total | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 | 0.567523s | 0.569882s | 7798 |
| 2 | 200 | 0.560332s | 0.562720s | 7798 |
| 3 | 200 | 0.566612s | 0.569228s | 7798 |
| 4 | 200 | 0.568052s | 0.581286s | 7798 |
| 5 | 200 | 0.573427s | 0.576270s | 7798 |

- 평균 TTFB: 약 `0.57s`
- 평균 전체 응답 시간: 약 `0.57s`
- 다운로드 크기: 약 `7.8KB`

### API: `/api/live-map/v3/story/blue-fire`

| Run | Status | TTFB | Total | Size |
| --- | --- | --- | --- | --- |
| 1 | 200 | 0.694083s | 0.703898s | 18905 |
| 2 | 200 | 0.883584s | 1.028395s | 18905 |
| 3 | 200 | 0.588598s | 0.720560s | 18905 |
| 4 | 200 | 0.598331s | 0.730564s | 18905 |
| 5 | 200 | 0.577569s | 0.705950s | 18905 |

- 평균 TTFB: 약 `0.67s`
- 평균 전체 응답 시간: 약 `0.78s`
- 다운로드 크기: 약 `18.9KB`

## 관찰 내용

- live-map 페이지 응답은 Cloudflare 기준 `cf-cache-status: DYNAMIC`이며, `cache-control: private, no-cache, no-store`가 적용되어 있음.
- live-map API 응답도 Cloudflare에서 캐시되지 않고 동적으로 처리되고 있음.
- `/live-map/customs` 페이지 응답 크기가 약 `2.48MB`로 큰 편임.
- 따라서 API 요청 시간뿐 아니라, 서버 렌더링 과정에서 페이지 응답에 포함되는 live-map 데이터 크기도 성능에 영향을 주는 것으로 보임.
- 정적 JSON 제공 방식은 우선 `detail/{map}.json`부터 실험해볼 가치가 있음.
- 이후 효과가 확인되면 quest/story/event 상세 JSON까지 확장하는 방식이 적절해 보임.

## 다음 비교 대상

정적 JSON 방식을 도입한다면 같은 방식으로 아래 항목을 다시 측정한다.

- `/data/live-map/v3/detail/customs.json?v={version}`
- `/data/live-map/v3/quest/bad-rep-evidence.json?v={version}`
- `/data/live-map/v3/story/blue-fire.json?v={version}`
- `/live-map/customs`

개선 여부를 판단할 기준:

- 정적 JSON 응답의 `cf-cache-status`가 `HIT` 또는 이에 준하는 캐시 히트 상태가 되는지 확인.
- 정적 JSON의 TTFB가 현재 `detail/customs` API 평균인 약 `0.61s`보다 의미 있게 낮아지는지 확인.
- 지도 데이터가 초기 서버 렌더링 응답에서 빠진다면 `/live-map/customs` 페이지 응답 크기가 현재 약 `2.48MB`보다 줄어드는지 확인.
