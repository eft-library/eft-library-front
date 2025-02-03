# EFT Library의 Frontend 운영 방식 (작성중)

EFT Library Frontend는 NextJS 15를 사용하여 구축하였고, FastAPI와 통신하여 데이터를 주고 받는다.

이 페이지는 Frontend에 대하여 설명한다.

![front](https://github.com/user-attachments/assets/165161a3-35c1-4cc4-a048-de5cda87adf1)

## 주요 사항

- 회원가입과 로그인의 경우 **NextJS의 next-auth를 사용**한다. FastAPI와 통신할 때 토큰 정보를 전달해주어야 한다.
- 가능하면 FastAPI로 부터 가공된 데이터를 가져온다.
- 서버의 부하를 줄이기 위해 SSG의 장점을 최대한 살리자.
- typescript를 사용한다.

## 환경

- Rocky Linux 8
- Node 22.9.0
- NextJS 15.1.3
- React 19.0.0
- Next Auth 4.24.11
- TailwindCSS 3.4.1
- three 0.172.0
- downshift 9.0.8
- react slick 0.30.3
- slick carousel 1.8.1
- react photoswipe gallery 3.0.2
- react zoom pan pinch 3.6.1
- @xyflow/react 12.3.6
- shadcn
- zustand 5.0.2
- adblock detect react 1.3.1

## 구조

- **app**
  - **directory** : 사이트의 페이지들
- **components** : 컴포넌트 모음
  - **custom** : 공통으로 사용되는 컴포넌트들 모음
  - **page** : 화면에 보여지는 페이지 정의
- **assets** : 사이트에 사용되는 svg, jpg 등 요소들
- **store** : 전역 store 설정 => 새로고침시에도 유지

## 운영 중 발생한 문제 및 해결 과정

### 1. 12

123

**✔ 해결:**

- 123
