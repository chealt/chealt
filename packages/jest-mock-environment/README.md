[![npm](https://img.shields.io/npm/v/@chealt/jest-mock-environment.svg)](http://npm.im/@chealt/jest-mock-environment)
[![License](https://img.shields.io/npm/l/@chealt/jest-mock-environment.svg)](/LICENSE)
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

#### mockResponseDir (required)

Relative path to the `rootDir` in your config to store and load the recorded responses.
The mocks will be saved using the specs' relative path with the postfix `.mocks.json`.

Example:

```json
{
  "testEnvironmentOptions": {
    "mockResponseDir": "mocks"
  }
}
```

It is also possible to create global mocks that will be used for all tests. The environment will check if a `global.mocks.json` exists in the `mockResponseDir` and prefer that over the test mocks. The content of the file is similar to the test mock files but it does NOT include the name of the spec.

#### collectCoverage

Type: `Boolean`
Default: `false`

Indicates whether the coverage information should be collected while executing the test.

![coverage example](https://github.com/chealt/chealt/blob/main/packages/jest-mock-environment/docs/coverage/coverage-example-screenshot.png)

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

#### printCoverageSummary

Type: `Boolean`
Default: `false`

Indicate if you would like to see the coverage summary in the console after the tests finished executing.

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

#### requestPathIgnorePatterns

Type: `array<String>`
Default: `undefined`

A list of Strings to be created regular expressions of to not be included in the recorded requests. These will be passed to `new RegExp` with the `u` flag and any URL matching any one of them will be included.
#### shouldUseMocks

Type: `Boolean`
Default: `false`

If `true` the recorded responses will be used, otherwise the environment records the requests and responses.

#### recordScreenshots

Type: `Boolean`
Default: `false`

Indicates whether screenshots should be taken while executing the test.

#### screenshotDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the screenshots taken during the test run.

Example:

```json
{
  "testEnvironmentOptions": {
    "screenshotDirectory": "screenshots"
  }
}
```

#### collectPerfMetrics

Type: `Boolean`
Default: `false`

Indicates whether the performance metrics should be collected while executing the test.

#### perfMetricsDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the performance metrics.

Example:

```json
{
  "testEnvironmentOptions": {
    "perfMetricsDirectory": "performance"
  }
}
```

### Screenshot on failure

The environment will take a screenshot of the full page if a test fails and store it using the following format: `<<TEST_NAME>>--failure.png`.
