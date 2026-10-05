# 라이브 맵 채팅 백엔드 구현 계획

> 정책 확정: 2026-10-03. 초대는 방장만 가능하며, 채팅 제재 중에도 읽기를 허용한다. 차단은 내가 차단한 상대의 메시지를 나에게만 숨긴다. 표시 정보는 닉네임만 사용하고 이메일·프로필 사진은 제공하지 않는다. 공개 UUID는 초대·차단 식별용이다. 구현 기준 연동 계약은 [V3 최종 연동 문서](./live-map-chat-v3-api.ko.md)를 따른다.

## 1. 목적

라이브 맵에 다음 두 종류의 실시간 채팅을 추가한다.

1. `lobby`: 파티 모집과 사용자 간 초대에 사용하는 전체 채팅
2. `party`: 현재 참여 중인 파티원 전용 채팅

비로그인 사용자도 모집(lobby) 채팅의 과거 메시지와 실시간 메시지를 읽을 수 있다. 메시지 작성과 파티 채팅 조회·초대·차단·신고는 로그인 및 사이트 계정 등록이 필요하다.

## 2. 기본 원칙

- 채팅은 기존 파티 WebSocket과 분리한다.
- 지도·층 전환과 관계없이 채팅 연결을 유지한다.
- 닉네임과 권한은 인증 정보와 DB에서 조회한다. 이메일과 프로필 이미지는 응답·이벤트에 포함하지 않는다.
- 클라이언트가 전송한 사용자 정보나 파티 권한을 신뢰하지 않는다.
- 메시지는 일반 텍스트로 처리하고 HTML·스크립트를 허용하지 않는다.
- 서버가 모든 채널 접근 권한을 검증한다.
- 파티 비밀번호는 채팅 명령·이벤트·초대 API에 포함하지 않는다.
- 공개 채팅 메시지를 보는 것만으로 파티에 참가할 수 없으며, 지정된 초대 대상만 초대를 수락할 수 있다.

## 3. 채널

### 3.1 모집 채팅

채널 식별자는 `lobby`다.

- 비로그인 사용자도 읽을 수 있으며, 메시지 작성은 로그인한 등록 사용자만 가능하다.
- 파티 모집을 포함한 일반 텍스트 메시지를 작성할 수 있다.
- 현재 파티의 방장은 메시지 작성자의 닉네임을 눌러 해당 사용자에게 파티 초대를 보낼 수 있다.
- 모집 글 자체에는 파티 입장 버튼, 비밀번호 또는 공개 초대 링크를 포함하지 않는다.

### 3.2 파티 채팅

채널 식별자는 `party:{room_id}`다.

- 해당 파티에 현재 참여 중인 사용자만 조회·전송할 수 있다.
- 서버는 메시지 조회와 전송 시점마다 참여 상태를 검사한다.
- 퇴장·강퇴·자동 퇴장·방 종료 시 채널 접근을 즉시 차단한다.
- 방장 양도는 채팅 접근 권한에 영향을 주지 않는다.

## 4. WebSocket

채팅 전용 WebSocket 엔드포인트를 추가한다.

```text
/api/live-map/v3/chat/ws
```

로그인 사용자는 연결 후 첫 메시지로 인증한다. 비로그인 사용자는 `{"type":"guest"}`를 보내 모집 채팅 읽기 전용으로 연결한다. 게스트 snapshot은 `user=null`, 파티 메시지·초대는 빈 배열이다.

```json
{
  "type": "auth",
  "token": "access token"
}
```

인증 성공 후 서버는 최근 메시지를 포함한 snapshot을 전송한다.

```json
{
  "type": "snapshot",
  "event_id": "UUID",
  "server_time": "ISO-8601",
  "data": {
    "lobby": [],
    "party": [],
    "party_room_id": "UUID 또는 null",
    "party_invitations": [],
    "heartbeat_interval_seconds": 30
  }
}
```

snapshot의 파티 메시지는 인증 사용자가 현재 참여 중인 방의 메시지만 포함한다.

## 5. 메시지 전송

### 5.1 모집 메시지

```json
{
  "type": "send_message",
  "channel": "lobby",
  "message": "같이 하실 분 구합니다.",
  "request_id": "UUID"
}
```

### 5.2 파티 메시지

```json
{
  "type": "send_message",
  "channel": "party",
  "room_id": "파티 UUID",
  "message": "3층으로 이동할게요.",
  "request_id": "UUID"
}
```

## 6. 메시지 이벤트

```json
{
  "type": "chat_message",
  "event_id": "UUID",
  "server_time": "ISO-8601",
  "data": {
    "id": "메시지 UUID",
    "channel": "lobby",
    "room_id": null,
    "user": {
      "id": "사용자 UUID",
      "nickname": "닉네임"
    },
    "message": "같이 하실 분 구합니다.",
    "create_time": "ISO-8601"
  }
}
```

## 7. 사용자 지정 파티 초대

공개 모집 글을 본 방장이 메시지 작성자의 닉네임을 누르고 `파티 초대`를 선택한다. 초대는 해당 사용자에게만 발급하며 공개 채팅에는 초대 사실이나 참가 버튼을 방송하지 않는다.

초대 생성:

```text
POST /api/live-map/v3/party-invitations
```

```json
{
  "room_id": "파티 UUID",
  "invitee_user_id": "초대 대상 사용자 UUID"
}
```

서버는 다음 조건을 검사한다.

- 초대자와 대상 모두 로그인한 등록 사용자여야 한다.
- 초대자는 해당 파티의 현재 방장이어야 한다.
- 초대 생성은 방장만 허용한다. 일반 파티원의 초대 생성 요청은 거절한다.
- 자기 자신, 이미 참여 중인 사용자, 해당 방에서 강퇴된 사용자는 초대할 수 없다.
- 다른 파티에 참여 중인 사용자에게는 초대를 생성하지 않는다.
- 같은 방과 같은 대상에 대한 활성 초대는 하나만 유지한다.
- 방이 종료됐거나 입장이 잠긴 경우 초대를 생성할 수 없다.
- 생성 시점에 정원이 찬 방은 초대할 수 없다.

초대 생성 응답에는 파티 비밀번호나 재사용 가능한 입장 토큰을 포함하지 않는다.

```json
{
  "status": 201,
  "msg": "PARTY_INVITATION_CREATED",
  "data": {
    "id": "초대 UUID",
    "room_id": "파티 UUID",
    "inviter": {
      "id": "사용자 UUID",
      "nickname": "닉네임"
    },
    "invitee_user_id": "초대 대상 사용자 UUID",
    "expires_at": "ISO-8601"
  }
}
```

초대받은 사용자에게는 채팅 WebSocket으로 개인 이벤트를 전송한다.

```json
{
  "type": "party_invitation_created",
  "event_id": "UUID",
  "server_time": "ISO-8601",
  "data": {
    "invitation_id": "초대 UUID",
    "expires_at": "ISO-8601",
    "inviter": {
      "id": "사용자 UUID",
      "nickname": "닉네임"
    },
    "party": {
      "id": "파티 UUID",
      "name": "파티 이름",
      "member_count": 2,
      "max_members": 5,
      "is_locked": false,
      "closed": false
    }
  }
}
```

재접속 시 놓친 초대를 복원할 수 있도록 활성 초대 목록을 snapshot에 포함하거나 다음 REST API를 제공한다.

```text
GET /api/live-map/v3/party-invitations?status=pending
```

프론트는 초대받은 방을 기존 방 목록 상단에 표시하고 `초대받음` 상태와 `참가` 버튼을 강조한다. 파티 패널이 닫혀 있으면 파티 버튼에 새 초대 표시를 제공한다.

초대 수락:

```text
POST /api/live-map/v3/party-invitations/{invitation_id}/accept
```

- 서버는 요청자가 초대 대상과 같은 사용자인지 검사한다.
- 수락 시점에 초대 유효기간, 방 종료·잠금·정원, 강퇴 여부를 다시 검사한다.
- 수락 시점에 대상이 다른 파티에 참여 중이면 입장을 거절한다.
- 유효하면 비밀번호 확인 없이 기존 파티 참여 트랜잭션으로 입장시킨다.
- 입장 후 기존 파티 snapshot과 멤버 변경 이벤트를 그대로 사용한다.
- 한 번 수락한 초대는 다시 사용할 수 없다.

초대 거절과 초대자 취소:

```text
POST /api/live-map/v3/party-invitations/{invitation_id}/reject
DELETE /api/live-map/v3/party-invitations/{invitation_id}
```

- 거절은 초대 대상만, 취소는 초대한 사용자 또는 방장만 가능하다.
- 초대는 기본 10분 후 만료한다.
- 대상의 참가·거절, 초대 취소, 방 종료, 정원 도달 시 관련 사용자에게 `party_invitation_updated` 이벤트를 전송한다.
- 상태는 `pending`, `accepted`, `rejected`, `revoked`, `expired`로 구분한다.

권장 오류 코드는 다음과 같다.

- `PARTY_INVITATION_NOT_FOUND`
- `PARTY_INVITATION_EXPIRED`
- `PARTY_INVITATION_FORBIDDEN`
- `PARTY_INVITATION_ALREADY_HANDLED`
- `PARTY_INVITATION_DUPLICATED`
- `PARTY_ROOM_CLOSED`
- `PARTY_ROOM_LOCKED`
- `PARTY_ROOM_FULL`
- `PARTY_MEMBER_KICKED`

## 8. 초대 대상 방 상태 갱신

활성 초대가 있는 방에는 다음 상태를 제공한다.

- 현재 인원과 최대 인원
- 입장 잠금 여부
- 입장 가능 여부
- 방 종료 여부

파티 이름·인원·잠금·정원·종료 상태가 변경되면 해당 방의 활성 초대를 받은 사용자에게만 갱신 이벤트를 전송한다.

```json
{
  "type": "party_invitation_updated",
  "event_id": "UUID",
  "server_time": "ISO-8601",
  "data": {
    "invitation_id": "초대 UUID",
    "status": "pending",
    "party": {
      "id": "파티 UUID",
      "name": "야간 퀘스트 파티",
      "member_count": 5,
      "max_members": 5,
      "is_locked": false,
      "closed": false
    }
  }
}
```

방이 종료되거나 초대가 더는 유효하지 않으면 변경된 초대 상태도 함께 제공한다.

## 9. 최근 메시지 조회

재접속과 이전 메시지 조회를 위한 REST API를 제공한다.

```text
GET /api/live-map/v3/chat/messages
```

모집 채팅 조회:

```text
?channel=lobby&before=cursor&limit=50
```

파티 채팅 조회:

```text
?channel=party&room_id=파티UUID&before=cursor&limit=50
```

응답 예시:

```json
{
  "status": 200,
  "msg": "OK",
  "data": {
    "messages": [],
    "next_before": "cursor 또는 null"
  }
}
```

- 기본 limit는 50, 최대 limit는 100으로 한다.
- 메시지 정렬 방향과 cursor 규칙은 최종 문서에 명시한다.
- 파티 메시지 조회 시 현재 참여 상태를 검사한다.

## 10. 메시지 제한

- 메시지 최대 길이: 300자
- 공백만 있는 메시지 거절
- 사용자별 전송 속도 제한
- 권장 제한: 5초당 5개, 1분당 30개
- 모집 채팅에만 같은 사용자의 동일 본문 30초 반복 전송 제한 적용 (앞뒤 공백 제거 후 완전 일치)
- 파티 채팅의 동일 본문 반복 및 모집·파티 간 동일 본문 전송은 허용. 일반 전송 속도 제한과 request_id 중복 방지는 유지
- `request_id`를 이용한 중복 저장·방송 방지

오류 예시:

```json
{
  "type": "error",
  "status": 429,
  "msg": "CHAT_RATE_LIMITED",
  "retry_after": 5
}
```

## 11. 재접속

- 프론트는 네트워크 종료 시 지수 백오프로 재접속한다.
- 재접속 후 로그인 사용자는 auth, 비로그인 사용자는 guest 메시지를 보내 snapshot을 받는다.
- snapshot 이후 누락 메시지를 복원할 cursor 또는 메시지 ID를 제공한다.
- 동일 `request_id`의 메시지는 한 번만 저장하고 방송한다.
- 참여 파티가 바뀌면 snapshot의 파티 채널도 현재 방으로 변경한다.
- heartbeat와 연결 종료 코드의 최종 규칙을 문서화한다.

## 12. 차단

```text
POST /api/live-map/v3/chat/blocks/{user_id}
DELETE /api/live-map/v3/chat/blocks/{user_id}
GET /api/live-map/v3/chat/blocks
```

- 자기 자신은 차단할 수 없다.
- 차단한 사용자의 메시지는 REST 조회와 실시간 방송 결과에서 제외한다.
- 차단은 단방향이다. 내가 차단한 상대의 메시지만 내 REST 조회·실시간 방송에서 제외한다. 상대방의 조회에는 영향을 주지 않는다.

## 13. 신고

```text
POST /api/live-map/v3/chat/messages/{message_id}/report
```

```json
{
  "reason": "spam",
  "detail": "반복적인 파티 홍보"
}
```

신고 사유:

- `spam`
- `abuse`
- `inappropriate`
- `personal_info`
- `other`

동일 사용자의 동일 메시지 중복 신고를 방지한다.

## 14. 관리자 기능

- 메시지 삭제
- 사용자 채팅 일시 제한
- 사용자 채팅 영구 제한
- 신고 목록 조회
- 제한 해제

메시지 삭제 이벤트:

```json
{
  "type": "message_deleted",
  "event_id": "UUID",
  "server_time": "ISO-8601",
  "data": {
    "message_id": "UUID",
    "channel": "lobby",
    "room_id": null
  }
}
```

채팅 제한 중에도 메시지 읽기는 허용한다. 일시·영구 제한은 새 메시지 전송에만 적용한다.

## 15. 보관 정책

초기 권장안:

- PostgreSQL에 메시지 저장
- PostgreSQL에 초대자·대상·방·상태·만료 시간을 저장
- 최근 메시지 조회는 PostgreSQL 인덱스를 사용한다. Redis는 전송 속도 제한과 실시간 알림에 사용하며 메시지 본문을 캐시하지 않는다 (최종 구현 정책).
- 모집 채팅 보관 기간: 24시간
- 파티 채팅 보관 기간: 방 종료 후 24시간
- 만료 데이터는 주기적으로 삭제
- 관리자 삭제 메시지는 soft delete 또는 본문 제거 처리
- 활성 초대는 `(room_id, invitee_user_id)` 조합으로 중복되지 않게 제한하고, 만료된 초대는 주기적으로 정리

## 16. 프론트 UI 전제

- 하나의 채팅 패널에서 `모집`과 `파티` 탭을 제공한다. 비로그인 사용자는 모집 읽기만 가능하고 입력창에는 로그인 안내를 표시한다. 로그인/로그아웃 시 채팅 연결을 다시 맺는다.
- 파티가 없으면 파티 탭을 비활성화한다.
- 탭별 읽지 않은 메시지 수를 표시한다.
- 공개 채팅 메시지의 닉네임 메뉴에서 `파티 초대`를 선택할 수 있다.
- 초대자는 현재 방장인 파티로만 사용자를 초대할 수 있다. 일반 파티원에게 초대 메뉴를 표시하지 않는다.
- 초대받은 방은 방 목록 상단에 `초대받음` 상태로 강조한다.
- 초대 대상이 `참가`를 누르면 비밀번호 입력 없이 해당 방에 입장한다.
- 공개 채팅에는 초대 여부, 파티 비밀번호, 누구나 누를 수 있는 참가 버튼을 표시하지 않는다.
- 지도 전환 후에도 채팅 연결과 메시지를 유지한다.

## 17. 최종 연동 문서에 필요한 내용

백엔드 구현 후 다음 내용을 제공한다.

- 최종 WebSocket URL과 인증 방식
- 전체 명령·이벤트 스키마
- heartbeat, 연결 종료 코드, 재접속 정책
- snapshot과 누락 메시지 복원 규칙
- 메시지 정렬과 cursor 규칙
- rate limit과 `retry_after`
- REST API 요청·응답
- 차단·신고·관리자 API
- 파티 초대 생성·조회·수락·거절·취소 API
- 파티 초대 개인 이벤트와 snapshot 복원 규칙
- 실제 오류 코드 목록
- OpenAPI 반영 여부
- PostgreSQL·Redis 마이그레이션 및 배포 순서

## 18. 구현 순서

1. 채팅 테이블과 보관 정책 구현
2. 최근 메시지 REST API 구현
3. 채팅 WebSocket 인증과 모집 채널 구현
4. 파티 참여 권한과 파티 채널 구현
5. 재접속, heartbeat, 중복 방지 구현
6. 사용자 지정 파티 초대와 상태 갱신 구현
7. 전송 제한 구현
8. 차단·신고·관리자 기능 구현
9. PostgreSQL·Redis 통합 테스트
10. 최종 프론트 연동 문서 작성

## 19. 필수 검증 항목

- 비로그인 모집 조회·수신 허용, 파티 조회·메시지 전송·개인 초대 접근 차단
- 잘못된 인증 또는 미등록 계정은 게스트로 자동 전환하지 않고 거절
- 모집 채팅 양방향 메시지 전달과 재접속 복원
- 파티 참여자만 파티 채팅 조회·전송 가능
- 퇴장·강퇴·자동 퇴장·방 종료 직후 파티 채팅 차단
- 공개 채팅과 초대 API에서 파티 비밀번호 미노출
- 지정된 대상 외 사용자의 초대 조회·수락 차단
- 초대 수락 시 비밀번호 없이 정상 입장
- 초대 만료·거절·취소·중복·재사용 처리
- 방 종료·잠금·정원·강퇴 상태에서 초대 생성 또는 수락 차단
- 재접속 후 활성 초대 복원
- 초대받은 방의 인원·잠금·종료 상태 갱신
- `request_id` 중복 메시지 방지
- 전송 속도 제한과 `retry_after`
- 차단 사용자의 메시지 조회·방송 제외
- 신고 중복 방지와 관리자 삭제 방송
- 메시지 보관 기간 만료 처리

## 20. 운영 배포와 하위 호환

신규 채팅·초대 백엔드는 프론트보다 먼저 운영에 배포할 수 있어야 한다. 기존 위치·파티 기능을 그대로 유지한 상태에서 신규 API, WebSocket, 이벤트와 저장소를 추가하는 방식으로 구현한다.

백엔드 선배포 시 다음 조건을 지킨다.

- 기존 위치 수신 API와 `send_location` 처리 흐름을 유지한다.
- 기존 파티 REST API, WebSocket URL과 인증 방식을 유지한다.
- 기존 `position`, `view_map`, `snapshot`, 마커 이벤트의 필드 이름과 타입을 변경하거나 제거하지 않는다.
- 기존 이벤트에 새 필드를 추가할 수 있지만 기존 클라이언트가 이를 무시해도 정상 동작해야 한다.
- 기존 프론트가 채팅 WebSocket에 연결하거나 신규 명령을 전송하지 않아도 위치·파티 기능이 정상 동작해야 한다.
- 신규 DB 마이그레이션은 기존 위치·파티 데이터를 변경하지 않으며, 운영 요청을 장시간 차단하지 않게 구성한다.
- 호환 기간에는 기존 엔드포인트와 신규 엔드포인트를 함께 운영한다.

권장 배포 순서는 다음과 같다.

1. 기존 동작을 유지하는 DB 마이그레이션과 신규 백엔드를 배포한다.
2. 기존 운영 프론트에서 로그인, 내 위치 표시, 파티 연결, 위치·방향 공유와 마커 공유를 확인한다.
3. 운영에 배포된 실제 API와 WebSocket을 기준으로 신규 프론트를 개발하고 검증한다.
4. 신규 프론트를 배포한 뒤 서버 오류와 기존 엔드포인트 사용량을 관찰한다.
5. 캐시되거나 장시간 열려 있는 이전 프론트 사용을 고려해 호환 기간을 유지한다.
6. 서버 로그와 지표에서 레거시 호출이 더 이상 없음을 확인한 뒤 레거시를 제거한다.

레거시 제거는 신규 프론트 배포 완료만으로 결정하지 않는다. 제거 대상, 종료 예정일과 대체 API를 먼저 명시하고, 실제 호출이 남아 있으면 호환 기간을 연장한다. 레거시 제거는 채팅·초대 기능의 최초 운영 배포와 분리된 후속 작업으로 진행한다.
