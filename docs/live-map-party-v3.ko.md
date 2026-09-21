# Live Map 파티 V3 REST + WebSocket

운영 테스트 기간에는 `session.userInfo.is_admin === true`인 관리자에게만 파티 UI를 표시하며, 일반 사용자는 파티 자동 복원·WebSocket 연결을 시작하지 않는다.

지도 오른쪽 상단 **파티** 버튼에서 현재 맵의 방 목록을 열 수 있다.
방 생성과 입장은 사이트 로그인이 필요하다. 방은 비밀번호로 입장하며,
정원은 기본 5명, 최대 10명이다.

## 사용 방법

- 방 만들기: 이름, 비밀번호, 정원과 선택 닉네임을 입력한다.
- 방 찾기: 현재 맵으로 필터링한 목록에서 방 이름을 검색한다. 같은 이름의 방은 짧은 방 ID로 구분한다.
- 참여 중인 방: 닉네임·색상을 변경하고 참여자와 공유 마커를 확인한다.
- 마커 추가: **지도에 마커 추가**를 선택하고 지도 빈 곳을 클릭/터치한다. 키보드로는 **좌표 입력**을 사용한다.
- 위치: WPF에서 수신한 위치를 파티에 자동 공유한다. 별도의 내 위치 찍기 버튼이나 수동 위치 입력 옵션은 제공하지 않는다.
- 좌표 입력의 **공유 방식**에서 지속 마커/순간 핑/수동 위치를 선택할 수도 있다.
- 온라인 표시: 입장 인원과 현재 온라인 인원을 구분한다. 같은 계정의 여러 탭은 서버의 접속 인원 값을 그대로 사용한다.
- 마커 편집: 설명, 종류(일반/위험/집결/목표), 층과 x/z를 설정한다. 작성자와 방장만 수정·삭제할 수 있다.
- 다른 층의 마커: 목록에서 마커를 누르면 해당 층과 위치로 이동한다. 지도에는 현재 층의 파티 마커를 표시한다.
- 방장: 방 이름·비밀번호·입장 잠금·정원을 변경하고, 강퇴·방장 양도·방 종료를 수행한다.
- 퇴장: **퇴장** 버튼으로 명시적으로 퇴장한다. 마지막 참여자가 나가면 방이 종료된다.

라이트/다크 테마와 한국어/영어/일본어를 지원한다. 모바일과 데스크톱은 같은 컴포넌트를 사용한다.

## API와 상태

계약: 운영 `https://back.eftlibrary.com/openapi.json`의 **Live Map Party V3**, 백엔드 `docs/live_map_party_v3_api.md`, `docs/live_map_party_v3_websocket.md`.
API 기본 경로: `/api/live-map/v3/party/rooms`.
공개 목록 및 V3 맵 상세는 실제 운영 응답을 확인했다.
요청/응답 타입은 `types/api/live-map-party.ts`에 정의했다.

방 생성의 `map_id`는 V3 `/api/map/v3/detail/{normalized_name}` 응답의 `map.id`를 사용한다.
현재 선택한 층의 `map_id`로 대체하지 않는다. 상위 맵에 하위 맵 층이 포함되는 경우도 처리한다.
마커는 실제 `floor_id`와 기존 라이브 맵 x/z 좌표를 사용하며, 회전한 지도의 클릭 좌표는 역변환한다.

- 방 생성/입장은 REST로 수행한다. 성공 응답에서 방 ID만 얻고 별도 파티 WebSocket에 연결한다.
- WebSocket URL은 기존 API 기본 URL의 HTTP(S)를 WS(S)로 전환하고 `/api/live-map/v3/party/rooms/{room_id}/ws`를 붙인다. 기존 알림/게임 위치 WebSocket과 별도다.
- 첫 프레임은 `auth`이며 Google 토큰은 URL에 넣지 않는다. 첫 `snapshot`을 받은 뒤에만 연결 완료로 표시한다.
- 15초 heartbeat, 수동/REST 변경 후 `sync`로 상태를 갱신한다. 기존 5초 REST 스냅샷 폴링은 제거했다. 공개 목록은 열린 동안 15초마다 조회한다.
- 연결 중에는 REST 응답이 room/me/members/markers를 덮어쓰지 않는다. WebSocket snapshot이 기준이며, 늦은 REST 응답이나 알림 유실은 `sync`/heartbeat로 복구한다.
- `presence.online_count`는 접속 인원, `room.member_count`는 입장 인원이다. 참여자 목록은 joined만 표시하고 `online_member_ids`로 배지를 붙인다.
- 방 ID만 계정·맵별 localStorage에 저장한다. 새로고침은 비밀번호 재입장 요청 없이 WebSocket 인증으로 복원한다. 비밀번호와 토큰은 이 저장소에 기록하지 않는다.
- 핑은 event_id 중복을 제거한다. 위치는 참여자별 서버 시각을 비교해 오래된 이벤트가 최신 위치를 덮어쓰지 않게 한다. snapshot에서 재입장 세대와 위치 상태를 다시 맞춘다.
- `server_time`과 클라이언트 시각 차이를 보정해 Unix 초 단위 `expires_at`으로 만료 처리한다. heartbeat는 위치 유효 시간을 늘리지 않는다. 재접속할 때 지난 핑은 복원하지 않는다.
- 연결 실패는 1→2→4→8→최대 30초와 임의 지연으로 재시도한다. 포커스/네트워크 복귀 시 상태를 확인한다. 재접속마다 NextAuth 세션에서 토큰을 다시 얻으며, 1012 세션 갱신도 처리한다.
- 4403/4404/4410은 방 상태를 지우고 목록으로 이동한다. 4401은 새 토큰으로 한 번 재시도 후 로그인 안내, 1008/1009는 자동 재시도 중단, 4429는 대기 후 재시도한다.
- 퇴장 버튼은 재접속 중단 → REST leave → WebSocket 종료 순서로 처리한다. leave 실패 시 연결을 복구한다. 새로고침/일시적인 연결 끊김에는 leave를 보내지 않는다.
- 연결 종료 후 서버 유예(기본 90초)가 지나면 자동 퇴장하며, 방장 양도/방 종료 결과는 서버가 결정한다. REST 입장 후 소켓에 연결하지 않는 경우도 자동 퇴장 대상이다.
- 마커 수정은 편집을 시작한 `version`, 삭제는 현재 `version`을 보낸다. 충돌하면 `sync`를 요청하고 최신 마커를 다시 선택하게 한다.
- REST 429는 Retry-After(교차 출처로 읽지 못하면 60초), WebSocket 429는 retry_after 동안 전송을 제한한다. 교차 출처 REST 헤더를 읽으려면 서버 CORS 노출 헤더에 포함되어야 한다.

## 검증

Node 24, pnpm 사용:

```sh
nvm use 24
pnpm exec tsc --noEmit
node script/check-live-map-party-realtime.cjs
pnpm exec eslint features/live-map/party features/live-map/components/live-map-client-page.tsx features/live-map/components/live-map-canvas.tsx types/api/live-map-party.ts
pnpm dev
```

브라우저 검증은 별도 Playwright 설치를 사용할 수 있다. 프로젝트 의존성을 변경하지 않는 예:

```sh
mkdir -p /tmp/eft-party-check
pnpm --dir /tmp/eft-party-check add playwright@1.63.0
pnpm --dir /tmp/eft-party-check exec playwright install chromium
NODE_PATH=/tmp/eft-party-check/node_modules node script/check-live-map-party.cjs
NODE_PATH=/tmp/eft-party-check/node_modules node script/check-live-map-party-coordinates.cjs
```

`PARTY_TEST_BASE_URL` 기본값은 `http://localhost:4000`이다.
스크린샷은 임시 디렉터리에 저장하며 `PARTY_TEST_OUTPUT`으로 위치를 지정할 수 있다.
테스트는 운영 V3 맵 데이터를 읽고 파티 REST/WebSocket 요청과 인증은 브라우저에서 가로채므로 운영 방을 생성하거나 변경하지 않는다.

확인 항목:

- 생성, 인증 헤더, 비밀번호 공백 보존, 잘못된 비밀번호, 429 재시도
- WebSocket 재접속 복원, 명시적 퇴장, 원격 방 종료
- 실시간 프로토콜 9개 시나리오: heartbeat 유지, 시각 보정/만료, 순서 역전/세대 변경, 위치 TTL, 토큰 갱신/복원, 백오프/강퇴, 429/퇴장 중단, 인증 실패/잘못된 프레임
- 늦은 REST 스냅샷 무시, REST 상세 폴링 제거, 핑 중복/만료, 수동 위치 전송, 여러 탭 위치 복원
- 마커 생성·버전 충돌·수정·삭제, 사용자 텍스트의 HTML 실행 방지
- 닉네임·색상, 방 설정, 강퇴, 방장 양도
- 라이트/다크 화면, 모바일 가로 넘침과 지도 배치 동작
- 세관·공장·연구소 각각 0°/90°/180°/270°에서 클릭 위치와 표시 마커 위치 일치

실제 Google 계정을 사용한 운영 생성/입장/수정 및 운영 WebSocket을 통한 다중 사용자 송수신은 이 자동 검증에 포함하지 않는다. 배포 후 실제 계정으로 첫 snapshot 수신, 서로 다른 계정의 핑·위치 공유, 연결 복구를 확인해야 한다.

### 기존 위치 공유 및 비밀번호 표시

- 기존 좌표 입력, 위치 WebSocket 수신, 현재 맵의 유효한 로그 위치 수신을 파티 연결 중 `position` 메시지로도 전송한다. 층 판정과 지도 좌표 변환은 기존 방식을 사용한다.
- 파티 위치에는 닉네임과 색상을 표시한다. 쿼터니언에서 계산한 방향(yaw)이 있으면 기존 플레이어 화살표로 표시하며, 파일명으로 수신·입력한 위치는 다음 위치까지 유지한다. 로그 위치만 60초 후 만료된다. 연결 전 과거 위치를 재전송하거나 heartbeat로 위치를 연장하지 않는다.
- 생성·입장·비밀번호 변경 성공 시 입력한 값을 계정/맵/방별 sessionStorage에 보관하고 패널에서 표시·복사한다. 명시적 퇴장 시 제거한다. 다른 탭/기기에서 변경된 비밀번호는 조회할 수 없으므로 UI에서 마지막 입력값임을 안내한다.
- 모든 참여자에게 항상 현재 비밀번호를 표시하려면 백엔드 계약 확장이 필요하다. 현재 서버는 해시만 저장하며 REST/WS 응답에는 비밀번호가 없다. 프론트에서 기존 해시를 복원하거나 응답에 없는 필드를 추정하지 않는다.
- `position.yaw`와 `persistent`를 지원하는 백엔드를 먼저 배포해야 한다. yaw는 0 이상 360 미만이며, 방향을 알 수 없는 지도 클릭/로그 위치는 생략한다. 맵별 방향 보정과 지도 회전은 렌더링 시 적용한다.

- 수신 위치는 `persistent:true`로 보내고 `expires_at:null` 응답을 만료 처리에서 제외한다. 새 위치로 교체하거나 참여 종료 시 제거하며 재접속 snapshot에서도 복원한다.

- 순간 핑 UI·지도 표시·전송은 제거했다. 공유 마커와 자동 위치 공유를 사용한다.
