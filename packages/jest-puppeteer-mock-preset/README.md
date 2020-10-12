# @chealt/jest-puppeteer-mock-preset

Jest preset configuration for using the [@chealt/jest-mock-environment](https://www.npmjs.com/package/@chealt/jest-mock-environment) to record and replay requests and responses during a test execution using Puppeteer.

## Install

### NPM

```
npm install @chealt/jest-puppeteer-mock-preset puppeteer
```

### Yarn

```
yarn add @chealt/jest-puppeteer-mock-preset puppeteer
```

## Usage

Update your Jest config with

```json
{
  "preset": "@chealt/jest-puppeteer-mock-preset"
}
```

See additional environment options in the [mock environment README](https://www.npmjs.com/package/@chealt/jest-mock-environment).