
# 구조

src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features          # feature based modules
    +-- awseomefeature  # example
        |
        +-- api         # exported API request declarations and api hooks related to a specific feature
        |
        +-- assets      # assets folder can contain all the static files for a specific feature
        |
        +-- components  # components scoped to a specific feature
        |
        +-- hooks       # hooks scoped to a specific feature
        |
        +-- routes      # route components for a specific feature pages
        |
        +-- stores      # state stores for a specific feature
        |
        +-- types       # typescript types for TS specific feature domain
        |
        +-- utils       # utility functions for a specific feature
        |
        +-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions


node 20.12.0
react
@react-three/drei - 3D present
eslint
preetier
csr
chakra ui - design
Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications. - Chakra UI (chakra-ui.com)
axios - react => fastapi
usestate, usecontext - 상태관리
react-query - 캐시와 데이터 최신화 => 필요하면 도입
react-query-auth - 회원 가입이 생기면 도입
react-hook-from - 사용자 입력 받는 form이 생기면 도입하자
react-router-dom
api error는 state로 관리 기본 형태를 state로 가져오고 message만 변경하여 표출
app error는 error boundary 사용하기
React의 Error Boundary를 이용하여 효과적으로 에러 처리하기 | 카카오엔터테인먼트 FE 기술블로그 (kakaoent.com)
jest - 테스트