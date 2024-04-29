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
18. npm i downshift
19. npm install prop-types
20. AbortController
21. npm install react-svg-pan-zoom
22. npm install react-quill
23. npm i react-slick
24. npm install slick-carousel
25. npm install react-youtube
26. npm i @react-hook/window-size

## 할 일

abortController
quest 상세 구현
wasd 카메라 이동 구현
2d 적용하기 - 아이템 위치띄우기 까지
지도 클릭 시 bound - https://twitter.com/0xca0a/status/1453807293074661385
아이템 필터 - 리스트에 없는 건 필터에서 없애기
2d 확대, 축소, 드래그 및 좌표 있을때 아이콘 올리는 기능 개발
3d 좌표 찍어서 DB 넣는 법 희재 알려주기
지도 y좌표 높이기
확대 축소 속도 증가
퀘스트 상세 페이지 만들기 - 가이드는 블로그 형태(wyswig)
wasd 가능하게 노력하기
희재 퀘스트 DB 넣는 방법 알려주기

Dev

- 메인 페이지
  - 자동완성 검색
  - 업데이트 소식(자체 번역), 트위터 게시글
  - 2D 지도 blur 처리해서 자동 스크롤 및 버튼으로 이동
  - 네모 상자에 글씨
- 퀘스트 목록 페이지
  - 네모 상자에 NPC사진, 이름 전부 표시
  - NPC들이 주는 퀘스트 목록으로 표시
    - 제목
    - 종류
    - 내용
    - 보상
    - 카파
    - 깨는 방법
- 퀘스트 상세 페이지
  - 제목
  - 종류
  - 내용
  - 보상
  - 카파
  - 깨는 방법(가이드)
- 업데이트 목록 페이지
  - 업데이트 제목
  - 업데이트 내용 줄임말 표시
- 업데이트 상세 페이지
  - 업데이트 내용
- 지도 페이지
  - 2D, 3D
  - 3D WASD로 카메라 시점 이동
  - 아이템 필터, 아이콘 추가
  - 2D, 3D 아이템 아이콘 및 글씨 추가
  - 2D, 3D에서 아이콘 위에 마우스 올리면 퀘스트 정보, 탈출구 이름 표시
- 아이템 목록 페이지
  - 무기
    - 무기 이름
    - 무기 사진
    - 탄약통
    - 발사모드
    - 발사속도
  - 총알
    - 총알 사진
    - 총알 이름
    - 사용 총
  - 방탄모
    - 방탄모 사진
    - 이름
    - 보호 등급
    - 보호 부위
    - 도탄 기회
    - 헤드셋 차단
    - 무게
  - 의료품
    - 의료템 사진
    - 이름
    - 버프
    - 디버프
  - 컨테이너
    - 컨테이너 사진
    - 이름
    - 컨테이너 총 슬롯(내부)
    - 들어갈 수 있는 품목
  - 전술 조끼
    - 조끼 사진
    - 이름
    - 슬롯크기
    - 보호 클래스
    - 보호 부위
    - 기본 플레이트
    - 플레이트 보호 등급
    - 이동 속도
    - 회전 속도
    - 인체 공학
    - 무게
  - 방탄 조끼
    - 갑바 사진
    - 갑바 이름
    - 갑바 클래스
    - 보호 부위
    - 기본 플레이트
    - 플레이트 보호 등급
    - 이동 속도
    - 회전 속도
    - 인체 공학
    - 무게
  - 헤드셋
    - 헤드셋 사진
    - 헤드셋 이름
  - 가방
    - 가방 사진
    - 가방 이름
    - 가방 안 크기 (ex. 6)
    - 가방 안 슬롯 (ex. 3 x 2)
    - 가방 크기 (ex. 3 x 3)
    - 판매처
    - 이동 속도
    - 회전 속도
    - 인체 공학
    - 무게
  - 키
    - 키 사진
    - 키 이름
    - 퀘스트 사용 유무
    - 맵 사용처
- 아이템 상세 페이지
  - ?
- 보스 목록 페이지
  - 피통
  - 스폰 확률
  - 부하(호위대) 수
  - 부하 피통
- 하이드아웃 정보 페이지
  - 시설 Level
  - 시설 건설 요구 사항(단계별 필요 아이템)
  - 효과
  - 건설 시간

부가 개발

> 1. 데이터 캐시
> 2. 단위 테스트
> 3. 성능 최적화
> 4. 전역 상태관리, 새로고침 대응 - useContext
> 5. AbortController 적용
> 6. react-quill
> 7. react-svg-pan-zoom
