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
    "mockResponsePath": "mocks/responses.json"
  }
}
```

#### collectCoverage

Type: `Boolean`
Default: `false`

Indicates whether the coverage information should be collected while executing the test.

#### collectCoverageFrom

Type: `array<String>`
Default: `undefined`

A list of Strings to be created regular expressions of to match the URLs to be collected coverage information from. These will be passed to `new RegExp` with the `u` flag and any URL matching any one of them will be included.

To take effect the `collectCoverage` option must be `true`.

#### coverageDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the code coverage.

Example:

```json
{
  "testEnvironmentOptions": {
    "coverageDirectory": "coverage"
  }
}
```

#### recordCoverageText

Type: `Boolean`
Default: `false`

When Puppeteer collects coverage information it records each asset's text as well as the ranges. This can make the coverage file quite large, therefore, by default, the library excludes this information from the output.

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

