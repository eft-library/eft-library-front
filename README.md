# 구조

## 사용할 것

https://codepen.io/AdamJames93/pen/rNMKxer

1. node 20.12.0
2. react
3. @react-three/drei - 3D present
4. eslint
5. preetier
6. csr
7. chakra ui - design
8. axios - react => fastapi
9. usestate, usecontext - 상태관리
10. react-query - 캐시와 데이터 최신화 => 필요하면 도입
11. react-query-auth - 회원 가입이 생기면 도입
12. react-hook-from - 사용자 입력 받는 form이 생기면 도입하자
13. react-router-dom
14. api error는 state로 관리 기본 형태를 state로 가져오고 message만 변경하여 표출
15. app error는 error boundary 사용하기
16. jest - 테스트
17. npm install react-router-dom
18. npm install react-loading-skeleton
19. npm install http-server -g

## 할 일

> 우선 순위 순서

페이지 경로 수정하기 - 대분류 컴포넌트 만들고, 하위 컴포넌트만 여러개
https://white120.tistory.com/94
Map, Quest, Item, Info

topnavi 색 변경 및 투명하게 만들기

기존 기숙사 가,나 에 지도 이름으로 전부 변경하기

기숙사 가,나 위치 옮기기 - 전체적으로 3d가 있을 경우 조회 하게 변경

svg 아이콘 적용하기
item filter에 value 추가 해야 함 => svg_value
DynamicSvg 생성 => componentName에 value 넣고 해당 하는 값 return

메뉴 수정하기 - 시안대로

---

지도

- 세관 Custom
- 등대 LightHouse
- 산림 Woods
- 해안선 Shoreline
- 팩토리 Factory
- 리저브 Reserve
- 연구소 The Lab
- 인터체인지 Interchange
- 그라운드 제로 Ground Zero
- 타르포크 시내 Street of Tarkov

퀘스트

- 프라퍼 Prapor
- 테라피스트 Therapist
- 펜스 Fence
- 스키어 Skier
- 피스키퍼 Peacekeeper
- 메카닉 Mechanic
- 레그맨 Ragman
- 예거 Jaeger
- 등대지기 Lightkeeper

아이템

- 무기 Weapon
- 총알 Ammo
- 방탄모 Head Wear
- 의료품 Medical
- 컨테이너 Container
- 전술 조끼 Rig
- 방탄 조끼 Vest
- 키 Key
- 헤드셋 Headset
- 가방 Bag

정보

- 하이드 아웃 Hideout
- 보스 Boss
