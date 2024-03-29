[[_TOC_]]

# 구조

## 사용할 것
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

## 디렉토리 구조

```
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
```

