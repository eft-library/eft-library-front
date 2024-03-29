
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