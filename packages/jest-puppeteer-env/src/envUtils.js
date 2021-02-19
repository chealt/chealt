const path = require('path');

const filterEmptyResponses = (responses) => {
  const filteredResponses = {};

  Object.keys(responses).forEach((testId) => {
    Object.keys(responses[testId]).forEach((url) => {
      if (responses[testId][url].length) {
        if (!filteredResponses[testId]) {
          filteredResponses[testId] = {};
        }

        filteredResponses[testId][url] = responses[testId][url];
      }
    });
  });

  return filteredResponses;
};

const getMocks = (responsesPath) => {
  let mocks;

  try {
    mocks = require(responsesPath);
  } catch {
    // if there are no mocks we don't do anything
  }

  return mocks;
};

const getFullPath = (...paths) => path.join(...paths);

const hasResponses = (responses) => Object.keys(responses).length;

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
  filterEmptyResponses,
  getMocks,
  getFullPath,
  hasResponses,
  validateConfig
};