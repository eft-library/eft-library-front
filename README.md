- [EFT Library의 Frontend 운영 방식](#eft-library의-frontend-운영-방식)
  - [주요 사항](#주요-사항)
  - [패키지 정보](#패키지-정보)
  - [구조](#구조)
  - [개발 History](#개발-history)
    - 🎗️ [폐지된 커뮤니티 기능](https://github.com/eft-library/eft-library-history/blob/main/frontend/community.md)
    - [1. 3번의 Front 마이그레이션](#1-3번의-front-마이그레이션)
    - [2. Next Auth 도입기](#2-next-auth-도입기)
    - [3. Google Adsense, Google Analytics 도입기 및 Google Search Console 수난기](#3-google-adsense-google-analytics-도입기-및-google-search-console-수난기)
    - [4. 3D 지도 성능 높이기 - With ThreeJS](#4-3d-지도-성능-높이기---with-threejs)
    - [5. 다국어 지원을 위하여](#5-다국어-지원을-위하여)

# EFT Library의 Frontend 운영 방식

EFT Library Frontend는 NextJS 15를 사용하여 구축하였고, FastAPI와 통신하여 데이터를 주고 받습니다.

![architecture](https://github.com/user-attachments/assets/0aad4cb2-2a18-48e1-832c-436507af67fd)

## 주요 사항

- 회원가입과 로그인의 경우 **NextJS의 next-auth를 사용**합니다. FastAPI와 통신할 때 토큰 정보를 전달해주어야 합니다.
- 가능하면 **FastAPI로 부터 최종 가공되어 바로 사용할 수 있는 데이터**를 가져옵니다.
- 서버의 부하를 줄이기 위해 **SSG의 장점을 최대한 살리려고 노력**했습니다.
- Typescript를 사용하여 최대한 Type이 일치하게 노력했습니다.

## 패키지 정보

| 패키지명                        | 버전    |
| ------------------------------- | ------- |
| next                            | 15.3.2  |
| react                           | 19.1.0  |
| next-auth                       | 4.24.11 |
| tailwindcss                     | 3.4.1   |
| @react-three/drei               | 10.0.7  |
| @react-three/fiber              | 9.1.2   |
| downshift                       | 9.0.9   |
| react-leaflet                   | 5.0.0   |
| recharts                        | 2.15.3  |
| next-intl                       | 4.1.0   |
| react-infinite-scroll-component | 6.1.0   |
| react-photoswipe-gallery        | 3.1.1   |
| react-zoom-pan-pinch            | 3.7.0   |
| @xyflow/react                   | 12.6.3  |
| zustand                         | 5.0.4   |
| adblock detect react            | 1.3.1   |

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

## 운영 중 발생한 문제 및 해결 과정

### 1. 3번의 Front 마이그레이션

개발 및 인프라 구성 History - 아직 작성중

### 2. Next Auth 도입기

개발 및 인프라 구성 History - 아직 작성중

### 3. Google Adsense, Google Analytics 도입기 및 Google Search Console 수난기

개발 및 인프라 구성 History - 아직 작성중

서치 콘솔은 아직도 해결을 못했음 ㅠㅠ

### 4. 3D 지도 성능 높이기 - With ThreeJS

개발 및 인프라 구성 History - 아직 작성중

### 5. 다국어 지원을 위하여

개발 및 인프라 구성 History - 아직 작성중
