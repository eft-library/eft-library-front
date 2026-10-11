# 게스트 채팅 쿠키 모드 배포

프론트는 비로그인 연결 전에 `POST /api/live-map/v3/chat/guest-session`을 `credentials: include`로 호출한다. 발급이 성공하면 같은 API 호스트의 채팅 WebSocket에 `{type: "guest", session: "cookie"}`를 보낸다. 응답의 `guest_token`은 저장하거나 사용하지 않는다. 지원 브라우저에서는 Web Locks로 여러 탭의 발급 요청을 직렬화한다.

## 배포 순서와 환경

1. 백엔드의 쿠키 발급 API와 쿠키 모드를 먼저 준비한다. 프론트가 먼저 배포되면 기존 서버에서는 게스트 채팅이 연결되지 않는다. IP 모드로 자동 전환하지 않는다.
2. 브라우저가 직접 API를 호출하므로, 백엔드 CORS에서 실제 프론트 Origin을 명시하고 자격 증명을 허용한다. Origin `*` 응답으로는 최초 쿠키 발급을 보장할 수 없다.
3. HTTPS 프론트와 HTTPS/WSS API를 동일 사이트로 구성한다. 현재처럼 API 서브도메인에서 쿠키를 발급하고 같은 API 서브도메인으로 WSS를 연결할 수 있다. localhost에서 운영 API로 보내는 요청은 SameSite=Lax 쿠키의 검증 환경으로 사용할 수 없다.
4. 위 백엔드 구성을 반영한 뒤 프론트를 배포한다. 신규 환경 변수나 DB 마이그레이션은 필요 없다.

## 검증

- 동일 사이트 HTTPS 테스트 환경에서 비로그인 최초 방문의 발급 응답에 `__Host-chat_guest_v3` 쿠키가 저장되고 WS snapshot이 수신되는지 확인한다. 쿠키 값은 기록하지 않는다.
- 같은 브라우저의 새 탭과 재연결은 쿠키를 공유하고, 시크릿 창은 별도 세션인지 확인한다.
- 쿠키 검증이 두 번 실패하면 자동 재연결이 중단되는지 확인한다. 연결 제한에는 서버 retry_after를 적용하며 수동 재연결도 대기 시간을 우회하지 않는다.
- 로그인 시 기존 auth 방식이 유지되고, 모집 연결 오류가 파티 패널에 중복 표시되지 않는지 확인한다.
- 프로그램의 위치 전송과 파티 WS 재연결 후 지도 표시를 확인한다.

로컬 모사 검증: `node script/check-live-map-chat-guest-session.cjs`, Playwright의 `script/check-live-map-chat-controls.cjs`, `script/check-live-map-party.cjs`. 실제 운영 CORS·쿠키 정책 검증은 별도로 필요하다.
