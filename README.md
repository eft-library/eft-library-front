# EFT Library의 Frontend 운영 방식

EFT Library Frontend는 NextJS 15를 사용하여 구축하였고, FastAPI와 통신하여 데이터를 주고 받는다.

이 페이지는 Frontend에 대하여 설명한다.

사진

## 주요 사항

- 회원가입과 로그인의 경우 **NextJS의 next-auth를 사용**한다. FastAPI와 통신할 때 토큰 정보를 전달해주어야 한다.
- 가능하면 FastAPI로 부터 가공된 데이터를 가져온다.
- 서버의 부하를 줄이기 위해 SSG의 장점을 최대한 살리자.
- typescript를 사용한다.

## 환경

- Rocky Linux 8
- Node 22.9.0

## 구조

- **api**
  - **boss** : 보스 API

## 운영 중 발생한 문제 및 해결 과정

### 1. 12

123

**✔ 해결:**

- 123
