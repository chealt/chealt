# @chealt/jest-mock-environment

A custom environment for Jest to record and replay requests and their responses during a test execution using Puppeteer.

## Install

### NPM

```
npm install @chealt/jest-mock-environment puppeteer
```

### Yarn

```
yarn add @chealt/jest-mock-environment puppeteer
```

## Usage

Update your Jest config with

```json
{
  "testRunner": "jest-circus/runner",
  "globalSetup": "@chealt/jest-mock-environment/setup",
  "globalTeardown": "@chealt/jest-mock-environment/teardown",
  "testEnvironment": "@chealt/jest-mock-environment"
}
```

See a more detailed example in the [Jest Mock example package](https://github.com/chealt/chealt/tree/main/packages/jest-mock-example).

### Additional configuration

Using the Jest config `testEnvironmentOptions` you have the following options:

#### mockResponsePath (required)

Relative path to the `rootDir` in your config to store and load the recorded responses.

Example:

```json
{
  "testEnvironmentOptions": {
    "mockResponsePath": "test/puppeteer/mocks/responses.json"
  }
}
```

#### isHostAgnostic

Type: `Boolean`
Default: `false`

If `true` when using the mocks the host in the URL (including the protocol) won't be used to match the recorded response.

#### isPortAgnostic

Type: `Boolean`
Default: `false`

If `true` when using the mocks the port in the URL won't be used to match the recorded response.

#### shouldUseMocks

Type: `Boolean`
Default: `false`

If `true` the recorded responses will be used, otherwise the environment records the requests and responses.

