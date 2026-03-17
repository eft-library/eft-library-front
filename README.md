- [EFT Library의 Frontend 운영 방식](#eft-library의-frontend-운영-방식)
  - [주요 사항](#주요-사항)
  - [패키지 정보](#패키지-정보)
  - [구조](#구조)
  - [개발 History](#개발-history)

# EFT Library의 Frontend 운영 방식

EFT Library Frontend는 NextJS 16을 사용하여 구축하였고, FastAPI와 통신하여 데이터를 주고 받습니다.

<img width="1314" height="1275" alt="arch_v4" src="https://github.com/user-attachments/assets/0392b55e-14b0-45d8-9aa6-4b83a9cd640f" />

## 주요 사항

- 회원가입과 로그인의 경우 **NextJS의 next-auth를 사용**합니다. FastAPI와 통신할 때 토큰 정보를 전달해주어야 합니다.
- 가능하면 **FastAPI로 부터 최종 가공되어 바로 사용할 수 있는 데이터**를 가져옵니다.
- 서버의 부하를 줄이기 위해 **ISR의 장점을 최대한 살리려고 노력**했습니다.
- Typescript를 사용하여 최대한 Type이 일치하게 노력했습니다.
- WebSocket을 사용하여 사용자 알림과 외부 프로그램(C# WPF) 연동을 구현합니다.

## 패키지 정보

| 패키지명                        | 버전    | 선정 이유                                                    |
| ------------------------------- | ------- | ------------------------------------------------------------ |
| next                            | 16.1.6  | 최신 App Router 기반 ISR 지원, SEO 대응                      |
| react                           | 19.2.4  | 최신 concurrent 기능 및 성능 개선                            |
| next-auth                       | 4.24.13 | 간편한 인증(OAuth/JWT) 처리                                  |
| tailwindcss                     | 4.2.1   | 유틸리티 기반 빠른 UI 개발                                   |
| @react-three/drei               | 10.7.7  | Three.js 헬퍼 모음, 3D Map 모델링에 사용                     |
| @react-three/fiber              | 9.5.0   | React 기반 3D 렌더링                                         |
| downshift                       | 9.3.2   | 접근성 높은 autocomplete 구현, Nav Menu에 사용               |
| react-leaflet                   | 5.0.0   | React에서 지도 기능 쉽게 구현, 내 위치 찾기 기능 구현에 사용 |
| recharts                        | 3.8.0   | 간단한 데이터 시각화, dashboard, 아이템 시세 그래프에 사용   |
| next-intl                       | 4.8.3   | Next.js 기반 다국어 처리                                     |
| react-infinite-scroll-component | 6.1.1   | 무한 스크롤 UX 구현, 아이템 목록 시세 스크롤에 사용          |
| react-photoswipe-gallery        | 4.0.0   | 이미지 갤러리/라이트박스, 사진 확대에 사용                   |
| @xyflow/react                   | 12.10.1 | 노드 기반 플로우 UI 구성, 퀘스트 로드맵에 사용               |
| zustand                         | 5.0.11  | 가볍고 빠른 상태관리                                         |
| @tanstack/react-query           | 5.90.21 | 서버 상태 캐싱 및 비동기 데이터 관리                         |

## 구조

- **app**
  - **all directory** : 사이트의 페이지들
- **components** : 컴포넌트 모음
  - **custom** : 공통으로 사용되는 컴포넌트들
  - **page** : 화면에 보여지는 컴포넌트들
- **assets** : 사이트에 사용되는 svg, jpg 등 요소들
- **store** : 전역 store 설정 => 새로고침시에도 유지
- **i18n** : 다국어 지원을 위한 설정
- **lib** : api, package 등 관련 설정 및 함수들

## 개발 History

여기에서 확인해 주세요!

[velog 바로가기](https://velog.io/@poeynus/series/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C)
