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

const validateConfig = (config) => {
  if (!config.rootDir) {
    throw new Error('You need to specify the `rootDir` in your jest config!');
  } else if (!config.testEnvironmentOptions) {
    throw new Error('You need to specify the `testEnvironmentOptions` in your jest config!');
  } else if (!config.testEnvironmentOptions.mockResponseDir) {
    throw new Error(
      'Please specify where the mocks should be saved to and loaded from using the `mockResponseDir` test environment option.'
    );
  } else if (config.testEnvironmentOptions.collectCoverage && !config.testEnvironmentOptions.coverageDirectory) {
    throw new Error('When coverage is collected you need to provide a coverageDirectory option.');
  } else if (config.testEnvironmentOptions.recordScreenshots && !config.testEnvironmentOptions.screenshotDirectory) {
    throw new Error('When screenshots are taken you need to provide a screenshotDirectory option.');
  } else if (config.testEnvironmentOptions.collectPerfMetrics && !config.testEnvironmentOptions.perfMetricsDirectory) {
    throw new Error('When performance metrics are collected you need to provide a perfMetricsDirectory option.');
  } else {
    const {
      rootDir,
      testEnvironmentOptions: {
        collectCoverage,
        collectCoverageFrom,
        coverageDirectory,
        mockResponseDir,
        perfMetricsDirectory,
        printCoverageSummary,
        recordCoverageText,
        recordScreenshots,
        requestPathIgnorePatterns,
        screenshotDirectory,
        shouldUseMocks,
        collectPerfMetrics
      }
    } = config;

    return {
      collectCoverage,
      collectCoverageFrom,
      collectPerfMetrics,
      coverageDirectory,
      mockResponseDir,
      perfMetricsDirectory,
      printCoverageSummary,
      recordCoverageText,
      recordScreenshots,
      requestPathIgnorePatterns,
      rootDir,
      screenshotDirectory,
      shouldUseMocks
    };
  }
};

module.exports = {
  getPuppeteer,
  readConfig,
  validateConfig
};
