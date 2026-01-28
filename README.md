- [EFT Library의 Frontend 운영 방식](#eft-library의-frontend-운영-방식)
  - [주요 사항](#주요-사항)
  - [패키지 정보](#패키지-정보)
  - [구조](#구조)
  - [개발 History](#개발-history)

# EFT Library의 Frontend 운영 방식

EFT Library Frontend는 NextJS 16을 사용하여 구축하였고, FastAPI와 통신하여 데이터를 주고 받습니다.

<img width="1923" height="1366" alt="last" src="https://github.com/user-attachments/assets/3a17adc2-e80b-4042-93fa-dda30bbaf947" />

## 주요 사항

- 회원가입과 로그인의 경우 **NextJS의 next-auth를 사용**합니다. FastAPI와 통신할 때 토큰 정보를 전달해주어야 합니다.
- 가능하면 **FastAPI로 부터 최종 가공되어 바로 사용할 수 있는 데이터**를 가져옵니다.
- 서버의 부하를 줄이기 위해 **SSG의 장점을 최대한 살리려고 노력**했습니다.
- Typescript를 사용하여 최대한 Type이 일치하게 노력했습니다.
- WebSocket을 사용하여 사용자 알림을 구현합니다.

## 패키지 정보

| 패키지명                        | 버전    |
| ------------------------------- | ------- |
| next                            | 16.0.7  |
| react                           | 19.2.1  |
| next-auth                       | 4.24.13 |
| tailwindcss                     | 4.1.17  |
| @react-three/drei               | 10.7.7  |
| @react-three/fiber              | 9.4.2   |
| downshift                       | 9.0.12  |
| react-leaflet                   | 5.0.0   |
| recharts                        | 3.5.1   |
| next-intl                       | 4.5.8   |
| react-infinite-scroll-component | 6.1.1   |
| react-photoswipe-gallery        | 4.0.0   |
| @xyflow/react                   | 12.10.0 |
| zustand                         | 5.0.9   |

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

- [디자인 리뉴얼 이슈 및 요청](https://github.com/eft-library/eft-library-history/blob/main/frontend/design.md)
- [로드맵 - 최고의 컨텐츠](https://github.com/eft-library/eft-library-history/blob/main/frontend/roadmap.md)
- [다국어 지원을 위하여](https://github.com/eft-library/eft-library-history/blob/main/frontend/i18n.md)
- [3D Map 도입 및 성능 개선 과정](https://github.com/eft-library/eft-library-history/blob/main/frontend/3dmap.md)
- [Analytics, Search Console, AdSense 도입기 및 경험 공유](https://github.com/eft-library/eft-library-history/blob/main/frontend/google.md)
- [NextAuth 도입기 – 프론트 중심 인증 경험](https://github.com/eft-library/eft-library-history/blob/main/frontend/auth.md)
- [프론트엔드 개발 비하인드 – 3번의 마이그레이션 여정](https://github.com/eft-library/eft-library-history/blob/main/frontend//migration.md)
- [사이트 통계 대시보드 개발기](https://github.com/eft-library/eft-library-history/blob/main/frontend/dashboard.md)
- [미니게임 - 칸성비 운빨 망겜 개발기](https://github.com/eft-library/eft-library-history/blob/main/frontend/minigame-rng-item.md)
