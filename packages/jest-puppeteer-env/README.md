[![npm](https://img.shields.io/npm/v/@chealt/jest-puppeteer-env.svg)](http://npm.im/@chealt/jest-puppeteer-env)
[![License](https://img.shields.io/npm/l/@chealt/jest-puppeteer-env.svg)](/LICENSE)
# @chealt/jest-puppeteer-env

A custom environment for Jest with many performance, accessibility testing features and the ability to record and mock requests.

## Install

### NPM

```
npm install @chealt/jest-puppeteer-env puppeteer
```

### Yarn

```
yarn add @chealt/jest-puppeteer-env puppeteer
```

## Usage

Update your Jest config with

```json
{
  "preset": "@chealt/jest-puppeteer-env/preset"
}
```

Or you can add the preset manually to your config to override options.

```json
{
  "testRunner": "jest-circus/runner",
  "globalSetup": "@chealt/jest-puppeteer-env/setup",
  "globalTeardown": "@chealt/jest-puppeteer-env/teardown",
  "testEnvironment": "@chealt/jest-puppeteer-env"
}
```

See a more detailed example in the [Jest Puppeteer Env example package](https://github.com/chealt/chealt/tree/main/packages/jest-puppeteer-env-example).

### Additional configuration

Using the Jest config `testEnvironmentOptions` you have the following options:

#### recordRequests

Type: `Boolean`
Default: `false`

Indicates whether the requests should be recorded while executing the test.
When it is set, the `mockResponseDir` will be used to store the recorded requests, therefore that option must be set as well.

#### mockResponseDir

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

#### requestPathSwallowPatterns

Type: `array<String>`
Default: `undefined`

A list of Strings to be created regular expressions of to respond with 200 OK and empty body with. These will be passed to `new RegExp` with the `u` flag and any URL matching any one of them will be included.

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

#### Performance
##### collectCoverage

Type: `Boolean`
Default: `false`

Indicates whether the coverage information should be collected while executing the test.

![coverage example](https://github.com/chealt/chealt/blob/main/packages/jest-puppeteer-env/docs/coverage/coverage-example-screenshot.png)

##### collectCoverageFrom

Type: `array<String>`
Default: `undefined`

A list of Strings to be created regular expressions of to match the URLs to be collected coverage information from. These will be passed to `new RegExp` with the `u` flag and any URL matching any one of them will be included.

To take effect the `collectCoverage` option must be `true`.

##### coverageDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the code coverage.

Example:

```json
{
  "testEnvironmentOptions": {
    "performance": {
      "coverageDirectory": "coverage"
    }
  }
}
```

##### printCoverageSummary

Type: `Boolean`
Default: `false`

Indicate if you would like to see the coverage summary in the console after the tests finished executing.

##### recordCoverageText

Type: `Boolean`
Default: `false`

When Puppeteer collects coverage information it records each asset's text as well as the ranges. This can make the coverage file quite large, therefore, by default, the library excludes this information from the output.

##### collectPerfMetrics

Type: `Boolean`
Default: `false`

Indicates whether the performance metrics should be collected while executing the test.

##### reportDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the performance metrics.

Example:

```json
{
  "testEnvironmentOptions": {
    "performance": {
      "reportDirectory": "performance"
    }
  }
}
```

##### bundleSzies

Type: `[{ path<String>, maxSize<String> }]`
Default: `undefined`

`path`: A String to be created regular expressions of to test the requested URL against. These will be passed to `new RegExp` with the `u`.
`maxSize`: A String that represents the maximum size of the response. Anything can be used that the (bytes packages)[https://www.npmjs.com/package/bytes] can parse.

Example:

```json
{
  "testEnvironmentOptions": {
    "performance": {
      "reportDirectory": "performance",
      "bundleSizes": [
        {
          "path": "xjs/_/js",
          "maxSize": "600 B"
        },
        {
          "path": "og/_/ss",
          "maxSize": "10 B"
        }
      ]
    }
  }
}
```

When specified the `performance.reportDirectory` option must be specified as well and it will be used to store the violations.

##### failOnBundleSizeViolation

Type: `Boolean`
Default: `false`

Indicates whether the bundle size violations should fail the test.

#### Accessibility

##### failLevel

Type: `String`
Default: `undefined`

Fail tests that have `a11y` violations. Possible values are `moderate`, `serious`, `critical` in order of seriousness. Any `a11y` violation more serious than the level specified will throw an error.

Example:

```json
{
  "testEnvironmentOptions": {
    "accessibility": {
      "shouldCheck": true,
      "failLevel": "critical"
    }
  }
}
```

When provided the `shouldCheck` accessibility config must be true as well.

##### shouldCheck

Type: `Boolean`
Default: `false`

Indicates whether accessibility should be checked before the test exits.

##### reportDirectory

Type: `String`
Default: `undefined`

Relative path to the `rootDir` in your config to store the accessibility findings when the test run.

Example:

```json
{
  "testEnvironmentOptions": {
    "accessibility": {
      "shouldCheck": true,
      "reportDirectory": "accessibility"
    }
  }
}
```

When provided the `shouldCheck` accessibility config must be true as well.

### Screenshot on failure

The environment will take a screenshot of the full page if a test fails and store it using the following format: `<<TEST_NAME>>--failure.png`.
