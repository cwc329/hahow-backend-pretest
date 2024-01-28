# Hahow Backend Pretest

[Reference](./docs/hahowHero.md)

## How To Start Service

### Set up

1. prepare .env file

```shell
cp .env.example .env # copy example file

vim .env # edit .env file, provide third api urls
```

2. prepare dependencies

```shell
yarn install # install dependencies
yarn build   # build project with typescript
```

### Start service

There are two ways to start service.

1. use yarn

```shell
yarn start   # start service
```

2. use docker

```shell
PROJECT_TAG=hahow-pretest:test
docker build --tag ${PROJECT_TAG} ./
docker run \
  -p 3000:3000 --env-file .env \
  --name hahow-backend-pretest \
  -d ${PROJECT_TAG}
```

## How To Develop

1. prepare .env file

```shell
cp .env.example .env # copy example file

vim .env # edit .env file
```

2. prepare dependencies

```shell
yarn install
```

3. start service in dev mode

```shell
yarn dev        # start in dev mode
yarn dev:debug  # start in debug mode
```

4. test project

```shell
yarn test             # run unit rests
yarn test:coverage    # run coverage report of units tests
yarn test:integration # run integration tests
```

## Project Structure

```
.
├── docs                            # Documents
│   └── index.yaml                  # Api server openAPI doc
├── README.md
├── src                             # Source code
│   ├── apiRequests                 # Api request instances
│   ├── configs                     # Configs for service
│   ├── controllers                 # Service controllers
│   ├── enums                       # Enums
│   ├── middlewares                 # Service middlewares
│   ├── routes                      # Server routes
│   ├── utils                       # Shared util functions
│   └── ...
├── integrationTests                # Integration tests
│   └── ...
├── tests                           # Tests
│   └── ...                         # File structure mirrored to ../src for better reading and maintainence
├── .env.example                    # .env file template for local development
├── Dockerfile                      # Docker build file for the service
├── tsconfig.json                   # TypeScript config
├── jest.base.config.js             # Base config for jest
├── jest.config.js                  # Config for unit tests
├── jest.integration.config.js      # Config for integration tests
├── jest-setup-file.ts              # Setup file for unit tests
├── jest-integration-setup-file.ts  # Setup file for integration tests
├── package.json
└── yarn.lock
```

## Third Party Libraries

### Dependencies

| Library         | Intro                                        | Usage                                 |
|-----------------|----------------------------------------------|---------------------------------------|
| ajv             | Library for runtime schema validation        | Validate third api responses          |
| axios           | HTTP client                                  | Send HTTP requests                    |
| class-validator | Decorator validator for classes              | Validate incoming payloads            |
| dotenv          | Loads environment variables from a .env file | Load envs from .env                   |
| express         | Node.js web framework                        | Build light weight nodejs http server |
| morgan          | HTTP request logger middleware for node.js   | Log incoming http requests            |
| winston         | Flexible and extensible logger library       | Create logger for universal usage     |

### DevDependencies

| Library                          | Intro                                                                              | Usage                                                                                      |
|----------------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| @swc/core                        | TS/JS compiler written in Rust                                                     | Speed up TS compilation                                                                    |
| @swc/jest                        | swc for jest                                                                       | Speed up jest                                                                              |
| @types/express                   | Type definitions for express                                                       | Use type declaration to catch potential errors while developing                            |
| @types/jest                      | Type definitions for jest                                                          | Use type declaration to catch potential errors while developing                            |
| @types/morgan                    | Type definitions for morgan                                                        | Use type declaration to catch potential errors while developing                            |
| @types/node                      | Type definitions for nodejs                                                        | Use type declaration to catch potential errors while developing                            |
| @typescript-eslint/eslint-plugin | ESLint plugin which provides lint rules for TS codebases                           | Enable ESLint with TS                                                                      |
| @typescript-eslint/parser        | ESLint parser allow ESLint to lint TS code                                         | Enable ESLint with TS                                                                      |
| eslint                           | Code quality assurance tool                                                        | Identify code errors early and provide code style rules                                    |
| eslint-config-airbnb-base        | Basic ESLint rules used by airbnb                                                  | Saving time setting up ESLint rules                                                        |
| eslint-config-airbnb-typescript  | TS ESLint rules used by airbnb                                                     | Saving time setting up ESLint rules                                                        |
| eslint-plugin-import             | ESLint plugin regarding rules for imports                                          | Saving time setting up ESLint rules                                                        |
| husky                            | Git hook for linting                                                               | Attach linting hook before every commit                                                    |
| jest                             | Test framework                                                                     | Write unit tests and integration tests                                                     |
| lint-staged                      | Linting tool to narrow down files to be linted                                     | Just lint files staged in Git when Git hook triggered                                      |
| nock                             | HTTP server mocking and expectations library for Node.js                           | Mock third party API in integration test                                                   |
| node-mocks-http                  | Mock 'http' objects for testing                                                    | Mock req, res objects in unit tests                                                        |
| nodemon                          | Automatically restart the node application when file changes                       | For better development experience                                                          |
| supertest                        | Provide a high-level abstraction for testing HTTP                                  | Use it to do integration tests                                                             |
| swagger-ui-watcher               | Detects changes in Swagger files and reload Swagger UI                             | Start Swagger ui locally                                                                   |
| ts-jest                          | A Jest transformer with source map support allows jest to test TS project          | Solely used to parse ts internal modules in jest, other functions are replaced by swc/jest |
| ts-node                          | TypeScript execution and REPL for node.js, with source map and native ESM support. | Use it with nodemon to provide better development experience                               |
| typescript                       | Javascript with types.                                                             | Build application in type-safe way                                                         |

## Difficulties and Solutions

### jest module resolve

My first time running test in CI/CD environment threw errors regarding module resolutions.

This did not happen to me because I had built code locally.

I use utils `pathsToModuleNameMapper` provided by ts-jest to register internal path aliases in jest config from
tsconfig.

### jest mocks

I first encountered mock issues while writing unit test.

For the sake of module isolation, I needed to mock `axios`.

However, I failed on my first try because I mocked the wrong method in axios instance.
As a result, unit tests still make real http requests.
After spending time researching,
I found out that I needed to mock implementation of `create` method make it return a mock instance.
After some refactor, I managed to write my own axios mock then make it importable for all unit test files.

Mock issues happened with `logger` and `winston` as well.
Those two modules will print messages in the console, which is annoying and makes console messages hard to read.
This time I put them in setup files because at this point I do not need to manipulate implementations of them.
Suppressing them is enough.

### api response schema is not valid

The third party api provided by Hahow has the possibility to return data which schema not matching api spec.
Therefore, I added schema validation with `ajv` right after each api request.
If data with undesired schemas are received, null will be returned by the function, the same behavior when api request responded with 5XX status.
The behavior I designed is based on my own opinions. I think that users have no interest in the detail of resource's inaccessibility so information about resource's existence is enough.

### docker image size too large

The first time I built the docker image locally, I found out that the image size was about 1.2 GB.
It was shocking because I only about 1 MB of source code, and the size of node_modules in production is about 28 MB.
After some research, I found out that I can leverage docker's multi-stage builds to reduce docker image volume.
It turned out I managed to build a docker image only 150 MB with the same code.

## Cool Stuffs

### docker build

I added a Dockerfile to build my code into docker image, which is useful for deployment and cross-team development collaboration.
By deploying docker image, it ensures that my code will run indifferently in any environment. 
And by sharing docker images with colleagues, one command is enough for them to launch my service.

### CI/CD and some pull request rules

I set up CI/CD pipelines to automatically run lint and test when pull requests are created.
In addition, I set rules in the repo to stop pull requests failed CI/CD from merging into the main branch.
This will act as some kind of code quality assurance.
Furthermore, I added actions building and publishing docker images triggered when the main branch is updated or release is made.
Automating duplicated jobs will save time and reduce manual errors, which is good for both developers and product.
