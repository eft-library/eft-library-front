# 위치 수신 WebSocket 복구 연동

기존 `/ws?token=...` 위치·알림 연결을 재사용한다. 모집·파티 채팅 WebSocket과 별개이며 신규 환경 변수는 없다.

- WebSocket open 또는 init만으로 수신 준비 완료를 표시하지 않는다. 서버의 `location_connection_status: ready`를 기다린다.
- Redis 구독 복구 상태인 reconnecting에서는 소켓을 유지한다. 소켓 close/error 시에만 최대 약 30초의 지수 backoff와 jitter로 재접속하며 기존 30초 ping을 유지한다. 기존 서버는 ping에 응답하지 않으므로 수신 공백만으로 정상 연결을 종료하지 않는다.
- 재접속 때 기존 getSession 절차로 최신 토큰을 조회한다. 반복 인증 거절은 자동 재시도를 중단하고 재로그인을 안내한다.
- 위치·로그 위치·레이드 상태의 event_id 중복을 제거하고, 세 이벤트가 공유하는 received_at_unix_us 순서를 검사한다. 메타데이터가 없는 기존 이벤트와 일반 알림은 계속 처리한다.
- 복원 위치는 관측 시각과 복원 여부를 보존하고 화면에 표시한다. 로그 위치는 payload.observed_at과 기존 지도·유효 시간 검사를 따른다. 복원 위치를 새 파티 위치로 재전송하지 않는다.
- 계정 전환 시 위치·레이드·계정별 알림과 이벤트 판별 상태를 초기화한다. 같은 계정의 토큰 갱신이나 연결 복구는 이벤트 판별 상태를 유지한다.

위치 상태 안내 요소에는 진단용 data-location-connection-id, data-location-event-id, data-location-request-id가 있다. 토큰이나 전체 WS URL은 진단 정보에 넣지 않는다.

## 배포

새 백엔드를 먼저 배포한 뒤 프론트를 배포한다. 기존 백엔드에서도 기존 위치·알림 수신과 재연결은 동작하지만 ready 이벤트가 없어 준비 완료 안내로 바뀌지 않는다. 실제 Redis 단절·복구와 운영 프로그램 확인은 배포 후 수행한다.

## 검증

- `node script/check-location-websocket-recovery.cjs`: ready 판정, Redis 복구 상태, keep-alive, 재접속·인증·정리, 중복·순서 처리.
- `script/check-live-map-party.cjs` (Playwright): 실제 브라우저에서 모사 프로그램 위치 전달, 위치 소켓·파티 소켓 복구, 복원 위치 표시, 중복·순서, 복원 위치의 파티 재전송 방지, 여러 탭, 레이드 종료, 계정 전환 및 지도 표시.
- `script/check-live-map-chat-controls.cjs` (Playwright): 모집·파티 채팅과 사용자 메뉴의 회귀 검사.

테스트는 위치·파티 쓰기를 모사하며 운영 DB나 실제 프로그램에 위치를 전송하지 않는다.
