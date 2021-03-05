const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const cwd = require('cwd');
const merge = require('merge-deep');

const exists = promisify(fs.exists);

const DEFAULT_CONFIG = {
  launch: {},
  browser: 'chromium',
  browserContext: 'default',
  exitOnPageError: true
};
const DEFAULT_CONFIG_CI = merge(DEFAULT_CONFIG, {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding'
    ]
  }
});

const readConfig = async () => {
  const defaultConfig = process.env.CI === 'true' ? DEFAULT_CONFIG_CI : DEFAULT_CONFIG;

  const hasCustomConfigPath = !!process.env.JEST_PUPPETEER_CONFIG;
  const configPath = process.env.JEST_PUPPETEER_CONFIG || 'jest-puppeteer.config.js';
  const absConfigPath = path.resolve(cwd(), configPath);
  const configExists = await exists(absConfigPath);

  if (hasCustomConfigPath && !configExists) {
    throw new Error(
      `Error: Can't find a root directory while resolving a config file path.\nProvided path to resolve: ${configPath}`
    );
  }

  if (!hasCustomConfigPath && !configExists) {
    return defaultConfig;
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const localConfig = await require(absConfigPath);

  return merge({}, defaultConfig, localConfig);
};

const getPuppeteer = (config) => {
  switch (config.browser.toLowerCase()) {
    /* eslint-disable global-require, import/no-dynamic-require, import/no-extraneous-dependencies, import/no-unresolved */
    case 'chromium':
      try {
        return require('puppeteer');
      } catch (e) {
        return require('puppeteer-core');
      }
    case 'firefox':
      return require('puppeteer-firefox');
    /* eslint-enable */
    default:
      throw new Error(`Error: "browser" config option is given an unsupported value: ${config.browser}`);
  }
};

const cleanConfig = (config) => {
  const {
    rootDir,
    testEnvironmentOptions: {
      accessibility,
      mockResponseDir,
      performance,
      recordRequests,
      recordScreenshots,
      requestPathIgnorePatterns,
      screenshotDirectory,
      shouldUseMocks
    }
  } = config;

  return {
    accessibility,
    mockResponseDir,
    performance,
    recordRequests,
    recordScreenshots,
    requestPathIgnorePatterns,
    rootDir,
    screenshotDirectory,
    shouldUseMocks
  };
};

const validateBaseConfig = (config) => {
  const { rootDir, testEnvironmentOptions } = config;

  if (!rootDir) {
    throw new Error('You need to specify the `rootDir` in your jest config!');
  }

  if (!testEnvironmentOptions) {
    throw new Error('You need to specify the `testEnvironmentOptions` in your jest config!');
  }

  if (testEnvironmentOptions.recordRequests && !testEnvironmentOptions.mockResponseDir) {
    throw new Error(
      'Please specify where the mocks should be saved to and loaded from using the `mockResponseDir` test environment option.'
    );
  }

  if (testEnvironmentOptions.recordRequests && testEnvironmentOptions.shouldUseMocks) {
    throw new Error(
      'You cannot record and use mocks at the same time, please only set `recordRequests` or `shouldUseMocks` to true.'
    );
  }
};

const validatePerformanceConfig = (config) => {
  const {
    testEnvironmentOptions: { performance }
  } = config;

  if (performance.collectCoverage && !performance.coverageDirectory) {
    throw new Error('When coverage is collected you need to provide a coverageDirectory option.');
  }

  if (performance.collectPerfMetrics && !performance.reportDirectory) {
    throw new Error('When performance metrics are collected you need to provide a reportDirectory option.');
  }
  }
};

const validateAccessibilityConfig = (config) => {
  const {
    testEnvironmentOptions: { accessibility }
  } = config;

  if (accessibility?.shouldCheck && !accessibility?.reportDirectory) {
    throw new Error('When a11y should be checked you need to provide a reportDirectory option.');
  }

  if (!accessibility?.shouldCheck && accessibility?.failLevel) {
    throw new Error('When a11y failLevel is provided you need to set the shouldCheck option.');
  }
};

const validateScreenshotsConfig = (config) => {
  const {
    testEnvironmentOptions: { recordScreenshots, screenshotDirectory }
  } = config;

  if (recordScreenshots && !screenshotDirectory) {
    throw new Error('When screenshots are taken you need to provide a screenshotDirectory option.');
  }
};

const validateConfig = (config) => {
  validateBaseConfig(config);
  validatePerformanceConfig(config);
  validateAccessibilityConfig(config);
  validateScreenshotsConfig(config);

  return cleanConfig(config);
};

module.exports = {
  getPuppeteer,
  readConfig,
  validateConfig
};
