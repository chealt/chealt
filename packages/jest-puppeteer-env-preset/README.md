[![npm](https://img.shields.io/npm/v/@chealt/jest-puppeteer-env-preset.svg)](http://npm.im/@chealt/jest-puppeteer-env-preset)
[![License](https://img.shields.io/npm/l/@chealt/jest-puppeteer-env-preset.svg)](/LICENSE)

# @chealt/jest-puppeteer-env-preset

Jest preset configuration for using the [@chealt/jest-puppeteer-env](https://www.npmjs.com/package/@chealt/jest-puppeteer-env) to record and replay requests and responses during a test execution using Puppeteer.

## Install

### NPM

```
npm install @chealt/jest-puppeteer-env-preset puppeteer
```

### Yarn

```
yarn add @chealt/jest-puppeteer-env-preset puppeteer
```

## Usage

Update your Jest config with

```json
{
  "preset": "@chealt/jest-puppeteer-env-preset"
}
```

See additional environment options in the [Puppeteer environment README](https://www.npmjs.com/package/@chealt/jest-puppeteer-env).

See a more detailed example in the [Jest Puppeteer Environment example package](https://github.com/chealt/chealt/tree/main/packages/jest-puppeteer-env-example).
